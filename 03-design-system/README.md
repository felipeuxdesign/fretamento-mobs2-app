# O design system

| o quê | onde |
| --- | --- |
| os tokens, nos dois temas | `tokens.json` (a fonte) e `tokens.css` (gerado dele, nunca editado à mão) |
| as leis | `leis.md` |
| as peças | `componentes.md` |
| o movimento | `movimento.md` |
| os ícones | `icones.md` e `icones.json`; os SVG estão em `05-recursos/icones/` |
| o vidro (Liquid Glass) | `vidro/`, inteira |
| as folhas | `folhas/` |

## As folhas

- **As folhas desenhadas** (`folhas/html/`, `folhas/png/` e `folhas/texto/`), da F01 à F11: o desenho original, com superfícies sólidas. São a norma do app com `?vidro=0`.
- **As folhas de vidro** (`folhas/vidro/`), tiradas do protótipo com as peças, as cores e os tokens de hoje: a F01 (os fundamentos, dos tokens, uma por tema, com o fundo de luz e os três níveis de vidro), da F02 à F07 (as peças, de vidro, nos dois temas lado a lado) e a F10 (a marca, por tamanho). Saem de novo com `node conferencias/folhas.mjs`, em `06-prototipo/app`.
- A F08 (contraste), a F09 (movimento) e a F11 (o palco) existem só desenhadas. O contraste de hoje é medido pelas conferências, e o palco está fotografado em `06-prototipo/fotos/palco/`.

## Os números

47 cores, 9 estilos de texto, 9 espaços, 5 raios, 5 medidas e 2 sombras · 64 ícones · 17 peças de vidro.
