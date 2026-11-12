# O contrato com o servidor: uma proposta

**Isto é uma proposta do design, para o backend validar.** Ela diz o que cada tela precisa receber e enviar, com os nomes do `04-dados/mock.json`. Os caminhos e os formatos são sugestão; o que não pode mudar é o que a tela precisa saber. Onde o backend decidir diferente, este arquivo muda junto.

As regras e os números estão em `01-produto/regras.md`. O exemplo de cada resposta é o próprio `mock.json`.

## Entrar

| ação | proposta | o que a tela precisa |
| --- | --- | --- |
| pedir o código | `POST /acesso/codigo` com o e-mail ou o celular | **sempre a mesma resposta**, exista o contato ou não: o app nunca diz se o contato está cadastrado. O reenvio libera aos 60 s |
| validar o código | `POST /acesso/sessao` com o contato e os 6 dígitos | sessão aberta, ou um destes motivos: `incorreto` (com as tentativas que restam), `expirado`, `bloqueado` (com a hora em que libera: 5 erros bloqueiam por 15 min), `sem-acesso` (o código vale, mas o cadastro não foi liberado: vem o contato do RH) |
| manter a sessão | o token da sessão, renovado ao abrir o app | expira com 30 dias sem abrir; a volta pede um código novo |
| encerrar | `DELETE /acesso/sessao` | sair da conta |
| cadastro encerrado | qualquer chamada devolve `cadastro-encerrado` | a T04, com o contato do RH, e a sessão é encerrada |

## O que o app lê

| recurso | proposta | campos (os do mock) |
| --- | --- | --- |
| a pessoa | `GET /eu` | `nome`, `saudacao`, `email` e `celular` (inteiros, só depois do login), `desbloqueio`, `avisoDeChegadaMin`, `avisoDeSaida`, `aparencia` |
| a empresa e quem resolve | junto com `/eu` | `empresa.nome`, `empresa.rh` e `transportadora`: `nome`, `resolve`, `canal`, `numero`, `horario` |
| o que o contrato permite | junto com `/eu` | `contrato.contagem`, `contrato.trocaDePonto`, `contrato.cracha`: desligado, a tela esconde a função |
| as viagens do dia | `GET /viagens?dia=AAAA-MM-DD` | por viagem: `id`, `sentido`, `rotulo`, `sai`, `passaNoSeuPonto`, `chega`, `habitual`, o estado (`programada`, `em-rota`, `concluida`, `cancelada`, com o motivo) e a linha (`numero`, `nome`) |
| uma viagem, ao vivo | `GET /viagens/{id}` | o ônibus (`prefixo`, `placa`, e se foi trocado, o de antes), as paradas e a posição (abaixo) |
| as paradas da viagem | dentro da viagem | por parada: `id`, `nome` (ou vazio, se for parada sem nome), `tipo`, `programado`, `previsto`, `previstos` (a contagem), se já passou e a que horas, e se é o ponto da pessoa |
| as notificações | `GET /notificacoes` | por aviso: `tipo`, `titulo`, `texto`, a data e a hora, `lida`, e para onde o toque leva |

**Duas regras de privacidade moram no servidor, e não no app:**
- **Parada sem nome.** Uma parada só mostra o nome com 2 ou mais passageiros vinculados ou com referência pública. Para as outras, o servidor **não manda o nome**: o app só sabe quantas são, para escrever "2 outras paradas".
- **Contagem.** Abaixo de 2 previstos, o servidor manda "até 1", nunca o número. Na volta, a contagem só vem no ponto da pessoa.

## A posição do ônibus

É o dado que decide o selo do herói (Ao vivo, Aproximado, Sem sinal, Programado).

| o quê | proposta |
| --- | --- |
| o que vem | onde o ônibus está na linha (entre quais paradas, ou parado em qual), a latitude e a longitude para o mapa, o `previsto` de cada parada à frente, o atraso ou o adiantamento em minutos e **a hora em que a posição foi captada** |
| de quanto em quanto tempo | a cada 15 s ou menos, durante a janela ao vivo. O app precisa notar um dado parado há 1,5 min: com um intervalo maior que 30 s, o "Aproximado" aparece por engano |
| como chega | por conexão aberta (o servidor empurra) ou por consulta a cada 15 s. A tela é a mesma nos dois casos |
| quem calcula a idade | **o app**, com a hora da captação: passou de 1,5 min, "cerca de" e o selo Aproximado, com a idade; passou de 3 min, Sem sinal, e a tela recua para o programado com o último atraso conhecido |
| quem calcula a previsão | **o servidor**. O app só mostra o `previsto` e faz a conta do relativo ("18 min") contra o relógio do celular |
| fora do trajeto | um sinal de `em-desvio`: a tela diz que a previsão é aproximada |
| a janela | de 30 min antes da saída até 10 min depois da chegada. Fora dela, o servidor não manda posição, e a tela mostra só o programado |

