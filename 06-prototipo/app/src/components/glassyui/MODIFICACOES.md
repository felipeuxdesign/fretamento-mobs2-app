# O que mudou no código copiado da GlassyUI

O código desta pasta veio da GlassyUI (https://glassyui.com/, licença MIT), copiado pelo CLI do shadcn (`npx shadcn@4.14.1 add @glassyui/<item>`) em 10/11/2026. Ele é nosso e pode ser ajustado. Toda mudança fica anotada aqui: o arquivo, o que mudou e por quê.

## O que foi instalado e o que ficou

Instalados pelo CLI, pela lista de `03-design-system/vidro/03-glassyui.md`: `glass-provider`, `glass-surface`, `glass-panel`, `glass-button`, `glass-sheet`, `glass-toast`, `glass-dialog`, `glass-switch`, `glass-segmented-control`. Depois vieram, do registro da biblioteca (`https://glassyui.com/r/<item>.json`): `glass-avatar`, `glass-input`, `glass-textarea`, `glass-badge` e `glass-spinner`.

| componente | ficou? | onde é usado |
| --- | --- | --- |
| `GlassProvider` | sim | `ds/vidro/PonteDoVidro.tsx`: recebe o tema e as preferências do estado do app |
| `GlassSurface` | sim | `ds/vidro/Material.tsx`: o banner, o toast e o que o celular desenha |
| `GlassPanel` | sim | `ds/vidro/Material.tsx`: o grupo de controles do mapa, o balão do ônibus e a cápsula do título sobre o mapa; `ds/mapa/PecasDoMapa.tsx`: o painel do mapa, com os números da folha; `ds/vidro/Conteudo.tsx`: os cartões, as listas e a marca do Entrar, em cartão, sem lente; e dentro da `GlassSheet` e do `GlassSegmentedControl` |
| `GlassSheet` | sim | `ds/sheet/Sheet.tsx`: a folha, como a biblioteca desenha |
| `GlassButton` | sim | `ds/botao/Botao.tsx` (primário, secundário, destrutivo), `ds/escolha/Escolha.tsx` (o chip solto) e `ds/barra/Barra.tsx` (as esferas da barra) |
| `GlassAvatar` | sim | `ds/avatar/Avatar.tsx` |
| `GlassInput`, `GlassTextarea` | sim | `ds/campo/Campo.tsx` |
| `GlassBadge` | sim | `ds/selo/Selo.tsx` |
| `GlassSpinner` | sim | `ds/botao/Botao.tsx`: o anel de espera do botão carregando |
| `GlassSwitch` | sim | `ds/switch/Switch.tsx` |
| `GlassSegmentedControl` | sim | `ds/segmentado/Segmentado.tsx` |
| `GlassToast`, `GlassDialog` | **não: removidos** | o toast e o alerta são os nossos, com a `GlassSurface` por dentro (a ficha permite): o toast fica embaixo, dentro do aparelho, e o alerta é o que o celular desenha |

Os pacotes que os componentes pedem: `@radix-ui/react-dialog` (a folha), `@radix-ui/react-slot` (o botão) e `@radix-ui/react-avatar` (o avatar). O `@radix-ui/react-toast` saiu com o toast.

## As mudanças nos arquivos que ficaram

| arquivo | o que mudou | por quê |
| --- | --- | --- |
| `lib/preferences.ts` | `persistPreferences` não grava e `loadPreferences` devolve vazio | a biblioteca guardava a preferência sozinha em `localStorage` (`glassy-ui-preferences`), e a escolha salva ganhava do tema do app. Quem manda no tema é o estado do app (a Aparência do Perfil e o Modo escuro do palco, a mesma chave); a biblioteca não lembra de nada por conta própria |
| `glass-sheet.tsx` | o `GlassSheetContent` ganhou duas propriedades: `container`, repassada ao portal, e `panelRef`, uma referência à placa da folha | a folha da biblioteca nasce no fim da página; no protótipo, tudo o que abre por cima abre dentro da tela do aparelho. A referência serve para prender o foco e medir a folha. O desenho e o comportamento não mudaram |
| `glass-input.tsx`, `glass-badge.tsx` | saiu a linha `import './styles/liquid.css'` | a folha de estilo da biblioteca entra uma vez só, na camada dela, pela entrada do app |

Nenhum outro arquivo copiado foi editado. Tudo o mais que adapta a biblioteca ao app está fora desta pasta, em `ds/vidro/vidro.css`: a tinta e a cor de destaque do app nas variáveis `--lg-*` (as de superfície ficam com os valores da biblioteca), o tom do botão principal medido até dar o `vivo`, o tom de roxo e a inicial do avatar, e o tamanho e o respiro de cada peça.

## Medidas

- **Anel de espera.** O `GlassSpinner` pequeno mede 16; no botão, 18, na cor do texto.
- **Switch.** O `GlassSwitch` mede 60 × 28, com o botão de 36 × 24 e folga de 2. O nosso mede 64 × 28, com o botão de 38 × 24 e a mesma folga. Coube sem deformar: as cinco variáveis de medida dele (`--lg-switch-width`, `--lg-switch-height`, `--lg-switch-thumb-width`, `--lg-switch-thumb-height`, `--lg-switch-inset`) recebem as nossas medidas em `vidro.css`. A linha da lista não muda de altura.
- **Segmentado.** A biblioteca desenha em cápsula, com 14 de texto. Ele fica como ela desenha (o trilho de vidro e a gota), com o nosso tamanho: 44 de altura no Entrar e 38 na Aparência, texto de 13 em peso 600.
- **Botão.** O `GlassButton` vem com a altura do tamanho `md` dele; aqui mede 48, com texto de 15/22 em peso 600. A esfera da barra mede 44; o chip solto, 44 de altura.
- **Folha.** A `GlassSheet` fica a 8 dos lados e do fundo, com o canto de 40, como a biblioteca desenha. O X dela mede 36, e a área de toque cresce para 44.
- **Avatar.** O `GlassAvatar` mede 44 na barra e 72 no Perfil, pela variável `--lg-avatar-size`.
- **Campo.** O `GlassInput` mede 48 de altura (56 no código), com texto de 15.
