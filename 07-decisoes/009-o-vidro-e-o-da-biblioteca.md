# 009 · O vidro é o da biblioteca, nas peças e nos controles

10/11/2026

**O contexto.** Com o vidro nas telas e o protótipo aberto no aparelho, a primeira versão (decisão 006) ficou tímida: o vidro era uma faixa atrás da barra e do rodapé, com um véu escuro no topo, e os botões, que são o que a pessoa mais toca, continuavam sólidos. O material estava lá, mas a tela não parecia de vidro. E a folha da biblioteca, mais redonda e solta das bordas, era mais bonita que a nossa adaptação.

**A decisão.** O vidro passa a ser o da GlassyUI, à risca: os componentes dela, na forma e nas cores de superfície que ela propõe. Do app entram o tamanho, o respiro, a tinta e as cores que têm significado (o `vivo`, o `perigo-forte`, o roxo do avatar, a cor de cada selo). São 16 peças:

- a barra e o rodapé deixam de ser faixas: o conteúdo rola por baixo, com uma borda de rolagem que desfoca e some na cor da página;
- os botões da barra viram esferas de vidro de 44, e o perfil, o avatar da biblioteca;
- a folha (sheet) é a `GlassSheet` como ela é, só encaixada na tela do aparelho; o painel do mapa usa a mesma placa, solto das bordas;
- os botões, os campos e os selos são os da biblioteca. O botão principal é o vidro tingido dela, **um só em todo o app**, na cor exata do `vivo`, medida na tela;
- o segmentado e o switch são os da biblioteca, com as cores dela; o botão carregando leva o anel de espera dela.

A regra do que é vidro segue a do iOS 26: o vidro é da camada que flutua e dos controles; o conteúdo (o herói, os cartões, as listas, o trilho, o mapa) fica sólido.

**O que foi descartado.** Pintar um degradê por cima do botão para ele "parecer vidro": o vidro é o da biblioteca, e nada é desenhado por cima. Deixar a cor do botão principal variar com o que passa atrás: a cor é a do token. Dois botões principais, um para a página e outro para dentro da folha: é um só. Vidro na placa do "Confira o ônibus" e no herói: é conteúdo.

**A consequência.** A decisão 006 continua valendo no que não mudou: o vidro nasce no código, tudo desliga (`?vidro=0` e uma linha por peça), e a fidelidade é medida com o vidro desligado, que deixa cada peça igual ao quadro. Muda o que ela dizia sobre a forma (era a da referência; agora, com o vidro ligado, é a da biblioteca) e sobre o botão primário (era sólido). A norma é `03-design-system/vidro/`.
