// Os tocáveis: todo tocável do app tem nome acessível e 44 de toque (crescendo só para o lado livre).
// Passa por todas as referências, no fluxo e paradas, e mede a área de toque de verdade (o que o ponto acerta).
import { chromium } from 'playwright';
import { casosPedidos, construir, servir, abrirTela, ir, enderecoDaFidelidade } from './_comum.mjs';

const pedidos = casosPedidos();
construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador);
const achados = new Map();
let total = 0;

// com o vidro ligado as peças tomam a forma da biblioteca, então a régua vale nos dois materiais
const MATERIAIS = [['sólido', (ref) => enderecoDaFidelidade(ref)], ['vidro', (ref) => `ref=${ref}&so-app=1&tema=escuro`]];
for (const [material, endereco] of MATERIAIS) for (const c of pedidos) {
  await ir(pagina, base, endereco(c.ref));
  const r = await pagina.evaluate(() => {
    const raiz = document.getElementById('tela-do-aparelho');
    const sel = 'button, a[href], input, textarea, select, [role="button"], [role="switch"], [role="radio"], [role="tab"], [role="link"], [role="checkbox"], [tabindex]:not([tabindex="-1"])';
    const nomeDe = (el) => {
      const rot = el.getAttribute('aria-label');
      if (rot) return rot.trim();
      const por = el.getAttribute('aria-labelledby');
      if (por) return por.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? '').join(' ').trim();
      if (el.id) { const l = document.querySelector(`label[for="${el.id}"]`); if (l) return l.textContent.trim(); }
      const dentro = el.closest('label'); if (dentro) return dentro.textContent.trim();
      return (el.textContent ?? '').trim() || (el.getAttribute('title') ?? '').trim() || (el.getAttribute('placeholder') ?? '').trim();
    };
    const fora = [];
    let n = 0;
    for (const el of raiz.querySelectorAll(sel)) {
      if (el.closest('[data-do-sistema]')) continue; // o teclado e os alertas são do celular
      const cx = el.getBoundingClientRect();
      if (cx.width === 0 || cx.height === 0) continue;
      const estilo = getComputedStyle(el);
      if (estilo.visibility === 'hidden' || estilo.pointerEvents === 'none' && !raiz.classList.contains('parado')) continue;
      n++;
      const nome = nomeDe(el);
      // a área de toque: a caixa do elemento e a dos pseudo-elementos que a aumentam
      let larg = cx.width, alt = cx.height;
      for (const ps of ['::before', '::after']) {
        const e = getComputedStyle(el, ps);
        if (e.content === 'none' || e.position !== 'absolute') continue;
        const cima = parseFloat(e.top), baixo = parseFloat(e.bottom), esq = parseFloat(e.left), dir = parseFloat(e.right);
        if ([cima, baixo, esq, dir].some(Number.isNaN)) continue;
        larg = Math.max(larg, cx.width - esq - dir); alt = Math.max(alt, cx.height - cima - baixo);
      }
      const rotulo = (nome || el.className || el.tagName).toString().slice(0, 40);
      if (!nome) fora.push(`sem nome · <${el.tagName.toLowerCase()} class="${el.className}">`);
      if (larg < 43.5 || alt < 43.5) fora.push(`toque de ${Math.round(larg)} × ${Math.round(alt)} · ${rotulo}`);
    }
    return { n, fora };
  });
  total += r.n;
  for (const f of r.fora) achados.set(`${material} · ${f}`, [...(achados.get(`${material} · ${f}`) ?? []), c.ref]);
}
await navegador.close();
await fechar();
if (achados.size) {
  console.error(`tocáveis: REPROVADO · ${achados.size} problema(s) em ${total} tocáveis`);
  for (const [f, refs] of achados) console.error(` - ${f} · em ${refs.length} referência(s): ${refs.slice(0, 6).join(', ')}${refs.length > 6 ? '…' : ''}`);
  process.exit(1);
}
console.log(`tocáveis: APROVADO · ${total} tocáveis em ${pedidos.length} referências, sólidas e de vidro, todos com nome e 44 de toque`);
