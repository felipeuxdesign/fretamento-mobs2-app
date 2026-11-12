# 011 · Um agora só, e o acento em quatro lugares

10/11/2026

**O contexto.** Uma leitura do protótipo inteiro, tela por tela, achou dois problemas de fundo. O primeiro, de dado: o herói e a linha do tempo se desencontravam (a fábrica a 31 min em cima e a 51 embaixo; o ônibus "indo para" uma parada que já tinha passado), porque cada tempo relativo era digitado. O segundo, de desenho: o acento (lima no escuro, roxo no claro) estava em tudo (botão, links, linha do tempo, chips, ícones), e por isso nada se destacava e o vidro disputava com a cor.

**A decisão.**

- **Todo tempo relativo sai do mesmo agora do estado**, calculado (a hora da parada menos o agora), nunca digitado. Uma função só escreve o relativo, com um arredondamento só ("menos de 2 min"). Sem internet, o agora é a hora do dado guardado. Uma conferência cobra isso em todos os estados do Início, das Paradas e do Mapa.
- **O ônibus tem uma ordem só**: o prefixo primeiro, a placa depois ("ônibus 1234 · ABC1D23", "1234 · ABC1D23").
- **Com o ônibus parado numa parada, não há nó separado na linha do tempo.** O ícone dele fica sobre a parada, com "o ônibus está aqui". O nó separado só existe entre paradas.
- **No ponto, o estado é dito uma vez**: "Parado no seu ponto" na linha de cima, "No ponto" no herói, o selo "Ao vivo" sozinho.
- **Depois do embarque, o selo diz a hora** ("Embarcou às 06:44"), e a frase de baixo não repete.
- **O mapa abre pelo cartão "Ver no mapa"**, abaixo da lista. O botão de mapa no canto do herói, que entrou aqui, saiu em `012-o-inicio-mais-curto.md`.
- **O acento fica em quatro lugares**: o botão principal, o ponto "ao vivo", o nó do ônibus e a posição atual no mapa. O interruptor ligado também usa a cor de ação. Sai da linha do tempo, dos chips de papel, dos links e do ícone do "Confira o ônibus". Vale com o vidro ligado.
- **No escuro, o vidro dos controles é neutro**: o voltar, o "Perto de mim" e os chips não pegam a cor da luz do fundo.
- **O palco diz "Modo claro"**, com sol: ligado é o Claro, desligado é o Escuro. É a mesma chave da Aparência.

**O que foi mantido fora dos quatro lugares.** A escolha (o rádio, o chip escolhido, a linha escolhida da lista) continua na cor de ação, em tom leve: é estado de seleção, e sem cor ele não se lia.

**A consequência.** 41 referências mostram o conteúdo de antes e esperam o desenho novo. Elas estão listadas, com o porquê de cada uma, em `06-prototipo/fotos/fidelidade/a-redesenhar.json`; a fidelidade as conta à parte, sem afrouxar a régua das outras. Os textos de cada tela foram atualizados no `textos.md`. A lei 1 ganhou a exceção do link.
