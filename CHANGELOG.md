# Registro de mudanças

O que mudou em cada versão, com o porquê. Todo desvio do que a pasta descreve entra aqui com nome.

## 1.11.1 · o mapa sem a bússola e a linha escolhida sem divisória

12/11/2026

- **A bússola saiu do mapa.** O mapa do protótipo não gira, e a bússola, com 22 de diâmetro ao lado da barra, não dizia nada. No produto vale a bússola do próprio mapa (`08-handoff/README.md`). As referências T07-03, T07-04, T07-07, T07-11 e T07-14 ainda a mostram e entraram em `a-redesenhar.json`.
- **A linha escolhida de uma lista não tem divisória colada.** A faixa vai de ponta a ponta e a borda dela já separa: a divisória de cima e a de baixo saem, e o lugar delas fica, para a lista não mudar de altura. Vale em toda lista de escolha (o "Outro ponto hoje" e as demais). No desenho a divisória de baixo aparece; a diferença é de um fio e fica dentro da régua da fidelidade.
- **O anel do ponto, no "Outro ponto hoje", é o do Início.** No vidro, a linha do tempo já tinha o anel neutro, e a lista de escolha ficava com o roxo da rota, ao lado do rádio de ação. Agora as duas usam o mesmo anel. No sólido (`?vidro=0`), nada muda.
- **No arrasto do mapa, o rótulo "Seu ponto" fica preso ao marcador.** O mapa deslizava em 400 ms também com o dedo nele, e o rótulo, que mora por cima, andava na hora: os dois se descolavam. Com o dedo no mapa, ele segue o dedo sem deslizar; quando a câmera vai sozinha ("Meu ponto", "Seguir ônibus"), o rótulo, o nome do ônibus e o balão deslizam no mesmo tempo e na mesma curva.
- **A fidelidade:** 68 batem, 77 esperam o desenho novo.
- **Os documentos seguem o protótipo de hoje.** O que ainda descrevia o botão "Entrar" do Código, a digital no lugar do Face ID, o "Modo escuro" do palco, o protótipo abrindo no Bloqueado e o login de teste 123456 foi alinhado, nas fichas das telas, no `casos.json`, no produto, no vidro e no handoff. Duas células cortadas do `componentes.md` foram completadas, e as seções do `vidro.css` passaram a ser numeradas de 1 a 7.
- **O telefone do RH de exemplo** passou a ser (81) 3555-0142, no `mock.json`, nos textos, nas quatro referências que o mostram (T02-07, T04-06, T10-01 e T10-05) e na folha F06, com as imagens refeitas do HTML.
- **A frase da capa e da prévia do link** passou a ser "Mostra quando o ônibus passa no seu ponto, em qual ônibus entrar e se a previsão é confiável.": a de antes falava em "nesse número" sem o número à vista. O README e o guia de leitura acompanham.
- **No palco, "para"** no lugar de "pra": "Um estado é só para ver. Para tocar no app, volte ao fluxo.".
- **A tabela da fidelidade** diz "espera o desenho novo" nas referências do `a-redesenhar.json`, no lugar de "bate".

## 1.11 · o protótipo revisado de ponta a ponta

11/11/2026

O app inteiro foi percorrido, nos dois temas, no palco e na tela cheia. O caminho principal já fechava sem erro; o que segue é o que respondia errado fora dele, ou não respondia.

**A viagem**

- **A troca de ponto vale para a ida de hoje inteira.** Antes, ela se desfazia quando o dia andava. Agora o Início, as Paradas, o Mapa e o "Outro ponto hoje" leem o mesmo momento: o herói, o cartão da troca, o rótulo "Seu ponto hoje", o marcador no mapa e as contagens (uma pessoa a mais no ponto de hoje, uma a menos no de sempre). As horas saem do horário de cada parada no `mock.json`.
- **A margem de 3 min vale em qualquer passo.** Ponto a menos de 3 min fica desligado, com o motivo escrito. Depois do embarque, "Embarcar aqui hoje" fica desligado com "Você já embarcou nesta viagem.".
- **O "Embarquei" responde com o ônibus chegando**, e não só parado no ponto.
- **Com a volta ou a outra ida aberta**, "Ver todas" e "Ver no mapa" não abrem mais a ida de sempre.
- **"Outras viagens de hoje" acompanha o dia**: o apoio de "Sua ida de sempre" muda com o passo, e o cartão sai depois da chegada.
- **No mapa**, tocar em "Meu ponto", "Seguir ônibus" ou "Minha localização" fecha o balão e a câmera anda; o arrasto para na beira do desenho; com o painel inteiro saem a régua, a bússola e os rótulos; "Meu ponto" centra no ponto de hoje.
- **Um nome só para a lista:** o painel do mapa diz "Próximas paradas", como o Início (T07-05). **Um horário só para o que já passou:** na T08, o Terminal da Macaxeira passou às 06:05, o horário que as Paradas mostram (T08-04; o `estados.md` e o `casos.json` acompanham).

**A conta**

- **O que se decide no Preparar o app vale depois.** A proteção, o aviso de chegada e a resposta sobre as notificações chegam ao Perfil, aos Avisos e à Privacidade. Recusar as notificações mostra, nas Notificações e nos Avisos, o estado desenhado de permissão negada, e o "Ativar" (também no banner do Início) liga a permissão na hora.
- **Entrar:** "Receber código" com o campo vazio ou com o celular incompleto (menos de 11 dígitos) dá o erro no lugar. O campo Celular abre o teclado numérico.
- **Código:** pedir de novo pelo Entrar recomeça a tela; "Reenviar código" devolve o foco ao campo; a nota dos 60 s não cita a caixa de spam quando o código foi pedido pelo celular.
- **Face ID:** cancelar o pedido no Preparar o app só fecha o pedido, sem a frase de erro. No Bloqueado, o pedido espera o toque. Na Privacidade, religar oferece "Usar a senha do celular", e o apoio do desbloqueio desligado diz "Desligado · O app abre sem pedir o Face ID nem a senha do celular".
- **Fazer um pedido:** o "Enviar pedido" sobe para cima do teclado, a tecla OK guarda o teclado, e o pedido vazio não é enviado.
- **O teclado desenhado** não some ao tocar em 123, maiúscula, emoji, microfone ou entre as teclas.
- **O que parecia botão e não respondia** deixou de ser botão: as perguntas do "Preciso de ajuda", as linhas "Linha 210 · Ida" e "Volta" do Perfil e a linha "Localização" da Privacidade. "WhatsApp" e "Ligar" respondem com um aviso curto.
- **"Alteração no seu cadastro"**, nas Notificações, abre o Perfil.
- **Os estados "rolada até o fim"** (T10-02, T10-03, T10-04 e T09-02) chegam ao fim de verdade.

**O palco**

- **O voltar do navegador não sai do protótipo**: faz o que o voltar do app faria.
- **O dia anda também sem o palco**, no celular e em `?so-app=1`.
- **Janela em que o palco não cabe** abre o app em tela cheia, no lugar de cortar a coluna.
- **O tocador ganhou uma linha de dica** ("o dia anda sozinho · pause no botão ou no espaço", "o dia espera · toque no Embarquei, no app"). É um acréscimo à folha F11.
- **Os nomes longos da lista de estados** encurtam com reticências, com o nome inteiro na dica, e quatro estados passaram a citar o Face ID (T03-02, T04-01, T04-03 e T04-04), no `casos.json`, no `palco-estados.json` e nos documentos.
- **A aba do navegador tem o ícone da loja.**
- **A borda de rolagem de cima** ficou firme sob a barra flutuante, e **a folha** ficou firme sobre o botão lima, no escuro.
- **No claro, o cartão que leva "Sair da conta" e "Excluir conta"** tem o preenchimento mais firme: sobre o ponto rosa da luz, o vermelho media 4,4:1; agora mede 4,6:1.

**Desvios, com nome**

- **Textos sem quadro desenhado**, registrados no fim do `textos.md` de cada tela: os do ponto de hoje fora do em rota, os motivos da troca desligada, os apoios de "Sua ida de sempre", os três erros do Entrar, a nota sem a caixa de spam, o apoio do desbloqueio desligado e os dois avisos de "WhatsApp" e "Ligar".
- **Faltam os quadros** da troca de ponto em chegando, no ponto e a bordo (T05, T06 e T07). Ali a posição do ônibus é calculada sobre o traçado.
- **T07-05 e T08-04** mostram texto diferente do desenho e entraram em `a-redesenhar.json`. A fidelidade: 73 batem, 72 esperam o desenho novo.
- **O aviso de "WhatsApp" e "Ligar"** usa o ícone de visto do toast, que é de confirmação. Proposta: um toast neutro.

**Propostas, sem mexer**

- A seta da linha "Localização" (Privacidade) está no desenho e ainda sugere um toque: decidir se leva aos ajustes ou se sai.
- Com o painel do mapa inteiro, os nomes de rua, o traçado e o marcador aparecem atrás do relógio: é a regra do vidro (`03-design-system/vidro/04-pecas.md`).
- O nome da parada quebra antes do número ("Carvalho, / 1200") e o "aqui" de "embarcam aqui" cai sozinho na linha de baixo, como no desenho. Um espaço que não quebra resolveria, e mudaria 25 referências.
- Com a troca de ponto ativa, o tocador do palco mostra o nome e a hora do passo de sempre.
- A T08-06 soma os horários (06:59, 06:51, 06:44) e não tem par nas Paradas.

**O que não foi conferido:** o vidro num iPhone de verdade, no Safari.

## 1.10 · o Face ID, a volta com destino e o mapa sem o "No horário"

11/11/2026

O porquê está em `07-decisoes/015-face-id-a-volta-e-o-mapa.md`.

- **O pedido de biometria é o do Face ID.** O celular do protótipo é um iPhone: sai a folha da digital e entra o alerta do sistema com o desenho do Face ID, o motivo que o app deu ("Confirme que é você para abrir o app.") e as saídas "Usar a senha do celular" e "Cancelar". Vale no Preparar o app (T03-02), no Bloqueado (T04-01) e na Privacidade (T12-02).
- **Os textos do app citam o Face ID** onde citavam "a digital ou o rosto": "Pedir o Face ID para abrir o app", "Use o Face ID ou a senha do celular para abrir o app.", "Método: Face ID", "O celular travou o Face ID depois de várias tentativas." e os outros do `textos.md` das quatro telas.
- **O cartão "Sua volta hoje · 17:20" abre a volta**, programada, e o link "Voltar para a ida de sempre" devolve a ida. A tela volta ao topo quando a viagem troca. O quadro não tem referência desenhada; os textos estão no fim do `textos.md` da T05.
- **O "No horário" saiu do herói do mapa** (T07-00, T07-08, T07-09, T07-10, T07-15 e T07-18).
- **O roteiro** tem 39 saídas por tema e nenhuma falta: a da volta deixou de ser "destino por desenhar".
- **No palco, a lista de estados mostra a barra de rolagem**, sempre à vista, no lugar de só se apagar na borda: fica claro que há mais estados abaixo. O tocador continua onde estava.
- **A prévia do link.** A página do protótipo ganhou as marcações de prévia (título, descrição e imagem), e a capa de 1280 × 640 foi refeita: a marca, o nome, a frase do produto e três telas. É a mesma imagem da capa do repositório, e viaja com o build em `app/public/`.
- **No palco, com lista curta, a coluna de estados fica no meio da altura do aparelho.** Com lista longa, ela ocupa a coluna toda, como antes.
- **A fidelidade:** 70 das 145 referências mostram conteúdo de antes e esperam o desenho novo.
- **O que falta:** o quadro da volta programada e o da folha F02 com o Face ID.

