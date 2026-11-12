# A GlassyUI

- Site: https://glassyui.com/ · Documentação: https://glassyui.com/docs · Código: https://github.com/alexburlis/glassyui
- Texto completo para leitura por máquina: https://glassyui.com/llms-full.txt · Índice do registro: https://glassyui.com/r/registry.json

**Antes de instalar, leia o site e o README de hoje.** O que está abaixo foi lido em 10/11/2026 e é para você chegar sabendo o que procurar. Se o site disser outra coisa (um comando, um nome de propriedade, um atributo), vale o site, e a diferença entra no `CHANGELOG.md`.

## O que é

- 38 componentes de vidro para React, gratuitos, licença MIT.
- **Não é um pacote**: os componentes são copiados para dentro do repositório pelo CLI do shadcn, e o código passa a ser nosso. Dá para ajustar à vontade.
- Exige **React 19 ou mais novo** e **Tailwind CSS 4**.
- É feita sobre o Radix: teclado (Tab, setas, Esc) e leitor de tela funcionam.
- Cada componente instala `clsx` e, quando precisa, o pacote do Radix dele.

## Instalar

```
npx shadcn@4.14.1 init                           # só se o app ainda não tem components.json
npx shadcn@4.14.1 add @glassyui/glass-provider
npx shadcn@4.14.1 add @glassyui/glass-surface
npx shadcn@4.14.1 add @glassyui/glass-panel
npx shadcn@4.14.1 add @glassyui/glass-button
npx shadcn@4.14.1 add @glassyui/glass-sheet
npx shadcn@4.14.1 add @glassyui/glass-toast
npx shadcn@4.14.1 add @glassyui/glass-dialog
npx shadcn@4.14.1 add @glassyui/glass-switch
npx shadcn@4.14.1 add @glassyui/glass-segmented-control
```

- O registro `@glassyui` já está no diretório do shadcn: não precisa de configuração.
- O código cai em `components/glassyui/` (no nosso app, `app/src/components/glassyui/`, com o alias `@/`). Vêm juntos os arquivos compartilhados: `glass-provider.tsx`, `liquid-filters.tsx`, `lib/` e `styles/liquid.css`.
- Os componentes importam o `liquid.css` sozinhos. **Não embrulhe esse CSS em outro `@layer`.**
- A camada `components` fica abaixo das `utilities` do Tailwind: uma classe passada por `className` ganha sem precisar de `!`.
- Instale só o que está na lista. Componente que não é usado não entra no repositório.

## O que usamos de cada um

| componente | para quê | propriedades que importam |
| --- | --- | --- |
| `GlassProvider` | as preferências do vidro para o app inteiro | `defaultTheme`; `usePreferences()` devolve `preferences` e `setPreferences` |
| `GlassSurface` | o material puro: barras, banner, rodapé, o corpo do painel do mapa e dos sheets | `preset` (`subtle`, `standard`, `prominent`, `control`, `showcase`), `lens`, `thickness`, `interactive` |
| `GlassPanel` | uma `GlassSurface` com forma: grupo do mapa, balão | `variant` (`panel`, `card`, `pill`), `elevation` (`base`, `raised`) |
| `GlassButton` | os botões do app e as esferas da barra | `variant` (`primary`, `prominent`, `soft`, `ghost`), `size`, `lens`, `asChild`. O `prominent` só com as variáveis de tom na cor do app (armadilha 3): o azul da biblioteca nunca aparece |
| `GlassSheet` | os sheets de baixo | `GlassSheetContent` com `side="bottom"`; todo sheet precisa de um `GlassSheetTitle` |
| `GlassToast` | o toast | precisa do `GlassToastProvider` e do `GlassToastViewport` |
| `GlassDialog` | o alerta que o celular desenha | o material |
| `GlassSwitch` | o switch | `checked`, `onCheckedChange`, `size`; precisa de nome acessível |
| `GlassSegmentedControl` | o segmentado | de 2 a 6 `GlassSegmentedControlItem` como filhos diretos; precisa de `aria-label` |

Preferências do `GlassProvider`: `theme` (`light` ou `dark`), `mode` (`clear` ou `tinted`), `quality` (`low`, `medium`, `high`), `reduceMotion`, `reduceTransparency`, `thickness` (de 0,25 a 2).

## As cinco armadilhas

Estas são as coisas que quebram o protótipo se ninguém cuidar. Cada uma tem a regra.

### 1. Sheet, toast e diálogo abrem fora do aparelho

Por padrão eles são montados no `body`, por cima da página inteira: cobririam o palco todo. **Tudo o que abre por cima abre dentro da tela do aparelho.** O portal aponta para o elemento da tela do aparelho (o Radix aceita `container` no Portal), o véu cobre só a tela, e o foco fica preso dentro dela. Se o componente copiado não expõe isso, mude o código copiado e anote em `MODIFICACOES.md`. Se ficar mais limpo, monte o nosso sheet e o nosso toast com a `GlassSurface` por dentro: o que importa é o material e o comportamento, não o nome do componente.

O toast da biblioteca nasce no canto de cima, à direita. O nosso fica **embaixo, dentro do aparelho**, na posição da folha F02.

### 2. O tema

A GlassyUI tem tema próprio (`data-lg-theme="light"` ou `"dark"` na raiz) e **guarda a preferência sozinha** no `localStorage`, na chave `glassy-ui-preferences`. A documentação diz que a escolha salva sempre ganha. Isso não pode acontecer aqui:

