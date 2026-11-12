// O dia: um só para o Início, as Paradas e o Mapa. Cinco passos: em rota, chegando, no ponto, a bordo e chegou.
// O ônibus anda pelo tocador do palco. No ponto, o dia para e espera o embarque; no chegou, o play recomeça.
// Os passos, os tempos e os quadros de cada tela vêm de 06-prototipo/palco-estados.json.
import { mock, palco, somar, falta, type CodigoDaTela } from '@/dados';
import { ler, mudar, temTocador, type Dia, type Velocidade } from './armazem';
import { haptico } from '@/sistema/haptico';

export const PASSOS = palco.dia.passos;
export const VELOCIDADES = palco.dia.velocidades as Velocidade[];
const FATOR: Record<Velocidade, number> = { '0,5×': 0.5, '1×': 1, '2×': 2 };
export const NO_PONTO = PASSOS.findIndex((p) => p.espera);
export const CHEGOU = PASSOS.length - 1;

/** Quanto dura o passo de agora, em ms, na velocidade de agora. Nada, quando o passo espera (no ponto) ou é o fim. */
export function duracaoDoPasso(dia: Dia): number | null {
  const seg = PASSOS[dia.passo].duracaoSeg;
  return seg == null ? null : (seg * 1000) / FATOR[dia.velocidade];
}

/** A referência que a tela mostra neste passo do dia. Nas Paradas, o em rota tem três batidas. */
export function quadroDoDia(tela: CodigoDaTela, dia: Dia): string {
  const passo = PASSOS[dia.passo];
  const batidas = (passo as { batidasNasParadas?: string[] }).batidasNasParadas;
  if (tela === 'T06' && batidas) return batidas[Math.min(dia.batida, batidas.length - 1)];
  return (passo.quadros as Record<string, string>)[tela];
}

const comPasso = (dia: Dia, passo: number, tocando = dia.tocando): Dia => {
  // o háptico dos dois momentos do dia: um toque no chegando, dois no ponto
  if (passo > dia.passo && PASSOS[passo].nome === 'chegando') haptico('chegando');
  if (passo > dia.passo && passo === NO_PONTO) haptico('no-ponto');
  return { ...dia, passo, batida: 0, tocando, volta: dia.volta + 1 };
};

export function tocarOuPausar(): void {
  mudar((e) => {
    if (e.parado || !temTocador(e.tela)) return {};
    // no chegou, o play vira o recomeçar: o dia volta às 06:24, e a troca de ponto, que valia só para a ida de hoje, acaba
    if (e.dia.passo === CHEGOU) return { dia: comPasso(e.dia, 0, true), cenas: e.cenas.T05 ? { ...e.cenas, T05: { ...(e.cenas.T05 as object), troca: false, desde: undefined } } : e.cenas };
    return { dia: { ...e.dia, tocando: !e.dia.tocando } };
  });
}
export function avancar(): void {
  mudar((e) => (e.parado || !temTocador(e.tela) || e.dia.passo >= CHEGOU ? {} : { dia: comPasso(e.dia, e.dia.passo + 1) }));
}
export function voltarUmPasso(): void {
  mudar((e) => (e.parado || !temTocador(e.tela) || e.dia.passo <= 0 ? {} : { dia: comPasso(e.dia, e.dia.passo - 1) }));
}
export function trocarVelocidade(): void {
  mudar((e) => ({ dia: { ...e.dia, velocidade: VELOCIDADES[(VELOCIDADES.indexOf(e.dia.velocidade) + 1) % VELOCIDADES.length] } }));
}
/** O tempo do passo acabou: o dia segue para o próximo. No chegou, para. */
export function fimDoPasso(): void {
  mudar((e) => {
    const prox = e.dia.passo + 1;
    if (prox > CHEGOU) return { dia: { ...e.dia, tocando: false } };
    return { dia: comPasso(e.dia, prox, prox === CHEGOU ? false : e.dia.tocando) };
  });
}
/** As batidas do em rota, nas Paradas: indo para a parada, chegando nela e parado nela. */
export function marcarBatida(batida: number): void {
  if (ler().dia.batida !== batida) mudar((e) => ({ dia: { ...e.dia, batida } }));
}
/** O passageiro embarcou (tocou Embarquei no Início): o dia segue a bordo. O Embarquei vale com o ônibus chegando
    e com ele parado no ponto. */
export function embarcou(): void {
  const podeEmbarcar = (passo: number) => passo === NO_PONTO || passo === NO_PONTO - 1;
  if (podeEmbarcar(ler().dia.passo)) haptico('sucesso');
  mudar((e) => (podeEmbarcar(e.dia.passo) ? { dia: comPasso(e.dia, NO_PONTO + 1) } : {}));
}
/** O app chegou ao Início pelo caminho feliz: o dia começa a andar. */
export function comecarODia(): void {
  mudar((e) => (e.dia.volta === 0 && e.dia.passo === 0 ? { dia: { ...e.dia, tocando: true, volta: 1 } } : {}));
}

