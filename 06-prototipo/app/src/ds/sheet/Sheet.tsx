// O sheet (F02): preso embaixo, raio 16 em cima, com a alça e o véu atrás.
// Abre dentro da tela do aparelho. Fecha no botão de desistir, tocando no véu, no Esc ou arrastando para baixo.
import { useEffect, useId, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { PorCima, usarPorCima } from '@/ds/tela/PorCima';
import { GlassSheet, GlassSheetContent, GlassSheetTitle } from '@/components/glassyui/glass-sheet';
import { usarEstado } from '@/estado/armazem';
import { Material } from '@/ds/vidro/Material';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './sheet.css';

export interface SheetProps {
  titulo: ReactNode;
  aoFechar?: () => void;
  children: ReactNode;
}

export function Sheet({ titulo, aoFechar, children }: SheetProps) {
  const parado = usarEstado((e) => !!e.parado);
  const deVidro = usarVidro('sheet');
  const idDoTitulo = useId();
  const lugar = usarPorCima();
  const ref = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ y0: number; dy: number } | null>(null);

  // o foco fica preso dentro do sheet, o Esc fecha, e o foco volta para quem abriu
  useEffect(() => {
    if (parado) return;
    const quemAbriu = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.focus({ preventScroll: true });
    const tecla = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.stopPropagation();
        aoFechar?.();
      }
      if (ev.key === 'Tab' && el) {
        const focaveis = [...el.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, textarea, [tabindex]:not([tabindex="-1"])')];
        if (!focaveis.length) return ev.preventDefault();
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (ev.shiftKey && (document.activeElement === primeiro || document.activeElement === el)) {
          ev.preventDefault();
          ultimo.focus();
        } else if (!ev.shiftKey && document.activeElement === ultimo) {
          ev.preventDefault();
          primeiro.focus();
        }
      }
    };
    document.addEventListener('keydown', tecla, true);
    return () => {
      document.removeEventListener('keydown', tecla, true);
      quemAbriu?.focus?.({ preventScroll: true });
    };
  }, [parado, aoFechar]);

  // arrastar pela alça para baixo fecha
  const pega = (ev: React.PointerEvent) => {
    if (!aoFechar) return;
    arrasto.current = { y0: ev.clientY, dy: 0 };
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
  };
  const move = (ev: React.PointerEvent) => {
    if (!arrasto.current || !ref.current) return;
    arrasto.current.dy = Math.max(0, ev.clientY - arrasto.current.y0);
    ref.current.style.transform = `translateY(${arrasto.current.dy}px)`;
    ref.current.style.transition = 'none';
  };
  const solta = () => {
    if (!arrasto.current || !ref.current) return;
    const { dy } = arrasto.current;
    arrasto.current = null;
    ref.current.style.transition = '';
    ref.current.style.transform = '';
    if (dy > 80) aoFechar?.();
  };

  // de vidro, é a sheet da biblioteca: flutua solta das bordas, com o canto do aparelho, a lente na borda e a alça
  // com mola. Abre dentro da tela do aparelho, e o palco continua tocável em volta
  if (deVidro) {
    return (
      <>
        <PorCima>
          <div className={clsx('scrim', 'leve', !parado && 'entra')} onClick={aoFechar} data-veu />
        </PorCima>
        <GlassSheet open modal={false} onOpenChange={(aberta) => !aberta && aoFechar?.()}>
          <GlassSheetContent
            panelRef={ref}
            side="bottom"
            container={lugar}
            closeLabel="Fechar"
            className="folha-de-vidro"
            data-peca-de-vidro="sheet"
            data-material="vidro"
            aria-describedby={undefined}
            onInteractOutside={(ev) => ev.preventDefault()}
            onOpenAutoFocus={(ev) => ev.preventDefault()}
            onCloseAutoFocus={(ev) => ev.preventDefault()}
          >
            <GlassSheetTitle asChild>
              <h3 id={idDoTitulo}>{titulo}</h3>
            </GlassSheetTitle>
            {children}
          </GlassSheetContent>
        </GlassSheet>
      </>
    );
  }

  return (
    <PorCima>
      {/* de vidro, o véu fica mais leve, para a tela de trás aparecer desfocada */}
      <div className={clsx('scrim', deVidro && 'leve', !parado && 'entra')} onClick={aoFechar} data-veu />
      <Material ref={ref} peca="sheet" tamanho="grande" lente={false} className={clsx('sheet', !parado && 'entra')} role="dialog" aria-modal="true" aria-labelledby={idDoTitulo} tabIndex={-1}>
        <div className="hd" onPointerDown={pega} onPointerMove={move} onPointerUp={solta} onPointerCancel={solta} />
        <h3 id={idDoTitulo}>{titulo}</h3>
        {children}
      </Material>
    </PorCima>
  );
}
