# O palco

O palco é a moldura que apresenta o protótipo no computador: **o app no meio, os estados do lado, as telas atrás do botão do canto**. É o mesmo palco dos outros produtos da casa, com o dia a mais: o tocador que faz o ônibus andar.

**O desenho é a folha F11**: `../03-design-system/folhas/html/F11-palco.html` (o HTML tem as medidas exatas) e `../03-design-system/folhas/png/F11-palco.png`. Nenhuma peça do palco se inventa no código. As listas da coluna e o dia estão em dados, em `palco-estados.json`.

## As regras

1. **Moldura, não produto.** O palco é sempre escuro, nos tokens do escuro do app, e não muda com o tema do aparelho. Nunca é vidro.
2. **Um lugar para cada coisa.** O que se olha o tempo todo fica do lado do aparelho (os estados desta tela e o tocador do dia). O que se escolhe de vez em quando fica atrás do botão do canto (as telas e o Modo claro).
3. **O app funciona.** Ele abre no Entrar, com os campos já preenchidos, e dali segue o caminho feliz (o código, o Preparar o app, o Início às 06:24); recarregar a página volta ao Entrar. O Bloqueado se alcança pelo painel. Funciona como no celular: todo toque leva aonde levaria no app. "Embarcar em outro ponto hoje" abre a T08, "Sair da conta" volta ao Entrar, o código certo segue para o Preparar o app.
4. **Tudo também se vê parado.** Qualquer tela, momento ou estado abre parado pela coluna, inclusive os passos do dia que já passaram. O parado é só para ver.
5. **O mundo não entra no app.** Nenhum controle do palco entra no aparelho, e nada do app vaza para o palco.

## As medidas, em 1440 × 1024

| peça | onde | medida |
| --- | --- | --- |
| botão do canto | a 16 do canto de cima, à esquerda | 44 × 44, raio 10 |
| aparelho | no meio | o iPhone 14 dos quadros, em 100%: tela de 390 × 844 com canto de 47,33, borda preta de 15, aro de 6 e os botões do lado; sem o entalhe |
| coluna "Estados desta tela" | a 40 do aparelho, à direita | 300 de largura, na altura do aparelho |
| painel | abre da esquerda, por cima | 280 de largura |

- Em janela mais baixa, **o aparelho encolhe por inteiro; nunca corta**. A coluna acompanha a altura dele.
- **O palco só aparece quando cabe inteiro**: 24 de margem, o aparelho (432, ou menos quando encolhe), 40, a coluna de 300 e 24 de margem. Em janela mais estreita que isso, o app ocupa a tela inteira, como no celular.
- O fundo é o `fundo-pagina` do escuro, liso.

## A coluna "Estados desta tela"

- O título é o código e o nome da tela em que o app está ("T05 · Início"). Embaixo, a dica: "no fluxo · toque num estado para ver parado".
- A lista traz a tela, os momentos e os estados, **em grupos e na ordem da história**, não na do número. Cada linha tem 32 de altura, com o número da referência. O nome vem sem a hora. O nome que não cabe na linha encurta com reticências, e inteiro ele fica no `title` da linha.
- **Lista curta, coluna no meio.** Quando os estados cabem com folga, o bloco inteiro (o título, a dica, a lista e o tocador) fica no meio da altura do aparelho. Quando não cabem, a lista ocupa a coluna toda, com o título em cima e o tocador no pé.
- **A lista só rola quando não cabe.** Quando rola, rola por dentro e mostra a barra de rolagem, sempre à vista: o palco é ferramenta de computador, e a barra diz que há mais estados abaixo. O título e o tocador ficam parados.
- **Tocar num estado** para o app nele, montado com o caso: o quadrado enche, a linha fica em negrito, o endereço ganha `?ref=`, e a lista rola até ele.
- **Parado, o app é uma foto**: não responde a toque nem a teclado, só rola. Tocar nele faz o palco pedir a volta: o "Voltar ao fluxo" ganha o anel e a frase acende ("Um estado é só para ver. Para tocar no app, volte ao fluxo.").
- **"Voltar ao fluxo"** devolve o percurso guardado: o app volta para a tela do caminho em que estava.

