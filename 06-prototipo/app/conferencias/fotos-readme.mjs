// As imagens do README da raiz, em 05-recursos/readme/, montadas com as fotos das telas (06-prototipo/fotos/):
// quatro telas no escuro, o Início nos dois temas e a capa de 1280 × 640, que também vai para app/public/ como a
// imagem da prévia do link. Rode depois de claro.mjs nos dois temas.
//   node conferencias/fotos-readme.mjs
import { chromium } from 'playwright';
import { join } from 'node:path';
import { readFileSync, copyFileSync } from 'node:fs';
import { APP, FOTOS, RAIZ, pasta } from './_comum.mjs';

const saida = pasta(join(RAIZ, '05-recursos', 'readme'));
// a foto entra embutida: a página de montagem não tem endereço, e não leria um arquivo do disco
const foto = (tema, ref) => `data:image/png;base64,${readFileSync(join(FOTOS, tema, `${ref}.png`)).toString('base64')}`;
const tela = (tema, ref, largura) => `<img src="${foto(tema, ref)}" width="${largura}" height="${Math.round(largura * 844 / 390)}" style="display:block;border-radius:${Math.round(largura * 0.11)}px;box-shadow:0 18px 50px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(255 255 255 / 0.08)">`;
const navegador = await chromium.launch();
const montar = async (nome, largura, altura, miolo, fundo) => {
  const p = await (await navegador.newContext({ viewport: { width: largura, height: altura }, deviceScaleFactor: 2 })).newPage();
  await p.setContent(`<body style="margin:0;width:${largura}px;height:${altura}px;display:flex;align-items:center;justify-content:center;gap:24px;background:${fundo};font-family:Inter,system-ui,sans-serif">${miolo}</body>`, { waitUntil: 'load' });
  await p.screenshot({ path: join(saida, nome), omitBackground: fundo === 'transparent' });
  await p.context().close();
};
const LUZ = 'radial-gradient(circle 520px at 12% 10%, rgb(107 43 217 / 0.7), transparent), radial-gradient(circle 520px at 100% 60%, rgb(163 38 143 / 0.45), transparent), radial-gradient(circle 480px at 18% 100%, rgb(55 48 163 / 0.55), transparent), #120b1c';
await montar('telas.png', 4 * 195 + 3 * 24 + 40, 470, ['T01-00', 'T05-00', 'T07-00', 'T10-00'].map((r) => tela('escuro', r, 195)).join(''), 'transparent');
await montar('temas.png', 2 * 195 + 24 + 40, 470, tela('escuro', 'T05-00', 195) + tela('claro', 'T05-00', 195), 'transparent');
// a capa, em 1280 × 640: a marca, o nome, a frase do produto e três telas (o Entrar, o Início e o mapa), sobre o fundo
// de luz do escuro. É a imagem da prévia do link do protótipo e a capa do repositório
{
  const pictograma = readFileSync(join(RAIZ, '05-recursos', 'marca', 'pictograma.svg'), 'utf8').replace(/<!--[\s\S]*?-->/, '').replace(/width="1024" height="1024"/, 'width="30" height="30"');
  const aparelho = (ref, largura, estilo) => `<img src="${foto('escuro', ref)}" width="${largura}" height="${Math.round((largura * 844) / 390)}" style="position:absolute;display:block;border-radius:${Math.round(largura * 0.115)}px;box-shadow:0 24px 60px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.14);${estilo}">`;
  const texto = `<div style="position:absolute;left:44px;top:50%;transform:translateY(-50%);width:262px;color:#efe9f3">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:44px;height:44px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0) 50%), rgb(255 255 255 / 0.09);box-shadow:inset 0 1px 0 rgb(255 255 255 / 0.34), inset 0 0 0 1px rgb(255 255 255 / 0.14), 0 10px 28px -12px rgb(0 0 0 / 0.6)">${pictograma}</div>
      <div style="font:600 11px/14px Inter,system-ui,sans-serif;letter-spacing:0.2em;color:#bbaac5">FRETAMENTO</div>
    </div>
    <div style="font:800 31px/34px Inter,system-ui,sans-serif;letter-spacing:-0.02em;margin-top:18px">App Passageiro<br>Fretamento</div>
    <div style="font:500 13px/19px Inter,system-ui,sans-serif;color:#bbaac5;margin-top:10px">Mostra quando o ônibus passa no seu ponto, em qual ônibus entrar e se a previsão é confiável.</div>
    <div style="display:inline-flex;align-items:center;gap:6px;margin-top:16px;padding:5px 10px 5px 8px;border-radius:999px;font:600 11px/14px Inter,system-ui,sans-serif;color:#efe9f3;background:rgb(255 255 255 / 0.08);box-shadow:inset 0 0 0 1px rgb(255 255 255 / 0.14)"><span style="width:6px;height:6px;border-radius:50%;background:#aaef00"></span>Protótipo navegável</div>
  </div>`;
  const telas = aparelho('T01-00', 112, 'left:330px;top:52px;opacity:0.96') + aparelho('T07-00', 112, 'left:512px;top:52px;opacity:0.96') + aparelho('T05-00', 132, 'left:411px;top:17px');
  await montar('previa-social.png', 640, 320, `<div style="position:relative;width:640px;height:320px;overflow:hidden">${texto}${telas}</div>`, LUZ);
}
// a capa também viaja com o protótipo publicado: é a imagem da prévia do link (as marcações estão no index.html)
copyFileSync(join(saida, 'previa-social.png'), join(pasta(join(APP, 'public')), 'previa-social.png'));
await navegador.close();
console.log(`imagens do README: telas.png, temas.png e previa-social.png em ${saida}`);
