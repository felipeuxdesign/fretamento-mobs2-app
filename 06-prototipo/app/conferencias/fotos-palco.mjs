// As fotos do palco, em 06-prototipo/fotos/palco/: em 1440 × 1024, comparadas com os palcos P1 a P4 da folha F11,
// e a gaveta do celular com os P5 a P7. A comparação mede o palco em volta (o botão do canto, a moldura, a coluna,
// o painel, o tocador): a tela do app é medida pela fidelidade, e fica de fora aqui.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { RAIZ, FOTOS, construir, servir, ir, pasta, tabela } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const saida = pasta(join(FOTOS, 'palco'));
const navegador = await chromium.launch();

// onde cada palco está na folha F11
const folha = await (await navegador.newContext({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 })).newPage();
await folha.goto(pathToFileURL(join(RAIZ, '03-design-system/folhas/html/F11-palco.html')).href);
await folha.evaluate(() => document.fonts.ready);
const caixas = await folha.evaluate(() => [...document.querySelectorAll('.pl-stage, .fx-cel')].map((e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), cel: e.classList.contains('fx-cel') }; }));
const png = PNG.sync.read(readFileSync(join(RAIZ, '03-design-system/folhas/png/F11-palco.png')));
const recorte = (c) => { const o = new PNG({ width: c.w, height: c.h }); PNG.bitblt(png, o, c.x, c.y, c.w, c.h, 0, 0); return o; };
const palcos = caixas.filter((c) => !c.cel);
const celulares = caixas.filter((c) => c.cel);

