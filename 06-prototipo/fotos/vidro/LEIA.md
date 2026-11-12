# As fotos do vidro

A vitrine do vidro (`?vitrine=vidro`), fotografada inteira. O nome do arquivo diz o que é: navegador, tema e modo.

| modo | o que mostra |
| --- | --- |
| `vidro` | o vidro ligado. No Chromium, com a lente da borda nas peças pequenas |
| `vidro-sem-lente` | o vidro sem a lente (`?lente=0`), como o Safari e o iPhone desenham |
| `solido` | `?vidro=0`: cada peça sólida, igual à referência |
| `reduzir-transparencia` | a "reduzir transparência" ligada: o mesmo sólido |

**Atenção às fotos `vitrine-webkit-*`.** O WebKit do Playwright não desenha `backdrop-filter` nas fotos: elas mostram a forma, o preenchimento, o fio de luz e o brilho de cada peça, mas não o desfoque do que está atrás. No Safari de verdade o desfoque existe. Para julgar o vidro sem a lente, use `vitrine-chromium-*-vidro-sem-lente.png`, e confira no iPhone.

## As telas de vitrine do vidro, em `telas/`

As quinze telas da lista de `03-design-system/vidro/07-vitrine.md`, com o vidro ligado, no escuro e no claro, no Chromium e no WebKit. O nome do arquivo é a referência, o tema e o navegador (`T07-05-claro-chromium.png`); a T05-00 é a foto da tela rolada até o meio, com o herói passando por baixo da barra.

Vale o mesmo aviso das fotos do WebKit: elas não mostram o desfoque. O que julga o vidro nas telas são as do Chromium, e o iPhone.

Junto das fotos fica `desempenho.md`: o intervalo entre os quadros em três movimentos (rolar o Início, arrastar o painel do mapa, o dia andando no Mapa), com a CPU limitada em 4×, com o vidro e sem ele.

Para refazer, a partir de `06-prototipo/app`: a vitrine, com `node conferencias/fotos-vidro.mjs`; as telas, com `node conferencias/fotos-vidro-telas.mjs`; o desempenho, com `node conferencias/desempenho-do-vidro.mjs`.
