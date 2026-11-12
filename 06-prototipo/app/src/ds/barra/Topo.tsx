// O topo de uma tela: a barra de status, a barra e os banners. Sólido, cada um tem o seu fundo, como nas referências.
// De vidro, a barra de status entra junto no mesmo vidro: uma superfície só, do topo da tela até o fim da barra,
// e o banner cola nela. A barra passa a ficar por cima da área de rolagem, e o conteúdo passa por baixo.
import { createContext, forwardRef, useContext, type ReactNode } from 'react';
import clsx from 'clsx';
import { BarraDeStatus } from '@/sistema/BarraDeStatus';
import { usarVidro } from '@/ds/vidro/usarVidro';

/** Diz ao banner que ele está dentro de uma barra de vidro: ali ele não é outro vidro. */
export const DentroDaBarraDeVidro = createContext(false);
/** De vidro, a barra diz de que tipo é: a das telas (o título solto) ou a do mapa (o título em cápsula de vidro). */
export const BarraDeVidro = createContext<'barra' | 'barraDoMapa' | null>(null);
export const usarBarraDeVidro = () => useContext(BarraDeVidro);
export const usarDentroDaBarraDeVidro = (): boolean => useContext(DentroDaBarraDeVidro);

export interface TopoProps {
  /** o fundo da barra de status, no sólido: o do cartão, quando há barra, ou o da página */
  status?: 'cartao' | 'pagina';
  barra?: ReactNode;
  banners?: ReactNode;
  /** a barra do topo das telas, ou a barra flutuante do mapa */
  peca?: 'barra' | 'barraDoMapa';
  className?: string;
}

export const Topo = forwardRef<HTMLElement, TopoProps>(function Topo({ status = 'cartao', barra, banners, peca = 'barra', className }, ref) {
  const deVidro = usarVidro(peca) && !!barra;
  if (!deVidro) {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={clsx('topo', className)} data-peca-de-vidro={barra ? peca : undefined} data-material={barra ? 'solido' : undefined}>
        <BarraDeStatus fundo={status} />
        {barra}
        {banners}
      </div>
    );
  }
  // de vidro, a barra não é uma faixa: o conteúdo rola por baixo dela, com a borda de rolagem (um desfoque que
  // some para baixo, sem véu escuro), e quem é vidro são os botões, em esfera, e, sobre o mapa, o título em cápsula
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={clsx('topo', 'flutua', peca === 'barraDoMapa' && 'do-mapa', className)} data-peca-de-vidro={peca === 'barra' ? 'barra' : undefined} data-material={peca === 'barra' ? 'vidro' : undefined}>
      {peca === 'barra' && <div className="borda-de-rolagem" aria-hidden="true" />}
      <BarraDeStatus fundo="nenhum" />
      <BarraDeVidro.Provider value={peca}>{barra}</BarraDeVidro.Provider>
      {banners}
    </div>
  );
});