**O relógio.** O relativo é a hora prevista menos o agora do celular. Se o relógio do celular estiver errado, o número erra junto: a resposta deve trazer a hora do servidor, para o app corrigir a diferença.

## O que o app envia

| ação | proposta | o que volta |
| --- | --- | --- |
| Embarquei | `POST /viagens/{id}/embarque` | a hora registrada (`Embarcou às 06:44`) |
| Não embarquei | `DELETE /viagens/{id}/embarque` | o estado de antes |
| Não fui eu (crachá lido) | `POST /viagens/{id}/embarque/contestacao` | o embarque marcado como contestado |
| embarcar em outro ponto hoje | `PUT /viagens/{id}/ponto` com a parada | o ponto de hoje, ou o motivo da recusa (em cima da hora: 3 min de margem; viagem cancelada; já embarcou) |
| voltar ao ponto de sempre | `DELETE /viagens/{id}/ponto` | o ponto de sempre |
| os avisos | `PUT /eu/avisos` com `avisoDeChegadaMin` (5, 10 ou 15, ou desligado) e `avisoDeSaida` | as escolhas gravadas |
| o desbloqueio e a aparência | ficam no celular | nada vai ao servidor |
| marcar avisos como lidos | `POST /notificacoes/lidas` | a contagem do sino |
| pedido sobre os dados | `POST /eu/pedidos` com o tipo (`ver`, `corrigir`, `apagar`) e o texto | o protocolo e o prazo (15 dias) |
| excluir a conta | `DELETE /eu` | a sessão encerrada. O cadastro no transporte fica, porque é da empresa |
| o endereço de aviso do celular | `PUT /eu/aparelho` com o token de notificação | nada |

## Os avisos que chegam com o app fechado

| tipo | quando | a pessoa pode desligar? | o toque abre |
| --- | --- | --- | --- |
| `saiu` | o ônibus saiu do primeiro ponto | sim (`avisoDeSaida`) | o Início |
| `chegando` | faltam 5, 10 ou 15 min para o ponto dela (`avisoDeChegadaMin`) | sim | o Início |
| `atraso` | a previsão passou da tolerância de 3 min | não | o Início |
| `troca` | a transportadora trocou o ônibus: vai a placa nova | não | o Início |
| `cancelada` | a viagem foi cancelada: vai o motivo e a próxima viagem | não | o Início |
| `comunicado` | recado da transportadora | não | as Notificações |
| `cadastro` | o ponto ou a linha mudou no cadastro | não | o Perfil |

- **O que vai no aviso:** o `tipo`, o `titulo` e o `texto` prontos (os textos exatos estão no `02-telas/T09-notificacoes/textos.md`), a viagem e a hora.
- **Antes do login, nada da pessoa.** Com a tela bloqueada, o aviso não leva nome nem empresa.
- **O `troca` está descrito na T11** como aviso que não se desliga, mas não aparece entre os exemplos do mock: precisa de um texto fechado.

## Quando dá errado

| o que acontece | o que a tela precisa saber |
| --- | --- |
| sem internet no celular | o app mostra o que já tinha, com a hora do dado, e diz o que fica indisponível |
| o servidor não responde | o mesmo que sem internet, com a ação de tentar de novo |
| a ação foi recusada | o motivo em uma palavra (`em-cima-da-hora`, `viagem-cancelada`, `ja-embarcou`): o texto é do app, não do servidor |
| a sessão expirou | o Entrar, com o contato de antes |

O erro fica no lugar da ação e diz o que fazer (lei 7). O servidor manda o motivo; quem escreve a frase é o app, com os textos do `textos.md` de cada tela.

## O que falta fechar com o backend

- os caminhos e o formato de verdade (isto é proposta);
- consulta ou conexão aberta para a posição;
- o texto do aviso de troca de ônibus;
- o que o app guarda no celular para funcionar sem internet, e por quanto tempo;
- a contagem "até 1": confirmar que o servidor nunca manda o número abaixo de 2.
