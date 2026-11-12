# T12 · Privacidade · quadros e estados

## Os quadros desta tela · 10

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T12-00 | tela | Perfil › Privacidade | Face ID · pedido ao abrir e depois de 5 min | `00-tela` |
| T12-01 | momento | tocar o switch ligado | sheet que explica o risco antes de desligar | `01-momento-desligar-o-desbloqueio` |
| T12-02 | momento | tocar o switch desligado | o celular pede o Face ID antes de ligar | `02-momento-ligar-o-desbloqueio` |
| T12-03 | momento | tocar "Aviso de privacidade", ou o link em Preparar o app | seis seções curtas · nomes da empresa e da transportadora vêm do cadastro | `03-momento-aviso-de-privacidade-por-secoes` |
| T12-04 | momento | tocar "Termos de uso", ou o link em Preparar o app | texto corrido em corpo 15 | `04-momento-termos-de-uso-em-cinco-frases` |
| T12-05 | momento | tocar "Meus dados", ou o link em Excluir conta | texto, prazo de 15 dias e o botão | `05-momento-meus-dados-o-caminho-do-pedido` |
| T12-06 | momento | tocar "Fazer um pedido" em Meus dados | três rádios · campo de texto · Enviar no rodapé | `06-momento-fazer-um-pedido-tipo-ver-os-dados` |
| T12-07 | momento | tocar no campo e escrever | teclado do sistema · texto com o cursor | `07-momento-pedido-digitando` |
| T12-08 | momento | tocar o terceiro rádio | nota de atenção com a consequência | `08-momento-pedido-escolher-apagar-meu-cadastro` |
| T12-09 | momento | tocar "Enviar pedido", e o servidor registra | estado central · protocolo tabular · Voltar ao início | `09-momento-pedido-registrado-o-protocolo` |

## Os estados desta tela · 7

O que o celular, o servidor e a rede decidem: o bloqueio de tela e a permissão de localização; um pedido já aberto em Meus dados; e o envio do pedido, que espera, falha ou fica sem internet. Os textos legais não têm estado: vêm com o app. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T12-10 | estado | o celular não tem senha nem biometria | switch desligado e travado · atalho dos ajustes | `10-estado-celular-sem-bloqueio-de-tela` |
| T12-11 | estado | a permissão de localização está negada | a linha diz "Desligada no celular" | `11-estado-localizacao-desligada` |
| T12-12 | estado | voltar a Meus dados depois de registrar um pedido | cartão com o tipo, o protocolo e o prazo | `12-estado-meus-dados-pedido-em-andamento` |
| T12-13 | estado | o celular perdeu a conexão em Meus dados | banner · botão desligado | `13-estado-meus-dados-sem-internet` |
| T12-14 | estado | os 700 ms depois de "Enviar pedido" | botão carregando | `14-estado-pedido-enviando` |
| T12-15 | estado | o servidor não respondeu ao pedido | erro no lugar da ação · o texto fica | `15-estado-pedido-falha-de-rede` |
| T12-16 | estado | o celular perdeu a conexão no pedido | banner · Enviar desligado | `16-estado-pedido-sem-internet` |
