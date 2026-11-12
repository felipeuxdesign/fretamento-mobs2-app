# Histórias do usuário

São 15 histórias em 7 jornadas, todas do passageiro. Cada uma aponta as telas que a atendem e os critérios de aceite que o desenho já cobre.

### Entrar e preparar o app

**US-01 · Entrar sem senha** (T01, T02)

*Como passageiro, quero entrar com o e-mail ou o celular que a empresa cadastrou, para não precisar criar nem lembrar uma senha.*

- "Receber código" manda 6 números por e-mail ou SMS, e o teclado oferece o código quando ele chega.
- O app nunca diz se o contato existe; "Não recebi convite" explica como ganhar acesso.
- Aos 60 s, o reenvio libera junto com a dica de conferir o spam. O erro diz quantas tentativas restam, e 5 erros bloqueiam por 15 min.
- Código certo com o acesso ainda não liberado: aparece o contato do RH, com o horário.

**US-02 · Preparar o app no primeiro acesso** (T03)

*Como passageiro no primeiro acesso, quero entender o que o app faz com meus dados e decidir sobre avisos e proteção, para começar a usar sem surpresa.*

- A tela aparece uma vez, logo depois do código, antes de qualquer viagem.
- Quatro frases sobre os dados, com o aviso de privacidade e os termos a um toque.
- Os avisos vêm ligados, e o app explica o que vai avisar antes de o celular perguntar. A proteção vem desligada.
- "Começar" aceita os termos. Dizer não a avisos ou proteção não impede de seguir.

**US-03 · Proteger o app** (T04, T12)

*Como passageiro, quero que o app peça a digital ou o rosto ao abrir, para que ninguém veja minha viagem no meu celular.*

- Nada da viagem aparece atrás do pedido, que volta depois de 5 min fora do app.
- Se a biometria do celular mudou, ou depois de 30 dias sem abrir, o app pede o código de novo.
- Desligar o desbloqueio explica o risco antes; ligar pede a digital antes.
- Cadastro encerrado pela empresa ou pela transportadora: o app diz o que aconteceu e dá o contato do RH.

### Acompanhar a viagem

**US-04 · Saber quando o ônibus passa** (T05)

*Como passageiro, quero ver quanto falta para o ônibus passar no meu ponto, para ir para o ponto na hora certa.*

- O Início abre na viagem de sempre, com os minutos em número grande e o horário ao lado.
- Antes de o ônibus sair, o número é o horário programado, e o cartão diz quando a previsão ao vivo começa.
- Atraso além da tolerância de 3 min mostra "Atrasado N min" e a nova previsão. Adiantado pede para ir ao ponto agora.
- Depois que o ônibus passa no ponto, o número vira a chegada na fábrica.

**US-05 · Saber se posso confiar no número** (T05, T06, T07)

*Como passageiro, quero saber de onde vem a previsão, para decidir se saio com folga.*

- O selo colado no número diz: ao vivo, aproximado, programado ou sem sinal.
- Posição parada entre 1,5 e 3 min, ou ônibus fora do trajeto: "cerca de" e o selo Aproximado, com a idade do dado.
- Mais de 3 min sem posição: o app recua para o programado e diz o último atraso conhecido.
- Celular sem internet: a previsão congela e diz a hora em que foi feita.

**US-06 · Entrar no ônibus certo** (T05)

*Como passageiro, quero ver a placa e o número do ônibus quando ele está chegando, para não entrar no ônibus errado.*

- A menos de 2 min do ponto, o cartão muda de forma e destaca a placa.
- Ônibus trocado: o app avisa e mostra a placa nova.
- Viagem sem veículo definido: "ônibus a definir", e o app avisa quando ele sair.

**US-07 · Ver as paradas e o mapa** (T06, T07)

*Como passageiro, quero ver onde o ônibus está na linha, para entender quanto falta e por onde ele vem.*

- Paradas: a viagem inteira num trilho, com o ônibus entre as paradas, o meu ponto com halo e o destino.
- Mapa: o ônibus é o único ponto brilhante; tocar nele mostra a placa e a idade do dado.
- Tocar numa parada mostra a previsão e "Embarcar aqui hoje".
- A contagem de quem embarca é de previstos; abaixo de 2 vira "até 1 pessoa", para ninguém ser identificado.

