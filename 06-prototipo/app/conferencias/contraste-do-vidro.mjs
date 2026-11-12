// O contraste sobre o vidro: mede, na vitrine do vidro, o contraste do texto de cada peça de vidro contra o que
// passa atrás dela, ponto a ponto, nos quatro fundos e nos dois temas. Guarda o pior de cada peça em
// src/vitrine/contraste.json (a vitrine mostra a medida ao lado da peça) e reprova abaixo de 4,5:1.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { APP, construir, servir, ir } from './_comum.mjs';

const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const razao = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const resultado = {};
for (const tema of ['escuro', 'claro']) {
  const contexto = await navegador.newContext({ viewport: { width: 2120, height: 1200 }, deviceScaleFactor: 1 });
  const pagina = await contexto.newPage();
  await ir(pagina, base, `vitrine=vidro&tema=${tema}`);
  await pagina.waitForTimeout(500);
  // os textos de cada peça de vidro: a caixa e a cor de cada um
  const textos = await pagina.evaluate(() => {
    const achados = [];
    // o segmentado é o da biblioteca, com o trilho de vidro claro: ele mora na página lisa (o Entrar) e num cartão
    // (a Aparência), nunca sobre conteúdo que rola ou sobre o mapa. O conteúdo de vidro mora sobre o fundo de luz da
    // tela, nunca sobre o mapa nem sobre outro conteúdo. O painel e a barra do mapa só existem sobre o mapa. A régua
    // de cada um é o fundo onde mora; nas telas, quem cobra é a conferência do vidro nas telas
    const ONDE_MORA = { segmentado: ['liso'], conteudo: ['liso'], painelDoMapa: ['mapa', 'pior'], barraDoMapa: ['mapa', 'pior'] };
    for (const secao of document.querySelectorAll('[data-peca-da-vitrine]')) {
      const peca = secao.getAttribute('data-peca-da-vitrine');
      for (const quadro of secao.querySelectorAll('[data-material-do-quadro="vidro"]')) {
        const fundo = quadro.getAttribute('data-fundo');
        if (ONDE_MORA[peca] && !ONDE_MORA[peca].includes(fundo)) continue;
        const alvos = quadro.querySelectorAll(`[data-peca-de-vidro="${peca}"][data-material="vidro"]`);
        for (const alvo of alvos) {
          const anda = document.createTreeWalker(alvo, NodeFilter.SHOW_TEXT);
          for (let no = anda.nextNode(); no; no = anda.nextNode()) {
            if (!no.textContent.trim()) continue;
            const pai = no.parentElement;
            // o texto sobre uma superfície sólida dentro do vidro (botão, selo, avatar) não é texto sobre vidro
            let solido = false;
            for (let e = pai; e && e !== alvo; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (c && !/rgba?\(0, 0, 0, 0\)|transparent/.test(c) && !/, 0(\.[0-2]\d*)?\)$/.test(c)) solido = true; }
            if (solido) continue;
            // os botões do alerta usam o azul do sistema, que é do celular e não passa por esta régua
            if (pai.closest('.sys .a, .sysb .a')) continue;
            const faixa = document.createRange(); faixa.selectNodeContents(no);
            for (const r of faixa.getClientRects()) {
              if (r.width < 4 || r.height < 6) continue;
              const cor = getComputedStyle(pai).color.match(/[\d.]+/g).map(Number);
              achados.push({ peca, fundo, x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height, cor, texto: no.textContent.trim().slice(0, 30) });
            }
          }
        }
      }
    }
    return achados;
  });
  // some o texto e os glifos, e fotografa o que fica atrás
  await pagina.addStyleTag({ content: '[data-material="vidro"], [data-material="vidro"] * { color: transparent !important; } [data-material="vidro"] svg { visibility: hidden !important; }' });
  await pagina.waitForTimeout(150);
  const foto = PNG.sync.read(await pagina.screenshot({ fullPage: true, animations: 'disabled' }));
  for (const t of textos) {
    const lt = lum(t.cor[0], t.cor[1], t.cor[2]);
    let pior = Infinity;
    for (let y = Math.max(0, Math.floor(t.y)); y < Math.min(foto.height, Math.ceil(t.y + t.h)); y++) for (let x = Math.max(0, Math.floor(t.x)); x < Math.min(foto.width, Math.ceil(t.x + t.w)); x++) {
      const i = (y * foto.width + x) * 4;
      const c = razao(lt, lum(foto.data[i], foto.data[i + 1], foto.data[i + 2]));
      if (c < pior) pior = c;
    }
    const r = (resultado[t.peca] ??= {});
    if (r[tema] === undefined || pior < r[tema]) { r[tema] = Math.round(pior * 10) / 10; r[`onde-${tema}`] = `"${t.texto}" sobre ${{ mapa: 'o mapa', inicio: 'o Início rolado', liso: 'a página lisa', pior: 'o pior caso' }[t.fundo]}`; }
  }
  await contexto.close();
}
await navegador.close();
await fechar();
const saida = {};
let abaixo = 0;
for (const [peca, r] of Object.entries(resultado)) {
  saida[peca] = { escuro: r.escuro, claro: r.claro, onde: `pior no escuro: ${r['onde-escuro'] ?? 'sem texto'}; no claro: ${r['onde-claro'] ?? 'sem texto'}` };
  for (const tema of ['escuro', 'claro']) if (r[tema] !== undefined && r[tema] < 4.5) abaixo++;
  console.log(`${peca.padEnd(18)} escuro ${String(r.escuro ?? '-').padStart(5)}  claro ${String(r.claro ?? '-').padStart(5)}  ${r['onde-escuro'] ?? ''} | ${r['onde-claro'] ?? ''}`);
}
if (!process.argv.includes('--sem-gravar')) writeFileSync(join(APP, 'src/vitrine/contraste.json'), JSON.stringify(saida, null, 1) + '\n');
console.log(`contraste do vidro: ${abaixo ? `REPROVADO · ${abaixo} medida(s) abaixo de 4,5:1` : 'APROVADO · todo texto sobre vidro a 4,5:1 ou mais no pior fundo'}`);
process.exit(abaixo ? 1 : 0);
