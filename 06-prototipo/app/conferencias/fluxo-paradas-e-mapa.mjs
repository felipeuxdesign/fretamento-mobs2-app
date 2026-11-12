// O que se toca nas Paradas e no Mapa: o dia nas três telas, a parada tocada, o painel de três alturas,
// a barra do mapa, o ônibus e o afastar. Começa no Início, às 06:24, com o dia pausado.
export async function percorrer({ pagina, app, palco, chegouEm }) {
  const recomecar = async () => {
    await palco('Recomeçar o dia').click();
    await palco('Pausar o dia').click();
  };

  // ── as Paradas ──
  await app.locator('main').evaluate((m) => (m.scrollTop = 0));
  await app.getByRole('button', { name: 'Ver todas' }).click();
  await chegouEm('T06-00', 'tocar "Ver todas" no Início');
  // as três batidas do em rota: indo para a parada, chegando nela e parado nela (8 s no passo, em 1×)
  await palco('Continuar o dia').click();
  await pagina.waitForTimeout(3600);
  await palco('Pausar o dia').click();
  await chegouEm('T06-01', 'o dia anda: o ônibus chegando na parada');
  await palco('Continuar o dia').click();
  await pagina.waitForTimeout(2400);
  await palco('Pausar o dia').click();
  await chegouEm('T06-02', 'o dia anda: o ônibus na parada');
  await palco('Avançar um passo').click();
  await chegouEm('T06-03', 'o dia: chegando no seu ponto');
  await palco('Avançar um passo').click();
  await chegouEm('T06-04', 'o dia: no seu ponto');
  await palco('Avançar um passo').click();
  await chegouEm('T06-05', 'o dia: a bordo');
  await palco('Avançar um passo').click();
  await chegouEm('T06-06', 'o dia: chegou');
  await recomecar();
  await app.getByRole('button', { name: /Norte, 2800/ }).click();
  await chegouEm('T06-07', 'tocar numa parada');
  await app.locator('.sheet').getByRole('button', { name: 'Ver no mapa' }).click();

  // ── o Mapa ──
  await chegouEm('T07-00', 'tocar "Ver no mapa" no sheet da parada');
  await palco('Avançar um passo').click();
  await chegouEm('T07-01', 'o dia: chegando no seu ponto');
  await palco('Avançar um passo').click();
  await chegouEm('T07-02', 'o dia: no seu ponto');
  await palco('Avançar um passo').click();
  await chegouEm('T07-03', 'o dia: a bordo');
  await palco('Avançar um passo').click();
  await chegouEm('T07-04', 'o dia: chegou');
  await recomecar();
  await app.getByRole('button', { name: 'Expandir painel' }).click();
  await chegouEm('T07-05', 'puxar a alça uma vez');
  await app.getByRole('button', { name: 'Expandir por completo' }).click();
  await chegouEm('T07-06', 'puxar a alça de novo');
  await app.getByRole('button', { name: 'Recolher painel' }).click();
  await app.getByRole('button', { name: /Norte, 2800/ }).click();
  await chegouEm('T07-07', 'tocar no marcador da Av. Norte');
  await app.getByRole('button', { name: 'Fechar', exact: true }).click();
  await app.getByRole('button', { name: 'Seguir ônibus' }).click();
  await chegouEm('T07-08', 'tocar o ônibus na barra');
  await app.getByRole('button', { name: 'Seguir ônibus' }).click();
  await app.getByRole('button', { name: 'Minha localização' }).click();
  await app.getByRole('button', { name: 'Permitir' }).click();
  await chegouEm('T07-09', 'tocar a mira e permitir');
  await app.getByRole('button', { name: 'Minha localização' }).click();
  await app.getByRole('button', { name: /Ônibus 1234/ }).click();
  await chegouEm('T07-10', 'tocar o disco do ônibus');
  await app.getByRole('button', { name: /Ônibus 1234/ }).click();
  await app.locator('.map').hover({ position: { x: 100, y: 300 } });
  await pagina.mouse.wheel(0, 240);
  await chegouEm('T07-11', 'pinçar para afastar');
  await app.getByRole('button', { name: 'Aproximar de volta' }).click();
  await chegouEm('T07-00', 'aproximar de volta');
  await app.getByRole('button', { name: 'Voltar' }).click();
  await chegouEm('T06-00', 'voltar para as Paradas');
  await app.getByRole('button', { name: 'Voltar' }).click();
}
