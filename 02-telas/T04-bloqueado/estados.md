# T04 · Bloqueado · quadros e estados

## Os quadros desta tela · 2

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T04-00 | tela | ao abrir o app com o desbloqueio ligado | pede a confirmação; reconhecida, vai para a T05 | `00-tela` |
| T04-01 | momento | tocar "Desbloquear" (ou sozinho, 300 ms depois de abrir) | o celular pede o Face ID | `01-momento-o-celular-pede-a-digital` |

## Os estados desta tela · 5

O que o celular, o tempo ou a empresa decidem. Os dois primeiros ficam na tela; os três últimos mandam embora. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T04-02 | estado | a digital não foi reconhecida ou a pessoa cancelou | erro no lugar; tentar de novo ou usar a senha do celular | `02-estado-nao-reconhecido` |
| T04-03 | estado | o celular travou o Face ID depois de várias tentativas | só a senha do celular; o Face ID volta em 30 s | `03-estado-biometria-travada-pelo-celular` |
| T04-04 | estado | a digital ou o rosto cadastrado no celular mudou desde o último acesso | por segurança, pede o código de novo → T02 → Início com o sheet para religar o desbloqueio (T05-30) | `04-estado-a-biometria-do-celular-mudou` |
| T04-05 | estado | 30 dias sem abrir o app | sessão expirada; pede o código de novo → T02 | `05-estado-sessao-expirada` |
| T04-06 | estado | ao abrir o app, o servidor responde que a empresa ou a transportadora encerrou o cadastro | estado central · o contato do RH · Entendi leva ao Entrar e encerra a sessão | `06-estado-acesso-encerrado-pela-empresa` |
