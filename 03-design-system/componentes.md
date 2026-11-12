# As peças, folha por folha

Cada peça do app está desenhada numa folha, com os estados dela. A folha é a norma da peça: o HTML tem as medidas exatas, o PNG é a foto, e o texto de cada folha está em `folhas/texto/` para busca.

**Construa cada peça uma vez**, em `app/src/ds/`, comparando com a folha, e monte as telas com as peças. Uma tela nunca redesenha uma peça.

| folha | o que é | a regra da folha |
| --- | --- | --- |
| `F01-fundamentos-escuro` | App Passageiro Fretamento | Um placar de chegada no escuro. Meia-noite arroxeada, texto quase branco, e o lima só quando algo está vivo: o ônibus andando, a previsão ao vivo, o botão que age. Os números leem como placar: tabulares, grandes, com o horário ao lado. |
| `F01-fundamentos-claro` | App Passageiro Fretamento | O claro é pensado como claro, nunca o escuro invertido: neutro frio com um fio de violeta, cartões brancos com sombra suave, e o lima do escuro vira o roxo da marca, com texto branco no botão. É o tema do ponto de ônibus às 7h, no sol. |
| `F02-chrome` | Barras, rodapé, folhas, diálogos, toast e push | Tudo aqui é fundo-cartao sobre fundo-pagina, com divisoria onde encosta no conteúdo. Nenhuma sombra no escuro: o chrome se separa por ser um degrau mais claro. Sem barra de status falsa: o aparelho desenha a dele. |
| `F03-glifos` | Ícones de traço 2, em 16 · 20 · 24 · 48 | Família de traço (estilo Lucide), cantos redondos, sempre em currentColor: o ícone herda a tinta do texto ao lado e só ganha cor própria quando é o estado (vivo, atencao, perigo, info). Nunca emoji. O poço é o quadrado de fundo-elevado que segura um ícone num cartão interativo. Os ícones são os da Lucide, sem redesenho, e só em 16, 20, 24 e 48 na interface: abaixo de 16 o traço vira borrão. A exceção são os marcadores do trilho e do mapa: o glifo do tipo da parada entra menor, de 12 a 18, sempre dentro de um disco e com o traço mais grosso (2,4 no trilho, 2,2 no mapa). |
| `F04-cartoes` | O cartão é a unidade da tela; a linha é a unidade do cartão | Cartão: fundo-cartao, raio-lg, padding 16, 12 entre cartões. Só três variações mudam a forma: destaque (fundo-destaque, raio-xl), perigo (borda perigo) e interativo (poço + seta). Linha de lista: 56 mínimo, divisoria entre linhas, nunca na última. |
| `F05-instrumentos` | O que diz se o número é real, e onde o ônibus está | Três níveis de confiança, sempre com forma + ícone + palavra: ao vivo (pulso em vivo), aproximado (âmbar, idade do dado) e programado (neutro, sem pulso). Sem sinal e sem internet são variantes do programado com a causa escrita. Pontualidade não tem cor própria: só o atraso além de 3 min ganha âmbar. |
| `F06-entrada` | Botões, campos, escolhas e os cabeçalhos de autenticação e perfil | Um botão primário por tela, em vivo. O secundário se separa por fill (fundo-elevado) e borda próprios, nos dois temas. O destrutivo é perigo-forte com texto branco e só aparece depois de uma confirmação. Campo de 48 com rótulo em cima e erro embaixo, no lugar, até ser resolvido. Nada de hover: só pressionado e desligado. |
| `F07-dominio` | O elemento-assinatura do app, 358 de largura, um estado por quadro | O estado muda o conteúdo (o número, o selo, a linha de ajuda, a ação); a forma do cartão muda só em chegando e no ponto (fundo-destaque, raio-xl) e em cancelada (borda perigo). O alvo diz sempre de quem é o horário: "Passa no seu ponto" antes, "Chega na fábrica" depois de passar. |
| `F08-contraste` | Cor nova só entra se passar aqui, nos dois temas | Texto precisa de 4,5:1 (AA) ou 7:1 (AAA); estado, borda e ícone precisam de 3:1; tinta-desligada e borda não são texto e ficam abaixo de propósito. A palavra ao lado do número diz o veredito, nunca só a cor. |
| `F09-movimento` | Sete movimentos, e tudo o mais fica parado | Todo movimento informa ou guia uma ação; nenhum decora. Não anima: entrada de tela, contagem do zero ao abrir, atualização de previsão (o número troca no lugar), hover. Tudo respeita a redução de movimento do sistema: vira troca instantânea. |
| `F10-icone` | O trabalhador esperando, e o ônibus chegando | O ícone do Fretamento é um desenho só: o trabalhador com a maleta, no ponto, e o ônibus chegando atrás dele. A mesma regra vale em todo tamanho, e cada lugar recebe o seu arquivo, que fica nesta folha. |
| `F11-palco` | O app no meio, os estados do lado, as telas atrás do canto | A moldura que apresenta o protótipo no computador, a mesma do Logistics: o iPhone 14 dos quadros no meio, em 100%; do lado, os estados desta tela e o tocador do dia, que só aparece no Início, nas Paradas e no Mapa; as telas e o tema atrás do botão do canto. O app abre no caminho feliz e funciona como no celular; qualquer estado também se vê parado, pela coluna. O palco é sempre escuro, nos tokens do escuro do app, e o app abre no Sistema, que segue o celular. Nenhuma peça do palco se inventa no código. |

