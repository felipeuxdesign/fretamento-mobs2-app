// O que se toca nas Notificações, no Perfil, nos Avisos, na Privacidade e na Excluir conta.
// Recomeça o app com o tema escuro fixo, que é o que as referências do Perfil mostram escolhido na Aparência.
import { entrarNoApp } from './_comum.mjs';
export async function percorrer({ pagina, app, palco, chegouEm, base, ir }) {
  const rolar = (ate) => app.locator('main').evaluate((m, fim) => (m.scrollTop = fim ? m.scrollHeight : 0), ate === 'fim');
  const botao = (nome, opcoes = {}) => app.getByRole('button', { name: nome, ...opcoes });
  await ir(pagina, base, 'vidro=0&tema=escuro');
  await entrarNoApp(pagina);
  await palco('Pausar o dia').click();

  // ── as Notificações e os Avisos ──
  await botao(/Notificações/).click();
  await chegouEm('T09-00', 'tocar o sino no Início');
  await rolar('fim');
  await botao(/Viagem das 17:20 cancelada/).click();
  await chegouEm('T09-02', 'tocar num aviso da transportadora');
  await botao('Fechar').click();
  await rolar('topo');
  await botao('Marcar todas como lidas').click();
  await chegouEm('T09-01', 'tocar "Marcar todas como lidas"');
  await botao(/Preferências de avisos/).click();
  await chegouEm('T11-00', 'tocar "Preferências de avisos"');
  await app.getByRole('switch', { name: 'Ônibus chegando' }).click();
  await chegouEm('T11-01', 'desligar "Ônibus chegando"');
  await app.getByRole('switch', { name: 'Ônibus chegando' }).click();
  await botao('Voltar').click();
  await botao('Voltar').click();

  // ── o Perfil ──
  await botao('Perfil').click();
  await chegouEm('T10-00', 'tocar o avatar no Início');
  await rolar('fim');
  await pagina.waitForTimeout(1200);
  await chegouEm('T10-03', 'rolar o Perfil até o fim');
  await botao(/Preciso de ajuda/).click();
  await chegouEm('T10-01', 'tocar "Preciso de ajuda"');
  await botao('Voltar').click();
  await botao('Sair da conta').click();
  await chegouEm('T10-02', 'tocar "Sair da conta"');
  await botao('Cancelar').click();

  // ── a Privacidade ──
  await botao(/Privacidade/).click();
  await chegouEm('T12-00', 'Perfil › Privacidade');
  // o desbloqueio é o que a pessoa decidiu no Preparar o app: se veio desligado, liga antes, para o roteiro ser um só
  if ((await app.getByRole('switch', { name: /Desbloqueio/ }).getAttribute('aria-checked')) !== 'true') {
    await app.getByRole('switch', { name: /Desbloqueio/ }).click();
    await app.locator('.sys.face-id .b').first().click({ timeout: 2500 }).catch(() => {});
    await app.locator('.sys.face-id').waitFor({ state: 'detached' });
  }
  await app.getByRole('switch', { name: /Desbloqueio/ }).click();
  await chegouEm('T12-01', 'desligar o desbloqueio');
  await botao('Desligar').click();
  await app.getByRole('switch', { name: /Desbloqueio/ }).click();
  await chegouEm('T12-02', 'ligar o desbloqueio: o celular pede o Face ID');
  await app.locator('.sys.face-id .b').click({ timeout: 2500 }).catch(() => {});
  await app.locator('.sys.face-id').waitFor({ state: 'detached' });
  await botao('Aviso de privacidade').click();
  await chegouEm('T12-03', 'abrir o aviso de privacidade');
  await botao('Voltar').click();
  await botao('Termos de uso').click();
  await chegouEm('T12-04', 'abrir os termos de uso');
  await botao('Voltar').click();
  await botao(/Meus dados/).click();
  await chegouEm('T12-05', 'abrir Meus dados');
  await botao('Fazer um pedido').click();
  // no fluxo, o pedido já vem escrito: os quadros do campo vazio se conferem parados
  await app.getByText('Tipo de pedido').waitFor();
  await app.getByRole('radio', { name: /Apagar meu cadastro/ }).click();
  await app.getByText('Apagar o cadastro encerra seu acesso ao app e ao fretado.', { exact: false }).waitFor();
  await app.getByRole('radio', { name: /Ver os dados/ }).click();
  await app.getByLabel('Conte o que você precisa').click();
  // com o teclado aberto, o "Enviar pedido" sobe para cima dele: o quadro T12-07 (o botão atrás do teclado) se confere parado
  await app.locator('.kb').waitFor();
  const [doBotao, doTeclado] = [await botao('Enviar pedido').boundingBox(), await app.locator('.kb').boundingBox()];
  if (!doBotao || !doTeclado || doBotao.y + doBotao.height > doTeclado.y + 1) throw new Error('com o teclado aberto, o "Enviar pedido" não ficou acima dele');
  await botao('Enviar pedido').click();
  await chegouEm('T12-09', 'enviar o pedido: o protocolo');
  await botao('Voltar ao início').click();
  await botao('Perfil').click();
  await botao(/Privacidade/).click();
  await botao(/Meus dados/).click();
  await chegouEm('T12-12', 'voltar a Meus dados: o pedido em andamento');
  await botao('Voltar').click();
  await botao('Voltar').click();

  // ── a Excluir conta ──
  await rolar('fim');
  await botao('Excluir conta').click();
  await chegouEm('T13-00', 'Perfil › Excluir conta');
  await botao('Excluir conta').click();
  await chegouEm('T13-01', 'tocar "Excluir conta"');
  await botao('Excluir', { exact: true }).click();
  await chegouEm('T13-02', 'confirmar: a conta excluída');
  await botao('Voltar ao início').click();
  // o Entrar volta com o contato já preenchido, então o quadro do campo vazio não serve de régua aqui: confere-se a tela
  await app.getByText('Acompanhe seu ônibus').waitFor();
  if ((await app.getByLabel('E-mail', { exact: true }).inputValue()) !== 'ana@metalurgicaalfa.com.br') throw new Error('depois de excluir a conta, o Entrar não voltou com o e-mail preenchido');
}
