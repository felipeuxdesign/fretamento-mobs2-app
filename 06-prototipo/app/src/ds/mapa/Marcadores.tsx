// O que vai sobre o mapa (F05): as paradas com o ícone do tipo, o seu ponto com halo, o destino com a bandeira,
// as setas do sentido, o ônibus como único ponto brilhante, o ponto azul de quem olha e a escala.
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { ler } from '@/estado/armazem';
import { ROTA_DA_IDA } from './desenho';
import { verticeDaRota, type PontoDoMapa } from './Mapa';
import { SETAS_DO_SENTIDO, SETAS_DA_LINHA_INTEIRA } from './paradas';

/** Uma medida do marcador, no tamanho dele: com a linha inteira na tela, os marcadores encolhem para 72%. */
const m = (v: number, k: number) => (k === 1 ? v : Math.round(v * k * 10) / 10);
export const FATOR_AFASTADO = 0.72;

/** Um ícone dos 64 dentro do desenho, com o canto em (x, y). */
function Glifo({ nome, x, y, lado, cor, traco = 2.2 }: { nome: string; x: number; y: number; lado: number; cor: string; traco?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} style={{ color: cor }}>
      <Icone nome={nome} tamanho={lado} traco={traco} />
    </g>
  );
}

/** vem: a parada à frente do ônibus · passada · minha: o seu ponto, com halo · escolhida: a parada aberta no painel */
export type EstadoDaParada = 'vem' | 'passada' | 'minha' | 'escolhida';

export interface ParadaNoMapaProps {
  em: PontoDoMapa;
  icone: string;
  estado: EstadoDaParada;
  /** a origem e o destino da viagem têm o disco cheio */
  ponta?: 'origem' | 'destino';
  /** o anel de chegando (movimento 5): só enquanto o ônibus está chegando no seu ponto */
  chegando?: boolean;
  rotulo?: string;
  aoTocar?: () => void;
  /** o tamanho do marcador: 1, ou 0,72 com a linha inteira na tela */
  k?: number;
}

export function ParadaNoMapa({ em: [x, y], icone, estado, ponta, chegando, rotulo, aoTocar, k = 1 }: ParadaNoMapaProps) {
  let desenho: ReactNode;
  if (ponta === 'destino') {
    desenho = (
      <>
        <circle cx={x} cy={y} r={m(13, k)} fill="var(--tinta)" />
        <Glifo nome="destino" x={x - m(7, k)} y={y - m(7, k)} lado={m(14, k)} cor="var(--fundo-pagina)" />
      </>
    );
  } else if (estado === 'escolhida') {
    desenho = (
      <>
        <circle cx={x} cy={y} r={m(24, k)} fill="var(--tinta)" fillOpacity=".14" />
        <circle cx={x} cy={y} r={m(17, k)} fill="var(--tinta)" />
        <Glifo nome={icone} x={x - m(9, k)} y={y - m(9, k)} lado={m(18, k)} cor="var(--fundo-pagina)" />
      </>
    );
  } else if (estado === 'minha') {
    desenho = (
      <>
        <circle className={clsx(chegando && 'anel-de-chegando')} cx={x} cy={y} r={m(27, k)} fill="var(--vivo)" fillOpacity=".1" style={{ transformOrigin: `${x}px ${y}px` }} />
        <circle cx={x} cy={y} r={m(19, k)} fill="var(--vivo)" fillOpacity=".22" />
        <circle cx={x} cy={y} r={m(13, k)} fill="var(--fundo-cartao)" stroke="var(--vivo)" strokeWidth={m(2.5, k)} />
        <Glifo nome="pessoa" x={x - m(7.5, k)} y={y - m(7.5, k)} lado={m(15, k)} cor="var(--vivo)" traco={2.4} />
      </>
    );
  } else if (estado === 'passada') {
    desenho =
      ponta === 'origem' ? (
        <>
          <circle cx={x} cy={y} r={m(11, k)} fill="var(--tinta-desligada)" />
          <Glifo nome={icone} x={x - m(6, k)} y={y - m(6, k)} lado={m(12, k)} cor="var(--fundo-pagina)" />
        </>
      ) : (
        <>
          <circle cx={x} cy={y} r={m(11, k)} fill="var(--fundo-cartao)" stroke="var(--tinta-desligada)" strokeWidth={m(2, k)} />
          <Glifo nome={icone} x={x - m(6, k)} y={y - m(6, k)} lado={m(12, k)} cor="var(--tinta-desligada)" traco={icone === 'pessoa' ? 2.4 : 2.2} />
        </>
      );
  } else {
    desenho = (
      <>
        <circle cx={x} cy={y} r={m(12, k)} fill="var(--fundo-cartao)" stroke="var(--rota-ida)" strokeWidth={m(2, k)} />
        <Glifo nome={icone} x={x - m(7, k)} y={y - m(7, k)} lado={m(14, k)} cor="var(--tinta)" />
      </>
    );
  }
  if (!aoTocar) return <g>{desenho}</g>;
  return (
    <g className="mapa-toca" role="button" tabIndex={0} aria-label={rotulo} onClick={aoTocar} onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), aoTocar())}>
      {/* a área de toque, de 44 */}
      <circle cx={x} cy={y} r="22" fill="transparent" />
      {desenho}
    </g>
  );
}

