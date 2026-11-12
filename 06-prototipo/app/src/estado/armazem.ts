// O estado único do protótipo. Um armazém só: a tela, as cenas, o parado, o tema, o vidro e o dia.
// O relógio é fixo: a hora vem da cena de cada tela, nunca do relógio de verdade.
import { useSyncExternalStore } from 'react';
import { mock, palco, telaDe, type CodigoDaTela } from '@/dados';
import { lerEndereco, escreverRef, type Endereco } from './endereco';

export type Aparencia = 'claro' | 'escuro' | 'sistema';
export type Tema = 'claro' | 'escuro';
export type Velocidade = '0,5×' | '1×' | '2×';
export type Permissao = 'nao-pediu' | 'permitida' | 'negada';

export interface Dia {
  /** 0 em rota · 1 chegando · 2 no ponto · 3 a bordo · 4 chegou */
  passo: number;
  /** as batidas do em rota nas Paradas: 0, 1 ou 2 */
  batida: number;
  tocando: boolean;
  /** o dia estava andando quando o app saiu das três telas: ao voltar, ele continua */
  retoma: boolean;
  velocidade: Velocidade;
  /** conta cada vez que um passo começa, para a trilha encher do zero */
  volta: number;
}

export interface Estado {
  endereco: Endereco;
  /** a tela em que o app está, no fluxo */
  tela: CodigoDaTela;
  /** por onde o fluxo passou, para o voltar */
  pilha: CodigoDaTela[];
  /** a referência em que o app está parado, ou nada quando está no fluxo */
  parado: string | null;
  /** o palco pediu a volta ao fluxo (tocaram no app parado) */
  pedeVolta: boolean;
  aparencia: Aparencia;
  celular: Tema;
  vidro: boolean;
  /** o que a vitrine do vidro deixa mexer: qualidade, reduzir transparência e reduzir movimento */
  preferenciasDoVidro: { qualidade: 'low' | 'medium' | 'high' | null; reduzirTransparencia: boolean; reduzirMovimento: boolean };
  dia: Dia;
  /** as cenas de cada tela, no fluxo. Cada tela define o formato da sua. */
  cenas: Partial<Record<CodigoDaTela, unknown>>;
  /** a sessão simulada */
  sessao: { entrou: boolean; desbloqueio: boolean; primeiroAcesso: boolean };
  /** o que o celular simulado deixa o app usar: a localização, pedida só quando a pessoa toca, e as notificações,
      pedidas no Começar do Preparar o app */
  permissoes: { localizacao: Permissao; notificacoes: Permissao };
}

const CHAVE_DA_APARENCIA = 'fretamento.aparencia';

function aparenciaGuardada(): Aparencia | null {
  try {
    const v = window.localStorage.getItem(CHAVE_DA_APARENCIA);
    return v === 'claro' || v === 'escuro' || v === 'sistema' ? v : null;
  } catch {
    return null;
  }
}

function inicial(): Estado {
  const endereco = lerEndereco();
  const telaDoRef = endereco.ref ? telaDe(endereco.ref) : undefined;
  const abre = palco.abreEm.tela as CodigoDaTela;
  return {
    endereco,
    tela: telaDoRef ?? abre,
    pilha: [],
    parado: endereco.ref,
    pedeVolta: false,
    aparencia: endereco.tema ?? aparenciaGuardada() ?? (mock.pessoa.aparencia as Aparencia),
    celular: endereco.celular,
    vidro: endereco.vidro,
    preferenciasDoVidro: { qualidade: null, reduzirTransparencia: false, reduzirMovimento: false },
    dia: { passo: 0, batida: 0, tocando: false, retoma: false, velocidade: palco.dia.velocidadePadrao as Velocidade, volta: 0 },
    cenas: {},
    // sem referência no endereço, o app abre no Entrar: ninguém entrou ainda, e é o primeiro acesso (o Preparar o app
    // vem depois do código). Parado numa referência, a sessão é a de quem já usa o app
    sessao: { entrou: !!telaDoRef || abre !== 'T01', desbloqueio: mock.pessoa.desbloqueio === 'biometria', primeiroAcesso: !telaDoRef && abre === 'T01' },
    permissoes: { localizacao: 'nao-pediu', notificacoes: 'nao-pediu' },
  };
}

let estado: Estado = inicial();
const ouvintes = new Set<() => void>();

export const ler = (): Estado => estado;

export function mudar(f: (e: Estado) => Partial<Estado>): void {
  const parte = f(estado);
  estado = { ...estado, ...parte };
  ouvintes.forEach((o) => o());
}

function assinar(o: () => void): () => void {
  ouvintes.add(o);
  return () => ouvintes.delete(o);
}