## O painel

- Abre no botão do canto, por cima, sem mexer no aparelho. Fecha no x, no Esc, no botão do canto ou clicando fora.
- **As telas**: as 13, na ordem do inventário, com o código. Tocar numa leva o app para ela, no fluxo, e os estados da coluna trocam junto. A tela em que o app está fica marcada.
- **No pé**: "Modo claro", com sol, que troca só o aparelho (é a mesma chave da Aparência do Perfil: ligado é o Claro, desligado é o Escuro), e "Atualizado em DD/MM/AAAA".

## O dia e o tocador

O caminho feliz deste app não avança só tocando: o ônibus anda. Por isso o palco tem o dia.

- **O dia tem cinco passos**: em rota (06:24), chegando (06:41), no ponto (06:42), a bordo (06:44) e chegou (07:16).
- **O dia é um só para o Início, as Paradas e o Mapa.** Quem está no "chegando" e abre o mapa vê o ônibus quase no ponto; nas Paradas, o ônibus cortando o trilho logo antes do ponto da Ana.

| passo | Início | Paradas | Mapa |
| --- | --- | --- | --- |
| em rota | T05-00 | T06-00 | T07-00 |
| chegando | T05-01 | T06-03 | T07-01 |
| no ponto | T05-02 | T06-04 | T07-02 |
| a bordo | T05-03 | T06-05 | T07-03 |
| chegou | T05-04 | T06-06 | T07-04 |

- **O tocador** é como o de um vídeo: **voltar um passo, play ou pausa, avançar um passo e a velocidade** (0,5×, 1× ou 2×; um toque troca). Em cima dele, a trilha dos cinco passos, com o passo de agora enchendo no tempo dele, e a frase do que vem ("A seguir: no seu ponto").
- **O tocador só aparece nas três telas em que o dia muda o que se vê**: Início, Paradas e Mapa. Nas outras dez, a coluna tem só os estados. Não mostre o tocador desligado nelas.
- Nas três, ele fica **preso no pé da coluna, sempre à vista**, em qualquer altura de janela: quem rola é a lista.
- **No play**, o ônibus avança sozinho. Em 1×: 8 s em rota e 6 s chegando. Em 0,5× é o dobro; em 2×, a metade.
- **No ponto, o dia para e espera o embarque.** No Início, quem embarca é o toque no "Embarquei", no app. Nas Paradas e no Mapa o "Embarquei" não existe, então o avançar acende e faz esse papel. A frase vira "Esperando o Embarquei" no Início e, nas Paradas e no Mapa, "Esperando o Embarquei, no Início".
- **A dica do dia** fica embaixo da frase do que vem, e diz o que o dia está fazendo e o que o faz mudar: "o dia anda sozinho · pause no botão ou no espaço" (na gaveta, sem teclado, "o dia anda sozinho · pause no botão"), "o dia está pausado · o play continua", "o dia espera · toque no Embarquei, no app" (no ponto, no Início), "o dia espera · o avançar também embarca" (no ponto, nas Paradas e no Mapa) e "o dia acabou · o play recomeça".
- **A bordo**, mais 6 s até a chegada. **No chegou**, o play vira o recomeçar, que volta para o em rota das 06:24.
- **Voltar e avançar** andam um passo por toque, com o dia pausado ou andando; o passo novo começa do zero.
- **Nas Paradas, o em rota tem três batidas** dentro dos mesmos 8 s: indo para a Av. Norte (T06-00), chegando nela (T06-01) e parado nela (T06-02).
- **De um passo para o outro, o ônibus desliza**: no trilho e no mapa ele anda da posição anterior para a nova, sem pular, e o trecho percorrido apaga atrás dele. O número do herói não conta de um em um: troca com o passo (`../03-design-system/movimento.md`).
- **Saindo das três telas, o dia pausa e guarda o passo.** Voltando, continua de onde parou.
- **Num estado parado, o tocador apaga** (fica à vista, a 40%), porque o app é uma foto.
- **No teclado**, com o foco fora do app: espaço é play ou pausa; as setas esquerda e direita são voltar e avançar.
- **O dia anda com ou sem palco.** O relógio do dia mora na raiz do app: no celular de verdade e com `?so-app=1`, sem tocador, o dia também começa ao chegar no Início e segue sozinho até o ponto, onde espera o "Embarquei".
- A barra de status fica em 9:41, como nos quadros.

