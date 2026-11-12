# O handoff

Para quem vai construir o produto de verdade.

## Qual desenho manda

**O protótipo com o vidro ligado é o desenho atual.** É ele que se constrói.

| o que você quer saber | quem manda |
| --- | --- |
| como a tela parece hoje | **o protótipo**, com o vidro ligado, e as fotos dele: `06-prototipo/fotos/escuro/` e `06-prototipo/fotos/claro/`, uma por estado (145 em cada tema) |
| o que a tela diz, letra por letra | o `textos.md` da tela, em `02-telas/` |
| como a tela se comporta | o `tela.md` e o `estados.md` da tela, e `01-produto/regras.md` |
| as medidas e as posições | a referência em HTML, em `02-telas/T0x/referencias/html/`, **nas telas que não mudaram** |
| o material (o vidro, as cores do fundo) | `03-design-system/vidro/` e `vidro-por-plataforma.md` |
| os tokens | `03-design-system/tokens.json` |

**As referências desenhadas (`referencias/png/`) são sólidas e 77 das 145 mostram conteúdo de antes.** Elas foram o ponto de partida do protótipo e continuam valendo para a medida e a posição do que não mudou. As 49 estão listadas, com o que mudou em cada uma, em `06-prototipo/fotos/fidelidade/a-redesenhar.json`: 27 do Início (T05), 6 do Código (T02), 6 das Paradas (T06), 4 do Mapa (T07) e 6 das Notificações (T09). Nessas, vale a foto do protótipo e o `textos.md`.

**Quando duas fontes discordarem:** o `textos.md` ganha no texto, o protótipo ganha na aparência, `regras.md` ganha no número. Se ainda assim sobrar dúvida, é um achado: pergunte, não escolha em silêncio.

Cada estado abre por link no protótipo (`?ref=T05-12`, com `&tema=claro` ou `&tema=escuro`), então dá para ver a tela exata rodando.

## O mapa é decorativo

O mapa do protótipo é um desenho, feito só para a tela ter um fundo: o produto vai usar outro mapa, de verdade. **Do mapa, não se leva o desenho** (as ruas, as quadras, o rio, os nomes de bairro, as cores do terreno). **Leva-se o que fica por cima dele:** o marcador do ônibus, o do ponto da pessoa, os das paradas, o traço da rota, o título, os controles e o painel, com o que cada um diz e faz (`02-telas/T07-mapa/`). O estilo do mapa de verdade só precisa ser discreto o bastante para essas peças e os textos continuarem lendo.

**A bússola é a do mapa.** O protótipo não desenha bússola: o mapa dele não gira. No produto, se o mapa girar, vale a bússola do próprio mapa (a que aparece só com o mapa girado e volta ao norte no toque), no tamanho do sistema.

## O que tem aqui

| arquivo | o que diz |
| --- | --- |
| `stack.md` | a stack recomendada, com o porquê, e o que muda conforme a escolha |
| `api.md` | o contrato com o servidor, em proposta: o que cada tela lê e envia, a posição do ônibus e os avisos |
| `vidro-por-plataforma.md` | o vidro no iOS 26, no iOS antigo e no Android: o que é do sistema, o que se constrói e o que vira sólido |
| `vidro.md` | o vidro no protótipo: onde está cada coisa e as armadilhas do vidro |
| `simulado.md` | o que o protótipo simula (o servidor, o ônibus, o celular e o tempo): quem constrói o produto não copia a simulação |
| `testes-prontos.md` | as conferências do protótipo e o roteiro que serve de teste de aceite do produto |
| `conferir-contra-o-design.md` | como comparar cada tela construída com o desenho |
| `pendencias.md` | o que falta decidir, e a nota sobre o campo do código |

## Por onde começar

1. `01-produto/`, inteiro: o produto, o usuário, as histórias, os fluxos e as regras.
2. Este arquivo, `stack.md` e `api.md`.
3. `simulado.md`, para saber o que no protótipo é de mentira.
4. `02-telas/`, tela por tela: a ficha, os estados, os textos exatos e o movimento, com o protótipo aberto ao lado.
5. `03-design-system/`: os tokens, as leis, as peças; e `vidro-por-plataforma.md`.
6. `conferir-contra-o-design.md` e `testes-prontos.md`, antes de dar uma tela por pronta.

## O que se leva e o que não se leva

- **Leva-se:** o comportamento, os textos, os tokens, as medidas, quais peças são vidro e em que nível, a receita do vidro por plataforma e as regras de contraste (4,5:1, medido).
- **Não se leva:** a simulação, o palco, o CSS do vidro e as cadeias de filtro da biblioteca web.
