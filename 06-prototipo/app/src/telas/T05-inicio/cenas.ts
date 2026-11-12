// T05 · Início: as cenas, uma por referência. Cada cena é o caso: o que muda sobre a semente das 06:24
// (a hora, a fase da viagem, o sinal, a rede, o que o servidor respondeu). Os nomes, as placas, os horários do
// cadastro e as contagens vêm do mock; a previsão de cada caso é o número escrito no caso.
import { mock, minutos, somar, relativo, pessoasQueEmbarcam, prefixoEPlaca } from '@/dados';
import type { TipoDeSelo } from '@/ds/selo/Selo';
import type { Trecho } from '@/ds/trilho/Trilho';
import { antesDoEmbarque, margemPara, type Momento } from '@/estado/dia';
import { oOnibusDiz } from '@/telas/T06-paradas/cenas';

const P = Object.fromEntries(mock.paradasDaIda.map((p) => [p.id, p]));
export const SEMPRE = mock.paradasDaIda.find((p) => p.pontoDeSempre)!;
export const DESTINO = mock.paradasDaIda.find((p) => p.destino)!;
const [IDA, OUTRA_IDA, VOLTA] = mock.viagens;
const semente = mock.sementeDoCaminhoFeliz;
const R = mock.regras;
const ONIBUS = `ônibus ${prefixoEPlaca(mock.onibus)}`;
const TROCADO = `ônibus ${prefixoEPlaca(mock.onibusTrocado)}`;
export const PLACA = prefixoEPlaca(mock.onibus);
const NORTE = P['av-norte'];
// o espaço que não quebra depois de "Av." e antes do número, como nas Paradas
const nb = (nome: string) => nome.replace('Av. ', 'Av. ');

export const pessoas = (n: number) => pessoasQueEmbarcam(n);
const ICONE_DO_TIPO: Record<string, string> = { terminal: 'terminal', comercio: 'comercio', ponto: 'ponto', fabrica: 'fabrica' };

export interface LinhaDaCena {
  tipo: 'parada' | 'onibus' | 'grupo';
  id?: string;
  texto?: string;
  icone?: string;
  minha?: boolean;
  cheia?: boolean;
  passada?: boolean;
  forte?: boolean;
  /** a hora em tinta-apagada, sem o nome apagado (os horários programados) */
  horaApagada?: boolean;
  papel?: string;
  apoio?: string;
  hora?: string;
  sob?: string;
  apagado?: boolean;
  cima?: Trecho;
  baixo?: Trecho;
}

interface OpcoesDaParada {
  hora?: string;
  sob?: string;
  /** mostra a contagem de quem embarca: a do mock, ou a do caso quando ele diz outra */
  apoio?: boolean | number;
  passada?: boolean;
  minha?: boolean;
  papel?: string;
  primeira?: boolean;
  ultima?: boolean;
  cheia?: boolean;
  icone?: string;
  horaApagada?: boolean;
}
/** Uma parada do trilho, a partir do mock. O caso diz a previsão e o que aparece. */
function parada(id: string, o: OpcoesDaParada = {}): LinhaDaCena {
  const p = P[id];
  // cheio é o disco das pontas da viagem: a origem e o destino. Um terminal no meio do trajeto é um ponto como os outros
  const ponta = mock.paradasDaIda[0].id === id || !!(p as { destino?: boolean }).destino;
  const cheia = o.cheia ?? ponta;
  const previstos = typeof o.apoio === 'number' ? o.apoio : (p as { previstos?: number | null }).previstos;
  return {
    tipo: 'parada',
    id,
    texto: nb(p.nome!),
    icone: o.icone ?? (o.minha ? 'pessoa' : ponta ? ICONE_DO_TIPO[p.tipo] : p.tipo === 'terminal' ? 'ponto' : ICONE_DO_TIPO[p.tipo]),
    minha: o.minha,
    cheia: cheia && !(o.minha && p.tipo === 'ponto'),
    passada: o.passada,
    forte: o.minha && !o.passada,
    horaApagada: o.horaApagada,
    papel: o.papel,
    apoio: o.apoio && previstos != null ? pessoas(previstos) : undefined,
    hora: o.hora ?? (p as { programado?: string }).programado,
    sob: o.sob,
    cima: o.primeira ? null : o.passada ? 'passado' : 'ida',
    baixo: o.ultima ? null : o.passada ? 'passado' : 'ida',
  };
}
const onibus = (texto: string, o: { cima?: Trecho; apagado?: boolean } = {}): LinhaDaCena => ({ tipo: 'onibus', texto, apagado: o.apagado, cima: o.cima === undefined ? 'passado' : o.cima, baixo: 'ida' });
const GRUPO: LinhaDaCena = { tipo: 'grupo', texto: `${mock.paradasDaIda.filter((p) => p.agrupada).length} outras paradas` };
const INDO = `Indo para a ${NORTE.nome}`;

