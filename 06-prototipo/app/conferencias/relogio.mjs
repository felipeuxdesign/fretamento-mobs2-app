// O relógio: todo tempo relativo da tela sai do mesmo agora do estado, e o ônibus está onde o trilho diz.
// Em todos os estados do Início, das Paradas e do Mapa: cada relativo sob uma hora é a hora da parada menos o agora,
// com o mesmo arredondamento; o número do herói bate com a hora ao lado; e o nó do ônibus fica entre a última parada
// que passou e a próxima, dizendo o nome da próxima.
import { chromium } from 'playwright';
import { casos, mock, construir, servir, abrirTela, ir, enderecoDaFidelidade } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador);
const minutos = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const relativo = (agora, ate) => { const m = minutos(ate) - minutos(agora); return m <= 0 ? 'agora' : m < mock.regras.chegandoMin ? `menos de ${mock.regras.chegandoMin} min` : `${m} min`; };
const erros = [];
let estados = 0, relativos = 0, onibus = 0;
for (const c of casos.filter((x) => ['T05', 'T06', 'T07'].includes(x.tela))) {
  await ir(pagina, base, enderecoDaFidelidade(c.ref));
  const tela = await pagina.evaluate(() => {
    const limpa = (s) => (s ?? '').replace(/[\s ]+/g, ' ').trim();
    const trilhos = [...document.querySelectorAll('#tela-do-aparelho .trilho')].map((t) => ({
      agora: t.getAttribute('data-agora'),
      linhas: [...t.querySelectorAll(':scope > .row')].map((r) => {
        if (r.classList.contains('bus')) return { tipo: 'onibus', texto: limpa(r.querySelector('.busl')?.textContent) };
        if (r.classList.contains('grp')) return { tipo: 'grupo' };
        const rt = r.querySelector('.rt');
        const sob = limpa(rt?.querySelector('small')?.textContent);
        const hora = limpa(rt ? [...rt.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('') : '');
        return { tipo: 'parada', nome: limpa(r.querySelector('.rn > span')?.textContent), passada: !!r.querySelector('.mini.pass'), hora, sob };
      }),
    }));
    const herois = [...document.querySelectorAll('#tela-do-aparelho .heroi, #tela-do-aparelho .mhero[data-agora]')].map((h) => ({ agora: h.getAttribute('data-agora'), numero: limpa(h.querySelector('.hero, .big')?.textContent), comp: [...h.querySelectorAll('.comp')].map((e) => limpa(e.textContent)).join(' ') }));
    return { trilhos, herois };
  });
  estados++;
  const agoraDaTela = tela.trilhos.find((t) => t.agora)?.agora ?? tela.herois.find((h) => h.agora)?.agora;
  for (const t of tela.trilhos) {
    if (!t.agora) { erros.push(`${c.ref} · o trilho não diz o agora do estado`); continue; }
    for (const l of t.linhas) {
      if (l.tipo !== 'parada' || !/^\d\d:\d\d$/.test(l.hora) || !/^(\d+ min|menos de \d+ min|agora)$/.test(l.sob)) continue;
      relativos++;
      const certo = relativo(t.agora, l.hora);
      if (l.sob !== certo) erros.push(`${c.ref} · ${l.nome} ${l.hora}: diz "${l.sob}", e do agora (${t.agora}) é "${certo}"`);
    }
    const i = t.linhas.findIndex((l) => l.tipo === 'onibus');
    if (i < 0) continue;
    onibus++;
    const antes = t.linhas.slice(0, i).filter((l) => l.tipo === 'parada');
    const depois = t.linhas.slice(i + 1).filter((l) => l.tipo === 'parada');
    if (antes.some((l) => !l.passada)) erros.push(`${c.ref} · o ônibus está depois de uma parada que ainda não passou (${antes.find((l) => !l.passada).nome})`);
    if (depois.some((l) => l.passada)) erros.push(`${c.ref} · o ônibus está antes de uma parada que já passou (${depois.find((l) => l.passada).nome})`);
    const para = /^(?:Indo para|Chegando n)[ao]?s? (?:a |o )?(.+)$/.exec(t.linhas[i].texto)?.[1];
    if (para && depois[0] && !/seu ponto/.test(para) && !depois[0].nome.startsWith(para)) erros.push(`${c.ref} · o ônibus diz "${t.linhas[i].texto}", e a próxima parada é ${depois[0].nome}`);
  }
  for (const h of tela.herois) {
    const agora = h.agora ?? agoraDaTela;
    const n = /^(\d+) min$/.exec(h.numero)?.[1];
    const as = /às (\d\d:\d\d)/.exec(h.comp)?.[1];
    if (!agora || !n || !as) continue;
    relativos++;
    if (minutos(as) - minutos(agora) !== Number(n)) erros.push(`${c.ref} · o herói diz ${h.numero} às ${as}, e do agora (${agora}) são ${minutos(as) - minutos(agora)} min`);
  }
}
await navegador.close();
await fechar();
if (erros.length) { console.error(`relógio: REPROVADO · ${erros.length} desencontro(s) em ${estados} estados`); erros.forEach((e) => console.error(' - ' + e)); process.exit(1); }
console.log(`relógio: APROVADO · ${estados} estados do Início, das Paradas e do Mapa · ${relativos} tempos relativos batem com o agora do estado · ${onibus} nós do ônibus no lugar`);