const pagina = await (await navegador.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 })).newPage();
const linhas = [];
const cenas = [
  ['P1', 'o caminho feliz, no Início, com o dia andando', async () => { await ir(pagina, base, 'ref=T05-00'); await pagina.getByRole('button', { name: 'Voltar ao fluxo' }).click(); }],
  ['P2', 'o painel aberto, no Entrar', async () => { await ir(pagina, base, 'ref=T01-00'); await pagina.getByRole('button', { name: 'Voltar ao fluxo' }).click(); await pagina.getByRole('button', { name: 'Abrir o painel do protótipo' }).click(); await pagina.getByRole('button', { name: /T01/ }).click(); }],
  ['P3', 'um estado parado, com o pedido de volta', async () => { await ir(pagina, base, 'ref=T05-20'); await pagina.mouse.click(720, 500); }],
  ['P4', 'o Mapa, com o dia', async () => { await ir(pagina, base, 'ref=T07-00'); await pagina.getByRole('button', { name: 'Voltar ao fluxo' }).click(); }],
];
for (let i = 0; i < cenas.length; i++) {
  const [nome, desc, monta] = cenas[i];
  await monta();
  await pagina.waitForTimeout(350);
  const foto = await pagina.screenshot({ animations: 'disabled' });
  writeFileSync(join(saida, `${nome}.png`), foto);
  if (palcos[i]) {
    const a = PNG.sync.read(foto), b = recorte(palcos[i]);
    writeFileSync(join(saida, `${nome}.folha.png`), PNG.sync.write(b));
    // a tela do app fica de fora: 390 × 844, em 525,90
    for (const im of [a, b]) for (let y = 90; y < 934; y++) for (let x = 525; x < 915; x++) { const k = (y * im.width + x) * 4; im.data[k] = im.data[k + 1] = im.data[k + 2] = 0; }
    const dif = new PNG({ width: a.width, height: a.height });
    const pontos = pixelmatch(a.data, b.data, dif.data, a.width, a.height, { threshold: 0.1 });
    writeFileSync(join(saida, `${nome}.dif.png`), PNG.sync.write(dif));
    linhas.push([nome, desc, ((100 * pontos) / (a.width * a.height)).toFixed(2).replace('.', ',') + ' %']);
    console.log(nome, ((100 * pontos) / (a.width * a.height)).toFixed(2) + ' % do palco em volta difere');
  }
}
// tudo anda no Tab; o palco não tem vidro e não muda com o tema do aparelho
await pagina.setViewportSize({ width: 1440, height: 1024 });
await ir(pagina, base, 'ref=T05-00');
await pagina.getByRole('button', { name: 'Voltar ao fluxo' }).click();
const visitados = new Set();
for (let i = 0; i < 80; i++) { await pagina.keyboard.press('Tab'); visitados.add(await pagina.evaluate(() => { const a = document.activeElement; return a?.closest('#tela-do-aparelho') ? 'app' : (a?.className?.toString().split(' ').find((c) => c.startsWith('pl-') && c !== 'pl-pele') ?? a?.tagName); })); }
const noTab = ['pl-cnr', 'pl-st', 'pl-sk', 'pl-pp', 'pl-vel'].filter((c) => !visitados.has(c));
const antes = await pagina.evaluate(() => getComputedStyle(document.querySelector('.pl-stage')).backgroundColor + getComputedStyle(document.querySelector('.pl-ttl')).color);
await pagina.getByRole('button', { name: 'Abrir o painel do protótipo' }).click();
await pagina.getByRole('switch', { name: 'Modo claro' }).click();
const depois = await pagina.evaluate(() => ({ palco: getComputedStyle(document.querySelector('.pl-stage')).backgroundColor + getComputedStyle(document.querySelector('.pl-ttl')).color, app: document.getElementById('tela-do-aparelho').dataset.tema, vidros: [...document.querySelectorAll('.pl *')].filter((e) => !e.closest('#tela-do-aparelho') && (getComputedStyle(e).backdropFilter || 'none') !== 'none').length }));
await pagina.screenshot({ path: join(saida, 'P2-com-o-aparelho-claro.png'), animations: 'disabled' });
const provas = [`Tab: ${noTab.length ? 'NÃO alcança ' + noTab.join(', ') : 'alcança o botão do canto, as linhas de estado e o tocador'}`, `tema: o aparelho foi para "${depois.app}" e o palco ${antes === depois.palco ? 'não mudou' : 'MUDOU'}`, `vidro no palco: ${depois.vidros ? depois.vidros + ' elemento(s) COM desfoque' : 'nenhum'}`];
console.log(provas.join(' · '));
await pagina.evaluate(() => { try { localStorage.clear(); } catch {} });
// a janela baixa: o aparelho encolhe por inteiro e a lista rola por dentro
await pagina.setViewportSize({ width: 1440, height: 700 });
await ir(pagina, base, 'ref=T05-00');
await pagina.waitForTimeout(200);
const baixa = await pagina.evaluate(() => { const a = document.querySelector('[data-aparelho]').getBoundingClientRect(); const l = document.querySelector('.pl-ls'); return { topo: a.top, pe: a.bottom, janela: innerHeight, rola: l.scrollHeight > l.clientHeight, tocador: !!document.querySelector('.pl-dia') && document.querySelector('.pl-dia').getBoundingClientRect().bottom <= innerHeight }; });
await pagina.screenshot({ path: join(saida, 'janela-baixa.png'), animations: 'disabled' });
console.log('janela baixa (1440 × 700):', JSON.stringify(baixa));
// a gaveta, no celular
const cel = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
await ir(cel, base, 'palco=1&ref=T05-00');
await cel.screenshot({ path: join(saida, 'P5-celular-aba.png'), animations: 'disabled' });
await cel.getByRole('button', { name: 'Abrir o palco' }).click();
await cel.waitForTimeout(350);
await cel.screenshot({ path: join(saida, 'P6-celular-gaveta.png'), animations: 'disabled' });
await cel.evaluate(() => { const l = document.querySelector('.pl-dsb'); l.scrollTop = l.scrollHeight; });
await cel.waitForTimeout(150);
await cel.screenshot({ path: join(saida, 'P7-celular-gaveta-no-fim.png'), animations: 'disabled' });
for (let i = 0; i < celulares.length && i < 3; i++) writeFileSync(join(saida, `P${5 + i}.folha.png`), PNG.sync.write(recorte(celulares[i])));
writeFileSync(join(saida, 'tabela.md'), `# O palco contra a folha F11\n\nO palco fotografado em 1440 × 1024 e comparado com os palcos da folha F11. A tela do app fica de fora (é medida pela fidelidade). A janela baixa (1440 × 700): ${baixa.pe <= baixa.janela && baixa.topo >= 0 ? 'o aparelho encolhe por inteiro' : 'O APARELHO CORTA'}; ${baixa.rola ? 'a lista rola por dentro' : 'a lista coube'}; ${baixa.tocador ? 'o tocador fica à vista' : 'O TOCADOR SAIU DA VISTA'}. ${provas.join('; ')}.\n\n${tabela(['palco', 'o que mostra', 'parte do palco em volta que difere'], linhas)}\n`);
await navegador.close();
await fechar();