export interface SeloDaCena {
  tipo: TipoDeSelo;
  icone?: string;
  texto: string;
}
export type BlocoDoHeroi =
  | { bloco: 'placa' }
  | { bloco: 'botao'; texto: string; variante: 'primario' | 'secundario'; icone?: string; acao: Acao }
  | { bloco: 'apoio'; texto: string }
  | { bloco: 'confirma'; texto: string }
  | { bloco: 'info'; texto: string }
  | { bloco: 'link'; texto: string; acao: Acao };
export type Acao = 'embarcar' | 'nao-embarquei' | 'nao-fui-eu' | 'pontos-a-frente' | 'ver-outra-ida' | 'voltar-a-ida-de-sempre' | 'acompanhar' | null;
export type IdDoBanner = 'desvio' | 'cracha-em-outro' | 'sem-internet' | 'trocado' | 'avisos-desligados' | 'sem-bloqueio';
export type OutraViagem = 'volta' | 'outra-ida' | 'ida-de-sempre';

export interface CenaT05 {
  /** a hora do caso, no relógio fixo */
  hora: string;
  /** sem internet, o que se vê é o dado guardado: os tempos relativos contam a partir da hora dele, e não do agora */
  dadoDe?: string;
  saudacao: string;
  naoLidos: number;
  /** o que a tela é quando não é a viagem: sem viagem hoje, erro ao abrir, carregando */
  especial?: 'sem-viagem' | 'erro' | 'carregando';
  banners: IdDoBanner[];
  heroi: {
    forma: 'normal' | 'destaque' | 'perigo';
    viagem: string;
    divisoria: boolean;
    alvo: string;
    antes?: string;
    numero: string;
    tom?: 'apagado' | 'riscado';
    complemento?: string;
    selos: SeloDaCena[];
    aoLado?: string;
    ajuda?: string;
    blocos: BlocoDoHeroi[];
  };
  /** o cartão da troca de ponto ativa */
  troca?: { ponto: string; sempre: string; /** o ônibus já está em cima do ponto de sempre: não dá mais para voltar a ele */ semVolta?: boolean };
  trilho?: { titulo: string; linhas: LinhaDaCena[] };
  mapa?: string;
  /** o atalho "Outro ponto hoje": o apoio dele, e se está indisponível */
  outroPonto?: { apoio: string; indisponivel?: boolean };
  outras: OutraViagem[];
  sheet?: 'voltar-ao-ponto' | 'nao-fui-eu' | 'religar';
  rolada?: boolean;
}

const AO_VIVO: SeloDaCena = { tipo: 'ao-vivo', texto: 'Ao vivo' };
const PROGRAMADO: SeloDaCena = { tipo: 'forte', icone: 'programado', texto: 'Programado' };
const REGISTRADO = (quando: string): SeloDaCena[] => [{ tipo: 'registrado', icone: 'embarquei', texto: `Embarcou às ${quando}` }, { tipo: 'ao-vivo-neutro', texto: 'Ao vivo' }];
const ALVO_PONTO = `Passa no seu ponto · ${SEMPRE.nome}`;
const ALVO_FABRICA = `Chega na fábrica · ${DESTINO.nome}`;
const TITULO = 'Próximas paradas';
const TITULO_PROGRAMADO = 'Paradas · horários programados';
/** quantas pessoas embarcam na volta, no ponto da pessoa: o número do caso da T05-17 */
const PREVISTOS_NA_VOLTA = 18;

/** A semente do caminho feliz: 06:24, a ida de sempre em rota, no horário, o ônibus entre o Mercado e a Av. Norte. */
const SEMENTE: CenaT05 = {
  hora: semente.hora,
  saudacao: 'Bom dia',
  naoLidos: semente.avisosNaoLidos,
  banners: [],
  heroi: {
    forma: 'normal',
    viagem: `${IDA.rotulo} · ${ONIBUS}`,
    divisoria: true,
    alvo: ALVO_PONTO,
    numero: `${semente.minutosAteOSeuPonto} min`,
    complemento: `às ${SEMPRE.programado}`,
    // "No horário" só entra na exceção (atrasado ou adiantado). No normal, o "Ao vivo" basta
    selos: [AO_VIVO],
    blocos: [],
  },
  trilho: {
    titulo: TITULO,
    linhas: [
      parada('casa-amarela', { passada: true, sob: 'passou', primeira: true }),
      onibus(INDO),
      parada('av-norte', { apoio: true, sob: '7 min' }),
      GRUPO,
      parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, sob: `${semente.minutosAteOSeuPonto} min` }),
      parada('fabrica', { papel: 'Destino', sob: '51 min', ultima: true }),
    ],
  },
  mapa: 'Ônibus a 2 pontos do seu',
  outroPonto: { apoio: 'Só hoje' },
  outras: ['volta', 'outra-ida'],
};

