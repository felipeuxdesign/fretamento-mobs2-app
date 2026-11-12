# O produto

## Em um minuto

O App Passageiro Fretamento diz, num relance, quando o fretado passa no ponto, em qual ônibus entrar e se dá para confiar nesse número.

- **O problema:** quem vai de fretado para o trabalho espera no ponto sem saber onde o ônibus está, se atrasou, se trocou de veículo ou se a viagem foi cancelada.
- **Pra quem é:** o passageiro, quem trabalha na empresa que contrata o fretamento. Uma pessoa que não é técnica e quer a resposta sem precisar procurar.
- **A solução:** uma tela central, o Início, com o número grande de quando o ônibus passa e o selo que diz de onde vem esse número. Todo o resto fica a um toque.
- **O dado:** o ônibus manda a posição pelo módulo de rastreamento da MOBS2. A empresa cadastra quem usa o app, a linha e o ponto de cada um.
- **O tamanho:** 13 telas, 70 quadros e 75 estados desenhados em 390 × 844, com um desenho só para iOS e Android.
- **Onde está:** o desenho está fechado, e o protótipo navegável em código, com o Liquid Glass, está em https://fretamento-mobs2-prototipo.vercel.app. As telas, o design system e o handoff estão neste repositório.

## O problema

O fretado tem linha, ponto e horário fixos, mas o ônibus de verdade não segue o papel: atrasa, adianta, troca de veículo, sai do trajeto ou é cancelado.

As empresas contratam uma transportadora para levar e trazer quem trabalha nelas. Cada pessoa tem a sua linha, o seu ponto de sempre e os horários de ida e de volta. Só com o horário fixo, quem está no ponto fica com três perguntas sem resposta:

1. **Quando o ônibus passa no meu ponto?** O horário do cadastro não diz se hoje ele vem 8 min atrasado ou 4 min adiantado.
2. **Qual é o ônibus?** Quando a transportadora troca o veículo, a placa que a pessoa conhece não aparece.
3. **Dá para confiar nesse número?** Uma previsão sem origem engana: a posição do ônibus pode ter parado de chegar há minutos.

Cada coisa que acontece com o ônibus vira uma dúvida diferente para quem espera:

| O que acontece | O que a pessoa precisa saber |
| --- | --- |
| O ônibus atrasa ou adianta | A que horas ele passa de verdade no ponto |
| A transportadora troca o veículo | Qual é a placa de hoje |
| O ônibus sai do trajeto previsto | Se a previsão ainda vale |
| A posição para de chegar | Que o número ficou velho, e desde quando |
| A viagem é cancelada | O motivo e qual é a próxima viagem |
| O ônibus passa do ponto sem ela | Em qual ponto à frente ainda dá para pegar |
| Ela precisa embarcar em outro lugar hoje | Quais pontos ainda dá tempo de escolher |

E quando algo dá errado, ela precisa saber a quem recorrer. O RH cuida do cadastro, da linha e do ponto; a transportadora opera o ônibus. O app precisa dizer qual dos dois resolve cada coisa.

## A solução

Uma tela central, o Início, responde as três perguntas com um número grande e diz de onde esse número vem. Todo o resto fica a um toque.

### O que o app faz

- **Diz quando o ônibus passa no ponto**, ao vivo, calculado com a posição do ônibus. A janela ao vivo abre 30 min antes da saída.
- **Diz qual é o ônibus:** linha, número e placa. Quando a transportadora troca o veículo, o app avisa e mostra a placa nova.
- **Diz se dá para confiar:** o selo colado no número diz se ele é ao vivo, aproximado, programado ou sem sinal.
- **Avisa antes:** o ônibus chegando (5, 10 ou 15 min antes, a pessoa escolhe), o atraso, a troca de veículo e o cancelamento.
- **Deixa embarcar em outro ponto hoje**, com a razão de cada ponto estar ou não disponível. A transportadora fica sabendo.
- **Registra o embarque** pelo botão Embarquei ou pela leitura do crachá no ônibus, com "Não fui eu" sempre à mão.
- **Mostra as paradas e o mapa** para consulta, com o ônibus como único ponto brilhante.
- **Diz com quem falar:** RH e transportadora, cada um com o que resolve, telefone ou WhatsApp e horário de atendimento.
- **Protege a pessoa:** desbloqueio opcional com digital, rosto ou senha do celular, e os pedidos sobre os dados (ver, corrigir, apagar) feitos no próprio app.

### O que o app não faz

- **Não edita o cadastro.** Ponto de sempre, linhas e contatos mudam com o RH; o app só mostra.
- **Não troca o ponto de sempre.** A troca vale só para a ida de hoje e exige 3 min de margem.
- **Não tem senha.** O acesso é sempre pelo código de 6 números.
- **Não acompanha a pessoa.** A localização só é usada quando ela pede, com o app aberto: para ordenar os pontos por distância a pé ou se ver no mapa.
- **Não confirma quem está cadastrado.** O Entrar nunca diz se um e-mail ou celular existe, mas sempre diz com quem falar.

### Os princípios do desenho

1. **Um relance basta.** O Início responde as três perguntas no topo; o resto fica um toque abaixo.
2. **O número diz de onde vem.** O dado velho nunca se passa por novo: o app diz há quanto tempo a posição parou e recua para o horário programado.
3. **O estado tem forma antes de cor.** Cada estado muda a palavra e o glifo; nos momentos críticos, muda a forma do cartão. A cor só confirma.
4. **O erro fica no lugar da ação.** O erro aparece onde a pessoa tocou e diz o que fazer em seguida.
5. **Sempre um caminho de volta.** Reenviar o código, trocar o contato, desfazer o embarque, voltar ao ponto de sempre.
6. **Dizer não sem culpa.** Avisos e desbloqueio são escolhas, e tudo muda depois no Perfil.
7. **Sempre com quem falar.** Cada problema aponta para quem resolve: o RH ou a transportadora.
