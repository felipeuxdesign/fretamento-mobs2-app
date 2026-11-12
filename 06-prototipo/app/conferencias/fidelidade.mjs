// A fidelidade: cada referência, fotografada no protótipo em 390 × 844 (escala 2), no escuro e com o vidro desligado,
// comparada ponto a ponto com o PNG dela. Sai a foto, a diferença e a tabela, em 06-prototipo/fotos/fidelidade/.
//   node conferencias/fidelidade.mjs            as 145
//   node conferencias/fidelidade.mjs T05        uma tela
//   node conferencias/fidelidade.mjs T05-02     uma referência
//   --referencia   mede o chão: fotografa o HTML da própria referência e compara com o PNG dela
//   --sem-build    usa o dist/ que já existe (ou BASE=http://localhost:5173 para o servidor de desenvolvimento)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { RAIZ, FOTOS, TELA, casosPedidos, construir, servir, abrirTela, ir, enderecoDaFidelidade, pasta, tabela, aRedesenhar } from './_comum.mjs';

const chao = process.argv.includes('--referencia');
// O serrilhado de borda aceito: o chão de cada referência (o HTML dela fotografado neste navegador) mais uma margem.
const MARGEM = Number(process.env.MARGEM ?? 0.15); // % da tela
const arquivoDoChao = join(FOTOS, 'fidelidade/chao.json');
const chaoMedido = existsSync(arquivoDoChao) ? JSON.parse(readFileSync(arquivoDoChao, 'utf8')) : {};
const limiteDe = (ref) => (chao ? 1 : (chaoMedido[ref] ?? 0.1) + MARGEM);
const saida = pasta(join(FOTOS, 'fidelidade'));
const novoChao = {};
const pedidos = casosPedidos();

if (!chao) construir();
const { base, fechar } = chao ? { base: '', fechar: async () => {} } : await servir();
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador);
// a segunda régua: o HTML da referência fotografado neste mesmo navegador. Sem o serrilhado de um navegador para
// outro no meio, o que sobra de diferença é do protótipo: um glifo trocado, um dígito, um ponto fora do lugar
const { pagina: paginaDoHtml } = chao ? { pagina: null } : await abrirTela(navegador);
const LIMITE_DO_HTML = Number(process.env.LIMITE_DO_HTML ?? 0.005); // % da tela
const arquivoDasFolgas = join(FOTOS, 'fidelidade/folgas.json');
const folgas = existsSync(arquivoDasFolgas) ? JSON.parse(readFileSync(arquivoDasFolgas, 'utf8')) : {};
const caixaDe = (dif, largura, altura) => {
  let x0 = largura, y0 = altura, x1 = -1, y1 = -1;
  for (let y = 0; y < altura; y++) for (let x = 0; x < largura; x++) {
    const i = (y * largura + x) * 4;
    if (dif.data[i] === 255 && dif.data[i + 1] === 0 && dif.data[i + 2] === 0) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  return x1 >= 0 ? `x ${Math.floor(x0 / 2)}–${Math.ceil(x1 / 2)} · y ${Math.floor(y0 / 2)}–${Math.ceil(y1 / 2)}` : '';
};
const linhas = [];
let reprovadas = 0;
let esperam = 0;

for (const c of pedidos) {
  if (chao) {
    await pagina.goto(pathToFileURL(join(RAIZ, c.html)).href, { waitUntil: 'load' });
    await pagina.evaluate(() => document.fonts.ready);
  } else {
    await ir(pagina, base, enderecoDaFidelidade(c.ref));
  }
  const foto = await pagina.screenshot({ animations: 'disabled', clip: { x: 0, y: 0, width: TELA.largura, height: TELA.altura } });
  const a = PNG.sync.read(foto);
  const b = PNG.sync.read(readFileSync(join(RAIZ, c.png)));
  let pontos = -1;
  let caixa = '';
  if (a.width === b.width && a.height === b.height) {
    const dif = new PNG({ width: a.width, height: a.height });
    pontos = pixelmatch(a.data, b.data, dif.data, a.width, a.height, { threshold: 0.1, includeAA: false });
    // a parte da tela que difere: a caixa que envolve os pontos diferentes, em pontos de tela (390 × 844)
    let x0 = a.width, y0 = a.height, x1 = -1, y1 = -1;
    for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
      const i = (y * a.width + x) * 4;
      if (dif.data[i] === 255 && dif.data[i + 1] === 0 && dif.data[i + 2] === 0) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 >= 0) caixa = `x ${Math.floor(x0 / 2)}–${Math.ceil(x1 / 2)} · y ${Math.floor(y0 / 2)}–${Math.ceil(y1 / 2)}`;
    if (!chao) writeFileSync(join(saida, `${c.ref}.dif.png`), PNG.sync.write(dif));
  }
  if (!chao) writeFileSync(join(saida, `${c.ref}.png`), foto);
  const pct = pontos < 0 ? 100 : (100 * pontos) / (a.width * a.height);
  novoChao[c.ref] = Number(pct.toFixed(3));
  // contra o HTML da referência, no mesmo navegador
  let pctDoHtml = 0;
  let caixaDoHtml = '';
  if (paginaDoHtml) {
    await paginaDoHtml.goto(pathToFileURL(join(RAIZ, c.html)).href, { waitUntil: 'load' });
    await paginaDoHtml.evaluate(() => document.fonts.ready);
    const h = PNG.sync.read(await paginaDoHtml.screenshot({ animations: 'disabled', clip: { x: 0, y: 0, width: TELA.largura, height: TELA.altura } }));
    const difDoHtml = new PNG({ width: a.width, height: a.height });
    pixelmatch(a.data, h.data, difDoHtml.data, a.width, a.height, { threshold: 0.1, includeAA: false });
    // a folga com nome é um pedaço da tela (em pontos de tela) onde a diferença é um desvio decidido: fica de fora da conta
    const [fx0, fy0, fx1, fy1] = (folgas[c.ref]?.regiao ?? [0, 0, -1, -1]).map((v) => v * 2);
    let pontosDoHtml = 0;
    for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
      const i = (y * a.width + x) * 4;
      if (!(difDoHtml.data[i] === 255 && difDoHtml.data[i + 1] === 0 && difDoHtml.data[i + 2] === 0)) continue;
      if (x >= fx0 && x <= fx1 && y >= fy0 && y <= fy1) { difDoHtml.data[i + 1] = 160; continue; }
      pontosDoHtml++;
    }
    pctDoHtml = (100 * pontosDoHtml) / (a.width * a.height);
    caixaDoHtml = caixaDe(difDoHtml, a.width, a.height);
    if (pctDoHtml > 0) writeFileSync(join(saida, `${c.ref}.html-dif.png`), PNG.sync.write(difDoHtml));
    else rmSync(join(saida, `${c.ref}.html-dif.png`), { force: true });
  }
  const folga = folgas[c.ref];
  const okDoHtml = pctDoHtml <= LIMITE_DO_HTML;
  const espera = !!aRedesenhar[c.ref];
  if (espera) esperam++;
  const ok = espera || (pct <= limiteDe(c.ref) && okDoHtml);
  if (!ok) reprovadas++;
  linhas.push([c.ref, c.tipo, c.nome, pct.toFixed(3).replace('.', ',') + ' %', caixa || 'nada', ...(chao ? [] : [pctDoHtml.toFixed(3).replace('.', ',') + ' %' + (folga ? ` · fora da conta: ${folga.porque}` : '')]), aRedesenhar[c.ref] ? 'espera o desenho novo' : ok ? 'bate' : 'difere']);
  process.stdout.write(`${ok ? '·' : '✗'} ${c.ref} ${pct.toFixed(3)} % ${chao ? '' : `· html ${pctDoHtml.toFixed(3)} % ${pctDoHtml > 0 ? caixaDoHtml : ''}`} ${ok ? '' : caixa}\n`);
}

