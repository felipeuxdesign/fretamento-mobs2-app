# O vidro, por plataforma

O protótipo faz o vidro com CSS, num navegador. **Esse CSS não vai para o app.** O que vai é a receita: quais peças são vidro, em que nível, com que tom, borda e luz. Este arquivo traduz a receita para o iOS e para o Android.

Os trechos de código são **ponto de partida, escritos a partir da documentação de cada plataforma em 11/11/2026 e não testados em aparelho**. Confira os nomes na versão em uso.

## A regra que vale em todo lugar

Três níveis, e **nenhum desfoque dentro de outro desfoque** (`03-design-system/vidro/01-onde-entra.md`):

| nível | onde | no protótipo |
| --- | --- | --- |
| **vidro de fundo** | os cartões e as listas de primeiro nível, o quadro da marca | tom do cartão translúcido, desfoque de 14, contorno de 1 px, sombra |
| **vidro flutuante** | sobre o mapa (o voltar, o título, os controles, o painel), as folhas, as bordas de rolagem | desfoque de 30, saturação de 180 %, fio de luz em cima, borda de 1 px |
| **vidro de controle** | qualquer controle dentro de outro vidro: botões, chips, abas, campo | **sem desfoque**: preenchimento translúcido, borda de 1 px, fio de luz em cima |

O vidro só existe sobre o **fundo de luz**: três pontos de cor macios, parados, atrás de tudo. Sem ele, o vidro não tem o que mostrar.

## O que cada plataforma faz

| | vidro de fundo (cartões) | vidro flutuante | vidro de controle | fundo de luz |
| --- | --- | --- | --- | --- |
| **iOS 26** | o material do sistema, com o tom do cartão | **o Liquid Glass do sistema** | preenchimento translúcido, sem vidro | desenhado pelo app |
| **iOS antes do 26** | material do sistema (`.regularMaterial`) com o tom | material do sistema | preenchimento translúcido | desenhado pelo app |
| **Android 12 em diante** | **translúcido, sem desfoque** (a receita abaixo) | desfoque de verdade do que está atrás | preenchimento translúcido | desenhado pelo app |
| **Android antes do 12, celular simples, economia de bateria** | **sólido** | sólido | sólido | não tem |

Em qualquer plataforma, com a "reduzir transparência" do sistema ligada, tudo vira sólido.

## O Android

O Android não tem o Liquid Glass. O desfoque do que está atrás só existe do Android 12 em diante e custa caro em lista que rola. A saída foi medida no protótipo, e não suposta:

**Os cartões e as listas perdem o desfoque e ficam só com o tom translúcido, a borda e a sombra.** Como o fundo de luz já é macio (são manchas, não há nada nítido atrás do cartão), a diferença quase não se vê. O desfoque de verdade fica só onde passa conteúdo nítido por trás: sobre o mapa, nas folhas e nas bordas de rolagem.

- **Veja rodando:** `?receita=android` em qualquer tela (`/?ref=T05-00&receita=android`), nos dois temas.
- **Compare:** `06-prototipo/fotos/android/lado-a-lado-escuro.png` e `lado-a-lado-claro.png`, com o padrão ao lado da receita.
- **O contraste foi medido** nas 145 telas, nos dois temas, com a receita: 2676 textos em cada, nenhum abaixo de 4,5:1 (3:1 no texto grande).
- **Um ajuste saiu da medida:** no claro, sem o desfoque que clareia o que passa atrás, o cartão precisa de 70 % de branco, e não 56 %. Com 56 %, o vermelho do "Sair da conta" media 4,4:1.

**Para o Android antigo ou simples, o app é sólido**, e esse desenho já existe: é o protótipo com `?vidro=0`, igual às referências desenhadas, com os tokens `fundo-pagina`, `fundo-cartao` e `fundo-elevado`. Não é um plano B improvisado: foi desenhado, medido e fotografado.

### Os números da receita

