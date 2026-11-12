# O vidro (Liquid Glass)

O Liquid Glass é a parte mais visível deste app, e precisa estar bem feito. Leia esta pasta inteira antes de escrever a primeira linha de vidro.

## O que você precisa saber antes de tudo

1. **As referências não têm vidro.** Os 145 quadros de `02-telas/` e as folhas do design system foram desenhados com superfícies sólidas, porque o canvas de desenho não consegue renderizar o vidro de verdade (desfoque do que está atrás, borda que refrata, brilho). Isso não é uma decisão de produto: é um limite da ferramenta de desenho. **No código o vidro é possível, e é no código que ele nasce.**
2. **Por isso esta pasta é a norma do vidro.** Onde entra, onde não entra, com que material, em que peça, com que cuidado. A referência continua dizendo o texto, a posição e o que cada peça faz, e é a forma da peça quando o vidro está desligado. De vidro, a peça é o componente da biblioteca, na forma dela e no tamanho do app (`04-pecas.md`).
3. **A base é a biblioteca GlassyUI** (https://glassyui.com/). O vidro é o dela, à risca: os componentes vêm como ela desenha, e aqui se ajustam o tamanho e o respiro, e entram a tinta e as cores com significado do app. Nada é pintado por cima do vidro dela para "melhorar" uma peça.
4. **O vidro é "clear" nos dois temas**, o escuro e o claro. Tem que ter cara de vidro: dá para perceber o que está atrás, a borda pega luz, o topo tem brilho. Vidro leitoso, cinza ou opaco é erro.
5. **Tudo tem volta.** `?vidro=0` desliga o vidro inteiro e o app fica igual às referências. Cada peça também desliga sozinha, numa linha (`04-pecas.md`). Nada do vidro pode ser um caminho sem retorno.

## A ordem de leitura

| arquivo | o que responde |
| --- | --- |
| `01-onde-entra.md` | quais peças viram vidro, quais ficam sólidas e por quê |
| `02-material.md` | como é o vidro: as camadas, os três tamanhos, o claro e o escuro, o que pode melhorar |
| `03-glassyui.md` | a biblioteca: como instalar, o que usar dela, o que adaptar e as armadilhas |
| `04-pecas.md` | peça por peça: a forma que fica, o material que entra, o que tem atrás, os estados |
| `05-acessibilidade-e-desempenho.md` | contraste, reduzir transparência, reduzir movimento, Safari e iPhone, o peso do desfoque |
| `06-onde-em-cada-referencia.md` | a lista, referência por referência, das peças de vidro que aparecem em cada quadro |
| `07-vitrine.md` | a vitrine do vidro: onde cada peça é provada antes de entrar nas telas, e como julgar |
| `08-nao-fazer.md` | o que não fazer |

## A regra em uma frase

**Vidro no que flutua sobre a tela, nos controles e no conteúdo, que mora sobre um fundo de luz; o mapa e o trilho ficam sólidos; a peça de vidro é o componente da GlassyUI, na forma e nas cores de superfície dela, com o tamanho, a tinta e a cor de destaque do app; e tudo desliga.**
