// O que se toca: cada momento se alcança tocando, no fluxo, e chega no mesmo quadro que a referência mostra.
// Percorre o caminho feliz no palco (1440 × 1024), tocando no app e no tocador do dia, e compara a tela do
// aparelho com o PNG da referência de cada momento. Roda com o vidro desligado, como a fidelidade.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { RAIZ, FOTOS, casos, construir, servir, ir, aRedesenhar } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 2 })).newPage();
const chao = JSON.parse(readFileSync(join(FOTOS, 'fidelidade/chao.json'), 'utf8'));
const erros = [];
let vistos = 0;
const app = pagina.locator('#tela-do-aparelho');
const palco = (nome, opcoes = {}) => pagina.locator('.pl').getByRole('button', { name: nome, ...opcoes });

/** Compara a tela do aparelho, agora, com o PNG de uma referência. */
async function chegouEm(ref, como, espera = 1000) {
  await pagina.waitForTimeout(espera); // os movimentos terminam (o ônibus anda em 900 ms)
  const caixa = await app.boundingBox();
  const foto = PNG.sync.read(await pagina.screenshot({ animations: 'disabled', clip: caixa }));
  const c = casos.find((x) => x.ref === ref);
  const alvo = PNG.sync.read(readFileSync(join(RAIZ, c.png)));
  // dentro da moldura, a tela tem o canto de 47,33: os quatro cantos ficam de fora da comparação
  const r = 96;
  const canto = (x, y) => (x < r || x >= foto.width - r) && (y < r || y >= foto.height - r);
  for (let y = 0; y < foto.height; y++) for (let x = 0; x < foto.width; x++) if (canto(x, y)) { const i = (y * foto.width + x) * 4; foto.data[i] = alvo.data[i] = 0; foto.data[i + 1] = alvo.data[i + 1] = 0; foto.data[i + 2] = alvo.data[i + 2] = 0; }
  const pontos = pixelmatch(foto.data, alvo.data, null, foto.width, foto.height, { threshold: 0.1 });
  const pct = (100 * pontos) / (foto.width * foto.height);
  vistos++;
  // onde o desenho ficou para trás, o que se cobra é ter chegado na tela certa, e não o quadro
  const ok = !!aRedesenhar[ref] || pct <= (chao[ref] ?? 0.1) + 0.3;
  if (!ok) erros.push(`${ref} · ${como} · difere ${pct.toFixed(2)} %`);
  console.log(`${ok ? '·' : '✗'} ${ref} · ${como} · ${pct.toFixed(3)} %`);
}

// ── o app abre no Entrar. O Bloqueado se alcança pelo painel do palco: a Ana desbloqueia e chega ao Início às 06:24 ──
await ir(pagina, base, 'vidro=0');
if ((await app.getAttribute('data-tela')) !== 'T01') throw new Error('o app não abriu no Entrar');
await palco('Abrir o painel do protótipo').click();
await pagina.locator('.pl-sb').getByRole('button', { name: /Bloqueado/ }).click();
await palco('Fechar o painel', { exact: true }).click();
// o pedido abre aos 300 ms e o Face ID confirma sozinho 1,4 s depois: a foto é tirada entre uma coisa e outra
await chegouEm('T04-01', 'abrir o Bloqueado: o pedido do Face ID abre sozinho', 450);
await app.locator('.sys.face-id .b').click();
await palco('Pausar o dia').click(); // o dia começa a andar; aqui ele pausa, para a foto
await chegouEm('T05-00', 'confirmar o Face ID');
await palco('Avançar um passo').click();
await chegouEm('T05-01', 'o dia: chegando');
await palco('Avançar um passo').click();
await chegouEm('T05-02', 'o dia: no ponto');
await app.getByRole('button', { name: 'Embarquei' }).click();
await chegouEm('T05-03', 'tocar Embarquei');
await palco('Avançar um passo').click();
await chegouEm('T05-04', 'o dia: chegou na fábrica');
await palco('Recomeçar o dia').click();
await palco('Pausar o dia').click();
await app.getByRole('button', { name: /Outra ida hoje/ }).click();
await app.locator('main').evaluate((m) => (m.scrollTop = 0));
await chegouEm('T05-06', 'tocar "Outra ida hoje · 07:05"');
await app.getByRole('button', { name: 'Voltar para a ida de sempre' }).click();
await chegouEm('T05-00', 'voltar para a ida de sempre');
await app.locator('main').evaluate((m) => (m.scrollTop = m.scrollHeight));
await pagina.waitForTimeout(1200);
await chegouEm('T05-05', 'rolar a tela até o fim');

// ── as outras telas, cada grupo no arquivo dele ──
for (const parte of ['./fluxo-paradas-e-mapa.mjs', './fluxo-outro-ponto.mjs', './fluxo-entrada.mjs', './fluxo-perfil.mjs']) {
  await import(parte).then((m) => m.percorrer({ pagina, app, palco, chegouEm, base, ir })).catch((e) => { erros.push(`${parte}: ${e.message.split("\n")[0]} @ ${(e.stack.match(/fluxo-[a-z-]+\.mjs:\d+/)||[""])[0]}`); });
}

await navegador.close();
await fechar();
if (erros.length) { console.error(`fluxo: REPROVADO · ${erros.length} de ${vistos} momentos`); erros.forEach((e) => console.error(' - ' + e)); process.exit(1); }
console.log(`fluxo: APROVADO · ${vistos} momentos alcançados tocando chegam no quadro da referência`);
