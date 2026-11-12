// Confere o dado antes de qualquer tela: node 04-dados/conferir.mjs (a partir da raiz).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
const ler = p => JSON.parse(readFileSync(p, 'utf8'));
const mock = ler('04-dados/mock.json'), casos = ler('04-dados/casos.json');
const erros = []; const ok = (c, msg) => { if (!c) erros.push(msg); };
const ESPERADO = { telas: 13, tela: 13, momento: 59, estado: 73 };

// 1. o censo
const porTipo = t => casos.filter(c => c.tipo === t).length;
ok(new Set(casos.map(c => c.tela)).size === ESPERADO.telas, 'telas: esperava 13');
for (const t of ['tela', 'momento', 'estado']) ok(porTipo(t) === ESPERADO[t], `${t}: esperava ${ESPERADO[t]}, achei ${porTipo(t)}`);
ok(new Set(casos.map(c => c.ref)).size === casos.length, 'referência repetida');

// 2. cada referência tem caso, HTML e PNG, e cada tela começa no 00, sem buraco
for (const c of casos) {
  ok(c.como && c.caso, `${c.ref}: sem "como se chega" ou sem caso`);
  ok(existsSync(c.html), `${c.ref}: falta ${c.html}`); ok(existsSync(c.png), `${c.ref}: falta ${c.png}`);
}
for (const t of new Set(casos.map(c => c.tela))) {
  const ns = casos.filter(c => c.tela === t).map(c => +c.ref.slice(4)).sort((a, b) => a - b);
  ok(ns.every((n, i) => n === i), `${t}: numeração com buraco`);
  ok(casos.find(c => c.ref === `${t}-00`)?.tipo === 'tela', `${t}: o 00 não é a tela`);
}

// 3. nenhuma referência sobrando na pasta
for (const d of readdirSync('02-telas').filter(x => /^T(0[1-9]|1[0-3])-/.test(x))) {
  for (const sub of ['html', 'png']) {
    const n = readdirSync(`02-telas/${d}/referencias/${sub}`).length, q = casos.filter(c => c[sub].startsWith(`02-telas/${d}/`)).length;
    ok(n === q, `${d}/${sub}: ${n} arquivos para ${q} casos`);
  }
}

// 4. o mock: horários em ordem, o ponto de sempre, as viagens e as regras
const min = h => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const comHora = mock.paradasDaIda.filter(p => p.programado);
ok(comHora.every((p, i) => i === 0 || min(p.programado) > min(comHora[i - 1].programado)), 'paradas fora de ordem no tempo');
ok(mock.paradasDaIda.filter(p => p.pontoDeSempre).length === 1, 'o ponto de sempre precisa ser um só');
ok(mock.paradasDaIda.at(-1).destino === true, 'a última parada é o destino');
const sempre = mock.paradasDaIda.find(p => p.pontoDeSempre), ida = mock.viagens.find(v => v.id === 'ida-0605');
ok(ida.passaNoSeuPonto === sempre.programado, 'a ida de sempre não passa no ponto de sempre no horário do cadastro');
ok(min(mock.relogio.hora) + mock.sementeDoCaminhoFeliz.minutosAteOSeuPonto === min(sempre.programado), 'a semente: 06:24 + 18 min precisa dar 06:42');
ok(new Date(mock.relogio.dia + 'T12:00:00Z').getUTCDay() === 2 && mock.relogio.diaDaSemana === 'terça', 'o dia do exemplo é uma terça');
const r = mock.regras;
ok(r.toleranciaMin === 3 && r.chegandoMin === 2 && r.dadoAntigoMin === 1.5 && r.semSinalMin === 3 && r.janelaAoVivoAntesMin === 30 && r.margemDaTrocaMin === 3, 'as regras de tempo mudaram');
ok(r.dadoAntigoMin < r.semSinalMin, 'dado antigo vem antes de sem sinal');
ok(mock.notificacoes.filter(n => !n.lida).length === mock.sementeDoCaminhoFeliz.avisosNaoLidos, 'não lidas diferentes da contagem do sino');
ok(!JSON.stringify(mock).match(/#[0-9a-fA-F]{6}\b/), 'cor dentro do dado');

// 4b. o dia: cada passo tem o quadro dele nas três telas, na ordem
const palco = ler('06-prototipo/palco-estados.json');
ok(palco.dia.passos.length === 5, 'o dia tem cinco passos');
for (const p of palco.dia.passos) for (const t of palco.dia.telas) {
  const c = casos.find(x => x.ref === p.quadros[t]);
  ok(c && c.tipo !== 'estado', `o passo "${p.nome}" não tem quadro na ${t}`);
}
for (const t of palco.telas) ok(t.itens === casos.filter(c => c.tela === t.codigo).length, `${t.codigo}: a coluna do palco não lista todas as referências`);

// 5. o que cada grupo de estado precisa ter (a cobertura das máquinas)
const nomes = casos.map(c => `${c.nome} ${c.como} ${c.caso}`.toLowerCase()).join(' | ');
for (const p of ['programado', 'atrasado', 'adiantado', 'dado antigo', 'sem sinal', 'sem internet', 'cancelad', 'trocad', 'chegando', 'no ponto', 'passou', 'crachá', 'desvio', 'expirad', 'bloquead', 'encerr', 'sem viagem'])
  ok(nomes.includes(p), `nenhum caso cobre "${p}"`);

if (erros.length) { console.error(`REPROVADO · ${erros.length} problema(s)`); erros.forEach(e => console.error(' - ' + e)); process.exit(1); }
console.log(`APROVADO · 13 telas · ${porTipo('momento')} momentos · ${porTipo('estado')} estados · ${casos.length} referências`);
