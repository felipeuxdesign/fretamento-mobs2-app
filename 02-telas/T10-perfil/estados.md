# T10 · Perfil · quadros e estados

## Os quadros desta tela · 4

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T10-00 | tela | tocar o avatar no Início | cabeçalho · Minha conta · Minhas linhas · Ajustes | `00-tela` |
| T10-01 | momento | tocar "Preciso de ajuda" em Ajustes; também abre pelo Início e pela viagem cancelada | dois cartões de contato com horário · perguntas de todo dia | `01-momento-preciso-de-ajuda-rh-e-transportadora` |
| T10-02 | momento | rolar até o fim e tocar "Sair da conta" | sheet de confirmação com o botão destrutivo | `02-momento-sair-da-conta` |
| T10-03 | momento | rolar até o fim | Aparência, Preciso de ajuda, Sair e Excluir ativos · por mobs2 | `03-momento-rolada-ate-o-fim-aparencia-ajuda-sair-e-excluir` |

## Os estados desta tela · 2

O que a rede e o cadastro decidem: sem internet, sair e excluir esperam; sem o contato da transportadora no cadastro, o Preciso de ajuda mostra só o RH e as respostas apontam para ele. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T10-04 | estado | o celular perdeu a conexão | banner · Sair e Excluir desligados | `04-estado-sem-internet` |
| T10-05 | estado | a empresa não cadastrou o contato da transportadora | só o cartão do RH · as respostas apontam para o RH | `05-estado-preciso-de-ajuda-sem-transportadora-no-cadastro` |