## 1.9.1 · o protótipo publicado

11/11/2026

- **O protótipo está em https://fretamento-mobs2-prototipo.vercel.app**, publicado na Vercel com o build feito na máquina (`06-prototipo/publicar.md`). Conferido no endereço publicado: abre no Entrar, os links de estado funcionam e não há chamada para fora.
- **O GIF do caminho principal** (`05-recursos/readme/caminho-principal.gif`), montado com as telas do próprio protótipo por `node conferencias/gif.mjs`: o Entrar, o código, o Preparar o app, o Início, as Paradas, o mapa, chegando, no ponto, o embarque e a chegada. Usa a biblioteca `gifenc`, só no desenvolvimento.

## 1.9 · o handoff fechado

11/11/2026

O handoff respondia "o que é de mentira" e "onde está o vidro". Faltava dizer com o que construir, o que o servidor entrega, qual desenho manda, como fazer o vidro fora da web e como conferir.

- **A stack** (`08-handoff/stack.md`): uma recomendação, com o porquê: React Native com Expo, um código para os dois lados, com o vidro do sistema no iOS 26. Quando escolher dois apps nativos, e por que não Flutter nem o protótipo embrulhado. Quem decide é o time de desenvolvimento.
- **O contrato com o servidor** (`08-handoff/api.md`), em proposta, para o backend validar: o que cada tela lê e envia, com os nomes do mock; a posição do ônibus (o que vem, de quanto em quanto tempo, quem calcula a idade do dado e quem calcula a previsão); os sete avisos com o app fechado; o que a tela precisa saber quando dá errado.
- **Qual desenho manda** (`08-handoff/README.md`): o protótipo com o vidro ligado e as fotos dele. As referências desenhadas valem para a medida do que não mudou; as 49 que mudaram estão listadas.
- **O vidro por plataforma** (`08-handoff/vidro-por-plataforma.md`): o que é do sistema, o que se constrói e o que vira sólido, no iOS 26, no iOS antigo e no Android, com os números da receita e código de partida em Compose, SwiftUI e React Native.
- **A receita do Android, medida no protótipo** (`?receita=android`): os cartões e as listas translúcidos, sem desfoque; o desfoque só no que flutua. Contraste medido nas 145 referências, nos dois temas: nenhum texto abaixo da régua. Da medida saiu um ajuste: no claro, o cartão precisa de 70 % de branco, e não 56 %.
- **Os dois guias**: `testes-prontos.md` (as 18 conferências, e o roteiro como teste de aceite do produto) e `conferir-contra-o-design.md` (o passo a passo por tela, o que pode ser diferente e o que não pode).
- **O mapa é decorativo**: o produto usa outro mapa. Do protótipo levam-se os marcadores, a rota e as peças de cima (`08-handoff/README.md`).
- **O wireframe do PM saiu do repositório.** O que mudou dele para o desenho continua em `01-produto/wireframe-do-pm.md`.
- **As imagens do README e as fotos da marca** foram refeitas depois do acerto da faixa do relógio no Entrar.
- **O que não é prova:** o código de partida de cada plataforma foi escrito a partir da documentação e não rodou em aparelho. O contrato com o servidor é proposta.

## 1.8.1 · a luz da marca sem corte, e o Código vazio

11/11/2026

- **No Entrar, a faixa do relógio parecia ter um véu escuro**, com uma borda reta embaixo. A área que rola começava abaixo do relógio e recortava a luz de trás da marca nessa linha. Agora, com o conteúdo de vidro, ela começa no topo da tela, por baixo da faixa do relógio (que não tem fundo), e o respiro de cima devolve os 47 dela: a luz sobe sem corte, e o bloco não muda de lugar.
- **No fluxo, o Código abre vazio, e qualquer código de seis dígitos entra.** Antes vinham cinco dígitos e faltava tocar o 6, sem nada na tela dizer isso. O incorreto, o expirado e o bloqueado continuam como estados parados. No `mock.json`, `loginDeTeste.qualquerOutro` passou de "incorreto" para "entra".

## 1.8 · a pasta organizada e as folhas de vidro

11/11/2026

- **As folhas de vidro**, em `03-design-system/folhas/vidro/`, tiradas do protótipo com as peças, as cores e os tokens de hoje: a F01 (os fundamentos, lidos do `tokens.json`, uma por tema, com o fundo de luz e os três níveis de vidro), da F02 à F07 (as peças, de vidro, nos dois temas) e a F10 (a marca, por tamanho). Saem de novo com `node conferencias/folhas.mjs`. As folhas desenhadas não foram tocadas e continuam sendo a norma do app com `?vidro=0`.
- **Duas vitrines novas**: `?vitrine=tokens` (a folha de fundamentos) e a vitrine das peças com o vidro ligado, sobre o fundo de luz (com `?vidro=0`, sólida, como antes).
- **A pasta na forma de repositório**: o `README.md`, o `LICENSE`, o `PROCESSO.md`, um `README.md` em cada pasta que precisava, o `.gitignore` e o `.gitattributes`. O `LEIA-PRIMEIRO.md` virou `GUIA-DE-LEITURA.md`, e `08-produto-real/` virou `08-handoff/`.
- **As imagens do README** em `05-recursos/readme/`, montadas com as fotos das telas (`node conferencias/fotos-readme.mjs`).
- **Como publicar** está em `06-prototipo/publicar.md`. O endereço do protótipo ainda não existe: o lugar dele está marcado no `README.md`.
- **O que falta:** a F08 (contraste), a F09 (movimento) e a F11 (o palco) existem só desenhadas; o texto da licença da fonte Inter não está na pasta `05-recursos/fontes/`; o GIF do caminho principal não foi feito.

## 1.7 · vidro por nível, a marca no quadro de vidro e o Código sem botão

11/11/2026

O vidro deixa de se empilhar, a marca do Entrar ganha um quadro de vidro com os recortes vazados, e o Código valida sozinho. O porquê está em `07-decisoes/014-vidro-por-nivel-e-a-entrada.md`.

### O vidro por nível

- **Três níveis**: vidro de fundo, vidro flutuante e vidro de controle (`03-design-system/vidro/01-onde-entra.md`).
- **O vidro de controle não tem desfoque.** Dentro de um cartão, de uma lista, de uma folha ou do painel do mapa, os botões, os chips, o trilho e o indicador das abas e o campo passam a ser preenchimento translúcido (8 % de branco no escuro, 50 % no claro), com borda de 1 px e fio de luz em cima. Eram 98 desfoques dentro de desfoque só no escuro; agora são zero.
- **O botão principal dentro de outro vidro** é o preenchimento do token, sem desfoque. A cor é a mesma.
- **O vidro flutuante ficou mais forte** sobre o mapa (o voltar, o título em cápsula, os controles e o painel) e nas bordas de rolagem: desfoque de 30, saturação de 180 %, fio de luz marcado e borda.
- **Uma conferência nova, o vidro em vidro**: nas 145 referências e nos dois temas, nenhum elemento com desfoque dentro de outro com desfoque, contando as camadas geradas. São 18 conferências agora. A fidelidade diz 96 de 145; 49 esperam o desenho novo. O desempenho ficou em 16,7 ms de mediana nos três movimentos, com vidro e sólido.

### A marca

- **O mesmo desenho, com os recortes vazados.** As janelas, o letreiro, os faróis e os contornos são buracos, feitos por máscara a partir do próprio arquivo. A cor fixa dos recortes saiu.
- **Sempre em duas cores, pela mesma regra nos dois temas**: a figura na `tinta`, o ônibus no `vivo` (o mesmo token do botão principal). No claro ela era de uma cor só.
- **O quadro de vidro**, de 88, com raio 20, e um ponto de luz atrás, só no Entrar. O nome fica 12 abaixo, na tinta de apoio, e o título, 28 abaixo do nome. O bloco fica no meio da altura útil, com o centro 4 % acima do meio (medido: 28 acima).
- **Três arranjos pelo endereço**: `?marca=l1` (o padrão, o quadro), `?marca=l2` (sem o quadro) e `?marca=l3` (em linha). `?cor=invertida` troca as duas cores. Com o teclado aberto, o quadro vai a 48 e o nome some.
- **A prova de tamanhos** (`?vitrine=marca`, e `06-prototipo/fotos/marca/tamanhos.png`): o quadro em 29, 40, 60, 88 e 180, nos dois temas e com as cores invertidas. Em 88 e 180 tudo lê. Em 60 a maleta se reconhece, sem o risco de dentro. Em 40 a maleta vira mancha. Em 29 só o ônibus e as janelas leem.
- **O centro de massa do desenho** já fica a 1,2 % do centro da caixa: não foi deslocado.
- **O ícone da loja**, novo: `05-recursos/marca/icone-loja.svg`, o desenho vazado sobre o fundo de luz do escuro.

### O Código (T02)

- **Abre com o teclado aberto**, com o foco no campo. O estado T02-00 passa a ser com o teclado.
- **O título fica logo abaixo do voltar**, alinhado à esquerda, com a mesma margem do título do Preparar o app.
- **O sexto dígito valida sozinho**, digitado ou colado. O botão "Entrar" saiu. Enquanto valida, um anel e "Entrando" aparecem abaixo do campo.
- **No fluxo, o código de teste vem com cinco dígitos**: falta tocar o 6.
- **A regra da casa**: capa centraliza, tarefa alinha à esquerda (`03-design-system/leis.md`).
- **A nota para a produção** sobre o campo do código está em `08-handoff/pendencias.md`.

### Desvios com nome

- **O título do Código não fica na mesma altura do título do Preparar o app.** As duas coisas pedidas não cabem juntas: o Código tem o voltar e o Preparar o app não tem. Ficou logo abaixo do voltar, com a mesma margem esquerda.
- **O desenho da marca não foi refeito.** A pessoa à frente do ônibus, a maleta maior e a espessura mínima de 32 não entraram: o desenho é o de sempre, só vazado.
- **A curva contínua do quadro** (o canto do iOS) não existe em CSS em todos os navegadores: o quadro usa o raio de 20.
- **O vidro flutuante forte vale sobre o mapa.** Nas outras telas, o voltar e o sino continuam neutros no escuro.
- **As bordas de rolagem ficaram com o desfoque de 30, sem a saturação de 180 %.** Com ela, o p95 da rolagem do Início ia de 16,7 para 33,3 ms, medido quatro vezes; sem ela, voltou a 16,8.

