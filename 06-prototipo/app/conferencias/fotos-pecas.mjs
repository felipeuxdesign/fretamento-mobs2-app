// As fotos da vitrine das peças, em 06-prototipo/fotos/pecas/: a página inteira e cada folha, no Chromium.
import { chromium } from 'playwright';
import { join } from 'node:path';
import { FOTOS, construir, servir, abrirTela, ir, pasta } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const saida = pasta(join(FOTOS, 'pecas'));
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador, { largura: 1760, altura: 1200, escala: 1 });
await ir(pagina, base, 'vitrine=pecas');
await pagina.screenshot({ path: join(saida, 'vitrine-pecas.png'), fullPage: true, animations: 'disabled' });
const folhas = await pagina.locator('.folha').all();
for (const f of folhas) {
  const nome = (await f.locator(':scope > header h2').innerText()).split(' · ')[0];
  await f.screenshot({ path: join(saida, `${nome}.png`), animations: 'disabled' });
}
// para olhar de perto: fatias da página, na altura da janela
if (process.env.FATIAS) {
  const total = await pagina.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0, i = 0; y < total; y += 1150, i++) await pagina.screenshot({ path: join(pasta(process.env.FATIAS), `fatia-${String(i).padStart(2, '0')}.png`), fullPage: true, clip: { x: 0, y, width: 1760, height: Math.min(1150, total - y) }, animations: 'disabled' });
}
await navegador.close();
await fechar();
console.log(`fotos das peças: ${folhas.length} folhas em ${saida}`);
