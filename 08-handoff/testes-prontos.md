# Os testes prontos

O protótipo tem 18 conferências que rodam sozinhas. Elas provam o protótipo, e duas delas servem de modelo para o teste do produto: o roteiro e o contraste.

## Rodar

```bash
cd 06-prototipo/app
npm install
npx playwright install chromium webkit
npm run conferir
```

Leva uns 12 minutos e termina com uma linha por conferência, `passou` ou `NÃO PASSOU`. Cada uma também roda sozinha: `node conferencias/<nome>.mjs`, e quase todas aceitam uma tela (`T05`) ou uma referência (`T05-12`) para rodar só aquele pedaço.

## O que cada uma cobra

| conferência | arquivo | o que cobra |
| --- | --- | --- |
| o dado | `04-dados/conferir.mjs` | o censo das 145 referências, os casos, o mock e o dia |
| o relógio | `relogio.mjs` | todo tempo relativo bate com o agora do estado; o ônibus fica no lugar certo da linha |
| a fidelidade | `fidelidade.mjs` | cada referência, sólida, contra o PNG desenhado. As que mudaram por decisão são contadas à parte |
| os textos | `textos.mjs` | o texto de cada estado contra o `textos.md`, letra por letra |
| as cores | `cores.mjs` | nenhuma cor escrita à mão: só token |
| os tocáveis | `tocaveis.mjs` | todo tocável com nome e 44 de toque |
| os endereços | `enderecos.mjs` | cada `?ref=` abre o estado certo, e os parâmetros combinam |
| o vidro | `vidro.mjs` | `?vidro=0` deixa tudo sólido; cada peça tem a sua chave |
| o vidro em vidro | `vidro-em-vidro.mjs` | nenhum desfoque dentro de outro desfoque |
| o vidro nas telas | `vidro-nas-telas.mjs` | todo texto sobre vidro a 4,5:1, medido na tela |
| o contraste do vidro | `contraste-do-vidro.mjs` | cada peça de vidro sobre o pior fundo dela |
| o vidro na moldura | `vidro-na-moldura.mjs` | o desfoque funciona dentro do recorte do aparelho |
| o claro e o escuro | `claro.mjs` | todo texto de toda tela a 4,5:1 (3:1 no texto grande), nos dois temas. Também tira as fotos |
| o que se toca | `fluxo.mjs` | cada momento se alcança tocando e chega no quadro certo |
| o roteiro | `roteiro.mjs` | o app percorrido tocando, do zero, nos dois temas: cada saída leva a algo que existe |
| o fechamento | `fechamento.mjs` | o tema, o dia, o que abre por cima, o tamanho de celular e a volta com o código |
| o build | `build.mjs` | o build sobe no Chromium e no WebKit, sem nenhuma chamada para fora |

## O que serve para o produto

**1. O roteiro vira o teste de aceite.** `roteiro.mjs` percorre cada saída do app, tocando pelos nomes acessíveis, e imprime uma tabela: de onde, o toque, o que se espera e o resultado. É a lista do que o produto tem de fazer. Reescreva os mesmos passos na ferramenta de teste do app (Maestro, Detox, ou os testes de interface de cada plataforma): os nomes dos botões e os textos esperados são os mesmos, porque saem do `textos.md`.

**2. O caminho feliz**, em ordem: abrir o app no Entrar, receber o código, digitar seis dígitos, preparar o app, chegar ao Início às 06:24, ver o ônibus chegando, no ponto, tocar Embarquei e chegar à fábrica.

**3. Os estados difíceis** estão um por referência, com link: atrasado (`T05-12`), adiantado (`T05-13`), dado antigo (`T05-18`), em desvio (`T05-19`), sem sinal (`T05-20`), sem internet (`T05-21`), cancelada (`T05-26`). O produto precisa de um jeito de provocar cada um em teste (um servidor de teste que devolva aquele caso), como o `casos.json` faz no protótipo.

**4. O contraste se mede, não se estima.** A régua do produto é a mesma: 4,5:1 no texto e 3:1 no texto grande, medido na tela de verdade, com o vidro do sistema, nos dois temas. No iOS e no Android, use o inspetor de acessibilidade de cada um nas telas com texto de apoio sobre vidro (o Início, as Paradas e o painel do mapa).

**5. O que o protótipo não prova:** o aviso com o app fechado, a posição de verdade, a biometria, o teclado do sistema e o desempenho em celular simples. A lista inteira está em `simulado.md`.
