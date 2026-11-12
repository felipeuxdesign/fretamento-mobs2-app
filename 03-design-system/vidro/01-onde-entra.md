# Onde entra o vidro

O vidro mora em três camadas: a que **flutua sobre o conteúdo** (os botões da barra, os painéis, as folhas, os avisos), os **controles** (o que a pessoa toca, segura e arrasta) e o **conteúdo** (os cartões e as listas), que fica sobre um **fundo de luz** parado atrás de tudo. O mapa e o trilho ficam sólidos.

A regra do iOS 26 diz que o vidro é só da camada que flutua. Este app escolheu ir além (`07-decisoes/010-o-conteudo-tambem-e-de-vidro.md`), com três cuidados para o vidro não pesar: o fundo de luz é discreto e de uma família de cor só, o vidro do conteúdo tem tom firme, e o texto é medido na tela.

O vidro é o da biblioteca (a GlassyUI), à risca: os componentes vêm iguais, com a forma arredondada e as cores de superfície que ela propõe. Aqui só se ajustam o tamanho e o respiro, e entram a tinta do app e as cores que têm significado (o `vivo`, o `perigo-forte`, o roxo do avatar, a cor de cada selo).

## A lista: o que é vidro, e por quê

Três perguntas decidem se uma peça é vidro que flutua ou de controle. Se a resposta for não para as três, ela é conteúdo: vidro de fundo, com o tom firme do cartão, sobre o fundo de luz (peça 17).

1. **Ela flutua sobre outra coisa?** (uma barra sobre a rolagem, um painel sobre o mapa, uma folha sobre a tela)
2. **A pessoa age nela?** (toca, digita, liga, arrasta)
3. **Ela guia a pessoa pela tela?** (voltar, fechar, o perfil)

| # | peça | classe na referência | onde aparece | na GlassyUI | o que muda |
| --- | --- | --- | --- | --- | --- |
| 1 | Barra do topo | `.tb` | T02, T03, T05, T06 e T08 a T13 | sem componente: a barra deixa de ser uma faixa | o conteúdo rola por baixo, com a **borda de rolagem**: um desfoque que some na cor da página, sem linha e sem véu escuro. A mesma borda aparece no pé das telas sem rodapé, enquanto há conteúdo abaixo. Na home, a saudação cresce e vira o título da tela |
| 2 | Botões da barra: voltar, sino, perfil | `.ib` dentro da `.tb` | as mesmas da barra | `GlassButton` redondo e `GlassAvatar` | a **esfera de vidro** de 44, com o glifo em cima. O contador do sino fica por fora da esfera. O perfil é a mesma esfera, com as duas iniciais do nome na `tinta` |
| 3 | Barra flutuante do mapa | `.mtop` | T07 | `GlassButton` e `GlassPanel` | sobre o mapa, o voltar numa esfera e o título numa **cápsula** de vidro, da mesma altura |
| 4 | Grupo de controles do mapa (ônibus, pessoa, mira) | `.mgrp` | T07 | `GlassPanel` | só o material. As divisórias viram `vidro-separador` |
| 5 | Balão do ônibus | `.callout` | T07-10 | `GlassPanel` | só o material |
| 6 | Painel do mapa (três alturas, não fecha) | `.msheet` | T07 | a placa do `GlassSheet`, num `GlassPanel` | a mesma folha da biblioteca, solta das bordas, com o canto de 40 e a alça dela, acima do indicador de início. As três alturas e o não fechar são nossos |
| 7 | Sheets: confirmação, pré-permissão, detalhe de parada, aviso completo, ajuda, sair | `.sheet` com `.scrim` | T01, T05, T06, T08, T09, T10, T12, T13 | **`GlassSheet`, como ela é** | a folha da biblioteca: solta das bordas, com o canto de 40, a lente na borda, a alça com mola e o X. Só é encaixada dentro da tela do aparelho. O véu fica mais leve |
| 8 | Banner fixo de aviso, com a pilha de até dois | `.bf` | T01, T05 a T13 | `GlassSurface` | flutua logo abaixo da barra, solto das bordas, com o canto redondo. O ícone e o tom dizem o nível |
| 9 | Rodapé fixo com o botão | `.ft` | T03, T08, T12, T13 | sem componente: o rodapé deixa de ser uma faixa | o botão flutua sobre o fim da rolagem, e a borda de rolagem segura a legenda |
| 10 | Toast | folha F02 | depois de confirmar uma troca, um embarque, um pedido | o nosso toast com a `GlassSurface` | o material, em pílula, embaixo, dentro do aparelho |
| 11 | O que o celular desenha: alerta, folha da biometria | `.sys`, `.sysb` | T03, T04, T12 | `GlassSurface` | só o material. As cores continuam as do sistema (`sistema-azul`), não as do app |
| 12 | Switch | `.sw` | T03, T11, T12 | `GlassSwitch` | como a biblioteca desenha, nas nossas medidas; a bolinha vira vidro debaixo do dedo. Ligado é `vivo` |
| 13 | Segmentado (E-mail ou Celular, Aparência) | `.seg` | T01, T10 | `GlassSegmentedControl` | como a biblioteca desenha: o trilho de vidro em cápsula e a gota que desliza, com as cores dela. Só mora na página lisa e dentro de cartão |
| 14 | Botões: primário, secundário, destrutivo e o chip solto | `.btn`, `button.chip` | todas | **`GlassButton`** | a cápsula da biblioteca, com 48 de altura. O primário é o vidro tingido de `vivo` (lima no escuro, roxo no claro), **um só**: igual no Início, na folha e no mapa; o destrutivo, de `perigo-forte`; o secundário e o chip, vidro claro |
| 15 | Campos: texto, código e área de texto | `.inp`, `.otp`, `.ta` | T01, T02, T12 | **`GlassInput`** e **`GlassTextarea`** | o campo da biblioteca, com o canto e as cores que ela propõe, nas nossas medidas |
| 16 | Selos de confiança e de pontualidade | `.selo` | T05, T07 | **`GlassBadge`** | a pílula da biblioteca, com o fio de luz na borda. A cor de cada estado continua a nossa, e o selo não desfoca nada |
| 17 | Conteúdo: o cartão (o herói, os de lista, o de perigo), o cartão que se toca, a lista, o cartão de contato, o de quem resolve, a opção com switch | `.card`, `.cint`, `.list`, `.ccard`, `.hcard`, `.opt` | todas, menos o mapa | **`GlassPanel`**, em cartão | o painel da biblioteca, com o raio e o respiro do nosso cartão e o tom do cartão na camada fosca (60 % no escuro, 64 % no claro). Sem a lente da borda. Mora sobre o fundo de luz |

