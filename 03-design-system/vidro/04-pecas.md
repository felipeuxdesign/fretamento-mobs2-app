# Peça por peça

Para cada peça: **a forma**, **o material que entra**, **o que tem atrás** e **o sólido** (como ela fica com o vidro desligado, que é igual ao quadro).

O vidro é o da biblioteca, à risca. As peças de vidro são os componentes dela, com a forma arredondada e as cores de superfície que ela propõe (o preenchimento, a borda, o trilho e a bolinha dos controles). Aqui entram o tamanho, o respiro, a tinta do app e as cores que têm significado: o `vivo` no destaque, o `perigo-forte` no destrutivo, o roxo do avatar e a cor de cada selo. As medidas do sólido foram lidas do HTML das referências. Em caso de dúvida sobre o sólido, vale o HTML.

## O interruptor de cada peça

Toda peça de vidro tem a versão sólida, a original, e a troca é uma linha. Um arquivo só, `app/src/ds/vidro/vidro.config.ts`:

```ts
export const VIDRO = {
  barra: true,
  botoesDaBarra: true,
  barraDoMapa: true,
  controlesDoMapa: true,
  balaoDoOnibus: true,
  painelDoMapa: true,
  sheet: true,
  banner: true,
  rodape: true,
  toast: true,
  sistema: true,
  switch: true,
  segmentado: true,
  botoes: true,
  campos: true,
  selos: true,
  conteudo: true,
} as const;
```

- `false` numa linha devolve aquela peça ao original, sem tocar em mais nada.
- `?vidro=0` no endereço desliga todas de uma vez, e a "reduzir transparência" do sistema faz o mesmo.
- Cada peça do design system é **um componente só**, que sabe desenhar o sólido e o vidro. Nunca dois componentes para a mesma peça, nunca um `if` de vidro dentro de uma tela.

## 1. Barra do topo · `.tb`

- **Forma:** 56 de altura, logo abaixo da barra de status. De vidro, **a barra não é uma faixa**: não tem fundo, nem divisória, nem véu. O respiro é `0 16px`, com 8 entre as peças.
- **Material:** a **borda de rolagem**. O que rola por baixo da barra desfoca (18 px) e some na cor da página, e é isso que segura o relógio e o título. Quem é vidro são os botões (peça 2).
- **O título:** em `secao`, a 4 da esfera do voltar. **Na home, a saudação cresce para 22/28 em peso 700**: sem a faixa, ela é o título da tela.
- **O que tem atrás:** o conteúdo da tela, rolando. O conteúdo começa no mesmo lugar de antes e passa por baixo da barra ao rolar.
- **A borda de cima só existe quando há conteúdo rolado por baixo da barra.** No topo da rolagem, a barra fica limpa.
- **No pé da tela, a mesma borda.** Nas telas sem rodapé, enquanto ainda há conteúdo abaixo do que se vê, ele desfoca e some na cor da página até a ponta da tela (84 de altura). No fim da rolagem, a borda sai.
- **Sólido:** `fundo-cartao` com a `divisoria` embaixo, como no quadro.

## 2. Botões da barra · `.ib`

- **Forma:** a **esfera de vidro** de 44, com o glifo de 22 em cima. É o `GlassButton` da biblioteca, redondo. O contador do sino fica por fora da esfera (3 acima, 5 à direita), para não ser cortado por ela.
- **O perfil:** de 44 na barra e de 72 no cabeçalho do Perfil. Com o conteúdo de vidro, é a mesma esfera de vidro do sino, neutra, com as duas iniciais do nome (AS) na `tinta`, o fio de luz da biblioteca na borda e a mesma sombra das esferas. **Sem degradê e sem cor cheia**: o avatar não é o destaque da tela., o fio de luz da biblioteca na borda e a mesma sombra das esferas. **Sem degradê e sem cor cheia**: o avatar não é o destaque da tela, e no claro o roxo dele é o mesmo do botão principal. Também nunca fica cinza.
- **Material:** vidro claro com lente. Sem hover. No escuro, o vidro dos controles é neutro: a saturação do que passa atrás cai para 0,55, para o botão não pegar a cor da luz do fundo.
- **Sólido:** só o glifo, com o pressionado das folhas; o avatar de 32.

