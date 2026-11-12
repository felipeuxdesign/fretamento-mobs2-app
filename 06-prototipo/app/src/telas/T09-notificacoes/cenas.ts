// T09 · Notificações: as cenas, uma por referência. A lista é a do mock; o caso diz o que já foi lido, o que
// está aberto, a permissão do celular e a rede.
import { mock, type CodigoDaTela } from '@/dados';

export type TipoDeAviso = 'saiu' | 'comunicado' | 'chegando' | 'atraso' | 'cadastro' | 'cancelada' | 'trocado';
export interface Aviso {
  id: number;
  dia: string;
  tipo: TipoDeAviso;
  titulo: string;
  texto: string;
  hora: string;
  lida: boolean;
}
/** O texto com os espaços que não quebram: depois de "às" e de "Av." */
const firme = (t: string) => t.replace(/às (\d)/g, 'às $1').replace(/Av\. /g, 'Av. ');
export const AVISOS: Aviso[] = (mock.notificacoes as Omit<Aviso, 'id'>[]).map((a, id) => ({ ...a, id, texto: firme(a.texto) }));

/** O disco de cada tipo: o glifo e a cor do estado. A cor não mora no dado: o tipo escolhe o token. */
export const DISCO: Record<TipoDeAviso, { icone: string; tom: 'ok' | 'in' | 'wa' | 'dg' | 'neutro' }> = {
  chegando: { icone: 'aviso-tocando', tom: 'ok' },
  saiu: { icone: 'saiu', tom: 'in' },
  trocado: { icone: 'onibus-trocado', tom: 'in' },
  comunicado: { icone: 'info', tom: 'in' },
  atraso: { icone: 'atrasado', tom: 'wa' },
  cancelada: { icone: 'cancelada', tom: 'dg' },
  cadastro: { icone: 'cadastro', tom: 'neutro' },
};
/** Os avisos da transportadora abrem o texto completo; os de viagem levam ao Início. */
export const DA_TRANSPORTADORA: TipoDeAviso[] = ['comunicado', 'cancelada'];
/** Para onde o toque leva quando não é o Início: o aviso de cadastro abre o Perfil (08-handoff/api.md). */
export const DESTINO: Partial<Record<TipoDeAviso, CodigoDaTela>> = { cadastro: 'T10' };

export interface CenaT09 {
  /** os avisos já lidos, além dos que o mock traz lidos; 'todas' depois de "Marcar todas como lidas" */
  lidas: number[] | 'todas';
  /** o aviso da transportadora aberto no sheet */
  aberto?: number;
  vazio?: boolean;
  banner?: 'avisos-desligados' | 'sem-internet';
  /** o aviso chegando com o app fechado: na tela de bloqueio, ou no topo da tela inicial do celular */
  noCelular?: 'bloqueado' | 'em-uso';
}

export const DO_FLUXO: CenaT09 = { lidas: [] };
const CANCELADA = AVISOS.find((a) => a.tipo === 'cancelada')!;

export const CENAS: Record<string, CenaT09> = {
  'T09-00': DO_FLUXO,
  'T09-01': { lidas: 'todas' },
  'T09-02': { lidas: [], aberto: CANCELADA.id },
  'T09-03': { lidas: 'todas', vazio: true },
  'T09-04': { lidas: [], banner: 'avisos-desligados' },
  'T09-05': { lidas: [], banner: 'sem-internet' },
  'T09-06': { lidas: [], noCelular: 'bloqueado' },
  'T09-07': { lidas: [], noCelular: 'em-uso' },
};

export const foiLida = (cena: CenaT09, a: Aviso) => a.lida || cena.lidas === 'todas' || cena.lidas.includes(a.id);
export const naoLidas = (cena: CenaT09) => AVISOS.filter((a) => !foiLida(cena, a)).length;

const ONTEM = AVISOS.find((a) => a.tipo === 'chegando')!;
const SAIU = AVISOS[0];
export const TEXTOS = {
  titulo: 'Notificações',
  marcar: 'Marcar todas como lidas',
  preferencias: { titulo: 'Preferências de avisos', apoio: 'Escolha quando ser avisado' },
  vazio: { titulo: 'Sem notificações', texto: 'Avisos sobre suas viagens aparecem aqui.' },
  banners: {
    'avisos-desligados': { icone: 'avisos-desligados', texto: 'Avisos desligados no celular. Você não recebe os alertas da viagem.', acao: 'Ativar' },
    'sem-internet': { icone: 'sem-internet', texto: 'Sem internet. Mostrando o que o app já tinha.', acao: undefined },
  },
  /** o aviso completo da transportadora: quem mandou, quando, e o texto inteiro */
  completo: {
    [CANCELADA.id]: {
      de: `${mock.transportadora.nome} · ${CANCELADA.hora}, 15:40`,
      texto: `A volta das 17:20 foi cancelada por falta de veículo. A ${mock.empresa.nome} liberou a saída às 16:30 e o vale-transporte do dia.`,
    },
  } as Record<number, { de: string; texto: string }>,
  fechar: 'Fechar',
  bloqueio: {
    data: 'terça-feira, 27 de outubro',
    hora: '6:32',
    avisos: [
      { titulo: ONTEM.titulo, texto: ONTEM.texto, quando: 'agora' },
      { titulo: SAIU.titulo, texto: SAIU.texto, quando: SAIU.hora },
    ],
  },
  emUso: { titulo: 'Ônibus atrasado 8 min', texto: 'Nova previsão no seu ponto: 06:50.', quando: 'agora' },
};
