// Os endereços: cada ?ref= abre a referência certa, os parâmetros combinam, e ?fundo=anterior traz o fundo de luz de
// antes em toda referência, sem mexer no padrão.
import { chromium } from 'playwright';
import { casos, construir, servir, abrirTela, ir } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const erros = [];
const ok = (cond, msg) => { if (!cond) erros.push(msg); };
const tela = (p) => p.evaluate(() => { const t = document.getElementById('tela-do-aparelho'); return t ? { ref: t.dataset.ref ?? null, tela: t.dataset.tela, tema: t.dataset.tema, vidro: t.dataset.vidro, parado: t.classList.contains('parado'), palco: !!document.querySelector('[data-palco]'), gaveta: !!document.querySelector('[data-aba-do-palco]'), lg: document.documentElement.getAttribute('data-lg-theme'), marca: t.querySelector('.lock.da-marca')?.dataset.marca ?? null, cor: t.querySelector('.lock.da-marca')?.dataset.cor ?? null, receita: t.dataset.receita ?? null } : null; });

// 1. cada ?ref= abre a referência certa, no computador (com o palco)
{
  const { contexto, pagina } = await abrirTela(navegador, { largura: 1440, altura: 1024, escala: 1 });
  for (const c of casos) {
    await ir(pagina, base, `ref=${c.ref}`);
    const t = await tela(pagina);
    ok(t && t.ref === c.ref && t.tela === c.tela && t.parado, `?ref=${c.ref} abriu ${JSON.stringify(t)}`);
  }
  // 2. os parâmetros combinam
  const combos = [
    ['', (t) => t.ref === null && t.tela === 'T01' && t.tema === 'escuro' && t.vidro === '1' && t.palco, 'sem nada: abre no Entrar, escuro, com vidro e com palco'],
    ['tema=claro', (t) => t.tema === 'claro' && t.lg === 'light', '?tema=claro fixa o claro, e o vidro acompanha'],
    ['tema=escuro&celular=claro', (t) => t.tema === 'escuro' && t.lg === 'dark', '?tema=escuro ganha do celular claro'],
    ['celular=claro', (t) => t.tema === 'claro', '?celular=claro: o Sistema cai no claro'],
    ['vidro=0', (t) => t.vidro === '0', '?vidro=0 desliga o vidro'],
    ['so-app=1', (t) => !t.palco, '?so-app=1 tira o palco'],
    ['ref=T07-01&tema=claro&vidro=0', (t) => t.ref === 'T07-01' && t.tela === 'T07' && t.tema === 'claro' && t.vidro === '0', '?ref=T07-01&tema=claro&vidro=0 combina'],
    ['ref=T05-20&so-app=1&tema=claro', (t) => t.ref === 'T05-20' && t.tema === 'claro' && !t.palco, '?ref com ?so-app e ?tema'],
    ['ref=T99-99', (t) => t.ref === null && t.tela === 'T01', 'uma referência que não existe cai no Entrar'],
    ['ref=T01-00&marca=l2', (t) => t.marca === 'l2' && t.cor === null, '?marca=l2 troca o arranjo da marca'],
    ['ref=T01-00&marca=l3&cor=invertida', (t) => t.marca === 'l3' && t.cor === 'invertida', '?marca=l3 com ?cor=invertida'],
    ['ref=T01-00&marca=outro', (t) => t.marca === 'l1', 'um ?marca que não existe cai no l1'],
    ['ref=T05-00&receita=android', (t) => t.receita === 'android', '?receita=android liga a receita do Android'],
    ['ref=T05-00', (t) => t.receita === null, 'sem ?receita, o vidro é o padrão'],
  ];
  for (const [busca, teste, nome] of combos) {
    await pagina.evaluate(() => { try { localStorage.clear(); } catch {} });
    await ir(pagina, base, busca);
    const t = await tela(pagina);
    ok(t && teste(t), `${nome} · veio ${JSON.stringify(t)}`);
  }
  // as vitrines
  for (const v of ['pecas', 'vidro', 'marca', 'tokens']) {
    await ir(pagina, base, `vitrine=${v}`);
    ok(await pagina.evaluate((v) => !!document.querySelector(`[data-vitrine="${v}"]`), v), `?vitrine=${v} não abriu a vitrine`);
  }
  await contexto.close();
}
// 3. no celular (390 de largura): o app ocupa a tela, o palco some, e ?palco=1 mostra a aba da gaveta
{
  const { contexto, pagina } = await abrirTela(navegador, { largura: 390, altura: 844, escala: 2 });
  await ir(pagina, base, '');
  let t = await tela(pagina);
  ok(t && !t.palco && !t.gaveta, `no celular o palco some · veio ${JSON.stringify(t)}`);
  const caixa = await pagina.evaluate(() => { const r = document.getElementById('tela-do-aparelho').getBoundingClientRect(); return [r.width, r.height]; });
  ok(caixa[0] === 390 && caixa[1] === 844, `no celular o app ocupa a tela · mediu ${caixa}`);
  await ir(pagina, base, 'palco=1');
  t = await tela(pagina);
  ok(t && t.gaveta, '?palco=1 mostra a aba da gaveta no celular');
  await ir(pagina, base, 'ref=T05-20&tema=claro&vidro=0');
  t = await tela(pagina);
  ok(t && t.ref === 'T05-20' && t.tema === 'claro' && t.vidro === '0', `os endereços combinam no celular · veio ${JSON.stringify(t)}`);
  await contexto.close();
}
// 4. o fundo de antes: ?fundo=anterior troca o conjunto do fundo de luz em toda referência, nos dois temas, e sem o
//    parâmetro o fundo é o padrão. Com o vidro desligado não há fundo de luz, e a página é a do token
{
  const { contexto, pagina } = await abrirTela(navegador, { largura: 390, altura: 844, escala: 1 });
  const fundo = () => pagina.evaluate(() => { const t = document.getElementById('tela-do-aparelho'); const e = getComputedStyle(t); return { marca: t.dataset.fundo ?? null, ponto: e.getPropertyValue('--blob-1').trim(), pagina: e.getPropertyValue('--fundo-pagina').trim().toLowerCase(), luz: !!t.querySelector(':scope > .ambiente') }; });
  const PADRAO = { escuro: ['107 43 217', '#120b1c'], claro: ['196 181 253', '#f6f3fb'] };
  const ANTERIOR = { escuro: ['82 22 128', '#1a0f20'], claro: ['214 190 250', '#faf9fc'] };
  const DO_TOKEN = { escuro: '#1a0f20', claro: '#f7f5f8' };
  for (const tema of ['escuro', 'claro']) {
    for (const c of casos) {
      await ir(pagina, base, `ref=${c.ref}&so-app=1&tema=${tema}&fundo=anterior`);
      const f = await fundo();
      ok(f.marca === 'anterior' && f.luz && f.ponto === ANTERIOR[tema][0] && f.pagina === ANTERIOR[tema][1], `?fundo=anterior em ${c.ref}, no ${tema} · veio ${JSON.stringify(f)}`);
    }
    await ir(pagina, base, `ref=T05-00&so-app=1&tema=${tema}`);
    let f = await fundo();
    ok(f.marca === null && f.ponto === PADRAO[tema][0] && f.pagina === PADRAO[tema][1], `sem ?fundo, o fundo é o padrão, no ${tema} · veio ${JSON.stringify(f)}`);
    await ir(pagina, base, `ref=T05-00&so-app=1&tema=${tema}&fundo=outro`);
    f = await fundo();
    ok(f.marca === null && f.ponto === PADRAO[tema][0], `um ?fundo que não existe cai no padrão, no ${tema} · veio ${JSON.stringify(f)}`);
    await ir(pagina, base, `ref=T05-00&so-app=1&tema=${tema}&fundo=anterior&vidro=0`);
    f = await fundo();
    ok(!f.luz && f.pagina === DO_TOKEN[tema], `com ?vidro=0 não há fundo de luz, e a página é a do token, no ${tema} · veio ${JSON.stringify(f)}`);
  }
  await contexto.close();
}
await navegador.close();
await fechar();
if (erros.length) { console.error(`endereços: REPROVADO · ${erros.length} problema(s)`); erros.slice(0, 40).forEach((e) => console.error(' - ' + e)); process.exit(1); }
console.log(`endereços: APROVADO · ${casos.length} referências e os parâmetros combinados, no computador e no celular · ?fundo=anterior nas ${casos.length}, nos dois temas`);