Os tempos (8 s e 6 s) são um ponto de partida. O que importa: dá tempo de ler o herói em cada passo, e ninguém espera sem saber o que vem.

## O app rola, e o teclado

- **Toda tela maior que o aparelho rola por dentro dele**, com a roda do mouse, arrastando ou com o dedo. A barra de cima e o rodapé fixo ficam no lugar. Enquanto rola, aparece o **indicador de rolagem do iOS**, fino, na borda direita, e ele some sozinho. Um estado parado também rola: rolar é olhar, não tocar.
- **No computador**, tocar num campo sobe o **teclado desenhado**, o dos quadros (T01-02, T02-01 e T12-07), e a tela se ajeita como neles. Dá para digitar pelo teclado do computador ou clicando nas teclas desenhadas. Tocar fora do campo fecha.
- **No celular de verdade** não existe teclado desenhado: o campo é campo de verdade e sobe o teclado do celular, no tipo certo (e-mail, telefone, ou numérico com o código de uso único).

## O voltar do navegador

O voltar do navegador (o botão, ou o gesto de dois dedos) não tira ninguém do protótipo no meio do caminho. Ele faz o que o toque faria no app: fecha o que está aberto por cima, ou toca o voltar da barra. Numa tela sem voltar (o Início, o Preparar o app) e parado num estado, o app fica onde está. Só de onde abriu, sem ter saído do lugar (o Entrar, ou a referência do endereço), o voltar sai da página. O `?ref=` e os outros endereços continuam valendo.

## No celular de verdade

- Abaixo de 600 de largura, ou em qualquer janela em que o palco não cabe inteiro, o app ocupa a tela inteira e o palco some. A barra de status e o indicador de início são os do celular: o app usa as margens seguras do sistema no lugar dos 47 e dos 34 dos quadros.
- Com `?palco=1`, fica uma aba de 6 × 44 na borda esquerda, no meio da altura (o toque pega 24 × 64). Tocar nela, ou puxar da borda, abre **a gaveta**, de baixo, por cima do app, com véu.
- A gaveta tem os mesmos grupos do palco, na mesma ordem: a tela (uma escolha, de 48), os estados desta tela (linhas de 44), o tocador do dia (só no Início, nas Paradas e no Mapa) e o Modo claro. A cabeça fica; a lista rola. Fecha no x, puxando para baixo ou tocando no véu.
- É assim que se testa com gente: quem conduz o teste escolhe a tela e para nos estados pela gaveta.

## Teclado e leitor de tela no palco

Tudo no palco tem nome acessível e anda no Tab, com o anel de foco do app (`vivo`, 2 px, deslocado 2 px). Enter escolhe, Esc fecha o painel. A coluna é uma região com nome, "Estados desta tela".

## Onde o palco mora no código

| peça | arquivo |
| --- | --- |
| o palco: o lugar de cada coisa, o botão do canto, o painel, o Modo claro | `app/src/palco/Palco.tsx` |
| a lista "Estados desta tela" e o "Voltar ao fluxo" | `app/src/palco/Estados.tsx` |
| o tocador e o motor do dia | `app/src/palco/Tocador.tsx` e `app/src/estado/dia.ts`; o motor é montado na raiz, em `app/src/App.tsx` |
| a escolha entre o palco e a tela inteira, e o voltar do navegador | `app/src/App.tsx` |
| a gaveta do celular | `app/src/palco/Gaveta.tsx` |
| as medidas, da folha F11 | `app/src/palco/palco.css` |
| a moldura do aparelho | `app/src/sistema/Aparelho.tsx` e `aparelho.css` |

As fotos do palco contra a folha F11 ficam em `fotos/palco/` (`node conferencias/fotos-palco.mjs`, a partir de `app`).