/** Uma parada sem nome: só o ponto na rota. */
export function ParadaSemNome({ em: [x, y], passada, dobro }: { em: PontoDoMapa; passada?: boolean; /** dentro do desenho a 50%, o ponto dobra para parecer igual */ dobro?: boolean }) {
  return <circle cx={x} cy={y} r={dobro ? 9 : 4.5} fill="var(--mapa-terreno)" stroke={passada ? 'var(--tinta-desligada)' : 'var(--rota-ida)'} strokeWidth={dobro ? 4 : 2} />;
}

/** As setas do sentido, no trecho que ainda falta depois da próxima parada. */
export function SetasDoSentido({ depoisDe, afastado }: { depoisDe: PontoDoMapa | null; /** com a linha inteira na tela, são menos setas, em dobro */ afastado?: boolean }) {
  const corte = depoisDe ? verticeDaRota(depoisDe) : -1;
  const setas = afastado ? SETAS_DA_LINHA_INTEIRA : SETAS_DO_SENTIDO;
  return (
    <>
      {setas
        .filter((s) => verticeDaRota(s.em) > corte)
        .map((s) => (
          <path key={s.em.join()} d={afastado ? 'M-7.2 5.6 L0 -5.6 L7.2 5.6' : 'M-3.6 2.8 L0 -2.8 L3.6 2.8'} fill="none" stroke="var(--mapa-terreno)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={afastado ? 3.2 : 1.6} transform={`translate(${s.em[0]} ${s.em[1]}) rotate(${s.giro})`} />
        ))}
    </>
  );
}

export interface OnibusNoMapaProps {
  em: PontoDoMapa;
  /** a ponta que diz para onde ele vai: três pontos, a partir do centro do disco. Parado numa parada, não tem */
  ponteiro?: [PontoDoMapa, PontoDoMapa, PontoDoMapa] | null;
  /** sem sinal: para e apaga */
  apagado?: boolean;
  rotulo?: string;
  aoTocar?: () => void;
  /** o tamanho do marcador: 1, ou 0,72 com a linha inteira na tela */
  k?: number;
}