### O que falta

- **Os derivados do ícone** (`icone-android-frente.svg`, `icone-monocromatico.svg`, `icone-pequeno.svg`, `icone-app-notificacao.svg`) continuam com os recortes pintados. O `icone-app.svg`, que as referências usam, não foi tocado.
- **As referências do Código** (T02-00 a T02-03, T02-05 e T02-06) mostram o botão "Entrar".

## 1.6 · o fundo sem o lima

11/11/2026

O fundo que estava em teste vira o padrão. O porquê está em `07-decisoes/013-o-fundo-sem-o-lima.md`.

- **O fundo de luz padrão** passa a ser: no escuro, base `#120B1C`, roxo da marca `#6B2BD9` a 0,70, magenta `#A3268F` a 0,45 e índigo `#3730A3` a 0,55; no claro, base `#F6F3FB`, lavanda `#C4B5FD` a 0,60, rosa `#F9A8D4` a 0,45 e azul lavanda `#A5B4FC` a 0,50. Os lugares dos três pontos não mudaram. O lima sai do fundo.
- **`?fundo=anterior`** traz o fundo de antes, em qualquer tela e estado. Comparado ponto por ponto com as fotos da 1.5, em cinco telas e nos dois temas, é idêntico. O `?fundo=novo` deixa de existir.
- **A página, com o conteúdo de vidro**, acompanha a base: `#120B1C` no escuro e `#F6F3FB` no claro. Os tokens não mudam, e com `?vidro=0` a página é a do token.
- **O contraste foi medido de novo** nas 145 referências, nos dois temas: 2679 textos em cada, nenhum abaixo da régua; sobre vidro, 3236 textos, todos a 4,5:1 ou mais.
- **As fotos** das 145 telas, nos dois temas, foram refeitas. `06-prototipo/fotos/fundo-anterior/` guarda cinco telas do fundo de antes em cada tema e a folha lado a lado.
- **A conferência dos endereços** cobra o `?fundo=anterior` nas 145, nos dois temas, e o padrão sem o parâmetro.

## 1.5 · o Início mais curto, e um fundo em teste

11/11/2026

O Início diz menos antes do embarque, o mapa volta a abrir só pelo cartão, e o fundo de luz ganha um segundo conjunto de cores, em teste, sem mexer no padrão. O porquê está em `07-decisoes/012-o-inicio-mais-curto.md`.

### O Início

- **Sai a chegada na fábrica do herói**, nos estados antes do embarque. Depois do embarque, a fábrica continua sendo o alvo do herói.
- **Sai o selo "No horário".** No normal fica só o "Ao vivo"; "Atrasado" e "Adiantado", com os minutos, continuam.
- **A lista "Próximas paradas" começa onde o ônibus está.** O que já passou sai da T05; a lista inteira continua na T06.
- **Sai o botão do mapa do herói**, que tinha entrado na 1.4. O mapa abre pelo cartão "Ver no mapa", na T05 e na T06.
- **O cartão "Ver no mapa" na dobra**, medido num celular de 844 de altura: em rota (T05-00), inteiro, de 690 a 754; chegando (T05-01), espia, de 789 a 853, com 55 dos 64 de altura dentro da tela; no ponto (T05-02), inteiro, de 731 a 795. A borda de rolagem de baixo começa em 760: em chegando e no ponto, o cartão aparece por trás dela.
- **O `textos.md` da T05** perdeu 137 linhas, as que saíram da tela, em 22 referências. Nenhum texto novo.

### O fundo de luz

- **O fundo virou um conjunto de variáveis**, em `vidro.css`: de cada um dos três pontos, a cor, a opacidade, o lugar, o raio e o miolo (`--blob-1`, `--blob-2`, `--blob-3`), mais o lavado e a base. O padrão ficou idêntico, ponto por ponto, às fotos da versão anterior.
- **`?fundo=novo` troca só esse conjunto**, em qualquer tela e estado, e combina com os outros endereços. No escuro: base `#120B1C`, roxo da marca `#6B2BD9` a 0,70 em cima à esquerda, magenta `#A3268F` a 0,45 no meio à direita, índigo `#3730A3` a 0,55 embaixo à esquerda. No claro: base `#F6F3FB`, lavanda `#C4B5FD` a 0,60, rosa `#F9A8D4` a 0,45, azul lavanda `#A5B4FC` a 0,50, nos mesmos lugares.
- **O contraste do fundo em teste foi medido** nas 145 referências, nos dois temas (`claro.mjs --fundo=novo`): 2679 textos em cada tema, nenhum abaixo da régua. A opacidade do magenta ficou em 0,45, sem precisar baixar.
- **As fotos do fundo em teste** estão em `06-prototipo/fotos/fundo-novo/`: o Entrar, o Início em rota e no ponto, as Paradas e o Perfil, nos dois temas, e a folha que põe o padrão e o teste lado a lado. As 145 saem de novo com `claro.mjs --fundo=novo`.
- **Desvio com nome:** os pontos de luz são degradês numa camada parada atrás de tudo, e não caixas com desfoque. O resultado é o mesmo ponto de borda macia, sem o custo do desfoque, e sem `backdrop-filter`.

### As conferências

- **Os endereços** cobram o `?fundo=novo` nas 145 referências, nos dois temas: o conjunto troca, o padrão sem o parâmetro é o de sempre, um valor que não existe cai no padrão, e com `?vidro=0` não há fundo de luz.
- **O roteiro** ganhou as saídas dos textos legais (T03 e T12), do "Preciso de ajuda" (T10) e de Meus dados (T12), e perdeu a do botão do herói: 76 toques nos dois temas, nenhum quebrado. Uma saída que está na tela e cujo destino não foi desenhado sai como "falta".
- **A fidelidade:** 102 de 145 batem; 43 esperam o desenho novo, com o porquê de cada uma atualizado em `a-redesenhar.json`.

### O que foi corrigido

- **A logo no claro** desenhava a maleta sem a alça: a alça é um traço, e só o preenchimento trocava de cor. Agora o traço troca junto.

### O que falta

- **A volta vista de manhã não tem quadro.** O cartão "Sua volta hoje · 17:20" está na T05 e não leva a lugar nenhum: a volta só está desenhada às 17:21, no ponto (T05-17). A linha antiga do roteiro passava por engano, porque achava a palavra "volta" no próprio cartão; agora ela só passa se o herói mudar. Proposta: desenhar a volta programada, ou tirar a seta do cartão.
- **O herói do mapa (T07) ainda mostra "No horário".** O corte foi feito no Início. Proposta: aplicar a mesma regra no mapa.
- **As referências da T05** mostram o conteúdo de antes dos cortes.

## 1.4 · um agora só, e o acento em quatro lugares

10/11/2026

Uma revisão do protótipo inteiro: o dado da viagem ficou coerente, o acento ficou contido e o Início diz cada coisa uma vez. O porquê está em `07-decisoes/011-o-relogio-e-o-acento.md`.

### O dado e o relógio

- **Todo tempo relativo é calculado do agora do estado** (`relativo`, em `app/src/dados`). O trilho recalcula o que vai sob a hora; o herói do mapa também. Sem internet, conta a partir da hora do dado guardado.
- **O que estava desencontrado e mudou:** T05-03 (a fábrica a 31 min, e não 51; o ônibus vai para a Av. Recife), T05-08, T05-18, T05-14, T05-15, T05-16, T06-01, T06-02, T06-03, T06-12, T07-13 e T07-17. "Menos de 2 min" vale no herói e na linha do tempo.
- **Nos estados com a previsão deslocada** (atrasado, adiantado, em desvio), a Av. Abdias mostra o relativo sob a hora, como nos outros.
- **O prefixo vem antes da placa**, em todo lugar (`prefixoEPlaca`): "1234 · ABC1D23" no "Confira o ônibus" e no selo do mapa; "ônibus 1234 · ABC1D23" nas Notificações, que mudou no `mock.json`.
- **A contagem de pessoas sai de uma função só** (`pessoasQueEmbarcam`), usada no Início, nas Paradas e no Outro ponto.
- **Uma conferência nova, o relógio**: em 66 estados do Início, das Paradas e do Mapa, cada relativo bate com o agora, o número do herói bate com a hora ao lado, e o nó do ônibus fica entre a última parada que passou e a próxima. Ela achou três desencontros além dos que já se conheciam (T05-14, T07-13, T07-17).

### O Início

- **No ponto:** "Parado no seu ponto · Av. Abdias de Carvalho, 1200" na linha de cima, "No ponto" no herói, o selo "Ao vivo" sozinho. Na linha do tempo, o ícone do ônibus fica sobre a parada, com "o ônibus está aqui". Vale nas Paradas e no Mapa, para toda parada em que o ônibus está parado.
- **Depois do embarque:** o selo diz "Embarcou às 06:44" e a frase "Você embarcou às 06:44." sai. Com o crachá, fica só "Seu crachá foi lido no ônibus 1234."
- **O botão do mapa no herói**, no canto de cima, à direita: 36 no olho, 44 no toque, em todo estado com viagem. O cartão "Ver no mapa" continua.
- **Com "cerca de" na frente, o herói cabe numa linha**: o número encolhe um degrau (36).

### O vidro e a cor, com o vidro ligado

- **O acento fica em quatro lugares**: o botão principal, o ponto "ao vivo", o nó do ônibus e a posição atual no mapa. A linha do tempo fica neutra; "Seu ponto" e "Ponto de sempre" são chips neutros fortes, e "Destino", secundário; os links são texto primário sublinhado; o ícone do "Confira o ônibus" é um poço de vidro.
- **A escolha continua na cor de ação**, em tom leve (o rádio, o chip escolhido, a linha escolhida): fica fora dos quatro lugares de propósito.
- **O interruptor ligado usa a cor de ação do tema** (lima no escuro, roxo no claro). No claro ele tinha ido para a tinta.
- **No escuro, o vidro dos controles é neutro.** O vidro da biblioteca satura o que passa atrás, e com a luz roxa do fundo o voltar, o "Perto de mim" e os chips viravam manchas roxas. A saturação deles cai para 0,55.
- **O desfoque sai de três tokens, por papel** (`--vd-desfoque-cartao`, `-controle`, `-borda`), sempre com o par `-webkit-`.
- **O botão desligado** usa a opacidade de desligado da biblioteca (45 %), nos dois temas.
- **O link solto alinha na margem do texto**: o recuo de 4 é só a área de toque.

