# Conferir contra o desenho

Como saber se uma tela construída está igual ao desenho.

## O que comparar com o quê

| o quê | compara com |
| --- | --- |
| a aparência da tela | a foto do protótipo: `06-prototipo/fotos/escuro/T05-00.png` e `06-prototipo/fotos/claro/T05-00.png` (390 × 844, em dobro) |
| o texto | o `textos.md` da tela: a lista de cada estado, na ordem em que aparece |
| as medidas | o HTML da referência, aberto no navegador e medido no inspetor; ou o protótipo, no mesmo estado |
| o comportamento | o protótipo rodando, no mesmo estado (`?ref=T05-00`), e o `estados.md` da tela |
| o movimento | o `animacao.md` da tela e `03-design-system/movimento.md` |

Lembre que 77 referências desenhadas mostram conteúdo de antes (`README.md`, "Qual desenho manda"): nelas, a foto do protótipo é a verdade.

## O passo a passo, por tela

1. **Abra o estado no protótipo**: `http://localhost:5173/?ref=T05-00&so-app=1&tema=escuro`. O `so-app=1` tira o palco e deixa só a tela, em 390 × 844.
2. **Ponha o app no mesmo estado**, com o mesmo dado (o caso está em `04-dados/casos.json`, e o dado, em `mock.json`).
3. **Tire a foto do app** no mesmo tamanho lógico e sobreponha à foto do protótipo.
4. **Confira nesta ordem:** os textos (letra por letra, com os espaços que não quebram); a ordem e a posição dos blocos; os tamanhos de texto e os pesos; as cores, pelo token; os raios e os espaços; o que se toca, com 44 de toque.
5. **Repita no claro.** O claro não foi desenhado tela a tela: ele nasce dos tokens. O que estiver fora do lugar no claro é uma peça usando o token errado.
6. **Repita com a fonte do sistema aumentada.** Tudo escala até 200 % sem cortar o herói.

## O que pode ser diferente, e não é erro

- **O vidro.** No iOS 26 o vidro é o do sistema, e ele não é igual ao do navegador: o brilho, a lente da borda e o jeito de reagir ao toque são dele. O que tem de bater é **onde** há vidro, **em que nível** e **a cor** do que está dentro. No Android, vale a receita de `vidro-por-plataforma.md`.
- **O mapa.** O do protótipo é decorativo: o produto usa outro mapa. Compare os marcadores, a rota e as peças de cima, e não o desenho das ruas.
- **O que o celular desenha:** a barra de status, o teclado, os alertas do sistema, o pedido de biometria e o aviso na tela de bloqueio são do sistema de cada um.
- **O nome da biometria.** O protótipo mostra um iPhone e diz Face ID. No produto, o texto usa o nome do método do aparelho: Face ID ou Touch ID no iPhone, a digital ou o rosto no Android.
- **A fonte.** A Inter é a mesma nos dois lados; a diferença de um ponto no desenho das letras entre plataformas é esperada.
- **O relógio.** No protótipo é sempre terça, 27/10/2026, 06:24, com a barra de status em 9:41. No app, é o de verdade.

## O que não pode ser diferente

- **Os textos.** Vale o `textos.md`, sem sinônimo e sem resumo.
- **Os números das regras** (`01-produto/regras.md`): 3 min de tolerância, 30 min para trocar minutos por horário, 1,5 min e 3 min para o dado antigo e o sem sinal.
- **A privacidade:** nada da pessoa antes do login; parada sem nome nunca mostra o nome; contagem abaixo de 2 vira "até 1 pessoa".
- **O contraste:** 4,5:1 no texto, 3:1 no texto grande, medido.
- **O lima** só aparece quando algo está vivo, e num botão principal por tela.
- **Nenhum vidro dentro de vidro**: o controle dentro de um cartão não tem desfoque.

## Antes de dar uma tela por pronta

- [ ] os textos de todos os estados da tela batem com o `textos.md`
- [ ] a foto sobreposta bate no escuro e no claro
- [ ] todos os estados do `estados.md` existem e se alcançam
- [ ] o erro aparece no lugar da ação e diz o que fazer
- [ ] todo tocável tem nome para o leitor de tela e 44 de toque
- [ ] o contraste foi medido nas telas com vidro
- [ ] funciona com a fonte em 200 % e com a redução de transparência do sistema ligada
