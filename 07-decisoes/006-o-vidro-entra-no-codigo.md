# 006 · O vidro entra no código, só no que flutua

10/11/2026

**O contexto.** O app adota o Liquid Glass, o material do iOS 26. Um estudo no canvas tentou redesenhar o app nas convenções do iOS com vidro, e foi descartado: a ferramenta de desenho não renderiza o vidro de verdade, e o estudo mudava a forma de quase todas as peças.

**A decisão.** O canvas segue o nosso design system, com superfícies sólidas. O vidro nasce no protótipo em código, pela biblioteca GlassyUI, em 13 peças: as que flutuam sobre a tela (barras, painel e controles do mapa, sheets, banner, rodapé, toast, o que o celular desenha) e dois controles (o switch e o segmentado). O conteúdo e o botão primário ficam sólidos. A forma é a da referência; só o material muda. O modo é o clear, nos dois temas. Tudo desliga: `?vidro=0` e uma linha por peça.

**O que foi descartado.** Vidro em tudo, que fere a lei da superfície sólida atrás de texto e derruba o contraste. Um vidro próprio, escrito do zero, que teria de ser mantido à mão. Seguir a biblioteca ao pé da letra, com o azul e as formas dela, que tiraria a cara do app.

**A consequência.** A norma do vidro é `03-design-system/vidro/`. A fidelidade com as referências é medida com o vidro desligado. A lente da borda só existe no Chrome e no Edge: no iPhone o vidro fica com o desfoque e o brilho, e precisa estar bonito assim. Se uma peça de vidro não convencer, ela volta ao sólido sem tocar no resto.

**Revista pela decisão 009.** Com o vidro ligado, as peças tomam a forma da biblioteca, e os botões, os campos e os selos passam a ser de vidro: 16 peças.
