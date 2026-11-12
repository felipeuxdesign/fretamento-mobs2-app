# T02 · Digite o código

Telas do app · T02 · Autenticação

Seis dígitos e o caminho de volta sempre visível: reenviar, trocar o contato, pedir ajuda. A tela abre com o teclado aberto, o título fica logo abaixo do voltar, alinhado à esquerda, e o sexto dígito valida sozinho (digitado, colado ou sugerido pelo celular): não há botão de entrar. Enquanto valida, um anel e a palavra "Entrando" aparecem abaixo do campo. O erro fica no campo até ser resolvido e diz quantas tentativas restam. O campo de 6 dígitos é o elemento da tela, em 24/700 tabular com tracking de 0,5em, com o contador "Reenviar código em 0:45" logo abaixo do cartão do campo. A barra tem só o voltar, que volta para a T01 com o contato preservado; o teclado numérico do sistema sobe por cima e não há rodapé fixo. O campo é marcado como código de uso único: quando o código chega por SMS (ou por e-mail, nos celulares que leem o e-mail), o próprio teclado oferece o código acima das teclas e a pessoa toca uma vez em vez de digitar. No exemplo, o código foi enviado para a•••@metalurgicaalfa.com.br e o contador está em 0:45; o código de teste 123456 entra, 000000 expirou, e 5 erros bloqueiam por 15 min. Os momentos são digitar e os 60 s sem o código chegar. A ajuda daqui é o sheet genérico do Entrar, sem nome nem contato: antes de o código valer, o app não sabe de que empresa é a pessoa.

- Quadros: 3 (a tela e os momentos). Estados: 5.
- As referências estão em `referencias/html/` e `referencias/png/`, uma por linha do `estados.md`.
- Os textos exatos estão no `textos.md`; o movimento, no `animacao.md`.
