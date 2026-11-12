// As fotos da marca: a prova de tamanhos (?vitrine=marca) e os três arranjos no Entrar, lado a lado, nos dois temas.
// Saem em 06-prototipo/fotos/marca/.
//   node conferencias/fotos-marca.mjs [--sem-build]
import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { FOTOS, construir, servir, ir, pasta } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const saida = pasta(join(FOTOS, 'marca'));

// a prova de tamanhos
{
  const pagina = await (await navegador.newContext({ viewport: { width: 720, height: 1500 }, deviceScaleFactor: 2 })).newPage();
  await ir(pagina, base, 'vitrine=marca');
  await pagina.waitForTimeout(400);
  await pagina.locator('[data-vitrine="marca"]').screenshot({ path: join(saida, 'tamanhos.png') });
  await pagina.context().close();
}
// os arranjos no Entrar: a tela e o teclado aberto, com l1, l2 e l3; o l1 também com o fundo de antes e com as cores invertidas
const quadros = [
  ['T01-00', 'marca=l1', 'l1 · o quadro'],
  ['T01-00', 'marca=l2', 'l2 · sem o quadro'],
  ['T01-00', 'marca=l3', 'l3 · a linha'],
  ['T01-00', 'marca=l1&cor=invertida', 'l1 · cores invertidas'],
  ['T01-00', 'marca=l1&fundo=anterior', 'l1 · o fundo de antes'],
  ['T01-02', 'marca=l1', 'l1 · com o teclado'],
  ['T01-02', 'marca=l2', 'l2 · com o teclado'],
  ['T01-02', 'marca=l3', 'l3 · com o teclado'],
];
const tela = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
for (const tema of ['escuro', 'claro']) {
  const arqs = [];
  for (const [ref, busca, nome] of quadros) {
    await ir(tela, base, `ref=${ref}&so-app=1&tema=${tema}&${busca}`);
    await tela.waitForTimeout(300);
    const f = join(saida, `${ref}-${busca.replace(/[^\w]+/g, '-')}-${tema}.png`);
    await tela.screenshot({ path: f, animations: 'disabled' });
    arqs.push([nome, f]);
  }
  // a folha de montagem é de passagem: fica na pasta temporária do sistema, fora do repositório
  const html = join(tmpdir(), `fretamento-marca-lado-${tema}.html`);
  writeFileSync(html, `<body style="margin:14px;background:#2a2a2e;color:#eee;display:grid;grid-template-columns:repeat(${arqs.length},260px);gap:8px 12px;font:12px sans-serif"><div style="grid-column:1/-1;font:600 15px sans-serif">${tema} · a marca no Entrar</div>${arqs.map(([n, f]) => `<div><img src="${pathToFileURL(f).href}" width="260" style="display:block;border-radius:10px"><div style="padding:4px 0 0">${n}</div></div>`).join('')}</body>`);
  const folha = await (await navegador.newContext({ viewport: { width: arqs.length * 272 + 28, height: 650 }, deviceScaleFactor: 1 })).newPage();
  await folha.goto(pathToFileURL(html).href, { waitUntil: 'load' });
  await folha.screenshot({ path: join(saida, `lado-a-lado-${tema}.png`), fullPage: true });
  await folha.context().close();
}
await navegador.close();
await fechar();
console.log(`fotos da marca: a prova de tamanhos e ${quadros.length} quadros × 2 temas em ${saida}`);
