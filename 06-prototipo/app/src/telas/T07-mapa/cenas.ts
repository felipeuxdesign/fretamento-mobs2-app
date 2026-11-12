// T07 · Mapa: as cenas, uma por referência. O mapa é o mesmo; o caso diz onde o ônibus está, o que da rota já
// ficou para trás, para onde a câmera olha, a altura do painel e o que o herói compacto diz.
import { mock, somar, falta, relativo, prefixoEPlaca } from '@/dados';
import { antesDoEmbarque, type Momento } from '@/estado/dia';
import type { TipoDeSelo } from '@/ds/selo/Selo';
import type { LinhaDoTrilho } from '@/ds/trilho/Trilho';
import { pontoNaRota, fracaoDoPonto, type PontoDoMapa, type RotaNoMapa } from '@/ds/mapa/Mapa';
import { ROTA_DA_IDA } from '@/ds/mapa/desenho';
import type { AlturaDoPainel } from '@/ds/mapa/PecasDoMapa';
import { PARADAS_NO_MAPA as EM } from '@/ds/mapa/paradas';
import { lista, nb, EM_ROTA, CENAS as PARADAS_DO_DIA, cenaDoMomento as paradasDoMomento } from '@/telas/T06-paradas/cenas';

const PARADAS = mock.paradasDaIda;
const P = Object.fromEntries(PARADAS.map((p) => [p.id, p]));
const SEMPRE = PARADAS.find((p) => p.pontoDeSempre)!;
const DESTINO = PARADAS.find((p) => p.destino)!;
const ORIGEM = PARADAS[0];
const NORTE = P['av-norte'];
const IDA = mock.viagens[0];
const semente = mock.sementeDoCaminhoFeliz;
const R = mock.regras;

export interface SeloDaCena {
  tipo: TipoDeSelo;
  icone?: string;
  texto: string;
}
type Ponteiro = [PontoDoMapa, PontoDoMapa, PontoDoMapa];

export interface CenaT07 {
  /** a hora do caso, no relógio fixo */
  hora: string;
  /** sem internet, o que se vê é o dado guardado: os tempos relativos contam a partir da hora dele, e não do agora */
  dadoDe?: string;
  camera: { x: number; y: number };
  /** a linha inteira na tela, a 50% */
  afastado?: boolean;
  rota: RotaNoMapa;
  onibus: { em: PontoDoMapa; ponteiro?: Ponteiro | null; apagado?: boolean; rotulo?: string } | null;
  /** a escala, parada na tela. Nos quadros sem ônibus, no painel inteiro e no desvio, o desenho não as traz */
  semInstrumentos?: boolean;
  /** a parada aberta no painel */
  escolhida?: string;
  seguindo?: boolean;
  /** onde a pessoa está: só com a permissão dada */
  localizacao?: PontoDoMapa;
  balao?: { titulo: string; apoio: string };
  banner?: { nivel: 'info' | 'atencao'; icone: string; texto: string; acao?: string };
  painel: AlturaDoPainel;
  /** a altura do painel recolhido: o herói compacto, e a nota quando há */
  recolhido: number;
  heroi: {
    alvo: string;
    antes?: string;
    numero?: string;
    apagado?: boolean;
    complemento?: string;
    selos: SeloDaCena[];
    nota?: string;
    /** a viagem cancelada: o herói vai num cartão de perigo, com o que fazer */
    cancelada?: string;
  };
  /** o que vai sob a hora de cada parada, na lista inteira */
  proximos: LinhaDoTrilho[];
  todas: LinhaDoTrilho[];
  origem: string;
}

const AO_VIVO: SeloDaCena = { tipo: 'ao-vivo', texto: 'Ao vivo' };
const PLACA: SeloDaCena = { tipo: 'neutro', texto: prefixoEPlaca(mock.onibus) };
const ALVO_PONTO = `Passa no seu ponto · ${nb(SEMPRE.nome!)}`;
const MIN = `${semente.minutosAteOSeuPonto} min`;

/** Os próximos pontos: a última parada que passou, o ônibus, a que vem, o seu ponto e o destino. */
function proximosDe(todas: LinhaDoTrilho[]): LinhaDoTrilho[] {
  const iBus = todas.findIndex((l) => l.tipo === 'onibus');
  const fica = new Set<number>();
  if (iBus >= 0) {
    fica.add(iBus);
    for (let i = iBus - 1; i >= 0; i--) if (todas[i].tipo === 'parada') { fica.add(i); break; } // prettier-ignore
    for (let i = iBus + 1; i < todas.length; i++) if (todas[i].tipo === 'parada') { fica.add(i); break; } // prettier-ignore
  }
  todas.forEach((l, i) => {
    if (l.tipo !== 'parada') return;
    if (l.minha || l.baixo === null) fica.add(i);
  });
  // o grupo das paradas sem nome fica quando o que vem antes e depois dele ficou
  todas.forEach((l, i) => {
    if (l.tipo === 'grupo' && fica.has(i - 1) && [...fica].some((j) => j > i)) fica.add(i);
  });
  const linhas = todas.filter((_, i) => fica.has(i)).map((l) => ({ ...l }));
  const primeira = linhas[0];
  if (primeira && primeira.tipo === 'parada') primeira.cima = null;
  return linhas;
}