const com = (parte: Partial<CenaT05>, heroi: Partial<CenaT05['heroi']> = {}): CenaT05 => ({ ...SEMENTE, ...parte, heroi: { ...SEMENTE.heroi, ...heroi } });
const linhasDe = (base: CenaT05) => base.trilho!.linhas;
const EMBARQUEI_2: BlocoDoHeroi = { bloco: 'botao', texto: 'Embarquei', variante: 'secundario', icone: 'embarquei', acao: 'embarcar' };
const EMBARQUEI_1: BlocoDoHeroi = { bloco: 'botao', texto: 'Embarquei', variante: 'primario', icone: 'embarquei', acao: 'embarcar' };

// depois do embarque: o ônibus segue, e o que aparece são os pontos à frente
const A_BORDO: LinhaDaCena[] = [onibus(`Indo para a ${P['av-recife'].nome}`, { cima: null }), parada('av-recife'), parada('barro', { apoio: true }), linhasDe(SEMENTE)[5]];
// a hora do embarque está no selo ("Embarcou às 06:44"): a frase de baixo não repete
const semAHora = (nota: string) => nota.replace(/^Você embarcou às \d\d:\d\d\.\s*/, '');
const aBordo = (hora: string, min: number, nota: string, link: string, acao: Acao, linhas: LinhaDaCena[] = A_BORDO, embarque: string = HORA_DO_EMBARQUE): CenaT05 =>
  com(
    { hora, trilho: { titulo: TITULO, linhas }, mapa: 'A caminho da fábrica', outroPonto: undefined, outras: ['volta'] },
    { alvo: ALVO_FABRICA, numero: `${min} min`, complemento: `às ${DESTINO.programado}`, selos: REGISTRADO(embarque), blocos: [...(semAHora(nota) ? [{ bloco: 'confirma' as const, texto: semAHora(nota) }] : []), { bloco: 'link', texto: link, acao }] },
  );
const HORA_DO_EMBARQUE = somar(SEMPRE.programado!, 2);

const programada = (o: { hora: string; viagem?: string; ajuda: string; mapa: string; saida?: string; ponto?: string; passou?: string }): CenaT05 => {
  const d = o.saida ? (h: string) => somar(h, 60) : (h: string) => h;
  const prog = { sob: 'prog.', horaApagada: true };
  return com(
    {
      hora: o.hora,
      trilho: {
        titulo: TITULO_PROGRAMADO,
        linhas: o.passou
          ? [parada('casa-amarela', { passada: true, apoio: true, hora: o.passou, sob: 'passou', primeira: true }), onibus(INDO), parada('av-norte', { apoio: true, ...prog }), GRUPO, parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, ...prog }), parada('fabrica', { papel: 'Destino', ultima: true, ...prog })]
          : [
              parada('macaxeira', { apoio: 5, hora: d(P.macaxeira.programado!), primeira: true, ...prog }),
              parada('casa-amarela', { apoio: true, hora: d(somar(P['casa-amarela'].programado!, -1)), ...prog }),
              parada('av-norte', { apoio: true, hora: d(NORTE.programado!), ...prog }),
              GRUPO,
              parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, hora: d(SEMPRE.programado!), ...prog }),
              parada('fabrica', { papel: 'Destino', hora: d(DESTINO.programado!), ultima: true, ...prog }),
            ],
      },
      mapa: o.mapa,
    },
    { viagem: o.viagem ?? SEMENTE.heroi.viagem, numero: o.ponto ?? SEMPRE.programado!, tom: 'apagado', complemento: 'horário programado', selos: [PROGRAMADO], ajuda: o.ajuda },
  );
};

const deslocada = (hora: string, min: number, passou: string, onibusDiz = INDO): LinhaDaCena[] => [
  parada('casa-amarela', { passada: true, apoio: true, hora: passou, sob: 'passou', primeira: true }),
  onibus(onibusDiz),
  parada('av-norte', { apoio: true, hora: somar(NORTE.programado!, min) }),
  GRUPO,
  parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, hora: somar(SEMPRE.programado!, min), sob: relativo(hora, somar(SEMPRE.programado!, min)) }),
  parada('fabrica', { papel: 'Destino', hora: somar(DESTINO.programado!, min), ultima: true }),
];

