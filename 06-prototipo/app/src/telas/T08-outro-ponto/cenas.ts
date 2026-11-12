// T08 · Outro ponto hoje: as cenas, uma por referência. A lista é a dos pontos à frente do ônibus, com a razão
// de cada um; o caso diz o que está escolhido, a ordem, o que já passou e o que o servidor respondeu.
import { mock, minutos, somar, falta, relativo, pessoasQueEmbarcam } from '@/dados';
import { margemPara, type Momento } from '@/estado/dia';
import { nb, artigo } from '@/telas/T06-paradas/cenas';

const PARADAS = mock.paradasDaIda;
const P = Object.fromEntries(PARADAS.map((p) => [p.id, p]));
export const SEMPRE = PARADAS.find((p) => p.pontoDeSempre)!;
const NORTE = P['av-norte'];
const IDA = mock.viagens[0];
const AGORA = mock.sementeDoCaminhoFeliz.hora;
const R = mock.regras;

export { artigo };
const pessoasAqui = (n: number) => pessoasQueEmbarcam(n, false);
const previstos = (id: string) => (P[id] as { previstos: number }).previstos;
const hora = (id: string) => (P[id] as { programado: string }).programado;

export interface ItemDaCena {
  id: string;
  /** o glifo do tipo do lugar */
  icone: string;
  /** a origem da viagem, já passada: disco cheio */
  cheio?: boolean;
  nome: string;
  papel?: string;
  apoio: string;
  desligado?: boolean;
}
export type SheetDaTroca = 'pre-permissao' | 'confirmar' | 'falhou' | 'passou';

export interface CenaT08 {
  /** a hora do caso, no relógio fixo */
  hora: string;
  banner?: string;
  /** nenhum ponto disponível: a tela vira o aviso, com o que já passou */
  vazio?: boolean;
  /** "Perto de mim": some sem internet; ligado, ordena por distância a pé */
  perto?: 'desligado' | 'ligado';
  itens: ItemDaCena[];
  escolhido?: string;
  /** os pontos que o ônibus já passou: quantos são, e os que a lista mostra quando abre */
  passados?: { quantos: number; abertos?: ItemDaCena[] };
  nota: boolean;
  /** o que o rodapé diz acima do botão, e se o botão está aceso */
  legenda?: string;
  aceso: boolean;
  sheet?: SheetDaTroca;
}

const item = (id: string, apoio: string, o: Partial<ItemDaCena> = {}): ItemDaCena => ({
  id,
  icone: P[id].tipo === 'comercio' ? 'comercio' : PARADAS[0].id === id ? 'terminal' : 'ponto',
  nome: nb(P[id].nome!),
  papel: id === SEMPRE.id ? 'Ponto de sempre' : undefined,
  apoio,
  ...o,
});
/** Os pontos à frente do ônibus, com nome, que dá para escolher: a previsão e quem embarca. */
export const A_FRENTE = ['av-norte', 'abdias', 'av-recife', 'barro'];
const comPrevisao = (id: string, rotulo = 'Previsão', quantos = previstos(id)) => item(id, `${rotulo} ${hora(id)} · ${pessoasAqui(quantos)}`);
const passou = (id: string, quando: string, o: Partial<ItemDaCena> = {}) => item(id, `O ônibus passou às ${quando}`, { desligado: true, ...o });
/** A distância a pé de cada ponto, a partir de onde a pessoa está (o ponto azul do mapa). */
const A_PE: Record<string, number> = { abdias: 3, 'av-norte': 9, 'av-recife': 14, barro: 18 };
const pertoDeMim = (id: string, quantos = previstos(id)) => item(id, `${A_PE[id]} min a pé · previsão ${hora(id)} · ${quantos < 2 ? 'até 1 pessoa' : `${quantos} pessoas`}`);

