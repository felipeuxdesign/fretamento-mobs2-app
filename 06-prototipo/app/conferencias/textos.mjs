// Os textos: o texto visível de cada referência, no protótipo, contra o textos.md da tela, letra por letra.
// A barra de status, o teclado do sistema e os ícones ficam de fora, como no textos.md.
// Os espaços comuns não contam (o textos.md junta blocos vizinhos); o espaço que não quebra conta, contra o HTML da referência.
import { chromium } from 'playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ, casosPedidos, construir, servir, abrirTela, ir, enderecoDaFidelidade, aRedesenhar } from './_comum.mjs';

const pedidos = casosPedidos();
const NBSP = ' ';
const semEspaco = (s) => s.replace(/[ \t\r\n]+/g, '');
const semEspacoNenhum = (s) => s.replace(/[\s ]+/g, '');

// o textos.md de cada tela, por referência
const esperado = {};
for (const d of readdirSync(join(RAIZ, '02-telas')).filter((x) => /^T(0[1-9]|1[0-3])-/.test(x))) {
  let ref = null;
  for (const linha of readFileSync(join(RAIZ, '02-telas', d, 'textos.md'), 'utf8').split('\n')) {
    const cab = /^## (T\d\d-\d\d)/.exec(linha);
    if (cab) { ref = cab[1]; esperado[ref] = []; continue; }
    if (ref && linha.startsWith('- ')) esperado[ref].push(linha.slice(2));
  }
}

// o texto do HTML da referência, com os espaços que não quebram
function textoDaReferencia(html) {
  let b = html.slice(html.lastIndexOf('</style>'));
  b = b.slice(b.indexOf('<body>') + 6, b.lastIndexOf('</body>'));
  b = b.replace(/<div class="sa"[\s\S]*?<\/span><\/div>/, '');
  // o teclado desenhado é do celular: sai inteiro, do começo dele até o indicador de início (ou o fim da tela)
  const iTeclado = b.indexOf('<div class="kb');
  if (iTeclado >= 0) {
    const iFim = b.indexOf('<div class="hb"', iTeclado);
    b = b.slice(0, iTeclado) + (iFim >= 0 ? b.slice(iFim) : '');
  }
  // o desenho do mapa é um svg com outros svg dentro (os ícones dos marcadores): sai inteiro, até o fecho dele
  b = b.replace(/<svg[^>]*class="bg"[\s\S]*<\/svg>(?=\s*(<span class="mkl|<div class="callout|<\/div>))/, '');
  b = b.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ');
  return b.replace(/&nbsp;/g, NBSP).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const { pagina } = await abrirTela(navegador);
let erros = 0;
for (const c of pedidos) {
  await ir(pagina, base, enderecoDaFidelidade(c.ref));
  // o texto como ele aparece: com a caixa alta que o CSS aplica (é assim que o textos.md foi escrito)
  const lido = await pagina.evaluate(() => {
    const raiz = document.getElementById('tela-do-aparelho');
    if (!raiz) return { visto: '', cru: '' };
    const esconde = document.createElement('style');
    esconde.textContent = '.sa, .kb, .hb, .hb-dentro, svg { display: none !important; }';
    document.head.appendChild(esconde);
    const cru = raiz.textContent ?? '';
    const fora = document.createElement('style');
    fora.textContent = '[data-fora-do-texto] { display: none !important; }';
    document.head.appendChild(fora);
    const visto = raiz.innerText ?? '';
    esconde.remove();
    fora.remove();
    return { visto, cru };
  });
  const visto = lido.visto;
  const quer = (esperado[c.ref] ?? []).join('');
  const problemas = [];
  if (semEspacoNenhum(visto) !== semEspacoNenhum(quer)) {
    const a = semEspacoNenhum(visto), b = semEspacoNenhum(quer);
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    problemas.push(`texto diferente do textos.md a partir de "…${b.slice(Math.max(0, i - 24), i)}▸${b.slice(i, i + 40)}" · no protótipo: "▸${a.slice(i, i + 40)}"`);
  } else {
    // os espaços que não quebram, contra o HTML da referência
    // a referência em HTML não tem a caixa alta do CSS: aqui a comparação ignora a caixa e cobra o espaço que não quebra
    const ref = semEspaco(textoDaReferencia(readFileSync(join(RAIZ, c.html), 'utf8'))).toLocaleLowerCase('pt-BR');
    const meu = semEspaco(await pagina.evaluate(() => { const r = document.getElementById('tela-do-aparelho'); const c = r.cloneNode(true); c.querySelectorAll('.sa, .kb, .hb, .hb-dentro, svg, input, textarea').forEach((n) => n.remove()); return c.textContent ?? ''; })).toLocaleLowerCase('pt-BR');
    // onde o conteúdo mudou por decisão, o HTML da referência ainda mostra o de antes: o texto é cobrado contra o textos.md, acima
    if (!aRedesenhar[c.ref] && (ref.split(NBSP).length !== meu.split(NBSP).length || ref !== meu)) {
      let i = 0;
      while (i < ref.length && i < meu.length && ref[i] === meu[i]) i++;
      if (i < Math.max(ref.length, meu.length)) problemas.push(`espaço que não quebra fora do lugar perto de "${ref.slice(Math.max(0, i - 20), i + 20).replaceAll(NBSP, '⍽')}" · no protótipo "${meu.slice(Math.max(0, i - 20), i + 20).replaceAll(NBSP, '⍽')}"`);
    }
  }
  if (problemas.length) { erros++; console.log(`✗ ${c.ref} · ${problemas.join(' · ')}`); }
}
await navegador.close();
await fechar();
console.log(`textos: ${erros ? 'REPROVADO' : 'APROVADO'} · ${pedidos.length - erros} de ${pedidos.length} referências com o texto do textos.md`);
process.exit(erros ? 1 : 0);
