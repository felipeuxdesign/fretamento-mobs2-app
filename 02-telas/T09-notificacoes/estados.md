# T09 · Notificações · quadros e estados

## Os quadros desta tela · 3

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T09-00 | tela | tocar o sino no Início | hoje: saiu, comunicado · ontem · anteriores | `00-tela` |
| T09-01 | momento | tocar o botão da barra | sem pontos · o botão some | `01-momento-marcar-todas-como-lidas` |
| T09-02 | momento | tocar em "Viagem das 17:20 cancelada" | sheet com o aviso completo; avisos de viagem abrem o Início | `02-momento-tocar-num-aviso-da-transportadora` |

## Os estados desta tela · 5

O que o mundo decide: se há avisos, a permissão do celular, a internet e o push, que chega com o app fechado. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T09-03 | estado | conta nova, sem avisos ainda | estado vazio com o sino e o atalho das preferências | `03-estado-vazio` |
| T09-04 | estado | a permissão de notificações está negada | banner com "Ativar", que abre os ajustes do celular | `04-estado-avisos-desligados-no-celular` |
| T09-05 | estado | o celular perdeu a conexão | banner · a lista que o app já tinha | `05-estado-sem-internet` |
| T09-06 | estado | o ônibus a 10 min do seu ponto, com o celular bloqueado | tela de bloqueio às 06:32 · chega em 10 min e o saiu das 06:07 · tocar abre o Início | `06-estado-push-com-o-celular-bloqueado` |
| T09-07 | estado | o ônibus atrasa enquanto a pessoa usa o celular | banner no topo da tela inicial · "Ônibus atrasado 8 min" · some sozinho e fica na lista | `07-estado-push-com-o-celular-em-uso` |
