# O contrato do dado

O mock é a obra de onde toda tela tira o que mostra. Se a tela precisa de um valor que o mock não tem, isso é um achado, nunca um número digitado no componente.

Este arquivo é o contrato do **dado de exemplo**. O contrato com o servidor do produto, em proposta (o que cada tela lê e envia, a posição do ônibus e os avisos), está em `08-handoff/api.md`.

## As regras

- **Nenhum número inventado.** Todo valor sai do `mock.json` ou do caso do estado, no `casos.json`.
- **Mesma entrada, mesma saída.** O dia é terça, 27/10/2026, e a semente é 06:24. Nada lê o relógio de verdade nem sorteia valor. A barra de status fica em 9:41, como nos quadros.
- **Nenhuma cor no dado.** O dado diz o tipo (`atraso`, `cancelada`); a cor é do design system.
- **Uma heroína.** Ana Souza, Metalúrgica Alfa, Rota Sul Transportes, Linha 210, ônibus 1234 · ABC1D23, ponto de sempre na Av. Abdias de Carvalho, 1200.
- **Cada referência tem um caso.** São 145: 13 telas, 59 momentos e 73 estados, pelo tipo. No arquivo de desenho, por seção, são 70 quadros e 75 estados: dois momentos do Início (o "Não fui eu" e o "Fui eu") moram na seção de estados, ao lado do estado de onde saem. Um estado é o próprio app montado com os dados daquele caso, nunca uma tela desenhada à parte.

## Os arquivos

| arquivo | o que tem |
| --- | --- |
| `mock.json` | a pessoa, a empresa, a transportadora, o contrato, a linha, as paradas, as viagens, as regras com os números, o login de teste e as notificações |
| `casos.json` | uma linha por referência: como se chega, o caso em palavras e os caminhos do HTML e do PNG |
| `conferir.mjs` | a conferência: `node 04-dados/conferir.mjs`, a partir da raiz |

## Os números-âncora

| o quê | quanto | por quê |
| --- | --- | --- |
| paradas da ida | 9, sendo 2 sem nome | para o trilho mostrar o agrupamento das paradas sem nome |
| pontos à frente com nome, às 06:24 | 4 | para a troca de ponto ter escolha, com o de sempre no meio |
| previstos por ponto | 3, 2, 4, 1 e 3 | o 1 exercita o "até 1 pessoa" |
| viagens do dia | 3: ida 06:05, ida 07:05 e volta 17:20 | a outra ida exercita o "não é a sua de sempre" e a viagem mantida no cancelamento |
| notificações | 7 em 3 grupos, 2 não lidas | para o sino ter contagem e a lista ter Hoje, Ontem e Anteriores |

## Do caso para o dado

O caso está escrito em palavras, como nas fichas. No protótipo, cada caso vira um objeto que diz o que muda sobre a semente: a hora, a fase da viagem, o sinal, a rede, o que o servidor respondeu. A referência em HTML e o `textos.md` da tela dizem o resultado exato que esse objeto precisa produzir. O objeto é escrito junto com a tela, e a conferência passa a cobrar que as 145 referências tenham o seu.
