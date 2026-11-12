# O material

## O que é "ter cara de vidro"

Um vidro bem feito tem cinco coisas, e a falta de qualquer uma faz ele parecer um retângulo cinza translúcido:

1. **O que está atrás aparece.** Desfocado, mas reconhecível como manchas de cor: a rota roxa, o ônibus lima, os cartões. Se o fundo vira uma cor chapada, o desfoque está alto demais ou o preenchimento está opaco demais.
2. **A cor de trás fica mais viva, não mais cinza.** A saturação sobe junto com o desfoque. Vidro que lava a cor fica leitoso.
3. **A borda pega luz.** Um fio claro no topo e nas laterais, mais fraco embaixo, como a quina de uma lâmina de vidro. É o que separa o vidro do fundo quando o fundo é liso.
4. **O topo tem brilho.** Um degradê muito leve, de cima para baixo, por dentro da peça.
5. **A borda refrata.** No Chrome e no Edge, a faixa da borda entorta o que está atrás, como uma lente. No Safari e no Firefox isso não existe, e as quatro primeiras coisas precisam dar conta sozinhas.

E uma sexta, que é regra: **o texto por cima continua legível**, em qualquer ponto por onde o conteúdo passar.

## As camadas, de trás para frente

| camada | o que faz | de onde vem |
| --- | --- | --- |
| desfoque e saturação do fundo | `backdrop-filter: blur() saturate()` | GlassyUI |
| preenchimento | uma cor quase transparente que dá o tom e segura o contraste | os nossos tokens `vidro-pequeno` e `vidro-medio` |
| lente da borda | a refração na quina, só onde o navegador deixa | GlassyUI (`lens`) |
| brilho do topo | o degradê leve por dentro | GlassyUI |
| fio de luz da borda | a quina iluminada | GlassyUI |
| sombra de fora | assenta a peça sobre o que está atrás | os nossos tokens `sombra-sheet` e a sombra do grupo do mapa |
| conteúdo | texto e ícone, na `tinta` do tema | os nossos tokens |

## Os três tamanhos de vidro

| tamanho | peças | o que ele precisa | ponto de partida na GlassyUI |
| --- | --- | --- | --- |
| **pequeno** | botões da barra no pressionado, grupo de controles do mapa, balão do ônibus, a bolinha do switch, a opção do segmentado | ser claro e vivo, com a lente ligada: é onde o vidro mais brilha | preset `control`, `lens` ligado |
| **médio** | barra do topo, barra do mapa, rodapé fixo, banner, toast | deixar passar o que rola por baixo sem atrapalhar o título | preset `standard` |
| **grande** | sheets, painel do mapa, alerta e folha do sistema | segurar bastante texto por cima: desfoque mais forte e preenchimento um pouco mais firme | preset `prominent` |

O modo é **`clear`** nos dois temas. O `tinted` da biblioteca não é usado.

## Os valores de partida

Estes são os pontos de partida, tirados dos tokens e da leitura do kit do iOS. **O valor final é decidido no olho, na vitrine** (`07-vitrine.md`), e fica escrito num arquivo só (ver "Onde os valores moram").

| | escuro | claro |
| --- | --- | --- |
| preenchimento do pequeno | `vidro-pequeno` · `#999999` a 17% | `vidro-pequeno` · `#F2F2F2` a 55% |
| preenchimento do médio e do grande | `vidro-medio` · transparente, com o tom vindo de trás | `vidro-medio` · `#F6F6F6` a 73% |
| desfoque | pequeno de 3 a 8 px · médio de 12 a 20 px · grande de 20 a 32 px | o mesmo |
| saturação | de 140% a 180% | de 120% a 150% |
| fio de luz no topo | branco de 18% a 28% | branco a 80%, com um fio escuro de 6% a 10% por fora |
| fio de luz embaixo | branco de 6% a 10% | preto de 4% a 8% |
| brilho do topo | branco de 8% a 0, no primeiro terço | branco de 60% a 0 |
| alça do sheet | `vidro-grabber` | `vidro-grabber` |
| divisória sobre vidro | `vidro-separador` | `vidro-separador` |
| véu atrás do sheet | de 30% a 40% (o sólido é 62%) | de 15% a 25% (o sólido é 40%) |

O véu fica mais leve que o `scrim` das referências de propósito: com 62% de preto atrás, não sobra nada para o vidro mostrar.

## O escuro e o claro

- **No escuro**, o perigo é o vidro virar um cinza fosco. O preenchimento do médio é transparente: o tom vem do que está atrás, escurecido pelo filtro. Se o texto perder contraste sobre a rota ou sobre o ônibus, escureça o fundo pelo filtro (`brightness`) antes de aumentar o preenchimento.
- **No claro**, o perigo é o vidro sumir no branco. Vidro claro sobre página quase branca não tem desfoque que apareça. Quem segura a peça é a sombra de fora e o fio escuro da borda. Não tente resolver com preenchimento cinza: fica sujo.
- **A cor de ação** é a do app. Onde a biblioteca usa o azul dela (opção ligada, foco, destaque), entra o `vivo`: lima no escuro, roxo no claro. O texto sobre o lima é `vivo-tinta`, nunca branco.
- **O texto e os ícones sobre o vidro** usam `tinta` e `tinta-apagada`, como no sólido.

## Onde os valores moram

Um arquivo só: `app/src/ds/vidro/vidro.css`. Ele liga as variáveis `--lg-*` da GlassyUI aos nossos tokens e guarda os números da ótica (desfoque, saturação, fios, brilho) por tamanho e por tema. **Nenhuma variável `--lg-*` é definida em outro lugar**, e nenhuma tela ajusta o vidro por conta própria. Se uma peça precisa de um valor diferente, ela ganha um nome nesse arquivo.

## O que pode melhorar, e o limite

A GlassyUI é o ponto de partida. Vale ir além dela quando o resultado fica mais bonito:

- afinar desfoque, saturação, fios de luz e brilho por tamanho e por tema;
- ligar a lente nas peças pequenas e desligar onde ela pesa ou distorce texto;
- dar ao painel do mapa e aos sheets um brilho de topo que acompanha o arrasto;
- fazer a bolinha do switch e a opção do segmentado crescerem um pouco e virarem lente enquanto a pessoa segura, e assentarem ao soltar;
- uma camada de ruído muito leve, se tirar o aspecto de degradê em faixas.

O limite é este:

- **a forma é a da biblioteca, no tamanho do app**: o componente vem com o arredondado dele, e a altura, o respiro e o texto são os nossos (`04-pecas.md`). Com o vidro desligado, a forma é a da referência;
- **o contraste não cai**: texto a 4,5:1 e ícone de estado a 3:1 no pior ponto do fundo (`05-acessibilidade-e-desempenho.md`);
- **vidro nunca fica sobre vidro**: uma superfície que desfoca não mora dentro de outra que desfoca. A exceção são os botões, que podem morar numa folha ou no painel do mapa;
- **o desempenho não cai**: rolar e arrastar continuam lisos no celular;
- **toda mudança no código copiado da biblioteca fica anotada** em `app/src/components/glassyui/MODIFICACOES.md`: o arquivo, o que mudou e por quê.