/** Os pontos à frente do ônibus, com nome, na ordem do trajeto: dizem a quantos pontos o ônibus está do seu. */
const A_FRENTE = mock.paradasDaIda.filter((p) => !p.agrupada && !p.destino).slice(2);
/** O Início com a troca de ponto de hoje ativa: o ponto de hoje no herói, no cartão da troca e no trilho. */
export const cenaDaTroca = (id: string, min: number = minutos(P[id].programado!) - minutos(semente.hora)): CenaT05 => {
  const hoje = P[id];
  const pontos = A_FRENTE.findIndex((p) => p.id === id) + 1;
  const deHoje = parada(id, { minha: true, papel: 'Seu ponto hoje', apoio: hoje.previstos! + 1 });
  const deSempre = parada('abdias', { papel: 'Ponto de sempre', apoio: SEMPRE.previstos! - 1 });
  return com(
    {
      troca: { ponto: hoje.nome!, sempre: SEMPRE.nome! },
      trilho: {
        titulo: TITULO,
        linhas: id === NORTE.id ? [linhasDe(SEMENTE)[0], linhasDe(SEMENTE)[1], deHoje, GRUPO, deSempre, linhasDe(SEMENTE)[5]] : [linhasDe(SEMENTE)[0], linhasDe(SEMENTE)[1], linhasDe(SEMENTE)[2], GRUPO, deSempre, deHoje, linhasDe(SEMENTE)[5]],
      },
      mapa: pontos === 1 ? 'O próximo ponto do ônibus é o seu' : `Ônibus a ${pontos} pontos do seu`,
    },
    { alvo: `Passa no seu ponto hoje · ${hoje.nome}`, numero: `${min} min`, complemento: `às ${hoje.programado}` },
  );
};
const TROCA_ATIVA = (min: number): CenaT05 => cenaDaTroca(NORTE.id, min);

