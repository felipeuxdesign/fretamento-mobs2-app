# T05 · Início · quadros e estados

## Os quadros desta tela · 9

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T05-00 | tela | a entrada: o app abre aqui na viagem de sempre | semente · ida 06:05 · ônibus entre o Mercado de Casa Amarela e a Av. Norte | `00-tela` |
| T05-05 | momento | rolar a tela até o fim | os atalhos (mapa, outro ponto) e as outras viagens do dia: ida 07:05 e volta 17:20 | `05-momento-rolada-ate-o-fim` |
| T05-01 | momento | menos de 2 min para o seu ponto | chegando · placa em destaque · Embarquei liberado (secundário ativo, com borda e tinta; não é o desligado) | `01-momento-chegando` |
| T05-02 | momento | o ônibus parado no seu ponto | no ponto · Embarquei vira primário: mesma ação, mesmo glifo de entrada; só a força muda | `02-momento-no-ponto` |
| T05-03 | momento | tocar Embarquei em chegando, no ponto ou passou | embarque pelo botão às 06:44 | `03-momento-tocou-embarquei` |
| T05-04 | momento | o ônibus chegou ao destino | chegou às 07:16 · a volta é a próxima | `04-momento-concluida` |
| T05-06 | momento | tocar num cartão de outra viagem do dia | ida 07:05 · não é a prevista da Ana | `06-momento-tocou-outra-ida-hoje-07-05` |
| T05-07 | momento | voltar da T08 depois de confirmar Av. Norte, 2800 | troca para Av. Norte (06:31) · o de sempre continua Av. Abdias de Carvalho | `07-momento-troca-de-ponto-ativa` |
| T05-08 | momento | tocar "Voltar ao ponto de sempre" com a troca ativa | sheet de confirmação · a transportadora fica sabendo · volta para a Av. Abdias de Carvalho, 06:42 | `08-momento-tocou-voltar-ao-ponto-de-sempre` |

## Os estados desta tela · 23

O que o mundo decide: o ônibus, a rede, o servidor, o dado. Dois momentos moram aqui, do lado do estado de onde saem: o Não fui eu e o Fui eu. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T05-09 | estado | o relógio antes das 06:05, dentro da janela | janela ao vivo aberta às 05:35; ônibus ainda na garagem | `09-estado-programado-antes-de-sair` |
| T05-12 | estado | o ônibus além da tolerância de 3 min | atraso de 8 min · nova previsão 06:50 | `12-estado-atrasado-8-min` |
| T05-13 | estado | o ônibus na frente do horário | adiantado 4 min · passa às 06:38 | `13-estado-adiantado-4-min` |
| T05-18 | estado | última posição entre 1,5 e 3 min atrás | posição de 06:28 · em desvio ou GPS lento | `18-estado-aproximado-dado-antigo` |
| T05-19 | estado | o ônibus saiu do trajeto previsto | fora do trajeto às 06:28 · previsão 06:44 com "cerca de" · banner de atenção | `19-estado-em-desvio` |
| T05-14 | estado | o ônibus passou do seu ponto sem registro de embarque | passou às 06:44 · pontos à frente disponíveis | `14-estado-passou-sem-embarque` |
| T05-15 | estado | o leitor do ônibus leu o crachá da Ana | crachá lido no 1234 às 06:44 | `15-estado-embarcou-pelo-cracha` |
| T05-16 | momento | tocar "Não fui eu" no embarque pelo crachá | sheet de confirmação · Marcar deixa o embarque contestado e o toast confirma | `16-momento-tocou-nao-fui-eu` |
| T05-17 | estado | o ônibus da volta parado no seu embarque | volta 17:20, sai às 17:21 · da Fábrica até a Av. Abdias, 17:54 | `17-estado-volta-no-ponto` |
| T05-20 | estado | sem posição há mais de 3 min | último sinal às 06:21, 4 min atrasado | `20-estado-sem-sinal-do-onibus` |
| T05-21 | estado | o celular perdeu a conexão | dados congelados às 06:24 · troca indisponível | `21-estado-sem-internet-no-celular` |
| T05-26 | estado | a transportadora cancelou a ida 06:05 | cancelada · aviso: manutenção · a das 07:05 mantida | `26-estado-cancelada-pela-transportadora` |
| T05-10 | estado | a viagem abriu sem veículo vinculado | sem vínculo de ônibus às 06:07 | `10-estado-onibus-a-definir` |
| T05-27 | estado | a operação passa a viagem para o horário programado | em rota, 5 min atrasado · só o programado, sem selo de pontualidade | `27-estado-recuo-para-o-programado` |
| T05-23 | estado | a transportadora trocou o veículo da viagem | hoje é o 1250 · DEF2G34 | `23-estado-onibus-trocado` |
| T05-24 | estado | o crachá da Ana foi lido no 1250 | leitura no 1250 às 06:24 · pendente de confirmação | `24-estado-cracha-lido-em-outro-onibus` |
| T05-25 | momento | tocar "Fui eu" no aviso do crachá lido em outro ônibus | embarque no 1250 às 06:24 · a previsão do 1250 não aparece no app | `25-momento-tocou-fui-eu` |
| T05-28 | estado | a permissão de notificações do celular está negada | banner com "Ativar", que abre os ajustes do celular · a viagem segue igual | `28-estado-avisos-desligados` |
| T05-29 | estado | o celular não tem senha nem biometria | banner com "Abrir ajustes" e o X para fechar · a viagem segue igual | `29-estado-celular-sem-bloqueio-de-tela` |
| T05-30 | estado | a segurança do celular mudou (T04-04) e a pessoa entrou com o código novo | o desbloqueio caiu · sheet "Ligar o desbloqueio de novo?" · Agora não fecha, e Perfil › Privacidade religa depois | `30-estado-entrou-de-novo-depois-de-a-seguranca-mudar` |
| T05-31 | estado | dia sem viagem na escala | sábado · próxima segunda 02/11 06:05 | `31-estado-sab-31-10-sem-viagem-hoje` |
| T05-22 | estado | o app abriu sem conseguir buscar a viagem | sem cache · sem rede ao abrir | `22-estado-erro-ao-carregar` |
| T05-11 | estado | os 650 ms entre abrir e receber a viagem | skeleton com a forma do herói | `11-estado-carregando` |
