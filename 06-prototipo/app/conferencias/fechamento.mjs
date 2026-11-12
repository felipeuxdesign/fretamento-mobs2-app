// O que as outras conferências não cobram, cobrado aqui, no build de produção:
// o tema (a Aparência e o Modo claro do palco são o mesmo estado, recarregar mantém, o vidro acompanha),
// o dia (o tocador só nas três telas, no ponto espera, no chegou recomeça), o que abre por cima (sheet, toast,
// alerta e teclado dentro da tela do aparelho, com o palco aberto), o tamanho de celular (o app ocupa a tela,
// o palco some, ?palco=1 abre a gaveta, o campo usa o teclado do celular) e sair e entrar de novo com o código.
import { chromium } from 'playwright';
import { construir, servir, ir, entrarNoApp } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const falhas = [];
let feitas = 0;
const cobra = (nome, certo, visto = '') => { feitas++; if (!certo) falhas.push(`${nome}${visto ? ` · visto: ${visto}` : ''}`); console.log(`${certo ? '·' : '✗'} ${nome}`); };

// ── no computador, com o palco ──
const contexto = await navegador.newContext({ viewport: { width: 1440, height: 1024 } });
const pagina = await contexto.newPage();
const app = pagina.locator('#tela-do-aparelho');
const palco = (nome, o = {}) => pagina.locator('.pl').getByRole('button', { name: nome, ...o });
const botao = (nome, o = {}) => app.getByRole('button', { name: nome, ...o });
const dentroDaTela = async (seletor) => {
  const tela = await app.boundingBox();
  const c = await pagina.locator(seletor).first().boundingBox();
  const filho = await pagina.locator(seletor).first().evaluate((el) => !!el.closest('#tela-do-aparelho'));
  return filho && !!c && c.x >= tela.x - 1 && c.y >= tela.y - 1 && c.x + c.width <= tela.x + tela.width + 1 && c.y + c.height <= tela.y + tela.height + 1;
};
const temaDoApp = () => app.getAttribute('data-tema');
const modoClaro = () => pagina.getByRole('switch', { name: 'Modo claro' });
// o Modo claro mora no painel do palco, atrás do botão do canto
const abrirPainel = async () => { if (!(await modoClaro().count())) await pagina.getByRole('button', { name: 'Abrir o painel do protótipo' }).click(); };
const fecharPainel = async () => { if (await modoClaro().count()) await pagina.getByRole('button', { name: 'Fechar o painel', exact: true }).click(); };

await ir(pagina, base, '');
await entrarNoApp(pagina);
await palco('Pausar o dia').click();

// o dia
cobra('o tocador do dia aparece no Início', (await pagina.locator('.pl-dia').count()) === 1);
await palco('Avançar um passo').click();
await palco('Avançar um passo').click();
await palco('Continuar o dia').click();
await pagina.waitForTimeout(2500);
cobra('no ponto, o dia espera o Embarquei', (await pagina.locator('.pl-px').innerText()).includes('Esperando o Embarquei') && (await app.getAttribute('data-tela')) === 'T05', await pagina.locator('.pl-px').innerText());
await botao('Embarquei').click();
await pagina.waitForTimeout(7500);
cobra('depois do Embarquei, o dia segue até o chegou e para', (await pagina.locator('.pl-dh').innerText()).includes('chegou'), await pagina.locator('.pl-dh').innerText());
cobra('no chegou, o play vira o recomeçar', (await palco('Recomeçar o dia').count()) === 1);
await palco('Recomeçar o dia').click();
await palco('Pausar o dia').click();
cobra('recomeçar volta ao em rota', (await pagina.locator('.pl-dh').innerText()).includes('em rota'));

// o que abre por cima, com o palco aberto
await botao(/Outro ponto hoje/).click();
await app.getByRole('radio', { name: /Norte, 2800/ }).click();
await botao('Embarcar neste ponto').click();
await pagina.waitForTimeout(400);
cobra('o sheet abre dentro da tela do aparelho', await dentroDaTela('[data-peca-de-vidro="sheet"]'));
await botao('Confirmar').click();
await app.getByText('Pronto. Hoje você embarca na Av. Norte, 2800.').waitFor();
cobra('o toast abre dentro da tela do aparelho', await dentroDaTela('.toast'));
await pagina.waitForTimeout(3600);

