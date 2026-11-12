# A fidelidade

O protótipo é fiel quando cada referência, fotografada no protótipo, bate com o PNG dela na pasta.

## Como se mede

1. Para cada linha de `04-dados/casos.json` (são 145), abra `?ref=<referência>&so-app=1&vidro=0&tema=escuro`, com a tela do aparelho em **390 × 844**, escala 2.
2. Fotografe a tela do aparelho, reta, sem a moldura e sem o canto arredondado.
3. Compare com o PNG da referência (`02-telas/<tela>/referencias/png/<arquivo>.png`), ponto a ponto.
4. O resultado vai para `06-prototipo/fotos/fidelidade/`: a foto, a diferença e uma tabela com a parte da tela que difere, por referência.
5. A mesma foto é comparada com o HTML da referência (`02-telas/<tela>/referencias/html/`), fotografado no mesmo navegador: é a régua que acusa o erro pequeno.

A fidelidade roda **com o vidro desligado**, porque as referências não têm vidro. Com `?vidro=0`, cada peça de vidro fica sólida, nas nossas cores, igual ao quadro.

## O que é aceito

- **Serrilhado de borda**: diferenças de um ponto no contorno de texto e de ícone, de um navegador para outro. Ele é medido, não estimado: `node conferencias/fidelidade.mjs --referencia` fotografa o HTML de cada referência no mesmo navegador e compara com o PNG dela. Esse é o chão (`fotos/fidelidade/chao.md`). Uma referência bate quando difere, no máximo, o chão dela mais 0,15 % da tela.
- **A segunda régua, sem serrilhado no meio**: a mesma foto do protótipo é comparada também com o HTML da referência fotografado no mesmo navegador, na mesma hora. Aí não existe diferença de um navegador para outro, e o que sobra é do protótipo. O limite é 0,005 % da tela (uns 16 pontos em 1,3 milhão): um glifo trocado, um dígito ou um contorno de outra cor passam do limite, e o 0,15 % da primeira régua, sozinho, deixava passar. A diferença dessa régua fica em `fotos/fidelidade/<referência>.html-dif.png`. Um desvio decidido que muda pontos da tela entra com nome em `fotos/fidelidade/folgas.json`, como um pedaço da tela que fica de fora dessa conta (`{ "T08-00": { "regiao": [x0, y0, x1, y1], "porque": "..." } }`, em pontos de tela). Fora do pedaço, o limite continua valendo.
- **Desvio com nome**: uma diferença decidida, escrita no `CHANGELOG.md` com o porquê. Sem nome, é erro.

O que **não** é aceito: texto diferente do `textos.md`, medida diferente (altura de barra, raio, espaçamento), cor fora do token, quebra de linha em outro lugar, peça fora de posição, ícone trocado.

## O que a foto não pega, e precisa ser conferido de outro jeito

- **O claro.** Não existe referência do claro: ele nasce dos tokens. Cada tela é olhada no claro, e as 145 são fotografadas com `tema=claro` em `fotos/claro/` para a revisão (`node conferencias/claro.mjs`, que também mede o contraste de cada texto contra o fundo que ele tem na tela e reprova abaixo de 4,5:1, ou 3:1 no texto grande). O que se procura: texto sumindo, peça com a cor de outra peça, contraste abaixo da folha F08, âmbar como texto sobre a página.
- **O vidro.** É julgado na vitrine do vidro e nas telas de vitrine (`../03-design-system/vidro/07-vitrine.md`).
- **O movimento.** Os sete movimentos da folha F09, o dia andando, o arrasto do painel do mapa.
- **O que se toca.** Cada momento se alcança tocando, no fluxo, e chega no mesmo quadro que a referência mostra.
- **Os textos.** Uma conferência à parte compara o texto visível de cada referência no protótipo com o `textos.md`.

## As conferências que rodam sozinhas

Tudo com um comando, a partir de `06-prototipo/app`: `npm run conferir` (são 18 conferências, uns 12 minutos). Cada uma também roda sozinha (`npm run conferir:fidelidade`, `conferir:textos`, `conferir:cores`, `conferir:tocaveis`, `conferir:enderecos`, `conferir:vidro`, `conferir:vidro-nas-telas`, `conferir:claro`, `conferir:fluxo`, `conferir:fechamento`, `conferir:build`), e a fidelidade, os textos e os tocáveis aceitam uma tela ou uma referência (`node conferencias/fidelidade.mjs T05` ou `T05-02`).