/** As listas do painel, a partir da lista das Paradas no mesmo passo do dia. */
const listas = (ref: string, todas?: LinhaDoTrilho[]) => {
  const t = todas ?? PARADAS_DO_DIA[ref].linhas;
  return { todas: t, proximos: proximosDe(t), origem: PARADAS_DO_DIA[ref].origem };
};
const NO_MAPA = lista({ ...EM_ROTA, iconeDoTipo: true, sob: { [NORTE.id]: '7 min', [SEMPRE.id]: MIN, 'av-recife': '26 min', barro: '34 min', [DESTINO.id]: '51 min' } });

const CORTE: PontoDoMapa = [199.2, 385.9];
const ONIBUS_EM_ROTA = { em: [198, 385] as PontoDoMapa, ponteiro: [[2.8, 25.3], [-3.8, 15.5], [7.1, 14.3]] as Ponteiro };
const SEMENTE: CenaT07 = {
  hora: semente.hora,
  camera: { x: -10, y: -240 },
  rota: { corte: CORTE, aceso: [209, 470] },
  onibus: ONIBUS_EM_ROTA,
  painel: 'recolhido',
  recolhido: 172,
  heroi: { alvo: ALVO_PONTO, numero: MIN, complemento: `às\u00a0${SEMPRE.programado}`, selos: [AO_VIVO] },
  ...listas('T06-00', NO_MAPA),
};
const com = (parte: Partial<CenaT07>, heroi: Partial<CenaT07['heroi']> = {}): CenaT07 => ({ ...SEMENTE, ...parte, heroi: { ...SEMENTE.heroi, ...heroi } });
const PROGRAMADO = { numero: `às\u00a0${SEMPRE.programado}`, complemento: 'programado' };

