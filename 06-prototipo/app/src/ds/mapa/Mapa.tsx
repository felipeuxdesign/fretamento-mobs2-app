// O mapa (F05): o desenho do Recife, dessaturado, com a rota e o ônibus como únicos pontos de cor.
// É conteúdo: nunca é vidro. O vidro fica por cima dele. O mapa se move por transform, numa camada só.
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { GEOGRAFIA, MAPA, ROTA_DA_IDA } from './desenho';
import { GEOGRAFIA_AFASTADA } from './desenho-afastado';
import './mapa.css';

export type PontoDoMapa = [number, number];

/** O ponto da rota a uma fração do caminho (0 = origem, 1 = destino), e o índice do trecho em que ele cai. */
export function pontoNaRota(fracao: number): { ponto: PontoDoMapa; indice: number } {
  const f = Math.max(0, Math.min(1, fracao));
  const comprimentos: number[] = [];
  let total = 0;
  for (let i = 1; i < ROTA_DA_IDA.length; i++) {
    const d = Math.hypot(ROTA_DA_IDA[i][0] - ROTA_DA_IDA[i - 1][0], ROTA_DA_IDA[i][1] - ROTA_DA_IDA[i - 1][1]);
    comprimentos.push(d);
    total += d;
  }
  let alvo = f * total;
  for (let i = 0; i < comprimentos.length; i++) {
    if (alvo <= comprimentos[i] || i === comprimentos.length - 1) {
      const t = comprimentos[i] ? Math.min(1, alvo / comprimentos[i]) : 0;
      const a = ROTA_DA_IDA[i];
      const b = ROTA_DA_IDA[i + 1];
      return { ponto: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], indice: i };
    }
    alvo -= comprimentos[i];
  }
  return { ponto: ROTA_DA_IDA[ROTA_DA_IDA.length - 1], indice: ROTA_DA_IDA.length - 2 };
}

/** A fração da rota mais perto de um ponto do mapa (para pôr o ônibus na parada). */
export function fracaoDoPonto(p: PontoDoMapa): number {
  let melhor = 0;
  let menor = Infinity;
  let acumulado = 0;
  let total = 0;
  const acumulados: number[] = [0];
  for (let i = 1; i < ROTA_DA_IDA.length; i++) {
    total += Math.hypot(ROTA_DA_IDA[i][0] - ROTA_DA_IDA[i - 1][0], ROTA_DA_IDA[i][1] - ROTA_DA_IDA[i - 1][1]);
    acumulados.push(total);
  }
  for (let i = 0; i < ROTA_DA_IDA.length; i++) {
    const d = Math.hypot(ROTA_DA_IDA[i][0] - p[0], ROTA_DA_IDA[i][1] - p[1]);
    if (d < menor) {
      menor = d;
      acumulado = acumulados[i];
      melhor = acumulado / total;
    }
  }
  return melhor;
}

const caminho = (pontos: PontoDoMapa[]) => pontos.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

/** O vértice do traçado mais perto de um ponto do mapa. */
export function verticeDaRota(p: PontoDoMapa): number {
  let melhor = 0;
  let menor = Infinity;
  for (let i = 0; i < ROTA_DA_IDA.length; i++) {
    const d = Math.hypot(ROTA_DA_IDA[i][0] - p[0], ROTA_DA_IDA[i][1] - p[1]);
    if (d < menor) {
      menor = d;
      melhor = i;
    }
  }
  return melhor;
}

/** Como a rota aparece: inteira (sem ônibus), toda percorrida (chegou), ou cortada onde o ônibus está,
 *  com o trecho até a próxima parada aceso quando a posição é ao vivo. */
export type RotaNoMapa = 'inteira' | 'percorrida' | { corte: PontoDoMapa; aceso?: PontoDoMapa | null };

export interface MapaProps {
  /** a câmera: o deslocamento do desenho, em pontos, e a escala (1, ou 0,5 na linha inteira) */
  camera: { x: number; y: number; escala?: number };
  /** quanto a janela desce sobre o desenho (a linha inteira é vista 30 pontos abaixo) */
  desceAJanela?: number;
  rota: RotaNoMapa;
  /** a linha inteira na tela, a 50%: o desenho de longe (menos nomes, em letra maior) e o traço da rota mais grosso, para não sumir */
  afastado?: boolean;
  /** o que vai por cima do desenho, nas coordenadas do mapa: as paradas, o ônibus, o ponto azul */
  children?: ReactNode;
  /** o que fica parado na tela, dentro do desenho: a escala */
  fixos?: ReactNode;
  /** o que vai por cima do mapa, em pontos de tela: os rótulos e o balão */
  porCima?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** a câmera desliza até a nova posição (400 ms, com "seguir ônibus") */
  desliza?: boolean;
  /** arrastar o mapa com o dedo: o quanto andou, em pontos de tela */
  aoArrastar?: (dx: number, dy: number) => void;
  /** pinçar: para afastar (true) ou para aproximar (false) */
  aoPincar?: (afastar: boolean) => void;
}