export const legendaDe = (id: string, agora = AGORA) => `${nb(P[id].nome!)} · passa às ${hora(id)}, em ${falta(agora, hora(id))} min`;
// a hora em que o ônibus passou é a mesma que as Paradas mostram: o horário da parada
const JA_PASSARAM = [passou('macaxeira', hora('macaxeira'), { cheio: true }), passou('casa-amarela', hora('casa-amarela'))];

/** Por que não dá para trocar para uma parada agora, ou nada quando dá. A troca vale antes do embarque e com margem. */
export function motivoSemTroca(id: string, agora: string, embarcou: boolean): string | null {
  if (embarcou) return 'Você já embarcou nesta viagem.';
  const margem = margemPara(id, agora);
  if (margem === 'da-tempo') return null;
  return margem === 'passou' ? 'O ônibus já está neste ponto: não dá tempo de avisar a transportadora.' : `O ônibus passa em ${relativo(agora, hora(id))}: não dá tempo de avisar a transportadora.`;
}

/** A lista num momento do dia que não é o das 06:24 de sempre: o que o ônibus já passou sai para o grupo de baixo, o
    ponto em cima da hora fica desligado com o motivo, e o ponto de hoje vem marcado. */
export function cenaDoMomento(m: Momento, o: { perto: boolean; passadosAbertos: boolean }): CenaT08 {
  const frente = A_FRENTE.filter((id) => id === m.ponto || margemPara(id, m.hora) !== 'passou');
  const daLista = (id: string): ItemDaCena => {
    const papel = id === m.ponto && m.trocado ? 'Seu ponto hoje' : id === SEMPRE.id ? 'Ponto de sempre' : undefined;
    const motivo = id === m.ponto ? null : motivoSemTroca(id, m.hora, false);
    if (motivo) return item(id, o.perto ? `${A_PE[id]} min a pé · ${motivo.charAt(0).toLowerCase()}${motivo.slice(1, -1)}` : motivo.slice(0, -1), { papel, desligado: true });
    // quem trocou sai da contagem do ponto de sempre e entra na do ponto de hoje, como no Início
    const quantos = previstos(id) + (m.trocado ? (id === m.ponto ? 1 : id === SEMPRE.id ? -1 : 0) : 0);
    return { ...(o.perto ? pertoDeMim(id, quantos) : comPrevisao(id, 'Previsão', quantos)), papel };
  };
  const ordem = o.perto ? [...frente].sort((a, b) => A_PE[a] - A_PE[b]) : frente;
  const jaPassaram = PARADAS.filter((p) => !p.agrupada && !p.destino && !frente.includes(p.id)).map((p) => passou(p.id, hora(p.id), { cheio: PARADAS[0].id === p.id }));
  return { hora: m.hora, perto: o.perto ? 'ligado' : 'desligado', itens: ordem.map(daLista), passados: { quantos: jaPassaram.length, abertos: o.passadosAbertos ? jaPassaram : undefined }, nota: false, aceso: false };
}

const BASE: CenaT08 = {
  hora: AGORA,
  perto: 'desligado',
  itens: A_FRENTE.map((id) => comPrevisao(id)),
  passados: { quantos: 2 },
  nota: true,
  aceso: false,
};
/** Atrás de um sheet, o desenho traz só os dois primeiros pontos da lista. */
const ATRAS_DO_SHEET: Partial<CenaT08> = { itens: BASE.itens.slice(0, 2), passados: undefined, nota: false };