export const CENAS: Record<string, CenaT07> = {
  'T07-00': SEMENTE,
  'T07-01': com(
    { hora: somar(SEMPRE.programado!, -1), camera: { x: -10, y: -400 }, rota: { corte: [207.8, 704], aceso: [207.9, 760] }, onibus: { em: [207.8, 704], ponteiro: [[-1.1, 26], [-4.4, 17.5], [3, 17.8]] }, ...listas('T06-03') },
    { numero: 'Chegando', complemento: `menos de ${R.chegandoMin} min`, selos: [AO_VIVO, PLACA] },
  ),
  'T07-02': com(
    { hora: SEMPRE.programado!, camera: { x: -10, y: -400 }, rota: { corte: [207.9, 760], aceso: [225.4, 950] }, onibus: { em: [207.9, 760], ponteiro: null }, ...listas('T06-04') },
    { alvo: `No seu ponto · ${nb(SEMPRE.nome!)}`, numero: 'No ponto', complemento: 'agora', selos: [AO_VIVO, PLACA] },
  ),
  'T07-03': com(
    { hora: somar(SEMPRE.programado!, 2), camera: { x: -10, y: -440 }, rota: { corte: [218.1, 842], aceso: [225.4, 950] }, onibus: { em: [218.1, 842], ponteiro: [[2.6, 25.9], [-2, 18], [5.4, 17.2]] }, ...listas('T06-05') },
    { alvo: `Chega na fábrica · ${DESTINO.nome}`, numero: '31 min', complemento: `às ${DESTINO.programado}`, selos: [{ tipo: 'registrado', icone: 'embarquei', texto: 'Embarque registrado' }, AO_VIVO] },
  ),
  'T07-04': com(
    { hora: somar(DESTINO.programado!, 1), camera: { x: -100, y: -900 }, rota: 'percorrida', onibus: { em: EM[DESTINO.id], ponteiro: null }, ...listas('T06-06') },
    { alvo: DESTINO.nome!, numero: 'Chegou', complemento: `às ${somar(DESTINO.programado!, 1)}`, selos: [{ tipo: 'neutro', icone: 'no-horario', texto: 'Viagem concluída' }] },
  ),
  'T07-05': com({ camera: { x: -10, y: -210 }, painel: 'meio' }),
  'T07-06': com({ camera: { x: -10, y: -330 }, painel: 'inteiro', semInstrumentos: true }),
  'T07-07': com({ camera: { x: -15, y: -55 }, escolhida: NORTE.id }),
  'T07-08': com({ camera: { x: -5, y: 30 }, seguindo: true }),
  'T07-09': com({ camera: { x: 45, y: -400 }, localizacao: [150, 820] }),
  'T07-10': com({ camera: { x: -10, y: -90 }, balao: { titulo: `Ônibus ${prefixoEPlaca(mock.onibus)}`, apoio: 'Ao vivo · posição há 12 s' } }),
  'T07-11': com({ camera: { x: 88, y: 80 }, afastado: true, recolhido: 130 }),
  'T07-12': com({ hora: '05:20', rota: 'inteira', onibus: null, recolhido: 196, semInstrumentos: true, ...listas('T06-09') }, { ...PROGRAMADO, selos: [{ tipo: 'neutro', icone: 'programado', texto: 'Programado' }], nota: 'O ônibus aparece no mapa quando a viagem começar.' }),
  'T07-13': com({ hora: '06:26', onibus: { ...ONIBUS_EM_ROTA, apagado: true }, ...listas('T06-10') }, { selos: [{ tipo: 'aproximado', icone: 'ao-vivo', texto: 'Aproximado · há 2 min' }] }),
  'T07-14': com(
    { hora: '06:28', rota: { corte: CORTE }, onibus: { ...ONIBUS_EM_ROTA, apagado: true, rotulo: 'Último sinal 06:21' }, recolhido: 208, ...listas('T06-11') },
    { ...PROGRAMADO, selos: [{ tipo: 'sem-sinal', icone: 'sem-sinal', texto: 'Sem sinal' }], nota: `Sem sinal do ônibus há ${R.semSinalMin} min. Mostrando o horário programado.` },
  ),
  'T07-15': com({ banner: { nivel: 'info', icone: 'sem-localizacao', texto: 'Localização desligada no celular. O mapa continua mostrando o ônibus.', acao: 'Abrir ajustes' } }),
  'T07-16': com(
    { hora: '05:40', rota: { corte: CORTE }, onibus: null, recolhido: 242, semInstrumentos: true, ...listas('T06-13') },
    { numero: 'Cancelada', apagado: true, complemento: `ida ${IDA.sai}`, selos: [{ tipo: 'perigo', icone: 'cancelada', texto: 'Cancelada' }], cancelada: 'A transportadora cancelou esta viagem. Para saber como ir hoje, fale com o RH ou com a transportadora em Preciso de ajuda.' },
  ),
  'T07-17': com({ hora: '06:36', dadoDe: '06:20', onibus: { ...ONIBUS_EM_ROTA, apagado: true }, banner: { nivel: 'info', icone: 'sem-internet', texto: 'Sem internet. Mostrando dados de 06:20.' }, ...listas('T06-12') }, { selos: [{ tipo: 'sem-sinal', icone: 'sem-sinal', texto: 'Dados de 06:20' }] }),
  'T07-18': com(
    { hora: '06:28', rota: { corte: CORTE }, semInstrumentos: true, onibus: { em: [160, 688], ponteiro: [[-12, 22.4], [-11.9, 10.6], [-2.2, 15.8]] }, banner: { nivel: 'atencao', icone: 'desvio', texto: 'O ônibus saiu do trajeto previsto. A previsão pode mudar.' }, ...listas('T06-14') },
    { antes: 'cerca de', numero: '16 min', complemento: `às\u00a0${somar(SEMPRE.programado!, 2)}` },
  ),
};

// ── o mapa num momento do dia que não é o de sempre ─────────────────────────
const NOMEADAS = PARADAS.filter((p) => !p.agrupada);
const horario = (id: string) => (P[id] as { programado: string }).programado;
/** a ponta do ônibus, medida no desenho do chegando: o bico a 26 do centro, a base a 17,65, com 3,7 para cada lado */
const PONTA = { bico: 26, base: 17.65, lado: 3.7 };
/** onde ficam na tela o ponto de hoje (em rota, chegando e no ponto) e o ônibus (a bordo), como nos quadros do dia */
const NA_TELA = { ponto: [195, 360] as PontoDoMapa, onibus: [208, 402] as PontoDoMapa };
const umaCasa = (v: number) => Math.round(v * 10) / 10;

