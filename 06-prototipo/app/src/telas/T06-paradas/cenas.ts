// T06 · Paradas da viagem: as cenas, uma por referência. A lista é sempre a mesma viagem, da origem ao destino;
// o caso diz onde o ônibus está, o que ele diz, a previsão de cada parada e de onde vem o horário.
import { mock, minutos, somar, relativo, pessoasQueEmbarcam } from '@/dados';
import { antesDoEmbarque, type Momento } from '@/estado/dia';
import type { LinhaDoTrilho } from '@/ds/trilho/Trilho';

const PARADAS = mock.paradasDaIda;
const P = Object.fromEntries(PARADAS.map((p) => [p.id, p]));
const SEMPRE = PARADAS.find((p) => p.pontoDeSempre)!;
const DESTINO = PARADAS.find((p) => p.destino)!;
const NORTE = P['av-norte'];
const IDA = mock.viagens[0];
const semente = mock.sementeDoCaminhoFeliz;
const R = mock.regras;

/** O nome com o espaço que não quebra depois de "Av." e antes do número: "1200" não fica sozinho numa linha */
export const nb = (texto: string) => texto.replace(/Av\. /g, 'Av. ');
export const pessoas = (n: number) => pessoasQueEmbarcam(n);
/** "na Av. Norte, 2800", "no Terminal do Barro": o artigo pelo começo do nome. */
export const artigo = (nome: string) => (/^(Av\.|Fábrica|Rua|R\.)/.test(nome) ? 'na' : 'no');
const ICONE: Record<string, string> = { terminal: 'terminal', comercio: 'comercio', ponto: 'ponto', fabrica: 'fabrica' };
const ICONE_DO_MEIO: Record<string, string> = { ...ICONE, terminal: 'ponto' };
const AGRUPADAS = PARADAS.filter((p) => p.agrupada).length;
const NOMEADAS = PARADAS.filter((p) => !p.agrupada);

export interface CenaT06 {
  /** a hora do caso, no relógio fixo */
  hora: string;
  /** sem internet, o que se vê é o dado guardado: os tempos relativos contam a partir da hora dele, e não do agora */
  dadoDe?: string;
  /** de onde vem o horário: o fim da linha de cima */
  origem: string;
  banner?: { nivel: 'info' | 'atencao'; icone: string; texto: string };
  nota?: { icone: string; texto: string };
  cancelada?: boolean;
  linhas: LinhaDoTrilho[];
  /** a parada aberta no sheet */
  sheet?: string;
}

export interface Lista {
  /** no painel do mapa, um terminal no meio do trajeto aparece com o ícone do tipo dele */
  iconeDoTipo?: boolean;
  /** o ônibus corta o trilho antes desta parada; sem isso, não há ônibus no trilho */
  onibusAntesDe?: string;
  onibusDiz?: string;
  onibusApagado?: boolean;
  /** minutos de deslocamento da previsão sobre o programado */
  desloca?: number;
  /** o que vai sob a hora, por parada */
  sob?: Record<string, string>;
  /** as paradas que vêm mostram o horário programado, apagado, com "prog." */
  programado?: boolean;
  /** a hora de uma parada, quando o caso diz outra */
  hora?: Record<string, string>;
  /** a contagem de uma parada, quando o caso diz outra */
  previstos?: Record<string, number>;
  /** o ponto de hoje, quando a troca está ativa */
  pontoDeHoje?: string;
  chegou?: boolean;
}