### O palco

- **"Modo claro", com sol**, no lugar de "Modo escuro" com lua. Ligado é o Claro. É a mesma chave da Aparência do Perfil; com a Aparência no Sistema, ele mostra o tema que vale, e mexer nele grava Claro ou Escuro.
- **O nome do estado quebra a linha**, no lugar de ser cortado.
- **"O dia, na ordem" tem os cinco passos do dia.** "Rolada até o fim" é momento de toque e foi para "Tocando no app".

### As conferências

- **São 17** (entraram o relógio e o roteiro).
- **O roteiro** percorre o protótipo tocando, do zero, nos dois temas: o caminho feliz até a fábrica, cada saída do Início, das Paradas, do Outro ponto, do Perfil e da Excluir conta, o voltar de cada tela e a troca de tema no meio do caminho. São 33 toques por tema.
- **A fidelidade conta à parte as referências que esperam o desenho novo.** São 41, listadas com o porquê em `06-prototipo/fotos/fidelidade/a-redesenhar.json`. Nelas o texto continua cobrado contra o `textos.md`; a comparação com a imagem volta quando o quadro for redesenhado.

### O que ficou diferente do descrito, e por quê

- **A folha F11 e o `palco.md` diziam "Modo escuro".** O `palco.md` foi atualizado; a folha ainda mostra o nome antigo.
- **A lei 1 dizia que o link é lima.** Com o vidro ligado, o link é texto primário sublinhado. A lei ganhou a exceção.
- **A viagem cancelada (T05-26) não se alcança tocando**: ela só existe como estado parado. A ação "Ver a viagem das 07:05" está ligada no fluxo, mas não há caminho até ela.
- **"Sair da conta" leva ao Entrar com o contato preenchido**, como em todo o protótipo, e não vazio.
- **O que foi conferido e já estava certo, medido:** os cartões têm vidro (9 camadas com desfoque no Perfil, 4 delas cartões; o desfoque mora numa camada interna do cartão), a lente tem volta no WebKit (o botão cai para desfoque com preenchimento) e o texto secundário passa 4,5:1 nos dois temas. (9 camadas com desfoque no Perfil, 4 delas cartões; o desfoque mora numa camada interna do cartão), a lente tem volta no WebKit (o botão cai para desfoque com preenchimento) e o texto secundário passa 4,5:1 nos dois temas.

### A renumeração das referências

As referências passaram a ser numeradas na ordem em que aparecem no painel do palco. Das 145, 25 mudaram de número; as outras 120 ficaram como estavam. Mudou junto tudo o que cita uma referência: os arquivos de referência (o número na frente do nome), o `casos.json`, os `textos.md` e `estados.md` de cada tela, a norma do vidro, o `palco-estados.json`, o código, as conferências e as fotos. Os endereços `?ref=` seguem o número novo. Em todo este registro, as referências já aparecem com o número novo.

O conteúdo dos HTML de referência não foi tocado: dentro deles o número ainda é o antigo, até o redesenho.

| antigo | novo | nome |
| --- | --- | --- |
| T01-03 | T01-06 | "Não recebi convite" |
| T01-06 | T01-03 | enviando o código |
| T05-01 | T05-05 | 06:24 · rolada até o fim |
| T05-02 | T05-01 | 06:41 · chegando |
| T05-03 | T05-02 | 06:42 · no ponto |
| T05-04 | T05-03 | 06:44 · tocou "Embarquei" |
| T05-05 | T05-04 | 07:17 · concluída |
| T05-10 | T05-12 | 06:30 · atrasado 8 min |
| T05-11 | T05-13 | 06:26 · adiantado 4 min |
| T05-12 | T05-18 | 06:30 · aproximado (dado antigo) |
| T05-13 | T05-19 | 06:28 · em desvio |
| T05-18 | T05-20 | 06:30 · sem sinal do ônibus |
| T05-19 | T05-21 | 06:36 · sem internet no celular |
| T05-20 | T05-26 | 05:40 · cancelada pela transportadora |
| T05-21 | T05-10 | 06:07 · ônibus a definir |
| T05-22 | T05-27 | 06:24 · recuo para o programado |
| T05-26 | T05-28 | 06:24 · avisos desligados |
| T05-27 | T05-29 | 06:24 · celular sem bloqueio de tela |
| T05-28 | T05-30 | 06:24 · entrou de novo depois de a segurança mudar |
| T05-29 | T05-31 | sáb 31/10 · sem viagem hoje |
| T05-30 | T05-22 | 06:24 · erro ao carregar |
| T05-31 | T05-11 | 06:24 · carregando |
| T10-05 | T10-03 | rolada até o fim: Aparência, ajuda, Sair e Excluir |
| T10-03 | T10-04 | sem internet |
| T10-04 | T10-05 | Preciso de ajuda sem transportadora no cadastro |

## 1.3 · todo de vidro

10/11/2026

O conteúdo também passa a ser de vidro: os cartões, as listas e a marca do Entrar são o painel da biblioteca, sobre um fundo de luz parado atrás de tudo. São 17 peças de vidro. O porquê e os cuidados estão em `07-decisoes/010-o-conteudo-tambem-e-de-vidro.md`. A peça nova, `conteudo`, desliga numa linha do `vidro.config.ts` (ou com `?sem-vidro=conteudo`), e o app volta à versão 1.2.

### O que mudou

- **O fundo de luz.** Três pontos de luz de borda macia, em diagonal: o roxo do app, forte, atrás da saudação e do herói; um magenta à direita, no meio; e um toque baixo de lima embaixo, à esquerda. Por cima, um grão fino, para o desfoque do vidro ter textura. No claro, o roxo e um rosa bem claros, sem o lima. Saíram no caminho: um azul (destoava), o degradê liso (o vidro não tinha o que refratar), uma faixa em diagonal (marcada demais) e um quarto ponto de luz (sobrava). Uma versão só com roxos, mais tímida, deixava o desfoque virar só escurecimento.
- **O mapa entra na família de cor do app, só nesta versão.** Com o conteúdo de vidro, as variáveis do mapa são redefinidas dentro da tela: o terreno e as ruas ganham um pouco mais de roxo, e a água sai do azul para um violeta fundo (`#2b1d4a` no escuro, `#e3dbf6` no claro). Os tokens do mapa não mudam: as referências foram desenhadas com eles, e com o vidro desligado o mapa é o de sempre.
- **A marca do norte (a bússola) sai do mapa**, só nesta versão. O mapa do app nunca gira, então ela não informa nada, e com 22 era pequena demais para se ler. Os apps de mapa só mostram a bússola quando o mapa está girado. Com o vidro desligado ela continua, como nas referências.
- **Os vidros que flutuam sobre o mapa e levam texto ou glifo** (a cápsula do nome da linha, o grupo de controles, o balão do ônibus) são o mesmo vidro: o tom do cartão na camada fosca (64 % no escuro, 56 % no claro) e o desfoque da biblioteca.
- **No mapa, o vidro ficou mais transparente**: a placa do painel foi de 58 % para 40 % de `fundo-cartao` no escuro (70 % no claro), com desfoque 10. O nome da linha passou a morar no painel em pílula da biblioteca, com a lente; como ele leva texto e o disco do ônibus pode passar atrás, a camada fosca leva o tom do cartão (64 % no escuro, 56 % no claro): com o vidro claro de fábrica, media 2,0:1.
- **Cartões, listas, cartões que se tocam, o cartão de contato, o de quem resolve e a opção com switch** são o `GlassPanel`, em cartão, com o tom do nosso cartão na camada fosca (60 % no escuro, 64 % no claro).
- **No claro, o vidro é branco, com sombra macia puxada para o roxo.** Não é o escuro invertido.
- **Os poços de ícone são um vidro pequeno** (o preenchimento e a borda de controle da biblioteca), e o glifo vai na `tinta`: o azul da volta e o roxo da ida saem.
- **Os chips de escolha (5, 10 e 15 min) são o botão de vidro da biblioteca**, com papel de rádio. O escolhido é o vidro tingido de `vivo` a 30 %, com contorno em `vivo`: com o `vivo-suave` (10 %), sobre o vidro, só a letra dizia a escolha.
- **A placa do "Confira o ônibus", a nota e o esqueleto** viram poços translúcidos, sem desfoque.
- **A marca do Entrar fica sem o quadrado**: só o desenho, numa caixa de 120 (ele ocupa pouco mais da metade dela, como ocupava o quadrado de 72), direto sobre o fundo de luz. No claro ela troca de cores como o resto do app: o ônibus vai no roxo da marca, a figura na tinta, e os recortes ficam da cor do fundo. Um quadrado de vidro foi testado em três versões (roxo translúcido, roxo cheio, vidro branco) e nenhuma ficou boa no claro.
- **O Entrar e o Código ficam no meio da tela, com o formulário num cartão de vidro** (as abas, o campo e o botão; no Código, o campo e o botão). Quando o teclado sobe, o bloco sobe junto e se centraliza no espaço que sobra acima dele, em 240 ms: o campo e o botão nunca ficam atrás do teclado.
- **O campo e o trilho das abas usam a mesma receita translúcida** (o tom elevado a 62 %, com a borda da biblioteca). O campo de fábrica parecia sólido ao lado das abas.
- **O botão principal perde o brilho de gel.** Saem o reflexo que cruza o botão e a borda clara em degradê; ficam a cor chapada, um fio de luz de 1 px em cima e um brilho macio para fora, da cor do botão. A cor do miolo não muda. Vale para o destrutivo.
- **O texto de apoio fica um tom mais claro no escuro** (`#bbaac5` no lugar de `#af9bba`), só nesta versão: com a luz do fundo mais forte, é o que mantém 4,5:1 sobre os pontos de luz.
- **O herói é o mesmo vidro em todos os estados**: o mesmo raio (16), o mesmo tom, a mesma borda. Em chegando e no ponto ele não fica mais redondo (era 24) nem muda de cor (era `fundo-destaque`), e na viagem cancelada não ganha o contorno vermelho. Quem diz o estado é o que está dentro: a palavra grande, o selo, a placa, o botão. Os outros cartões em destaque seguem a mesma regra.
- **Os traços sobre o vidro se leem.** As cores sólidas de traço (`divisoria`, `borda`) foram feitas para o cartão sólido e sumiam sobre o vidro. Dentro de uma peça de vidro elas passam a ser a tinta translúcida (16 % e 36 % no escuro, 12 % e 32 % no claro), e o cartão ganha um contorno de 1 px (branco a 13 % no escuro, o roxo da marca a 14 % no claro). Vale para as divisórias, o contorno do rádio e o dos chips.
- **A linha escolhida numa lista leva um véu do `vivo` a 14 %** cobrindo a linha inteira (lima no escuro, roxo no claro), no lugar do `fundo-destaque`, que sobre o vidro roxo quase não aparecia. O texto de apoio dela vai na `tinta`: em `tinta-apagada` media 4,0:1.
- **O perfil, na barra, é a mesma esfera de vidro do sino**, com as duas iniciais do nome (AS) na tinta; no cabeçalho do Perfil, também as duas. Com o vidro desligado, continua a inicial só, como nas referências. Com o fundo de luz roxo na tela inteira, o avatar roxo disputava com ele.
- **O título do Preparar o app cresce para 22/28 em peso 700**, como a saudação da home.
- **O conteúdo não tem a lente da borda.** Ela foi testada no herói e saiu: custava 33 ms por quadro na rolagem e, desligada só enquanto a tela rolava, fazia o vidro mudar de aparência e de cor.
- **A borda de rolagem de cima só aparece quando há conteúdo rolado por baixo da barra**, e ficou mais leve; a de baixo cobre até a ponta da tela.
- **Dentro do painel do mapa, o cartão continua sólido.** O mapa e o trilho não mudam.

