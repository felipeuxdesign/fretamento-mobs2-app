# Ícones

São 64 glifos, os que as telas desenham. A família é a Lucide, traço 2, cantos redondos, sempre em `currentColor`: o ícone herda a tinta do texto ao lado e só ganha cor própria quando é o estado.

**A fonte é o `icones.json` e os SVG de `05-recursos/icones/`, copiados das próprias telas.** O nome da Lucide está na tabela para consulta, mas a versão instalada da Lucide pode desenhar o mesmo ícone com outro traçado. Monte um componente de ícone a partir destes arquivos, e não a partir do pacote.

- Tamanhos na interface: 16 (dentro de selo), 20 (padrão), 24 (barra) e 48 (estado central). Abaixo de 16 o traço vira borrão.
- A exceção são os marcadores do trilho e do mapa: o glifo do tipo da parada entra de 12 a 18, dentro de um disco, com o traço mais grosso (2,4 no trilho e 2,2 no mapa). O ônibus usa viewBox `0 1 24 24` dentro do disco.
- O poço é o quadrado de `fundo-elevado`, 40 com raio 8, que segura um ícone de 20 num cartão interativo.
- `marca-whatsapp` é a única marca e o único glifo cheio. Nunca emoji.

## Viagem e lugar

| nome | Lucide | arquivo |
| --- | --- | --- |
| onibus | bus | `onibus.svg` |
| ponto | map-pin | `ponto.svg` |
| terminal | landmark | `terminal.svg` |
| comercio | store | `comercio.svg` |
| fabrica | factory | `fabrica.svg` |
| destino | flag | `destino.svg` |
| meu-ponto | user | `meu-ponto.svg` |
| linha | route | `linha.svg` |
| mapa | map | `mapa.svg` |
| trocar-ponto | arrow-left-right | `trocar-ponto.svg` |
| minha-posicao | locate-fixed | `minha-posicao.svg` |
| localizacao | locate (traçado de outra versão) | `localizacao.svg` |
| transportadora | bus-front | `transportadora.svg` |
| empresa | building-2 | `empresa.svg` |

## O dado e o horário

| nome | Lucide | arquivo |
| --- | --- | --- |
| ao-vivo | radio | `ao-vivo.svg` |
| aproximado | signal-medium | `aproximado.svg` |
| sem-sinal | wifi-off | `sem-sinal.svg` |
| sem-internet | cloud-off | `sem-internet.svg` |
| programado | calendar-clock | `programado.svg` |
| horario | clock-4 | `horario.svg` |
| atrasado | clock-alert | `atrasado.svg` |
| adiantado | clock-arrow-up | `adiantado.svg` |
| no-horario | circle-check | `no-horario.svg` |
| cancelada | circle-x | `cancelada.svg` |
| onibus-trocado | repeat | `onibus-trocado.svg` |
| desvio | triangle-alert | `desvio.svg` |
| embarquei | log-in (traçado de outra versão) | `embarquei.svg` |
| cracha | id-card | `cracha.svg` |
| confirmado | check | `confirmado.svg` |
| sem-viagem | calendar-x | `sem-viagem.svg` |
| sem-ponto | map-pin-off | `sem-ponto.svg` |

## Avisos

| nome | Lucide | arquivo |
| --- | --- | --- |
| aviso | bell | `aviso.svg` |
| aviso-tocando | bell-ring (traçado de outra versão) | `aviso-tocando.svg` |
| avisos-desligados | bell-off (traçado de outra versão) | `avisos-desligados.svg` |
| preferencias | sliders-horizontal | `preferencias.svg` |
| info | info | `info.svg` |
| erro | circle-alert (traçado de outra versão) | `erro.svg` |

## Conta e segurança

| nome | Lucide | arquivo |
| --- | --- | --- |
| biometria | fingerprint | `biometria.svg` |
| bloqueio | lock | `bloqueio.svg` |
| desbloquear | lock-keyhole-open (traçado de outra versão) | `desbloquear.svg` |
| sem-bloqueio | lock-open | `sem-bloqueio.svg` |
| privacidade | shield | `privacidade.svg` |
| seguranca-mudou | shield-alert | `seguranca-mudou.svg` |
| pessoa | user | `pessoa.svg` |
| cadastro | user-pen (traçado de outra versão) | `cadastro.svg` |
| sem-acesso | user-x | `sem-acesso.svg` |
| email | mail | `email.svg` |
| celular | smartphone | `celular.svg` |
| documento | file-text | `documento.svg` |
| oculto | eye-off | `oculto.svg` |
| sem-localizacao | locate-off (traçado de outra versão) | `sem-localizacao.svg` |

## Ajuda e navegação

| nome | Lucide | arquivo |
| --- | --- | --- |
| ajuda | life-buoy | `ajuda.svg` |
| ligar | phone (traçado de outra versão) | `ligar.svg` |
| whatsapp | message-circle | `whatsapp.svg` |
| marca-whatsapp | marca, sem par na Lucide | `marca-whatsapp.svg` |
| voltar | chevron-left | `voltar.svg` |
| seguir-adiante | chevron-right | `seguir-adiante.svg` |
| abrir | chevron-down | `abrir.svg` |
| fechar | x | `fechar.svg` |
| sair | log-out (traçado de outra versão) | `sair.svg` |
| excluir | trash-2 | `excluir.svg` |

## Aparência

| nome | Lucide | arquivo |
| --- | --- | --- |
| claro | sun | `claro.svg` |
| escuro | moon | `escuro.svg` |
| sistema | monitor-smartphone | `sistema.svg` |
