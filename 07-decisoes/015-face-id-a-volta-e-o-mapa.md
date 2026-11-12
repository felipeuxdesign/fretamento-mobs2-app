# 015 · O iPhone fala Face ID, a volta tem destino e o mapa perde o "No horário"

11/11/2026

**O contexto.** Três pontas soltas. O celular do protótipo é um iPhone (a barra de status, o teclado, os alertas), mas o pedido de biometria era a folha da digital, que é coisa do Android. O cartão "Sua volta hoje · 17:20" estava na tela, com seta, e o toque não levava a lugar nenhum. E o herói do mapa ainda mostrava o selo "No horário", que no Início já tinha saído.

**A decisão.**

- **O nome do método é o do aparelho.** No iPhone do protótipo, o pedido de biometria é o do Face ID: o alerta do sistema, no meio da tela, com o desenho do Face ID, o motivo que o app deu e as saídas "Usar a senha do celular" e "Cancelar". Os textos do app que citavam "a digital ou o rosto" passam a dizer Face ID. No produto, cada aparelho diz o seu: Face ID ou Touch ID no iPhone, a digital ou o rosto no Android.
- **A saída do pedido continua "Usar a senha do celular"**, e não "Digitar código": "código", neste app, é o código de acesso que chega por e-mail ou SMS.
- **O cartão "Sua volta hoje" abre a volta, programada.** O quadro é montado com as peças que já existem na outra ida do dia (o horário programado, o selo Programado, a frase de quando a previsão ao vivo começa, o link de volta) e com o dado da volta do mock: sai às 17:20 da Fábrica, Portaria 2, e chega à Av. Abdias de Carvalho às 17:54. A tela volta ao topo quando a viagem troca, porque o cartão fica no fim e o que muda é o herói.
- **O "No horário" sai do herói do mapa**, pela mesma regra do Início: o selo de estado só aparece na exceção.

**O que não foi desenhado.** A volta programada não tem referência nem caso: ela existe no protótipo e no `textos.md`, e espera o quadro. A folha F02, desenhada, ainda mostra a folha da digital.

**A consequência.** 21 referências a mais mostram texto de antes (as do Preparar o app, do Bloqueado, da Privacidade e do Mapa): são 70 de 145 esperando o desenho novo, todas listadas em `a-redesenhar.json` com o porquê.
