# As 13 telas

O Início (T05) concentra a viagem: tem 9 quadros, que contam o dia na ordem, e 23 dos 75 estados, quase um terço do total. As outras telas são entrada, consulta ou desvio, a um toque dele.

| Tela | Grupo | O que resolve | Quadros | Estados |
| --- | --- | --- | --- | --- |
| **T01 · Entrar** | Autenticação · desvio | Entrar com o e-mail ou o celular que a empresa cadastrou, sem senha | 4 | 3 |
| **T02 · Digite o código** | Autenticação · desvio | Confirmar o acesso com 6 números, com reenviar, trocar o contato e ajuda à vista | 3 | 5 |
| **T03 · Preparar o app** | Primeiro acesso · desvio | Combinar dados, avisos e proteção numa tela só, uma vez | 3 | 3 |
| **T04 · Bloqueado** | Reabertura · caminho | Pedir a digital ou o rosto ao reabrir e dizer por que está bloqueado | 2 | 5 |
| **T05 · Início** | Viagem · caminho | Responder quando o ônibus passa, qual é e se dá para confiar | 9 | 23 |
| **T06 · Paradas da viagem** | Viagem · consulta | Mostrar a viagem inteira num trilho, com o ônibus onde está | 9 | 6 |
| **T07 · Mapa** | Viagem · consulta | Mostrar o ônibus como único ponto brilhante sobre o mapa | 12 | 7 |
| **T08 · Outro ponto hoje** | Viagem · desvio | Trocar o ponto só hoje, com a razão de cada ponto estar ou não disponível | 6 | 4 |
| **T09 · Notificações** | Avisos · consulta | Guardar os avisos por dia, cada um com a cor do estado | 3 | 5 |
| **T10 · Perfil** | Conta · consulta | Mostrar o que é da pessoa e não da viagem, e com quem falar | 4 | 2 |
| **T11 · Avisos** | Avisos · consulta | Escolher os avisos de chegada (5, 10 ou 15 min) e de saída | 2 | 2 |
| **T12 · Privacidade** | Conta · consulta | O desbloqueio, os textos legais e os pedidos sobre os dados | 10 | 7 |
| **T13 · Excluir conta** | Conta · desvio | Dizer o que some e o que fica antes de excluir | 3 | 3 |
| **Total** |  |  | **70** | **75** |

Como ler as contagens:

- **Quadro** é a tela como ela abre e os momentos aonde se chega tocando, no caminho feliz.
- **Estado** é o que o mundo decide: o ônibus, a rede, o servidor, o dado. No protótipo, os estados entram pelo palco, não tocando na tela.
- **Caminho** é o dia de quem já entrou; **consulta** abre por um toque a partir do Início; **desvio** é o que fica fora do caminho feliz.

Cada tela tem a sua ficha em `02-telas/`, com o exemplo e a tabela de quadros e estados, um por um.

### Do wireframe do PM às 13 telas

O wireframe do PM tinha 23 telas, e nenhuma ficou de fora: as de um quadro só viraram momento da tela de onde se chega, e o que o servidor decide virou estado.

| No wireframe do PM | No desenho |
| --- | --- |
| `entrar` | T01 · Entrar |
| `codigo`, `acesso-negado` | T02 · Digite o código; o acesso negado é um estado |
| `antes`, `avisos-pre`, `proteger` | T03 · Preparar o app, numa tela só; religar a proteção depois que a segurança muda é um sheet no Início (T05-30) |
| `bloqueado`, `acesso-encerrado` | T04 · Bloqueado; o acesso encerrado é um estado |
| `home` | T05 · Início |
| `paradas` | T06 · Paradas da viagem |
| `mapa` | T07 · Mapa |
| `troca` | T08 · Outro ponto hoje |
| `notificacoes` | T09 · Notificações |
| `perfil` | T10 · Perfil |
| `pref-avisos` | T11 · Avisos |
| `privacidade`, `aviso-privacidade`, `termos`, `meus-dados`, `pedido`, `pedido-ok` | T12 · Privacidade |
| `excluir`, `conta-excluida` | T13 · Excluir conta |
