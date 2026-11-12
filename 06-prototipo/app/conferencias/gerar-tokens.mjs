// Gera src/tokens/tailwind.css a partir de 03-design-system/tokens.json.
// As variáveis dos tokens vêm de 03-design-system/tokens.css, lido direto, sem cópia.
// Aqui só se dá nome de utilitário do Tailwind a cada token (bg-fundo-cartao, text-tinta, rounded-raio-lg...).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const raiz = fileURLToPath(new URL('../../..', import.meta.url));
const t = JSON.parse(readFileSync(raiz + '03-design-system/tokens.json', 'utf8'));
const l = ['/* gerado por conferencias/gerar-tokens.mjs a partir de 03-design-system/tokens.json. Não editar à mão. */', '@theme inline {', '  --color-*: initial;', '  --font-sans: var(--fonte);'];
for (const c of t.color.tokens) l.push(`  --color-${c.name}: var(--${c.name});`);
for (const r of t.radius.tokens) l.push(`  --radius-${r.name.replace('raio-', '')}: var(--${r.name});`);
for (const s of t.shadow.tokens) l.push(`  --shadow-${s.name.replace('sombra-', '')}: var(--${s.name});`);
l.push('}', '');
writeFileSync(new URL('../src/tokens/tailwind.css', import.meta.url), l.join('\n'));
console.log(`tokens: ${t.color.tokens.length} cores, ${t.radius.tokens.length} raios, ${t.shadow.tokens.length} sombras`);
