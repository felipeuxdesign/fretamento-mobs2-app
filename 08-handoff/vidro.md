# O vidro, para quem vai construir

O que o protótipo faz com o vidro, onde está cada coisa, o que é do protótipo e o que é do produto, e as armadilhas do vidro. A norma completa é `03-design-system/vidro/`; isto é o mapa para chegar nela.

## Em uma página

- O vidro é o Liquid Glass da biblioteca **GlassyUI** (https://glassyui.com/, licença MIT), copiada para `06-prototipo/app/src/components/glassyui/`. O que mudou no código copiado está em `MODIFICACOES.md`, na mesma pasta.
- São **17 peças de vidro**, cada uma com uma linha em `06-prototipo/app/src/ds/vidro/vidro.config.ts`. `false` numa linha devolve aquela peça ao sólido, que é igual à referência.
- Três camadas levam vidro: o que **flutua** (esferas da barra, folhas, painel do mapa, avisos), os **controles** (botões, campos, abas, interruptor, selos) e o **conteúdo** (cartões e listas), que mora sobre um **fundo de luz**.
- **Vidro por nível, sem vidro dentro de vidro:** o de fundo e o flutuante têm desfoque; o controle que mora dentro de outro vidro não tem (preenchimento translúcido, borda e fio de luz). A conferência `vidro-em-vidro` cobra zero.
- O mapa e o trilho de paradas ficam sólidos.
- **Tudo desliga:** `?vidro=0` no endereço, a linha da peça, ou a "reduzir transparência" do sistema.

## Como ver

A partir de `06-prototipo/app`: `npm install` e `npm run dev`. Depois:

| endereço | o que mostra |
| --- | --- |
| `/` | o app, do Entrar em diante, com o vidro ligado |
| `/?vidro=0` | o app sólido, igual às referências |
| `/?sem-vidro=conteudo` | o vidro só no que flutua e nos controles, com o conteúdo sólido |
| `/?vitrine=vidro` | cada peça de vidro isolada, a sólida ao lado da de vidro |
| `/?ref=T07-00&tema=claro` | qualquer referência, parada, no tema escolhido |
| `/?lente=0` | o vidro sem a lente da borda, como o Safari e o iPhone desenham |
| `/?marca=l1`, `l2`, `l3`, com `&cor=invertida` | os três arranjos da marca no Entrar, e as duas cores trocadas |
| `/?vitrine=marca` | a marca no quadro de vidro, de 29 a 180, nos dois temas |
| `/?ref=T05-00&receita=android` | o vidro como o Android consegue fazer: cartões translúcidos sem desfoque, desfoque só no que flutua |
| `/?ref=T05-00&fundo=anterior` | o fundo de luz de antes (roxo, magenta e lima), no lugar do padrão (roxo da marca, magenta e índigo). Combina com qualquer referência e tema |

As fotos de todas as telas, com o vidro ligado, estão em `06-prototipo/fotos/escuro/` e `06-prototipo/fotos/claro/`, uma por referência. `06-prototipo/fotos/vidro/` tem a vitrine e as telas principais no Chromium e no WebKit.

## Onde está cada coisa

| o quê | onde |
| --- | --- |
| a norma: onde entra, o material, peça por peça, o que não fazer | `03-design-system/vidro/` |
| por que é assim | `07-decisoes/006`, `009`, `010`, `013` e `014` |
| o interruptor de cada peça | `app/src/ds/vidro/vidro.config.ts` |
| toda a ótica e todas as variáveis `--lg-*` | `app/src/ds/vidro/vidro.css` (o único arquivo que mexe nisso) |
| o material das peças que flutuam | `app/src/ds/vidro/Material.tsx` |
| o material do conteúdo | `app/src/ds/vidro/Conteudo.tsx` |
| quem decide se uma peça é vidro agora | `app/src/ds/vidro/usarVidro.ts` |
| o tema do app passado para a biblioteca | `app/src/ds/vidro/PonteDoVidro.tsx` |
| as conferências que medem o vidro | `app/conferencias/` (`vidro`, `vidro-nas-telas`, `contraste-do-vidro`, `vidro-na-moldura`, `vidro-em-vidro`, `claro`, `desempenho-do-vidro`); o dado e o percurso, em `relogio` e `roteiro` |

## Peça por peça

| peça | componente da biblioteca | arquivo do app |
| --- | --- | --- |
| barra do topo e rodapé | nenhum: são bordas de rolagem (desfoque que some na cor da página) | `ds/barra/Topo.tsx`, `ds/rodape/Rodape.tsx` |
| botões da barra e o perfil | `GlassButton` redondo | `ds/barra/Barra.tsx` |
| título sobre o mapa | `GlassPanel` em pílula | `ds/barra/Barra.tsx` |
| controles e balão do mapa | `GlassPanel` | `ds/mapa/PecasDoMapa.tsx` |
| painel do mapa | `GlassPanel` com os números da folha | `ds/mapa/PecasDoMapa.tsx` |
| folha (sheet) | `GlassSheet` | `ds/sheet/Sheet.tsx` |
| banner e toast | `GlassSurface` | `ds/banner/`, `ds/toast/` |
| botões e chips | `GlassButton`, `GlassSpinner` | `ds/botao/Botao.tsx`, `ds/escolha/Escolha.tsx` |
| campos | `GlassInput`, `GlassTextarea` | `ds/campo/Campo.tsx` |
| selos | `GlassBadge` | `ds/selo/Selo.tsx` |
| interruptor | `GlassSwitch` | `ds/switch/Switch.tsx` |
| abas | `GlassSegmentedControl` | `ds/segmentado/Segmentado.tsx` |
| avatar | `GlassAvatar` | `ds/avatar/Avatar.tsx` |
| cartões e listas | `GlassPanel` em cartão | `ds/vidro/Conteudo.tsx`, usado por `ds/cartao/` e `ds/lista/` |

Cada peça é **um componente só**, que sabe desenhar o sólido e o vidro. Nenhuma tela tem um `if` de vidro.

## As regras que seguram o resultado

1. **A cor do botão principal é a do token, medida na tela.** O botão é o vidro tingido da biblioteca: ele pinta o que passa atrás com uma cadeia de filtros (`--lg-prominent-tint`). A receita foi ajustada até o miolo do botão medir o `vivo` (170, 240, 1 no escuro; 80, 6, 130 no claro). Se o token mudar, a receita se mede de novo.
2. **Um botão principal só.** Dentro de uma folha ou de um cartão de vidro, a placa separa o botão da página e ele sairia mais escuro. Ali a luz debaixo dele fica cheia e a lente é a dele. A cor é a mesma em todo lugar.
3. **Texto sobre vidro a 4,5:1, medido.** `vidro-nas-telas` mede cada texto de cada peça contra o que passa atrás dela, nas 145 referências, nos dois temas. `claro` e `escuro` medem todo texto da tela.
4. **O conteúdo de vidro tem tom firme.** O painel dos cartões leva o tom do cartão na camada fosca. Com o vidro claro de fábrica, o texto de apoio caía para 3:1.
5. **O fundo de luz tem teto de brilho.** O texto de apoio também mora direto sobre o fundo, fora dos cartões. No escuro, os pontos de luz não podem ser mais claros do que o texto aguenta; no claro, não podem ser mais escuros.
6. **Os traços sobre o vidro são a tinta translúcida.** Divisória e borda em cor sólida somem sobre o vidro.
7. **O acento fica em quatro lugares**: o botão principal, o ponto "ao vivo", o nó do ônibus e a posição atual no mapa. O resto é neutro, para o vidro aparecer.
8. **O claro não é o escuro invertido.** No escuro o vidro aparece pela luz que passa; no claro, pela borda, pelo brilho e pela sombra, sobre uma página quase branca.

## As armadilhas do vidro

- **Variável de token redefinida dentro de uma camada de CSS não vale.** Os tokens são declarados fora de camada (`tokens.css`), no mesmo elemento da tela. Uma regra de `@layer` nunca ganha deles, por mais específica que seja. As redefinições de token (as cores do mapa, a página do claro) ficam no fim do `vidro.css`, fora da camada. Confira o valor computado, não a regra.
- **A lente da borda é cara em superfície grande que se mexe.** No painel do mapa ela derrubava o quadro para 50 ms com a CPU em 4×; no herói, para 33 ms na rolagem. Ela fica nas peças pequenas e na folha. Desligá-la só durante o movimento faz o vidro mudar de aparência: não faça.
- **A lente só existe no Chromium.** No Safari e no iPhone o vidro fica com o desfoque, o fio de luz e o brilho. O vidro tem que estar bom sem ela (`?lente=0`).
- **O filho de uma superfície de vidro precisa ficar acima da camada fosca.** A biblioteca sobe os filhos diretos (`z-index: 2`). Um agrupador sem caixa (`display: contents`) entre a superfície e o conteúdo deixa o conteúdo atrás do vidro, apagado.
- **A folha da biblioteca nasce no fim da página.** Ela ganhou a propriedade `container`, para abrir dentro da tela do aparelho.
- **Um vidro que muda de forma ou de cor a cada estado parece outra peça.** O herói é o mesmo vidro em todos os estados; quem diz o estado é o que está dentro.
- **O desfoque dentro de um ancestral com canto arredondado, recorte ou transformação** pode não funcionar. `vidro-na-moldura` prova que funciona dentro da moldura do aparelho.

## O que é do protótipo e o que é do produto

A tradução da receita para o iOS e para o Android, com os números e o código de partida, está em `vidro-por-plataforma.md`. A tabela abaixo é o resumo.

| no protótipo | no produto |
| --- | --- |
| o vidro é CSS e SVG de uma biblioteca web | no iOS 26, o Liquid Glass é do sistema: use os componentes nativos com o material do sistema. Em outras plataformas, o material equivalente |
| a receita de filtros do botão principal | a cor de ação do sistema, com o `vivo` |
| o fundo de luz é um degradê em CSS, com grão em SVG, e as cores, opacidades e lugares dos pontos em variáveis (`--blob-*`) | uma imagem ou um desenho nativo com as mesmas cores e a mesma posição |
| a lente da borda, só no Chromium | a refração do sistema, onde existir |
| `?vidro=0` e `vidro.config.ts` | a "reduzir transparência" do sistema; a chave por peça é opcional |
| as medidas de contraste rodam nas referências do protótipo | o mesmo critério (4,5:1 medido), nas telas do produto |

O que **não** se copia: os números de desfoque, as cadeias de filtro e as camadas da biblioteca. O que se leva: quais peças são vidro, a ordem das camadas, as cores, os tamanhos, o comportamento e as oito regras acima.

## Antes de mexer no vidro

`npm run conferir`, a partir de `06-prototipo/app`, roda todas as conferências. As do vidro também rodam sozinhas. Mexeu numa peça de vidro: rode `vidro`, `vidro-nas-telas`, `contraste-do-vidro`, `claro` (com `--tema=escuro` também) e `desempenho-do-vidro`, e refaça as fotos (`fotos-vidro`, `fotos-vidro-telas` e `claro` nos dois temas).
