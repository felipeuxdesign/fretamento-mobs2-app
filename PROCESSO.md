# O método

Como este projeto foi feito: um designer dirigindo um agente de IA (Claude Code), a partir de um desenho já fechado.

## A ordem

1. **O produto primeiro.** O problema, o usuário, as histórias, os fluxos e as regras de negócio (`01-produto/`).
2. **O desenho fechado.** As 13 telas, com cada momento e cada estado desenhados em 390 × 844, e o design system em folhas (`02-telas/`, `03-design-system/`).
3. **O dado de exemplo.** Um mock e um caso por referência: o estado é o app com o dado daquele caso, nunca uma tela desenhada à parte (`04-dados/`).
4. **O protótipo.** O app inteiro, navegável, dentro de um palco, construído peça por peça e medido contra as referências (`06-prototipo/`).
5. **O vidro.** O Liquid Glass da biblioteca GlassyUI, peça por peça, com volta (`03-design-system/vidro/`).
6. **O handoff.** O que é de mentira, o que falta decidir e o que se leva para o produto (`08-handoff/`).

## As regras de quem constrói

Estão no [`CLAUDE.md`](CLAUDE.md) e no [`06-prototipo/CLAUDE.md`](06-prototipo/CLAUDE.md). Em resumo:

- **Construir o que está descrito, não redesenhar.** Se algo parecer errado, medir, provar e escrever a proposta.
- **Medir antes de afirmar.** "Está igual" é uma foto comparada; "passa" é um número medido na tela.
- **Desvio com nome, nunca em silêncio.** Tudo o que ficou diferente do descrito entra no [`CHANGELOG.md`](CHANGELOG.md), com o porquê.
- **A documentação segue o código, no mesmo passo.**
- **Mesma entrada, mesma saída.** O relógio é fixo, e nada é sorteado.

## Como se confere

Dezoito conferências rodam com um comando (`npm run conferir`, em `06-prototipo/app`): o dado, o relógio, a fidelidade, os textos, as cores, os tocáveis, os endereços, as cinco do vidro, o claro, o escuro, o que se toca, o roteiro, o fechamento e o build. O que cada uma cobra está em [`06-prototipo/fidelidade.md`](06-prototipo/fidelidade.md).

## Como as decisões ficam

Uma decisão por arquivo, em [`07-decisoes/`](07-decisoes/README.md): o contexto, a decisão e a consequência. As versões, com o que mudou em cada uma, estão no [`CHANGELOG.md`](CHANGELOG.md).