/** O ônibus no mapa: o único ponto brilhante. De um passo para o outro, desliza pela rota (movimento 2). */
export function OnibusNoMapa({ em: [x, y], ponteiro, apagado, rotulo, aoTocar, k = 1 }: OnibusNoMapaProps) {
  const ref = useRef<SVGGElement>(null);
  const antes = useRef<PontoDoMapa | null>(null);
  useLayoutEffect(() => {
    const de = antes.current;
    antes.current = [x, y];
    if (!de || !ref.current || (de[0] === x && de[1] === y)) return;
    if (ler().parado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // o caminho entre as duas posições, pelo traçado, sem pular
    const a = verticeDaRota(de);
    const b = verticeDaRota([x, y]);
    const pelaRota = a < b ? ROTA_DA_IDA.slice(a, b + 1) : a > b ? ROTA_DA_IDA.slice(b, a + 1).reverse() : [];
    const pontos: PontoDoMapa[] = [de, ...pelaRota, [x, y]];
    // os quadros no ritmo da distância andada
    const passos = pontos.map((p, i) => (i ? Math.hypot(p[0] - pontos[i - 1][0], p[1] - pontos[i - 1][1]) : 0));
    const total = passos.reduce((s, d) => s + d, 0) || 1;
    let andado = 0;
    const quadros = pontos.map((p, i) => {
      andado += passos[i];
      return { transform: `translate(${p[0]}px, ${p[1]}px)`, offset: Math.min(1, andado / total) };
    });
    quadros[quadros.length - 1].offset = 1;
    ref.current.animate(quadros, { duration: 900, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' });
  }, [x, y]);
  const cor = apagado ? 'var(--tinta-desligada)' : 'var(--onibus)';
  const toque = aoTocar ? { role: 'button', tabIndex: 0, 'aria-label': rotulo, onClick: aoTocar, onKeyDown: (ev: React.KeyboardEvent) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), aoTocar()) } : {};
  return (
    <g ref={ref} className={clsx('mapa-onibus', aoTocar && 'mapa-toca')} style={{ transform: `translate(${x}px, ${y}px)` }} {...toque}>
      {!apagado && (
        <>
          <circle r={m(33, k)} fill="var(--onibus)" fillOpacity=".08" />
          <circle r={m(25, k)} fill="var(--onibus)" fillOpacity=".18" />
        </>
      )}
      {ponteiro && <path d={`M${m(ponteiro[0][0], k)} ${m(ponteiro[0][1], k)}L${m(ponteiro[1][0], k)} ${m(ponteiro[1][1], k)}L${m(ponteiro[2][0], k)} ${m(ponteiro[2][1], k)}Z`} fill={cor} stroke="var(--mapa-terreno)" strokeLinejoin="round" strokeWidth="1.5" />}
      <circle r={m(16, k)} fill={cor} stroke="var(--mapa-terreno)" strokeWidth={m(2.5, k)} />
      <Glifo nome="onibus" x={-m(9, k)} y={-m(9, k)} lado={m(18, k)} cor="var(--vivo-tinta)" />
    </g>
  );
}

/** A ponta do ônibus, pelo rumo dele no traçado: a 26 do centro, com a base a 18. */
export function ponteiroPeloRumo(em: PontoDoMapa): [PontoDoMapa, PontoDoMapa, PontoDoMapa] {
  const i = Math.min(verticeDaRota(em), ROTA_DA_IDA.length - 2);
  const [ax, ay] = ROTA_DA_IDA[i];
  const [bx, by] = ROTA_DA_IDA[Math.min(i + 3, ROTA_DA_IDA.length - 1)];
  const rumo = Math.atan2(by - ay, bx - ax);
  const p = (raio: number, giro: number): PontoDoMapa => [Number((raio * Math.cos(rumo + giro)).toFixed(1)), Number((raio * Math.sin(rumo + giro)).toFixed(1))];
  return [p(26, 0), p(18, 0.2), p(18, -0.2)];
}

/** Onde a pessoa está: o ponto azul. Só aparece com a permissão de localização dada. */
export function PontoAzul({ em: [x, y] }: { em: PontoDoMapa }) {
  return (
    <>
      <circle cx={x} cy={y} r="22" fill="var(--info)" fillOpacity=".16" />
      <circle cx={x} cy={y} r="8" fill="var(--info)" stroke="var(--tinta)" strokeWidth="2.5" />
    </>
  );
}

/** A escala, parada na tela, logo acima do painel. */
export function Escala({ x, y, texto }: { x: number; y: number; texto: string }) {
  return (
    <g aria-hidden="true" transform={`translate(${x} ${y})`}>
      <path d="M0 -3 L0 0 L56 0 L56 -3" fill="none" stroke="var(--tinta)" strokeOpacity=".9" strokeWidth="1.5" />
      <text fill="var(--tinta-apagada)" fontFamily="inherit" fontSize="9" fontWeight="600" paintOrder="stroke" stroke="var(--mapa-terreno)" strokeLinejoin="round" strokeWidth="2.4" x="0" y="-7">
        {texto}
      </text>
    </g>
  );
}