| conferência | o que cobra |
| --- | --- |
| o dado | `node 04-dados/conferir.mjs`, a partir da raiz: o censo, os casos, o mock, o dia |
| a fidelidade | as 145 referências, no escuro, com o vidro desligado, contra o PNG e contra o HTML da referência no mesmo navegador. As que esperam o desenho novo (`fotos/fidelidade/a-redesenhar.json`, com o porquê de cada uma) são contadas à parte |
| o relógio | `node conferencias/relogio.mjs`: em todos os estados do Início, das Paradas e do Mapa, cada tempo relativo bate com o agora do estado, o número do herói bate com a hora ao lado, e o nó do ônibus fica entre a última parada que passou e a próxima |
| os textos | o texto de cada referência contra o `textos.md` |
| o roteiro | `node conferencias/roteiro.mjs`: o protótipo percorrido tocando, do zero, nos dois temas, com a tabela de cada toque e aonde ele leva. Uma saída que está na tela e cujo destino não foi desenhado sai como "falta": não reprova, e fica na tabela |
| as cores | nenhuma cor escrita à mão em `ds/`, `telas/` e `palco/`: só token. A busca aceita qualquer jeito de escrever (hex, `rgb`, `hsl`, com ou sem espaço) |
| os tocáveis | todo tocável com nome acessível e 44 de toque, com o vidro desligado e com o vidro ligado (de vidro, as peças tomam a forma da biblioteca) |
| os endereços | cada `?ref=` abre a referência certa, e os parâmetros combinam. `?fundo=anterior` traz o fundo de luz de antes nas 145, nos dois temas, e sem ele o fundo é o padrão |
| o claro | `node conferencias/claro.mjs`: as 145 fotografadas no claro, e o contraste de cada texto medido na tela, comparado com uma casa decimal. Com `--fundo=anterior`, mede o fundo de antes e guarda as fotos em `fotos/fundo-anterior/`; com `--receita=android`, mede a receita do Android e guarda em `fotos/android/` |
| o escuro | o mesmo, com `--tema=escuro`: com o fundo de luz, o texto de apoio também mora sobre uma cor que não é a da página, e passa a ser medido no escuro |
| o que se toca | `node conferencias/fluxo.mjs`: cada momento, alcançado tocando no palco, chega no quadro da referência. O percurso de cada grupo de telas mora num arquivo `fluxo-<grupo>.mjs`. No fluxo os campos já vêm preenchidos, então os quadros de campo vazio (T01-00, T01-01, T01-06, T12-06 e T12-08) se conferem parados, pela fidelidade; no fluxo se cobra o valor que veio no campo |
| o vidro | `?vidro=0` deixa tudo sólido; cada linha do `vidro.config.ts` desliga só a peça dela; nenhuma variável `--lg-*` fora do `vidro.css` |
| o contraste do vidro | `node conferencias/contraste-do-vidro.mjs`: todo texto sobre vidro a 4,5:1 no pior fundo, nos dois temas. Cada peça se mede sobre o fundo onde mora: o segmentado e o conteúdo de vidro sobre a página lisa, o painel e a barra do mapa sobre o mapa |
| o vidro em vidro | `node conferencias/vidro-em-vidro.mjs`: nas 145 referências e nos dois temas, nenhum elemento com desfoque dentro de outro com desfoque (contando as camadas geradas). Tem de dar zero |
| o vidro nas telas | `node conferencias/vidro-nas-telas.mjs`: nas 145 referências, com o vidro ligado, nos dois temas: nenhuma peça que flutua dentro de outra, nem conteúdo de vidro dentro de peça que flutua (os controles moram dentro do conteúdo de vidro, e os botões, dentro da folha e do painel), nada do conteúdo escondido atrás da barra ou do rodapé, e o texto de cada peça de vidro a 4,5:1 contra o que passa atrás dela na tela |
| o desempenho do vidro | `node conferencias/desempenho-do-vidro.mjs`: o intervalo entre os quadros em três movimentos, com a CPU em 4×, com o vidro e sem ele |
| o vidro na moldura | `node conferencias/vidro-na-moldura.mjs`: no palco, dentro do recorte arredondado do aparelho, o mapa atrás do painel de vidro fica menos nítido que o mapa nu (menos de 55 % da nitidez) |
| o fechamento | `node conferencias/fechamento.mjs`: a Aparência e o Modo claro do palco são o mesmo estado, recarregar mantém e o vidro acompanha; o tocador só nas três telas, no ponto espera, no chegou recomeça; sheet, toast, alerta e teclado abrem dentro da tela do aparelho; no tamanho de celular o app ocupa a tela, o palco some e `?palco=1` abre a gaveta; sair e entrar de novo com 123456, com o e-mail e o código já preenchidos |
| o build | o build de produção sobe e abre, sem nenhuma chamada para fora |

Confira sempre **o resultado**, não a tentativa: uma troca que "mudou 33 botões" pode não ter mudado nenhum se o código estiver escrito de outro jeito. Procure o que ficou fora do padrão, não o que foi tocado.
