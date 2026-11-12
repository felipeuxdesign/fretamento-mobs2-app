// A sessão simulada: quem entra, quem sai e o que a entrada lembra de uma tela para a outra.
import { ler, mudar, irPara } from '@/estado/armazem';
import { mock } from '@/dados';

/** O contato para onde o código foi, mascarado: a•••@empresa.com.br ou (81) 9••••-5678. */
export function mascarar(contato: string): string {
  if (contato.includes('@')) return `${contato[0]}•••${contato.slice(contato.indexOf('@'))}`;
  const d = contato.replace(/\D/g, '');
  return `(${d.slice(0, 2)}) ${d[2] ?? ''}••••-${d.slice(-4)}`;
}

/** O contato com que a pessoa pediu o código, para a tela do código dizer para onde ele foi. */
let contatoDaEntrada: string = mock.pessoa.email;
export const guardarContato = (c: string) => (contatoDaEntrada = c);
export const contatoMascarado = () => mascarar(contatoDaEntrada);
/** O código foi para um celular, e não para um e-mail. */
export const contatoEhCelular = () => !contatoDaEntrada.includes('@');

/** Quem já usa o app e pede um código de novo (sessão expirada, entrar com código): não é primeiro acesso. */
export function pedirCodigoDeNovo(para: 'T01' | 'T02'): void {
  mudar((e) => ({ sessao: { ...e.sessao, entrou: false, primeiroAcesso: false } }));
  irPara(para);
}

/** O Entrar aberto sem ter saído da conta (pelo palco): é o primeiro acesso, e o Preparar o app vem depois do código. */
export function chegarAoEntrar(): void {
  if (ler().sessao.entrou) mudar((e) => ({ sessao: { ...e.sessao, entrou: false, primeiroAcesso: true } }));
}

/** Sair da conta: a volta pede um código novo, e o app já está preparado. */
export function sair(): void {
  mudar((e) => ({ sessao: { ...e.sessao, entrou: false, primeiroAcesso: false }, tela: 'T01', pilha: [], cenas: {}, dia: { ...e.dia, passo: 0, batida: 0, tocando: false, volta: 0 } }));
}

/** Excluir a conta: leva ao Entrar; quem entrar de novo começa do primeiro acesso. */
export function excluirConta(): void {
  mudar((e) => ({ sessao: { ...e.sessao, entrou: false, primeiroAcesso: true }, tela: 'T01', pilha: [], cenas: {}, dia: { ...e.dia, passo: 0, batida: 0, tocando: false, volta: 0 } }));
}

/** O código valeu: a sessão começa. */
export function entrou(): void {
  mudar((e) => ({ sessao: { ...e.sessao, entrou: true } }));
}