// ── o ponto de hoje ─────────────────────────────────────────────────────────
// A troca de ponto vale para a ida de hoje inteira: o Início, as Paradas, o Mapa e o "Outro ponto hoje" leem daqui
// qual é o ponto de hoje, que horas são e onde o ônibus está. Os passos do dia são sempre os do ponto de hoje:
// chegando nele, parado nele, a bordo a partir dele. As horas saem do horário de cada parada, no mock.

const NOMEADAS = mock.paradasDaIda.filter((p) => !p.agrupada);
const PONTO_DE_SEMPRE = mock.paradasDaIda.find((p) => p.pontoDeSempre)!.id;
const horarioDe = (id: string): string => (NOMEADAS.find((p) => p.id === id) as { programado: string }).programado;
/** quanto antes da parada o ônibus está "chegando", e quanto depois dela o embarque fica registrado (os mesmos do dia de sempre) */
const CHEGA_ANTES = falta(horarioDe(PONTO_DE_SEMPRE), PASSOS[NO_PONTO - 1].hora);
const EMBARCA_DEPOIS = falta(horarioDe(PONTO_DE_SEMPRE), PASSOS[NO_PONTO + 1].hora);

/** O que o Início guarda da troca: o ponto de hoje, e a hora em que a troca foi feita quando não foi no começo do dia. */
interface TrocaDeHoje {
  troca?: string | false;
  desde?: string;
}

export interface Momento {
  passo: number;
  fase: 'em-rota' | 'chegando' | 'no-ponto' | 'a-bordo' | 'chegou';
  /** a hora, no relógio fixo */
  hora: string;
  /** o ponto de hoje: o de sempre, ou o da troca */
  ponto: string;
  trocado: boolean;
  /** a parada nomeada para onde o ônibus vai, ou em que está */
  onibus: { parada: string; estado: 'indo' | 'chegando' | 'parado' };
  /** o dia como foi desenhado: sem troca, no relógio de sempre. As telas mostram o quadro do passo */
  deSempre: boolean;
}

const FASES: Momento['fase'][] = ['em-rota', 'chegando', 'no-ponto', 'a-bordo', 'chegou'];

/** Onde o ônibus está numa hora: a primeira parada nomeada que ele ainda não deixou para trás. */
export function onibusAs(hora: string): Momento['onibus'] {
  const proxima = NOMEADAS.find((p) => falta(hora, horarioDe(p.id)) >= 0) ?? NOMEADAS[NOMEADAS.length - 1];
  const min = falta(hora, horarioDe(proxima.id));
  return { parada: proxima.id, estado: min <= 0 ? 'parado' : min <= -CHEGA_ANTES ? 'chegando' : 'indo' };
}

export function momentoDoDia(dia: Dia, t?: TrocaDeHoje): Momento {
  const ponto = t?.troca || PONTO_DE_SEMPRE;
  const noPonto = horarioDe(ponto);
  const horas = [t?.desde ?? PASSOS[0].hora, somar(noPonto, CHEGA_ANTES), noPonto, somar(noPonto, EMBARCA_DEPOIS), PASSOS[CHEGOU].hora];
  const hora = horas[dia.passo];
  return { passo: dia.passo, fase: FASES[dia.passo], hora, ponto, trocado: ponto !== PONTO_DE_SEMPRE, onibus: onibusAs(hora), deSempre: !t?.troca && !t?.desde };
}
export const momentoDeAgora = (): Momento => momentoDoDia(ler().dia, ler().cenas.T05 as TrocaDeHoje | undefined);

/** Dá para trocar para uma parada, numa hora? A regra da margem: o ônibus já passou, está em cima da hora, ou dá tempo. */
export function margemPara(id: string, hora: string): 'passou' | 'em-cima-da-hora' | 'da-tempo' {
  const min = falta(hora, horarioDe(id));
  return min <= 0 ? 'passou' : min < mock.regras.margemDaTrocaMin ? 'em-cima-da-hora' : 'da-tempo';
}
/** A troca só existe antes do embarque. */
export const antesDoEmbarque = (m: Momento): boolean => m.passo <= NO_PONTO;

/** A troca foi confirmada (ou desfeita, com o ponto de sempre). Com o ônibus chegando ou parado no ponto que deixa de
    ser o de hoje, o dia volta a estar em rota, na mesma hora: o ônibus segue para o ponto novo. */
export function trocarOPontoDeHoje(id: string, doInicio: object): void {
  const m = momentoDeAgora();
  if (!antesDoEmbarque(m)) return;
  const troca = id === PONTO_DE_SEMPRE ? false : id;
  const daqui = m.passo > 0 || m.hora !== PASSOS[0].hora;
  mudar((e) => ({
    cenas: { ...e.cenas, T05: { ...doInicio, troca, desde: daqui ? m.hora : undefined } },
    dia: m.passo > 0 ? comPasso(e.dia, 0) : e.dia,
  }));
}
