# A lei do protótipo

Vale para quem constrói o protótipo navegável. Leia depois do `CLAUDE.md` da raiz.

## O que se constrói

**O app inteiro, navegável, dentro de um palco.** São duas coisas separadas no código:

- **o app**: as 13 telas, funcionando como no celular, com os dados do mock. É o que um dia vira o produto;
- **o palco**: a moldura que apresenta o app no computador (o aparelho no meio, os estados do lado, as telas atrás do botão do canto). O palco não é produto, e nada dele entra no app.

O desenho do palco está na folha F11 (`../03-design-system/folhas/html/F11-palco.html`) e as regras dele em `palco.md`.

## A stack

| | escolha | por quê |
| --- | --- | --- |
| build | **Vite** | o protótipo é um site estático; não precisa de servidor |
| interface | **React 19** | a GlassyUI exige |
| linguagem | **TypeScript** | os componentes da GlassyUI vêm em TypeScript |
| estilo | **Tailwind CSS 4** e os nossos tokens como variáveis CSS | a GlassyUI exige o Tailwind 4. Os valores são sempre os nossos tokens |
| vidro | **GlassyUI**, copiada pelo CLI do shadcn | o código vem para o repositório e pode ser ajustado. Ver `../03-design-system/vidro/` |
| acessibilidade dos controles | **Radix** | vem com a GlassyUI |
| fotos de conferência | **Playwright**, com Chromium e WebKit | a fidelidade e o vidro são fotografados |

O que **não** entra: Next ou outro framework de servidor; biblioteca de componentes além da GlassyUI; biblioteca de mapa (o mapa é o desenho das referências); biblioteca de ícones (os ícones são os SVG de `05-recursos/icones/`); biblioteca de animação, se CSS e a Web Animations API derem conta; fonte ou arquivo carregado de fora.

As versões que ficaram: Vite 8.3.7, React 19.3.1, TypeScript 7.0.2, Tailwind CSS 4.3.5, Playwright 1.65.0. Estão também no `CHANGELOG.md`.

O reset do Tailwind (preflight) não entra no app: as medidas das peças foram lidas das referências, que partem do padrão do navegador. O Tailwind entra como pipeline, com os tokens no tema dele; os utilitários ficam para o palco e as vitrines.

## A estrutura

```
06-prototipo/
  CLAUDE.md  palco.md  fidelidade.md  publicar.md  palco-estados.json
  fotos/                      as fotos de conferência e do vidro
  app/
    index.html  vite.config.ts  package.json  components.json
    conferencias/             as conferências que rodam sozinhas, uma por arquivo (npm run conferir); o que se toca fica em fluxo-<grupo>.mjs
    src/
      main.tsx  App.tsx  TelaDoAparelho.tsx
      tokens/                 o nome de utilitário de cada token, gerado do tokens.json (as variáveis vêm direto de 03-design-system/tokens.css)
      components/glassyui/    o código copiado da GlassyUI, com MODIFICACOES.md
      ds/                     as peças do design system, cada uma uma vez
        vidro/                vidro.css · vidro.config.ts
        icone/                o componente de ícone, a partir dos SVG
      sistema/                o que o celular desenha: teclado, alerta, biometria, tela de bloqueio e tela inicial com o aviso, háptico
      telas/                  uma pasta por tela: T01-entrar … T13-excluir-conta, cada uma com cenas.ts (uma cena por referência) e a tela;
                              comum/ guarda o que é de mais de uma (a sessão simulada, a pré-permissão da localização)
      estado/                 o estado único, as sementes, o dia
      dados/                  a ponte com 04-dados (mock, casos)
      palco/                  a moldura, a coluna, o painel, o tocador, a gaveta
      vitrine/                a vitrine das peças e a vitrine do vidro
```

- O app lê `04-dados/`, `05-recursos/` e `03-design-system/tokens.css` de fora da pasta dele, por alias no Vite, sem copiar à mão. Tudo viaja no build: fonte, ícones, marca e mock. **Nenhuma chamada para fora em tempo de uso.**
- O repositório é a pasta inteira: os documentos andam com o código.

## As regras de construção

