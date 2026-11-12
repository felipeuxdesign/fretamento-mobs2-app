# O dado

| arquivo | o que é |
| --- | --- |
| `contrato.md` | o contrato do dado: o que o app recebe e o que cada campo quer dizer |
| `mock.json` | o dado de exemplo: a Ana, a Linha 210, o dia 27/10/2026 |
| `casos.json` | os 145 casos, um por referência: o estado é o app com o dado daquele caso |
| `conferir.mjs` | a conferência: o censo, os casos, o mock e o dia |

`node 04-dados/conferir.mjs`, a partir da raiz, tem de aprovar antes de qualquer tela. Nenhum número é digitado no protótipo: todo valor sai do mock ou do caso.
