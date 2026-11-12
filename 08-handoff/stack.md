# A stack do produto

**Uma recomendação, com o porquê. Quem decide é o time de desenvolvimento.** O protótipo é um site (Vite, React 19, TypeScript, Tailwind CSS 4, GlassyUI), feito para mostrar e testar. Ele não é o app das lojas.

## A recomendação

**React Native com Expo, um código para iOS e Android.**

| o que o produto pede | por que cabe |
| --- | --- |
| um desenho só para iOS e Android (`07-decisoes/001`) | um código só, com as mesmas telas, os mesmos textos e os mesmos tokens |
| o Liquid Glass de verdade no iOS 26 | o Expo tem o `expo-glass-effect` (`GlassView` e `GlassContainer`), que usa o vidro do próprio sistema no iOS 26 e cai para uma superfície comum onde ele não existe |
| o que o protótipo já resolveu | o protótipo é React e TypeScript: os tokens (`tokens.json`), as regras de tempo (`relativo`, `pessoasQueEmbarcam`, `prefixoEPlaca`) e os textos passam quase como estão |
| avisos confiáveis com o app fechado | notificações por APNs e FCM, com o tratamento em segundo plano do sistema |
| o código de uso único, a biometria e o mapa | campo com `textContentType="oneTimeCode"` e `autoComplete="sms-otp"`, a biometria do sistema e um mapa nativo |

**Quando escolher dois apps nativos (SwiftUI e Kotlin com Compose):** se o time já tem gente dos dois lados, ou se a atividade ao vivo na tela de bloqueio (desenhada na folha F02) e os widgets entrarem logo. No nativo, o vidro do iOS é o do sistema sem ponte nenhuma. O custo são duas bases de código para as mesmas 13 telas.

**O que não é recomendado:**
- **Flutter.** Ele desenha a própria interface e não usa o vidro do sistema: o Liquid Glass teria de ser imitado nos dois lados.
- **O protótipo embrulhado como app** (PWA ou WebView). É o caminho mais curto, e o CSS do vidro funcionaria como está, mas o aviso com o app fechado é fraco no iOS e o desfoque pesa em celular simples. Serve para piloto interno, não para o produto.

## O que muda conforme a escolha

| | React Native com Expo | nativo (SwiftUI e Compose) |
| --- | --- | --- |
| o vidro no iOS 26 | `GlassView`, com checagem de disponibilidade antes de usar | `glassEffect` e os estilos de botão de vidro do sistema |
| o vidro no iOS antigo | superfície translúcida com o material do sistema | material do sistema (`.regularMaterial`) |
| o vidro no Android | a receita de `vidro-por-plataforma.md` | a mesma receita, em Compose |
| os tokens | `tokens.json` vira o tema em TypeScript | `tokens.json` vira o tema em cada plataforma |
| os textos | os mesmos arquivos de texto | os mesmos textos, em dois lugares |
| os testes de aceite | o roteiro de `testes-prontos.md`, com uma ferramenta de teste de app | o mesmo roteiro, em cada plataforma |

Os nomes de API acima são os da documentação de cada plataforma na data deste arquivo (11/11/2026). Confira a versão em uso antes de escrever o código.

## O que pesar em qualquer escolha

- **O vidro.** Está em `vidro-por-plataforma.md`: o que é do sistema, o que se constrói e o que vira sólido. Não copie o CSS do protótipo para um app nativo.
- **Os avisos.** Chegada, saída, atraso, troca e cancelamento são o coração do app. O formato de cada um está em `api.md`.
- **A posição ao vivo** chega do módulo de rastreamento da Mobs2. O app precisa da idade do dado, para dizer "aproximado" e "sem sinal" com honestidade (`api.md`).
- **A localização da pessoa** só é usada quando ela pede, com o app aberto.
- **O desbloqueio** usa a biometria ou a senha do sistema.
- **O mapa.** O do protótipo é decorativo. O produto usa um mapa de verdade, e a escolha dele (o do sistema, ou outro) entra na decisão da stack.
- **Para depois:** a atividade ao vivo na tela de bloqueio (folha F02).
