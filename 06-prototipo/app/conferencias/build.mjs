// O build: o build de produção sobe e abre, sem nenhuma chamada para fora. E a tela do aparelho mede 390 × 844.
import { chromium, webkit } from 'playwright';
import { construir, servir, abrirTela, ir } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const erros = [];
for (const [nome, motor] of [['chromium', chromium], ['webkit', webkit]]) {
  const navegador = await motor.launch();
  const { pagina } = await abrirTela(navegador, { largura: 1440, altura: 1024, escala: 1 });
  const fora = [];
  const falhas = [];
  pagina.on('request', (r) => { const u = new URL(r.url()); if (!['127.0.0.1', 'localhost'].includes(u.hostname) && u.protocol !== 'data:' && u.protocol !== 'blob:') fora.push(r.url()); });
  pagina.on('pageerror', (e) => falhas.push(String(e)));
  pagina.on('console', (m) => { if (m.type() === 'error') falhas.push(m.text()); });
  pagina.on('response', (r) => { if (r.status() >= 400) falhas.push(`${r.status()} ${r.url()}`); });
  for (const busca of ['', 'ref=T05-00', 'ref=T07-01&tema=claro', 'so-app=1&vidro=0', 'vitrine=pecas', 'vitrine=vidro']) {
    await ir(pagina, base, busca);
    await pagina.waitForTimeout(300);
  }
  await ir(pagina, base, 'so-app=1');
  const medida = await pagina.evaluate(() => { const t = document.getElementById('tela-do-aparelho'); return [t.offsetWidth, t.offsetHeight]; });
  if (medida[0] !== 390 || medida[1] !== 844) erros.push(`${nome}: a tela do aparelho mede ${medida.join(' × ')}, e não 390 × 844`);
  if (fora.length) erros.push(`${nome}: ${fora.length} chamada(s) para fora: ${[...new Set(fora)].slice(0, 5).join(', ')}`);
  if (falhas.length) erros.push(`${nome}: ${falhas.length} erro(s) na página: ${[...new Set(falhas)].slice(0, 5).join(' | ')}`);
  await navegador.close();
}
await fechar();
if (erros.length) { console.error('build: REPROVADO'); erros.forEach((e) => console.error(' - ' + e)); process.exit(1); }
console.log('build: APROVADO · sobe e abre no Chromium e no WebKit, sem chamada para fora · a tela do aparelho mede 390 × 844');
