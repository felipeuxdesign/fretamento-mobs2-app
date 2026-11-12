// Todas as conferências, do começo, com um comando: npm run conferir
import { spawnSync } from 'node:child_process';
import { APP, RAIZ, construir } from './_comum.mjs';

construir();
const lista = [
  ['o dado', 'node', ['04-dados/conferir.mjs'], RAIZ],
  ['o relógio', 'node', ['conferencias/relogio.mjs', '--sem-build'], APP],
  ['a fidelidade', 'node', ['conferencias/fidelidade.mjs', '--sem-build'], APP],
  ['os textos', 'node', ['conferencias/textos.mjs', '--sem-build'], APP],
  ['as cores', 'node', ['conferencias/cores.mjs'], APP],
  ['os tocáveis', 'node', ['conferencias/tocaveis.mjs', '--sem-build'], APP],
  ['os endereços', 'node', ['conferencias/enderecos.mjs', '--sem-build'], APP],
  ['o vidro', 'node', ['conferencias/vidro.mjs', '--sem-build'], APP],
  ['o vidro em vidro', 'node', ['conferencias/vidro-em-vidro.mjs', '--sem-build'], APP],
  ['o vidro nas telas', 'node', ['conferencias/vidro-nas-telas.mjs', '--sem-build'], APP],
  ['o contraste do vidro', 'node', ['conferencias/contraste-do-vidro.mjs', '--sem-gravar', '--sem-build'], APP],
  ['o vidro na moldura', 'node', ['conferencias/vidro-na-moldura.mjs', '--sem-build'], APP],
  ['o claro', 'node', ['conferencias/claro.mjs', '--sem-build', '--sem-fotos'], APP],
  ['o escuro', 'node', ['conferencias/claro.mjs', '--sem-build', '--sem-fotos', '--tema=escuro'], APP],
  ['o que se toca', 'node', ['conferencias/fluxo.mjs', '--sem-build'], APP],
  ['o roteiro', 'node', ['conferencias/roteiro.mjs', '--sem-build'], APP],
  ['o fechamento', 'node', ['conferencias/fechamento.mjs', '--sem-build'], APP],
  ['o build', 'node', ['conferencias/build.mjs', '--sem-build'], APP],
];
const resumo = [];
for (const [nome, cmd, args, cwd] of lista) {
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8' });
  const saida = (r.stdout + r.stderr).trim().split('\n');
  const ultima = saida.filter(Boolean).at(-1) ?? '';
  resumo.push([nome, r.status === 0 ? 'passou' : 'NÃO PASSOU', ultima]);
  if (r.status !== 0) console.log(saida.slice(-25).join('\n'));
}
console.log('\n' + resumo.map(([n, s, u]) => `${s.padEnd(11)} ${n.padEnd(21)} ${u}`).join('\n'));
process.exit(resumo.some((r) => r[1] !== 'passou') ? 1 : 0);
