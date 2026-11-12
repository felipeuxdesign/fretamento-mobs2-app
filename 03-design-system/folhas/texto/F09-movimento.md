# Folha 09 · Movimento e háptico

O texto da folha, linha a linha, para busca. O desenho está em `../html/F09-movimento.html` e `../png/F09-movimento.png`.

- Sete movimentos, e tudo o mais fica parado
- Todo movimento informa ou guia uma ação; nenhum decora. Não anima: entrada de tela, contagem do zero ao abrir, atualização de previsão (o número troca no lugar), hover. Tudo respeita a redução de movimento do sistema: vira troca instantânea.
- 1 · Pulso do ao vivo1,6 s · ease-in-out · loop
- Ao vivoAo vivoopacidade do ponto 1 → 0,35 → 1 · só o ponto, nunca o texto
- É a única animação em loop do app, porque é a prova de que o dado está chegando.
- 2 · O ônibus anda900 ms · ease-out cúbico · a cada posição nova
- No trilho e no mapa, o disco desliza da posição anterior para a nova; sem sinal, ele para e apaga. A câmera do mapa segue com a mesma curva em 400 ms quando "seguir ônibus" está ligado.
- 3 · O herói troca de estado150 ms · fade cruzado · no lugar
- 3 min→Chegando→Chegando
- Troca de número (8 → 7 min) não anima: substitui. Troca de estado (número → palavra, cartão → destaque) faz um fade de 150 ms e o fundo do cartão transita em 250 ms. Nunca contar do zero, nunca "rolar" dígitos.
- 4 · Sheet e diálogosheet 250 ms sobe 40 px + fade · diálogo 150 ms fade · scrim 200 ms
- Fechar é o inverso em 200 ms. O painel do mapa arrasta com o dedo (sem curva) e assenta na posição mais próxima em 250 ms.
- 5 · Anel de chegando no mapa1,6 s · ease-out · loop só em chegando
- anel escala de 0,8 a 1,35 enquanto some
- O único lugar onde o lima se expande: o passageiro precisa achar o ônibus no mapa em um relance.
- 6 · Toast, push e skeletontoast 200 ms sobe 8 px, fica 3,2 s · push 300 ms desce · skeleton 1,2 s linear
- O brilho do skeleton corre da esquerda para a direita uma vez a cada 1,2 s. O toast nunca carrega erro: erro fica parado, no lugar da ação.
- 7 · Hápticoleve · quatro momentos · nunca em atualização de previsão
- Chegandoum toque leve quando o estado vira chegando
- No pontodois toques leves
- Confirmoutroca de ponto e embarque: um toque de sucesso
- Cancelada ou trocadoum toque de aviso junto do push
