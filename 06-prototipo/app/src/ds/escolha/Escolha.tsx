// O chip e o rádio (F06).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { GlassButton } from '@/components/glassyui/glass-button';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { usarEstado } from '@/estado/armazem';
import './escolha.css';

export interface ChipProps {
  ligado?: boolean;
  desligado?: boolean;
  icone?: string;
  aoTocar?: () => void;
  children: ReactNode;
  /** dentro de um grupo de escolha única (5, 10, 15 min) o chip é um rádio */
  comoRadio?: boolean;
}

export function Chip({ ligado, desligado, icone, aoTocar, children, comoRadio }: ChipProps) {
  const deVidro = usarVidro('botoes');
  const comLente = usarEstado((e) => e.endereco.lente);
  // o chip de escolha única (5, 10, 15 min): de vidro, é o mesmo botão da biblioteca, com papel de rádio
  if (comoRadio && deVidro)
    return (
      <GlassButton variant="primary" lens={comLente} className={clsx('chip-de-vidro', 'de-escolha', ligado && 'on', desligado && 'dis')} role="radio" aria-checked={!!ligado} disabled={desligado} onClick={aoTocar} data-peca-de-vidro="botoes" data-material="vidro">
        {children}
      </GlassButton>
    );
  if (comoRadio)
    return (
      <span
        className={clsx('chip', ligado && 'on', desligado && 'dis')}
        role="radio"
        aria-checked={!!ligado}
        aria-disabled={desligado || undefined}
        tabIndex={desligado ? -1 : 0}
        onClick={desligado ? undefined : aoTocar}
        onKeyDown={(ev) => !desligado && (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), aoTocar?.())}
      >
        {children}
      </span>
    );
  if (deVidro) {
    return (
      <GlassButton variant="primary" lens={comLente} className={clsx('chip-de-vidro', ligado && 'on')} aria-pressed={!!ligado} disabled={desligado} onClick={aoTocar} data-peca-de-vidro="botoes" data-material="vidro">
        {icone && <Icone nome={icone} />}
        {children}
      </GlassButton>
    );
  }
  return (
    <button type="button" className={clsx('chip', ligado && 'on', desligado && 'dis')} aria-pressed={!!ligado} disabled={desligado} onClick={aoTocar}>
      {icone && <Icone nome={icone} />}
      {children}
    </button>
  );
}

export function Chips({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="chips" role="radiogroup" aria-label={rotulo}>
      {children}
    </div>
  );
}

/** O rádio, só o desenho: quem responde ao toque é o item em volta. */
export function Radio({ ligado, desligado }: { ligado?: boolean; desligado?: boolean }) {
  return <span className={clsx('rad', ligado && 'on', desligado && 'dis')}>{ligado && <span />}</span>;
}