await navegador.close();
await fechar();
if (chao && pedidos.length > 100) {
  writeFileSync(arquivoDoChao, JSON.stringify(novoChao, null, 1) + '\n');
  writeFileSync(join(saida, 'chao.md'), `# O chão da fidelidade\n\nO HTML de cada referência, fotografado neste navegador e comparado com o PNG dela. É a diferença que existe sem o protótipo: só o serrilhado de borda de um navegador para outro. A fidelidade aceita o chão de cada referência mais ${String(MARGEM).replace('.', ',')} % da tela.\n\n${tabela(['referência', 'tipo', 'nome', 'parte que difere', 'onde', 'resultado'], linhas)}\n`);
} else if (!chao && pedidos.length > 100) {
  const titulo = '# A fidelidade\n\nCada referência fotografada no protótipo (`?ref=…&so-app=1&vidro=0&tema=escuro`, 390 × 844, escala 2) e comparada ponto a ponto com o PNG dela. "Bate" é diferir, no máximo, o serrilhado de borda: o chão da referência (`chao.md`) mais ' + String(MARGEM).replace('.', ',') + ' % da tela. As referências listadas em `a-redesenhar.json` esperam o desenho novo: nelas a diferença é o conteúdo que mudou por decisão, e o resultado não é cobrado contra a imagem.\n';
  writeFileSync(join(saida, 'tabela.md'), `${titulo}\n${tabela(['referência', 'tipo', 'nome', 'contra o PNG', 'onde', 'contra o HTML, no mesmo navegador', 'resultado'], linhas)}\n`);
}
console.log(`\nfidelidade${chao ? ' (chão)' : ''}: ${pedidos.length - reprovadas - esperam} de ${pedidos.length} batem${esperam ? ` · ${esperam} esperam o desenho novo (a-redesenhar.json)` : ''}${reprovadas ? ` · ${reprovadas} não batem` : ''}`);
process.exit(reprovadas ? 1 : 0);