export const CENAS: Record<string, CenaT08> = {
  'T08-00': BASE,
  'T08-01': { ...BASE, escolhido: NORTE.id, nota: false, legenda: legendaDe(NORTE.id), aceso: true },
  'T08-02': { ...BASE, ...ATRAS_DO_SHEET, sheet: 'pre-permissao' },
  'T08-03': {
    ...BASE,
    perto: 'ligado',
    itens: [pertoDeMim('abdias'), pertoDeMim('av-norte'), item('av-recife', `${A_PE['av-recife']} min a pé · o ônibus passa em 26 min: dá tempo, com 12 min de folga`, { desligado: true }), pertoDeMim('barro')],
    nota: false,
  },
  'T08-04': { ...BASE, passados: { quantos: 2, abertos: JA_PASSARAM }, nota: false },
  'T08-05': { ...BASE, ...ATRAS_DO_SHEET, escolhido: NORTE.id, aceso: true, sheet: 'confirmar' },
  'T08-06': {
    hora: '06:58',
    vazio: true,
    itens: [],
    passados: { quantos: 5, abertos: [passou('barro', somar(hora('barro'), 1)), passou('av-recife', somar(hora('av-recife'), 1)), passou('abdias', somar(hora('abdias'), 2))] },
    nota: false,
    aceso: false,
  },
  'T08-07': {
    ...BASE,
    hora: '06:36',
    banner: 'Sem internet. Para trocar de ponto, o app precisa avisar a transportadora.',
    perto: undefined,
    itens: A_FRENTE.map((id) => ({ ...comPrevisao(id, 'Programado'), desligado: true })),
    passados: undefined,
    nota: false,
    legenda: 'Indisponível sem internet. Tente quando a conexão voltar.',
  },
  'T08-08': { ...BASE, ...ATRAS_DO_SHEET, hora: hora(NORTE.id), itens: [item(NORTE.id, `O ônibus acabou de passar, às ${hora(NORTE.id)}`, { desligado: true }), comPrevisao('abdias')], sheet: 'passou' },
  'T08-09': { ...BASE, ...ATRAS_DO_SHEET, escolhido: NORTE.id, aceso: true, sheet: 'falhou' },
};

/** O que os sheets dizem, para o ponto escolhido. */
export function textosDaTroca(id: string) {
  const nome = nb(P[id].nome!);
  const diferenca = minutos(hora(id)) - minutos(hora(SEMPRE.id));
  return {
    confirmar: {
      titulo: `Embarcar ${artigo(P[id].nome!)} ${nome} hoje?`,
      antes: 'O ônibus passa lá às ',
      hora: hora(id),
      depois: `, ${Math.abs(diferenca)} min ${diferenca < 0 ? 'antes' : 'depois'} do seu ponto de sempre. A transportadora vai saber que você embarca neste ponto hoje.`,
      apoio: `Seu ponto de sempre continua ${nb(SEMPRE.nome!)}. Você pode voltar atrás até o ônibus passar.`,
      erro: `Não foi possível confirmar. Nada mudou: seu ponto continua ${nb(SEMPRE.nome!)}. Tente de novo.`,
      desiste: 'Cancelar',
      confirma: 'Confirmar',
    },
    passou: {
      titulo: 'Este ponto não está mais disponível',
      erro: `O ônibus passou por ${nome} enquanto você confirmava. Nada mudou: seu ponto continua ${nb(SEMPRE.nome!)}.`,
      texto: 'Os pontos à frente continuam na lista. Quer escolher outro?',
      desiste: 'Deixar como está',
      confirma: 'Escolher outro',
    },
    pronto: `Pronto. Hoje você embarca ${artigo(P[id].nome!)} ${P[id].nome}.`,
  };
}

export const TEXTOS = {
  titulo: 'Outro ponto hoje',
  vale: ['Vale só para a ', `ida de hoje (${IDA.sai})`, '. Seu ponto de sempre não muda.'] as const,
  perto: 'Perto de mim',
  pertoLigado: 'Perto de mim · do mais perto ao mais longe',
  passados: (n: number) => `Pontos que o ônibus já passou (${n})`,
  nota: 'Paradas sem nome não aparecem: só a sua e as de referência pública.',
  embarcar: 'Embarcar neste ponto',
  vazio: { titulo: 'Não há outro ponto disponível agora', texto: `O ônibus já passou por todos os pontos desta viagem, ou está a menos de ${R.margemDaTrocaMin} min deles.`, volta: 'Voltar ao início' },
};
export { NORTE };