1. **Peça primeiro.** Toda peça é construída uma vez em `ds/`, comparada com a folha dela, e as telas são montadas com as peças. Uma tela nunca redesenha uma peça.
2. **O estado vem do caso.** Um estado é o próprio app montado com os dados daquele caso (`04-dados/casos.json`), nunca uma tela desenhada à parte. Se dois estados diferem, a diferença está no dado.
3. **Fidelidade medida.** Cada uma das 145 referências é fotografada em 390 × 844 e comparada com o PNG dela. Diferença é erro ou desvio com nome. Ver `fidelidade.md`.
4. **O PNG é gabarito, nunca peça.** Nenhuma imagem de tela entra no protótipo. O HTML da referência é para medir, não para colar: o app é feito de componentes.
5. **Os textos são os do `textos.md`**, letra por letra, com os espaços que não quebram.
6. **Nenhum número digitado.** Todo valor sai do mock ou do caso.
7. **Nenhuma cor fora dos tokens** em `ds/`, `telas/` e `palco/`. As exceções têm lugar: as cores do sistema em `sistema/`, e a ótica do vidro em `ds/vidro/vidro.css`.
8. **Nome em todo tocável**, e toque mínimo de 44, crescendo só para o lado livre.
9. **Sem hover no app.** É um app de toque: pressionado e desligado. O palco, que é de computador, tem hover.
10. **O teclado nunca esconde o campo nem o botão.**
11. **Mesma entrada, mesma saída.** O relógio é fixo (terça, 27/10/2026, 06:24; a barra de status em 9:41). Nada lê a hora de verdade nem sorteia valor.
12. **Tudo o que abre por cima abre dentro da tela do aparelho**: sheet, toast, alerta, teclado.

## O tema

- Dois temas, pelo atributo `data-tema` (`escuro` ou `claro`) na raiz do app. Só as cores e as sombras trocam.
- O app abre no **Sistema**, que segue o celular. No protótipo, o celular prefere o escuro; `?celular=claro` faz o Sistema cair no claro.
- A Aparência do Perfil (claro, escuro, sistema) e o Modo claro do palco são **o mesmo estado**. O interruptor do palco escolhe Claro (ligado) ou Escuro (desligado); o Sistema só se escolhe na Aparência. A escolha fica guardada no navegador e vale ao recarregar.
- O claro não foi desenhado quadro a quadro: ele nasce dos tokens. Por isso, **toda tela é olhada no claro pelo interruptor do palco**, e o que aparecer fora do lugar é uma peça usando o token errado, não um problema do tema.
- O palco e a moldura do aparelho são sempre escuros.

## O vidro

A norma é `../03-design-system/vidro/`, inteira. Em uma linha: vidro no que flutua, nos controles e no conteúdo, com os componentes da GlassyUI na forma que ela propõe e no tamanho, no respiro e na cor do app, provado na vitrine antes de entrar nas telas, e com volta (`?vidro=0` e o `vidro.config.ts`). O conteúdo também é de vidro (a peça `conteudo`), sobre o fundo de luz da tela; o mapa e o trilho ficam sólidos.

## Os endereços

| endereço | o que faz |
| --- | --- |
| sem nada | abre no Entrar, com os campos preenchidos: a Ana recebe o código, digita seis dígitos quaisquer, prepara o app e chega ao Início às 06:24. Recarregar a página volta ao Entrar |
| `?ref=T05-20` | abre o app parado na referência |
| `?tema=claro` ou `?tema=escuro` | fixa o tema do app |
| `?celular=claro` | testa o Sistema num celular claro |
| `?vidro=0` | desliga o vidro: tudo sólido, como nas referências |
| `?palco=1` | no celular de verdade, mostra a aba que abre a gaveta do palco |
| `?so-app=1` | só o aparelho, sem palco |
| `?vitrine=pecas`, `?vitrine=vidro`, `?vitrine=marca` e `?vitrine=tokens` | as vitrines; a da marca é a prova de tamanhos, e a dos tokens é a folha de fundamentos (com `&tema=claro` ou `escuro`) |
| `?rolar=fim` ou `?rolar=meio` | só para as fotos: rola a tela até o fim ou até o meio |
| `?lente=0` | o vidro sem a lente da borda, como o Safari e o iPhone desenham |
| `?fundo=anterior` | o fundo de luz de antes (com o lima), no lugar do padrão, em qualquer tela e estado |
| `?marca=l1`, `l2` ou `l3` | o arranjo da marca no Entrar: o quadro de vidro (o padrão), o desenho solto, ou a linha |
| `?cor=invertida` | troca as duas cores do pictograma, para comparar |
| `?receita=android` | o vidro como o Android consegue fazer: os cartões e as listas translúcidos sem desfoque, e o desfoque só no que flutua. É o alvo visual do handoff para o Android |
| `?sem-vidro=<peça>` | só para a conferência do vidro: faz o papel de uma linha do `vidro.config.ts` em `false` |

Os endereços combinam (`?ref=T07-01&tema=claro&vidro=0`) e abrem certo no computador e no celular.

## Publicar

- O build de produção roda local antes de qualquer publicação: o que funciona em desenvolvimento às vezes quebra no build.
- A hospedagem constrói só `06-prototipo/app`, lendo o mock, os recursos e os tokens de fora dela.
- O passo a passo e o lugar do endereço publicado estão em `publicar.md`.
