// A prova de tamanhos da marca: o pictograma dentro do quadro de vidro em 29, 40, 60, 88 e 180, nos dois temas,
// sobre o fundo de luz, com as duas cores de sempre e com as cores invertidas. Serve para ver em que tamanho a
// maleta e os recortes deixam de ler. Abre em ?vitrine=marca.
import type { CSSProperties } from 'react';
import { Pictograma } from '@/ds/cabecalho/Cabecalho';
import type { Tema } from '@/estado/armazem';
import './vitrine.css';

const TAMANHOS = [29, 40, 60, 88, 180];

function Linha({ tema, invertida }: { tema: Tema; invertida?: boolean }) {
  return (
    <div className="ph quadro prova-da-marca" data-tema={tema} data-conteudo="vidro" data-prova={`${tema}${invertida ? '-invertida' : ''}`}>
      <div className="ambiente" aria-hidden="true" />
      <p className="t13 nome-da-prova">
        {tema}
        {invertida ? ' · cores invertidas' : ''}
      </p>
      <div className="fila-da-prova">
        {TAMANHOS.map((t) => (
          <figure key={t} className="lock da-marca" data-cor={invertida ? 'invertida' : undefined} style={{ '--pictograma': `${Math.round(t * 0.93 * 10) / 10}px` } as CSSProperties}>
            <span className="luz-da-marca" aria-hidden="true" style={{ width: t * 1.8, height: t * 1.8, left: `calc(50% - ${t * 0.9 + t * 0.23}px)`, top: -(t * 0.4 + t * 0.23), filter: `blur(${Math.max(8, t * 0.4)}px)` }} />
            <span className="tile-marca" style={{ width: t, height: t, borderRadius: (t * 20) / 88 }}>
              <Pictograma />
            </span>
            <figcaption className="t13">{t}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function VitrineDaMarca() {
  return (
    <div className="vitrine vitrine-da-marca" data-vitrine="marca">
      <h1>A marca, por tamanho</h1>
      <p>O pictograma dentro do quadro de vidro, em 29, 40, 60, 88 e 180, nos dois temas. Em cima, a figura na tinta e o ônibus na cor de ação; embaixo, as duas cores trocadas.</p>
      <Linha tema="escuro" />
      <Linha tema="escuro" invertida />
      <Linha tema="claro" />
      <Linha tema="claro" invertida />
    </div>
  );
}