## Os três níveis

O vidro só pega cor do que passa **por trás** dele. Vidro dentro de vidro não pega cor nova (o que está atrás já foi desfocado): só pesa e embaça. Toda peça translúcida cai num destes três níveis.

| nível | onde | como |
| --- | --- | --- |
| **vidro de fundo** | os cartões e as listas de primeiro nível, o quadro da marca no Entrar | desfoque de verdade, com o tom do cartão |
| **vidro flutuante** | o que fica por cima de conteúdo que se mexe. No mapa: o voltar, o título em cápsula, os controles e o painel. Nas listas: as bordas de rolagem | desfoque de 30, saturação de 180 %, fio de luz marcado em cima e borda de 1 px |
| **vidro de controle** | qualquer controle **dentro** de outro vidro: os botões e os chips, o trilho e o indicador das abas, o campo | **sem** desfoque: preenchimento branco translúcido (8 % no escuro, 50 % no claro), borda de 1 px e fio de luz em cima. Ele herda a cor que o vidro de baixo já pegou |

- **O botão principal dentro de outro vidro** é o preenchimento do token, sem desfoque, como a biblioteca faz quando o vidro sai. A cor é a mesma do botão que fica sobre o fundo de luz.
- **O indicador das abas é sempre controle**: ele mora dentro do trilho.
- **As bordas de rolagem levam o desfoque de 30 sem a saturação.** Com a saturação, 5 % dos quadros da rolagem do Início passavam de 16 para 33 ms; sem ela, a rolagem voltou a 16,7 ms. A faixa é estreita, e a saturação quase não aparecia.
- **Nas outras telas, o voltar e o sino continuam neutros no escuro** (o vidro de controle da barra não pega a cor da luz do fundo). O vidro flutuante forte vale sobre o mapa, que é onde o conteúdo passa por baixo.
- **No Android, o vidro de fundo fica sem desfoque** (`?receita=android`): translúcido, com a borda e a sombra, sobre o fundo de luz. O desfoque fica só no vidro flutuante. A receita, com os números, está em `08-handoff/vidro-por-plataforma.md`.
- **A conferência `vidro-em-vidro`** lista todo elemento com desfoque que tenha um ancestral com desfoque, nas 145 referências e nos dois temas. O resultado tem de ser zero.

## O acento, com o vidro ligado

