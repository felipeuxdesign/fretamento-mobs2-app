// O material de uma peça: sólido (o original, igual à referência) ou vidro (a GlassSurface da GlassyUI).
// É um componente só para os dois materiais: a peça diz quem é e de que tamanho é o vidro dela, e nada mais.
// A forma (altura, raio, respiro, posição) é sempre a da classe da peça; o vidro só troca o material.
import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { GlassSurface } from '@/components/glassyui/glass-surface';
import { GlassPanel } from '@/components/glassyui/glass-panel';
import { usarVidro } from './usarVidro';
import { usarEstado } from '@/estado/armazem';
import type { PecaDeVidro } from './vidro.config';
import './vidro.css';

/** pequeno: controles, com lente · médio: barras, banner, rodapé, toast · grande: sheets, painel, o que o celular desenha */
export type TamanhoDoVidro = 'pequeno' | 'medio' | 'grande';

const PRESET = { pequeno: 'control', medio: 'standard', grande: 'prominent' } as const;

export interface MaterialProps extends HTMLAttributes<HTMLElement> {
  peca: PecaDeVidro;
  tamanho: TamanhoDoVidro;
  /** a lente da borda (só existe no Chromium). Ligada nas peças pequenas; desligada onde pesa ou distorce texto */
  lente?: boolean;
  /** a marca do elemento quando sólido: header, footer, div */
  como?: ElementType;
  /** o vidro com forma de painel (o grupo do mapa, o balão): a GlassPanel da biblioteca */
  painel?: boolean;
  children?: ReactNode;
}

export const Material = forwardRef<HTMLElement, MaterialProps>(function Material({ peca, tamanho, lente, como: Como = 'div', painel, className, children, ...resto }, ref) {
  const vidro = usarVidro(peca);
  const comLente = usarEstado((e) => e.endereco.lente);
  if (!vidro) {
    return (
      <Como ref={ref} className={className} data-peca-de-vidro={peca} data-material="solido" {...resto}>
        {children}
      </Como>
    );
  }
  const Superficie = painel ? GlassPanel : GlassSurface;
  return (
    <Superficie
      ref={ref as React.Ref<HTMLDivElement>}
      preset={PRESET[tamanho]}
      lens={comLente && (lente ?? tamanho === 'pequeno')}
      className={clsx(className, 'vidro', `vidro-${tamanho}`)}
      data-peca-de-vidro={peca}
      data-material="vidro"
      {...(resto as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Superficie>
  );
});
