// O que o celular desenha por cima do app: o alerta de permissão e o pedido do Face ID.
// São fotos do sistema: fonte e cores do sistema (branco e sistema-azul), nunca as do app.
import { useEffect, useId, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { PorCima } from '@/ds/tela/PorCima';
import { usarEstado } from '@/estado/armazem';
import { Material } from '@/ds/vidro/Material';
import './desenhado.css';

export interface BotaoDoSistema {
  rotulo: string;
  /** a escolha em destaque, em peso 600 */
  forte?: boolean;
  aoTocar?: () => void;
}

function usarFocoPreso(ativo: boolean) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ativo) return;
    const antes = document.activeElement as HTMLElement | null;
    // o foco vai para a folha, não para um botão: o anel de foco só aparece quando a pessoa anda no teclado
    ref.current?.focus({ preventScroll: true });
    const tecla = (ev: KeyboardEvent) => {
      if (ev.key !== 'Tab' || !ref.current) return;
      const b = [...ref.current.querySelectorAll<HTMLElement>('button')];
      const i = b.indexOf(document.activeElement as HTMLElement);
      ev.preventDefault();
      b[(i + (ev.shiftKey ? b.length - 1 : 1)) % b.length]?.focus();
    };
    document.addEventListener('keydown', tecla, true);
    return () => {
      document.removeEventListener('keydown', tecla, true);
      antes?.focus?.({ preventScroll: true });
    };
  }, [ativo]);
  return ref;
}

function Confirma({ aoConfirmar }: { aoConfirmar?: () => void }) {
  useEffect(() => {
    if (!aoConfirmar) return;
    const t = window.setTimeout(aoConfirmar, BIOMETRIA_CONFIRMA_EM_MS);
    return () => window.clearTimeout(t);
  }, [aoConfirmar]);
  return null;
}

/** O alerta do sistema: 270 de largura, raio 14, no meio da tela. */
export function AlertaDoSistema({ titulo, children, botoes, lado }: { titulo: ReactNode; children: ReactNode; botoes: BotaoDoSistema[]; lado?: boolean }) {
  const parado = usarEstado((e) => !!e.parado);
  const id = useId();
  const ref = usarFocoPreso(!parado);
  return (
    <PorCima>
      <div className={clsx('scrim', !parado && 'entra')} />
      <Material ref={ref} peca="sistema" tamanho="grande" lente={false} className={clsx('sys', !parado && 'entra')} role="alertdialog" aria-modal="true" aria-labelledby={id} tabIndex={-1} data-do-sistema>
        <div className="b">
          <h3 id={id}>{titulo}</h3>
          <p>{children}</p>
        </div>
        <div className={clsx('a', lado && 'h')}>
          {botoes.map((b) => (
            <button key={b.rotulo} type="button" className={b.forte ? 's' : undefined} onClick={b.aoTocar}>
              {b.rotulo}
            </button>
          ))}
        </div>
      </Material>
    </PorCima>
  );
}

/** No protótipo a biometria sempre confirma: tocar no desenho do Face ID confirma, e ela também confirma sozinha logo
    depois. No Bloqueado ela espera o toque. */
export const BIOMETRIA_CONFIRMA_EM_MS = 1400;

/** O desenho do Face ID: os quatro cantos e o rosto. É do sistema, como o teclado e o alerta, e por isso mora aqui. */
function GlifoDoFaceID() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15V11a7 7 0 0 1 7-7h4" />
      <path d="M33 4h4a7 7 0 0 1 7 7v4" />
      <path d="M44 33v4a7 7 0 0 1-7 7h-4" />
      <path d="M15 44h-4a7 7 0 0 1-7-7v-4" />
      <path d="M16.5 18v4" />
      <path d="M31.5 18v4" />
      <path d="M24.5 18v7.5a2 2 0 0 1-2 2h-1" />
      <path d="M17 32.5c2 2.2 4.3 3.3 7 3.3s5-1.1 7-3.3" />
    </svg>
  );
}

/** O pedido do Face ID: o celular do protótipo é um iPhone, e o pedido de biometria dele é o do rosto. É o alerta do
    sistema, no meio da tela, com o desenho do Face ID, o motivo que o app deu e as saídas. No protótipo ele sempre
    confirma: tocar no desenho confirma, e ele também confirma sozinho logo depois, a não ser que espere o toque. */
export function PedidoDoFaceID({ children, botoes, comVeu = true, aoConfirmar, esperaOToque }: { children: ReactNode; botoes: BotaoDoSistema[]; comVeu?: boolean; aoConfirmar?: () => void; /** não confirma sozinho: fica na tela até a pessoa tocar */ esperaOToque?: boolean }) {
  const parado = usarEstado((e) => !!e.parado);
  const id = useId();
  const ref = usarFocoPreso(!parado);
  return (
    <PorCima>
      <Confirma aoConfirmar={esperaOToque ? undefined : aoConfirmar} />
      {comVeu && <div className={clsx('scrim', !parado && 'entra')} />}
      <Material ref={ref} peca="sistema" tamanho="grande" lente={false} className={clsx('sys', 'face-id', !parado && 'entra')} role="alertdialog" aria-modal="true" aria-labelledby={id} tabIndex={-1} data-do-sistema>
        <div className="b" onClick={aoConfirmar}>
          <GlifoDoFaceID />
          <h3 id={id}>Face ID</h3>
          <p>{children}</p>
        </div>
        <div className="a">
          {botoes.map((b) => (
            <button key={b.rotulo} type="button" className={b.forte ? 's' : undefined} onClick={b.aoTocar}>
              {b.rotulo}
            </button>
          ))}
        </div>
      </Material>
    </PorCima>
  );
}
