# T06 · Paradas da viagem · quadros e estados

## Os quadros desta tela · 9

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T06-00 | tela | tocar "Ver todas" no Início | ao vivo · ônibus indo para a Av. Norte, 2800 | `00-tela` |
| T06-01 | momento | o ônibus se aproxima de uma parada | texto "Chegando na Av. Norte, 2800" · "1 min" junto da hora | `01-momento-o-onibus-chegando-na-parada-06-30` |
| T06-02 | momento | o ônibus chega numa parada e abre as portas | texto do ônibus vira "Na Av. Norte, 2800" · a parada ganha "agora" junto da hora · ao sair, vira passada | `02-momento-o-onibus-chega-na-parada-06-31` |
| T06-03 | momento | o ônibus a menos de 2 min do seu ponto | texto "Chegando no seu ponto" · "1 min" junto da hora · a Av. Norte passada | `03-momento-chegando-no-seu-ponto-06-41` |
| T06-04 | momento | o ônibus parado no seu ponto | texto "No seu ponto" · "agora" junto da hora | `04-momento-no-seu-ponto-06-42` |
| T06-05 | momento | tocar Embarquei no Início, ou o crachá lido no ônibus | o seu ponto passado · ônibus "Indo para a Av. Recife, 4300" · 31 min até a fábrica | `05-momento-a-bordo-06-44` |
| T06-06 | momento | o ônibus chega ao destino | todas as paradas passadas · "Na Fábrica – Portaria 2" · 07:16 com "chegou" · a linha de cima diz "viagem concluída" | `06-momento-chegou-07-16` |
| T06-07 | momento | tocar em Av. Norte, 2800 | sheet com a previsão, as pessoas e "Embarcar aqui hoje" | `07-momento-tocar-numa-parada` |
| T06-08 | momento | voltar da T08 com a troca confirmada | "Seu ponto hoje" na Av. Norte · "Ponto de sempre" na Av. Abdias | `08-momento-depois-da-troca-de-ponto` |

## Os estados desta tela · 6

O que o mundo decide: a janela ao vivo, o sinal do ônibus, a internet do celular e a transportadora. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T06-09 | estado | abrir mais de 30 min antes da saída | horários programados · sem ônibus no trilho | `09-estado-antes-da-janela-ao-vivo-05-20` |
| T06-10 | estado | a posição parou de chegar há mais de 1,5 min | ônibus apagado no trilho · "Última posição há 2 min" | `10-estado-dado-antigo-06-26` |
| T06-11 | estado | mais de 3 min sem posição | recua para o programado · o ônibus apagado na última posição, com "Último sinal às 06:21" | `11-estado-sem-sinal-06-28` |
| T06-12 | estado | o celular perdeu a conexão | banner fixo · dados de 06:20 | `12-estado-sem-internet` |
| T06-13 | estado | a transportadora cancelou a viagem | cartão de perigo · horários programados, apagados | `13-estado-viagem-cancelada` |
| T06-14 | estado | o ônibus saiu do trajeto previsto | banner de atenção · o ônibus fora do trajeto no trilho · previsão de 06:28 | `14-estado-em-desvio-06-28` |
