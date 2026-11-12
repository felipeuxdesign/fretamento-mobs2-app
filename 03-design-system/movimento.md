# Movimento e háptico

Sete movimentos, e todo o resto fica parado. Todo movimento informa ou guia uma ação; nenhum decora. A folha é a F09.

**Não anima:** a entrada de tela, a contagem do zero ao abrir, a atualização da previsão (o número troca no lugar) e o hover. Tudo respeita a redução de movimento do sistema: vira troca instantânea.

| # | movimento | tempo e curva | regra |
| --- | --- | --- | --- |
| 1 | pulso do ao vivo | 1,6 s · ease-in-out · loop | a opacidade do ponto vai de 1 a 0,35 e volta. Só o ponto, nunca o texto. É a única animação em loop do app |
| 2 | o ônibus anda | 900 ms · ease-out cúbico | no trilho e no mapa, o disco desliza da posição anterior para a nova. Sem sinal, para e apaga. A câmera do mapa segue em 400 ms com "seguir ônibus" ligado |
| 3 | o herói troca de estado | 150 ms · fade cruzado | troca de número não anima, substitui. Troca de estado faz o fade, e o fundo do cartão transita em 250 ms. Nunca rolar dígitos |
| 4 | sheet e diálogo | sheet 250 ms sobe 40 px com fade · diálogo 150 ms · véu 200 ms | fechar é o inverso em 200 ms. O painel do mapa arrasta com o dedo, pelo painel inteiro, e assenta em 250 ms na altura do lado para onde o dedo foi (a partir de 24 de arrasto) |
| 5 | anel de chegando no mapa | 1,6 s · ease-out · loop só em chegando | o anel escala de 0,8 a 1,35 enquanto some |
| 6 | toast, push e skeleton | toast 200 ms sobe 8 px e fica 3,2 s · push 300 ms desce · skeleton 1,2 s linear | o brilho do skeleton corre da esquerda para a direita |
| 7 | háptico | leve, em quatro momentos | chegando (um toque), no ponto (dois toques), confirmou a troca ou o embarque (sucesso), cancelada ou trocado (aviso, junto do push). Nunca em atualização de previsão |

## No protótipo

- O dia anda pelo tocador do palco, no Início, nas Paradas e no Mapa: de um passo para o outro, o ônibus desliza com o movimento 2 e o herói troca com o 3. Em 2×, os tempos do movimento não mudam; só a espera entre os passos encurta.
- O 1 e o 5 rodam enquanto o estado está na tela.
- Um estado parado pelo palco mostra o fim do movimento, sem transição de entrada.
- O háptico não existe no navegador do computador. No celular Android, `navigator.vibrate` pode fazer o papel; no iPhone, fica sem. No produto real, é o háptico nativo.
- As esperas têm tempo certo: 700 ms nos botões que carregam, 650 ms no skeleton do Início, 300 ms para a biometria abrir sozinha.
- O vidro tem o movimento dele, descrito em `vidro/`, e também para com a redução de movimento.
