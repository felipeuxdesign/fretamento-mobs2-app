# T01 · Entrar · quadros e estados

## Os quadros desta tela · 4

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T01-00 | tela | a entrada do primeiro acesso, ou depois de sair da conta | sem sessão · e-mail selecionado | `00-tela` |
| T01-01 | momento | tocar "Celular" no segmentado | campo vira telefone com DDD | `01-momento-celular-selecionado` |
| T01-02 | momento | tocar no campo e digitar | ana@metalurgicaalfa.com.br · teclado aberto | `02-momento-digitando-teclado-aberto` |
| T01-06 | momento | tocar "Não recebi convite" | sheet "Como ganhar acesso", sem nome nem contato: antes do código, o app não sabe de que empresa é a pessoa | `06-momento-nao-recebi-convite` |

## Os estados desta tela · 3

O que o mundo decide: o que foi digitado, a rede, o servidor. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T01-04 | estado | enviar com o e-mail incompleto | ana@metalurgica · erro no lugar | `04-estado-e-mail-incompleto` |
| T01-05 | estado | o celular está sem internet | banner + botão desligado | `05-estado-sem-internet` |
| T01-03 | estado | os 700 ms depois de tocar "Receber código" | botão carregando | `03-estado-enviando-o-codigo` |
