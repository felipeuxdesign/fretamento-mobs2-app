# Acessibilidade e desempenho

## Contraste sobre o vidro

- Texto: **4,5:1** no pior ponto do fundo. Ícone de estado, borda e controle: **3:1**.
- O pior ponto não é o fundo liso. Meça com o que passa atrás de cada peça:

| peça | o pior fundo |
| --- | --- |
| barra do mapa, painel do mapa, grupo de controles, balão | o disco lima do ônibus e a rota roxa exatamente atrás do texto, no escuro; as ruas brancas, no claro |
| barra do topo (a borda de rolagem e as esferas) e banner | o herói em chegando (fundo-destaque) e o botão lima do Embarquei rolando por baixo |
| rodapé fixo | um cartão de perigo ou o botão lima passando atrás da legenda |
| sheets | o herói e o botão do rodapé da tela de trás (lima ou vermelho), bem atrás dos botões da folha, com o véu leve |
| conteúdo (cartões e listas) | o fundo de luz, no ponto mais claro dele no escuro e no mais escuro no claro. O conteúdo de vidro não mora sobre o mapa nem sobre outro conteúdo |
| segmentado | a página lisa e o cartão. Ele não flutua sobre conteúdo: o trilho é o vidro claro da biblioteca, e sobre o mapa ou sobre a rolagem o texto não passa |

- Se não passar, a ordem de correção é: escurecer ou clarear o fundo pelo filtro, depois firmar o preenchimento, depois aumentar o desfoque. Nunca mudar a cor do texto, nunca pôr sombra no texto.
- A tabela de contraste do sólido está na folha F08. As medidas do vidro entram na vitrine, ao lado de cada peça.

## Reduzir transparência

Liga de três jeitos: o ajuste do sistema (`prefers-reduced-transparency`), `?vidro=0` no endereço e a preferência da biblioteca. O resultado é um só: **cada peça fica sólida, nas nossas cores, igual à referência**, sem desfoque e sem lente. A biblioteca protege esse modo e não deixa uma classe trazer a transparência de volta; nesse modo quem desenha é a peça sólida do app, com os nossos tokens (`03-glassyui.md`, armadilha 5).

## Aumentar contraste e cores forçadas

Com `prefers-contrast: more`, o vidro fica quase opaco e as peças ganham contorno. Com cores forçadas (`forced-colors`), o vidro sai. Confira que nada some: as esferas da barra, o banner, a folha, os botões e os controles do mapa continuam com borda visível.

## Reduzir movimento

Com `prefers-reduced-motion`, o vidro para: nada de brilho que acompanha o dedo, nada de bolinha que cresce, nada de lente animada. O desfoque e os fios de luz ficam. É a mesma regra do resto do app (`../movimento.md`).

## Teclado e leitor de tela

- Tudo o que é tocável tem nome acessível. Os botões só com glifo (voltar, sino, perfil, os três do mapa) têm `aria-label`.
- O switch e o segmentado andam nas setas; o sheet prende o foco e fecha no Esc; o foco volta para quem abriu.
- O anel de foco é o do app e aparece só para teclado e leitor de tela.

## Os navegadores

| | Chrome e Edge | Safari (inclui o iPhone) | Firefox |
| --- | --- | --- | --- |
| desfoque, fio de luz, brilho | sim | sim | sim |
| lente da borda | sim | não: fica o desfoque | não: fica o desfoque |

- **O vidro tem que estar aprovado no Safari**, que é o navegador do iPhone. Fotografe a vitrine no Chromium e no WebKit e compare: no WebKit, sem a lente, a peça ainda precisa ter cara de vidro.
- No Safari, `backdrop-filter` precisa do prefixo `-webkit-`. Confira que o build mantém.
- Um elemento com `backdrop-filter` não desfoca o que está dentro de um ancestral que também cria contexto de composição do jeito errado (`overflow` com raio, `transform`, `filter`). A tela do aparelho tem canto arredondado e recorte: prove cedo que o desfoque funciona **dentro da moldura do aparelho**, no palco, e não só numa página solta.

## O peso do desfoque

Desfoque em cima de conteúdo que se mexe é a parte mais cara de pintar, e no celular isso aparece.

- **Poucas camadas que desfocam na tela ao mesmo tempo.** As grandes são poucas: no mapa, a cápsula do título, o grupo de controles e o painel, mais a esfera do voltar e, às vezes, o balão ou o botão do detalhe (cinco). As pequenas (um botão, um campo, uma esfera) desfocam só a própria área. Contado nas telas, sem o conteúdo: de 2 a 8 por tela. Com o conteúdo de vidro, cada cartão à vista soma um (são de 3 a 6 numa tela comum). Nenhum cartão tem lente.
- **Vidro nunca sobre vidro.** Uma superfície que desfoca não fica dentro de outra. A exceção são os botões dentro da folha e do painel do mapa. O selo, que mora no conteúdo, não desfoca.
- **O mapa embaixo do vidro é um desenho em SVG que desliza.** Mova o mapa com `transform`, numa camada só, para o navegador não repintar o desfoque inteiro a cada quadro.
- **A lente da borda só nas peças pequenas e na folha.** O painel do mapa não tem lente: com o mapa andando por baixo e a altura mudando no arrasto, ela derrubava o quadro para 33 a 50 ms com a CPU em 4×.
- **A qualidade cai sozinha em aparelho fraco**: a biblioteca detecta e reduz (`quality`). Não force `high` fora da vitrine.
- **O que medir:** rolar o Início com a barra de vidro, arrastar o painel do mapa e deixar o dia andar no Mapa, no celular de verdade se houver um, ou com a CPU limitada em 4× no navegador. Se engasgar, a ordem é: desligar a lente da peça grande, baixar o desfoque dela, e por último deixar a peça sólida enquanto o gesto acontece.