O acento (lima no escuro, roxo no claro) fica em quatro lugares: o botão principal, o ponto "ao vivo", o nó do ônibus e a posição atual no mapa. O interruptor ligado também usa a cor de ação, e a escolha (o rádio, o chip e a linha escolhidos) a usa em tom leve. A linha do tempo, os chips de papel, os links e o ícone do "Confira o ônibus" ficam neutros.

## O fundo de luz

Vidro só é vidro se houver alguma coisa atrás. Com o conteúdo de vidro, a tela ganha um fundo de luz: manchas de cor suaves, paradas, atrás de tudo, que aparecem através dos cartões quando a tela rola.

- **Três cores, com o roxo mandando.** O roxo da marca, forte; um magenta; e um índigo, sobre uma base funda. No claro, lavanda, rosa e azul lavanda, bem claros. O lima não entra no fundo: ele só aparece quando algo está vivo.
- **Um grão fino por cima**, para o desfoque do vidro ter textura e o degradê não fazer faixas.
- **Três pontos de luz, de borda macia, em diagonal.** O roxo atrás da saudação e do herói, o magenta à direita, no meio, e o índigo embaixo, à esquerda. São as formas que passam por trás dos cartões quando a tela rola (o que o vidro desfoca e entorta). Nem degradê liso, nem faixa.
- **Pouco contraste.** No escuro, as manchas não passam da luminância em que o texto de apoio ainda lê (ele também mora direto sobre o fundo, fora dos cartões); no claro, não descem dela.
- **Parado.** Não se mexe sozinho. Quem se mexe é o conteúdo, por cima.
- **As cores dele são ótica do vidro** e moram em `vidro.css`, como as dos fios de luz. Não são tokens do design system. Lá dentro, o fundo é um conjunto de variáveis: de cada ponto, a cor, a opacidade, o lugar, o raio e o miolo (`--blob-1`, `--blob-2`, `--blob-3`), mais o lavado e a base. Trocar de fundo é trocar só esses valores.
- **O fundo de antes, `?fundo=anterior`:** roxo, magenta e um toque baixo de lima, com um lavado por cima. Foi o padrão até a 1.5 e fica guardado para dar volta. Vale em qualquer tela e estado.
- **O mapa não tem fundo de luz**: o mapa é o fundo.

## O que fica sólido, sempre

| peça | por quê |
| --- | --- |
| O mapa: terreno, ruas, rota, paradas, o disco do ônibus | é o fundo da tela do mapa. O vidro fica por cima dele, nunca nele. Com o conteúdo de vidro, as cores dele entram na família roxa do app (a água vira um violeta fundo), sem mudar os tokens |
| O trilho de paradas: as linhas e os marcadores | é desenho, não superfície. Ele mora dentro de um cartão de vidro |
| A placa do "Confira o ônibus", a nota, o esqueleto | viram poços translúcidos, **sem desfoque**: moram dentro de um cartão de vidro |
| Os poços de ícone | um vidro pequeno, com o preenchimento e a borda de controle da biblioteca, **sem desfoque**. O glifo vai na `tinta` |
| O cartão dentro do painel do mapa (a viagem cancelada) | o painel já é vidro: conteúdo de vidro dentro de peça que flutua não entra |
| Estado central (ícone de 48, título, frase) | não tem superfície: é texto direto sobre o fundo de luz |
| Os links de texto ("Ver todas", "Voltar ao ponto de sempre") | são texto |
| O teclado desenhado e o push | são fotos do sistema, ficam como nas referências |
| **O palco e a moldura do aparelho** | o palco é moldura, não produto. Nunca é vidro |

## Onde o vidro mais aparece, e onde o capricho tem que ser maior

Vidro só tem cara de vidro quando existe alguma coisa atrás dele. Nesta ordem:

1. **O mapa (T07).** A esfera do voltar, a cápsula do título, o grupo de controles, o balão e o painel ficam sobre o mapa, com a rota roxa e o ônibus lima passando atrás. É a tela em que o vidro mais aparece, e onde o acabamento pesa mais.
2. **Os sheets.** O Início, a lista ou o mapa ficam atrás, desfocados, com o véu mais leve.
3. **As esferas da barra e o botão do rodapé**, quando a tela rola: o herói, os cartões e o trilho passam por baixo e aparecem dentro do vidro.
4. **O banner**, logo abaixo da barra, com o conteúdo rolando atrás.
5. **O switch e o segmentado**, no gesto: a bolinha e a opção viram vidro enquanto a pessoa segura.

Sobre o fundo liso da página, parado, o vidro quase não se vê, e isso está certo: nesse caso a peça é reconhecida pela borda de luz e pelo brilho do topo, não pelo desfoque.
