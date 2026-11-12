// A folha de fundamentos, tirada dos tokens: as cores nos dois temas, os estilos de texto, os espaços, os raios, as
// medidas e as sombras, lidos do tokens.json; e o que é do vidro e mora no vidro.css: o fundo de luz e os três níveis.
// Abre em ?vitrine=tokens&tema=escuro (ou claro): uma folha por tema, como a F01.
import tokens from '@design-system/tokens.json';
import { usarEstado, temaDe } from '@/estado/armazem';
import { Botao } from '@/ds/botao/Botao';
import { Cartao } from '@/ds/cartao/Cartao';
import './vitrine.css';

type DoisTemas = { escuro: string; claro: string };
interface Token { name: string; value: string | DoisTemas; usage?: string }
interface Estilo { name: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string; sample?: string; usage?: string }
const t = tokens as unknown as {
  color: { tokens: Token[] };
  type: { groups: { name: string; styles: Estilo[] }[] };
  spacing: { tokens: Token[] };
  radius: { tokens: Token[] };
  medida: { tokens: Token[] };
  shadow: { tokens: Token[] };
};
const px = (v: string) => parseFloat(v) || 0;

export function VitrineDeTokens() {
  const tema = usarEstado(temaDe);
  const valor = (v: string | DoisTemas) => (typeof v === 'string' ? v : v[tema]);
  return (
    <div className="vitrine vitrine-de-tokens ph" data-vitrine="tokens" data-tema={tema}>
      <header>
        <h1>F01 · Fundamentos · {tema}</h1>
        <p>Os tokens de hoje, lidos do `tokens.json`, e o que é do vidro: o fundo de luz e os três níveis.</p>
      </header>

      <section className="bloco-de-tokens">
        <h2>Cores · {t.color.tokens.length}</h2>
        <div className="grade-de-cores">
          {t.color.tokens.map((c) => (
            <figure key={c.name} className="cor">
              <span className="amostra" style={{ background: `var(--${c.name})` }} />
              <figcaption>
                <b>{c.name}</b>
                <span>{valor(c.value)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bloco-de-tokens">
        <h2>Texto · {t.type.groups.reduce((n, g) => n + g.styles.length, 0)} estilos</h2>
        {t.type.groups.map((g) => (
          <div key={g.name} className="grupo-de-texto">
            {g.styles.map((e) => (
              <div key={e.name} className="estilo-de-texto">
                <span className="rotulo-de-token">
                  {e.name} · {px(e.fontSize)}/{px(e.lineHeight)} · {e.fontWeight}
                </span>
                <span style={{ fontSize: e.fontSize, lineHeight: e.lineHeight, fontWeight: e.fontWeight, letterSpacing: e.letterSpacing, fontVariantNumeric: 'tabular-nums' }}>{e.sample ?? 'Fretamento'}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="bloco-de-tokens tres-colunas">
        <div>
          <h2>Espaços · {t.spacing.tokens.length}</h2>
          {t.spacing.tokens.map((e) => (
            <div key={e.name} className="linha-de-token">
              <span className="barra-de-espaco" style={{ width: valor(e.value) }} />
              <span className="rotulo-de-token">
                {e.name} · {valor(e.value)}
              </span>
            </div>
          ))}
        </div>
        <div>
          <h2>Raios · {t.radius.tokens.length}</h2>
          {t.radius.tokens.map((e) => (
            <div key={e.name} className="linha-de-token">
              <span className="caixa-de-raio" style={{ borderRadius: valor(e.value) }} />
              <span className="rotulo-de-token">
                {e.name} · {valor(e.value)}
              </span>
            </div>
          ))}
        </div>
        <div>
          <h2>Medidas · {t.medida.tokens.length}</h2>
          {t.medida.tokens.map((e) => (
            <div key={e.name} className="linha-de-token">
              <span className="barra-de-medida" style={{ height: Math.min(px(valor(e.value)), 64) }} />
              <span className="rotulo-de-token">
                {e.name} · {valor(e.value)}
              </span>
            </div>
          ))}
          <h2>Sombras · {t.shadow.tokens.length}</h2>
          {t.shadow.tokens.map((e) => (
            <div key={e.name} className="linha-de-token">
              <span className="caixa-de-sombra" style={{ boxShadow: valor(e.value) }} />
              <span className="rotulo-de-token">{e.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bloco-de-tokens">
        <h2>O fundo de luz</h2>
        <p className="rotulo-de-token">Três pontos de luz sobre a base: de cada um, a cor, a opacidade, o lugar, o raio e o miolo. O padrão e o de antes (`?fundo=anterior`).</p>
        <div className="fundos-de-luz">
          {([undefined, 'anterior'] as const).map((fundo) => (
            <figure key={fundo ?? 'padrao'}>
              <div className="ph quadro amostra-de-fundo" data-tema={tema} data-conteudo="vidro" data-fundo={fundo}>
                <div className="ambiente" aria-hidden="true" />
              </div>
              <figcaption className="rotulo-de-token">{fundo ? 'o de antes · roxo, magenta e lima' : 'o padrão · roxo da marca, magenta e índigo'}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bloco-de-tokens">
        <h2>O vidro, por nível</h2>
        <div className="niveis-de-vidro">
          <figure>
            <div className="ph quadro amostra-de-nivel" data-tema={tema} data-conteudo="vidro">
              <div className="ambiente" aria-hidden="true" />
              <Cartao>
                <p className="t15">Vidro de fundo: o cartão, com desfoque de verdade.</p>
                <Botao>Vidro de controle, o principal</Botao>
                <Botao variante="secundario">Vidro de controle</Botao>
              </Cartao>
            </div>
            <figcaption className="rotulo-de-token">o cartão é vidro de fundo; os botões dentro dele são vidro de controle, sem desfoque</figcaption>
          </figure>
          <figure>
            <div className="ph quadro amostra-de-nivel" data-tema={tema} data-conteudo="vidro">
              <div className="ambiente" aria-hidden="true" />
              <div className="solto-no-fundo">
                <Botao>O principal, sobre o fundo de luz</Botao>
                <Botao variante="secundario">O secundário, sobre o fundo de luz</Botao>
              </div>
            </div>
            <figcaption className="rotulo-de-token">fora de outro vidro, o botão tem o desfoque da biblioteca; a cor do principal é a mesma</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

