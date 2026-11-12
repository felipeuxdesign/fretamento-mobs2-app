// O desfoque dentro da moldura do aparelho: prova que o vidro continua desfocando o que está atrás quando a tela
// está dentro do recorte arredondado da moldura, no palco. Mede a nitidez do mapa atrás do painel do mapa,
// que é de vidro: desfocado, os traços do mapa somem.
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import { construir, servir, ir } from './_comum.mjs';

construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 })).newPage();
const nitidez = async () => {
  const c = await pagina.locator('#tela-do-aparelho .msheet').boundingBox();
  // uma faixa do painel sem texto: na linha da alça, à esquerda dela, dentro do canto arredondado
  const png = PNG.sync.read(await pagina.screenshot({ clip: { x: c.x + 56, y: c.y + 5, width: 96, height: 16 }, animations: 'disabled' }));
  let soma = 0, n = 0;
  for (let y = 0; y < png.height; y++) for (let x = 1; x < png.width; x++) { const i = (y * png.width + x) * 4; soma += Math.abs(png.data[i] - png.data[i - 4]) + Math.abs(png.data[i + 1] - png.data[i - 3]) + Math.abs(png.data[i + 2] - png.data[i - 2]); n++; }
  return soma / n;
};
const erros = [];
await ir(pagina, base, 'ref=T07-00&tema=escuro');
await pagina.waitForTimeout(500);
const naMoldura = await nitidez();
// sem o material do painel: o mapa nu, para saber quanto traço existe ali
await pagina.addStyleTag({ content: '#tela-do-aparelho .msheet, #tela-do-aparelho .msheet::before, #tela-do-aparelho .msheet::after { background: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; } #tela-do-aparelho .msheet > * { visibility: hidden; }' });
await pagina.waitForTimeout(200);
const nu = await nitidez();
console.log(`nitidez do mapa atrás do painel, na moldura do palco · mapa nu ${nu.toFixed(2)} · sob o painel de vidro ${naMoldura.toFixed(2)}`);
if (!(nu > 1)) erros.push('não há traço do mapa atrás do painel para medir');
if (!(naMoldura < nu * 0.55)) erros.push('dentro da moldura do palco o painel de vidro não está desfocando o mapa');
await navegador.close();
await fechar();
if (erros.length) { console.error('vidro na moldura: REPROVADO · ' + erros.join(' · ')); process.exit(1); }
console.log('vidro na moldura: APROVADO · o desfoque funciona dentro do recorte arredondado da moldura, no palco');
