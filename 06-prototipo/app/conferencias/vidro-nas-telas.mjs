// O vidro nas telas: nas 145 referências, com o vidro ligado, nos dois temas, confere que nenhuma peça de vidro
// fica dentro de outra, que nada começa nem termina escondido atrás da barra ou do rodapé, e mede o contraste do texto de cada peça de vidro contra o que passa atrás dela na tela.
// Ficam fora da régua do contraste o texto de controle desligado e o que está coberto pelo véu de um sheet ou alerta.
//   node conferencias/vidro-nas-telas.mjs [T07] [--sem-build]
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import { casosPedidos, construir, servir, ir } from './_comum.mjs';

const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const razao = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const pedidos = casosPedidos();
if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pior = {};
const dentro = [];
let medidas = 0;
let superficies = 0;
const tapados = [];
for (const tema of ['escuro', 'claro']) {
  const pagina = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
  for (const c of pedidos) {
    await ir(pagina, base, `ref=${c.ref}&so-app=1&tema=${tema}`);
    await pagina.waitForTimeout(250);
    const { textos, aninhadas, quantas } = await pagina.evaluate(() => {
      const achados = [];
      const aninhadas = [];
      let quantas = 0;
      // as bordas de rolagem apagam de propósito o que passa por baixo delas: o texto ali não é para ser lido
      const bordas = [...document.querySelectorAll('.borda-de-rolagem')].map((b) => b.getBoundingClientRect());
      for (const alvo of document.querySelectorAll('[data-material="vidro"]')) {
        const peca = alvo.getAttribute('data-peca-de-vidro') ?? alvo.className.toString().slice(0, 30);
        const mae = alvo.parentElement?.closest('[data-material="vidro"]');
        // vidro dentro de vidro é uma superfície que desfoca o fundo dentro de outra que também desfoca.
        // O banner e os botões da barra, dentro da barra de vidro, usam o vidro dela: não têm superfície própria
        // o desfoque do material mora na própria peça ou numa camada dela (::before, ::after)
        const desfoca = (el) => [null, '::before', '::after'].some((ps) => { const e = getComputedStyle(el, ps); return (e.backdropFilter && e.backdropFilter !== 'none') || (e.webkitBackdropFilter && e.webkitBackdropFilter !== 'none'); });
        if (desfoca(alvo)) quantas++;
        // o conteúdo de vidro (cartões e listas) é a camada de base: os controles moram dentro dele. O que não pode é
        // uma peça que flutua dentro de outra, nem conteúdo de vidro dentro de uma peça que flutua
        const CONTROLES = ['botoes', 'campos', 'segmentado', 'switch', 'selos'];
        const dentroDoConteudo = mae?.getAttribute('data-peca-de-vidro') === 'conteudo' && CONTROLES.includes(peca);
        if (mae && desfoca(alvo) && desfoca(mae) && !dentroDoConteudo) aninhadas.push(`${peca} dentro de ${mae.getAttribute('data-peca-de-vidro')}`);
        if (alvo.closest('[data-do-sistema]')) continue; // o alerta e a folha são do celular
        // o selo e o campo têm o preenchimento deles e moram no conteúdo: o contraste deles é cobrado pela conferência do claro
        if (peca === 'selos' || peca === 'campos') continue;
        const anda = document.createTreeWalker(alvo, NodeFilter.SHOW_TEXT);
        for (let no = anda.nextNode(); no; no = anda.nextNode()) {
          if (!no.textContent.trim()) continue;
          const pai = no.parentElement;
          if (pai.closest('[disabled], [aria-disabled="true"], .dis, .plc')) continue;
          // o texto sobre uma superfície sólida dentro do vidro (botão, selo, cartão) não é texto sobre vidro
          let solido = false;
          for (let e = pai; e && e !== alvo; e = e.parentElement) { const cor = getComputedStyle(e).backgroundColor; if (cor && !/rgba?\(0, 0, 0, 0\)|transparent/.test(cor) && !/, 0(\.[0-2]\d*)?\)$/.test(cor)) solido = true; }
          if (solido) continue;
          const faixa = document.createRange(); faixa.selectNodeContents(no);
          for (const r of faixa.getClientRects()) {
            if (r.width < 4 || r.height < 6 || r.bottom < 0 || r.top > 844) continue;
            // o que está coberto por outra coisa (o véu de um sheet ou de um alerta) não é para ser lido agora
            const porCima = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            if (porCima && !alvo.contains(porCima)) continue;
            if (bordas.some((b) => b.width && r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top)) continue;
            achados.push({ peca, x: r.left, y: r.top, w: r.width, h: r.height, cor: getComputedStyle(pai).color.match(/[\d.]+/g).map(Number), texto: no.textContent.trim().slice(0, 28) });
          }
        }
      }
      return { textos: achados, aninhadas, quantas };
    });
    superficies += quantas;
    for (const a of aninhadas) dentro.push(`${c.ref} (${tema}): ${a}`);
    // nada começa escondido atrás da barra de vidro: com a tela no topo da rolagem, o primeiro texto do miolo
    // fica abaixo dela; e, no fim da rolagem, o último fica acima do rodapé de vidro
    if (tema === 'escuro') {
      const tapado = await pagina.evaluate(async () => {
        const miolo = document.querySelector('#tela-do-aparelho main');
        const topo = document.querySelector('#tela-do-aparelho .topo.flutua');
        const rodape = document.querySelector('#tela-do-aparelho .lugar-do-rodape.flutua');
        if (!miolo || (!topo && !rodape)) return null;
        const textos = () => { const out = []; const anda = document.createTreeWalker(miolo, NodeFilter.SHOW_TEXT); for (let no = anda.nextNode(); no; no = anda.nextNode()) { if (!no.textContent.trim()) continue; const f = document.createRange(); f.selectNodeContents(no); const r = f.getBoundingClientRect(); if (r.height > 4) out.push(r); } return out; };
        const problemas = [];
        const antes = miolo.scrollTop;
        miolo.scrollTop = 0;
        await new Promise((r) => requestAnimationFrame(r));
        const primeiro = Math.min(...textos().map((r) => r.top));
        if (topo && primeiro < topo.getBoundingClientRect().bottom - 1) problemas.push(`o começo do miolo fica ${Math.round(topo.getBoundingClientRect().bottom - primeiro)} px atrás da barra`);
        miolo.scrollTop = miolo.scrollHeight;
        await new Promise((r) => requestAnimationFrame(r));
        const ultimo = Math.max(...textos().map((r) => r.bottom));
        if (rodape && ultimo > rodape.getBoundingClientRect().top + 1) problemas.push(`o fim do miolo fica ${Math.round(ultimo - rodape.getBoundingClientRect().top)} px atrás do rodapé`);
        miolo.scrollTop = antes;
        return problemas;
      });
      for (const t of tapado ?? []) tapados.push(`${c.ref}: ${t}`);
    }
    if (!textos.length) continue;
    await pagina.addStyleTag({ content: '[data-material="vidro"], [data-material="vidro"] * { color: transparent !important; caret-color: transparent !important; } [data-material="vidro"] svg, [data-material="vidro"] img { visibility: hidden !important; }' });
    await pagina.waitForTimeout(80);
    const foto = PNG.sync.read(await pagina.screenshot({ animations: 'disabled' }));
    for (const t of textos) {
      const lt = lum(t.cor[0], t.cor[1], t.cor[2]);
      let menor = Infinity;
      for (let y = Math.max(0, Math.floor(t.y)); y < Math.min(foto.height, Math.ceil(t.y + t.h)); y++) for (let x = Math.max(0, Math.floor(t.x)); x < Math.min(foto.width, Math.ceil(t.x + t.w)); x++) {
        const i = (y * foto.width + x) * 4;
        const k = razao(lt, lum(foto.data[i], foto.data[i + 1], foto.data[i + 2]));
        if (k < menor) menor = k;
      }
      medidas++;
      const chave = `${t.peca} · ${tema}`;
      if (!pior[chave] || menor < pior[chave].k) pior[chave] = { k: menor, onde: `${c.ref} · "${t.texto}"` };
    }
  }
  await pagina.context().close();
}
await navegador.close();
await fechar();
let abaixo = 0;
for (const [chave, p] of Object.entries(pior).sort()) {
  if (p.k < 4.5) abaixo++;
  console.log(`${p.k < 4.5 ? '✗' : '·'} ${chave.padEnd(28)} ${p.k.toFixed(1).padStart(5)}:1  ${p.onde}`);
}
dentro.slice(0, 12).forEach((d) => console.log(`✗ vidro dentro de vidro: ${d}`));
tapados.slice(0, 20).forEach((d) => console.log(`✗ atrás do vidro: ${d}`));
const ok = !abaixo && !dentro.length && !tapados.length;
console.log(`superfícies de vidro que desfocam, somadas nas telas: ${superficies}`);
console.log(`vidro nas telas: ${ok ? `APROVADO · ${medidas} textos sobre vidro em ${pedidos.length} referências, nos dois temas, todos a 4,5:1 ou mais; nenhuma peça de vidro dentro de outra; nada começa nem termina escondido atrás da barra ou do rodapé` : `REPROVADO · ${abaixo} peça(s) com texto abaixo de 4,5:1 · ${dentro.length} caso(s) de vidro dentro de vidro · ${tapados.length} tela(s) com conteúdo atrás do vidro`}`);
process.exit(ok ? 0 : 1);