export function lista(o: Lista): LinhaDoTrilho[] {
  const linhas: LinhaDoTrilho[] = [];
  const corte = o.onibusAntesDe ? NOMEADAS.findIndex((p) => p.id === o.onibusAntesDe) : -1;
  const meu = o.pontoDeHoje ?? SEMPRE.id;
  NOMEADAS.forEach((p, i) => {
    const passada = corte >= 0 && i < corte;
    const primeira = i === 0;
    const ultima = i === NOMEADAS.length - 1;
    if (i === corte) linhas.push({ tipo: 'onibus', texto: nb(o.onibusDiz!), apagado: o.onibusApagado, cima: 'passado', baixo: 'ida' });
    // cheio é o disco das pontas da viagem: a origem e o destino. Um terminal no meio do trajeto é um ponto como os outros
    const ponta = primeira || ultima;
    const minha = p.id === meu;
    const eOSempre = p.id === SEMPRE.id;
    const papeis = minha
      ? [{ texto: o.pontoDeHoje ? 'Seu ponto hoje' : 'Seu ponto', apagado: passada }]
      : eOSempre && o.pontoDeHoje
        ? [{ texto: 'Ponto de sempre', apagado: true }]
        : p.destino
          ? [{ texto: 'Destino' }]
          : undefined;
    const previstos = o.previstos?.[p.id] ?? (p as { previstos?: number | null }).previstos;
    const programado = (p as { programado?: string }).programado!;
    const chegouAqui = !!o.chegou && ultima;
    linhas.push({
      tipo: 'parada',
      id: p.id,
      nome: nb(p.nome!),
      icone: minha || (eOSempre && passada) ? 'pessoa' : (ponta || o.iconeDoTipo ? ICONE[p.tipo] : ICONE_DO_MEIO[p.tipo]),
      minha: minha && !passada,
      cheia: ponta,
      passada,
      forte: (minha && !passada) || chegouAqui,
      horaApagada: o.programado && !passada,
      papeis,
      apoio: !passada && !ultima && previstos != null ? pessoas(previstos) : undefined,
      hora: o.hora?.[p.id] ?? (o.desloca ? somar(programado, o.desloca) : programado),
      sobAHora: passada ? 'passou' : (o.sob?.[p.id] ?? (o.programado ? 'prog.' : undefined)),
      cima: primeira ? null : passada ? 'passado' : 'ida',
      baixo: ultima ? null : passada ? 'passado' : 'ida',
    });
    // as paradas sem nome vêm agrupadas, no lugar delas no trajeto
    const proxima = PARADAS[PARADAS.indexOf(p) + 1];
    if (proxima?.agrupada) {
      linhas.push({ tipo: 'grupo', texto: `${AGRUPADAS} outras paradas` });
    }
  });
  return linhas;
}

const LINHA = `Linha ${mock.linha.numero} · ${IDA.rotulo}`;
const MIN_ATE_O_PONTO = `${semente.minutosAteOSeuPonto} min`;
const INDO = `Indo para a ${NORTE.nome}`;
export const EM_ROTA = { onibusAntesDe: NORTE.id, onibusDiz: INDO, sob: { [SEMPRE.id]: MIN_ATE_O_PONTO } };
const SEMENTE: CenaT06 = { hora: semente.hora, origem: 'previsão ao vivo', linhas: lista(EM_ROTA) };
const com = (parte: Partial<CenaT06>, l?: Lista): CenaT06 => ({ ...SEMENTE, ...parte, linhas: l ? lista(l) : SEMENTE.linhas });
/** A lista com a troca de ponto de hoje ativa: o ponto de hoje ganha o halo, e o de sempre fica dito. */
export function cenaDaTroca(id: string): CenaT06 {
  return com({}, { ...EM_ROTA, pontoDeHoje: id, sob: { [id]: `${minutos((P[id] as { programado: string }).programado) - minutos(semente.hora)} min` } });
}
/** O que o ônibus diz no trilho num momento do dia: para onde vai, onde está chegando, onde está parado. */
export function oOnibusDiz(m: Momento): string {
  const { parada, estado } = m.onibus;
  const nome = P[parada].nome!;
  const feminino = artigo(nome) === 'na';
  if (estado === 'indo') return `Indo para ${feminino ? 'a' : 'o'} ${nome}`;
  if (parada === m.ponto && antesDoEmbarque(m)) return estado === 'parado' ? 'No seu ponto' : 'Chegando no seu ponto';
  return estado === 'parado' ? `${feminino ? 'Na' : 'No'} ${nome}` : `Chegando ${artigo(nome)} ${nome}`;
}
/** A lista num momento do dia que não é o de sempre: com a troca de ponto ativa, ou depois dela. O ônibus, o ponto de
    hoje e os tempos saem da hora do momento e do horário de cada parada. */
export function cenaDoMomento(m: Momento): CenaT06 {
  const horario = (id: string) => (P[id] as { programado: string }).programado;
  const alvo = antesDoEmbarque(m) ? m.ponto : DESTINO.id;
  const sob = { [alvo]: relativo(m.hora, horario(alvo)) };
  if (m.onibus.estado !== 'indo') sob[m.onibus.parada] = relativo(m.hora, horario(m.onibus.parada));
  // quem trocou sai da contagem do ponto de sempre e entra na do ponto de hoje, como no Início
  const previstos = m.trocado ? { [m.ponto]: (P[m.ponto] as { previstos: number }).previstos + 1, [SEMPRE.id]: (SEMPRE as { previstos: number }).previstos - 1 } : undefined;
  return com({ hora: m.hora }, { onibusAntesDe: m.onibus.parada, onibusDiz: oOnibusDiz(m), pontoDeHoje: m.trocado ? m.ponto : undefined, sob, previstos });
}
/** Antes da janela ao vivo e na viagem cancelada: o horário programado de cada parada, como o caso escreve. */
const PROGRAMADA: Lista = { programado: true, previstos: { macaxeira: 5 }, hora: { 'casa-amarela': somar(P['casa-amarela'].programado!, -1) } };
const INICIO_DA_JANELA = somar(IDA.sai, -R.janelaAoVivoAntesMin);