## 3. Barra flutuante do mapa · `.mtop`

- **Forma:** sobre o mapa, o voltar numa esfera de 44 e "Linha 210 · Ida de sempre" numa **cápsula de vidro** da mesma altura (raio 999, respiro `0 18px`). Não há faixa: o mapa aparece inteiro em volta. Os banners entram logo abaixo.
- **Material:** a cápsula é o painel em pílula da biblioteca (`GlassPanel`, `control`), como ela desenha: o desfoque, a lente da borda, o fio de luz. Como a cápsula leva texto e o disco lima do ônibus pode passar exatamente atrás dele, a camada fosca leva o tom do cartão (64 % no escuro, 56 % no claro) e o brilho do que passa atrás cai para 0,5 no escuro.
- **O que tem atrás:** o mapa, com a rota e o ônibus. O texto precisa passar no contraste com a rota roxa e com o disco lima exatamente atrás.
- **Sólido:** a barra de 56 em `fundo-cartao`.

## 4. Grupo de controles do mapa · `.mgrp`

- **Forma:** coluna de 48 de largura, a 16 da direita, raio 16, três botões (ônibus, pessoa, mira) com glifo de 22 e divisórias fixas; o ligado é o glifo `vivo` num quadrado `vivo` a 12%; o desligado, em `tinta-desligada`.
- **Material:** vidro pequeno com lente (`GlassPanel`), um vidro só para o grupo inteiro. As divisórias viram `vidro-separador`. A borda de 1 px (`borda`) sai: entra o fio de luz. A sombra de fora fica.
- **O que tem atrás:** o mapa.
- **Sólido:** `fundo-cartao`, borda `borda`, sombra `0 8px 32px` a 45%.

## 5. Balão do ônibus · `.callout`

- **Forma:** raio 12, padding `8px 12px`, duas linhas (prefixo e placa; a idade do dado), preso acima do disco do ônibus.
- **Material:** vidro pequeno (`GlassPanel`, `card`). Sem a borda de 1 px.
- **Sólido:** `fundo-cartao` com `borda`.

## 6. Painel do mapa · `.msheet`

- **Forma:** a mesma placa de vidro da folha da biblioteca: **solta das bordas** (8 dos lados), com o canto de 40 e a alça dela. Fica 21 acima do fundo, por cima do indicador de início: os 8 dele, os 5 da altura dele e mais 8. O topo do painel fica onde sempre esteve, então o grupo de controles e a escala não mudam de lugar. Respiro `0 20px 23px`.
- **O que é nosso:** as três alturas (recolhido, no meio, inteiro) e ele **não fecha**. Tocar numa parada troca o conteúdo pelo detalhe dela.
- **Material:** `GlassPanel` com os mesmos números do `GlassSheet` (`prominent`, elevado), sem véu atrás e **sem a lente da borda**: numa placa desse tamanho, com o mapa andando por baixo e a altura mudando no arrasto, a lente era redesenhada a cada quadro (33 a 50 ms por quadro com a CPU em 4×; sem ela, 16,7 ms). A placa leva 40 % de `fundo-cartao` no escuro e 70 % no claro, com desfoque 10: transparente o bastante para o mapa aparecer por baixo.
- **O que tem dentro:** o herói compacto, os selos e o trilho, pousados direto no vidro. O fechar do detalhe é o mesmo disco do X da folha, de 36, dentro dos 44 de toque. O botão "Embarcar aqui hoje" é o botão principal, igual ao do Início.
- **Com o painel inteiro**, a faixa do relógio deixa o mapa aparecer acima da folha.
- **Arrasto:** pelo painel inteiro. Assenta em 250 ms na altura do lado para onde o dedo foi, a partir de 24 de arrasto. Com o detalhe aberto, puxar para baixo fecha o detalhe.
- **Sólido:** preso embaixo, raio 16 em cima, padding `8px 16px 44px`, `fundo-cartao` com `sombra-sheet`.

