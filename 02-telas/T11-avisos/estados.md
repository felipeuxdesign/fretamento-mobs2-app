# T11 · Avisos · quadros e estados

## Os quadros desta tela · 2

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T11-00 | tela | tocar "Preferências de avisos" ou Perfil › Avisos | chegando 10 min · saiu ligado | `00-tela` |
| T11-01 | momento | tocar o switch | os chips de minutos apagam | `01-momento-desligar-onibus-chegando` |

## Os estados desta tela · 2

O que o celular e a rede decidem: a permissão de notificações e a internet. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T11-02 | estado | a permissão de notificações está negada | banner com "Ativar" · switches apagados | `02-estado-avisos-desligados-no-celular` |
| T11-03 | estado | mudar uma preferência sem conexão | banner · a mudança fica guardada e sobe depois | `03-estado-sem-internet` |
