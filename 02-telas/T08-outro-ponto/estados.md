# T08 · Outro ponto hoje · quadros e estados

## Os quadros desta tela · 6

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T08-00 | tela | tocar "Outro ponto hoje" na T05 | 06:24 · nada escolhido · botão desligado | `00-tela` |
| T08-01 | momento | tocar um ponto da lista | Av. Norte escolhido · botão aceso | `01-momento-av-norte-escolhido` |
| T08-02 | momento | tocar "Perto de mim" sem permissão de localização | sheet de pré-permissão, antes do pedido do sistema | `02-momento-perto-de-mim-sem-permissao` |
| T08-03 | momento | "Perto de mim" ligado | lista por distância a pé · Av. Abdias de Carvalho a 3 min | `03-momento-perto-de-mim-ligado` |
| T08-04 | momento | abrir "Pontos que o ônibus já passou" | Terminal da Macaxeira 06:05 e Mercado de Casa Amarela 06:13 | `04-momento-ja-passou-aberto` |
| T08-05 | momento | tocar "Embarcar neste ponto" | sheet de confirmação · 11 min antes do de sempre | `05-momento-confirmar-a-troca` |

## Os estados desta tela · 4

O que o mundo decide: o ônibus já passou, a rede caiu, o servidor respondeu tarde. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T08-06 | estado | o ônibus já passou por todos, ou todos em cima da hora | 06:58 · nenhum ponto disponível | `06-estado-06-58-nenhum-ponto-disponivel` |
| T08-07 | estado | o celular sem internet | lista visível · confirmar indisponível | `07-estado-sem-internet` |
| T08-08 | estado | o servidor responde que o ônibus passou durante a confirmação | resposta "passou" · escolher outro | `08-estado-o-onibus-passou-durante-a-confirmacao` |
| T08-09 | estado | tocar "Confirmar" e o servidor não responder | o sheet fica aberto com o erro no lugar · nada muda · Confirmar de novo | `09-estado-a-confirmacao-falhou` |
