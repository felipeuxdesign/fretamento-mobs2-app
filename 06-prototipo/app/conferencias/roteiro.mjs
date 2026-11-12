// O roteiro: o protótipo percorrido tocando, do zero, nos dois temas. Cada linha é uma saída que tem de levar a algo
// que existe: o caminho feliz até a fábrica, cada toque do Início, das Paradas, do Outro ponto, do Perfil e da
// Excluir conta, o voltar de cada tela e a troca de tema no meio do caminho. Sai uma tabela, linha por linha.
// Uma saída que está na tela e cujo destino não foi desenhado sai como "falta": não reprova, e fica na tabela.
import { chromium } from 'playwright';
import { construir, servir, ir, entrarNoApp, completarOCodigo } from './_comum.mjs';

if (!process.argv.includes('--sem-build')) construir();
const { base, fechar } = await servir();
const navegador = await chromium.launch();
const tabela = [];
let quebradas = 0;
let faltas = 0;

for (const tema of ['escuro', 'claro']) {
  const contexto = await navegador.newContext({ viewport: { width: 1440, height: 1024 } });
  const pagina = await contexto.newPage();
  pagina.setDefaultTimeout(6000);
  const app = pagina.locator('#tela-do-aparelho');
  const palco = (nome, o = {}) => pagina.locator('.pl').getByRole('button', { name: nome, ...o });
  const botao = (nome, o = {}) => app.getByRole('button', { name: nome, ...o });
  const tela = () => app.getAttribute('data-tela');
  const fim = () => app.locator('main').evaluate((m) => (m.scrollTop = m.scrollHeight));
  const linha = async (de, toque, esperado, passo) => {
    // o passo devolve false (quebrado), um texto (ok, com nota) ou { falta } (a saída está na tela, o destino não foi desenhado)
    let ok = true, nota = '', falta = false;
    try { const r = await passo(); if (r === false) ok = false; else if (typeof r === 'string') nota = r; else if (r?.falta) { falta = true; nota = r.falta; } } catch (e) { ok = false; nota = String(e.message).split('\n')[0].slice(0, 90); }
    if (!ok) quebradas++;
    if (falta) faltas++;
    tabela.push([tema, de, toque, esperado, !ok ? 'quebrado' : falta ? 'falta' : 'ok', nota]);
  };
  const noInicio = async () => { await ir(pagina, base, `tema=${tema}`); await entrarNoApp(pagina); await palco('Pausar o dia').click(); };

  // o caminho feliz, do zero
  await ir(pagina, base, `tema=${tema}`);
  await linha('T01', 'abrir, do zero', 'o Entrar', async () => (await tela()) === 'T01');
  await linha('T01', 'Receber código', 'T02', async () => { await botao('Receber código').click(); await app.getByText('Digite o código').waitFor(); });
  await linha('T02', 'completar os 6 dígitos', 'T03', async () => { await completarOCodigo(pagina); await botao('Começar').waitFor(); });
  await linha('T03', 'Começar', 'T05', async () => { await botao('Começar').click(); await botao('Permitir', { exact: true }).click(); await app.getByText('Bom dia, Ana').waitFor(); });
  await palco('Pausar o dia').click();
  await linha('T05', 'o dia: avançar', 'chegando', async () => { await palco('Avançar um passo').click(); await app.getByText('Chegando', { exact: true }).waitFor(); });
  await linha('T05', 'o dia: avançar', 'no ponto', async () => { await palco('Avançar um passo').click(); await app.getByText('No ponto', { exact: true }).waitFor(); });
  await linha('T05-02', 'Embarquei', 'T05-03', async () => { await botao('Embarquei').click(); await app.getByText(/Embarcou às/).waitFor(); });
  await linha('T05-03', 'Não embarquei', 'o estado de antes do embarque', async () => { await botao('Não embarquei').click(); await botao('Embarquei').waitFor(); await botao('Embarquei').click(); await app.getByText(/Embarcou às/).waitFor(); });
  await linha('T05', 'o dia: avançar', 'chegou na fábrica', async () => { await palco('Avançar um passo').click(); await app.getByText('Chegou', { exact: true }).waitFor(); });

  // cada saída leva a algo que existe
  await ir(pagina, base, `tema=${tema}`);
  await linha('T01', 'Não recebi convite', 'a folha "Como ganhar acesso"', async () => { await botao('Não recebi convite').click(); await app.getByText('Como ganhar acesso').waitFor(); await botao('Entendi').click(); });
  await linha('T02', 'Trocar e-mail ou celular', 'T01 com o valor de antes', async () => { await botao('Receber código').click(); await botao('Trocar e-mail ou celular').click(); return (await tela()) === 'T01' && (await app.getByLabel('E-mail', { exact: true }).inputValue()).includes('@'); });
  await linha('T02', 'voltar', 'T01', async () => { await botao('Receber código').click(); await app.getByText('Digite o código').waitFor(); await botao('Voltar').click(); return (await tela()) === 'T01'; });
  await linha('T03', 'Aviso de privacidade', 'o aviso, na Privacidade, e o voltar no Preparar o app', async () => { await botao('Receber código').click(); await completarOCodigo(pagina); await botao('Começar').waitFor(); await botao('Aviso de privacidade').click(); await app.getByText('Quem cuida dos seus dados').waitFor(); const t = await tela(); await botao('Voltar').click(); await botao('Começar').waitFor(); return t === 'T12'; });
  await linha('T03', 'Termos de uso', 'os termos, na Privacidade, e o voltar no Preparar o app', async () => { await botao('Termos de uso').click(); await app.getByText(/A previsão é uma estimativa/).waitFor(); const t = await tela(); await botao('Voltar').click(); await botao('Começar').waitFor(); return t === 'T12'; });
  await noInicio();
  await linha('T05', 'sino', 'T09', async () => { await botao(/Notificações/).click(); return (await tela()) === 'T09'; });
  await linha('T09', 'voltar', 'T05', async () => { await botao('Voltar').click(); return (await tela()) === 'T05'; });
  await linha('T05', 'avatar', 'T10', async () => { await botao('Perfil').click(); return (await tela()) === 'T10'; });
  await linha('T10', 'voltar', 'T05', async () => { await botao('Voltar').click(); return (await tela()) === 'T05'; });
  await linha('T05', 'Ver todas', 'T06', async () => { await botao('Ver todas').click(); return (await tela()) === 'T06'; });
  await linha('T06', 'Ver no mapa', 'T07', async () => { await fim(); await botao(/Ver no mapa/).click(); return (await tela()) === 'T07'; });
  await linha('T07', 'voltar', 'T06, de onde veio', async () => { await botao('Voltar').click(); return (await tela()) === 'T06'; });
  await linha('T06', 'voltar', 'T05', async () => { await botao('Voltar').click(); return (await tela()) === 'T05'; });
  await linha('T05', 'Ver no mapa (o cartão)', 'T07', async () => { await app.locator('.cint', { hasText: 'Ver no mapa' }).click(); const t = await tela(); await botao('Voltar').click(); return t === 'T07'; });
  await linha('T05', 'trocar o tema pelo palco, no meio do caminho', 'a mesma tela e o mesmo estado', async () => {
    await botao('Ver todas').click();
    await palco('Abrir o painel do protótipo').click();
    await pagina.getByRole('switch', { name: 'Modo claro' }).click();
    const virou = (await app.getAttribute('data-tema')) !== tema;
    await pagina.getByRole('switch', { name: 'Modo claro' }).click();
    await palco('Fechar o painel', { exact: true }).click();
    const t = await tela(); await botao('Voltar').click();
    return virou && t === 'T06';
  });
  await linha('T05', 'cartão "Sua volta hoje · 17:20"', 'T05 com a volta ativa', async () => {
    await fim();
    await app.locator('.cint', { hasText: 'Sua volta hoje' }).click();
    await app.locator('.heroi').getByText('Volta de sempre').waitFor();
    const heroi = await app.locator('.heroi').innerText();
    const noTopo = (await app.locator('main').evaluate((m) => m.scrollTop)) === 0;
    return heroi.includes('17:20') && heroi.includes('Programado') && noTopo ? 'a volta programada, montada com o dado do mock: não tem referência desenhada' : false;
  });
  await linha('T05', 'Voltar para a ida de sempre (na volta)', 'T05 com a ida de sempre', async () => { await botao('Voltar para a ida de sempre').click(); await app.locator('.heroi').getByText('Ao vivo').waitFor(); return (await app.locator('.heroi').innerText()).includes('18 min'); });
  await noInicio();
  await linha('T08', 'escolher o ponto + Embarcar neste ponto', 'T05 com o ponto trocado', async () => { await fim(); await botao(/Outro ponto hoje/).click(); await app.getByRole('radio', { name: /Norte, 2800/ }).click(); await botao('Embarcar neste ponto').click(); await botao('Confirmar').click(); await app.getByText(/Passa no seu ponto hoje/).waitFor(); return (await tela()) === 'T05'; });
  await noInicio();
  await botao('Perfil').click();
  await linha('T10', 'Preciso de ajuda', 'o "Preciso de ajuda", e o voltar no Perfil', async () => { await fim(); await botao(/^Preciso de ajuda/).click(); await app.getByText(/Quem resolve cada coisa/).waitFor(); await botao('Voltar').click(); await app.getByText('Minha conta').waitFor(); return (await tela()) === 'T10'; });
  await linha('T10', 'Avisos', 'T11', async () => { await fim(); await botao(/^Avisos/).click(); const t = await tela(); await botao('Voltar').click(); return t === 'T11'; });
  await linha('T10', 'Privacidade', 'T12', async () => { await fim(); await botao(/^Privacidade/).click(); const t = await tela(); await botao('Voltar').click(); return t === 'T12'; });
  await linha('T12', 'Aviso de privacidade', 'o aviso, e o voltar na Privacidade', async () => { await fim(); await botao(/^Privacidade/).click(); await botao('Aviso de privacidade').click(); await app.getByText('Quem cuida dos seus dados').waitFor(); await botao('Voltar').click(); await botao('Termos de uso').waitFor(); return (await tela()) === 'T12'; });
  await linha('T12', 'Termos de uso', 'os termos, e o voltar na Privacidade', async () => { await botao('Termos de uso').click(); await app.getByText(/A previsão é uma estimativa/).waitFor(); await botao('Voltar').click(); await botao('Aviso de privacidade').waitFor(); return (await tela()) === 'T12'; });
  await linha('T12', 'Meus dados', 'Meus dados, com o "Fazer um pedido", e o voltar na Privacidade', async () => { await botao(/^Meus dados/).click(); await botao('Fazer um pedido').waitFor(); await botao('Voltar').click(); await botao('Aviso de privacidade').waitFor(); const ok = (await tela()) === 'T12'; await botao('Voltar').click(); return ok; });
  await linha('T10', 'Aparência', 'troca o tema', async () => { await fim(); const outro = tema === 'escuro' ? 'Claro' : 'Escuro'; await app.getByRole('radio', { name: outro }).click(); const virou = (await app.getAttribute('data-tema')) !== tema; await app.getByRole('radio', { name: tema === 'escuro' ? 'Escuro' : 'Claro' }).click(); return virou; });
  await linha('T10', 'Excluir conta', 'T13', async () => { await fim(); await botao('Excluir conta').click(); return (await tela()) === 'T13'; });
  await linha('T13', 'Ir para Meus dados', 'T12, em Meus dados', async () => { await botao('Ir para Meus dados').click(); const ok = (await tela()) === 'T12' && (await app.getByText('Meus dados').count()) > 0; await botao('Voltar').click(); return ok; });
  await linha('T13', 'Excluir conta', 'a confirmação e depois o Entrar', async () => { await botao('Excluir conta').click(); await botao('Excluir', { exact: true }).click(); await botao('Voltar ao início').click(); return (await tela()) === 'T01'; });
  await noInicio();
  await botao('Perfil').click();
  await linha('T10', 'Sair da conta', 'o Entrar, com a sessão limpa', async () => { await fim(); await botao('Sair da conta').click(); await botao('Sair', { exact: true }).click(); return (await tela()) === 'T01' ? 'o Entrar volta com o contato preenchido, como em todo o protótipo' : false; });
  // a viagem cancelada não se alcança tocando: ela só existe como estado parado. Parado, o toque pede a volta ao fluxo
  await linha('T05-26', 'Ver a viagem das 07:05', 'a outra viagem do dia', async () => {
    await ir(pagina, base, `ref=T05-26&tema=${tema}`);
    await botao('Ver a viagem das 07:05').click();
    await palco('Voltar ao fluxo').waitFor();
    return 'o estado só existe parado: o toque pede a volta ao fluxo. No fluxo a ação está ligada (abre a outra ida), mas não há caminho tocando até a viagem cancelada';
  });
  await contexto.close();
}
await navegador.close();
await fechar();
const mesma = (a, b) => a[1] === b[1] && a[2] === b[2];
const escuro = tabela.filter((l) => l[0] === 'escuro');
console.log('| de | toque | esperado | escuro | claro | nota |\n| --- | --- | --- | --- | --- | --- |');
for (const l of escuro) { const c = tabela.find((x) => x[0] === 'claro' && mesma(x, l)); console.log(`| ${l[1]} | ${l[2]} | ${l[3]} | ${l[4]} | ${c ? c[4] : 'não rodou'} | ${[l[5], c?.[5]].filter((n, i, a) => n && a.indexOf(n) === i).join(' / ')} |`); }
console.log(`roteiro: ${quebradas ? 'REPROVADO' : 'APROVADO'} · ${tabela.length} toques nos dois temas · ${quebradas} quebrado(s) · ${faltas} com o destino por desenhar`);
process.exit(quebradas ? 1 : 0);
