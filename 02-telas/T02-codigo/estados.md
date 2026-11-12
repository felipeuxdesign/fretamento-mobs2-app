# T02 · Digite o código · quadros e estados

## Os quadros desta tela · 3

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T02-00 | tela | depois de "Receber código" na T01 | campo vazio · teclado aberto · contador 0:45 · o 6º dígito valida sozinho | `00-tela` |
| T02-01 | momento | digitar os dígitos | 1234 digitados · teclado numérico · ainda faltam 2 dígitos | `01-momento-digitando` |
| T02-02 | momento | 60 s depois sem digitar | reenviar liberado · dica do spam · "Preciso de ajuda" abre o sheet genérico da T01-06 | `02-momento-60-s-depois-nada-chegou` |

## Os estados desta tela · 5

O que o servidor responde: incorreto, expirado, bloqueado e validando; e, com o código certo, o acesso não liberado, quando a empresa ainda não liberou o cadastro no transporte: no lugar de um texto genérico, o contato do RH que libera o acesso, com o horário, vindo do cadastro, e Voltar leva ao Entrar. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T02-03 | estado | enviar um código diferente de 123456 | incorreto · 4 tentativas restantes | `03-estado-codigo-incorreto` |
| T02-04 | estado | enviar 000000 | expirado · reenviar liberado na hora | `04-estado-codigo-expirado` |
| T02-05 | estado | o quinto erro | bloqueado até 06:39 · campo e botão desligados | `05-estado-bloqueado-por-15-min` |
| T02-06 | estado | os 700 ms depois do sexto dígito | validando · campo desligado · anel e "Entrando" abaixo do campo | `06-estado-validando` |
| T02-07 | estado | digitar o código certo, e o servidor nega o acesso | cadastro ainda não liberado · o contato do RH, do cadastro · Voltar leva ao Entrar | `07-estado-acesso-nao-liberado` |