### O claro, refeito

O claro era o escuro invertido: branco sobre lilás, com o roxo escuro em tudo. Ficava leitoso, o vidro não aparecia e nada se destacava. Com o conteúdo de vidro, ele ganha regras próprias (a seção 4 do `vidro.css`):

- **A página é quase branca e neutra** (`#faf9fc`), com a luz roxa concentrada num ponto forte, em cima, e dois bem suaves.
- **Os cartões são vidro branco mais translúcido** (56 %), com brilho no topo, contorno nítido e a saturação do que passa atrás mais alta, para a luz roxa aparecer dentro deles. A sombra é neutra, curta e firme: a sombra roxa larga fazia uma névoa lilás.
- **O texto de apoio fica um tom mais escuro** (`#5b4c65` no lugar de `#6f5f78`): mais presença, e 4,5:1 sobre o ponto mais forte da luz.
- **O roxo cheio fica para o botão principal, os links e o que está ao vivo.** O interruptor ligado e os chips de papel ("Seu ponto", "Destino") vão para a tinta.
- **O véu das folhas é um escurecido leve e neutro** (16 %), no lugar do véu arroxeado. Um véu com desfoque foi testado e saiu: a tela de trás ficava ilegível.
- **As abas** têm o trilho um tom mais escuro, para a opção escolhida, branca, se destacar. **Os campos** têm um preenchimento só, branco, com contorno que se lê. **O botão desligado** e **o esqueleto** ficaram mais marcados.
- **O aviso de atenção** é âmbar limpo sobre branco. **A linha escolhida** é um lilás limpo, feito sobre o branco do cartão. **A marca do Entrar** vai inteira no roxo da marca.

### O que ficou diferente do descrito, e por quê

- **No claro, com o conteúdo de vidro, o interruptor ligado é a tinta, e não o `vivo`.** As leis do claro dizem que o roxo faz o papel do lima; com o roxo em tudo, nada se destacava. O `vivo` continua no botão principal, nos links, no que está ao vivo e na escolha (o rádio, o chip, a linha).
- **`tinta-apagada` (nos dois temas) e `fundo-pagina` (no claro) são redefinidos dentro da tela**, só nesta versão. Os tokens não mudam.
- **O botão principal deixa de ser o da biblioteca "como ela desenha".** Três camadas dele são redesenhadas em `vidro.css` (o reflexo, a borda e o brilho), para tirar o aspecto de gel. A decisão 009 dizia que nada se pinta por cima do vidro da biblioteca; a 010 abre essa exceção.
- **A lei 5 mudou de texto**: de "superfície sólida atrás de texto" para "superfície firme atrás de texto", medida a 4,5:1 na tela. A linha dos proibidos do `CLAUDE.md` da raiz mudou junto.
- **O sentido da viagem perdeu a cor no poço do ícone.** A referência pinta o ônibus da volta em `rota-volta` e o da ida em `rota-ida`; com o conteúdo de vidro, os dois vão na `tinta`. O texto do cartão diz qual é.
- **O herói em destaque e o herói de perigo perdem a forma própria.** As referências dão raio 24 e `fundo-destaque` ao herói em chegando e no ponto, e borda `perigo` ao da viagem cancelada; com o conteúdo de vidro, o herói é sempre o mesmo vidro.
- **O avatar mostra duas iniciais** com o conteúdo de vidro; o `textos.md` diz uma.
- **As cores do mapa mudam sem mudar os tokens**: são redefinidas em `vidro.css`, dentro da tela, só nesta versão.
- **O conteúdo de vidro não usa as cores de superfície de fábrica da biblioteca.** Com o branco a 8 % dela, o texto de apoio caía para 3:1 no escuro. O tom entra pela cor da camada fosca, que é onde a biblioteca manda recolorir.
- **As cores do fundo de luz não são tokens.** São ótica do vidro e moram em `vidro.css`.
- **O segmentado ganhou um tom firme no trilho** quando o conteúdo é de vidro: a página lisa não existe mais atrás dele.

### As conferências

- **O vidro nas telas** mudou a regra do vidro dentro de vidro: os controles moram dentro do conteúdo de vidro; continua proibido peça que flutua dentro de outra e conteúdo de vidro dentro de peça que flutua. O texto que está por baixo de uma borda de rolagem não se mede: ela o apaga de propósito.
- **O contraste do vidro** mede cada peça sobre o fundo onde ela mora: o conteúdo sobre a página lisa, o painel e a barra do mapa sobre o mapa.
- **Uma conferência a mais, o escuro** (são 15): o contraste de todo texto, medido na tela, também no tema escuro. Com o fundo de luz, o texto de apoio mora sobre uma cor que não é mais a da página. A razão passa a ser comparada com uma casa decimal, como as tabelas escrevem: o selo "Viagem cancelada" do escuro mede 4,47:1 desde a versão 1.0 (`perigo` sobre `perigo-suave` sobre o cartão), e nenhuma conferência media isso. **Proposta:** `perigo-suave` do escuro a 13 %, que dá 4,6:1.
- **O desempenho** foi medido com o conteúdo de vidro: 16,7 ms por quadro nos três movimentos, com a CPU em 4×.

## 1.2 · liquid glass: o vidro da biblioteca

10/11/2026

O vidro deixou de ser uma faixa atrás da barra e do rodapé e passou para as peças e os controles, com os componentes da GlassyUI na forma que ela propõe. São 16 peças de vidro (eram 13), com doze componentes da biblioteca. O porquê está em `07-decisoes/009-o-vidro-e-o-da-biblioteca.md`; a norma, em `03-design-system/vidro/`, foi reescrita junto.

Com o vidro desligado (`?vidro=0`), nada mudou: as 145 referências continuam batendo com os PNG e com o HTML.

### O que mudou, peça por peça

- **A barra do topo e o rodapé fixo não são mais faixas de vidro.** O conteúdo rola por baixo, com a borda de rolagem: um desfoque de 18 que some na cor da página. O véu escuro que ficava no topo saiu.
- **Os botões da barra são esferas de vidro de 44** (o `GlassButton` redondo), com o glifo de 22. O contador do sino fica por fora da esfera. O perfil é o `GlassAvatar`, de 44 na barra (no sólido, 32) e de 72 no Perfil.
- **Na home, a saudação cresce para 22/28 em peso 700** com o vidro ligado: sem a faixa, ela é o título da tela. O texto é o mesmo.
- **Sobre o mapa, o título mora numa cápsula de vidro** de 44, ao lado da esfera do voltar.
- **A folha (sheet) é a `GlassSheet`, como a biblioteca desenha**: solta das bordas, com o canto de 40, a alça com mola e o X dela. O desfoque da placa é 14 (o que a biblioteca usa sem lente) e não 3: com 3, o botão do rodapé da tela de trás aparecia como uma faixa com letra atrás dos botões da folha.
- **O painel do mapa usa a mesma placa da folha**, solto das bordas, 21 acima do fundo, por cima do indicador de início. O topo dele não saiu do lugar. A placa é mais firme que a da folha (58 % de `fundo-cartao` no escuro, 90 % no claro), porque ele não tem véu e o mapa passa por baixo do texto.
- **Os botões são o `GlassButton`**, em cápsula, com 48 de altura. O principal é o vidro tingido da biblioteca: o tom foi medido na tela até dar o `vivo` (170 240 1 no escuro, para o token 170 239 0; 80 6 130 no claro, para 79 0 125) e o `perigo-forte` no destrutivo (211 47 43). **É um botão só**: dentro da folha e do painel do mapa ele sairia mais escuro, porque a placa o separa da página e ele herdaria a lente dela; ali a luz debaixo dele fica cheia e a lente é a dele. Medido: a mesma cor no Início, na folha e no mapa.
- **Os campos são o `GlassInput` e o `GlassTextarea`; os selos, o `GlassBadge`.** O selo não desfoca: ele mora no conteúdo.
- **As cores de superfície do vidro são as da biblioteca, à risca.** O preenchimento, a borda, o trilho e a bolinha das abas, dos campos, do switch e do X da folha não usam mais os tokens do app (`fundo-elevado`, `borda`, `fundo-sobreposto`). Do app ficam a tinta e as cores com significado: `vivo`, `perigo-forte`, o roxo do avatar, a cor de cada selo.
- **O segmentado é o da biblioteca como ela desenha**: o trilho de vidro em cápsula e a gota que desliza. Ele só mora na página lisa e dentro de cartão: sobre o mapa ou sobre a rolagem, com o disco lima atrás, o texto mede 1:1. Na vitrine, a régua de contraste dele é a página lisa (4,5:1 no claro, 5,6:1 no escuro); nas telas, 4,5:1 e 4,8:1.
- **O avatar é um disco de vidro claro com um tom leve de roxo**, a inicial em `avatar-tinta`, o fio de luz da biblioteca e a sombra das esferas. Sem degradê e sem cor cheia: no claro, o roxo cheio é o mesmo do botão principal e disputava com ele.
- **O botão carregando leva o anel de espera da biblioteca** (`GlassSpinner`) antes do texto, e continua de vidro.
- **O banner flutua** abaixo da barra, solto das bordas, com o canto de 18, sem a faixa de 4 da esquerda.
- **O que continua sólido:** o herói, a placa do "Confira o ônibus", os cartões, as listas, o trilho, o mapa, os chips de escolha única, o teclado e o push. É conteúdo, e o vidro é da camada que flutua e dos controles.

### O que foi corrigido no protótipo