export const CENAS: Record<string, CenaT06> = {
  'T06-00': SEMENTE,
  'T06-01': com({ hora: somar(NORTE.programado!, -1) }, { ...EM_ROTA, onibusDiz: `Chegando na ${NORTE.nome}`, sob: { [NORTE.id]: '1 min', [SEMPRE.id]: MIN_ATE_O_PONTO } }),
  'T06-02': com({ hora: NORTE.programado! }, { ...EM_ROTA, onibusDiz: `Na ${NORTE.nome}`, sob: { [NORTE.id]: 'agora', [SEMPRE.id]: MIN_ATE_O_PONTO } }),
  'T06-03': com({ hora: somar(SEMPRE.programado!, -1) }, { onibusAntesDe: SEMPRE.id, onibusDiz: 'Chegando no seu ponto', sob: { [SEMPRE.id]: '1 min' } }),
  'T06-04': com({ hora: SEMPRE.programado! }, { onibusAntesDe: SEMPRE.id, onibusDiz: 'No seu ponto', sob: { [SEMPRE.id]: 'agora' } }),
  'T06-05': com({ hora: somar(SEMPRE.programado!, 2) }, { onibusAntesDe: 'av-recife', onibusDiz: `Indo para a ${P['av-recife'].nome}`, sob: { [DESTINO.id]: '31 min' } }),
  'T06-06': com({ hora: somar(DESTINO.programado!, 1), origem: 'viagem concluída' }, { onibusAntesDe: DESTINO.id, onibusDiz: `Na ${DESTINO.nome}`, hora: { [DESTINO.id]: somar(DESTINO.programado!, 1) }, sob: { [DESTINO.id]: 'chegou' }, chegou: true }),
  'T06-07': { ...SEMENTE, sheet: NORTE.id },
  'T06-08': cenaDaTroca(NORTE.id),
  'T06-09': com({ hora: '05:20', origem: 'programado', nota: { icone: 'horario', texto: `A previsão ao vivo começa ${R.janelaAoVivoAntesMin} min antes da saída, às\u00a0${INICIO_DA_JANELA}.` } }, PROGRAMADA),
  'T06-10': com({ hora: '06:26', origem: 'aproximado', nota: { icone: 'ao-vivo', texto: 'A posição do ônibus parou de chegar. As previsões podem mudar.' } }, { ...EM_ROTA, onibusDiz: 'Última posição há 2 min', onibusApagado: true, sob: { [SEMPRE.id]: '16 min' } }),
  'T06-11': com({ hora: '06:28', origem: 'sem sinal', nota: { icone: 'sem-sinal', texto: `Sem sinal do ônibus há ${R.semSinalMin} min. Mostrando os horários programados.` } }, { onibusAntesDe: NORTE.id, onibusDiz: 'Último sinal às 06:21', onibusApagado: true, programado: true }),
  'T06-12': com({ hora: '06:36', dadoDe: '06:20', banner: { nivel: 'info', icone: 'sem-internet', texto: 'Sem internet. Mostrando dados de 06:20.' } }),
  'T06-13': com({ hora: '05:40', origem: 'cancelada', cancelada: true }, PROGRAMADA),
  'T06-14': com({ hora: '06:28', banner: { nivel: 'atencao', icone: 'desvio', texto: 'O ônibus saiu do trajeto previsto. A previsão pode mudar.' } }, { ...EM_ROTA, onibusDiz: 'Fora do trajeto previsto', desloca: 2, sob: { [SEMPRE.id]: '16 min' } }),
};

export const TEXTOS = {
  titulo: 'Paradas da viagem',
  linha: LINHA,
  agrupadas: 'Paradas sem nome aparecem agrupadas para proteger quem embarca nelas.',
  mapa: { titulo: 'Ver no mapa', apoio: 'O ônibus e as paradas sobre o mapa' },
  cancelada: { titulo: 'Viagem cancelada pela transportadora.', texto: 'Para saber como ir hoje, fale com o RH ou com a transportadora em Preciso de ajuda.' },
  sheet: { tipo: 'Ponto de parada', previsao: 'Previsão neste ponto:', embarcar: 'Embarcar aqui hoje', mapa: 'Ver no mapa' },
};

/** O que o sheet diz de uma parada: o nome, quem embarca nela e a previsão. */
export function paradaDoSheet(cena: CenaT06, id: string) {
  const l = cena.linhas.find((x) => x.tipo === 'parada' && x.id === id);
  if (!l || l.tipo !== 'parada') return null;
  return { nome: l.nome, apoio: l.apoio, hora: l.hora };
}
