# App Passageiro Fretamento

O app de quem vai de fretado para o trabalho. Ele diz, num relance, quando o ônibus passa no seu ponto, em qual ônibus entrar e se a previsão é confiável.

Esta pasta é a fonte da verdade do app: o produto, as 13 telas desenhadas, o design system, o dado de exemplo e as regras para construir o protótipo navegável. O protótipo é construído a partir dela. Se o protótipo divergir da pasta, quem está errado é ele.

## Por onde começar

**Se você vai construir o protótipo**, nesta ordem:

1. `CLAUDE.md`, as regras de quem trabalha nesta pasta
2. `01-produto/produto.md`, `usuario.md`, `fluxos.md` e `regras.md`
3. `02-telas/T00-inventario/`, o mapa das 13 telas
4. `04-dados/contrato.md` e `04-dados/mock.json`
5. `03-design-system/`: `leis.md`, `tokens.css`, `componentes.md`, `movimento.md`, as folhas e os ícones
6. **`03-design-system/vidro/`, inteira**: o Liquid Glass
7. `06-prototipo/CLAUDE.md`, `palco.md` e `fidelidade.md`
8. `02-telas/`, tela por tela: `tela.md`, `estados.md`, `textos.md`, `animacao.md` e **cada referência aberta**
9. `07-decisoes/` e `08-handoff/`

**Se você vai construir o produto real**: `01-produto/` inteiro, `08-handoff/` (o que o protótipo simula, as pendências, a stack), `04-dados/contrato.md` e depois as telas.

**Se você só quer entender**: `01-produto/produto.md`, `01-produto/telas.md` e `02-telas/T00-inventario/T00-inventario.png`.

## O mapa da pasta

| pasta | o que tem |
| --- | --- |
| `01-produto/` | o produto, o usuário, as 15 histórias, os fluxos, as regras de negócio, o glossário e o que mudou do wireframe do PM |
| `02-telas/` | o inventário (T00) e uma pasta por tela, da T01 à T13: a ficha, a tabela de quadros e estados, os textos exatos, o movimento e as referências em HTML e PNG |
| `03-design-system/` | os tokens, as leis, as peças, o movimento, os ícones, as 12 folhas desenhadas (HTML, PNG e texto), as 9 folhas de vidro tiradas do protótipo e o vidro |
| `04-dados/` | o contrato do dado, o mock, os 145 casos e a conferência |
| `05-recursos/` | a fonte Inter, a marca e os 64 ícones |
| `06-prototipo/` | a lei do protótipo, o palco, a fidelidade, o app, as conferências e as fotos |
| `07-decisoes/` | uma decisão por arquivo |
| `08-handoff/` | qual desenho manda, a stack recomendada, o contrato com o servidor em proposta, o vidro por plataforma, o que o protótipo simula, os testes prontos e como conferir contra o desenho |

Na raiz: o `README.md` (o projeto em uma página), o `PROCESSO.md` (o método), o `CHANGELOG.md` (as versões), o `CLAUDE.md` (as regras de quem trabalha na pasta) e o `LICENSE`.

## As três fontes, e quem ganha

- **A referência** (`02-telas/.../referencias/`) diz como parece.
- **O mock** (`04-dados/`) diz o que aparece.
- **A documentação** (`tela.md`, `estados.md`, as leis, `01-produto/`) diz por quê.

Quando discordam: o mock ganha no dado, a referência ganha na aparência, e a divergência ganha nome no `CHANGELOG.md`. Ninguém corrige em silêncio.

**A exceção é o vidro.** As referências foram desenhadas com superfícies sólidas, porque a ferramenta de desenho não consegue mostrar o vidro. Nas peças que viram vidro, a referência manda no texto, na posição e no que a peça faz, e `03-design-system/vidro/` manda no material e na forma: de vidro, a peça é o componente da biblioteca, no tamanho do app. Com o vidro desligado, tudo volta a ser igual à referência.

## Os números

| | |
| --- | --- |
| telas | 13 |
| referências | 145: 13 telas, 59 momentos e 73 estados |
| no canvas, por section | 70 quadros e 75 estados |
| histórias | 15, em 7 jornadas |
| tokens | 47 cores (nos dois temas), 9 estilos de texto, 9 espaços, 5 raios, 5 medidas e 2 sombras |
| ícones | 64 |
| folhas do design system | 12 |
| peças de vidro | 17 |

## O exemplo que atravessa tudo

Terça, 27/10/2026, 06:24. Ana Souza, da Metalúrgica Alfa, vai de fretado da Rota Sul Transportes, na Linha 210 · Macaxeira – Fábrica. A ida de sempre sai às 06:05, passa no ponto dela (Av. Abdias de Carvalho, 1200) às 06:42 e chega na Fábrica – Portaria 2 às 07:15. O ônibus é o 1234, placa ABC1D23.