## As peças que as telas usam

| peça | folha | onde aparece |
| --- | --- | --- |
| barra de status e indicador de início | F02 | todas as telas (no celular de verdade, são os do sistema) |
| barra superior: saudação, voltar e título, flutuante do mapa | F02 | T02 a T13 |
| rodapé fixo com o botão | F02 | T03, T08, T12, T13 |
| sheet, com alça e véu | F02 | confirmações, pré-permissão, detalhe de parada, aviso completo, ajuda |
| diálogo, alerta e folha do sistema | F02 | permissão de notificações e de localização, biometria, senha |
| toast | F02 | depois de confirmar uma troca, um embarque, um pedido |
| push e tela de bloqueio | F02 | T09 |
| teclado do sistema, de e-mail e numérico | F02, T01, T02, T12 | T01, T02, T12 |
| banner fixo de aviso, com a pilha de até dois | F02, F04 | T01, T05 a T13 |
| cartão, cartão interativo com poço, cartão de perigo | F04 | todas |
| linha de lista, com divisória menos na última | F04 | T09, T10, T11, T12 |
| estado central: ícone de 48, título, frase e um botão | F04 | T04, vazios, erro ao abrir, protocolo, conta excluída |
| nota, erro no lugar e aviso no lugar | F04 | formulários e sheets |
| skeleton | F04 | T05-10 |
| selo de confiança: ao vivo, aproximado, programado, sem sinal, sem internet | F05 | T05, T06, T07 |
| selo de pontualidade: no horário, atrasado, adiantado | F05 | T05, T07 |
| trilho de paradas, com o ônibus cortando o trilho | F05 | T05, T06, T07, T08 |
| marcadores do mapa e a rota | F05 | T07 |
| botão primário, secundário, destrutivo, de texto e carregando | F06 | todas |
| campo de texto, campo de código de 6 dígitos, área de texto | F06 | T01, T02, T12 |
| segmentado, switch, chip, rádio | F06 | T01, T03, T08, T10, T11, T12 |
| avatar 32 e 72 | F03, F06 | T05, T10 |
| o cartão do herói, em 15 estados | F07 | T05 e o painel do mapa |
| cartão de viagem secundária | F07 | T05 |

Quais dessas peças viram vidro no protótipo está em `vidro/`.

## Onde cada peça mora no protótipo

Uma pasta por peça, em `06-prototipo/app/src/ds/`, com o componente e a folha de estilo dela. A vitrine `?vitrine=pecas` mostra todas, com os estados, nos dois temas; as fotos estão em `06-prototipo/fotos/pecas/`.

| peça | pasta | classes |
| --- | --- | --- |
| a tela, a área que rola e o indicador de rolagem | `tela/` | `.ph` `.topo` `.sc` `.auth` `.rolagem` |
| barra superior e botões da barra | `barra/` | `.tb` `.ib` `.badge` |
| rodapé fixo | `rodape/` | `.ft` |
| sheet e véu | `sheet/` | `.sheet` `.scrim` |
| toast | `toast/` | `.toast` |
| banner fixo | `banner/` | `.bf` |
| cartão, cartão interativo, poço, placa, contato | `cartao/` | `.card` `.cint` `.poco` `.placa` `.ccard` `.opt` |
| listas: linha, item selecionável, notificação, grupo recolhido | `lista/` | `.list` `.li` `.isel` `.nrow` `.grp` |
| estado central, vazio, skeleton | `central/` | `.central` `.cpane` `.empty` `.sk` |
| nota, erro no lugar, aviso no lugar | `nota/` | `.ninfo` `.nota` `.ferr` `.fwarn` `.sherr` `.note` |
| selos e chip de papel | `selo/` | `.selo` `.cp` |
| trilho de paradas | `trilho/` | `.row` `.rail` `.mini` |
| mapa: o desenho, a rota, os marcadores, os rótulos, os controles, o balão e o painel | `mapa/` (`Mapa`, `Marcadores`, `PecasDoMapa`; o desenho em `desenho.ts` e `desenho-afastado.ts`, as posições em `paradas.ts`) | `.map` `.mkl` `.mgrp` `.callout` `.msheet` `.mhero` |
| botões e botão-link | `botao/` | `.btn` `.lnk` |
| campos | `campo/` | `.inp` `.otp` `.ta` |
| segmentado, switch, chip, rádio | `segmentado/` `switch/` `escolha/` | `.seg` `.sw` `.chip` `.rad` |
| avatar e cabeçalho de perfil | `avatar/` | `.av` `.av72` `.pfh` |
| cabeçalho de autenticação e assinatura | `cabecalho/` | `.lock` `.fret` `.foot` `.by` |
| o cartão do herói | `heroi/` | `.hero` `.comp` `.pre` |
| ícone | `icone/` | os 64 SVG de `05-recursos/icones/` |
| o que o celular desenha: barra de status, teclado, alerta, biometria, push | `../sistema/` | `.sa` `.hb` `.kb` `.sys` `.sysb` |

Onde a mesma classe mudava de medida de uma tela para outra nas referências, a peça ganhou uma variante com nome (está no `CHANGELOG.md`).

As fotos do celular (o teclado, o alerta, o pedido do Face ID, a tela de bloqueio e a tela inicial com o aviso) ficam em `app/src/sistema/`, com as cores do sistema. Os dois glifos que as telas desenham fora dos 64 arquivos (`saiu` e `sino`) estão registrados no componente de ícone, com o desenho lido das referências.
