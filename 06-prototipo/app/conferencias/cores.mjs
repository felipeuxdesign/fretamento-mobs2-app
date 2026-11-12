// As cores: nenhuma cor escrita à mão em ds/, telas/ e palco/. Só token.
// A busca aceita qualquer jeito de escrever: hex, rgb, rgba, hsl, hsla, hwb, lab, lch, oklab, oklch, com ou sem espaço, e os nomes de cor.
// A exceção tem lugar: a ótica do vidro mora em ds/vidro/vidro.css. As cores do sistema moram em sistema/, que não é varrido.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { APP } from './_comum.mjs';

const PASTAS = ['src/ds', 'src/telas', 'src/palco'];
const EXCECOES = ['src/ds/vidro/vidro.css'];
const NOMES = 'white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|gold|lime|aqua|cyan|magenta|fuchsia|navy|teal|olive|maroon|violet|indigo|brown|beige|ivory|coral|salmon|crimson|khaki|orchid|plum|tan|turquoise|rebeccapurple';
const PADROES = [
  [/#[0-9a-fA-F]{3,8}\b/g, 'hex'],
  [/\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/g, 'função de cor'],
  [new RegExp(`(?:color|background|background-color|border|border-color|border-[a-z]+|outline|fill|stroke|box-shadow|caret-color|accent-color)\\s*[:=]\\s*['"\`]?[^;'"\`}]*\\b(?:${NOMES})\\b`, 'gi'), 'nome de cor'],
];

function* arquivos(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) yield* arquivos(p);
    else if (/\.(css|tsx?|svg)$/.test(n)) yield p;
  }
}

const achados = [];
let varridos = 0;
for (const pastaRel of PASTAS) {
  const dir = join(APP, pastaRel);
  try { statSync(dir); } catch { continue; }
  for (const arq of arquivos(dir)) {
    const rel = relative(APP, arq);
    if (EXCECOES.includes(rel)) continue;
    varridos++;
    const linhas = readFileSync(arq, 'utf8').split('\n');
    linhas.forEach((linha, i) => {
      const semComentario = linha.replace(/\/\*.*?\*\//g, '').replace(/^\s*(\/\/|\*).*$/, '');
      for (const [re, tipo] of PADROES) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(semComentario))) {
          // id de filtro, âncora e entidade não são cor: #abc dentro de url(#id) ou href="#id"
          if (tipo === 'hex' && /(url\(|href=["']|xlink:href=["']|&)$/.test(semComentario.slice(0, m.index))) continue;
          // color-mix sobre token é token: color-mix(in srgb, var(--vivo) 40%, transparent)
          if (tipo === 'função de cor' && /color-mix\s*\($/.test(semComentario.slice(0, m.index + m[0].length)) ) continue;
          achados.push(`${rel}:${i + 1} · ${tipo} · ${m[0].trim().slice(0, 60)}`);
        }
      }
    });
  }
}

if (achados.length) {
  console.error(`cores: REPROVADO · ${achados.length} cor(es) escrita(s) à mão em ${varridos} arquivos`);
  achados.forEach((a) => console.error(' - ' + a));
  process.exit(1);
}
console.log(`cores: APROVADO · nenhuma cor escrita à mão em ${varridos} arquivos de ds/, telas/ e palco/`);
