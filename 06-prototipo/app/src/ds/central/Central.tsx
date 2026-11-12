// O estado central (F04): ícone de 48, título, frase e um botão. E o vazio e o skeleton.
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import './central.css';

export interface EstadoCentralProps {
  /** bloqueio: o da T04, com o respiro dela · painel: o das outras telas (acesso, protocolo, conta excluída) */
  variante?: 'bloqueio' | 'painel';
  icone: string;
  /** a cor do ícone: apagado (padrão), aviso em âmbar, ok em vivo */
  tom?: 'apagado' | 'aviso' | 'ok';
  /** o traço do ícone de 48: 1,5 na T04 e 1,6 no painel, como nas referências */
  traco?: number;
  titulo: ReactNode;
  children?: ReactNode;
}

export function EstadoCentral({ variante = 'painel', icone, tom = 'apagado', traco, titulo, children }: EstadoCentralProps) {
  return (
    <div className={variante === 'bloqueio' ? 'central' : 'cpane'}>
      <Icone nome={icone} className={clsx('big', tom === 'aviso' && 'warn', tom === 'ok' && 'ok')} traco={traco ?? (variante === 'bloqueio' ? 1.5 : 1.6)} tamanho={variante === 'painel' ? 48 : undefined} />
      <h2>{titulo}</h2>
      {children}
    </div>
  );
}

/** As ações do estado central: o botão e, embaixo, o link. */
export function AcoesCentrais({ children }: { children: ReactNode }) {
  return <div className="acts">{children}</div>;
}

/** O vazio dentro da rolagem: ícone de 48, título e frase. */
export function Vazio({ icone, titulo, children }: { icone: string; titulo: ReactNode; children?: ReactNode }) {
  return (
    <div className="empty">
      <Icone nome={icone} traco={1.5} />
      <h3>{titulo}</h3>
      {children}
    </div>
  );
}

/** Um bloco do skeleton: o brilho corre da esquerda para a direita, 1,2 s, linear (movimento 6). */
export function Osso({ altura, largura, forte, style }: { altura: number; largura?: number; forte?: boolean; style?: CSSProperties }) {
  return <div className={clsx('sk', forte && 'forte')} style={{ height: altura, width: largura, ...style }} />;
}
