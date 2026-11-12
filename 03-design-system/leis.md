# As leis do design system

As leis desempatam decisão. Quando uma tela e uma lei discordam, a tela está errada.

## As oito leis

1. **Lima é vivo.** O lima (`vivo`) só aparece quando algo está vivo: o botão primário, o pulso do dado ao vivo, o ônibus, o link. No claro, o papel do lima é do roxo da marca. Com o vidro ligado, o acento fica em quatro lugares (o botão principal, o ponto "ao vivo", o nó do ônibus e a posição atual no mapa) e o link é texto primário sublinhado (`07-decisoes/011`).
2. **Um acento por tela.** Um botão primário por tela.
3. **Estado tem forma antes de cor.** Todo estado tem ícone e palavra. A cor só confirma, e nunca é o único sinal.
4. **O número é tabular.** Todo número usa `font-variant-numeric: tabular-nums`.
5. **Superfície firme atrás de texto.** O texto de conteúdo mora numa superfície que o segura a 4,5:1, medida na tela: sólida, ou de vidro com o tom firme do cartão sobre o fundo de luz (`vidro/`). Vidro claro, que deixa o texto à mercê do que passa atrás, nunca leva texto de conteúdo.
6. **Elevação por superfície, sem sombra.** No escuro, o que está acima é mais claro. A sombra volta só no claro, nos cartões.
7. **Erro fica no lugar da ação.** O erro aparece onde a pessoa tocou, fica até ser resolvido e diz o que fazer. O toast nunca carrega erro.
8. **Hora relativa primeiro.** "8 min", e o horário ao lado ("às 06:42").

## As leis do claro

- O claro nunca é o escuro invertido: neutro frio com um fio de violeta, cartões brancos com `sombra-cartao`.
- O lima do escuro vira o roxo da marca, com texto branco no botão.
- Âmbar nunca é texto sobre a página: no claro ele é ícone e borda, e o selo de atraso vai em `atencao-suave` com `tinta`.
- No claro, `perigo` é texto só sobre a página e o cartão, e `info` só sobre o cartão. `rota-ida` é traço de 2 px, nunca texto.
- O botão secundário tem fill e borda próprios, nos dois temas.
- As transparências sobem de opacidade só no claro.
- Testar no sol, não só na tela.

## As leis de cor

- **Cada peça usa o token do seu papel**, nunca a cor de outra peça, mesmo que no escuro o valor seja igual. O avatar usa `avatar-fundo`, não `fundo-destaque`.
- **Nenhuma cor fora dos tokens** no código do app. As exceções são o que o celular desenha (teclado, alerta, push, tela de bloqueio), que usam os tokens `teclado-*` e `sistema-azul` e as cores do sistema, dentro de `app/src/sistema/`.
- **O contraste vale nos dois temas**: texto 4,5:1, estado, borda e ícone 3:1. A tabela está na F08. Cor nova só entra se passar ali.
- **A marca "mobs2" e o logo são pintados por token** (`tinta-apagada` na assinatura, `logo` no logo), com o SVG em linha e `currentColor`. O arquivo `05-recursos/marca/mobs2.svg` tem a cor do escuro gravada: no app, ele entra em linha.

## As leis de acabamento

- A última linha de uma lista não tem divisória: quem fecha é o cartão.
- Toque mínimo de 44, crescendo só para o lado livre.
- Nada de hover: só pressionado e desligado.
- Corpo em 15, e tudo escala com a fonte do sistema até 200% sem cortar o herói.
- O espaço entre a hora e o "h", entre "Av." e o nome e entre o número e a unidade não quebra (`&nbsp;`), como nas referências.
- O estado central fica no centro óptico: o respiro de baixo é 1 px maior que o de cima quando a conta não fecha.
- O teclado nunca esconde o campo nem o botão.
- **Capa centraliza, tarefa alinha à esquerda.** Capa são o Entrar (T01) e o Bloqueado (T04): centralizadas. Tarefa são o Código (T02), o Preparar o app (T03) e da T06 em diante: alinhadas à esquerda, com o título logo abaixo do cabeçalho.
- **A cor da marca não é acento de tela.** O lima ou o roxo do pictograma é cor de marca: a regra do acento em quatro lugares não vale para ele. Ele usa o mesmo token do botão principal.
- **Vidro por nível.** Vidro de fundo, vidro flutuante e vidro de controle: nenhum desfoque dentro de outro desfoque (`vidro/01-onde-entra.md`).
