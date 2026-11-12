# T13 · Excluir conta · quadros e estados

## Os quadros desta tela · 3

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T13-00 | tela | Perfil › Excluir conta | duas frases · link para Meus dados · botão destrutivo no rodapé | `00-tela` |
| T13-01 | momento | tocar o botão destrutivo | sheet de confirmação com o destrutivo em cima | `01-momento-excluir-conta` |
| T13-02 | momento | confirmar a exclusão no sheet | estado central · Voltar ao início leva ao Entrar | `02-momento-conta-excluida` |

## Os estados desta tela · 3

O que o servidor e a rede decidem: excluindo, falha e sem internet. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T13-03 | estado | os 700 ms depois de confirmar | botão carregando | `03-estado-excluindo` |
| T13-04 | estado | o servidor não respondeu | erro no lugar da ação | `04-estado-falha-de-rede` |
| T13-05 | estado | o celular perdeu a conexão | banner · botão desligado | `05-estado-sem-internet` |