export const CENAS: Record<string, CenaT05> = {
  'T05-00': SEMENTE,
  'T05-05': { ...SEMENTE, rolada: true },
  'T05-01': com(
    { hora: somar(SEMPRE.programado!, -1), trilho: { titulo: TITULO, linhas: [GRUPO, onibus('Chegando no seu ponto'), parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, sob: '1 min' }), parada('fabrica', { papel: 'Destino', sob: '34 min', ultima: true })] }, mapa: 'O próximo ponto do ônibus é o seu' },
    { forma: 'destaque', viagem: IDA.rotulo, divisoria: false, numero: 'Chegando', complemento: undefined, selos: [AO_VIVO], aoLado: `menos de ${R.chegandoMin} min`, blocos: [{ bloco: 'placa' }, EMBARQUEI_2, { bloco: 'apoio', texto: 'Toque quando subir: a transportadora sabe que você está a bordo.' }] },
  ),
  'T05-02': com(
    { hora: SEMPRE.programado!, trilho: { titulo: TITULO, linhas: [onibus('No seu ponto', { cima: null }), parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, sob: 'agora' }), parada('av-recife'), parada('fabrica', { papel: 'Destino', sob: '33 min', ultima: true })] }, mapa: 'Ônibus no seu ponto' },
    { forma: 'destaque', viagem: IDA.rotulo, divisoria: false, alvo: `Parado no seu ponto · ${SEMPRE.nome}`, numero: 'No ponto', complemento: undefined, selos: [AO_VIVO], blocos: [{ bloco: 'placa' }, EMBARQUEI_1] },
  ),
  'T05-03': aBordo(HORA_DO_EMBARQUE, 31, `Você embarcou às ${HORA_DO_EMBARQUE}.`, 'Não embarquei', 'nao-embarquei'),
  'T05-04': com({ hora: '07:17', trilho: undefined, mapa: undefined, outroPonto: undefined, outras: ['volta'] }, { alvo: DESTINO.nome!, numero: 'Chegou', complemento: 'às 07:16', selos: [{ tipo: 'neutro', icone: 'no-horario', texto: 'Viagem concluída' }] }),
  'T05-06': {
    ...programada({ hora: semente.hora, viagem: `Ida ${OUTRA_IDA.sai} · ônibus a definir`, ajuda: '', mapa: 'Aparece quando a viagem começar', saida: OUTRA_IDA.sai, ponto: OUTRA_IDA.passaNoSeuPonto }),
    outroPonto: undefined,
    outras: ['ida-de-sempre', 'volta'],
    heroi: {
      ...programada({ hora: semente.hora, viagem: `Ida ${OUTRA_IDA.sai} · ônibus a definir`, ajuda: '', mapa: '', saida: OUTRA_IDA.sai, ponto: OUTRA_IDA.passaNoSeuPonto }).heroi,
      ajuda: undefined,
      blocos: [
        { bloco: 'info', texto: `Esta não é a sua viagem. Sua ida de sempre é a das ${IDA.sai}, que passa no seu ponto em ${semente.minutosAteOSeuPonto} min.` },
        { bloco: 'link', texto: 'Voltar para a ida de sempre', acao: 'voltar-a-ida-de-sempre' },
      ],
    },
  },
  'T05-07': TROCA_ATIVA(7),
  'T05-08': { ...TROCA_ATIVA(6), hora: somar(semente.hora, 1), sheet: 'voltar-ao-ponto' },
  'T05-09': programada({ hora: '05:50', ajuda: `A previsão ao vivo começa quando o ônibus sair, às ${IDA.sai}.`, mapa: 'Aparece quando a viagem começar' }),
  'T05-12': com({ hora: '06:30', naoLidos: 3, trilho: { titulo: TITULO, linhas: deslocada('06:30', 8, '06:21') } }, { numero: '20 min', complemento: `às ${somar(SEMPRE.programado!, 8)}`, selos: [AO_VIVO, { tipo: 'atraso', icone: 'atrasado', texto: 'Atrasado 8 min' }] }),
  'T05-13': com({ hora: '06:26', trilho: { titulo: TITULO, linhas: deslocada('06:26', -4, '06:09') } }, { numero: '12 min', complemento: `às ${somar(SEMPRE.programado!, -4)}`, selos: [AO_VIVO, { tipo: 'adiantado', icone: 'adiantado', texto: 'Adiantado 4 min' }], ajuda: 'O ônibus está na frente do horário. Vá para o ponto agora.' }),
  'T05-18': com({ hora: '06:30' }, { antes: 'cerca de', numero: '12 min', selos: [{ tipo: 'aproximado', icone: 'aproximado', texto: 'Aproximado · há 2 min' }], ajuda: 'A posição do ônibus está demorando a chegar. Saia com folga.' }),
  'T05-19': com({ hora: '06:28', banners: ['desvio'], trilho: { titulo: TITULO, linhas: deslocada('06:28', 2, '06:15', 'Fora do trajeto previsto') }, mapa: 'Veja por onde o ônibus está passando' }, { antes: 'cerca de', numero: '16 min', complemento: `às ${somar(SEMPRE.programado!, 2)}` }),
  'T05-14': com(
    { hora: '06:45', trilho: { titulo: TITULO, linhas: [parada('abdias', { minha: true, passada: true, papel: 'Seu ponto', apoio: true, hora: HORA_DO_EMBARQUE, sob: 'passou', primeira: true }), onibus(`Indo para a ${P['av-recife'].nome}`), parada('av-recife'), parada('barro', { apoio: true }), linhasDe(SEMENTE)[5]] }, mapa: 'A caminho da fábrica', outroPonto: { apoio: 'Pontos à frente' } },
    { alvo: ALVO_FABRICA, numero: '30 min', complemento: `às ${DESTINO.programado}`, selos: [AO_VIVO, { tipo: 'apagado', icone: 'confirmado', texto: `Passou no seu ponto às ${HORA_DO_EMBARQUE}` }], blocos: [EMBARQUEI_2, { bloco: 'link', texto: 'Perdeu o ônibus? Ver pontos à frente', acao: 'pontos-a-frente' }] },
  ),
  'T05-15': aBordo(HORA_DO_EMBARQUE, 31, `Você embarcou às ${HORA_DO_EMBARQUE}. Seu crachá foi lido no ônibus ${mock.onibus.prefixo}.`, 'Não fui eu', 'nao-fui-eu'),
  'T05-16': { ...aBordo('06:45', 30, `Você embarcou às ${HORA_DO_EMBARQUE}. Seu crachá foi lido no ônibus ${mock.onibus.prefixo}.`, 'Não fui eu', 'nao-fui-eu'), sheet: 'nao-fui-eu' },
  'T05-17': com(
    {
      hora: '17:21',
      saudacao: 'Boa tarde',
      trilho: {
        titulo: TITULO,
        linhas: [
          onibus('No seu ponto', { cima: null }),
          { ...parada('fabrica', { minha: true, papel: 'Seu embarque', apoio: PREVISTOS_NA_VOLTA, hora: '17:21', sob: 'agora', icone: 'fabrica' }), cheia: true },
          GRUPO,
          { ...parada('abdias', { papel: 'Sua descida', hora: VOLTA.chegaNaDescida, sob: '33 min', ultima: true }), cheia: true },
        ],
      },
      mapa: 'Ônibus no seu ponto',
      outras: [],
    },
    { forma: 'destaque', viagem: VOLTA.rotulo, divisoria: false, alvo: `Parado no seu embarque · ${VOLTA.embarque}`, numero: 'No ponto', complemento: undefined, selos: [AO_VIVO], blocos: [{ bloco: 'placa' }, EMBARQUEI_1] },
  ),
  'T05-20': {
    ...programada({ hora: '06:30', ajuda: 'Não recebemos a posição do ônibus. No último sinal ele estava 4 min atrasado. Saia com folga.', mapa: 'Última posição às 06:21', passou: P['casa-amarela'].programado }),
    trilho: {
      titulo: TITULO_PROGRAMADO,
      linhas: [linhasDe(SEMENTE)[0], onibus('Último sinal às 06:21', { apagado: true }), parada('av-norte', { apoio: true, sob: 'prog.', horaApagada: true }), GRUPO, parada('abdias', { minha: true, papel: 'Seu ponto', apoio: true, sob: 'prog.', horaApagada: true }), parada('fabrica', { papel: 'Destino', ultima: true, sob: 'prog.', horaApagada: true })],
    },
    heroi: { ...programada({ hora: '06:30', ajuda: 'Não recebemos a posição do ônibus. No último sinal ele estava 4 min atrasado. Saia com folga.', mapa: '' }).heroi, selos: [{ tipo: 'sem-sinal', icone: 'sem-sinal', texto: 'Sem sinal há 9 min' }] },
  },
  'T05-21': com({ hora: '06:36', dadoDe: semente.hora, banners: ['sem-internet'], mapa: `Dados de ${semente.hora}`, outroPonto: { apoio: 'Indisponível sem internet', indisponivel: true } }, { numero: '06:45', tom: 'apagado', complemento: `previsão feita às ${semente.hora}`, selos: [{ tipo: 'sem-sinal', icone: 'sem-internet', texto: 'Sem internet' }], ajuda: 'Seu celular está sem internet. Quando voltar, a previsão atualiza sozinha.' }),
  'T05-26': com(
    { hora: '05:40', naoLidos: 3, trilho: undefined, mapa: undefined, outroPonto: undefined, outras: ['outra-ida', 'volta'] },
    { forma: 'perigo', viagem: IDA.rotulo, numero: SEMPRE.programado!, tom: 'riscado', complemento: undefined, selos: [{ tipo: 'perigo', icone: 'cancelada', texto: 'Viagem cancelada' }], ajuda: `Aviso da ${mock.transportadora.nomeCurto}: “Manutenção do ônibus. A viagem das ${OUTRA_IDA.sai} está mantida.”`, blocos: [{ bloco: 'botao', texto: `Ver a viagem das ${OUTRA_IDA.sai}`, variante: 'primario', acao: 'ver-outra-ida' }] },
  ),
  'T05-10': programada({ hora: '06:07', viagem: `${IDA.rotulo} · ônibus a definir`, ajuda: 'A transportadora ainda não definiu o ônibus desta viagem. Avisamos quando ele sair.', mapa: 'Aparece quando o ônibus sair' }),
  'T05-27': { ...programada({ hora: semente.hora, ajuda: 'Por enquanto, mostramos o horário programado desta viagem.', mapa: SEMENTE.mapa!, passou: '06:18' }) },
  'T05-23': com({ naoLidos: 3, banners: ['trocado'] }, { viagem: `${IDA.rotulo} · ${TROCADO}` }),
  'T05-24': com({ naoLidos: 3, banners: ['cracha-em-outro'] }),
  'T05-25': com({ naoLidos: 3, outroPonto: undefined }, { blocos: [{ bloco: 'confirma', texto: `Você embarcou no ônibus ${mock.onibusTrocado.prefixo} às ${semente.hora}. A previsão desse ônibus não aparece no app.` }, { bloco: 'link', texto: 'Voltar a acompanhar esta viagem', acao: 'acompanhar' }] }),
  'T05-28': com({ banners: ['avisos-desligados'] }),
  'T05-29': com({ banners: ['sem-bloqueio'] }),
  'T05-30': com({ sheet: 'religar' }),
  'T05-31': { ...SEMENTE, hora: semente.hora, naoLidos: 0, especial: 'sem-viagem' },
  'T05-22': { ...SEMENTE, especial: 'erro' },
  'T05-11': { ...SEMENTE, especial: 'carregando' },
};

