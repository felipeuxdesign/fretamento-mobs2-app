// A estrutura de uma tela: a barra de status, a barra do topo, os banners, a área que rola e o rodapé fixo.
// A barra de cima e o rodapé ficam no lugar; o miolo rola por dentro do aparelho, com o indicador de rolagem do iOS.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { Topo } from '@/ds/barra/Topo';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { usarEstado } from '@/estado/armazem';
import './tela.css';

export interface EstruturaProps {
  /** o fundo da barra de status: o do cartão, quando há barra do topo, ou o da página */
  status?: 'cartao' | 'pagina';
  barra?: ReactNode;
  /** os banners fixos, logo abaixo da barra: até dois, por prioridade */
  banners?: ReactNode;
  rodape?: ReactNode;
  /** a classe do miolo: "sc" nas telas com barra, "auth" nas de autenticação */
  miolo?: string;
  /** rola até o fim ao abrir (as referências "rolada até o fim") */
  noFim?: boolean;
  children: ReactNode;
  /** o que fica fora do miolo e dentro da tela (o pé do Entrar, o mapa) */
  solto?: ReactNode;
}

export function Estrutura({ status = 'cartao', barra, banners, rodape, miolo = 'sc', noFim, children, solto }: EstruturaProps) {
  const rolar = usarEstado((e) => e.endereco.rolar);
  const ref = useRef<HTMLElement>(null);
  // de vidro, a barra e o rodapé ficam por cima da rolagem: o miolo ganha em cima e embaixo o espaço deles
  const barraDeVidro = usarVidro('barra') && !!barra;
  const rodapeDeVidro = usarVidro('rodape') && !!rodape;
  const [alturaDoTopo, setAlturaDoTopo] = useState(0);
  const [alturaDoRodape, setAlturaDoRodape] = useState(0);
  const medirPeca = useCallback((guardar: (n: number) => void) => (el: HTMLElement | null) => {
    if (!el) return;
    const o = new ResizeObserver(() => guardar(el.offsetHeight));
    o.observe(el);
    guardar(el.offsetHeight);
    return () => o.disconnect();
  }, []);
  const refDoTopo = useMemo(() => medirPeca(setAlturaDoTopo), [medirPeca]);
  const refDoRodape = useMemo(() => medirPeca(setAlturaDoRodape), [medirPeca]);
  const [polegar, setPolegar] = useState<{ topo: number; altura: number } | null>(null);
  const [aVista, setAVista] = useState(false);
  const [temMais, setTemMais] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [rolando, setRolando] = useState(false);
  const parou = useRef<number | undefined>(undefined);
  const some = useRef<number | undefined>(undefined);
  // a rolagem posta pela própria tela (abrir já rolada até o fim) não é a pessoa rolando: o indicador não aparece
  const postaPelaTela = useRef(false);

  const medir = useCallback(() => {
    const el = ref.current;
    // ainda tem conteúdo abaixo do que se vê: é quando a borda de rolagem de baixo aparece
    setTemMais(!!el && el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    // já rolou: tem conteúdo por baixo da barra, e é quando a borda de rolagem de cima aparece
    setRolou(!!el && el.scrollTop > 2);
    if (!el || el.scrollHeight <= el.clientHeight + 1) return setPolegar(null);
    const trilho = el.clientHeight - 8;
    const altura = Math.max(36, (el.clientHeight / el.scrollHeight) * trilho);
    const topo = 4 + (el.scrollTop / (el.scrollHeight - el.clientHeight)) * (trilho - altura);
    setPolegar({ topo: el.offsetTop + topo, altura });
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const antes = el.scrollTop;
    if (noFim || rolar === 'fim') el.scrollTop = el.scrollHeight;
    else if (rolar === 'meio') el.scrollTop = Math.round((el.scrollHeight - el.clientHeight) / 2);
    if (el.scrollTop !== antes) postaPelaTela.current = true;
    // a barra e o rodapé de vidro só dizem a altura deles depois de montados, e o miolo cresce com ela:
    // a rolagem até o fim é posta de novo, para o fim ser o fim de verdade
  }, [noFim, rolar, alturaDoTopo, alturaDoRodape]);

  useEffect(() => () => { window.clearTimeout(some.current); window.clearTimeout(parou.current); }, []);

  // mede ao abrir e quando o conteúdo muda de tamanho, para a borda de baixo saber se ainda há o que rolar
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    medir();
    const olho = new ResizeObserver(() => medir());
    olho.observe(el);
    for (const filho of Array.from(el.children)) olho.observe(filho);
    return () => olho.disconnect();
  }, [medir, children]);

  // o indicador só aparece na rolagem de quem está com a mão na tela: o dedo, a roda, o teclado.
  // A rolagem que a tela põe sozinha (ir até o fim, um ajuste de layout) não o acende
  const gesto = useRef(-Infinity);
  const houveGesto = () => (gesto.current = performance.now());
  const aoRolar = () => {
    medir();
    // enquanto rola, a lente da borda do vidro descansa (ela custa caro com o conteúdo em movimento) e volta ao parar
    setRolando(true);
    window.clearTimeout(parou.current);
    parou.current = window.setTimeout(() => setRolando(false), 180);
    if (postaPelaTela.current) {
      postaPelaTela.current = false;
      return;
    }
    if (performance.now() - gesto.current > 1500) return;
    setAVista(true);
    window.clearTimeout(some.current);
    some.current = window.setTimeout(() => setAVista(false), 900);
  };

  return (
    <>
      <Topo ref={refDoTopo} status={status} barra={barra} banners={banners} />
      <main
        ref={ref}
        className={clsx(miolo, barraDeVidro && 'sob-o-topo', rodapeDeVidro && 'sobre-o-rodape')}
        style={{ ['--topo-h' as string]: `${alturaDoTopo}px`, ['--rodape-h' as string]: `${alturaDoRodape}px` } as CSSProperties}
        data-rolou={rolou ? '' : undefined}
        data-rolando={rolando ? '' : undefined}
        onScroll={aoRolar}
        onWheel={houveGesto}
        onTouchStart={houveGesto}
        onTouchMove={houveGesto}
        onPointerDown={houveGesto}
        onKeyDown={houveGesto}
      >
        {children}
      </main>
      {rodape && <div ref={refDoRodape} className={clsx('lugar-do-rodape', rodapeDeVidro && 'flutua')}>{rodape}</div>}
      {/* de vidro, sem rodapé: o que continua abaixo da tela desfoca e some na cor da página, como no topo */}
      {barraDeVidro && !rodape && temMais && <div className="borda-de-rolagem do-pe" aria-hidden="true" />}
      {solto}
      {polegar && <div className={clsx('rolagem', aVista && 'a-vista')} style={{ top: polegar.topo, height: polegar.altura }} aria-hidden="true" />}
    </>
  );
}
