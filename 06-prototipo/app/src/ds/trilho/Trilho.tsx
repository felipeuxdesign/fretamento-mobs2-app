// O trilho de paradas (F05), com o ônibus cortando o trilho onde está.
// A parada passada vai em tinta-apagada; o seu ponto tem halo; os terminais são cheios; as sem nome vêm agrupadas.
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { ler } from '@/estado/armazem';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { ChipDePapel } from '@/ds/selo/Selo';
import { relativo } from '@/dados';
import './trilho.css';

/** o que é um tempo relativo sob a hora: "18 min", "menos de 2 min", "agora" */
/** o ônibus parado numa parada: "No seu ponto", "Na Av. Norte, 2800", "Na Fábrica – Portaria 2" */
const PARADO_NA_PARADA = /^N[ao]s? /;
const E_RELATIVO = /^(\d+ min|menos de \d+ min|agora)$/;

/** a cor de um trecho do trilho: o que já passou, a ida, a volta, ou nenhum (ponta do trilho) */
export type Trecho = 'passado' | 'ida' | 'volta' | null;

export interface ParadaDoTrilho {
  tipo: 'parada';
  id: string;
  nome: ReactNode;
  /** o glifo do tipo do lugar: ponto, comercio, terminal, fabrica, pessoa (o seu ponto) */
  icone: string;
  /** o seu ponto: halo em vivo */
  minha?: boolean;
  /** terminal e destino: disco cheio */
  cheia?: boolean;
  passada?: boolean;
  /** o ônibus está parado nesta parada: o nó leva o ícone e a cor dele */
  comOnibus?: boolean;
  /** fora da viagem (ponto que não vale mais): contorno e glifo apagados */
  desligada?: boolean;
  /** o nome em peso 600 (o seu ponto) */
  forte?: boolean;
  /** só a hora em tinta-apagada (os horários programados), com o nome normal */
  horaApagada?: boolean;
  papeis?: { texto: string; apagado?: boolean }[];
  apoio?: ReactNode;
  hora?: ReactNode;
  sobAHora?: ReactNode;
  cima: Trecho;
  baixo: Trecho;
}
export interface OnibusNoTrilho {
  tipo: 'onibus';
  texto: ReactNode;
  /** sem sinal: o disco para e apaga */
  apagado?: boolean;
  cima: Trecho;
  baixo: Trecho;
}
export interface GrupoDoTrilho {
  tipo: 'grupo';
  texto: ReactNode;
}
export type LinhaDoTrilho = ParadaDoTrilho | OnibusNoTrilho | GrupoDoTrilho;

const corDoTrecho = (t: Trecho) => (t === 'passado' ? 'passado' : t === 'volta' ? 'volta' : 'ida');

function Trechos({ cima, baixo }: { cima: Trecho; baixo: Trecho }) {
  return (
    <>
      {cima && <span className={clsx('ln', 'de-cima', corDoTrecho(cima))} />}
      {baixo && <span className={clsx('ln', 'de-baixo', corDoTrecho(baixo))} />}
    </>
  );
}

