// As peças que flutuam sobre o mapa (F05): o grupo de controles, o balão do ônibus e o painel de três alturas.
// São as peças em que o vidro mais aparece: o mapa passa atrás, com a rota e o ônibus.
import { useRef, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { Material } from '@/ds/vidro/Material';
import { GlassPanel } from '@/components/glassyui/glass-panel';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './mapa.css';

export interface ControleDoMapa {
  id: string;
  rotulo: string;
  icone: string;
  ligado?: boolean;
  desligado?: boolean;
  aoTocar?: () => void;
}

/** O grupo de controles do mapa: uma coluna de 48, a 16 da direita, com divisórias fixas. */
export function ControlesDoMapa({ controles, style }: { controles: ControleDoMapa[]; style?: CSSProperties }) {
  return (
    <Material peca="controlesDoMapa" tamanho="pequeno" painel className="mgrp" role="group" aria-label="Controles do mapa" style={style}>
      {controles.map((c, i) => (
        <span key={c.id} className="mg-linha">
          {i > 0 && <i className="mg-div" />}
          <button type="button" className={clsx('mg', c.ligado && 'on', c.desligado && 'dis')} aria-label={c.rotulo} aria-pressed={!!c.ligado} disabled={c.desligado} onClick={c.aoTocar}>
            <Icone nome={c.icone} />
          </button>
        </span>
      ))}
    </Material>
  );
}

/** O balão do ônibus: o prefixo e a placa, e a idade do dado. Preso acima do disco do ônibus. */
export function BalaoDoOnibus({ titulo, apoio, style }: { titulo: ReactNode; apoio: ReactNode; style?: CSSProperties }) {
  return (
    <Material peca="balaoDoOnibus" tamanho="pequeno" painel className="callout" role="status" style={style}>
      <b>{titulo}</b>
      <small>{apoio}</small>
    </Material>
  );
}

/** o painel de vidro para a 21 do fundo: os 8 do indicador de início, os 5 dele e mais 8 de respiro */
const FOLGA_DO_PAINEL_SOLTO = 21;
/** quanto o dedo precisa andar para o painel trocar de altura */
const PASSO_DO_ARRASTO = 24;

export type AlturaDoPainel = 'recolhido' | 'meio' | 'inteiro';

export interface PainelDoMapaProps {
  /** a altura em px de cada posição: recolhido (o herói compacto), no meio (os próximos pontos) e inteiro (todas as paradas) */
  alturas: Record<AlturaDoPainel, number>;
  altura: AlturaDoPainel;
  aoMudar?: (altura: AlturaDoPainel) => void;
  /** o nome da alça para o leitor de tela, quando ela faz outra coisa (fechar o ponto, aproximar de volta) */
  rotuloDaAlca?: string;
  /** o toque na alça, quando ela faz outra coisa que não trocar de altura */
  aoTocarNaAlca?: () => void;
  /** puxar o painel para baixo faz o mesmo que o toque na alça (fechar o detalhe de uma parada) */
  fechaAoPuxar?: boolean;
  children: ReactNode;
}

/** O painel do mapa: preso embaixo, com alça e três alturas. Não fecha. Arrasta com o dedo, pelo painel inteiro, e vai para a altura do lado para onde o dedo foi. */
export function PainelDoMapa({ alturas, altura, aoMudar, rotuloDaAlca, aoTocarNaAlca, fechaAoPuxar, children }: PainelDoMapaProps) {
  const ref = useRef<HTMLElement>(null);
  const arrasto = useRef<{ y0: number; h0: number; h: number; andou: number; naAlca: boolean } | null>(null);
  const ordem: AlturaDoPainel[] = ['recolhido', 'meio', 'inteiro'];
  const deVidro = usarVidro('painelDoMapa');
  // de vidro, o painel flutua acima do indicador de início: o topo dele fica onde sempre esteve, e a altura desconta essa folga
  const folga = deVidro ? FOLGA_DO_PAINEL_SOLTO : 0;

  const proxima = () => (aoTocarNaAlca ? aoTocarNaAlca() : aoMudar?.(ordem[(ordem.indexOf(altura) + 1) % ordem.length]));
  // o painel inteiro arrasta, não só a alça. Um toque num botão de dentro é do botão; um toque na alça, sem arrastar,
  // sobe o painel para a próxima altura
  const pega = (ev: React.PointerEvent) => {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    const alvo = ev.target as HTMLElement;
    const naAlca = !!alvo.closest('[data-alca]');
    if (!naAlca && alvo.closest('button, a, input, [role="button"], [role="radio"]')) return;
    arrasto.current = { y0: ev.clientY, h0: alturas[altura], h: alturas[altura], andou: 0, naAlca };
    // prende o dedo já no toque: a alça fica na borda de cima, e o primeiro movimento para cima sairia do painel
    ref.current?.setPointerCapture(ev.pointerId);
  };
  const move = (ev: React.PointerEvent) => {
    const a = arrasto.current;
    if (!a || !ref.current) return;
    a.andou = Math.max(a.andou, Math.abs(ev.clientY - a.y0));
    if (a.andou < 6) return;
    const escala = ref.current.getBoundingClientRect().width / ref.current.offsetWidth || 1;
    const pedido = a.h0 + (a.y0 - ev.clientY) / escala;
    a.h = pedido;
    if (aoTocarNaAlca) return;
    const h = Math.max(alturas.recolhido - 12, Math.min(alturas.inteiro + 12, pedido));
    a.h = h;
    ref.current.style.height = `${h - folga}px`;
    ref.current.style.transition = 'none';
  };
  const solta = () => {
    const a = arrasto.current;
    if (!a || !ref.current) return;
    arrasto.current = null;
    if (a.andou < 6) {
      if (a.naAlca) proxima();
      return;
    }
    const andou = a.h - a.h0;
    // com o detalhe de uma parada aberto, puxar para baixo fecha o detalhe
    if (aoTocarNaAlca) {
      if (fechaAoPuxar && andou <= -PASSO_DO_ARRASTO) aoTocarNaAlca();
      return;
    }
    ref.current.style.transition = '';
    // assenta em 250 ms. Quem manda é a direção do dedo: passou de 24, o painel vai para a altura daquele lado
    // que ficar mais perto de onde o dedo soltou; menos que isso, volta para onde estava
    let destino = altura;
    if (Math.abs(andou) >= PASSO_DO_ARRASTO) {
      const doLado = ordem.filter((b) => (andou > 0 ? alturas[b] > a.h0 + 1 : alturas[b] < a.h0 - 1));
      if (doLado.length) destino = doLado.reduce((x, b) => (Math.abs(alturas[b] - a.h) < Math.abs(alturas[x] - a.h) ? b : x));
    }
    ref.current.style.height = `${alturas[destino] - folga}px`;
    if (destino !== altura) aoMudar?.(destino);
  };
  const dedo = { onPointerDown: pega, onPointerMove: move, onPointerUp: solta, onPointerCancel: solta };

  const alca = {
    role: 'button',
    tabIndex: 0,
    'data-alca': '',
    'aria-label': rotuloDaAlca ?? (altura === 'inteiro' ? 'Recolher painel' : altura === 'meio' ? 'Expandir por completo' : 'Expandir painel'),
    onKeyDown: (ev: React.KeyboardEvent) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), proxima()),
  } as const;

  // de vidro, o painel é a folha da biblioteca (a mesma placa de vidro do sheet, com a alça dela), solta das bordas.
  // O que é nosso continua: as três alturas, e ele não fecha
  // Sem a lente da borda: numa placa desse tamanho, com o mapa andando por baixo e a altura mudando no arrasto,
  // a lente era redesenhada a cada quadro (33 a 50 ms por quadro com a CPU em 4×)
  if (deVidro)
    return (
      <GlassPanel
        ref={ref as React.Ref<HTMLDivElement>}
        data-side="bottom"
        elevation="raised"
        lens={false}
        preset="prominent"
        refraction="none"
        variant="panel"
        className="lg-sheet-content msheet flutua"
        data-peca-de-vidro="painelDoMapa"
        data-material="vidro"
        style={{ height: alturas[altura] - folga }}
        {...dedo}
      >
        <div className="lg-sheet-handle" {...alca} />
        {children}
      </GlassPanel>
    );

  return (
    <Material ref={ref} peca="painelDoMapa" tamanho="grande" lente={false} className="msheet" style={{ height: alturas[altura] }} {...dedo}>
      <div className="hd-toque" {...alca}>
        <div className="hd" />
      </div>
      {children}
    </Material>
  );
}
