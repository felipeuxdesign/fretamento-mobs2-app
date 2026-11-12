// O que as conferências têm em comum: os caminhos, os casos, um servidor do build e o navegador.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const APP = fileURLToPath(new URL('..', import.meta.url));
export const RAIZ = fileURLToPath(new URL('../../..', import.meta.url));
export const FOTOS = join(RAIZ, '06-prototipo/fotos');
export const casos = JSON.parse(readFileSync(join(RAIZ, '04-dados/casos.json'), 'utf8'));
export const mock = JSON.parse(readFileSync(join(RAIZ, '04-dados/mock.json'), 'utf8'));
/** As referências cujo desenho ficou para trás: o conteúdo mudou por decisão, e o quadro ainda mostra o de antes.
    Cada uma tem o porquê escrito. Elas saem da comparação com a imagem até serem redesenhadas; o texto continua cobrado. */
const arquivoDasDesatualizadas = join(FOTOS, 'fidelidade/a-redesenhar.json');
export const aRedesenhar = existsSync(arquivoDasDesatualizadas) ? JSON.parse(readFileSync(arquivoDasDesatualizadas, 'utf8')) : {};

export const TELA = { largura: 390, altura: 844, escala: 2 };

export const pasta = (p) => (mkdirSync(p, { recursive: true }), p);

/** Os casos pedidos na linha de comando: nada (todos), "T05" (uma tela) ou "T05-02" (uma referência). */
export function casosPedidos(args = process.argv.slice(2)) {
  const filtros = args.filter((a) => /^T\d\d(-\d\d)?$/.test(a));
  if (!filtros.length) return casos;
  return casos.filter((c) => filtros.some((f) => c.ref === f || c.tela === f));
}

/** Constrói o build de produção, a não ser que --sem-build venha na linha de comando. */
export function construir() {
  if (process.argv.includes('--sem-build')) return;
  const r = spawnSync('npm', ['run', 'build', '--silent'], { cwd: APP, stdio: ['ignore', 'pipe', 'inherit'] });
  if (r.status !== 0) {
    console.error(r.stdout?.toString());
    throw new Error('o build de produção falhou');
  }
}

const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };

/** Sobe o build (dist/) num servidor local. Com BASE no ambiente, usa o servidor que já está de pé (o de desenvolvimento). */
export async function servir() {
  if (process.env.BASE) return { base: process.env.BASE.replace(/\/$/, ''), fechar: async () => {} };
  const dist = join(APP, 'dist');
  if (!existsSync(join(dist, 'index.html'))) throw new Error('não existe dist/: rode o build antes');
  const servidor = createServer((req, res) => {
    const caminho = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let arquivo = join(dist, caminho);
    if (!arquivo.startsWith(dist) || !existsSync(arquivo) || statSync(arquivo).isDirectory()) arquivo = join(dist, 'index.html');
    res.writeHead(200, { 'content-type': TIPOS[extname(arquivo)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(readFileSync(arquivo));
  });
  await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${servidor.address().port}`;
  return { base, fechar: () => new Promise((ok) => servidor.close(ok)) };
}

/** Abre uma página no tamanho da tela do aparelho, em escala 2. */
export async function abrirTela(navegador, opcoes = {}) {
  const contexto = await navegador.newContext({
    viewport: { width: opcoes.largura ?? TELA.largura, height: opcoes.altura ?? TELA.altura },
    deviceScaleFactor: opcoes.escala ?? TELA.escala,
    reducedMotion: opcoes.reduzirMovimento ? 'reduce' : 'no-preference',
    colorScheme: 'dark',
  });
  const pagina = await contexto.newPage();
  return { contexto, pagina };
}

/** Vai para um endereço do protótipo e espera a fonte e a tela ficarem prontas. */
export async function ir(pagina, base, busca) {
  await pagina.goto(`${base}/?${busca}`, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForSelector('#tela-do-aparelho, [data-vitrine]', { state: 'attached' });
  // dois quadros, para o desenho assentar
  await pagina.evaluate(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))));
}

/** O app abre no Entrar, com os campos preenchidos: recebe o código, entra, prepara o app e chega ao Início, com o dia andando. */
/** No Código não há botão: o sexto dígito valida. No fluxo o campo abre vazio, e qualquer código de seis dígitos entra. */
export async function completarOCodigo(pagina, codigo = '482913') {
  const campo = pagina.locator('#tela-do-aparelho').getByLabel('Código', { exact: true });
  await campo.waitFor();
  if ((await campo.inputValue()) !== '') throw new Error(`o Código não abriu vazio: veio "${await campo.inputValue()}"`);
  await campo.fill(codigo);
}

export async function entrarNoApp(pagina) {
  const app = pagina.locator('#tela-do-aparelho');
  await app.getByRole('button', { name: 'Receber código' }).click();
  await completarOCodigo(pagina);
  await app.getByRole('button', { name: 'Começar' }).click();
  await app.getByRole('button', { name: 'Permitir', exact: true }).click();
  await app.getByText('Bom dia, Ana').waitFor();
}

export const enderecoDaFidelidade = (ref) => `ref=${ref}&so-app=1&vidro=0&tema=escuro`;

export function tabela(cabecas, linhas) {
  return [`| ${cabecas.join(' | ')} |`, `| ${cabecas.map(() => '---').join(' | ')} |`, ...linhas.map((l) => `| ${l.join(' | ')} |`)].join('\n');
}
