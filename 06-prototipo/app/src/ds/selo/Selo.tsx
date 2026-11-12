// Os selos de confiança e de pontualidade (F05): sempre forma, ícone e palavra. A cor só confirma.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { GlassBadge } from '@/components/glassyui/glass-badge';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './selo.css';

/** ao-vivo: o pulso em vivo · neutro: fundo-elevado · atraso: atencao cheio · aproximado: atencao-suave
 *  perigo: perigo-suave · sem-sinal: contorno tracejado · apagado: neutro em tinta-apagada · forte: neutro em peso 600 */
/** ao-vivo-neutro: depois do embarque, o "Ao vivo" vira um selo neutro com o ponto, e o destaque passa para o embarque */
/** adiantado: neutro, com o ícone em info */
export type TipoDeSelo = 'ao-vivo' | 'ao-vivo-neutro' | 'neutro' | 'adiantado' | 'atraso' | 'aproximado' | 'perigo' | 'sem-sinal' | 'apagado' | 'forte' | 'registrado';

const CLASSE: Record<TipoDeSelo, string> = {
  'ao-vivo': 'vivo',
  'ao-vivo-neutro': '',
  neutro: '',
  adiantado: 'ad',
  atraso: 'at',
  aproximado: 'ats',
  perigo: 'pg',
  'sem-sinal': 'ss',
  apagado: 'mu',
  forte: 'b',
  registrado: 'vivo',
};

export interface SeloProps {
  tipo: TipoDeSelo;
  icone?: string;
  children: ReactNode;
}

export function Selo({ tipo, icone, children }: SeloProps) {
  const deVidro = usarVidro('selos');
  // de vidro, é o selo da biblioteca: a pílula com o fio de luz na borda. A cor de cada estado continua a nossa
  if (deVidro) {
    return (
      <GlassBadge className={clsx('selo', CLASSE[tipo])} data-peca-de-vidro="selos" data-material="vidro">
        {(tipo === 'ao-vivo' || tipo === 'ao-vivo-neutro') && <span className="dot" />}
        {icone && <Icone nome={icone} />}
        <span>{children}</span>
      </GlassBadge>
    );
  }
  return (
    <span className={clsx('selo', CLASSE[tipo])} data-peca-de-vidro="selos" data-material="solido">
      {(tipo === 'ao-vivo' || tipo === 'ao-vivo-neutro') && <span className="dot" />}
      {icone && <Icone nome={icone} />}
      <span>{children}</span>
    </span>
  );
}

export function Selos({ children }: { children: ReactNode }) {
  return <div className="selos">{children}</div>;
}

/** O chip de papel da parada: "Seu ponto", "Destino", "Ponto de sempre". */
export function ChipDePapel({ apagado, children }: { apagado?: boolean; children: ReactNode }) {
  return (
    <span className={clsx('cp', apagado && 'm')} data-papel={typeof children === 'string' ? children : undefined}>
      {children}
    </span>
  );
}
