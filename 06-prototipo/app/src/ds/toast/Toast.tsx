// O toast (F02): confirmação leve, depois de uma troca, um embarque, um pedido. Some sozinho em 3,2 s.
import { useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { PorCima } from '@/ds/tela/PorCima';
import { Icone } from '@/ds/icone/Icone';
import { usarEstado, temaDe } from '@/estado/armazem';
import { Material } from '@/ds/vidro/Material';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './toast.css';

export const TEMPO_DO_TOAST_MS = 3200;

export function Toast({ children, aoSumir, parado }: { children: ReactNode; aoSumir?: () => void; parado?: boolean }) {
  const deVidro = usarVidro('toast');
  const temaDoApp = usarEstado(temaDe);
  // o tema de onde o toast está montado (a tela do aparelho, ou um quadro da vitrine)
  const [tema, setTema] = useState(temaDoApp);
  useEffect(() => {
    if (parado || !aoSumir) return;
    const t = window.setTimeout(aoSumir, TEMPO_DO_TOAST_MS);
    return () => window.clearTimeout(t);
  }, [parado, aoSumir]);
  return (
    <PorCima>
      <div className="toast-lugar">
        <Material
          peca="toast"
          tamanho="medio"
          lente={false}
          className={clsx('toast', !parado && 'entra')}
          role="status"
          ref={(el: HTMLElement | null) => {
            const t = el?.closest('[data-tema]')?.getAttribute('data-tema');
            if ((t === 'claro' || t === 'escuro') && t !== tema) setTema(t);
          }}
        >
          {/* o fundo é o invertido (tinta); o visto usa o vivo do tema oposto, que é o que passa no contraste ali */}
          {/* no vidro, o toast usa o vidro do tema, e o visto é o vivo do próprio tema */}
          <span data-tema={deVidro ? undefined : tema === 'escuro' ? 'claro' : 'escuro'} className="toast-visto">
            <Icone nome="confirmado" traco={2.4} />
          </span>
          <span>{children}</span>
        </Material>
      </div>
    </PorCima>
  );
}
