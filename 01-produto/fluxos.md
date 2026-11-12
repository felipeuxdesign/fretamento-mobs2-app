# Como funciona

O app tem um centro, o Início: viagem, avisos e conta ficam a um toque dele.

```
Primeiro acesso   T01 Entrar  ->  T02 Digite o código  ->  T03 Preparar o app  ->  T05 Início
Reabertura        T04 Bloqueado  ->  T05 Início        (sem o desbloqueio ligado, o app abre direto no T05)

T05 Início
  |- cartão e atalhos ->  T06 Paradas da viagem · T07 Mapa · T08 Outro ponto hoje (confirma e volta ao Início)
  |- o sino           ->  T09 Notificações  ->  T11 Avisos (também pelo Perfil)
  |- o avatar         ->  T10 Perfil  ->  T11 Avisos · T12 Privacidade · T13 Excluir conta (termina no Entrar)
```

No primeiro acesso, são três telas até o Início. No dia a dia, o app abre direto nele, ou passa antes pelo desbloqueio.

### O dia da Ana, no caminho feliz

1. **05:35** · A janela ao vivo abre, 30 min antes da saída. O ônibus ainda está na garagem.
2. **06:07** · O ônibus sai do Terminal da Macaxeira, e o app avisa.
3. **06:24** · Ana abre o app, confirma com a digital e vê no Início o ônibus a 18 min do ponto dela, ao vivo.
4. **06:32** · Com o celular bloqueado, chega o aviso: o ônibus está a 10 min.
5. **A menos de 2 min** · O cartão muda de forma e destaca a placa, ABC1D23 · 1234.
6. **06:44** · Ana embarca: toca Embarquei, ou o crachá lido no ônibus registra sozinho.
7. **07:16** · O ônibus chega na Fábrica – Portaria 2, e o Início já mostra a volta das 17:20.

## Quando algo dá errado

O app nunca mostra um número mais confiável do que ele é: quando o dado envelhece, ele diz há quanto tempo e recua para o horário programado.

| O dado | Como se chega | O que o herói mostra |
| --- | --- | --- |
| Programado | antes de o ônibus sair | o horário do cadastro, com "horário programado" e o selo Programado |
| Ao vivo | o ônibus saiu e a posição chega | os minutos, o horário ao lado e o selo Ao vivo, que pulsa |
| Aproximado | posição parada há mais de 1,5 min, ou o ônibus fora do trajeto | "cerca de" antes dos minutos e o selo Aproximado, com a idade do dado |
| Sem sinal | mais de 3 min sem posição | volta ao horário programado, com "Sem sinal há N min" e o último atraso conhecido |
| Sem internet | o celular perdeu a conexão | a previsão congela, com "previsão feita às HH:MM" e o selo Sem internet |

Com 1,5 min sem posição, o ao vivo vira aproximado; com 3 min, o app volta ao programado e diz por quê. Sem internet, o número congela com a hora em que foi calculado.

### O que mais pode dar errado

| O que acontece | O que o app faz |
| --- | --- |
| O ônibus atrasa além de 3 min | "Atrasado N min" em âmbar e a nova previsão |
| O ônibus está adiantado | "Adiantado N min" e "Vá para o ponto agora" |
| O ônibus sai do trajeto | Banner de atenção e a previsão com "cerca de" |
| A transportadora cancela a viagem | Cartão com borda de perigo, o aviso dela e o atalho para a viagem mantida |
| A transportadora troca o ônibus | Banner e a placa nova no cartão |
| A viagem abre sem ônibus definido | "Ônibus a definir", e o app avisa quando ele sair |
| O ônibus passa sem a pessoa | "Perdeu o ônibus? Ver pontos à frente" |
| O crachá é lido em outro ônibus | Banner com "Fui eu" e "Não fui eu" |
| O celular fica sem internet | A previsão congela com a hora, e a troca de ponto fica indisponível |
| O servidor não responde | O erro aparece no lugar da ação, e nada muda até tentar de novo |
| O app abre sem rede e sem dados guardados | Diz que está sem internet, sem inventar a viagem |
| O dia não tem viagem | Mostra a próxima da escala, como segunda, 02/11, às 06:05 |
| As notificações estão negadas no celular | Banner com "Ativar", que abre os ajustes; a viagem segue igual |
| O celular não tem senha nem biometria | Banner com "Abrir ajustes"; a viagem segue igual |

Com dois avisos ao mesmo tempo, os banners empilham por prioridade: desvio e crachá em outro ônibus primeiro, depois sem internet, ônibus trocado, avisos desligados e sem bloqueio. Um terceiro espera a vez.