## 7. Sheets · `.sheet` com `.scrim`

- **Forma:** **o `GlassSheet` da biblioteca, como ele é**: solto das bordas (8 dos lados e do fundo), com o canto de 40, a lente na borda, a alça com mola e o X no canto. Aqui só entra o encaixe: ele abre dentro da tela do aparelho, com a nossa letra (título em 20/26 com peso 600, texto em 15/22) e 12 entre os blocos.
- **O X:** o da biblioteca, como ela desenha: um disco claro e neutro de 36 (nunca a cor do app), com 44 de toque. Fecha a folha, como o Cancelar, o toque no véu e o arrasto para baixo.
- **Material:** a placa de vidro da biblioteca. O véu de trás fica mais leve que o `scrim` (ver `02-material.md`), para a tela de trás aparecer.
- **Os botões dentro da folha são os mesmos de fora** (peça 14): o principal sai igual ao do Início.
- **O erro no lugar** (`perigo-suave` com `perigo`) continua sólido, dentro da folha.
- **Sólido:** preso embaixo, raio 16 em cima, padding `8px 16px 34px`, `fundo-cartao`, `sombra-sheet`, véu `scrim`, sem X.

## 8. Banner fixo · `.bf`

- **Forma:** logo abaixo da barra, **flutuando**: solto das bordas (12 dos lados, 8 embaixo), raio 18, respiro `10px 10px 10px 14px`, ícone de 20, texto em 13 e, quando tem, o botão de texto. Empilha até dois, por prioridade. A faixa de 4 da esquerda sai: quem diz o nível é o ícone e o tom.
- **Material:** vidro médio (`GlassSurface`). O nível de atenção entra como um tom leve de `atencao` sobre o vidro, não como bloco opaco.
- **O que tem atrás:** o conteúdo rolando, ou o mapa.
- **Sólido:** largura inteira, com a faixa de 4 na cor do nível; `fundo-elevado` no neutro, `atencao-suave` na atenção, como no quadro.

## 9. Rodapé fixo · `.ft`

- **Forma:** preso embaixo, padding `10px 16px 34px`, a legenda (quando tem) acima do botão de 48. De vidro, **o rodapé não é uma faixa**: sem fundo e sem divisória.
- **Material:** a borda de rolagem, de baixo para cima: o fim da rolagem desfoca e some na cor da página, e isso segura a legenda. Quem é vidro é o botão (peça 14).
- **O que tem atrás:** o fim da rolagem. O conteúdo ganha o espaço do rodapé embaixo, para a última linha não ficar presa atrás dele.
- **Sólido:** `fundo-cartao` com a `divisoria` em cima.

## 10. Toast

- **Forma:** a da folha F02: embaixo, dentro do aparelho, uma linha, 3,2 s, só confirmação leve. Nunca carrega erro.
- **Material:** vidro médio em pílula. O toast sólido usa tinta sobre fundo invertido; no vidro, ele usa o vidro do tema com `tinta`.
- **Sólido:** o da folha F02.

## 11. O que o celular desenha · `.sys` e `.sysb`

- **Forma:** o alerta (270 de largura, raio 14), no meio da tela. O pedido de biometria é o mesmo alerta, com o desenho do Face ID em cima: a folha da digital dos quadros saiu, porque o celular do protótipo é um iPhone. Fonte e cores do sistema: branco, `sistema-azul` nos botões.
- **Material:** vidro grande. Nas referências eles já têm um desfoque simples; aqui ganham o material completo.
- **Não leva a cor do app.** Nenhum lima, nenhum roxo.
- **Sólido:** como nos quadros.

## 12. Switch · `.sw`

É a única peça que muda de forma.

