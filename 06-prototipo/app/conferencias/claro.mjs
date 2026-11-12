// O claro, tela por tela. O claro não tem referência: nasce dos tokens. Esta conferência fotografa as 145
// referências com tema=claro, em 06-prototipo/fotos/claro/, e mede o contraste de cada texto contra o fundo
// que ele tem na tela. O que fica abaixo da régua é listado por par de cores, com um exemplo, para ser olhado.
// A régua: 4,5:1 no texto, 3:1 no texto grande (24 px, ou 18,66 px em negrito). Ficam de fora o que está
// desligado, a dica dentro de campo, o que está coberto por um véu e o que é do celular (teclado, alerta, push).
//   node conferencias/claro.mjs [T05] [--sem-build] [--sem-fotos] [--tema=escuro] [--fundo=anterior]
//   --fundo=anterior mede o fundo de antes (?fundo=anterior) e guarda as fotos em fotos/fundo-anterior/<tema>
//   --receita=android mede a receita do Android (?receita=android) e guarda as fotos em fotos/android/<tema>
//   FOLHA=pasta  também grava folhas de contato de 15 telas, para olhar todas (não vai para o repositório)
import { chromium } from 'playwright';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { PNG } from 'pngjs';
import { FOTOS, casosPedidos, construir, servir, ir, pasta } from './_comum.mjs';