/** Lê um pedaço do estado. O seletor devolve um valor simples ou uma referência estável. */
export function usarEstado<T>(seletor: (e: Estado) => T): T {
  return useSyncExternalStore(assinar, () => seletor(estado));
}

export const temaDe = (e: Estado): Tema => (e.aparencia === 'sistema' ? e.celular : e.aparencia);
export const TELAS_DO_DIA = palco.dia.telas as CodigoDaTela[];
export const temTocador = (tela: CodigoDaTela): boolean => TELAS_DO_DIA.includes(tela);

/** Saindo das três telas do dia, ele pausa e guarda o passo. Voltando, continua de onde parou. */
function diaAoTrocarDeTela(e: Estado, para: CodigoDaTela): Dia {
  const sai = temTocador(e.tela) && !temTocador(para);
  const entra = !temTocador(e.tela) && temTocador(para);
  if (sai) return { ...e.dia, tocando: false, retoma: e.dia.tocando };
  if (entra && e.dia.retoma) return { ...e.dia, tocando: true, retoma: false };
  return e.dia;
}

// ── as ações que valem para o app inteiro ───────────────────────────────────

/** A Aparência do Perfil e o Modo claro do palco são a mesma chave. */
export function escolherAparencia(aparencia: Aparencia): void {
  try {
    window.localStorage.setItem(CHAVE_DA_APARENCIA, aparencia);
  } catch {
    /* sem armazenamento, a escolha vale só até recarregar */
  }
  mudar(() => ({ aparencia }));
}

/** Leva o app para uma tela, no fluxo. */
export function irPara(tela: CodigoDaTela, opcoes: { substituir?: boolean } = {}): void {
  mudar((e) => {
    if (e.tela === tela && !e.parado) return {};
    const pilha = opcoes.substituir ? e.pilha : [...e.pilha, e.tela];
    return { tela, pilha, parado: null, pedeVolta: false, dia: diaAoTrocarDeTela(e, tela) };
  });
  escreverRef(null);
}

/** Volta para o Início e esquece o caminho até aqui (a troca de ponto confirmada, o sair de uma tela funda). */
export function voltarAoInicio(): void {
  mudar((e) => ({ tela: 'T05', pilha: [], parado: null, pedeVolta: false, dia: diaAoTrocarDeTela(e, 'T05') }));
  escreverRef(null);
}

/** O voltar da barra: a tela anterior do fluxo. */
export function voltar(padrao: CodigoDaTela = 'T05'): void {
  mudar((e) => {
    const pilha = [...e.pilha];
    const tela = pilha.pop() ?? padrao;
    return { tela, pilha, dia: diaAoTrocarDeTela(e, tela) };
  });
}

/** Para o app numa referência, como uma foto. */
export function parar(ref: string): void {
  const tela = telaDe(ref);
  if (!tela) return;
  mudar((e) => ({ parado: ref, pedeVolta: false, dia: { ...e.dia, tocando: false, retoma: e.dia.tocando || e.dia.retoma } }));
  escreverRef(ref);
}

/** Devolve o percurso guardado: o app volta para a tela do caminho em que estava. */
export function voltarAoFluxo(): void {
  mudar((e) => ({ parado: null, pedeVolta: false, dia: temTocador(e.tela) && e.dia.retoma ? { ...e.dia, tocando: true, retoma: false } : e.dia }));
  escreverRef(null);
}

/** Tocaram no app parado: o palco pede a volta. */
export function pedirVolta(): void {
  mudar((e) => (e.parado && !e.pedeVolta ? { pedeVolta: true } : {}));
}

/** A tela que o aparelho mostra agora: a do parado, ou a do fluxo. */
export const telaVisivel = (e: Estado): CodigoDaTela => (e.parado ? (telaDe(e.parado) ?? e.tela) : e.tela);

/** Guarda a cena de uma tela, no fluxo. */
export function guardarCena<T>(tela: CodigoDaTela, cena: T): void {
  mudar((e) => ({ cenas: { ...e.cenas, [tela]: cena } }));
}

/** O celular respondeu ao pedido de localização. */
export function responderLocalizacao(resposta: 'permitida' | 'negada'): void {
  mudar((e) => ({ permissoes: { ...e.permissoes, localizacao: resposta } }));
}

/** O celular respondeu ao pedido de notificações. */
export function responderNotificacoes(resposta: 'permitida' | 'negada'): void {
  mudar((e) => ({ permissoes: { ...e.permissoes, notificacoes: resposta } }));
}

/** No fluxo, o celular negou as notificações. Parado numa referência, quem diz é o caso. */
export const avisosNegadosNoCelular = (e: Estado): boolean => !e.parado && e.permissoes.notificacoes === 'negada';