- **Forma de hoje:** trilho de 64 × 28, raio 14; ligado em `vivo`, desligado em `fundo-sobreposto` com `borda`; desligado sem poder, a 45%.
- **Com vidro:** é o `GlassSwitch` como a biblioteca desenha, com o trilho e a bolinha nas cores dela. **A bolinha vira vidro debaixo do dedo**: em repouso, a bolinha é a do desenho; ao tocar e arrastar, ela cresce um pouco, vira uma lente de vidro que deixa ver o trilho por baixo, e ao soltar assenta de volta. É o gesto do switch do iOS 26.
- **Cor:** ligado é `vivo`, a cor de ação do tema, nos dois temas; nunca o azul da biblioteca.
- **Meça o `GlassSwitch` depois de instalar** e ajuste para o nosso tamanho. Se a proporção dele não couber em 64 × 28 sem deformar, o trilho pode ir até a medida dele, desde que a linha da lista não mude de altura. A medida que ficar entra em `MODIFICACOES.md`.
- **Sólido:** o switch das referências.

## 13. Segmentado · `.seg`

- **Forma:** o `GlassSegmentedControl` da biblioteca, **como ela desenha**: o trilho de vidro em cápsula e a gota que desliza de uma opção para a outra, com as cores dela. Aqui só entram a altura de cada opção (44; 38 na Aparência do Perfil, que leva ícone, com 44 de toque) e a letra (13 com peso 600). No Entrar, largura inteira com duas opções; na Aparência, três.
- **Onde ele mora:** na página lisa (o Entrar) e dentro de um cartão (a Aparência). **Nunca sobre conteúdo que rola nem sobre o mapa**: o trilho dele é vidro claro, e com o disco lima do ônibus atrás o texto mede 1:1. Na página lisa, o pior texto mede 4,5:1 no claro e 5,6:1 no escuro.
- **Sólido:** o das referências, com raio 12 no trilho e 9 na opção.

## 14. Botões · `.btn` e o chip solto

- **Forma:** o `GlassButton` da biblioteca, na cápsula dela, com 48 de altura, largura inteira, texto em 15/22 com peso 600 e ícone de 20 a 8 do texto. Em par (Cancelar e Confirmar), os dois dividem a largura.
- **O principal:** o vidro tingido da biblioteca (`prominent`), com a lente e a luz que anda com o toque, **sem o brilho de gel**: saem o reflexo que cruza o botão e a borda clara em degradê; ficam a cor chapada, um fio de luz de 1 px em cima e um brilho macio para fora, da cor do botão. A cor vem das variáveis dela. O tom foi medido na tela até dar o token: `vivo` (170 239 0 no escuro, 79 0 125 no claro).
- **Um botão principal só.** Dentro de uma folha ou do painel do mapa, a placa de vidro separa o botão da página e ele sairia mais escuro. Ali a luz debaixo dele fica cheia, da cor que a página daria, e ele usa os números de lente dele, não os da folha. A cor medida é a mesma no Início, na folha e no mapa.
- **O destrutivo:** o mesmo vidro tingido, de `perigo-forte` (211 47 43), com `perigo-tinta`.
- **O secundário:** vidro claro (`primary` da biblioteca), com a `tinta`.
- **O desligado:** o mesmo vidro, com o texto e o fundo na opacidade de desligado da biblioteca (45 %), nos dois temas.
- **O chip solto** ("Perto de mim") e o chip de escolha (5, 10 e 15 min): o mesmo botão, com 44 de altura e texto em 13. Ligado, é o vidro tingido de `vivo` a 30 %, com contorno e letra em `vivo`.
- **Carregando:** o botão fica como está, parado, com o anel de espera da biblioteca (`GlassSpinner`, de 18) antes do texto, na cor do texto.
- **Sólido:** os botões das folhas, com raio 12.

## 15. Campos · `.inp`, `.otp` e `.ta`