// o tema: a Aparência do Perfil e o Modo claro do palco são o mesmo estado
await botao('Perfil').click();
cobra('o tocador do dia não aparece fora das três telas', (await pagina.locator('.pl-dia').count()) === 0);
await app.locator('main').evaluate((m) => (m.scrollTop = m.scrollHeight));
await app.getByRole('radio', { name: 'Claro' }).click();
cobra('escolher Claro na Aparência deixa o app claro', (await temaDoApp()) === 'claro', await temaDoApp());
await abrirPainel();
cobra('e liga o Modo claro do palco', (await modoClaro().getAttribute('aria-checked')) === 'true');
const vidroNoClaro = await app.locator('.topo').evaluate((el) => getComputedStyle(el).getPropertyValue('--vd-medio-fundo') || getComputedStyle(el).backgroundColor);
await modoClaro().click();
await fecharPainel();
cobra('desligar o Modo claro do palco deixa o app escuro', (await temaDoApp()) === 'escuro', await temaDoApp());
cobra('e marca Escuro na Aparência', (await app.getByRole('radio', { name: 'Escuro' }).getAttribute('aria-checked')) === 'true');
const vidroNoEscuro = await app.locator('.topo').evaluate((el) => getComputedStyle(el).getPropertyValue('--vd-medio-fundo') || getComputedStyle(el).backgroundColor);
cobra('o vidro acompanha o tema', vidroNoClaro !== vidroNoEscuro, `${vidroNoClaro} / ${vidroNoEscuro}`);
cobra('o palco continua escuro', (await pagina.locator('.pl').evaluate((el) => el.closest('[data-tema]')?.getAttribute('data-tema') ?? el.getAttribute('data-tema'))) === 'escuro');
await abrirPainel();
await modoClaro().click();
await pagina.reload();
await pagina.waitForSelector('#tela-do-aparelho');
cobra('recarregar mantém o tema escolhido', (await temaDoApp()) === 'claro', await temaDoApp());
await abrirPainel();
await modoClaro().click();
await fecharPainel();

// sair e entrar de novo, colando um código qualquer: quem já preparou o app vai direto ao Início
await entrarNoApp(pagina);
await palco('Pausar o dia').click();
await botao('Perfil').click();
await app.locator('main').evaluate((m) => (m.scrollTop = m.scrollHeight));
await botao('Sair da conta').click();
await botao('Sair', { exact: true }).click();
cobra('sair da conta leva ao Entrar', (await app.getAttribute('data-tela')) === 'T01', await app.getAttribute('data-tela'));
await app.getByLabel('E-mail', { exact: true }).click();
await pagina.waitForTimeout(200);
cobra('o teclado desenhado abre dentro da tela do aparelho', await dentroDaTela('.kb'));
cobra('o e-mail já vem preenchido', (await app.getByLabel('E-mail', { exact: true }).inputValue()) === 'ana@metalurgicaalfa.com.br');
await botao('Receber código').click();
await app.getByText('Digite o código').waitFor();
cobra('o Código abre vazio', (await app.getByLabel('Código', { exact: true }).inputValue()) === '');
// colar os seis de uma vez também valida
await app.getByLabel('Código', { exact: true }).focus();
await pagina.keyboard.insertText('000000');
await pagina.waitForTimeout(1800);
cobra('entrar de novo, colando um código qualquer, chega ao Início, sem passar pelo Preparar o app', (await app.getAttribute('data-tela')) === 'T05', await app.getAttribute('data-tela'));

// o alerta do sistema: no primeiro acesso, ao tocar Começar
await abrirPainel();
await pagina.locator('.pl-sb').getByRole('button', { name: /Preparar o app/ }).click();
await fecharPainel();
await botao('Começar').click();
await pagina.waitForTimeout(300);
cobra('o alerta do sistema abre dentro da tela do aparelho', await dentroDaTela('.sys'));
await contexto.close();

// ── no tamanho de celular ──
const celular = await navegador.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const p = await celular.newPage();
await ir(p, base, '');
const tela = await p.locator('#tela-do-aparelho').boundingBox();
cobra('no celular, o app ocupa a tela inteira', tela.x === 0 && tela.y === 0 && Math.round(tela.width) === 390 && Math.round(tela.height) === 844, JSON.stringify(tela));
cobra('no celular, o palco some', (await p.locator('.pl').count()) === 0 && (await p.locator('[data-aba-do-palco]').count()) === 0);
await ir(p, base, 'palco=1');
cobra('com ?palco=1, aparece a aba da gaveta', (await p.locator('[data-aba-do-palco]').count()) === 1);
await p.locator('[data-aba-do-palco]').click();
cobra('a aba abre a gaveta do palco', (await p.getByRole('dialog', { name: 'Palco do protótipo' }).count()) === 1);
await p.getByRole('combobox', { name: 'Tela' }).selectOption('T01');
await p.getByRole('button', { name: 'Fechar a gaveta' }).click();
await p.getByLabel('E-mail', { exact: true }).click();
await p.waitForTimeout(250);
cobra('no celular, o campo não sobe o teclado desenhado (é o do celular)', (await p.locator('.kb').count()) === 0);
cobra('e o campo é de e-mail, sem correção nem maiúscula', await p.getByLabel('E-mail', { exact: true }).evaluate((el) => el.type === 'email' && el.autocapitalize === 'none' && el.getAttribute('autocorrect') === 'off'));
await celular.close();

await navegador.close();
await fechar();
if (falhas.length) { console.error(`fechamento: REPROVADO · ${falhas.length} de ${feitas}`); falhas.forEach((f) => console.error(' - ' + f)); process.exit(1); }
console.log(`fechamento: APROVADO · ${feitas} cobranças: o tema, o dia, o que abre por cima, o tamanho de celular e a volta com o código`);