| peça | escuro | claro |
| --- | --- | --- |
| **cartão e lista** (raio 16) | `fundo-cartao` (#26192E) a 60 %; contorno de 1 px branco a 13 %; sombra `0 1 2` preto a 16 % e `0 10 28` preto a 40 % | `fundo-cartao` (#FFFFFF) a 70 %; contorno de 1 px `rgb(52 28 80)` a 10 %; sombra `0 1 1` a 5 % e `0 8 18` a 20 %, na tinta |
| **controle dentro do cartão** (botão secundário, chip, trilho das abas, campo) | branco a 8 %; borda de 1 px branco a 14 %; fio de luz em cima, branco a 22 % | branco a 50 %; borda de 1 px `rgb(37 26 43)` a 10 %; fio de luz em cima, branco a 90 % |
| **indicador das abas** | branco a 16 % | branco a 92 % |
| **botão principal** | o token `vivo` (#AAEF00), cheio; fio de luz em cima, branco a 38 %; brilho para fora, `vivo` a 62 % | o token `vivo` (#4F007D), cheio; o mesmo fio e o mesmo brilho |
| **flutuante sobre o mapa** (voltar, título, controles) | desfoque de 30 dp; `fundo-cartao` a 64 %; fio em cima, branco a 36 %; borda, branco a 14 % | desfoque de 30 dp; `fundo-cartao` a 56 %; fio em cima, branco a 95 %; borda na tinta a 10 % |
| **painel do mapa** | desfoque de 30 dp; `fundo-cartao` a 40 %, com o que passa atrás escurecido | desfoque de 30 dp; `fundo-cartao` a 70 % |
| **folhas** | desfoque de 14 dp; o tom escuro translúcido da folha, como no protótipo | desfoque de 14 dp; branco a 93 % |
| **bordas de rolagem** | desfoque de 30 dp, sumindo na cor da página | o mesmo |
| **quadro da marca** (88, raio 20) | branco a 7 %; borda, branco a 16 %; fio em cima, branco a 34 %; reflexo a 135°, de branco a 14 % até nada em 45 % | branco a 50 %; borda na tinta a 8 %; fio em cima, branco a 95 % |

### O fundo de luz

Três círculos de cor com borda macia sobre a base, mais um grão fino. São degradês, não desfoque: baratos em qualquer aparelho.

| | escuro | claro |
| --- | --- | --- |
| a base | #120B1C | #F6F3FB |
| em cima, à esquerda (centro em 12 % e 18 %, raio 170, cor cheia até 42 % do raio) | #6B2BD9 a 70 % | #C4B5FD a 60 % |
| no meio, à direita (100 % e 50 %, raio 190, cheia até 36 %) | #A3268F a 45 % | #F9A8D4 a 45 % |
| embaixo, à esquerda (20 % e 92 %, raio 180, cheia até 34 %) | #3730A3 a 55 % | #A5B4FC a 50 % |
| o grão | ruído fino a 11 %, por cima | o mesmo |

As medidas são para uma tela de 390 de largura: em outras larguras, os centros acompanham a porcentagem e os raios acompanham a largura.

### Ponto de partida em Compose

```kotlin
// O vidro de fundo no Android: translúcido, sem desfoque. Os valores são os do escuro.
@Composable
fun CartaoDeVidro(conteudo: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier = Modifier
            .shadow(elevation = 10.dp, shape = RoundedCornerShape(16.dp), clip = false)
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0xFF26192E).copy(alpha = 0.60f))        // fundo-cartao a 60 %
            .border(1.dp, Color.White.copy(alpha = 0.13f), RoundedCornerShape(16.dp))
            .padding(16.dp),
        content = conteudo,
    )
}

// O vidro de controle: nunca tem desfoque, em nenhuma plataforma.
fun Modifier.vidroDeControle(raio: Dp = 12.dp) = this
    .clip(RoundedCornerShape(raio))
    .background(Color.White.copy(alpha = 0.08f))
    .border(1.dp, Color.White.copy(alpha = 0.14f), RoundedCornerShape(raio))

// O vidro flutuante: desfoque do que está atrás, só do Android 12 em diante.
// Com a biblioteca Haze (dev.chrisbanes.haze): o conteúdo que passa por trás é a fonte, e a peça é o efeito.
val estado = rememberHazeState()
Box(Modifier.hazeSource(estado)) { Mapa() }
Box(
    Modifier.hazeEffect(estado) {
        blurRadius = 30.dp
        tints = listOf(HazeTint(Color(0xFF26192E).copy(alpha = 0.64f)))
    }
) { TituloDaLinha() }
// Antes do Android 12, ou em celular simples: no lugar do efeito, .background(Color(0xFF26192E)), sólido.
```

## O iOS

No iOS 26 o Liquid Glass é do sistema. Barras, folhas, alertas e controles nativos já vêm de vidro: use os componentes nativos e configure só a cor de ação (`vivo`) e as cores do conteúdo.

- **O vidro flutuante é o do sistema.** O voltar, o título e os controles sobre o mapa, o painel do mapa e as folhas.
- **Os cartões não são Liquid Glass.** A Apple reserva o Liquid Glass para a camada que flutua, e ele pesa numa lista inteira. Os cartões usam o material do sistema com o tom do cartão. É a mesma divisão do Android, com um material melhor.
- **Controle dentro de vidro não é vidro**: a mesma regra dos três níveis, que também é a da Apple.
- **Antes do iOS 26**, o material do sistema entra no lugar do Liquid Glass.

```swift
// O vidro flutuante: o do sistema no iOS 26, o material antes dele.
extension View {
    @ViewBuilder func vidroFlutuante(raio: CGFloat = 22) -> some View {
        if #available(iOS 26, *) {
            self.glassEffect(.regular, in: .rect(cornerRadius: raio))
        } else {
            self.background(.regularMaterial, in: RoundedRectangle(cornerRadius: raio))
        }
    }
}

// O vidro de fundo: material com o tom do cartão, nos dois casos.
struct CartaoDeVidro<Conteudo: View>: View {
    @ViewBuilder var conteudo: Conteudo
    var body: some View {
        conteudo
            .padding(16)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
            .background(Color("fundo-cartao").opacity(0.60), in: RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(.white.opacity(0.13)))
    }
}
```

O botão principal usa o estilo de botão de vidro em destaque do sistema, com a cor `vivo`. Confira o nome do estilo na documentação da versão em uso.

## Em React Native com Expo

| | como |
| --- | --- |
| vidro flutuante no iOS 26 | `GlassView` e `GlassContainer`, do `expo-glass-effect`. Cheque `isLiquidGlassAvailable()` antes: fora do iOS 26, o componente vira uma superfície comum |
| vidro flutuante no Android | uma superfície com desfoque do que está atrás (confira o suporte da biblioteca de desfoque no Android), ou sólida |
| vidro de fundo e de controle | superfícies translúcidas com os números da tabela acima, sem desfoque, nas duas plataformas |
| o fundo de luz | três degradês radiais sobre a base |

```tsx
// O vidro flutuante: o do sistema onde existe, a receita onde não existe.
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';

export function VidroFlutuante({ children, style }: Props) {
  if (isLiquidGlassAvailable()) return <GlassView style={style}>{children}</GlassView>;
  return <View style={[style, { backgroundColor: 'rgba(38, 25, 46, 0.64)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.14)' }]}>{children}</View>;
}
```

## Como conferir

1. O contraste, medido na tela, com o vidro de cada plataforma: 4,5:1 no texto e 3:1 no texto grande. As telas mais difíceis são o Início, as Paradas e o painel do mapa, com o texto de apoio.
2. Nenhum vidro dentro de vidro.
3. A rolagem do Início e o arrasto do painel do mapa sem perder quadro num celular simples. No protótipo, a mediana é de 16,7 ms por quadro; a saturação nas bordas de rolagem derrubava para 33 ms e saiu.
4. A "reduzir transparência" do sistema deixa tudo sólido.