/** O ônibus anda (movimento 2): o disco desliza da posição anterior para a nova, em 900 ms, ease-out cúbico. */
function usarODeslize() {
  const trilho = useRef<HTMLDivElement>(null);
  const antes = useRef<number | null>(null);
  useLayoutEffect(() => {
    const onibus = trilho.current?.querySelector<HTMLElement>('[data-onibus]');
    const agora = onibus ? onibus.offsetTop : null;
    const de = antes.current;
    antes.current = agora;
    if (!onibus || agora == null || de == null || de === agora) return;
    // parado numa referência, o que se vê é o fim do movimento; com a redução de movimento, a troca é instantânea
    if (ler().parado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // desliza o disco e o que ele diz; o trilho já está no lugar novo
    onibus.querySelectorAll<HTMLElement>('.mini, .rb').forEach((el) => el.animate([{ transform: `translateY(${de - agora}px)` }, { transform: 'translateY(0)' }], { duration: 900, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' }));
  });
  return trilho;
}

export function Trilho({ linhas: asLinhas, agora, aoTocarNaParada, tocaveis, tracoDoOnibus = 2.4 }: { linhas: LinhaDoTrilho[]; /** o agora do estado: com ele, todo tempo relativo do trilho é calculado (a hora da parada menos o agora), nunca digitado */ agora?: string; aoTocarNaParada?: (id: string) => void; /** quais paradas abrem alguma coisa ao toque; sem isso, todas */ tocaveis?: (id: string) => boolean; /** o traço do glifo do ônibus: 2,4 no trilho das telas, 2,2 no painel do mapa */ tracoDoOnibus?: number }) {
  const trilho = usarODeslize();
  // com o ônibus parado numa parada, não há nó separado: o ícone dele fica sobre o nó da parada, com "o ônibus está
  // aqui" embaixo do nome. O nó separado só existe quando o ônibus está entre paradas
  const juntas: LinhaDoTrilho[] = [];
  for (let i = 0; i < asLinhas.length; i++) {
    const l = asLinhas[i];
    const seguinte = asLinhas[i + 1];
    if (l.tipo === 'onibus' && !l.apagado && typeof l.texto === 'string' && PARADO_NA_PARADA.test(l.texto) && seguinte?.tipo === 'parada') {
      juntas.push({ ...seguinte, icone: 'onibus', comOnibus: true, apoio: 'o ônibus está aqui', cima: l.cima });
      i++;
    } else juntas.push(l);
  }
  const linhas = agora ? juntas.map((l) => (l.tipo === 'parada' && typeof l.hora === 'string' && /^\d\d:\d\d$/.test(l.hora) && typeof l.sobAHora === 'string' && E_RELATIVO.test(l.sobAHora) ? { ...l, sobAHora: relativo(agora, l.hora) } : l)) : juntas;
  return (
    <div className="trilho" ref={trilho} data-agora={agora}>
      {linhas.map((l, i) => {
        if (l.tipo === 'onibus') {
          return (
            <div key="onibus" className="row bus" data-onibus>
              <span className="rail">
                <Trechos cima={l.cima} baixo={l.baixo} />
                <span className={clsx('mini', 'bus', l.apagado && 'off')}>
                  <Icone nome="onibus" traco={tracoDoOnibus} />
                </span>
              </span>
              <span className="rb">
                <span className={clsx('busl', l.apagado && 'off')}>{l.texto}</span>
              </span>
            </div>
          );
        }
        if (l.tipo === 'grupo') {
          return (
            <div key={`grupo-${i}`} className="row grp">
              <span className="rail">
                <span className="lnd" />
                <span className="mini d10" />
              </span>
              <span className="grpl">{l.texto}</span>
            </div>
          );
        }
        const toca = aoTocarNaParada && (!tocaveis || tocaveis(l.id)) ? () => aoTocarNaParada(l.id) : undefined;
        return (
          <div
            key={l.id}
            className={clsx('row', toca && 'toca')}
            data-onibus={l.comOnibus ? '' : undefined}
            role={toca ? 'button' : undefined}
            tabIndex={toca ? 0 : undefined}
            onClick={toca}
            onKeyDown={toca ? (ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), toca()) : undefined}
          >
            <span className="rail">
              <Trechos cima={l.cima} baixo={l.baixo} />
              <span className={clsx('mini', l.comOnibus ? 'bus' : [l.minha && 'me', l.cheia && 'term'], l.passada && 'pass', l.desligada && 'dis')}>
                <Icone nome={l.icone} traco={2.4} />
              </span>
            </span>
            <span className="rb">
              <span className={clsx('rn', l.passada && 'muted', l.forte && 'b')}>
                <span>{l.nome}</span>
                {l.papeis?.map((p) => (
                  <ChipDePapel key={p.texto} apagado={p.apagado}>
                    {p.texto}
                  </ChipDePapel>
                ))}
              </span>
              {l.apoio && <span className="rs">{l.apoio}</span>}
            </span>
            {l.hora !== undefined && (
              <span className={clsx('rt', (l.passada || l.horaApagada) && 'muted', l.forte && !l.horaApagada && 'b')}>
                {l.hora}
                {l.sobAHora && <small>{l.sobAHora}</small>}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