/** O Início num momento do dia que não é o de sempre: com a troca de ponto ativa, em qualquer passo, ou depois dela.
    São os mesmos quadros do dia (em rota, chegando, no ponto, a bordo), com o ponto de hoje no lugar do de sempre. A
    hora, onde o ônibus está e os tempos saem do momento e do horário de cada parada. */
export function cenaDoMomento(m: Momento): CenaT05 {
  const nomeadas = mock.paradasDaIda.filter((p) => !p.agrupada);
  const indice = (id: string) => nomeadas.findIndex((p) => p.id === id);
  const hoje = P[m.ponto];
  const iOnibus = indice(m.onibus.parada);
  const iHoje = indice(m.ponto);
  // quem trocou sai da contagem do ponto de sempre e entra na do ponto de hoje
  const previstos = (id: string) => (P[id].previstos as number) + (m.trocado ? (id === m.ponto ? 1 : id === SEMPRE.id ? -1 : 0) : 0);
  const sob = (id: string) => relativo(m.hora, P[id].programado!);
  const linha = (id: string): LinhaDaCena => {
    if (id === DESTINO.id) return parada(id, { papel: 'Destino', sob: sob(id), ultima: true });
    if (id === m.ponto && antesDoEmbarque(m)) return parada(id, { minha: true, papel: m.trocado ? 'Seu ponto hoje' : 'Seu ponto', apoio: previstos(id), sob: sob(id) });
    return parada(id, { papel: id === SEMPRE.id && m.trocado && antesDoEmbarque(m) ? 'Ponto de sempre' : undefined, apoio: previstos(id), sob: id === m.onibus.parada ? sob(id) : undefined });
  };
  // o trilho do Início é o resumo: o ônibus, a parada em que ele está chegando, o ponto de sempre, o de hoje e o destino.
  // Parado no ponto, entra a parada seguinte; a bordo, as duas que vêm
  const quais = new Set<string>([m.onibus.parada, DESTINO.id]);
  if (antesDoEmbarque(m)) {
    quais.add(m.ponto);
    if (m.trocado && indice(SEMPRE.id) >= iOnibus) quais.add(SEMPRE.id);
    if (m.fase === 'no-ponto') quais.add(nomeadas[iHoje + 1].id);
  } else quais.add(nomeadas[Math.min(iOnibus + 1, nomeadas.length - 1)].id);
  const linhas: LinhaDaCena[] = [onibus(oOnibusDiz(m), { cima: null })];
  nomeadas.slice(iOnibus).forEach((p) => {
    if (!quais.has(p.id)) return;
    linhas.push(linha(p.id));
    if (p.id === NORTE.id) linhas.push(GRUPO);
  });
  const trilho = { titulo: TITULO, linhas };

  if (!antesDoEmbarque(m)) return aBordo(m.hora, minutos(DESTINO.programado!) - minutos(m.hora), '', 'Não embarquei', 'nao-embarquei', linhas, m.hora);

  const troca = m.trocado ? { ponto: hoje.nome!, sempre: SEMPRE.nome!, semVolta: margemPara(SEMPRE.id, m.hora) !== 'da-tempo' } : undefined;
  const lugar = m.trocado ? `no seu ponto hoje · ${hoje.nome}` : `no seu ponto · ${hoje.nome}`;
  if (m.fase === 'chegando') return { ...CENAS['T05-01'], hora: m.hora, troca, trilho, heroi: { ...CENAS['T05-01'].heroi, alvo: `Passa ${lugar}` } };
  if (m.fase === 'no-ponto') return { ...CENAS['T05-02'], hora: m.hora, troca, trilho, heroi: { ...CENAS['T05-02'].heroi, alvo: `Parado ${lugar}` } };
  // em rota: quantos pontos nomeados o ônibus ainda tem até o de hoje
  const pontos = iHoje - iOnibus + (m.onibus.estado === 'parado' ? 0 : 1);
  return com({ hora: m.hora, troca, trilho, mapa: pontos === 1 ? 'O próximo ponto do ônibus é o seu' : `Ônibus a ${pontos} pontos do seu` }, { alvo: `Passa ${lugar}`, numero: sob(m.ponto), complemento: `às ${hoje.programado}` });
}

