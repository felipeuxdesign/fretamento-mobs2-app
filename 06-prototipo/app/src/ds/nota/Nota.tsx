// A nota, o erro no lugar e o aviso no lugar (F04). O erro aparece onde a pessoa tocou e fica até ser resolvido.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import './nota.css';

export interface NotaProps {
  /** info: caixa neutra com o ícone de informação · confirma: sem caixa, com o visto em vivo
   *  erro: perigo-suave · erro-liso: o erro de campo, sem caixa · aviso: atencao-suave · erro-do-sheet · aviso-do-pedido */
  tipo: 'info' | 'confirma' | 'erro' | 'erro-liso' | 'aviso' | 'erro-do-sheet' | 'aviso-do-pedido';
  icone?: string;
  children: ReactNode;
  className?: string;
}

const CLASSE: Record<NotaProps['tipo'], string> = {
  info: 'ninfo',
  confirma: 'nota',
  erro: 'ferr',
  'erro-liso': 'ferr liso',
  aviso: 'fwarn',
  'erro-do-sheet': 'sherr',
  'aviso-do-pedido': 'note warn',
};
const ICONE: Record<NotaProps['tipo'], string> = {
  info: 'info',
  confirma: 'confirmado',
  erro: 'erro',
  'erro-liso': 'erro',
  aviso: 'horario',
  'erro-do-sheet': 'erro',
  'aviso-do-pedido': 'desvio',
};

export function Nota({ tipo, icone, children, className }: NotaProps) {
  const erro = tipo === 'erro' || tipo === 'erro-liso' || tipo === 'erro-do-sheet';
  const Marca = tipo === 'erro-do-sheet' ? 'div' : 'p';
  return (
    <Marca className={clsx(CLASSE[tipo], className)} role={erro ? 'alert' : undefined}>
      <Icone nome={icone ?? ICONE[tipo]} />
      <span>{children}</span>
    </Marca>
  );
}
