# T05 · Início

Telas do app · T05 · Viagem

Responde num relance quando o ônibus passa no meu ponto, em qual ônibus eu entro e se posso confiar nesse número; tudo o mais fica um toque abaixo. O elemento da tela é o cartão do herói: o número grande (56/800, tabular) com o selo de confiança colado e o alvo escrito acima ("Passa no seu ponto", depois "Chega na fábrica"). Ele muda de forma só em chegando e no ponto (fundo-destaque, raio 24) e em cancelada (borda perigo). A barra de saudação (56) traz os avisos e o perfil; não há rodapé fixo; quando há aviso, um banner fixo entra logo abaixo da barra; com dois, eles empilham na ordem de prioridade (desvio e crachá em outro ônibus primeiro, depois sem internet, ônibus trocado, avisos desligados e sem bloqueio), e um terceiro espera a vez. A rolagem começa com o herói e termina nas outras viagens do dia. No exemplo, é terça, 27/10, 06:24: Ana Souza, Linha 210 · Macaxeira – Fábrica, ida de sempre 06:05 em rota, ônibus 1234 · ABC1D23, seu ponto Av. Abdias de Carvalho, 1200 (06:42, 4 pessoas), destino Fábrica – Portaria 2 (07:15), outra ida 07:05, volta 17:20 e 2 avisos não lidos. Os quadros contam o dia na ordem: em rota, chegando, no ponto, o Embarquei e a chegada na fábrica; depois vêm os momentos que se alcança tocando: outra viagem do dia, a troca de ponto e a volta ao ponto de sempre. Sem horário habitual no cadastro (ele é opcional), o foco é a próxima viagem regular do dia: o rótulo diz "Próxima ida" no lugar de "Ida de sempre", e o Perfil mostra as viagens de hoje no lugar do horário.

- **O herói diz uma coisa só.** Antes do embarque, só o seu ponto: a chegada na fábrica não aparece embaixo. Depois do embarque, a fábrica vira o alvo do herói.
- **O selo de estado só aparece na exceção**: "Atrasado" ou "Adiantado", com os minutos. No horário, fica só o "Ao vivo".
- **A lista "Próximas paradas" começa onde o ônibus está.** O que já passou não aparece aqui; a viagem inteira está nas Paradas (T06).
- **O mapa abre pelo cartão "Ver no mapa"**, logo abaixo da lista. O herói não tem botão de mapa.
- **O cartão "Sua volta hoje" abre a volta**, programada: o horário de saída, o selo Programado, a frase de quando a previsão ao vivo começa, o embarque e a descida, e o link de volta para a ida de sempre. Este quadro não tem referência desenhada: é montado com as peças da outra ida e com o dado da volta do mock. Os textos dele estão no fim do `textos.md`.
- Quadros: 9 (a tela e os momentos). Estados: 23.
- As referências estão em `referencias/html/` e `referencias/png/`, uma por linha do `estados.md`.
- Os textos exatos estão no `textos.md`; o movimento, no `animacao.md`.
