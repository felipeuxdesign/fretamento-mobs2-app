// O vidro por nível: nenhum vidro dentro de vidro. O vidro só pega cor do que passa por trás dele; dentro de outro
// vidro, o que está atrás já foi desfocado, e o segundo desfoque só pesa e embaça. Esta conferência lista, nas 145
// referências e nos dois temas, todo elemento com backdrop-filter que tenha um ancestral também com backdrop-filter.
// Conta o elemento e as duas camadas geradas dele (::before e ::after): a camada gerada pertence a quem a gerou.
// O resultado tem de ser zero.
//   node conferencias/vidro-em-vidro.mjs [T05] [--sem-build] [--tema=escuro|claro]
import { chromium } from 'playwright';
import { casosPedidos, construir, servir, ir } from './_comum.mjs';

const pedidos = casosPedidos();
const soTema = process.argv.find((a) => a.startsWith('--tema='))?.slice(7);
if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
const pares = {};
let aninhados = 0, medidos = 0;
for (const tema of soTema ? [soTema] : ['escuro', 'claro']) {
  for (const c of pedidos) {
    await ir(pagina, base, `ref=${c.ref}&so-app=1&tema=${tema}`);
    const achados = await pagina.evaluate(() => {
      const raiz = document.getElementById('tela-do-aparelho');
      const tem = (e, pseudo) => { const s = getComputedStyle(e, pseudo); if (pseudo && (s.content === 'none' || s.display === 'none')) return false; const v = s.backdropFilter || s.webkitBackdropFilter; return !!v && v !== 'none'; };
      const nome = (e) => (e.className?.toString().trim().split(/\s+/).slice(0, 3).join('.') || e.tagName.toLowerCase());
      // quem é vidro: o elemento, ou uma das camadas geradas dele
      const camadas = new Map();
      for (const e of [raiz, ...raiz.querySelectorAll('*')]) {
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const quais = [tem(e) && 'o elemento', tem(e, '::before') && '::before', tem(e, '::after') && '::after'].filter(Boolean);
        if (quais.length) camadas.set(e, quais);
      }
      const saida = [];
      for (const [e, quais] of camadas) {
        let dentroDe = null;
        for (let p = e.parentElement; p && p !== raiz.parentElement; p = p.parentElement) if (camadas.has(p)) { dentroDe = p; break; }
        // a camada gerada de um elemento que já é vidro também é vidro dentro de vidro
        const proprio = quais.includes('o elemento') && quais.length > 1;
        if (dentroDe) saida.push({ de: nome(dentroDe), quem: nome(e), camada: quais.join(' + ') });
        else if (proprio) saida.push({ de: nome(e), quem: nome(e), camada: quais.join(' + ') });
      }
      return { total: camadas.size, saida };
    });
    medidos += achados.total;
    for (const a of achados.saida) {
      aninhados++;
      const chave = `${a.quem} (${a.camada}) dentro de ${a.de}`;
      const p = (pares[chave] ??= { n: 0, refs: new Set(), exemplo: `${c.ref}, ${tema}` });
      p.n++; p.refs.add(c.ref);
    }
  }
}
await navegador.close();
await fechar();
for (const [chave, p] of Object.entries(pares).sort((a, b) => b[1].n - a[1].n)) console.log(`${String(p.n).padStart(5)}× em ${String(p.refs.size).padStart(3)} telas · ${chave} · ${p.exemplo}`);
console.log(`vidro em vidro: ${aninhados ? 'REPROVADO' : 'APROVADO'} · ${medidos} camadas de vidro em ${pedidos.length} referências${soTema ? `, no ${soTema}` : ', nos dois temas'} · ${aninhados} dentro de outra`);
process.exit(aninhados ? 1 : 0);
