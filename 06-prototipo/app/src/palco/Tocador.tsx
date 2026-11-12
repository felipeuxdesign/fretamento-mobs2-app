// O tocador do dia, como o de um vídeo: voltar um passo, play ou pausa, avançar um passo e a velocidade.
// Em cima, a trilha dos cinco passos, com o passo de agora enchendo no tempo dele, e a frase do que vem.
// Só aparece nas telas em que o dia muda o que se vê: o Início, as Paradas e o Mapa.
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { usarEstado, telaVisivel } from '@/estado/armazem';
import { PASSOS, CHEGOU, NO_PONTO, duracaoDoPasso, tocarOuPausar, avancar, voltarUmPasso, trocarVelocidade, fimDoPasso, marcarBatida } from '@/estado/dia';

/** O motor do dia: conta o tempo do passo enquanto o dia anda, enche a trilha e chama o próximo passo. */
export function MotorDoDia() {
  const dia = usarEstado((e) => e.dia);
  const andando = usarEstado((e) => e.dia.tocando && !e.parado);
  const decorrido = useRef(0);
  const voltaDeAntes = useRef(dia.volta);
  if (voltaDeAntes.current !== dia.volta) {
    // um passo novo começa do zero
    voltaDeAntes.current = dia.volta;
    decorrido.current = 0;
  }
  useEffect(() => {
    const total = duracaoDoPasso(dia);
    const pinta = () => document.querySelectorAll<HTMLElement>('[data-enche-o-passo]').forEach((b) => (b.style.width = total ? `${Math.min(100, (100 * decorrido.current) / total)}%` : '100%'));
    pinta();
    if (!andando || total == null) return;
    let quadro = 0;
    let antes = performance.now();
    const anda = (agora: number) => {
      decorrido.current += agora - antes;
      antes = agora;
      pinta();
      // nas Paradas, o em rota tem três batidas dentro do mesmo tempo
      if (dia.passo === 0) marcarBatida(decorrido.current < total / 3 ? 0 : decorrido.current < (2 * total) / 3 ? 1 : 2);
      if (decorrido.current >= total) return fimDoPasso();
      quadro = requestAnimationFrame(anda);
    };
    quadro = requestAnimationFrame(anda);
    return () => cancelAnimationFrame(quadro);
  }, [andando, dia.passo, dia.velocidade, dia.volta]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

/** A dica do dia, embaixo da frase do que vem: diz se o dia anda sozinho e o que o faz parar ou seguir. */
export const DICAS_DO_DIA = {
  andando: 'o dia anda sozinho · pause no botão ou no espaço',
  andandoNoToque: 'o dia anda sozinho · pause no botão',
  pausado: 'o dia está pausado · o play continua',
  noPontoDoInicio: 'o dia espera · toque no Embarquei, no app',
  noPontoDeFora: 'o dia espera · o avançar também embarca',
  chegou: 'o dia acabou · o play recomeça',
};

export function Tocador({ semTeclado = false }: { semTeclado?: boolean }) {
  const dia = usarEstado((e) => e.dia);
  const parado = usarEstado((e) => !!e.parado);
  const tela = usarEstado(telaVisivel);
  const passo = PASSOS[dia.passo];
  const noPonto = dia.passo === NO_PONTO;
  const chegou = dia.passo === CHEGOU;
  // no ponto, o dia espera o embarque. No Início, quem embarca é o toque no Embarquei, no app;
  // nas Paradas e no Mapa o Embarquei não existe, então o avançar acende e faz esse papel
  const avancarPede = noPonto && tela !== 'T05' && !parado;
  // fora do Início, a frase do no ponto diz onde o Embarquei está
  const deFora = (passo as { aSeguirForaDoInicio?: string }).aSeguirForaDoInicio;
  const frase = tela !== 'T05' && deFora ? deFora : passo.aSeguir;
  const dica = chegou
    ? DICAS_DO_DIA.chegou
    : noPonto
      ? tela === 'T05'
        ? DICAS_DO_DIA.noPontoDoInicio
        : DICAS_DO_DIA.noPontoDeFora
      : !dia.tocando
        ? DICAS_DO_DIA.pausado
        : semTeclado
          ? DICAS_DO_DIA.andandoNoToque
          : DICAS_DO_DIA.andando;
  return (
    <div className={clsx('pl-dia', parado && 'off')} role="group" aria-label="O dia">
      <div className="pl-dh">
        <span className="pl-eb">O dia</span>
        <span>
          {passo.nome} · {dia.passo + 1} de {PASSOS.length}
        </span>
      </div>
      <div className="pl-trk" aria-hidden="true">
        {PASSOS.map((p, i) => (
          <i key={p.nome} className={i < dia.passo ? 'ok' : i === dia.passo ? 'on' : ''}>
            {i === dia.passo && <b data-enche-o-passo style={{ width: chegou || noPonto ? '100%' : '0%' }} />}
          </i>
        ))}
      </div>
      <div className={clsx('pl-px', noPonto && 'esp')} aria-live="polite">
        {frase}
      </div>
      <div className="pl-dd">{dica}</div>
      <div className="pl-ctl">
        <button type="button" className={clsx('pl-sk', dia.passo === 0 && 'off')} aria-label="Voltar um passo" disabled={parado || dia.passo === 0} onClick={voltarUmPasso}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" x2="5" y1="19" y2="5" />
          </svg>
        </button>
        <button type="button" className={clsx('pl-pp', chegou && 'pede')} aria-label={chegou ? 'Recomeçar o dia' : dia.tocando ? 'Pausar o dia' : dia.volta === 0 ? 'Tocar o dia' : 'Continuar o dia'} disabled={parado} onClick={tocarOuPausar}>
          {chegou ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          ) : dia.tocando ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.6-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6Z" />
            </svg>
          )}
        </button>
        <button type="button" className={clsx('pl-sk', chegou && 'off', avancarPede && 'pede')} aria-label="Avançar um passo" disabled={parado || chegou} onClick={avancar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" x2="19" y1="5" y2="19" />
          </svg>
        </button>
        <button type="button" className="pl-vel" aria-label={`Velocidade do dia: ${dia.velocidade}`} disabled={parado} onClick={trocarVelocidade}>
          {dia.velocidade}
        </button>
      </div>
    </div>
  );
}
