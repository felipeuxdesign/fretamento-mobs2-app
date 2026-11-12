# O desempenho do vidro

O tempo de cada quadro em três movimentos, no palco (1440 × 1024), com a CPU limitada em 4×, com o vidro ligado e com ele desligado. O que se mede é o intervalo entre os quadros que a página consegue pedir: ele acusa engasgo da linha principal (código, layout, estilo), e não o custo de compor o desfoque, que no celular é da placa de vídeo. Serve para comparar o vidro com o sólido e para saber que o vidro não trava a página; se o desfoque pesa no aparelho, só o aparelho diz.

| movimento | material | quadros | mediana | 95 % abaixo de | quadros acima de 50 ms |
| --- | --- | --- | --- | --- | --- |
| arrastar o painel do mapa | sólido | 111 | 16,7 ms | 16,7 ms | 0 |
| arrastar o painel do mapa | vidro | 113 | 16,7 ms | 16,7 ms | 0 |
| o dia andando no Mapa | sólido | 205 | 16,7 ms | 16,8 ms | 0 |
| o dia andando no Mapa | vidro | 420 | 16,7 ms | 16,8 ms | 0 |
| rolar o Início | sólido | 179 | 16,7 ms | 16,7 ms | 0 |
| rolar o Início | vidro | 179 | 16,7 ms | 16,8 ms | 0 |

Para refazer: `node conferencias/desempenho-do-vidro.mjs`, a partir de `06-prototipo/app`.