/** O cartão da ida de sempre, em "Outras viagens de hoje", acompanha o dia: a frase é a do passo em que a ida está. */
export function apoioDaIdaDeSempre(m: Momento): string {
  if (m.fase === 'em-rota') return `Passa no seu ponto em ${relativo(m.hora, P[m.ponto].programado!)} · ao vivo`;
  if (m.fase === 'chegando') return 'Chegando no seu ponto · ao vivo';
  if (m.fase === 'no-ponto') return 'Ônibus no seu ponto · ao vivo';
  return 'A caminho da fábrica · ao vivo';
}
/** Na outra ida, o aviso de que esta não é a viagem da pessoa: o tempo até o ponto só entra enquanto a ida de sempre está em rota. */
export function avisoDaOutraIda(m: Momento): string {
  const base = `Esta não é a sua viagem. Sua ida de sempre é a das ${IDA.sai}`;
  return m.fase === 'em-rota' ? `${base}, que passa no seu ponto em ${relativo(m.hora, P[m.ponto].programado!)}.` : `${base}.`;
}

/** O texto de cada banner, e o nível dele. A ordem é a prioridade: desvio e crachá em outro ônibus primeiro. */
export const BANNERS: Record<IdDoBanner, { nivel: 'info' | 'atencao'; icone: string; texto: string; acoes?: string[]; fecha?: boolean }> = {
  desvio: { nivel: 'atencao', icone: 'desvio', texto: 'O ônibus saiu do trajeto previsto. A previsão pode mudar.' },
  'cracha-em-outro': { nivel: 'atencao', icone: 'cracha', texto: `Seu crachá foi lido às ${semente.hora} no ônibus ${mock.onibusTrocado.prefixo}.`, acoes: ['Fui eu', 'Não fui eu'] },
  'sem-internet': { nivel: 'info', icone: 'sem-internet', texto: `Sem internet. Mostrando dados de ${semente.hora}.` },
  trocado: { nivel: 'info', icone: 'onibus-trocado', texto: `Ônibus trocado. Hoje é o ${prefixoEPlaca(mock.onibusTrocado)}.`, fecha: true },
  'avisos-desligados': { nivel: 'info', icone: 'avisos-desligados', texto: 'Avisos desligados no celular. Você não recebe os alertas da viagem.', acoes: ['Ativar'] },
  'sem-bloqueio': { nivel: 'info', icone: 'sem-bloqueio', texto: 'Seu celular não tem bloqueio de tela. Ative para proteger suas viagens.', acoes: ['Abrir ajustes'], fecha: true },
};
export const ORDEM_DOS_BANNERS: IdDoBanner[] = ['desvio', 'cracha-em-outro', 'sem-internet', 'trocado', 'avisos-desligados', 'sem-bloqueio'];

