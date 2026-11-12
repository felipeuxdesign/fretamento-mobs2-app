// O GIF do caminho principal, para o README: as telas do próprio protótipo, em 390 × 844, do Entrar à chegada.
// A entrada é tocada de verdade (receber o código, digitar seis dígitos, preparar o app, permitir os avisos); o dia
// segue pelos estados parados, que são os mesmos do palco. Sai em 05-recursos/readme/caminho-principal.gif.
//   node conferencias/gif.mjs [--sem-build]
import { chromium } from 'playwright';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
import { RAIZ, construir, servir, ir, pasta } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
const app = pagina.locator('#tela-do-aparelho');
const quadros = [];
const tirar = async (ms) => {
  await pagina.waitForTimeout(350);
  const png = PNG.sync.read(await pagina.screenshot());
  quadros.push({ dados: png.data, largura: png.width, altura: png.height, ms });
};

// a entrada, tocada
await ir(pagina, base, 'so-app=1&tema=escuro');
await tirar(1700);
await app.getByRole('button', { name: 'Receber código' }).click();
await app.getByText('Digite o código').waitFor();
await tirar(1000);
for (const parte of ['48', '29', '1']) { await pagina.keyboard.type(parte); await tirar(320); }
await pagina.keyboard.type('3');
await app.getByText('Entrando').waitFor();
await tirar(600);
await app.getByRole('button', { name: 'Começar' }).waitFor();
await tirar(1700);
await app.getByRole('button', { name: 'Começar' }).click();
await app.getByRole('button', { name: 'Permitir', exact: true }).waitFor();
await tirar(1200);
await app.getByRole('button', { name: 'Permitir', exact: true }).click();
await app.getByText('Bom dia, Ana').waitFor();
// o Início abre com o esqueleto por um instante: o quadro é o do conteúdo já carregado
await app.getByText('Ao vivo').first().waitFor();
await tirar(2200);
// o dia, pelos estados: as paradas, o mapa, chegando, no ponto, o embarque e a chegada
for (const [ref, ms] of [['T06-00', 1400], ['T07-00', 1700], ['T05-01', 1600], ['T05-02', 1600], ['T05-03', 1600], ['T05-04', 2400]]) {
  await ir(pagina, base, `ref=${ref}&so-app=1&tema=escuro`);
  await tirar(ms);
}
await navegador.close();
await fechar();

const { GIFEncoder, quantize, applyPalette } = gifenc;
const gif = GIFEncoder();
for (const q of quadros) {
  const paleta = quantize(q.dados, 256);
  gif.writeFrame(applyPalette(q.dados, paleta), q.largura, q.altura, { palette: paleta, delay: q.ms });
}
gif.finish();
const saida = join(pasta(join(RAIZ, '05-recursos', 'readme')), 'caminho-principal.gif');
writeFileSync(saida, gif.bytes());
console.log(`gif: ${quadros.length} quadros de ${quadros[0].largura} × ${quadros[0].altura} em ${saida}`);