/** Onde o ônibus está no traçado: parado na parada, ou entre a anterior e a próxima, na proporção do tempo. */
function onibusNoTracado(m: Momento): { em: PontoDoMapa; ponteiro: Ponteiro | null; aceso: PontoDoMapa | null } {
  const i = NOMEADAS.findIndex((p) => p.id === m.onibus.parada);
  const ate = fracaoDoPonto(EM[m.onibus.parada]);
  if (m.onibus.estado === 'parado' || i === 0) return { em: pontoNaRota(ate).ponto, ponteiro: null, aceso: NOMEADAS[i + 1] ? EM[NOMEADAS[i + 1].id] : null };
  const anterior = NOMEADAS[i - 1].id;
  const de = fracaoDoPonto(EM[anterior]);
  const andou = falta(horario(anterior), m.hora) / falta(horario(anterior), horario(m.onibus.parada));
  const { ponto, indice } = pontoNaRota(de + (ate - de) * andou);
  // a ponta olha para onde o traçado segue
  const [dx, dy] = [ROTA_DA_IDA[indice + 1][0] - ROTA_DA_IDA[indice][0], ROTA_DA_IDA[indice + 1][1] - ROTA_DA_IDA[indice][1]];
  const d = Math.hypot(dx, dy) || 1;
  const [ux, uy] = [dx / d, dy / d];
  const ponteiro: Ponteiro = [
    [umaCasa(ux * PONTA.bico), umaCasa(uy * PONTA.bico)],
    [umaCasa(ux * PONTA.base + uy * PONTA.lado), umaCasa(uy * PONTA.base - ux * PONTA.lado)],
    [umaCasa(ux * PONTA.base - uy * PONTA.lado), umaCasa(uy * PONTA.base + ux * PONTA.lado)],
  ];
  return { em: [umaCasa(ponto[0]), umaCasa(ponto[1])], ponteiro, aceso: EM[m.onibus.parada] };
}

/** O mapa com a troca de ponto ativa, em qualquer passo, ou depois dela: os mesmos quadros do dia, com o ponto de hoje
    no lugar do de sempre. Às 06:24 o ônibus está onde a semente diz; adiante, a posição sai da hora e do traçado. */
export function cenaDoMomento(m: Momento, dasSeis: boolean): CenaT07 {
  const todas = paradasDoMomento(m).linhas;
  const asListas = { todas, proximos: proximosDe(todas), origem: SEMENTE.origem };
  const lugar = `no seu ponto${m.trocado ? ' hoje' : ''} · ${nb(P[m.ponto].nome!)}`;
  if (dasSeis) return com({ ...asListas }, { alvo: `Passa ${lugar}`, numero: relativo(m.hora, horario(m.ponto)), complemento: `às\u00a0${horario(m.ponto)}` });
  const o = onibusNoTracado(m);
  const olha = (ponto: PontoDoMapa, alvo: PontoDoMapa) => ({ x: umaCasa(alvo[0] - ponto[0]), y: umaCasa(alvo[1] - ponto[1]) });
  const base = { hora: m.hora, rota: { corte: o.em, aceso: o.aceso }, onibus: { em: o.em, ponteiro: o.ponteiro }, ...asListas };
  if (!antesDoEmbarque(m)) return com({ ...base, camera: olha(o.em, NA_TELA.onibus) }, { ...CENAS['T07-03'].heroi, numero: relativo(m.hora, DESTINO.programado!) });
  if (m.fase === 'chegando') return com({ ...base, camera: olha(EM[m.ponto], NA_TELA.ponto) }, { ...CENAS['T07-01'].heroi, alvo: `Passa ${lugar}` });
  if (m.fase === 'no-ponto') return com({ ...base, camera: olha(EM[m.ponto], NA_TELA.ponto) }, { ...CENAS['T07-02'].heroi, alvo: `No ${lugar.slice(3)}` });
  return com({ ...base, camera: olha(EM[m.onibus.parada], NA_TELA.ponto) }, { alvo: `Passa ${lugar}`, numero: relativo(m.hora, horario(m.ponto)), complemento: `às\u00a0${horario(m.ponto)}` });
}

export const TEXTOS = {
  titulo: `Linha ${mock.linha.numero} · ${IDA.rotulo}`,
  controles: { onibus: 'Seguir ônibus', ponto: 'Meu ponto', local: 'Minha localização' },
  proximos: 'Próximas paradas',
  todas: 'Todas as paradas',
  seuPonto: 'Seu ponto',
  seuPontoHoje: 'Seu ponto hoje',
  linhaInteira: { titulo: `Linha inteira · ${ORIGEM.nome} → ${DESTINO.nome!.replace(/ /g, '\u00a0')}`, apoio: `${PARADAS.length} paradas · sai ${IDA.sai} · chega ${IDA.chega}` },
  parada: { tipo: 'Ponto de parada', previsao: 'Previsão neste ponto:', embarcar: 'Embarcar aqui hoje' },
  escala: { perto: '400 m', longe: '800 m' },
};
export { SEMPRE, DESTINO, ORIGEM, PARADAS };
