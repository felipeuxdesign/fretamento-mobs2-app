// O que se toca no "Outro ponto hoje": escolher, ordenar por distância, abrir o que já passou, confirmar,
// e a volta para o Início e para as Paradas com a troca ativa. Recomeça o app, para a localização ainda não ter sido pedida.
import { entrarNoApp } from './_comum.mjs';
export async function percorrer({ pagina, app, palco, chegouEm, base, ir }) {
  await ir(pagina, base, 'vidro=0');
  await entrarNoApp(pagina);
  await palco('Pausar o dia').click();
  await app.getByRole('button', { name: /Outro ponto hoje/ }).click();
  await chegouEm('T08-00', 'tocar "Outro ponto hoje" no Início');

  // "Perto de mim" sem permissão: o sheet de pré-permissão. Atrás dele, o app mostra a lista inteira
  // (a referência T08-02 desenha só dois pontos), então aqui se confere o que o sheet diz, e não o quadro
  await app.getByRole('button', { name: 'Perto de mim' }).click();
  await app.getByText('Mostrar os pontos perto de você?').waitFor();
  await app.getByRole('button', { name: 'Permitir' }).click();
  await chegouEm('T08-03', 'permitir a localização: a lista por distância a pé');
  await app.getByRole('button', { name: /Perto de mim/ }).click();
  await app.getByRole('button', { name: /Pontos que o ônibus já passou/ }).click();
  await chegouEm('T08-04', 'abrir "Pontos que o ônibus já passou"');
  await app.getByRole('button', { name: /Pontos que o ônibus já passou/ }).click();
  await app.getByRole('radio', { name: /Norte, 2800/ }).click();
  await chegouEm('T08-01', 'tocar um ponto da lista');

  // a confirmação: o mesmo caso do sheet sobre a lista inteira
  await app.getByRole('button', { name: 'Embarcar neste ponto' }).click();
  await app.getByText(/Embarcar na Av\.\sNorte, 2800 hoje\?/).waitFor();
  await app.getByText('11 min antes do seu ponto de sempre', { exact: false }).waitFor();
  await app.getByRole('button', { name: 'Confirmar' }).click();
  await app.getByText('Pronto. Hoje você embarca na Av. Norte, 2800.').waitFor();
  await pagina.waitForTimeout(3600); // o toast fica 3,2 s
  await chegouEm('T05-07', 'confirmar a troca: o Início com o cartão da troca');
  await app.getByRole('button', { name: 'Ver todas' }).click();
  await chegouEm('T06-08', 'as Paradas depois da troca de ponto');
  await app.getByRole('button', { name: 'Voltar' }).click();

  // voltar atrás: o ponto de sempre de novo
  await app.getByRole('button', { name: 'Voltar ao ponto de sempre' }).click();
  await app.getByText(/Voltar a embarcar na Av\.\sAbdias de Carvalho, 1200\?/).waitFor();
  await app.getByRole('button', { name: 'Voltar', exact: true }).last().click();
  await chegouEm('T05-00', 'voltar ao ponto de sempre');
}
