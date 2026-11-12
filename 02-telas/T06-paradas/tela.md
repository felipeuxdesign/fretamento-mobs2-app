# T06 · Paradas da viagem

Telas do app · T06 · Viagem

A lista inteira da viagem em foco, da origem ao destino, com o ônibus cortando o trilho onde está. É consulta: abre pelo "Ver todas" do Início e não decide nada, mas cada parada abre um sheet com a previsão e a opção de embarcar nela hoje, que segue para a confirmação da T08. A barra tem o voltar e o título; abaixo, uma linha diz a linha, o sentido e de onde vem o horário (previsão ao vivo ou programado). O trilho segue a regra do DS: cada parada com o ícone do tipo (14 no disco de 24), os que vêm com os minutos sob o horário, a passada em tinta-apagada, sem contagem, e o trilho em borda, o ônibus como único ponto vivo, um texto só com o estado apontando a próxima parada ("Indo para", "Chegando na" ou "Na"), as paradas sem nome agrupadas, o seu ponto com halo e os terminais cheios. No fim, a nota sobre as paradas agrupadas e o atalho para o mapa. A contagem é de previstos, não de quem embarcou: aparece só nas paradas que vêm, como "N pessoas embarcam aqui"; abaixo de 2 vira "Até 1 pessoa embarca aqui", para ninguém ser identificado; e some quando o contrato não tem contagem. No exemplo, 06:24, o 1234 entre o Mercado de Casa Amarela e a Av. Norte, 2800. Os quadros seguem o dia, o mesmo do Início e do Mapa: em rota, o ônibus chegando e parado numa parada, chegando no seu ponto, no seu ponto, a bordo e chegou; depois vem o que se alcança tocando: uma parada e a lista depois da troca de ponto.

- Quadros: 9 (a tela e os momentos). Estados: 6.
- As referências estão em `referencias/html/` e `referencias/png/`, uma por linha do `estados.md`.
- Os textos exatos estão no `textos.md`; o movimento, no `animacao.md`.
