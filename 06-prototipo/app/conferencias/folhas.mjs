// As folhas do design system, tiradas do protótipo: as peças, as cores e os tokens de hoje, com o vidro ligado.
// Saem em 03-design-system/folhas/vidro/: a F01 (os fundamentos, dos tokens, uma por tema), da F02 à F07 (as peças,
// da vitrine, nos dois temas lado a lado) e a F10 (a marca, por tamanho). As folhas desenhadas, sólidas, continuam em
// 03-design-system/folhas/png/ e são a norma do app com ?vidro=0.
//   node conferencias/folhas.mjs [--sem-build]
import { chromium } from 'playwright';
import { join } from 'node:path';
import { RAIZ, construir, servir, ir, pasta } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const saida = pasta(join(RAIZ, '03-design-system', 'folhas', 'vidro'));
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 1760, height: 1200 }, deviceScaleFactor: 1 })).newPage();
const feitas = [];
const nomeDe = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// F01 · os fundamentos, dos tokens, um por tema
for (const tema of ['escuro', 'claro']) {
  await ir(pagina, base, `vitrine=tokens&tema=${tema}`);
  await pagina.waitForTimeout(400);
  const f = `F01-fundamentos-${tema}.png`;
  await pagina.locator('[data-vitrine="tokens"]').screenshot({ path: join(saida, f), animations: 'disabled' });
  feitas.push(f);
}
// F02 a F07 · as peças, com o vidro ligado, sobre o fundo de luz
await ir(pagina, base, 'vitrine=pecas');
await pagina.waitForTimeout(600);
for (const folha of await pagina.locator('.folha').all()) {
  const titulo = await folha.locator(':scope > header h2').innerText();
  const [numero, nome] = titulo.split(' · ');
  const f = `${numero}-${nomeDe(nome)}.png`;
  await folha.screenshot({ path: join(saida, f), animations: 'disabled' });
  feitas.push(f);
}
// F10 · a marca, por tamanho
await ir(pagina, base, 'vitrine=marca');
await pagina.waitForTimeout(400);
await pagina.locator('[data-vitrine="marca"]').screenshot({ path: join(saida, 'F10-marca.png'), animations: 'disabled' });
feitas.push('F10-marca.png');
await navegador.close();
await fechar();
console.log(`folhas: ${feitas.length} em ${saida} · ${feitas.sort().join(', ')}`);
