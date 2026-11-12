// O switch (F06): 64 × 28, botão em cápsula de 38 × 24. Ligado em vivo com o botão em vivo-tinta.
import clsx from 'clsx';
import { GlassSwitch } from '@/components/glassyui/glass-switch';
import { usarVidro } from '@/ds/vidro/usarVidro';
import '@/ds/vidro/vidro.css';
import './switch.css';

export interface SwitchProps {
  ligado: boolean;
  aoMudar?: (ligado: boolean) => void;
  /** o nome acessível: o que o switch liga */
  rotulo: string;
  /** desligado sem poder: a 45% */
  indisponivel?: boolean;
}

export function Switch({ ligado, aoMudar, rotulo, indisponivel }: SwitchProps) {
  // de vidro, o trilho fica igual, nas nossas cores, e a bolinha vira vidro debaixo do dedo (o GlassSwitch da GlassyUI,
  // nas nossas medidas: 64 × 28, botão de 38 × 24)
  const deVidro = usarVidro('switch');
  if (deVidro) {
    return <GlassSwitch className="sw-de-vidro" checked={ligado} onCheckedChange={(v) => aoMudar?.(v)} aria-label={rotulo} disabled={indisponivel} data-peca-de-vidro="switch" data-material="vidro" />;
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      aria-label={rotulo}
      disabled={indisponivel}
      className={clsx('sw', ligado && 'on', indisponivel && 'dis')}
      data-peca-de-vidro="switch"
      data-material="solido"
      onClick={() => aoMudar?.(!ligado)}
      onKeyDown={(ev) => {
        if (ev.key === 'ArrowRight' && !ligado) aoMudar?.(true);
        if (ev.key === 'ArrowLeft' && ligado) aoMudar?.(false);
      }}
    >
      <i />
    </button>
  );
}
