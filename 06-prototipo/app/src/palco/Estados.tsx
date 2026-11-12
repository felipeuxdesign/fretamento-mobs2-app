// A lista "Estados desta tela": a tela, os momentos e os estados, em grupos e na ordem da história.
// Tocar num estado para o app nele, montado com o caso, como uma foto. "Voltar ao fluxo" devolve o percurso.
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { palco, type CodigoDaTela } from '@/dados';
import { usarEstado, parar, voltarAoFluxo } from '@/estado/armazem';

export const FRASE_DO_PARADO = 'Um estado é só para ver. Para tocar no app, volte ao fluxo.';
export const DICA_DO_FLUXO = 'no fluxo · toque num estado para ver parado';

export function VoltarAoFluxo() {
  const pede = usarEstado((e) => e.pedeVolta);
  return (
    <>
      <button type="button" className={clsx('pl-back', pede && 'pede')} onClick={voltarAoFluxo}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
        <span>Voltar ao fluxo</span>
      </button>
      <div className={clsx('pl-hint', pede && 'pede')} role="status">
        {FRASE_DO_PARADO}
      </div>
    </>
  );
}

/** As linhas dos estados de uma tela, em grupos. */
export function LinhasDeEstado({ tela, aoEscolher }: { tela: CodigoDaTela; aoEscolher?: () => void }) {
  const parado = usarEstado((e) => e.parado);
  const dados = palco.telas.find((t) => t.codigo === tela)!;
  return (
    <>
      {dados.grupos.map((g, i) => (
        <div key={i} style={{ display: 'contents' }}>
          {'grupo' in g && g.grupo && <div className="pl-gr">{g.grupo as string}</div>}
          {g.itens.map((it) => (
            <button
              key={it.ref}
              type="button"
              className={clsx('pl-st', parado === it.ref && 'on')}
              aria-pressed={parado === it.ref}
              data-ref-do-palco={it.ref}
              title={it.nome}
              onClick={() => {
                parar(it.ref);
                aoEscolher?.();
              }}
            >
              <i />
              <span className="n">{it.ref.slice(4)}</span>
              <span className="t">{it.nome}</span>
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

/** A lista da coluna: só rola quando não cabe; quando rola, rola por dentro e mostra a barra de rolagem. */
export function ListaDeEstados({ tela }: { tela: CodigoDaTela }) {
  const parado = usarEstado((e) => e.parado);
  const ref = useRef<HTMLDivElement>(null);
  const [rola, setRola] = useState<'' | 'rola' | 'rola meio' | 'rola fim'>('');
  const medir = () => {
    const el = ref.current;
    if (!el) return;
    const cabe = el.scrollHeight <= el.clientHeight + 1;
    if (cabe) return setRola('');
    const fim = el.scrollTop >= el.scrollHeight - el.clientHeight - 2;
    setRola(el.scrollTop < 2 ? 'rola' : fim ? 'rola fim' : 'rola meio');
  };
  useEffect(() => {
    medir();
    const el = ref.current;
    if (!el) return;
    const o = new ResizeObserver(medir);
    o.observe(el);
    return () => o.disconnect();
  }, [tela]);
  // a lista rola até o estado escolhido
  useEffect(() => {
    if (!parado) return;
    const el = ref.current;
    const linha = el?.querySelector<HTMLElement>(`[data-ref-do-palco="${parado}"]`);
    if (el && linha) el.scrollTop = Math.max(0, linha.offsetTop - el.clientHeight / 2 + linha.offsetHeight / 2);
    medir();
  }, [parado]);
  return (
    <div ref={ref} className={clsx('pl-ls', rola)} onScroll={medir}>
      <div className="pl-lsi">
        <LinhasDeEstado tela={tela} />
      </div>
    </div>
  );
}
