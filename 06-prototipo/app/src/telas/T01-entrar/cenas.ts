// T01 · Entrar: as cenas, uma por referência. O caso diz o contato escolhido, o que foi digitado, a rede e a resposta.
import { mock } from '@/dados';

export interface CenaT01 {
  meio: 'email' | 'celular';
  valor: string;
  /** o campo com foco e o teclado aberto */
  digitando?: boolean;
  erro?: string;
  semInternet?: boolean;
  /** os 700 ms depois de "Receber código" */
  enviando?: boolean;
  /** o sheet "Como ganhar acesso" */
  comoGanharAcesso?: boolean;
}

/** A tela vazia, como na referência. */
const VAZIA: CenaT01 = { meio: 'email', valor: '' };
/** No fluxo, o campo já vem com o contato da Ana, para quem usa o protótipo não ter de digitar. */
export const DO_FLUXO: CenaT01 = { meio: 'email', valor: mock.pessoa.email };
export const PREENCHIDO = { email: mock.pessoa.email, celular: mock.pessoa.celular };
export const ERRO_DO_EMAIL = 'Falta o final do e-mail, como .com.br';
/** O mesmo erro no lugar, para o celular pela metade e para o campo vazio. Não têm quadro: só aparecem no fluxo. */
export const ERRO_DO_CELULAR = 'Faltam números do celular, com o DDD';
export const ERRO_DO_VAZIO = { email: 'Digite o seu e-mail', celular: 'Digite o seu celular com DDD' };

export const CENAS: Record<string, CenaT01> = {
  'T01-00': VAZIA,
  'T01-01': { meio: 'celular', valor: '' },
  'T01-02': { meio: 'email', valor: mock.pessoa.email, digitando: true },
  'T01-06': { ...VAZIA, comoGanharAcesso: true },
  'T01-04': { meio: 'email', valor: 'ana@metalurgica', erro: ERRO_DO_EMAIL },
  'T01-05': { meio: 'email', valor: mock.pessoa.email, semInternet: true },
  'T01-03': { meio: 'email', valor: mock.pessoa.email, enviando: true },
};

export const TEXTOS = {
  titulo: 'Acompanhe seu ônibus',
  frase: 'Use o e-mail ou o celular que sua empresa cadastrou.',
  campo: { email: { rotulo: 'E-mail', dica: 'nome@empresa.com.br' }, celular: { rotulo: 'Celular com DDD', dica: mock.pessoa.celular } },
  receber: 'Receber código',
  enviando: 'Enviando',
  semConvite: 'Não recebi convite',
  semInternet: 'Sem internet. Conecte-se para receber o código.',
  acesso: { titulo: 'Como ganhar acesso', texto: 'O acesso é liberado pela sua empresa. Peça ao RH ou à transportadora para cadastrar o seu e-mail ou celular no transporte; o código chega em seguida.', fecha: 'Entendi' },
};

/** O celular, do jeito que se lê: (81) 91234-5678. */
export function comoCelular(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
export const emailInteiro = (v: string) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v.trim());
export const celularInteiro = (v: string) => v.replace(/\D/g, '').length >= 11;
