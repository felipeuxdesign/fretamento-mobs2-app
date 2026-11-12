# T07 · Mapa · quadros e estados

## Os quadros desta tela · 12

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T07-00 | tela | tocar "Ver no mapa" no Início ou nas Paradas | ônibus entre o Mercado e a Av. Norte · herói compacto 18 min | `00-tela` |
| T07-01 | momento | o ônibus a menos de 2 min do seu ponto | ônibus quase no seu ponto · herói "Chegando · menos de 2 min" | `01-momento-chegando-no-seu-ponto-06-41` |
| T07-02 | momento | o ônibus parado no seu ponto | ônibus sobre o seu ponto · herói "No ponto · agora" | `02-momento-no-seu-ponto-06-42` |
| T07-03 | momento | tocar Embarquei no Início, ou o crachá lido no ônibus | o seu ponto passado · herói "31 min · às 07:15" com "Embarque registrado" | `03-momento-a-bordo-06-44` |
| T07-04 | momento | o ônibus chega ao destino | ônibus na fábrica · a rota toda percorrida · herói "Chegou · às 07:16" com "Viagem concluída" | `04-momento-chegou-07-16` |
| T07-05 | momento | puxar a alça uma vez | os pontos entre o ônibus e o destino | `05-momento-painel-no-meio-proximos-pontos` |
| T07-06 | momento | puxar a alça de novo | a lista completa, como nas Paradas | `06-momento-painel-inteiro-todas-as-paradas` |
| T07-07 | momento | tocar no marcador da Av. Norte, 2800 | mapa centrado na parada · detalhe com "Embarcar aqui hoje" | `07-momento-tocar-numa-parada` |
| T07-08 | momento | tocar o ônibus na barra | botão aceso · mapa centrado no ônibus e acompanhando | `08-momento-seguir-onibus` |
| T07-09 | momento | tocar a mira: o sheet de pré-permissão da T08-02 e depois o pedido do celular | permitido, o ponto azul perto do seu ponto | `09-momento-minha-localizacao` |
| T07-10 | momento | tocar o disco do ônibus | balão com prefixo, placa e idade do dado | `10-momento-tocar-no-onibus` |
| T07-11 | momento | pinçar para afastar | a linha inteira a 50% · 9 paradas · destino nomeado | `11-momento-pincar-para-afastar-a-linha-inteira-do-terminal-a-fabric` |

## Os estados desta tela · 7

O que o mundo decide: a janela ao vivo, o sinal do ônibus, a permissão de localização, a internet e a transportadora. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T07-12 | estado | abrir mais de 30 min antes da saída | sem ônibus · herói programado · botão do ônibus desligado | `12-estado-antes-da-janela-ao-vivo-05-20` |
| T07-13 | estado | a posição parou de chegar há mais de 1,5 min | ônibus apagado · selo dado antigo | `13-estado-dado-antigo-06-26` |
| T07-14 | estado | mais de 3 min sem posição | ônibus apagado na última posição, "Último sinal 06:21" · recua para o programado | `14-estado-sem-sinal-06-28` |
| T07-15 | estado | tocar "Minha localização" com a permissão negada | aviso com o atalho dos ajustes · mapa segue | `15-estado-localizacao-negada` |
| T07-16 | estado | a transportadora cancelou a viagem | sem ônibus · rota apagada · cartão de perigo · botão do ônibus desligado | `16-estado-viagem-cancelada` |
| T07-17 | estado | o celular perdeu a conexão | banner fixo · última posição conhecida | `17-estado-sem-internet` |
| T07-18 | estado | o ônibus saiu do trajeto previsto | banner de atenção · o ônibus ao lado da rota, com o rastro · "cerca de 16 min" | `18-estado-em-desvio-06-28-painel-recolhido` |
