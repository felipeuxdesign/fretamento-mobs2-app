# Como foi desenhado

O app foi desenhado no canvas da ferramenta de desenho a partir do wireframe do PM, e o desenho foi conferido com esse wireframe antes de fechar. O canvas tem duas páginas: Telas, com o inventário e uma linha por tela, e Design System, com as 12 folhas, da F01 (no claro e no escuro) à F11.

### A identidade

- **A paleta é a do Configurador web**, o mesmo roxo e lima, por regra de negócio.
- **O escuro é o padrão:** um placar de chegada no escuro, meia-noite arroxeada, texto quase branco e o lima só quando algo está vivo.
- **O claro é pensado como claro**, nunca o escuro invertido: cartões brancos, e o lima vira o roxo da marca. É o tema do ponto às 7h, no sol.
- **A Aparência tem três opções** (claro, escuro e sistema), e o app abre no Sistema, que segue o celular.
- **O ícone do app** é o trabalhador com a maleta no ponto e o ônibus chegando atrás dele, com o nome Fretamento embaixo.

### As leis do design system

1. Lima é vivo.
2. Um acento por tela.
3. Estado tem forma antes de cor.
4. O número é tabular.
5. Superfície firme atrás de texto.
6. Elevação por superfície, sem sombra.
7. Erro fica no lugar da ação.
8. Hora relativa primeiro.

### As folhas do design system

| Folha | O que define |
| --- | --- |
| **F01 · Fundamentos** | Superfícies, tintas, tipo (Inter), espaço e raio, no escuro e no claro |
| **F02 · Chrome** | Barras, rodapé, folhas, diálogos, toast e push |
| **F03 · Glifos** | Os 64 ícones que as telas usam, da Lucide, sem redesenho |
| **F04 · Cartões** | Linhas, cartões e avisos |
| **F05 · Instrumentos** | Selos de confiança, trilho de paradas e mapa |
| **F06 · Entrada** | Botões, campos, escolhas e cabeçalhos |
| **F07 · Domínio** | O cartão do herói em todos os estados |
| **F08 · Contraste** | A tabela WCAG nos dois temas: cor nova só entra se passar aqui |
| **F09 · Movimento** | Sete movimentos e o háptico; todo o resto fica parado |
| **F10 · Ícone** | O ícone do app em cada tamanho e lugar |
| **F11 · Palco** | A moldura que apresenta o protótipo navegável |

### Plataforma e Liquid Glass

- **iOS e Android com um desenho só**, no estilo iOS, usando só componentes que existem nas duas plataformas para elas não divergirem.
- **O que o celular desenha** (permissões, notificações, teclado, tela de bloqueio) fica com a cara do sistema, não do app.
- **O Liquid Glass** é um pedido da diretoria e do PM. No canvas, as superfícies são sólidas; o vidro entra no protótipo navegável pela biblioteca GlassyUI, só onde precisa ser vidro.
- **Os mapas** usam endereços reais do Recife, desenhados com base no Google Maps, dessaturados: só o ônibus e a rota têm cor.

### O protótipo navegável

O protótipo em código está em `06-prototipo/app`, feito com Vite, React 19, TypeScript, Tailwind 4 e GlassyUI.

- **Abre no Entrar**, com os campos já preenchidos, e dali segue o caminho feliz: o código, o Preparar o app e o Início (T05) às 06:24, funcionando tocando, como no celular. O Bloqueado (T04) se alcança pelo painel do palco.
- **O palco** mostra do lado os estados de cada tela. Tocar num estado para o app nele, como uma foto; "Voltar ao fluxo" devolve o percurso. No Início, nas Paradas e no Mapa, e só nessas três telas, aparece o tocador do dia: voltar um passo, play ou pausa, avançar um passo e a velocidade. O dia é um só para as três: em rota, chegando, no ponto (onde espera o Embarquei), a bordo e chegou.
- **O app rola:** toda tela maior que o aparelho rola por dentro dele, com o indicador de rolagem do iOS na borda direita. Um estado parado também rola.
- **O teclado:** no computador, tocar num campo sobe o teclado desenhado, e dá para digitar pelo teclado do computador ou clicando nas teclas. No celular de verdade, sobe o teclado do próprio celular.
- **Endereços diretos:** `?ref=T05-20` abre num estado, `?tema=claro` ou `?tema=escuro` fixa o tema, `?celular=claro` testa o Sistema num celular claro, `?palco=1` abre a gaveta no celular e `?so-app=1` deixa só o aparelho.
- **Login de teste:** qualquer código de seis dígitos entra. O código incorreto, o expirado e o bloqueio se veem como estados parados, pelo palco.
- **Um exemplo só:** a Ana, na terça 27/10, atravessa todas as telas, para que os números batam de uma tela para outra.
