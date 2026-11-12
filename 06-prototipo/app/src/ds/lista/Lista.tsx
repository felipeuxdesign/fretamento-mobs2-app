// As listas (F04, F06): a linha de 56, com divisória entre as linhas e nunca na última (quem fecha é o cartão).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { Radio } from '@/ds/escolha/Escolha';
import { Conteudo } from '@/ds/vidro/Conteudo';
import './lista.css';

export function Lista({ children, className }: { children: ReactNode; className?: string }) {
  return <Conteudo className={clsx('list', className)}>{children}</Conteudo>;
}

/** O título de uma seção de lista: "Hoje", "Minha conta". */
export function TituloDeSecao({ children }: { children: ReactNode }) {
  return <h3 className="sh">{children}</h3>;
}

export interface LinhaProps {
  icone?: ReactNode;
  titulo?: ReactNode;
  apoio?: ReactNode;
  /** o apoio em cima e o valor embaixo (E-mail, Celular) */
  invertida?: boolean;
  /** o que fica à direita: um switch, ou nada */
  controle?: ReactNode;
  /** leva a outro lugar: ganha a seta e vira botão */
  aoTocar?: () => void;
  seta?: boolean;
  perigo?: boolean;
  desligada?: boolean;
  /** a linha em coluna, para um controle embaixo do título (os chips, o segmentado) */
  emColuna?: 'inicio' | 'esticada';
  children?: ReactNode;
  className?: string;
}

export function Linha({ icone, titulo, apoio, invertida, controle, aoTocar, seta, perigo, desligada, emColuna, children, className }: LinhaProps) {
  const classes = clsx('li', perigo && 'dg', desligada && 'dis', emColuna === 'inicio' && 'col-inicio', emColuna === 'esticada' && 'col-esticada', className);
  const miolo = (
    <>
      {typeof icone === 'string' ? <Icone nome={icone} className="ic" /> : icone}
      {(titulo || apoio) && (
        <span className="tx">
          {invertida && apoio && <small>{apoio}</small>}
          {titulo && <b>{titulo}</b>}
          {!invertida && apoio && <small>{apoio}</small>}
        </span>
      )}
      {children}
      {controle}
      {seta && <Icone nome="seguir-adiante" className="chev" />}
    </>
  );
  if (aoTocar)
    return (
      <button type="button" className={classes} onClick={aoTocar} disabled={desligada}>
        {miolo}
      </button>
    );
  return <div className={classes}>{miolo}</div>;
}

/** A nota no pé de uma lista. */
export function NotaDaLista({ icone = 'info', children }: { icone?: ReactNode; children: ReactNode }) {
  return (
    <p className="lnote">
      {typeof icone === 'string' ? <Icone nome={icone} className="ic" /> : icone}
      <span>{children}</span>
    </p>
  );
}

export interface ItemSelecionavelProps {
  marcador?: ReactNode;
  nome: ReactNode;
  apoio?: ReactNode;
  escolhido?: boolean;
  desligado?: boolean;
  aoEscolher?: () => void;
  nomeDoGrupo: string;
}

/** O item selecionável (rádio): 56, com a razão de estar ou não disponível. */
export function ItemSelecionavel({ marcador, nome, apoio, escolhido, desligado, aoEscolher, nomeDoGrupo }: ItemSelecionavelProps) {
  return (
    <div
      className={clsx('isel', escolhido && 'on', desligado && 'dis')}
      role="radio"
      aria-checked={!!escolhido}
      aria-disabled={desligado || undefined}
      data-grupo={nomeDoGrupo}
      tabIndex={desligado ? -1 : 0}
      onClick={desligado ? undefined : aoEscolher}
      onKeyDown={(ev) => {
        if (desligado) return;
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          aoEscolher?.();
        }
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
          ev.preventDefault();
          const todos = [...(ev.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]:not([aria-disabled])') ?? [])];
          const i = todos.indexOf(ev.currentTarget);
          todos[(i + (ev.key === 'ArrowDown' ? 1 : todos.length - 1)) % todos.length]?.focus();
        }
      }}
    >
      {marcador}
      <span className="tx">
        <span className="nm">{nome}</span>
        {apoio && <span className="sb">{apoio}</span>}
      </span>
      <Radio ligado={escolhido} desligado={desligado} />
    </div>
  );
}

/** O grupo recolhido: 52, com a seta que gira quando abre. */
export function GrupoRecolhido({ aberto, aoTocar, children }: { aberto?: boolean; aoTocar?: () => void; children: ReactNode }) {
  return (
    <div className="grp" role="button" tabIndex={0} aria-expanded={!!aberto} onClick={aoTocar} onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), aoTocar?.())}>
      <Icone nome="abrir" className={aberto ? 'gira' : undefined} />
      {children}
    </div>
  );
}

export interface LinhaDeAvisoProps {
  /** a cor do disco pelo tipo: ok (chegando) · in (saiu, trocado) · wa (atraso) · dg (cancelada) · neutro */
  tom: 'ok' | 'in' | 'wa' | 'dg' | 'neutro';
  icone: ReactNode;
  titulo: ReactNode;
  texto: ReactNode;
  hora: ReactNode;
  lida: boolean;
  aoTocar?: () => void;
}

/** A linha de notificação: o disco na cor do estado, o título, o texto, a hora e o ponto de não lida. */
export function LinhaDeAviso({ tom, icone, titulo, texto, hora, lida, aoTocar }: LinhaDeAvisoProps) {
  return (
    <button type="button" className={clsx('nrow', lida ? 'read' : 'unread')} onClick={aoTocar}>
      <span className={clsx('nic', tom !== 'neutro' && tom)}>{typeof icone === 'string' ? <Icone nome={icone} className="ic" /> : icone}</span>
      <span className="nt">
        <b>{titulo}</b>
        <span>{texto}</span>
      </span>
      <span className="nti">
        {hora}
        {!lida && <span className="udot" role="img" aria-label="não lida" />}
      </span>
    </button>
  );
}