const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const razao = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const tema = (process.argv.find((a) => a.startsWith('--tema=')) ?? '--tema=claro').slice(7);
const comFotos = !process.argv.includes('--sem-fotos');
const fundoAnterior = process.argv.includes('--fundo=anterior');
const receitaAndroid = process.argv.includes('--receita=android');
const pedidos = casosPedidos();
if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
const saida = comFotos ? pasta(receitaAndroid ? join(FOTOS, 'android', tema) : fundoAnterior ? join(FOTOS, 'fundo-anterior', tema) : join(FOTOS, tema)) : null;
const pares = {};
const feitas = [];
let medidos = 0;
for (const c of pedidos) {
  await ir(pagina, base, `ref=${c.ref}&so-app=1&tema=${tema}${fundoAnterior ? '&fundo=anterior' : ''}${receitaAndroid ? '&receita=android' : ''}`);
  await pagina.waitForTimeout(250);
  if (saida) { const f = join(saida, `${c.ref}.png`); await pagina.screenshot({ path: f, animations: 'disabled' }); feitas.push(f); }
  const textos = await pagina.evaluate(() => {
    const achados = [];
    const raiz = document.querySelector('#tela-do-aparelho');
    const anda = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    // o indicador de início é do celular e fica por cima de tudo, sem receber o toque: o texto atrás dele está coberto
    const hb = raiz.querySelector(':scope > .hb')?.getBoundingClientRect() ?? document.querySelector('.hb')?.getBoundingClientRect();
    for (let no = anda.nextNode(); no; no = anda.nextNode()) {
      if (!no.textContent.trim()) continue;
      const pai = no.parentElement;
      if (pai.closest('[data-do-sistema], .kb, .sa, .sys, .sysb, .fx-push, [disabled], [aria-disabled="true"], .dis, .plc, .off')) continue;
      const e = getComputedStyle(pai);
      if (e.visibility === 'hidden' || parseFloat(e.opacity) === 0) continue;
      const faixa = document.createRange(); faixa.selectNodeContents(no);
      for (const r of faixa.getClientRects()) {
        if (r.width < 4 || r.height < 6 || r.bottom <= 0 || r.top >= 844 || r.right <= 0 || r.left >= 390) continue;
        const porCima = document.elementFromPoint(Math.min(389, Math.max(0, r.left + r.width / 2)), Math.min(843, Math.max(0, r.top + r.height / 2)));
        if (porCima && !(pai.contains(porCima) || porCima.contains(pai))) continue;
        if (hb && hb.width && r.left < hb.right && r.right > hb.left && r.top < hb.bottom && r.bottom > hb.top) continue;
        const px = parseFloat(e.fontSize);
        achados.push({ x: r.left, y: r.top, w: r.width, h: r.height, cor: e.color.match(/[\d.]+/g).map(Number), grande: px >= 24 || (px >= 18.66 && parseInt(e.fontWeight, 10) >= 700), classe: (pai.className?.toString() || pai.tagName).slice(0, 24), paiDoPai: (pai.parentElement?.className?.toString() || '').slice(0, 24), texto: no.textContent.trim().slice(0, 26) });
      }
    }
    return achados;
  });
  await pagina.addStyleTag({ content: '#tela-do-aparelho, #tela-do-aparelho * { color: transparent !important; caret-color: transparent !important; text-decoration-color: transparent !important; -webkit-text-fill-color: transparent !important; } #tela-do-aparelho input::placeholder, #tela-do-aparelho textarea::placeholder { color: transparent !important; }' });
  await pagina.waitForTimeout(60);
  const foto = PNG.sync.read(await pagina.screenshot({ animations: 'disabled' }));
  for (const t of textos) {
    const alfa = t.cor[3] ?? 1;
    // o fundo do texto: a cor mais frequente na caixa dele, com o texto apagado
    const conta = new Map();
    for (let y = Math.max(0, Math.floor(t.y * 2)); y < Math.min(foto.height, Math.ceil((t.y + t.h) * 2)); y += 2) for (let x = Math.max(0, Math.floor(t.x * 2)); x < Math.min(foto.width, Math.ceil((t.x + t.w) * 2)); x += 2) {
      const i = (y * foto.width + x) * 4;
      const k = (foto.data[i] << 16) | (foto.data[i + 1] << 8) | foto.data[i + 2];
      conta.set(k, (conta.get(k) ?? 0) + 1);
    }
    if (!conta.size) continue;
    const [k] = [...conta.entries()].sort((a, b) => b[1] - a[1])[0];
    const fundo = [(k >> 16) & 255, (k >> 8) & 255, k & 255];
    const cor = t.cor.slice(0, 3).map((v, i) => v * alfa + fundo[i] * (1 - alfa));
    const r = razao(lum(...cor), lum(...fundo));
    medidos++;
    // a razão é comparada com uma casa decimal, como as tabelas de contraste escrevem (4,47 é 4,5)
    if (Math.round(r * 10) / 10 >= (t.grande ? 3 : 4.5)) continue;
    const chave = `${hex(cor)} sobre ${hex(fundo)}`;
    const p = (pares[chave] ??= { r, n: 0, refs: new Set(), exemplo: `${c.ref} · .${t.classe} em .${t.paiDoPai} · "${t.texto}"`, grande: t.grande });
    p.n++; p.refs.add(c.ref); if (r < p.r) p.r = r;
  }
}
if (process.env.FOLHA && feitas.length) {
  for (let i = 0; i < feitas.length; i += 15) {
    const html = join(pasta(process.env.FOLHA), `claro-${String(i / 15).padStart(2, '0')}.html`);
    writeFileSync(html, `<body style="margin:10px;background:#777;display:grid;grid-template-columns:repeat(5,300px);gap:10px;font:12px sans-serif;color:#fff">${feitas.slice(i, i + 15).map((f) => `<div><img src="${pathToFileURL(f).href}" width="300"><br>${f.slice(-10, -4)}</div>`).join('')}</body>`);
    const folha = await (await navegador.newContext({ viewport: { width: 5 * 300 + 60, height: 3 * 675 + 20 }, deviceScaleFactor: 1 })).newPage();
    await folha.goto(pathToFileURL(html).href, { waitUntil: 'load' });
    await folha.screenshot({ path: html.replace('.html', '.png') });
    await folha.context().close();
  }
}
await navegador.close();
await fechar();
const lista = Object.entries(pares).sort((a, b) => a[1].r - b[1].r);
for (const [chave, p] of lista) console.log(`${p.r.toFixed(1).padStart(4)}:1  ${chave}  ${String(p.n).padStart(4)}× em ${String(p.refs.size).padStart(3)} telas${p.grande ? ' (grande)' : ''}  ${p.exemplo}`);
console.log(`${tema}: ${lista.length ? 'REPROVADO' : 'APROVADO'} · ${medidos} textos medidos em ${pedidos.length} referências · ${lista.length} par(es) de cor abaixo da régua${saida ? ` · fotos em ${saida}` : ''}`);
process.exit(lista.length ? 1 : 0);