- quem manda no tema é o nosso estado: a Aparência do Perfil e o Modo escuro do palco, que são a mesma chave;
- toda vez que o nosso tema muda, o do vidro muda junto (`escuro` vira `dark`, `claro` vira `light`);
- a biblioteca não lembra de nada por conta própria: ou a gravação dela é desligada no código copiado, ou o nosso estado sobrescreve a cada mudança. O resultado a conferir: trocar o tema, recarregar e abrir com `?tema=` sempre dá o tema certo no vidro;
- o `mode` fica sempre em `clear`.

O atributo é escrito na raiz da página, e o palco é sempre escuro. Isso não é problema, porque o palco não usa vidro. Confira que nenhuma peça do palco herda estilo da biblioteca.

### 3. A cor de destaque

O destaque da biblioteca é azul com texto branco. No nosso app o azul não existe (só nas peças do sistema), e branco sobre lima dá 1,4:1. Então:

- o botão primário e o destrutivo são o `GlassButton` tingido (`prominent`), com as variáveis de tom da biblioteca (`--lg-prominent-tint`, `--lg-prominent-glow`, `--lg-prominent-shade`) na nossa cor. O tom é medido na tela até dar o token: `vivo` com `vivo-tinta` por cima, `perigo-forte` com `perigo-tinta`. O azul da biblioteca não aparece;
- onde a biblioteca pinta de azul (o trilho do switch ligado, o foco), entra `vivo`, com `vivo-tinta` por cima;
- as cores de superfície do vidro (`--lg-control-surface`, `--lg-border`, `--lg-track`, `--lg-knob` e as outras) **ficam com os valores da biblioteca**: nada delas é ligado aos nossos tokens. Com "reduzir transparência" quem desenha é a nossa peça sólida, não a da biblioteca;
- o anel de foco é o do app: `foco`, 2 px, deslocado 2 px.

### 4. A lente só existe no Chrome e no Edge

A borda que entorta o que está atrás (`lens`) funciona nos navegadores Chromium. No Safari e no Firefox o vidro fica com o desfoque, o fio de luz e o brilho, sem a lente. **O iPhone usa Safari**: é assim que a maioria das pessoas vai ver o protótipo no celular. Por isso o vidro precisa estar bonito **sem a lente**. A lente é o acabamento a mais, nunca a base.

A lente também desliga sozinha com "reduzir transparência" e em superfícies muito grandes.

### 5. A comparação com as referências

As referências não têm vidro. A conferência de fidelidade (`06-prototipo/fidelidade.md`) roda com o vidro desligado (`?vidro=0`), que deixa cada peça sólida, nas nossas cores, igual ao quadro. Com o vidro ligado, a diferença para a referência é esperada **só no material das peças da lista**, e é conferida na vitrine.

Com "reduzir transparência", a biblioteca deixa o vidro opaco usando as variáveis dela (`--lg-opaque-surface`, `--lg-control-surface`, `--lg-control-surface-hover`), e essa proteção não se desfaz por `className`. No protótipo, com "reduzir transparência" quem desenha é a peça sólida do app, a mesma do `?vidro=0`: as variáveis da biblioteca ficam como vêm, e o sólido sai igual ao quadro (`04-pecas.md`).

## O que ficou, no protótipo

O site foi lido de novo em 10/11/2026, antes de instalar: os comandos, as propriedades e os atributos são os desta ficha. O site tem a mais: `GlassSurface` aceita `refraction`, `refractionBackground`, `refractionBackgroundSpace` e `refractionDisplacement` (não usamos); a lente desliga acima de 720.000 px² de área; e existe `useOptionalPreferences`, que funciona fora do provider.

São doze componentes da biblioteca no app:

- **Da lista:** `GlassProvider`, `GlassSurface`, `GlassPanel`, `GlassSwitch`, `GlassSegmentedControl`, `GlassSheet` e `GlassButton`.
- **Vieram depois:** `GlassAvatar`, `GlassInput`, `GlassTextarea`, `GlassBadge` e `GlassSpinner`.
- **Saíram `GlassToast` e `GlassDialog`:** o toast e o alerta são os nossos, com a `GlassSurface` por dentro, como a armadilha 1 permite. O toast fica embaixo, dentro do aparelho; o alerta é o que o celular desenha, nas cores do sistema.

A `GlassSheet` abre dentro da tela do aparelho: ela ganhou a propriedade `container`, que diz onde a folha nasce, e é a única mudança de comportamento no código copiado, além da gravação em `localStorage`, desligada. O detalhe está em `06-prototipo/app/src/components/glassyui/MODIFICACOES.md`.

## O que a biblioteca não tem

- **O painel do mapa.** O `GlassSheet` fecha quando arrasta para baixo. O nosso painel tem três alturas e nunca fecha: é uma peça nossa, com a mesma placa de vidro da folha (um `GlassPanel` com os números dela) e a alça dela.
- **O banner com o nível e a pilha de dois.** É nosso, com a `GlassSurface` por baixo.
- **O `GlassHeader`** existe, mas é um cabeçalho de site (marca, menu que vira lista abaixo de 780 px). Não serve para a barra do app. A nossa barra não é uma faixa: são as esferas de vidro e a borda de rolagem.
- **O disco do botão da barra só desfoca debaixo do dedo.** Em repouso o botão é só o glifo e não carrega nenhuma camada de vidro: dentro da barra de vidro não fica outra superfície desfocando. O banner, dentro da barra, usa o vidro dela.