### Embarcar

**US-08 · Registrar o embarque** (T05)

*Como passageiro, quero registrar que embarquei, para a transportadora saber que estou a bordo.*

- Embarquei aparece quando o ônibus está chegando, parado no ponto ou acabou de passar.
- O crachá lido no ônibus registra o embarque sozinho.
- "Não fui eu" fica sempre visível e deixa o embarque contestado.
- Crachá lido em outro ônibus: o app pergunta "Fui eu" ou "Não fui eu".

**US-09 · Ter saída quando a viagem falha** (T05, T08)

*Como passageiro, quero saber o que fazer quando perco o ônibus ou a viagem é cancelada, para ainda chegar ao trabalho.*

- Ônibus passou sem embarque: o cartão oferece "Perdeu o ônibus? Ver pontos à frente".
- Viagem cancelada: o cartão traz o aviso da transportadora e leva à próxima viagem mantida.
- A viagem cancelada também leva ao Preciso de ajuda.

### Trocar de ponto hoje

**US-10 · Embarcar em outro ponto hoje** (T08, T05)

*Como passageiro, quero escolher outro ponto só para a ida de hoje, para embarcar onde eu estiver.*

- A lista mostra os pontos à frente do ônibus com a previsão, quantas pessoas embarcam e, com permissão, os minutos a pé.
- Ponto indisponível diz por quê, como "passa em 2 min: não dá tempo de avisar a transportadora".
- O botão só acende com um ponto diferente do de hoje; a confirmação diz que a transportadora fica sabendo.
- No Início, o cartão da troca mostra o ponto de hoje e o de sempre, com "Voltar ao ponto de sempre".

### Avisos

**US-11 · Ser avisado sem olhar o app** (T09, T11)

*Como passageiro, quero ser avisado quando o ônibus sai, quando está chegando e quando algo muda, para não ficar olhando o app.*

- Aviso de chegada a 5, 10 ou 15 min e aviso de saída; os dois podem ser desligados.
- Atrasos, trocas, cancelamentos e comunicados chegam sempre, porque sem eles a pessoa perde o ônibus.
- As notificações ficam por dia, cada uma com a cor do estado; tocar num aviso de viagem abre o Início.
- Permissão do celular negada: banner com "Ativar", que abre os ajustes.

### Pedir ajuda

**US-12 · Saber com quem falar** (T10)

*Como passageiro, quero saber quem resolve cada problema, para não ficar sem resposta.*

- RH e transportadora, cada um com o que resolve, o contato e o horário, vindos do cadastro da empresa.
- Botões de ligar e de abrir o WhatsApp.
- As três perguntas de todo dia, com a resposta de quem resolve.
- Abre pelo Perfil, pelo Início e pela viagem cancelada. Antes do login, a ajuda é genérica, sem contato.

### Conta e dados

**US-13 · Conferir o que a empresa cadastrou** (T10)

*Como passageiro, quero ver meus dados e minhas linhas, para saber se está tudo certo.*

- Nome, empresa, transportadora, e-mail e celular, só leitura.
- Minhas linhas com a ida, a volta, o ponto de sempre e o horário, e a nota de que mudar é com o RH.
- Aparência em três opções: claro, escuro e sistema.

**US-14 · Cuidar dos meus dados** (T12)

*Como passageiro, quero pedir para ver, corrigir ou apagar meus dados, para exercer meus direitos sem sair do app.*

- Meus dados diz que o pedido vai para a transportadora, com prazo de 15 dias.
- O pedido tem três tipos e um campo livre; escolher apagar mostra que isso encerra o fretado.
- Registrado, o pedido mostra o protocolo e fica em andamento em Meus dados.
- O aviso de privacidade e os termos são curtos, na linguagem do app.

**US-15 · Sair ou excluir a conta** (T10, T13)

*Como passageiro, quero sair ou excluir minha conta, para encerrar o uso do app quando quiser.*

- Sair pede confirmação, porque a volta exige um código novo.
- Excluir diz o que some (acesso, preferências e avisos) e o que fica (o cadastro no transporte, que é da empresa).
- Confirmada, a exclusão leva ao Entrar; dá para entrar de novo se o contato continuar cadastrado.