export function Mapa({ camera, desceAJanela = 0, rota, afastado, children, fixos, porCima, className, style, desliza, aoArrastar, aoPincar }: MapaProps) {
  const escala = camera.escala ?? 1;
  const e = (v: number) => Number((v * (afastado ? 1.8 : 1)).toFixed(1));
  const ultimo = ROTA_DA_IDA.length - 1;
  const iCorte = typeof rota === 'string' ? (rota === 'percorrida' ? ultimo : 0) : verticeDaRota(rota.corte);
  const iAceso = typeof rota !== 'string' && rota.aceso ? verticeDaRota(rota.aceso) : null;
  const percorrido = ROTA_DA_IDA.slice(0, iCorte + 1);
  const aceso = iAceso != null ? ROTA_DA_IDA.slice(iCorte, iAceso + 1) : [];
  const resto = ROTA_DA_IDA.slice(iAceso ?? iCorte);
  const dedos = useRef(new Map<number, { x: number; y: number }>());
  const afastamento = useRef<number | null>(null);
  const partida = useRef<{ x: number; y: number; arrastando: boolean } | null>(null);
  // com o dedo no mapa, ele anda junto do dedo, sem deslizar; o deslize é só da câmera que vai sozinha a um lugar
  const [arrastando, mudarArrastando] = useState(false);
  const comDeslize = !!desliza && !arrastando;
  const escalaDaTela = (el: Element) => el.getBoundingClientRect().width / 390 || 1;

  const pega = (ev: React.PointerEvent) => {
    if (!aoArrastar && !aoPincar) return;
    // o toque só vira arrasto depois de andar: até lá, é o toque de quem está embaixo (uma parada, o ônibus)
    dedos.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    partida.current = { x: ev.clientX, y: ev.clientY, arrastando: false };
    afastamento.current = null;
  };
  const move = (ev: React.PointerEvent) => {
    const antes = dedos.current.get(ev.pointerId);
    if (!antes) return;
    const k = escalaDaTela(ev.currentTarget as Element);
    if (partida.current && !partida.current.arrastando) {
      if (Math.hypot(ev.clientX - partida.current.x, ev.clientY - partida.current.y) < 6) return;
      partida.current.arrastando = true;
      mudarArrastando(true);
      (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
    }
    if (dedos.current.size === 1) aoArrastar?.((ev.clientX - antes.x) / k, (ev.clientY - antes.y) / k);
    dedos.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (dedos.current.size === 2) {
      const [a, b] = [...dedos.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (afastamento.current == null) afastamento.current = d;
      else if (Math.abs(d - afastamento.current) > 40 * k) {
        aoPincar?.(d < afastamento.current);
        afastamento.current = d;
      }
    }
  };
  const solta = (ev: React.PointerEvent) => {
    dedos.current.delete(ev.pointerId);
    afastamento.current = null;
    partida.current = null;
    mudarArrastando(false);
  };

  return (
    <div
      className={clsx('map', comDeslize && 'desliza', className)}
      style={style}
      onPointerDown={pega}
      onPointerMove={move}
      onPointerUp={solta}
      onPointerCancel={solta}
      onWheel={aoPincar ? (ev) => Math.abs(ev.deltaY) > 4 && aoPincar(ev.deltaY > 0) : undefined}
    >
      <svg className="bg" width="390" height="844" viewBox={`0 ${desceAJanela} 390 844`} role="group" aria-label="Mapa da viagem">
        <rect y={desceAJanela} width="390" height="844" fill="var(--mapa-terreno)" />
        <g className={clsx('mapa-camada', comDeslize && 'desliza')} style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${escala})` }}>
          <g aria-hidden="true" dangerouslySetInnerHTML={{ __html: afastado ? GEOGRAFIA_AFASTADA : GEOGRAFIA }} />
          {/* a rota: a borda escura por baixo, o trecho percorrido a 35%, o trecho até a próxima parada aceso, e o que falta */}
          <path d={caminho(ROTA_DA_IDA)} fill="none" opacity=".8" stroke="var(--mapa-terreno)" strokeLinecap="round" strokeWidth={e(10)} />
          {percorrido.length > 1 && <path d={caminho(percorrido)} fill="none" opacity=".35" stroke="var(--rota-ida)" strokeLinecap="round" strokeWidth={e(3.5)} />}
          {aceso.length > 1 && (
            <>
              <path d={caminho(aceso)} fill="none" opacity=".22" stroke="var(--rota-ida)" strokeLinecap="round" strokeWidth={e(12)} />
              <path d={caminho(aceso)} fill="none" stroke="var(--rota-ida)" strokeLinecap="round" strokeWidth={e(5.5)} />
            </>
          )}
          {resto.length > 1 && <path d={caminho(resto)} fill="none" stroke="var(--rota-ida)" strokeLinecap="round" strokeWidth={e(4.5)} />}
          {children}
        </g>
        {fixos}
      </svg>
      {porCima}
    </div>
  );
}

export { MAPA };
