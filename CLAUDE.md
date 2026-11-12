# As regras desta pasta

Valem para qualquer IA que abrir esta pasta.

## O seu trabalho

**Construir o que está descrito, não redesenhar.** O desenho foi decidido, tela por tela, e aprovado no olho. Se alguma coisa parecer errada, meça, prove e escreva a proposta no `CHANGELOG.md`. Nunca corrija por conta.

## O método

1. **Estude antes de construir.** A pasta inteira, na ordem do `GUIA-DE-LEITURA.md`, e cada referência aberta, sem exceção. As medidas se leem no HTML da referência, não se estimam pela imagem.
2. **Meça antes de afirmar.** "Está igual" é uma foto comparada, não uma impressão.
3. **Desvio com nome, nunca em silêncio.** Tudo o que ficou diferente do descrito entra no `CHANGELOG.md`, com o porquê.
4. **A documentação segue o código, no mesmo passo.** Se uma regra mudou no protótipo, a ficha, a tabela e a lei mudam junto. Documento e protótipo nunca divergem.
5. **Mesma entrada, mesma saída.** O relógio é fixo. Nada lê a hora de verdade nem sorteia valor.
6. **Confira o resultado, não a tentativa.**

## O que é norma

- **O comportamento**: `tela.md` e `estados.md` de cada tela, e `01-produto/regras.md`.
- **Os textos**: `textos.md` de cada tela, letra por letra.
- **A aparência**: as referências em HTML e PNG.
- **Os tokens**: `03-design-system/tokens.json` e `tokens.css`. O `tokens.css` é gerado do `tokens.json`, nunca editado à mão.
- **As leis**: `03-design-system/leis.md`.
- **O movimento**: `03-design-system/movimento.md` e o `animacao.md` de cada tela.
- **O dado**: `04-dados/mock.json` e `casos.json`.
- **O vidro**: `03-design-system/vidro/`.
- **O palco**: a folha F11 e `06-prototipo/palco.md`.

## Os proibidos

- Número inventado: todo valor sai do mock ou do caso.
- Cor fora dos tokens.
- Uma peça pintada com o token de outra peça, mesmo que no escuro o valor seja igual.
- Hover no app: é um app de toque.
- Uma tela remontada à mão para mostrar um estado: o estado é o app com o dado daquele caso.
- O lima fora do lugar: ele só aparece quando algo está vivo, e um botão primário por tela.
- Mostrar, antes do login, qualquer dado de quem é a pessoa: contato do RH, nome da empresa, o que for do cadastro.
- Prometer na tela o que o sistema não faz.
- Uma contagem de pessoas que identifique alguém: abaixo de 2, vira "até 1 pessoa".
- Falar tecnologia com o passageiro: nada de "servidor", "GPS", "sincronizar", "API" na tela. Vale o texto do `textos.md`.
- Vidro no palco, no mapa ou no trilho. O conteúdo de vidro tem tom firme e texto a 4,5:1, e mora sobre o fundo de luz, com o brilho limitado pelo texto de apoio. O vidro é o da biblioteca, e o botão primário de vidro tem a cor exata do `vivo`.
- Travessão em qualquer texto.
- Desenhar no código: o que não está desenhado não se inventa. Se falta um quadro, isso entra no `CHANGELOG.md` como falta.

## O que é do protótipo e o que é do produto

O protótipo simula o servidor, o ônibus, o celular e o tempo. A lista do que é de mentira está em `08-handoff/simulado.md`. Quem for construir o produto real não copia a simulação.

## Os números desta versão

13 telas · 145 referências (13 telas, 59 momentos, 73 estados) · 15 histórias · 47 cores, 9 estilos de texto, 9 espaços, 5 raios, 5 medidas e 2 sombras · 64 ícones · 12 folhas · 17 peças de vidro · 145 casos.

`node 04-dados/conferir.mjs`, a partir da raiz, confere o censo, os casos, o mock e o dia. Tem que aprovar antes de qualquer tela.