/** A volta, vista antes da hora dela: o cartão "Sua volta hoje" leva a este quadro. Não tem referência desenhada: é
    montado com as peças da outra ida (o horário programado, o selo, a frase de quando a previsão começa) e com o dado
    da volta do mock. O ônibus da volta parado no ponto, às 17:21, é a T05-17. */
export const CENA_DA_VOLTA: CenaT05 = com(
  {
    hora: semente.hora,
    trilho: {
      titulo: TITULO_PROGRAMADO,
      linhas: [
        // o embarque é a ponta da viagem: o disco cheio, com o ícone da fábrica, como o destino da ida
        { ...parada('fabrica', { papel: 'Seu embarque', apoio: PREVISTOS_NA_VOLTA, hora: VOLTA.sai, sob: 'prog.', horaApagada: true, primeira: true }), forte: true },
        GRUPO,
        { ...parada('abdias', { papel: 'Sua descida', hora: VOLTA.chegaNaDescida, sob: 'prog.', horaApagada: true, ultima: true }), cheia: true },
      ],
    },
    mapa: 'Aparece quando a viagem começar',
    outroPonto: undefined,
    outras: ['ida-de-sempre', 'outra-ida'],
  },
  {
    viagem: `${VOLTA.rotulo} · ônibus a definir`,
    alvo: `Sai do seu embarque · ${VOLTA.embarque}`,
    numero: VOLTA.sai,
    tom: 'apagado',
    complemento: 'horário programado',
    selos: [PROGRAMADO],
    ajuda: `A previsão ao vivo começa quando o ônibus sair, às ${VOLTA.sai}.`,
    blocos: [{ bloco: 'link', texto: 'Voltar para a ida de sempre', acao: 'voltar-a-ida-de-sempre' }],
  },
);

export const OUTRAS: Record<OutraViagem, { cor: 'volta' | 'tinta' | 'vivo'; titulo: string; apoio: string }> = {
  volta: { cor: 'volta', titulo: `Sua volta hoje · ${VOLTA.sai}`, apoio: `Sai da ${VOLTA.embarque} · programado` },
  'outra-ida': { cor: 'tinta', titulo: `${OUTRA_IDA.rotulo} · ${OUTRA_IDA.sai}`, apoio: `Passa no seu ponto às ${OUTRA_IDA.passaNoSeuPonto}` },
  'ida-de-sempre': { cor: 'vivo', titulo: `Sua ida de sempre · ${IDA.sai}`, apoio: `Passa no seu ponto em ${semente.minutosAteOSeuPonto} min · ao vivo` },
};

export const TEXTOS = {
  sheets: {
    'voltar-ao-ponto': { titulo: `Voltar a embarcar na ${nb(SEMPRE.nome!)}?`, texto: `O ônibus passa lá às ${SEMPRE.programado}. A transportadora vai saber que você volta ao seu ponto de sempre.`, desiste: 'Cancelar', confirma: 'Voltar' },
    'nao-fui-eu': { titulo: 'Marcar como não foi você?', texto: `O embarque das ${HORA_DO_EMBARQUE} no ônibus ${mock.onibus.prefixo} fica marcado como contestado. Se o seu crachá estiver com outra pessoa, avise o RH da sua empresa.`, desiste: 'Cancelar', confirma: 'Marcar' },
    religar: { titulo: 'Ligar o desbloqueio de novo?', texto: 'A segurança do celular mudou, e o desbloqueio foi desligado. Ligue de novo para pedir o Face ID ao abrir o app.', desiste: 'Agora não', confirma: 'Ligar' },
  },
  semViagem: { titulo: 'Sem viagem hoje', proxima: ['Sua próxima viagem é segunda, 02/11, às', IDA.sai] as const },
  linhas: [
    { cor: undefined, titulo: `Linha ${mock.linha.numero} · ${IDA.rotulo} ${IDA.sai}`, apoio: [`Seu ponto: `, nb(SEMPRE.nome!), ` · seg a sex`] },
    { cor: 'volta' as const, titulo: `Linha ${mock.linha.numero} · ${VOLTA.rotulo} ${VOLTA.sai}`, apoio: [`Seu embarque: ${VOLTA.embarque} · seg a sex`] },
  ],
};
export { nb };
