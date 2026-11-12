// O conteúdo de vidro: cartões, listas e cartões que se tocam, sobre o fundo de luz da tela.
// De vidro, é o GlassPanel da biblioteca, como ela desenha (o painel em cartão). A lente da borda e a espessura
// entram nas peças principais (o herói, a marca); nas outras não, que são muitas na tela, rolando.
// Sólido, é o elemento de sempre, igual à referência.
import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { GlassPanel } from '@/components/glassyui/glass-panel';
import { usarVidro } from './usarVidro';
import { usarEstado } from '@/estado/armazem';
import './vidro.css';

export interface ConteudoProps extends HTMLAttributes<HTMLElement> {
  /** a marca do elemento quando sólido: section, div */
  como?: ElementType;
  /** fica sólido mesmo com o vidro ligado: o cartão que mora dentro de uma peça que flutua (o painel do mapa) */
  semVidro?: boolean;
  /** a lente da borda (só no Chromium), que entorta o que passa atrás. Nas peças principais: o herói, a marca */
  lente?: boolean;
  children?: ReactNode;
}

export const Conteudo = forwardRef<HTMLElement, ConteudoProps>(function Conteudo({ como: Como = 'div', semVidro, lente, className, children, ...resto }, ref) {
  const vidro = usarVidro('conteudo') && !semVidro;
  const comLente = usarEstado((e) => e.endereco.lente);
  if (!vidro) {
    return (
      <Como ref={ref} className={className} data-peca-de-vidro="conteudo" data-material="solido" {...resto}>
        {children}
      </Como>
    );
  }
  return (
    <GlassPanel
      ref={ref as React.Ref<HTMLDivElement>}
      variant="card"
      preset="standard"
      lens={!!lente && comLente}
      thickness={lente ? 1.5 : undefined}
      className={clsx(className, 'conteudo-de-vidro')}
      data-peca-de-vidro="conteudo"
      data-material="vidro"
      {...(resto as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </GlassPanel>
  );
});
