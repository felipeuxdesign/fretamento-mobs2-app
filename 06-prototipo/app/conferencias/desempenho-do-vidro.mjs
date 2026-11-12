// O desempenho do vidro: com a CPU limitada em 4×, mede o tempo de cada quadro em três movimentos, no palco,
// com o vidro ligado e com ele desligado: rolar o Início, arrastar o painel do mapa e o dia andando no Mapa.
// Grava a tabela em 06-prototipo/fotos/vidro/telas/desempenho.md. Mede o intervalo entre os quadros pedidos pela
// página: acusa engasgo da linha principal, não o custo de compor o desfoque, que só o aparelho de verdade mostra.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FOTOS, construir, servir, ir, pasta, tabela, entrarNoApp } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const linhas = [];
const resumo = {};

async function medir(pagina, movimento) {
  await pagina.evaluate(() => {
    window.__quadros = [];
    let antes = performance.now();
    window.__mede = true;
    const anda = (t) => { window.__quadros.push(t - antes); antes = t; if (window.__mede) requestAnimationFrame(anda); };
    requestAnimationFrame(anda);
  });
  await movimento();
  const q = await pagina.evaluate(() => { window.__mede = false; return window.__quadros.slice(2); });
  const o = [...q].sort((a, b) => a - b);
  return { quadros: q.length, mediana: o[Math.floor(o.length / 2)], p95: o[Math.floor(o.length * 0.95)], longos: q.filter((t) => t > 50).length };
}

for (const [modo, busca] of [['vidro', ''], ['sólido', '&vidro=0']]) {
  const contexto = await navegador.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
  const pagina = await contexto.newPage();
  const cdp = await contexto.newCDPSession(pagina);
  await ir(pagina, base, `tema=escuro${busca}`);
  const app = pagina.locator('#tela-do-aparelho');
  const palco = (nome) => pagina.locator('.pl').getByRole('button', { name: nome });
  await entrarNoApp(pagina);
  await palco('Pausar o dia').click();
  await pagina.waitForTimeout(900);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  const movimentos = {
    'rolar o Início': async () => {
      await app.locator('main').evaluate(async (m) => {
        for (let i = 0; i < 90; i++) { m.scrollTop += 7; await new Promise((r) => requestAnimationFrame(r)); }
        for (let i = 0; i < 90; i++) { m.scrollTop -= 7; await new Promise((r) => requestAnimationFrame(r)); }
      });
    },
    'arrastar o painel do mapa': async () => {
      const alca = await app.getByRole('button', { name: 'Expandir painel' }).boundingBox();
      const x = alca.x + alca.width / 2, y = alca.y + 8;
      await pagina.mouse.move(x, y);
      await pagina.mouse.down();
      await pagina.mouse.move(x, y - 380, { steps: 45 });
      await pagina.mouse.move(x, y - 40, { steps: 45 });
      await pagina.mouse.up();
      await pagina.waitForTimeout(350);
    },
    'o dia andando no Mapa': async () => {
      for (let i = 0; i < 3; i++) { await palco('Avançar um passo').click(); await pagina.waitForTimeout(1100); }
    },
  };
  resumo[modo] = {};
  for (const [nome, movimento] of Object.entries(movimentos)) {
    if (nome === 'arrastar o painel do mapa') {
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
      await app.getByRole('button', { name: /Ver no mapa/ }).first().click();
      await pagina.waitForTimeout(700);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    }
    const m = await medir(pagina, movimento);
    resumo[modo][nome] = m;
    linhas.push([nome, modo, String(m.quadros), m.mediana.toFixed(1).replace('.', ',') + ' ms', m.p95.toFixed(1).replace('.', ',') + ' ms', String(m.longos)]);
    console.log(`${modo.padEnd(7)} ${nome.padEnd(28)} ${String(m.quadros).padStart(4)} quadros · mediana ${m.mediana.toFixed(1)} ms · p95 ${m.p95.toFixed(1)} ms · ${m.longos} acima de 50 ms`);
  }
  await contexto.close();
}
await navegador.close();
await fechar();
linhas.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
writeFileSync(
  join(pasta(join(FOTOS, 'vidro/telas')), 'desempenho.md'),
  `# O desempenho do vidro\n\nO tempo de cada quadro em três movimentos, no palco (1440 × 1024), com a CPU limitada em 4×, com o vidro ligado e com ele desligado. O que se mede é o intervalo entre os quadros que a página consegue pedir: ele acusa engasgo da linha principal (código, layout, estilo), e não o custo de compor o desfoque, que no celular é da placa de vídeo. Serve para comparar o vidro com o sólido e para saber que o vidro não trava a página; se o desfoque pesa no aparelho, só o aparelho diz.\n\n${tabela(['movimento', 'material', 'quadros', 'mediana', '95 % abaixo de', 'quadros acima de 50 ms'], linhas)}\n\nPara refazer: \`node conferencias/desempenho-do-vidro.mjs\`, a partir de \`06-prototipo/app\`.\n`,
);
console.log('desempenho do vidro: medido · a tabela está em 06-prototipo/fotos/vidro/telas/desempenho.md');
