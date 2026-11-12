// As fotos da vitrine do vidro, em 06-prototipo/fotos/vidro/: no Chromium e no WebKit, no escuro e no claro,
// com o vidro ligado, com o vidro desligado e com "reduzir transparência". O nome do arquivo diz o que é.
//   node conferencias/fotos-vidro.mjs                 todas
//   node conferencias/fotos-vidro.mjs chromium escuro  só um navegador e um tema
//   FATIAS=pasta  também grava a página em fatias, para olhar de perto (não vai para o repositório)
import { chromium, webkit } from 'playwright';
import { join } from 'node:path';
import { FOTOS, construir, servir, abrirTela, ir, pasta } from './_comum.mjs';

const args = process.argv.slice(2);
const navegadores = [['chromium', chromium], ['webkit', webkit]].filter(([n]) => !args.some((a) => ['chromium', 'webkit'].includes(a)) || args.includes(n));
const temas = ['escuro', 'claro'].filter((t) => !args.some((a) => ['escuro', 'claro'].includes(a)) || args.includes(t));
const modos = [
  ['vidro', ''],
  ['solido', '&vidro=0'],
  ['reduzir-transparencia', ''],
  // sem a lente da borda, como o Safari e o iPhone desenham: no Chromium, é a foto que mostra o vidro sem ela
  ['vidro-sem-lente', '&lente=0'],
].filter(([m]) => !args.includes('so-vidro') || m === 'vidro');

construir();
const { base, fechar } = await servir();
const saida = pasta(join(FOTOS, 'vidro'));
for (const [nome, motor] of navegadores) {
  const navegador = await motor.launch();
  for (const tema of temas) {
    for (const [modo, busca] of modos) {
      const contexto = await navegador.newContext({ viewport: { width: 2120, height: 1200 }, deviceScaleFactor: 1, colorScheme: 'dark', reducedMotion: 'no-preference' });
      const pagina = await contexto.newPage();
      if (modo === 'reduzir-transparencia') await pagina.emulateMedia({ reducedMotion: 'no-preference' }).catch(() => {});
      await ir(pagina, base, `vitrine=vidro&tema=${tema}${busca}`);
      if (modo === 'reduzir-transparencia') await pagina.getByLabel('reduzir transparência').check();
      await pagina.waitForTimeout(600);
      await pagina.screenshot({ path: join(saida, `vitrine-${nome}-${tema}-${modo}.png`), fullPage: true, animations: 'disabled' });
      if (process.env.FATIAS && (modo === 'vidro' || (process.env.FATIAS_SEM_LENTE && modo === 'vidro-sem-lente'))) {
        const total = await pagina.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0, i = 0; y < total; y += 1180, i++) await pagina.screenshot({ path: join(pasta(process.env.FATIAS), `${nome}-${tema}-${modo === 'vidro' ? '' : 'sl-'}${String(i).padStart(2, '0')}.png`), fullPage: true, clip: { x: 0, y, width: 2120, height: Math.min(1180, total - y) }, animations: 'disabled' });
      }
      await contexto.close();
    }
  }
  await navegador.close();
}
await fechar();
console.log(`fotos do vidro: ${navegadores.length} navegador(es) × ${temas.length} tema(s) × ${modos.length} modo(s) em ${saida}`);