- **O app abre no Entrar**, e recarregar a página volta ao Entrar (abria no Bloqueado, que desbloqueava sozinho). O Bloqueado se alcança pelo painel do palco. `palco-estados.json` diz `abreEm: T01`.
- **O painel do mapa não descia com um arrasto curto.** Ele assentava na altura mais próxima, e era preciso arrastar mais da metade do caminho; e só a alça arrastava. Agora o painel inteiro arrasta, e a partir de 24 de arrasto ele vai para a altura do lado para onde o dedo foi. Com o detalhe de uma parada aberto, puxar para baixo fecha o detalhe.
- **O controle do seu ponto (a pessoa) não acendia.** Agora acende enquanto o mapa está centrado no seu ponto, como o do ônibus e o da mira.
- **O pé da tela não tinha a borda de rolagem.** Nas telas sem rodapé, o conteúdo era cortado seco pelo indicador de início; agora ele some na cor da página enquanto há o que rolar.

### O código copiado da biblioteca

- Voltaram `glass-sheet` e `glass-button`, e entraram `glass-avatar`, `glass-input`, `glass-textarea`, `glass-badge` e `glass-spinner`, com os pacotes `@radix-ui/react-dialog`, `@radix-ui/react-slot` e `@radix-ui/react-avatar`. São doze componentes.
- **Duas propriedades a mais na `GlassSheet`** (`container` e `panelRef`), para a folha abrir dentro da tela do aparelho. O desenho e o comportamento dela não mudaram.
- O resto está em `06-prototipo/app/src/components/glassyui/MODIFICACOES.md`.

### O que é do protótipo

- **Os campos já vêm preenchidos no fluxo**, para ninguém precisar digitar: o e-mail e o celular da Ana no Entrar, o código 123456 no Código, o texto do pedido em Meus dados. As referências de campo vazio continuam abrindo vazias por `?ref=`. Está em `08-handoff/simulado.md`.

### As conferências

- **As conferências entram no app pelo Entrar** (o código, o Preparar o app, o Início), e o fluxo alcança o Bloqueado pelo painel.
- **O que se toca compara 67 momentos com o quadro (eram 73).** Os seis de campo vazio (T01-00 duas vezes, T01-01, T01-06, T12-06 e T12-08) não se alcançam mais tocando, porque o campo vem preenchido: eles continuam conferidos parados, pela fidelidade, e no fluxo se cobra o valor que veio no campo.
- **O primeiro quadro do fluxo (a folha da biometria) é fotografado 450 ms depois de abrir**, e não 1 s: a biometria confirma sozinha 1,4 s depois de a folha abrir, e a foto caía em cima disso.
- **O vidro nas telas** passou a achar vidro dentro de vidro pelo desfoque de verdade (no elemento e nos pseudo-elementos), e não pela marca da peça, e a cobrar que nada do conteúdo fique escondido atrás da barra ou do rodapé.
- **O vidro na moldura** mede no palco de verdade: a nitidez do mapa atrás do painel de vidro contra a do mapa nu.
- **O fechamento** cobra o e-mail e o código preenchidos.
- **O claro** não mede mais o texto que fica atrás do indicador de início: ele é do celular, fica por cima de tudo e não recebe o toque, e a régua lia o rótulo do mapa por baixo dele como texto sobre preto.
- **Os tocáveis** são medidos também com o vidro ligado: de vidro, as peças tomam a forma da biblioteca, e o nome e os 44 de toque têm que valer nos dois materiais.

### O desempenho

- **O painel do mapa não tem a lente da borda.** Com a lente, e a CPU em 4×, arrastar o painel caía para 50 ms por quadro (53 quadros acima de 50 ms) e o dia andando no Mapa para 33 ms. Sem ela, os três movimentos medidos ficam em 16,7 ms, com o vidro e sem ele. A tabela está em `06-prototipo/fotos/vidro/telas/desempenho.md`.
- **Camadas que desfocam por tela:** de 2 a 8. O teto é a folha de confirmação aberta sobre uma tela com rodapé.
- **Não medido:** a folha da biblioteca abrindo (ela tem lente e sobe em 500 ms), e nada em celular de verdade.

### O que ficou diferente do descrito, e por quê

- **A decisão 006 dizia que a forma é a da referência e que o botão primário fica sólido.** Com o vidro ligado, a forma agora é a da biblioteca e o botão primário é de vidro. A decisão 009 registra a troca, e a linha dos proibidos do `CLAUDE.md` da raiz mudou junto.
- **A folha tem um X.** As referências não têm botão de fechar no canto; a folha da biblioteca tem, e ele fecha como o Cancelar.
- **O indicador de início fica sobre o mapa, abaixo do painel**, e não dentro dele.
- **Um token mudou de valor: `fundo-destaque`, no claro, foi de `#F3E9F8` para `#E8E0F1`.** A lavanda do herói em chegando e no ponto estava clara demais sobre a página e puxava para o rosa. Um valor mais escuro e mais saturado (`#EDDCF9`) foi testado e ficou saturado demais. O que ficou é um lilás menos saturado, da família dos neutros da página (`fundo-elevado`, `fundo-sobreposto`), um degrau mais escuro que o de antes, com o texto de apoio (`tinta-apagada`) a 4,6:1. **A folha F01 do claro ainda mostra o valor antigo**, no HTML, no PNG e no texto: ela precisa ser redesenhada. O `tokens.css` foi escrito à mão nessa linha, porque o gerador dele não está na pasta.

## 1.1 · o protótipo navegável

10/11/2026

O protótipo em código, em `06-prototipo/app/`, construído a partir da pasta.

As 13 telas navegam dentro do palco, com o dia andando igual no Início, nas Paradas e no Mapa. As 145 referências batem com os PNG, no escuro e com o vidro desligado; 73 momentos se alcançam tocando e chegam no quadro da referência; o vidro está nas 13 peças, com volta por `?vidro=0` e por uma linha de cada peça; o claro foi fotografado e medido nas 145. São 14 conferências que rodam sozinhas (`npm run conferir`, em `06-prototipo/app`). O que ficou diferente do descrito, o que falta desenhar e o que se propõe mudar estão abaixo, um por um.

### A stack que ficou

Vite 8.3.7 · React 19.3.1 · TypeScript 7.0.2 · Tailwind CSS 4.3.5 · Playwright 1.65.0 (Chromium e WebKit) · pixelmatch 8.0.0 e pngjs 7.0.0 para a comparação das fotos · clsx 2.1.1. Node 24.

### O que mudou em relação ao descrito, com o porquê

- **O reset do Tailwind não entra no app.** As referências partem do padrão do navegador (caixa de conteúdo, margens próprias de título e parágrafo), e as medidas das peças foram lidas delas. Com o reset, um chip de 44 com borda mediria 44 e não 46, como no quadro. O Tailwind entra como pipeline, com os tokens no tema dele, e os utilitários ficam para o palco e as vitrines.
- **Os tokens não são copiados.** `06-prototipo/CLAUDE.md` falava em "cópia gerada de `tokens.css`". O app lê `03-design-system/tokens.css` direto, por alias. Em `app/src/tokens/` fica só o nome de utilitário de cada token, gerado do `tokens.json` por `conferencias/gerar-tokens.mjs`.
- **As conferências moram em `app/conferencias/`**, uma por arquivo, e `npm run conferir` roda todas. A estrutura de `06-prototipo/CLAUDE.md` ganhou essa pasta.
- **A fidelidade tem chão medido.** O HTML de cada referência, fotografado no mesmo navegador, já difere do PNG dela por serrilhado de borda (0,06 % da tela em média; 0,5 % na T09-07). "Bate" passou a ser: o chão da referência mais 0,15 % da tela. O chão está em `06-prototipo/fotos/fidelidade/chao.md`.
- **Dois endereços a mais, só para conferir:** `?rolar=fim` ou `?rolar=meio` (rola a tela para a foto) e `?sem-vidro=<peça>` (faz o papel de uma linha do `vidro.config.ts` em `false`, para provar que cada linha desliga só a peça dela sem reconstruir o app).

- **As peças são folhas de estilo com as classes das referências.** Cada peça mora uma vez em `app/src/ds/`, com um componente e uma folha CSS. As medidas foram lidas das regras de estilo das 145 referências (363 seletores em uso), e as cores passaram a token pelo papel de cada peça. As classes curtas das referências (`.tb`, `.card`, `.hero`, `.sheet`…) foram mantidas, porque as fichas do vidro apontam as peças por elas.
- **A mesma classe muda de medida de uma tela para outra em 18 lugares.** No código, cada variação virou uma variante com nome na peça, nunca um ajuste na tela: a barra (`home`, `so-titulo`, `nua`), a área que rola (`justa` no Preparar o app), o link (`centro`, `pequeno`, `da-barra`, `do-cartao`), o segmentado (`icones`), o erro no lugar (`liso`, no código), o banner (`largo`, no Entrar). Duas classes das referências nomeavam duas peças diferentes: `.cp` (o estado central da T04 e o chip de papel da parada) e `.grp` (o grupo de frases da T03 e o grupo recolhido da T08). No código, o estado central da T04 é `.central` e o grupo da T03 é `.grupo`.
- **Glifos que as telas desenham e não estão entre os 64.** O sino sem badalo (T10, T09-03), o triângulo de "saiu" (T09, T11), e os glifos do sistema (apagar, maiúscula, emoji e microfone do teclado; lanterna e câmera da tela de bloqueio; a lupa). Os do sistema ficam em `app/src/sistema/`, que é foto do celular. Os dois do app entram na tela de quem usa, com o desenho lido da referência. **Proposta:** incluir "sino" e "saiu" em `05-recursos/icones/` e no `icones.json`, para o conjunto voltar a ser a fonte única. O cadeado da T04 é o `desbloquear` e o relógio é o `horario` (o mesmo desenho, escrito de outro jeito).
- **O chip "Perto de mim" usa a Inter.** Na T08 ele aparece na fonte do sistema: a regra `.chip` não herda a fonte e o elemento é um botão. No protótipo ele usa a Inter, que é a fonte de todo o app (F01). É o único texto do app que difere da referência por decisão.
- **O chip de escolha única mede 46, e o chip solto, 44.** É o que as referências mostram: os chips de 5, 10 e 15 min da T11 somam a borda à altura de 44; o "Perto de mim" da T08, não. **Proposta:** uma medida só, 44.
- **O indicador de início na T03 e na T08 fica dentro do rodapé**, 12 abaixo do botão, e não a 8 do fundo como nas outras telas. O protótipo desenha como nas referências. **Proposta:** em todas as telas, a 8 do fundo, que é onde o celular desenha.
- **Falta um token: a sombra do que flutua sobre o mapa.** O grupo de controles do mapa usa `0 8px 32px` a 45% de preto, e os tokens só têm a `sombra-sheet`, que sobe em vez de descer. O protótipo desenha a sombra a partir do `scrim` (73% dele, que dá os mesmos 45%). **Proposta:** um token `sombra-flutuante`, com valor para o claro.
- **O que o celular desenha ganhou as cores do celular claro.** As referências só mostram o escuro. No claro, o teclado, o alerta e a folha da biometria usam as cores do iOS claro (teclas com letra preta, alerta claro), dentro de `app/src/sistema/`.
- **O selo de atraso no claro** vai em `atencao-suave` com `atencao-tinta`, como manda a lei do claro; no escuro continua `atencao` cheio.
- **O toast** fica 16 acima da margem segura de baixo, com a calha de 16 dos lados. A folha F02 dá a forma e a calha, mas não a altura em que ele fica.

