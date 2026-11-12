# Regras de negócio, segurança e privacidade

Os limites de tempo abaixo decidem o que o passageiro vê; os de segurança e privacidade decidem o que o app guarda e mostra.

### Tempo e previsão

| Regra | Valor | O que o app faz |
| --- | --- | --- |
| Tolerância | 3 min | Até 3 min de diferença é "No horário". Além disso, "Atrasado" ou "Adiantado" com os minutos |
| Minutos ou horário | 30 min | Até 30 min, o número grande mostra os minutos; acima disso, mostra o horário |
| Chegando | menos de 2 min do ponto | O cartão muda de forma, destaca a placa e libera o Embarquei |
| Janela ao vivo | de 30 min antes da saída até 10 min depois da chegada | Antes dela, só o horário programado, sem ônibus no trilho nem no mapa |
| Dado antigo | posição parada há mais de 1,5 min | "cerca de" e o selo Aproximado, com a idade do dado |
| Sem sinal | mais de 3 min sem posição | Recua para o programado e diz o último atraso conhecido |
| Troca de ponto | 3 min de margem | Só na viagem prevista de hoje, não cancelada e sem embarque. Ponto em cima da hora fica indisponível, com o motivo escrito |

### Acesso e segurança

| Regra | Como funciona |
| --- | --- |
| Código de acesso | 6 números por e-mail ou SMS. Aos 60 s, o reenvio libera junto com a dica de conferir o spam. Não existe senha |
| Tentativas | 5 códigos errados bloqueiam por 15 min |
| Contato no Entrar | O app nunca diz se o e-mail ou o celular existe no cadastro |
| Sessão | Expira depois de 30 dias sem abrir o app; a volta pede um código novo |
| Desbloqueio | Opcional, com digital, rosto ou senha do celular. Pede de novo depois de 5 min fora do app |
| Biometria do celular mudou | O app pede o código de novo e oferece religar o desbloqueio |
| Cadastro encerrado | Ao abrir, o app diz o que aconteceu, dá o contato do RH e encerra a sessão |

### Privacidade e dados

| Regra | Como funciona |
| --- | --- |
| Localização | Só quando a pessoa pede, com o app aberto. Uma explicação vem antes do pedido do celular |
| Nome de parada e troca | Uma parada só mostra o nome, e só aceita troca, com 2 ou mais passageiros vinculados ou com referência pública. As outras aparecem agrupadas, como "2 outras paradas"; o ponto da própria pessoa sempre aparece (parecer de compliance §11.5) |
| Contagem no ponto | É de previstos, não de quem embarcou. Abaixo de 2 vira "até 1 pessoa"; na volta, só aparece no ponto da pessoa |
| Pedidos sobre os dados | Ver, corrigir ou apagar. Vão para a transportadora, responsável pelos dados, com prazo de 15 dias |
| Apagar o cadastro no transporte | Encerra o fretado, e o app avisa antes de enviar |
| Excluir a conta | Some o acesso, as preferências e os avisos. O cadastro no transporte fica, porque é da empresa |
| Cadastro | Nada se edita no app. Nomes e contatos de cada empresa vêm do cadastro, e o texto é um só para todas |

### Avisos

| Regra | Como funciona |
| --- | --- |
| Uma vez por viagem | Cada aviso sai uma vez só para cada viagem |
| Chegada e atraso | Só saem antes do embarque e com o dado ao vivo; sem sinal ou no recuo para o programado, ficam calados. O de atraso sai quando passa da tolerância de 3 min |
| Cancelamento | Com a viagem cancelada, só o aviso do cancelamento sai |
| Sempre avisados | Atrasos, trocas, cancelamentos e comunicados não se desligam (RN-24) |

### Contrato e vínculo

| Regra | Como funciona |
| --- | --- |
| Vínculo | A pessoa é vinculada a um itinerário (linha e sentido) e a um ponto. O app lista as viagens regulares desses itinerários na escala do dia |
| Horário habitual | Opcional. Com ele, a pessoa entra na contagem só daquela viagem; sem ele, na próxima viagem regular |
| Recursos do contrato | A contagem de pessoas, a troca de ponto e o embarque por crachá podem vir desligados no contrato da empresa |
| Ônibus da viagem | Sem vínculo aberto entre o veículo e a viagem, o app mostra "ônibus a definir" (RN-30) |
| Saída e retorno da garagem | Os deslocamentos do ônibus entre a unidade operacional e a linha nunca aparecem para o passageiro: ele só vê a viagem regular |
| Crachá antes da viagem abrir | A leitura fica provisória por 15 min e não aparece no app |
