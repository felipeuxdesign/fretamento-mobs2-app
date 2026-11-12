// O quadro da vitrine: um pedaço da tela do aparelho, num tema, onde uma peça é mostrada sozinha.
import { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { LugarDoPorCima } from '@/ds/tela/PorCima';
import type { Tema } from '@/estado/armazem';
import { usarVidro } from '@/ds/vidro/usarVidro';

export function Quadro({ tema, altura, fundo, children, className, deVidro }: { tema: Tema; altura?: number; fundo?: ReactNode; children: ReactNode; className?: string; deVidro?: boolean }) {
  const [porCima, setPorCima] = useState<HTMLElement | null>(null);
  return (
    <div className={clsx('ph', 'quadro', className)} data-tema={tema} data-quadro data-conteudo={deVidro ? 'vidro' : undefined} style={{ height: altura }}>
      {deVidro && <div className="ambiente" aria-hidden="true" />}
      {fundo}
      <LugarDoPorCima.Provider value={porCima}>
        {children}
        <div className="por-cima" ref={setPorCima} />
      </LugarDoPorCima.Provider>
    </div>
  );
}

/** Uma peça na vitrine: o nome, a regra em uma linha, e a peça nos dois temas, lado a lado. */
export function Peca({ nome, regra, altura, children, soltos }: { nome: string; regra?: string; altura?: number; children: ReactNode; soltos?: boolean }) {
  // com o vidro ligado, o conteúdo é de vidro e mora sobre o fundo de luz, como na tela; com ?vidro=0, tudo sólido
  const deVidro = usarVidro('conteudo');
  return (
    <section className="peca" data-peca={nome}>
      <h3>{nome}</h3>
      {regra && <p>{regra}</p>}
      <div className="lado-a-lado">
        {(['escuro', 'claro'] as const).map((tema) => (
          <Quadro key={tema} tema={tema} altura={altura} className={soltos ? 'soltos' : undefined} deVidro={deVidro}>
            {children}
          </Quadro>
        ))}
      </div>
    </section>
  );
}

export function Folha({ titulo, regra, children }: { titulo: string; regra: string; children: ReactNode }) {
  return (
    <section className="folha">
      <header>
        <h2>{titulo}</h2>
        <p>{regra}</p>
      </header>
      <div className="grade">{children}</div>
    </section>
  );
}