- **Forma:** o `GlassInput` e o `GlassTextarea` da biblioteca, com o canto que ela propõe. Texto: 48 de altura, respiro `0 16px`, 15/22. Código: 56 de altura, centrado, 24 em peso 700, com o espaço entre os dígitos. Área de texto: no mínimo 112, respiro `12px 16px`. O rótulo, em 13/18, é o da biblioteca.
- **Cor:** a borda e o exemplo são os da biblioteca. Com o conteúdo de vidro, o preenchimento é o mesmo do trilho das abas (o tom elevado a 62 %; no claro, branco a 88 %). O texto é a `tinta`, e o cursor, `vivo`.
- **Sólido:** os campos das folhas.

## 16. Selos · `.selo`

- **Forma:** o `GlassBadge` da biblioteca, em pílula, com o fio de luz na borda. A cor de cada estado (ao vivo, no horário, atrasado, cancelado e os outros) continua a nossa.
- **O selo não desfoca nada.** Ele mora no conteúdo (o cartão do herói, o painel do mapa), e desfoque ali seria vidro dentro de vidro.
- **Sólido:** o selo das folhas.

## 17. Conteúdo · `.card`, `.cint`, `.list`, `.ccard`, `.hcard`, `.opt`

- **Forma:** a do nosso cartão: raio 16, respiro 16, 12 entre os blocos. O material é o `GlassPanel` da biblioteca, em cartão.
- **O tom:** entra onde a biblioteca manda, na cor da camada fosca: `fundo-cartao` a 60 % no escuro e a 64 % no claro, com o desfoque dela. **O herói é o mesmo vidro em todos os estados**: em chegando e no ponto ele não fica mais redondo nem muda de cor, e na viagem cancelada não ganha contorno vermelho. Os outros cartões em destaque também levam o raio 16 e o tom comum; o cartão de perigo que não é o herói mantém a borda `perigo`. Com o branco a 8 % de fábrica, o texto de apoio caía para 3:1 no escuro.
- **No claro, o vidro não é o escuro invertido.** No escuro ele aparece pela luz que passa; no claro, pela borda, pelo brilho e pela sombra, sobre uma página quase branca (`#faf9fc`). O cartão leva o branco a 56 %, um brilho no topo, contorno de 1 px, a saturação do que passa atrás em 2,1 e uma sombra neutra, curta e firme. O texto de apoio fica um tom mais escuro (`#5b4c65`). O interruptor ligado e os chips de papel vão para a `tinta`: o roxo cheio fica para o botão principal e o que está ao vivo; o link é texto primário sublinhado. O véu das folhas é um escurecido neutro a 16 %.
- **Sem a lente da borda.** Ela foi testada no herói e saiu: ligada na rolagem, o Início caía para 33 ms por quadro com a CPU em 4×; desligando só enquanto rola, o vidro mudava de aparência e de cor a cada parada.
- **O que tem atrás:** o fundo de luz da tela (`01-onde-entra.md`). Nunca o mapa, nunca outro conteúdo.
- **O que tem dentro:** os controles são de vidro (o botão principal sai igual ao de fora, como na folha; o chip de escolha de 5, 10 e 15 min é o mesmo botão da biblioteca, com papel de rádio). A placa do ônibus, a nota e o esqueleto viram poços translúcidos, sem desfoque. O poço de ícone é um vidro pequeno, com o preenchimento e a borda de controle da biblioteca, e o glifo na `tinta`: o azul da volta e o roxo da ida saem. O selo de perigo ganha a base do cartão por baixo do tom suave. O trilho continua desenho.
- **Os traços:** o cartão tem um contorno de 1 px (branco a 13 % no escuro, o roxo da marca a 14 % no claro). Dentro de uma peça de vidro (o cartão, a folha, o painel do mapa), a `divisoria` e a `borda` passam a ser a tinta translúcida (16 % e 36 % no escuro, 12 % e 32 % no claro): as cores sólidas de traço sumiam sobre o vidro.
- **A linha escolhida numa lista:** um véu do `vivo` a 14 % cobrindo a linha inteira, com o texto de apoio na `tinta`.
- **O cartão que se toca:** o painel é o cartão, e o botão de dentro fica sem fundo.
- **A marca do Entrar:** o desenho de sempre, sem o quadrado do arquivo e com os recortes vazados (as janelas, o letreiro, os faróis e os contornos são buracos: o que está atrás aparece por eles). Sempre em duas cores, pela mesma regra nos dois temas: a figura na `tinta`, o ônibus no `vivo`, o mesmo token do botão principal. O nome vai na `tinta-apagada`. São três arranjos, pelo endereço: `?marca=l1` (o padrão), um quadro de vidro de 88, raio 20, com o desenho ocupando 62 % da largura, o nome 12 abaixo e o título 28 abaixo do nome; `?marca=l2`, o desenho solto com 72 de largura; `?marca=l3`, o quadro de 40 e o nome ao lado, numa linha, com o título 32 abaixo. `?cor=invertida` troca as duas cores, para comparar. Atrás da marca, só no Entrar, um ponto de luz de 160 (roxo da marca a 0,55 no escuro, lavanda a 0,60 no claro), 20 para cima e para a esquerda do centro do quadro. Com o teclado aberto, o quadro vai a 48 e o nome some; na linha, some tudo. O bloco inteiro, da marca ao cartão, fica no meio da altura útil, com o centro 4 % acima do meio. A área que rola do Entrar começa no topo da tela, por baixo da faixa do relógio, para a luz de trás da marca não ser recortada numa linha reta.
- **O Entrar e o Código:** o bloco fica no meio da tela, com o formulário num cartão de vidro de raio 24 (as abas, o campo e o botão; no Código, o campo e o botão). Quando o teclado sobe, o bloco sobe junto e se centraliza no espaço acima dele, em 240 ms. A seta de voltar do Código continua na barra, em cima à esquerda.
- **O perfil na barra:** a mesma esfera de vidro do sino (`GlassButton`), com as duas iniciais do nome (AS) na `tinta` no lugar do glifo. No cabeçalho do Perfil, o avatar de 72 fica em vidro neutro, também com as duas iniciais.
- **O título do Preparar o app** cresce para 22/28 em peso 700, como a saudação da home: sem voltar, ele é o título da tela.
- **O aviso e o erro no lugar, soltos sobre o fundo de luz,** ganham a base da página por baixo do tom suave.
- **As bordas de rolagem com o conteúdo de vidro:** a de cima só aparece quando há conteúdo rolado por baixo da barra, com metade da cor da página e o mesmo desfoque; a de baixo cobre até a ponta da tela, na cor do fundo de luz daquele canto.
- **Dentro do painel do mapa**, o cartão fica sólido.
- **O mapa, com o conteúdo de vidro:** a marca do norte sai (o mapa nunca gira). As variáveis de cor dele são redefinidas dentro da tela, sem mudar os tokens. O terreno e as ruas ganham um pouco mais de roxo; a água sai do azul para um violeta fundo, que continua lendo como água por ser o tom mais frio e mais claro do terreno. A cápsula do nome da linha, o grupo de controles e o balão do ônibus são o mesmo vidro (o tom do cartão a 64 % no escuro e 56 % no claro, com o desfoque da biblioteca).
- **Sólido:** o cartão das folhas, em `fundo-cartao`.

## Os estados que toda peça de vidro precisa ter

| estado | o que acontece |
| --- | --- |
| repouso | o material do tamanho dela |
| pressionado | o botão da biblioteca afunda e a luz dele anda; nas outras, clareia um pouco. Dura 120 ms |
| desligado | o conteúdo vai para `tinta-desligada`; o vidro não muda |
| foco de teclado | o anel do app: `foco`, 2 px, deslocado 2 px |
| vidro desligado | o sólido da referência |
| reduzir movimento | sem o crescer da bolinha, sem o brilho que acompanha o dedo: troca direta |
