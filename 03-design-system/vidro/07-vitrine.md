# A vitrine do vidro

Nenhuma peça de vidro entra numa tela antes de estar certa na vitrine. A vitrine é uma página do próprio protótipo, `?vitrine=vidro`, fora do palco, que mostra cada peça de vidro isolada, sobre fundos de verdade.

## O que ela mostra

Para cada uma das 17 peças de `04-pecas.md`:

- a peça **sólida** (a original) ao lado da peça **de vidro**, no mesmo tamanho;
- sobre **quatro fundos**: o mapa com a rota e o ônibus atrás; o Início rolado, com o herói e o botão lima atrás; a página lisa; e o pior caso de contraste daquela peça (`05-acessibilidade-e-desempenho.md`);
- nos **dois temas**;
- os estados dela: repouso, pressionado, desligado, foco;
- e a medida de contraste do texto no pior fundo, escrita ao lado.

Em cima da página, os controles: tema, vidro ligado ou desligado, qualidade (`low`, `medium`, `high`), reduzir transparência, reduzir movimento, e um botão que faz o fundo se mexer (o mapa desliza, o Início rola), porque o vidro se julga em movimento.

## As fotos

A vitrine é fotografada inteira, e as fotos ficam em `06-prototipo/fotos/vidro/`:

- no Chromium e no WebKit;
- no escuro e no claro;
- com o vidro ligado, com o vidro desligado e com reduzir transparência.

O nome do arquivo diz o que é: `vitrine-chromium-escuro-vidro.png`, `vitrine-webkit-claro-vidro.png`, e assim por diante. Quem abrir a pasta vê o vidro sem rodar nada.

## Como julgar

Uma peça só está pronta quando a resposta é sim para tudo:

1. **Dá para ver o que está atrás?** Manchas de cor reconhecíveis, não um bloco chapado.
2. **A cor de trás ficou viva?** Nem cinza, nem leitosa.
3. **A borda pega luz?** O fio claro aparece no topo, sobre fundo escuro e sobre fundo claro.
4. **O topo tem brilho?** Leve, sem parecer um degradê de botão antigo.
5. **No Chromium, a borda refrata?** E no WebKit, **sem a lente, ainda parece vidro?**
6. **O texto passa?** 4,5:1 no pior fundo, medido.
7. **A forma é a da biblioteca, no nosso tamanho?** O arredondado é o dela; a altura, o respiro e o lugar do texto e do glifo são os de `04-pecas.md`.
8. **No claro ela não some?** A sombra e o fio escuro seguram a peça sobre o branco.
9. **Em movimento continua liso?** Sem tremer, sem faixa, sem engasgo.
10. **Desligando o vidro, ela volta igual à referência?**

Se uma resposta for não, afine o material em `app/src/ds/vidro/vidro.css` e fotografe de novo. Se depois de afinar a peça ainda não convencer, ela fica sólida (`false` no `vidro.config.ts`), e isso entra no `CHANGELOG.md` com o motivo e com a foto do que não funcionou. **Uma peça sólida e certa vale mais que uma peça de vidro feia.**

## Depois da vitrine

Com as peças aprovadas, o vidro entra nas telas pela peça do design system, nunca tela por tela. Aí as telas de vitrine do vidro são fotografadas também, em `06-prototipo/fotos/vidro/telas/`, nos dois temas:

- T07-00, T07-01, T07-05, T07-06, T07-07 e T07-10: o mapa, com o painel nas três alturas, o detalhe da parada e o balão;
- T05-00 rolada até o meio, com o herói passando por baixo da barra, e T05-08, com o sheet;
- T05-23, com o banner;
- T08-05, com o sheet de confirmação sobre a lista e o rodapé;
- T03-00 e T03-01, com o rodapé, os switches e o alerta do sistema;
- T01-00 e T10-00, com o segmentado;
- T12-00, com o switch.
