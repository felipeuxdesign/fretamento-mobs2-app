// O vidro: ?vidro=0 deixa tudo sólido; cada linha do vidro.config.ts desliga só a peça dela;
// nenhuma variável --lg-* fora do vidro.css.
import { chromium } from 'playwright';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { APP, construir, servir, abrirTela, ir } from './_comum.mjs';

const erros = [];
// 1. nenhuma variável --lg-* definida fora do vidro.css (o código copiado da biblioteca é dela)
function* arquivos(dir) { for (const n of readdirSync(dir)) { const p = join(dir, n); if (statSync(p).isDirectory()) yield* arquivos(p); else if (/\.(css|tsx?)$/.test(n)) yield p; } }
for (const arq of arquivos(join(APP, 'src'))) {
  const rel = relative(APP, arq);
  if (rel === 'src/ds/vidro/vidro.css' || rel.startsWith('src/components/glassyui/')) continue;
  readFileSync(arq, 'utf8').split('\n').forEach((l, i) => { if (/--lg-[a-z0-9-]+\s*:/.test(l)) erros.push(`variável --lg-* fora do vidro.css · ${rel}:${i + 1}`); });
}

const config = join(APP, 'src/ds/vidro/vidro.config.ts');
const pecas = existsSync(config) ? [...readFileSync(config, 'utf8').matchAll(/^\s{2}([a-zA-Z]+):\s*(true|false)/gm)].map((m) => ({ nome: m[1], ligada: m[2] === 'true' })) : [];

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador, { largura: 1440, altura: 1024, escala: 1 });

// o que está de vidro numa página: cada elemento marcado com data-peca-de-vidro e com desfoque de verdade
const deVidro = () => pagina.evaluate(() => {
  const com = (el) => { const e = getComputedStyle(el); const f = e.backdropFilter || e.webkitBackdropFilter || 'none'; return f !== 'none'; };
  const marcadas = [...document.querySelectorAll('[data-peca-de-vidro]')];
  const pecas = {};
  for (const el of marcadas) { const p = el.getAttribute('data-peca-de-vidro'); pecas[p] = pecas[p] || el.getAttribute('data-material') === 'vidro'; }
  // o alerta e a folha da biometria já têm um desfoque simples nas referências: é o sólido deles, e não conta
  const desfoques = [...document.querySelectorAll('#tela-do-aparelho *, [data-vitrine] [data-quadro] *')].filter((el) => !el.closest('[data-do-sistema]')).filter(com).length;
  return { pecas, desfoques };
});

// 2. ?vidro=0 deixa tudo sólido, na vitrine e nas telas
for (const busca of ['vitrine=vidro&vidro=0', 'ref=T07-01&vidro=0', 'ref=T05-08&vidro=0', 'ref=T03-01&vidro=0']) {
  await ir(pagina, base, busca);
  const r = await deVidro();
  if (r.desfoques) erros.push(`?${busca}: ${r.desfoques} elemento(s) ainda com desfoque`);
  for (const [p, v] of Object.entries(r.pecas)) if (v) erros.push(`?${busca}: a peça "${p}" continuou de vidro`);
}

// 3. cada linha do vidro.config.ts desliga só a peça dela (a conferência usa ?sem-vidro=<peça>, que faz o papel da linha em false)
if (!pecas.length) erros.push('vidro.config.ts ainda não tem as linhas das peças');
else {
  await ir(pagina, base, 'vitrine=vidro');
  const cheio = (await deVidro()).pecas;
  for (const p of pecas) if (p.ligada && cheio[p.nome] !== true) erros.push(`a peça "${p.nome}" está ligada no vidro.config.ts e não aparece de vidro na vitrine`);
  for (const p of pecas.filter((x) => x.ligada)) {
    await ir(pagina, base, `vitrine=vidro&sem-vidro=${p.nome}`);
    const r = (await deVidro()).pecas;
    if (r[p.nome] !== false) erros.push(`desligar "${p.nome}" não deixou a peça sólida`);
    for (const outra of pecas.filter((x) => x.ligada && x.nome !== p.nome)) if (r[outra.nome] !== true) erros.push(`desligar "${p.nome}" desligou também "${outra.nome}"`);
  }
}
await navegador.close();
await fechar();
if (erros.length) { console.error(`vidro: REPROVADO · ${erros.length} problema(s)`); erros.slice(0, 40).forEach((e) => console.error(' - ' + e)); process.exit(1); }
console.log(`vidro: APROVADO · ?vidro=0 deixa tudo sólido · ${pecas.length} peças, cada linha desliga só a dela · nenhuma variável --lg-* fora do vidro.css`);
