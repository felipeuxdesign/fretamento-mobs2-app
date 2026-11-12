// O que se toca na entrada: o Entrar, o código e o Preparar o app, do primeiro acesso até o Início.
// O Entrar abre pelo painel do palco, que é como se chega nele sem sair da conta.
export async function percorrer({ pagina, app, palco, chegouEm, base, ir }) {
  await ir(pagina, base, 'vidro=0');
  await palco('Abrir o painel do protótipo').click();
  await pagina.locator('.pl-sb').getByRole('button', { name: /Entrar/ }).click();
  await palco('Fechar o painel', { exact: true }).click();
  // no fluxo, o e-mail e o celular já vêm preenchidos com o contato da Ana, e o Código abre vazio: os quadros de campo vazio
  // se conferem parados, pela fidelidade; aqui se confere o que a tela diz e os quadros com o campo preenchido
  const campo = app.getByLabel('E-mail', { exact: true });
  // tocar na ponta direita do campo põe o cursor no fim do texto (um campo de e-mail não deixa mover o cursor por código)
  const tocarNoFim = async () => {
    const c = await campo.boundingBox();
    await campo.click({ position: { x: c.width - 6, y: c.height / 2 } });
  };
  if ((await campo.inputValue()) !== 'ana@metalurgicaalfa.com.br') throw new Error('o e-mail não veio preenchido');
  await app.getByText('Celular', { exact: true }).click();
  if ((await app.getByLabel('Celular com DDD').inputValue()) !== '(81) 91234-5678') throw new Error('o celular não veio preenchido');
  await app.getByText('E-mail', { exact: true }).first().click();
  await app.getByRole('button', { name: 'Não recebi convite' }).click();
  await app.getByText('Como ganhar acesso').waitFor();
  await app.getByRole('button', { name: 'Entendi' }).click();

  // tocar no campo: o teclado desenhado sobe, e o campo e o botão continuam à vista
  await tocarNoFim();
  await chegouEm('T01-02', 'tocar no campo, com o e-mail escrito');
  for (let i = 0; i < 'alfa.com.br'.length; i++) await pagina.keyboard.press('Backspace');
  await app.getByRole('button', { name: 'Receber código' }).click();
  await chegouEm('T01-04', 'enviar com o e-mail incompleto');
  await tocarNoFim();
  await pagina.keyboard.type('alfa.com.br');
  await app.getByRole('button', { name: 'Receber código' }).click();

  // o código: o contador anda de verdade, então os quadros com contador se conferem pelo que dizem
  await app.getByText('Digite o código').waitFor();
  await app.getByText('a•••@metalurgicaalfa.com.br').waitFor();
  await app.getByText(/Reenviar código em [01]:\d\d/).waitFor();
  const codigo = app.getByLabel('Código', { exact: true });
  // a tela abre com o teclado aberto e o campo com foco, e não tem botão de entrar
  await app.locator('.kb').waitFor();
  if (!(await codigo.evaluate((c) => document.activeElement === c))) throw new Error('o Código não abriu com o foco no campo');
  if (await app.getByRole('button', { name: 'Entrar', exact: true }).count()) throw new Error('o Código ainda tem o botão "Entrar"');
  if ((await codigo.inputValue()) !== '') throw new Error('o Código não abriu vazio');
  // o título fica logo abaixo do voltar, com a mesma margem esquerda do título do Preparar o app
  const titulo = await app.getByRole('heading', { name: 'Digite o código' }).boundingBox();
  const voltar = await app.getByRole('button', { name: 'Voltar' }).boundingBox();
  const naTela = await app.boundingBox();
  if (titulo.y - (voltar.y + voltar.height) > 24 || Math.round(titulo.x - naTela.x) !== 16) throw new Error(`o título do Código não está logo abaixo do voltar: ${JSON.stringify(titulo)}`);
  // com cinco dígitos, nada acontece; o sexto valida sozinho, e qualquer código entra
  await pagina.keyboard.type('70415');
  await pagina.waitForTimeout(900);
  if ((await app.getAttribute('data-tela')) !== 'T02' || (await codigo.inputValue()) !== '70415') throw new Error('o Código validou antes do sexto dígito');
  await pagina.keyboard.type('8');
  await app.getByText('Entrando').waitFor();

  // o Preparar o app: só no primeiro acesso
  await chegouEm('T03-00', 'digitar seis dígitos quaisquer, no primeiro acesso');
  await app.getByRole('switch', { name: /Pedir o Face ID/ }).click();
  await chegouEm('T03-02', 'ligar a proteção: o celular pede o Face ID');
  await app.getByRole('button', { name: 'Cancelar' }).click();
  await chegouEm('T03-04', 'cancelar o Face ID: o erro no lugar');
  await app.getByRole('switch', { name: /Pedir o Face ID/ }).click();
  // tocar no desenho confirma; se o Face ID já confirmou sozinho (1,4 s), o pedido já saiu, e segue
  await app.locator('.sys.face-id .b').click({ timeout: 2500 }).catch(() => {});
  await app.locator('.sys.face-id').waitFor({ state: 'detached' });
  await app.getByRole('switch', { name: /Pedir o Face ID/ }).click();
  await app.getByRole('button', { name: 'Começar' }).click();
  await chegouEm('T03-01', 'tocar "Começar" com os avisos ligados: o celular pergunta');
  await app.getByRole('button', { name: 'Permitir', exact: true }).click();
  await palco('Pausar o dia').click();
  await chegouEm('T05-00', 'permitir os avisos: o Início abre');
}