### O vidro

- **A GlassyUI entrou pelo CLI do shadcn**, como a ficha manda (`shadcn@4.14.1`), com o `components.json` escrito à mão para o CLI não mexer na folha de estilo do app. O site de hoje confere com `03-glassyui.md`: nenhum comando, propriedade ou atributo mudou.
- **Dos nove componentes da lista, cinco ficaram.** `GlassSheet`, `GlassToast` e `GlassDialog` saíram: o sheet, o toast e o alerta são os nossos, com a `GlassSurface` por dentro. O `GlassButton` saiu: o botão da barra em repouso é só o glifo, e o disco de vidro do pressionado é a ótica pequena no próprio botão. O porquê está em `06-prototipo/app/src/components/glassyui/MODIFICACOES.md`, e `03-glassyui.md` ganhou a seção "O que ficou, no protótipo".
- **Uma mudança só no código copiado:** a biblioteca não grava nem lê preferência em `localStorage`. O tema do vidro vem do estado do app, sempre.
- **A ótica do vidro escuro escurece o fundo e devolve a cor pela saturação** (a conta do kit, descrita no token `vidro-medio`), em vez de só desfocar. Sem isso, o texto de apoio (`tinta-apagada`) não chegava a 4,5:1 com o botão lima da tela passando atrás. Os valores finais estão em `app/src/ds/vidro/vidro.css`; `02-material.md` dava faixas de partida, e o brilho ficou abaixo delas no médio (0,4) e no grande (0,27).
- **Duas peças ganharam ótica com nome**, como a ficha prevê: o rodapé (a legenda em `tinta-apagada` fica bem em cima do botão da tela) e o balão do ônibus (a segunda linha em `tinta-apagada`, com os rótulos do mapa atrás).
- **O contraste sobre o vidro é medido, ponto a ponto**, por `node conferencias/contraste-do-vidro.mjs`: cada texto de cada peça, nos quatro fundos e nos dois temas. O pior de cada peça fica em `app/src/vitrine/contraste.json` e aparece na vitrine. Todas passam de 4,5:1. Os botões do alerta do sistema ficam fora dessa régua: usam o `sistema-azul`, que é do celular.
- **O WebKit do Playwright não desenha `backdrop-filter` nas fotos** (medido numa página mínima, com e sem janela). As fotos `vitrine-webkit-*` mostram a forma, o preenchimento, o fio de luz e o brilho, mas **não o desfoque**. Para julgar o vidro sem a lente, como o Safari e o iPhone desenham, existe `?lente=0`, e as fotos `vitrine-chromium-*-vidro-sem-lente.png`. O vidro no Safari de verdade ainda precisa ser visto no olho.
- **O desfoque funciona dentro da moldura do aparelho**: provado por medida (`node conferencias/vidro-na-moldura.mjs`), com recorte arredondado, `overflow` e a tela encolhida por `transform`.
- **De vidro, a barra de status, a barra e os banners são uma superfície só** (`.topo`), como `04-pecas.md` descreve. Dentro dela o banner não é outro vidro: usa o vidro da barra, com a faixa, o ícone e o tom do nível. Sozinho, sem barra de vidro, o banner tem o vidro dele.
- **No sólido, o banner de atenção compõe sobre o chão da página.** O `atencao-suave` é uma transparência; nas referências o banner nunca fica sobre conteúdo, e o resultado é o mesmo.
- **Um endereço a mais:** `?lente=0`, o vidro sem a lente da borda.
- **O vidro nas telas foi medido, não só olhado.** Nas 145 referências, com o vidro ligado, nos dois temas: nenhuma peça de vidro dentro de outra, e todo texto sobre vidro a 4,5:1 ou mais contra o que passa atrás dele (o menor é 4,7:1, o apoio do sheet de confirmação, no claro). As quinze telas de vitrine estão fotografadas em `06-prototipo/fotos/vidro/telas/`.
- **O disco do botão da barra só desfoca no toque.** Em repouso ele não carrega camada de vidro; eram 304 camadas de desfoque que ninguém via, somando as telas.
- **O desempenho: o que foi medido e o que não foi.** Com a CPU em 4×, rolar o Início, arrastar o painel do mapa e o dia andando no Mapa mantêm 16,7 ms por quadro, com o vidro e sem ele, sem nenhum quadro acima de 50 ms. Essa medida acusa engasgo da página; o custo de compor o desfoque é da placa de vídeo e só aparece no aparelho. Fica para olhar no iPhone e num Android de entrada.

### O palco

- **O palco segue a folha F11**: o botão do canto, a moldura do aparelho, a coluna, o painel, o tocador e a gaveta têm as medidas dela. Fotografado em 1440 × 1024, o palco em volta do aparelho difere menos de 1 % dos palcos P1 a P4 da folha (`06-prototipo/fotos/palco/tabela.md`); a diferença é o momento do dia e a rolagem da lista.
- **As cores da carcaça do aparelho moram em `app/src/sistema/aparelho.css`.** A folha pinta o aro e a borda do iPhone com cores de metal e preto, que não têm token. Como é o celular, e não o app nem o palco, elas ficam junto do que o celular desenha.
- **As sombras do palco saem do `scrim`**, em vez de preto escrito à mão (a mesma falta de token da sombra do mapa).
- **Em janela estreita, o aparelho sai do meio para a coluna caber.** A folha só desenha 1440 de largura. Abaixo de 1.112 de largura, o aparelho desliza para a esquerda até a coluna caber ao lado; abaixo de 600, vale o celular.
- **Na gaveta, a tela é o seletor do próprio celular**, por cima da linha de 48.
- **"Atualizado em" é a data desta versão**, escrita no código do palco, e não o relógio de verdade.
- **A lista de estados rola até o estado escolhido e o deixa no meio**, e se apaga em cima, embaixo ou nos dois lados conforme a rolagem.

### As telas

