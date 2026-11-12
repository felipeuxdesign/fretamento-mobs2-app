# 010 · O conteúdo também é de vidro

10/11/2026

**O contexto.** Com o vidro nas peças que flutuam e nos controles (decisão 009), o app ficou com vidro em volta de um conteúdo sólido. O passo seguinte é levar o vidro também ao conteúdo, para o app ser de vidro por inteiro.

**A decisão.** Os cartões, as listas e os cartões que se tocam passam a ser o painel de vidro da biblioteca (`GlassPanel`), e a tela ganha um **fundo de luz** parado atrás de tudo: é o que o vidro deixa ver. São 17 peças de vidro. A peça nova, `conteudo`, desliga numa linha, como as outras, e o app volta à versão anterior.

Para ficar bom, e não só possível:

- **o fundo de luz tem cor de verdade**: o roxo do app, forte, um magenta e um toque baixo de lima, em três pontos de luz de borda macia, com um grão fino por cima (o lima deu lugar a um índigo em `013-o-fundo-sem-o-lima.md`). Um fundo só com roxos, mais tímido, deixava o desfoque virar só escurecimento; um azul destoava. O brilho de cada ponto tem teto: o texto de apoio, que também mora direto sobre o fundo, tem que ler a 4,5:1;
- **o fundo tem formas: três pontos de luz de borda macia**, em diagonal (um atrás da saudação e do herói, um à direita, no meio, e um embaixo, à esquerda). São eles que passam por trás dos cartões quando a tela rola. Um degradê liso não dava ao vidro o que desfocar; uma faixa em diagonal ficou marcada demais;
- **o tom do vidro do conteúdo segura o texto**: o roxo do cartão no escuro, a 60 %, e o branco do cartão no claro, a 64 %, com o desfoque da biblioteca. É transparente o bastante para a luz de trás aparecer e firme o bastante para o texto de apoio ficar a 4,5:1, medido na tela, nos dois temas. É o que resta da lei 5 (superfície sólida atrás de texto): o conteúdo deixou de ser sólido, mas não deixou de segurar o texto;
- **sem a lente da borda no conteúdo**: ela foi testada no herói e saiu. Ligada na rolagem, o Início caía para 33 ms por quadro com a CPU em 4×; desligando só enquanto rola, o vidro do herói mudava de aparência e de cor a cada parada. O vidro do conteúdo é o desfoque da biblioteca, estável;
- **os controles moram dentro do conteúdo de vidro** (o botão, o campo, o segmentado, o switch, o selo). O que continua proibido é uma peça que flutua dentro de outra, e conteúdo de vidro dentro de uma peça que flutua: dentro do painel do mapa, o cartão fica sólido;
- **as bordas de rolagem deixam o fundo de luz continuar**: a de cima só aparece quando há conteúdo rolado por baixo da barra; a de baixo cobre até a ponta da tela;
- **a marca do Entrar fica sem o quadrado**: só o desenho, maior, sobre o fundo de luz. O quadrado de vidro não ficou bom no claro em nenhuma versão (o quadro de vidro voltou, com os recortes vazados, em `014-vidro-por-nivel-e-a-entrada.md`). O Entrar e o Código ficam no meio da tela, com o formulário num cartão de vidro, e o bloco sobe quando o teclado abre; O Entrar e o Código ficam no meio da tela, com o formulário num cartão de vidro, e o bloco sobe quando o teclado abre;
- **o botão principal perde o brilho de gel**: cor chapada, um fio de luz em cima e um brilho macio para fora. É a única peça da biblioteca redesenhada por dentro;
- **o perfil, na barra, é a mesma esfera de vidro do sino**, com as duas iniciais na tinta: o roxo já está no fundo;
- **o herói é o mesmo vidro em todos os estados**: o raio, o tom e a borda não mudam em chegando, no ponto nem na viagem cancelada. Um vidro que muda de forma e de cor a cada estado parece outra peça;
- **o mapa entra na família de cor do app**: com o conteúdo de vidro, a água sai do azul para um violeta fundo e o terreno ganha um pouco mais de roxo, sem mudar os tokens;
- **o claro tem regras próprias, não é o escuro invertido**: a página é quase branca e neutra, com a luz roxa concentrada em cima; os cartões são vidro branco com brilho no topo, contorno nítido e sombra neutra e curta; o texto de apoio é um tom mais escuro; e o roxo cheio fica para o botão principal, os links e o que está ao vivo (o interruptor ligado e os chips de papel vão para a tinta);
- **os traços sobre o vidro são a tinta translúcida**, e o cartão tem contorno: as cores sólidas de divisória e de borda sumiam sobre o vidro;
- **os glifos dos poços vão na tinta**: o azul da volta brigava com a composição, que é de uma família só. Quem diz se é ida ou volta é o texto.

**O que continua sólido.** O mapa, o trilho (as linhas e os marcadores), o teclado e o push do celular, o palco. A placa do "Confira o ônibus", os poços de ícone, a nota e o chip de escolha viram poços translúcidos, sem desfoque.

**O que foi descartado.** O vidro claro de fábrica da biblioteca no conteúdo (branco a 8 %): no escuro, o texto de apoio caía para 3:1. Um fundo com azul e rosa. Um fundo de degradê liso, e um com uma faixa em diagonal. A lente em cada cartão, e a lente no herói. O quadrado da marca em vidro. Um fundo só com roxos.

**A consequência.** A regra do iOS 26 (vidro só na camada que flutua) deixa de valer neste app, por escolha. A lei 5 e a linha dos proibidos mudam junto. O desempenho foi medido com o conteúdo de vidro: 16,7 ms por quadro nos três movimentos, com a CPU em 4×. A norma é `03-design-system/vidro/`.
