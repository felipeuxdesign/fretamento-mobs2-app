// O cartão é a unidade da tela (F04). Três variações mudam a forma: destaque, perigo e interativo.
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { Conteudo } from '@/ds/vidro/Conteudo';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './cartao.css';

export interface CartaoProps {
  /** destaque: fundo-destaque e raio 24 · perigo: borda perigo */
  variante?: 'normal' | 'destaque' | 'perigo';
  /** o espaço entre os blocos de dentro: 12 por padrão, 8 nos cartões de lista */
  espaco?: 8 | 12;
  /** o respiro de dentro: 16 por padrão; "lista" é 8 em cima e embaixo, para o trilho */
  respiro?: 'normal' | 'lista';
  /** fica sólido mesmo com o conteúdo de vidro: dentro do painel do mapa, que já é vidro */
  semVidro?: boolean;
  /** de vidro, com a lente da borda e mais espessura: o cartão principal da tela (o herói) */
  lente?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Cartao({ variante = 'normal', espaco = 12, respiro = 'normal', semVidro, lente, children, className, style }: CartaoProps) {
  return (
    <Conteudo como="section" semVidro={semVidro} lente={lente} className={clsx('card', variante === 'destaque' && 'hl', variante === 'perigo' && 'dg', espaco === 8 && 'e8', respiro === 'lista' && 'r-lista', className)} style={style}>
      {children}
    </Conteudo>
  );
}

/** A linha fina que separa blocos dentro de um cartão. */
export function Divisoria() {
  return <div className="hline" />;
}

/** O poço: o quadrado de fundo-elevado, 40 com raio 8, que segura um ícone de 20. */
export function Poco({ icone, cor, children }: { icone?: string; cor?: 'ida' | 'volta' | 'vivo' | 'tinta'; children?: ReactNode }) {
  return (
    <span className={clsx('poco', cor && `cor-${cor}`)}>
      {icone && <Icone nome={icone} />}
      {children}
    </span>
  );
}

export interface CartaoInterativoProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'title'> {
  icone: string;
  cor?: 'ida' | 'volta' | 'vivo' | 'tinta';
  titulo: ReactNode;
  apoio?: ReactNode;
  /** com a seta de seguir adiante */
  seta?: boolean;
  /** o cartão compacto dos atalhos, com respiro de 12 */
  compacto?: boolean;
  desligado?: boolean;
}

/** O cartão interativo: poço, título, apoio e, quando leva a outro lugar, a seta. */
export function CartaoInterativo({ icone, cor, titulo, apoio, seta, compacto, desligado, className, ...resto }: CartaoInterativoProps) {
  const deVidro = usarVidro('conteudo');
  const botao = (
    <button type="button" className={clsx('cint', compacto && 'compacto', desligado && 'dis', className)} disabled={desligado} {...resto}>
      <Poco icone={icone} cor={cor} />
      <span className="ct">
        <b>{titulo}</b>
        {apoio && <small>{apoio}</small>}
      </span>
      {seta && <Icone nome="seguir-adiante" className="chev" />}
    </button>
  );
  // de vidro, o cartão que se toca é um painel de vidro com o botão por dentro
  return deVidro ? <Conteudo className="cint-de-vidro">{botao}</Conteudo> : botao;
}

/** A placa em destaque, a partir de chegando: "Confira o ônibus", a placa e o prefixo. */
export function Placa({ rotulo, placa }: { rotulo: string; placa: string }) {
  return (
    <div className="placa">
      <span className="d">
        <Icone nome="onibus" />
      </span>
      <div className="pilha2">
        <span className="legenda">{rotulo}</span>
        <span className="placa-n">{placa}</span>
      </div>
    </div>
  );
}

/** O cartão de contato do estado central: quem resolve, com o canal e o horário. */
export function CartaoDeContato({ icone, titulo, apoio, invertido, comRespiro }: { icone: string; titulo: ReactNode; apoio: ReactNode; /** o apoio em cima e o valor embaixo (o protocolo) */ invertido?: boolean; /** com 8 de respiro em cima */ comRespiro?: boolean }) {
  return (
    <Conteudo className={comRespiro ? 'ccard com-respiro' : 'ccard'}>
      <span className="poco">
        <Icone nome={icone} className="ic" />
      </span>
      <span className="tx">
        {invertido && <small>{apoio}</small>}
        <b>{titulo}</b>
        {!invertido && <small>{apoio}</small>}
      </span>
    </Conteudo>
  );
}

/** A opção com switch, no Preparar o app: o que faz, a explicação e o controle à direita. */
export function Opcao({ titulo, apoio, controle }: { titulo: ReactNode; apoio: ReactNode; controle: ReactNode }) {
  return (
    <Conteudo className="opt">
      <span className="tx">
        <b>{titulo}</b>
        {apoio}
      </span>
      {controle}
    </Conteudo>
  );
}

/** O cartão de quem resolve (Preciso de ajuda): quem é, o que resolve, o canal, o horário e as ações. */
export function CartaoDeAjuda({ icone, titulo, resolve, linhas, children }: { icone: string; titulo: ReactNode; resolve: ReactNode; linhas: { icone: string; texto: ReactNode }[]; children?: ReactNode }) {
  return (
    <Conteudo className="hcard">
      <div className="hh">
        <span className="poco">
          <Icone nome={icone} />
        </span>
        <span>
          <b>{titulo}</b>
          <small>{resolve}</small>
        </span>
      </div>
      {linhas.map((l) => (
        <p key={l.icone} className="ln2">
          <Icone nome={l.icone} />
          <span>{l.texto}</span>
        </p>
      ))}
      {children}
    </Conteudo>
  );
}