- **Cada referência tem a sua cena, no código.** Em `app/src/telas/<tela>/cenas.ts` há um objeto por referência, que diz o que muda sobre a semente (a hora, a fase, o sinal, a rede, o que o servidor respondeu). A tela é uma só e desenha a cena com as peças. No fluxo, tocar leva de uma cena a outra; parado, a tela mostra a cena da referência.
- **T05 · o texto do ônibus no trilho não acompanha o dia.** Depois do embarque (T05-03, T05-14, T05-15, T05-16), o trilho ainda diz "Indo para a Av. Norte, 2800", e a Fábrica continua com "51 min". O protótipo escreve o que as referências e o `textos.md` escrevem. **Proposta:** depois do ponto da pessoa, "Indo para a Av. Recife, 4300", e os minutos da Fábrica pela hora do caso (31 min às 06:44).
- **T05 · uma contagem que não está no mock.** Nos horários programados (T05-06, T05-09, T05-10), o Terminal da Macaxeira mostra "5 pessoas embarcam aqui", e o mock não tem previstos para ele. O número mora na cena. **Proposta:** `previstos: 5` na parada `macaxeira` do `mock.json`.
- **T05 · "Sua volta hoje" não tem quadro.** Tocar no cartão da volta, de manhã, não leva a lugar nenhum: a volta só está desenhada no estado das 17:21 (T05-17). No protótipo o cartão não responde. **Falta:** o quadro da volta programada.
- **A conferência dos textos lê o texto como ele aparece**, com a caixa alta que o CSS aplica, porque é assim que o `textos.md` foi escrito ("SEU PONTO", "CONFIRA O ÔNIBUS"). O espaço que não quebra é cobrado contra o HTML da referência.
- **Uma conferência a mais: o que se toca** (`node conferencias/fluxo.mjs`). Percorre o caminho feliz no palco, tocando no app e no tocador do dia, e compara a tela de cada momento com o PNG da referência.
- **A fidelidade ganhou uma segunda régua.** Além do PNG, a foto do protótipo é comparada com o HTML da referência fotografado no mesmo navegador. Sem o serrilhado de um navegador para outro no meio, o limite cai para 0,005 % da tela, e o erro pequeno aparece: um glifo, um dígito, um contorno. Foi ela que acusou três erros que a régua do PNG deixava passar no Início (o Terminal do Barro com disco cheio, o ícone do selo "Adiantado" sem a cor de info, e o seu ponto passado sem o contorno vivo). Está em `06-prototipo/fidelidade.md`.
- **Disco cheio é das pontas da viagem, não do tipo do lugar.** No trilho, só a origem e o destino têm o disco cheio; o Terminal do Barro, no meio do trajeto, é um ponto como os outros, com o ícone de ponto. No mapa e no painel do mapa, ele aparece com o ícone de terminal, em contorno. O protótipo segue cada referência. **Proposta:** escolher um só ícone para o terminal do meio do trajeto, no trilho e no mapa.
- **T06 · a nota de dado antigo e a de sem sinal.** Nas referências T06-10 e T06-11 o ícone da nota vem dentro de um trecho pintado de atenção, mas a regra da nota pinta o ícone de info, e é assim que o PNG sai. O protótipo segue o PNG. **Proposta:** decidir se essas duas notas são de atenção.
- **T06 · só a parada que dá para escolher abre o sheet.** O sheet desenhado (T06-07) é o de uma parada que vem, com "Embarcar aqui hoje". No protótipo, abrem o sheet as paradas à frente do ônibus que não são o ponto de hoje nem o destino. **Falta:** o que acontece ao tocar numa parada que já passou, no seu ponto e no destino.
- **T07 · a bússola e a escala não estão em todos os quadros.** Quatro referências (T07-06, T07-12, T07-16 e T07-18) não trazem a bússola nem a escala; as outras quinze trazem. O protótipo segue cada quadro. **Proposta:** bússola e escala sempre.
- **T07 · o rastro do desvio não está desenhado.** A tabela diz "o ônibus ao lado da rota, com o rastro"; a referência T07-18 tem o ônibus ao lado da rota, sem rastro. O protótipo não desenha o rastro. **Falta:** o desenho do rastro.
- **T07 · o pedido de localização do celular não está desenhado.** O sheet de pré-permissão é o da T08-02; a pergunta do sistema que vem depois não tem quadro. No protótipo, "Permitir" no sheet já concede. **Falta:** o quadro do pedido do celular.
- **T07 · a linha inteira tem um desenho próprio.** Com a linha inteira na tela (T07-11), o mapa traz menos nomes, em letra maior, os marcadores a 72 % e o traço da rota mais grosso. O protótipo transcreve esse desenho à parte (`ds/mapa/desenho-afastado.ts`) e troca de um para o outro ao pinçar. No computador, a roda do mouse faz o papel da pinça.
- **T07 · para onde a câmera olha.** As posições saem das referências: a parada aberta e o ônibus seguido ficam a 415 do topo; o ônibus com o balão, a 295; o seu ponto, a 360; o ponto azul, a 420. Com o painel no meio, o quadro do passo desce 30. O botão "Meu ponto" não tem quadro: no protótipo ele leva a câmera para o enquadramento do "chegando".
- **O ônibus desliza no trilho e no mapa** (movimento 2): no trilho, o disco e o texto dele saem da posição anterior para a nova; no mapa, o disco anda pelo traçado, sem cortar caminho. Parado numa referência, o que se vê é o fim do movimento.
- **T08 · atrás de um sheet, o desenho traz só dois pontos.** Nas quatro referências com sheet (T08-02, T08-05, T08-08 e T08-09), a lista por trás tem a Av. Norte e a Av. Abdias, sem a Av. Recife, o Terminal do Barro, o grupo do que já passou e a nota. Parado na referência, o protótipo mostra o que ela desenha. No fluxo, o sheet abre sobre a lista inteira, que é o que o app tem na tela; a conferência do que se toca confere, nesses dois momentos, o que o sheet diz. **Proposta:** redesenhar as quatro com a lista inteira atrás do sheet.
- **T08-03 · um ponto desligado que diz que dá tempo.** A Av. Recife aparece desligada com "o ônibus passa em 26 min: dá tempo, com 12 min de folga". O protótipo escreve e desliga como a referência. **Proposta:** ou o ponto fica ligado, ou a frase diz por que não dá.
- **T08-06 · o grupo diz 5 e mostra 3.** "Pontos que o ônibus já passou (5)" lista o Terminal do Barro, a Av. Recife e a Av. Abdias. O protótipo segue a referência. **Proposta:** listar os cinco.
- **T08 · a frase da confirmação para um ponto depois do de sempre não está escrita.** O texto desenhado é "11 min antes do seu ponto de sempre". Para a Av. Recife e o Terminal do Barro, o protótipo usa a mesma frase com "depois". O artigo ("na Av.", "no Terminal") sai do começo do nome. **Falta:** o texto dos pontos depois do de sempre.
- **T08 · o toast da troca** é o da folha F02: "Pronto. Hoje você embarca na Av. Norte, 2800.", com o nome do ponto escolhido.
- **A troca de ponto vale para qualquer ponto da lista**, e os quadros só mostram a Av. Norte (T05-07, T06-08). Para os outros pontos, o Início e as Paradas usam a mesma regra: o ponto de hoje ganha o halo e "Seu ponto hoje", o de sempre fica com "Ponto de sempre", e o atalho do mapa diz a quantos pontos o ônibus está. **Falta:** os quadros do dia com a troca ativa depois do "em rota" (chegando, no ponto, a bordo). No protótipo, do "chegando" em diante o dia volta aos quadros do ponto de sempre.
- **"Embarcar aqui hoje"**, nas Paradas e no Mapa, abre o "Outro ponto hoje" já na confirmação daquele ponto.
- **O indicador de início dentro do rodapé** (T08, T03): quando o rodapé traz o indicador, o da tela sai, como nas referências.
- **A folga com nome virou um pedaço da tela.** O chip "Perto de mim" na Inter é o único desvio decidido que muda pontos da tela: em `fotos/fidelidade/folgas.json`, o retângulo do chip fica de fora da segunda régua, e o resto da tela continua cobrado.
- **T01 · o erro do celular incompleto não está escrito.** O único erro de campo desenhado é o do e-mail ("Falta o final do e-mail, como .com.br"). No protótipo, com o celular incompleto ou o campo vazio, "Receber código" não faz nada. **Falta:** o texto do erro do celular.
- **T02 · o contador anda de verdade.** No fluxo, o reenvio começa em 1:00 e libera aos 60 s, como diz a regra; as referências são fotos em 0:45, 0:31, 0:20 e 0:12. No quinto erro, o texto diz "daqui a 15 min"; a referência T02-05 é a foto de um minuto depois, com 14.
- **T03 · só aparece no primeiro acesso.** No protótipo, o primeiro acesso é o Entrar aberto pelo painel do palco, ou a volta depois de excluir a conta. Depois de "Sair", o código leva direto ao Início.
- **T03 · "Não Permitir" abre o Início.** É o que a referência T03-01 diz. O Início abre com o banner "Avisos desligados no celular" (o da T05-28). O estado da T03-05, com o aviso no lugar, se vê pelo palco.
- **O link dentro de uma frase** ("Abrir ajustes", na T03) é um botão de verdade, com o toque de 44 crescendo para cima e para baixo da linha, sem mexer no texto.
- **T09 · o disco do comunicado.** O dado diz que o comunicado é neutro; na referência T09-00, o disco dele é de info, com o ícone de informação. O protótipo segue a referência. **Proposta:** decidir se o comunicado é info ou neutro, no dado e no desenho.
- **T09 · só um aviso da transportadora tem o texto completo desenhado**, o da viagem cancelada (T09-02). Ao tocar no comunicado, o sheet mostra o texto que ele já traz na lista, com o nome da transportadora e a hora. **Falta:** o texto completo do comunicado. O aviso "Embarque registrado em outro ônibus", que a ficha cita, não está na lista do mock.
- **T09 · o aviso com o app fechado** (T09-06 e T09-07) é uma foto do celular: a tela de bloqueio e a tela inicial, em `app/src/sistema/Push.tsx`, com as cores e os glifos do sistema. Entram pelo palco.
- **T10 · o que não leva a lugar nenhum.** As linhas de "Minhas linhas", as "Perguntas de todo dia" do Preciso de ajuda, e os botões de ligar e de abrir o WhatsApp são tocáveis nas referências, e nenhum quadro diz o que abrem. No protótipo, não fazem nada. Na T12, a linha "Localização" e "Abrir ajustes do celular" também. **Falta:** o destino de cada um.
- **T10 · a Aparência e o Modo escuro do palco são o mesmo estado.** A linha "Avisos" do Perfil mostra a escolha feita em Avisos.
- **T12 · o teclado do texto livre** não tem o @ nem o ponto na última fileira, e a tecla de retorno diz "OK", como na T12-07. O do e-mail tem os dois e diz "ir".
- **T13 · o botão carregando é neutro**, mesmo sendo o destrutivo (T13-03). "Voltar ao início", na conta excluída, leva ao Entrar, e a próxima entrada é um primeiro acesso.
- **O indicador de rolagem só aparece quando a rolagem é de quem está com a mão na tela** (o dedo, a roda, o teclado). A rolagem que a tela põe sozinha não o acende.

### O claro

- **As 145 referências foram fotografadas e olhadas no claro** (`06-prototipo/fotos/claro/`), com o vidro ligado, como o app abre. Uma régua mede o contraste de cada texto contra o fundo que ele tem na tela: 2.719 textos, nenhum par de cores abaixo de 4,5:1.
- **Dois selos usavam, no claro, uma cor que as leis não deixam ser texto.** "Aproximado" escrevia em âmbar sobre o âmbar suave, e "Viagem cancelada" e "Cancelada" em vermelho sobre o vermelho suave, os dois a 4,2:1. Agora, no claro, a palavra vai em tinta e a cor fica no ícone, como já era no selo de atraso. No escuro, nada mudou.
- **No escuro, um par fica no limite.** O selo "Viagem cancelada" (perigo sobre perigo-suave) mede 4,5:1, arredondado. É o desenho das referências. **Proposta:** conferir esse par na folha F08.
- **A tela do código, com o vidro, escondia o título.** A barra de vidro flutua sobre a rolagem, e o miolo das telas de entrada não ganhava o espaço dela: "Digite o código" ficava atrás da barra. Corrigido nos dois temas, e a conferência do vidro nas telas passou a cobrar que nada comece atrás da barra nem termine atrás do rodapé.
- **O que as fotos do claro não decidem:** a folha do sistema (a digital, o alerta) é translúcida como no celular, e o botão "Começar" aparece por trás dela na T03-02. Fica para o olho de quem aprova.

### O fechamento

- **O Modo escuro do palco escolhe Escuro ou Claro.** O Sistema só se escolhe na Aparência do Perfil. A escolha fica guardada no navegador e vale ao recarregar.
- **O háptico** (movimento 7) usa a vibração do navegador onde ela existe (Android): um toque no chegando, dois no ponto, e o de sucesso ao embarcar e ao confirmar a troca. No computador e no iPhone, fica sem.
- **Uma conferência para o que as outras não cobram** (`node conferencias/fechamento.mjs`): o tema, o dia no tocador, o que abre por cima dentro da tela do aparelho, o tamanho de celular e a volta com o código 123456.

## 1.0 · o desenho fechado

10/11/2026

A primeira versão da pasta, tirada do canvas de desenho com as 13 telas fechadas.

- **As 13 telas, em 145 referências**: 13 telas, 59 momentos e 73 estados, cada uma em HTML e PNG, em 390 × 844, com a ficha, a tabela, os textos exatos e o movimento da tela.
- **O design system**: os tokens nos dois temas, as oito leis, as peças, os sete movimentos, os 64 ícones e as 12 folhas.
- **O dado**: Ana Souza, na terça, 27/10/2026, às 06:24, com um caso para cada referência e a conferência do dado.
- **O dia é um só para o Início, as Paradas e o Mapa**: em rota, chegando, no ponto, a bordo e chegou. As Paradas e o Mapa ganharam os quadros de cada passo, para o ônibus andar igual nas três telas, e a numeração das duas segue a ordem do dia.
- **O palco**: o app no meio, os estados do lado, as telas atrás do botão do canto, e o tocador do dia só nas três telas em que o dia muda o que se vê.
- **O vidro**: as referências são sólidas, porque a ferramenta de desenho não mostra o vidro. O Liquid Glass entra no código, em 13 peças, pela GlassyUI. A norma está em `03-design-system/vidro/`.
- **O tema claro** nasce dos tokens e ainda não foi olhado tela por tela. Está em `08-handoff/pendencias.md`.
- **Três tokens novos**, porque cada peça usa o token do seu papel: `avatar-fundo`, `avatar-tinta` e `mapa-agua-tinta`. O valor do `mapa-agua-tinta` no claro saiu da conta de contraste e ainda não foi visto no mapa.
- **O exemplo é uma terça.** 27/10/2026 cai numa terça; a próxima segunda é 02/11 e o sábado sem viagem é 31/10.

### Em aberto

- Três perguntas para o PM: os tipos de lugar das paradas, o nome do app e o reenvio do código aos 60 s. Estão em `08-handoff/pendencias.md`.
- Os tempos do dia no palco (8 s em rota, 6 s chegando e 6 s a bordo, em 1×) são um ponto de partida.
