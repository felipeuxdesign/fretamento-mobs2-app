// As telas de vitrine do vidro, fotografadas com o vidro ligado, em 06-prototipo/fotos/vidro/telas/:
// no escuro e no claro, no Chromium e no WebKit. A lista é a do fim de 03-design-system/vidro/07-vitrine.md.
//   node conferencias/fotos-vidro-telas.mjs                  todas
//   node conferencias/fotos-vidro-telas.mjs chromium escuro   só um navegador e um tema
//   FOLHA=pasta  também grava uma folha de contato por tema, para olhar todas juntas (não vai para o repositório)
import { chromium, webkit } from 'playwright';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { FOTOS, construir, servir, ir, pasta } from './_comum.mjs';

/** A referência e, quando a foto é da tela rolada, até onde. */
export const TELAS_DE_VITRINE = [
  ['T07-00'], ['T07-01'], ['T07-05'], ['T07-06'], ['T07-07'], ['T07-10'],
  ['T05-00', 'meio'], ['T05-08'], ['T05-23'],
  ['T08-05'],
  ['T03-00'], ['T03-01'],
  ['T01-00'], ['T10-00'],
  ['T12-00'],
];
const args = process.argv.slice(2);
const navegadores = [['chromium', chromium], ['webkit', webkit]].filter(([n]) => !args.some((a) => ['chromium', 'webkit'].includes(a)) || args.includes(n));
const temas = ['escuro', 'claro'].filter((t) => !args.some((a) => ['escuro', 'claro'].includes(a)) || args.includes(t));

if (!args.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const saida = pasta(join(FOTOS, 'vidro/telas'));
for (const [nome, motor] of navegadores) {
  const navegador = await motor.launch();
  const pagina = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'dark' })).newPage();
  for (const tema of temas) {
    const feitas = [];
    for (const [ref, rolar] of TELAS_DE_VITRINE) {
      await ir(pagina, base, `ref=${ref}&so-app=1&tema=${tema}${rolar ? `&rolar=${rolar}` : ''}`);
      await pagina.waitForTimeout(500);
      const arquivo = join(saida, `${ref}${rolar ? `-rolada-ate-o-${rolar}` : ''}-${tema}-${nome}.png`);
      await pagina.screenshot({ path: arquivo, animations: 'disabled' });
      feitas.push(arquivo);
    }
    if (process.env.FOLHA) {
      // a folha de contato: uma página em disco com as fotos lado a lado, fotografada
      const html = join(pasta(process.env.FOLHA), `vidro-telas-${tema}-${nome}.html`);
      writeFileSync(html, `<body style="margin:10px;background:#777;display:grid;grid-template-columns:repeat(5,300px);gap:10px">${feitas.map((f) => `<img src="${pathToFileURL(f).href}" width="300">`).join('')}</body>`);
      const folha = await (await navegador.newContext({ viewport: { width: 5 * 300 + 60, height: 3 * 660 + 20 }, deviceScaleFactor: 1 })).newPage();
      await folha.goto(pathToFileURL(html).href, { waitUntil: 'load' });
      await folha.screenshot({ path: html.replace('.html', '.png') });
      await folha.context().close();
    }
  }
  await navegador.close();
}
await fechar();
console.log(`fotos do vidro nas telas: ${TELAS_DE_VITRINE.length} telas × ${temas.length} tema(s) × ${navegadores.length} navegador(es) em ${saida}`);
