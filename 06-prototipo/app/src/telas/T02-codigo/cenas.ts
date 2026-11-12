// T02 · Digite o código: as cenas, uma por referência. O caso diz o que foi digitado, quanto falta para o
// reenvio, o que o servidor respondeu e quantas tentativas restam.
import { mock, somar } from '@/dados';

const R = mock.regras;

export interface CenaT02 {
  codigo: string;
  /** o campo com foco e o teclado numérico aberto */
  digitando?: boolean;
  /** quanto falta para o reenvio liberar, em segundos; 0 é liberado */
  falta: number;
  erro?: 'incorreto' | 'expirado' | 'bloqueado';
  /** os erros de código até aqui */
  erros: number;
  /** os 700 ms depois do sexto dígito */
  validando?: boolean;
  /** o código valeu, e o servidor negou o acesso: o cadastro ainda não foi liberado */
  negado?: boolean;
  /** o sheet genérico "Como ganhar acesso" */
  ajuda?: boolean;
}

/** No fluxo, o Código abre vazio, com o teclado aberto: qualquer código de seis dígitos entra. É o único campo do
    protótipo que não vem preenchido: com os seis dígitos já postos, a tela validaria sozinha e ninguém a veria. */
export const DO_FLUXO: CenaT02 = { codigo: '', falta: R.reenvioDoCodigoSeg, erros: 0 };

export const CENAS: Record<string, CenaT02> = {
  // a tela abre com o teclado: o estado sem teclado deixou de existir como entrada
  'T02-00': { codigo: '', digitando: true, falta: 45, erros: 0 },
  'T02-01': { codigo: '1234', digitando: true, falta: 31, erros: 0 },
  'T02-02': { codigo: '', falta: 0, erros: 0 },
  'T02-03': { codigo: '', falta: 20, erro: 'incorreto', erros: 1 },
  'T02-04': { codigo: mock.loginDeTeste.expirado, falta: 0, erro: 'expirado', erros: 0 },
  'T02-05': { codigo: '', falta: 0, erro: 'bloqueado', erros: R.errosDoCodigo },
  'T02-06': { codigo: mock.loginDeTeste.entra, falta: 12, erros: 0, validando: true },
  'T02-07': { codigo: mock.loginDeTeste.entra, falta: 0, erros: 0, negado: true },
};

const rh = mock.empresa.rh;
export const TEXTOS = {
  titulo: 'Digite o código',
  frase: ['Enviamos um código de 6 dígitos para ', ', se esse contato estiver cadastrado.'] as const,
  rotulo: 'Código',
  entrando: 'Entrando',
  reenviar: 'Reenviar código',
  reenviarEm: (s: number) => `Reenviar código em ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`,
  trocar: 'Trocar e-mail ou celular',
  ajuda: 'Preciso de ajuda',
  naoChegou: 'Não chegou? Confira a caixa de spam e se este é o contato que sua empresa cadastrou. Se não for, o RH atualiza em minutos.',
  naoChegouNoCelular: 'Não chegou? Confira se este é o contato que sua empresa cadastrou. Se não for, o RH atualiza em minutos.',
  nuncaChega: 'Se o código nunca chega, o contato cadastrado pode estar desatualizado. O RH resolve em minutos.',
  erro: {
    incorreto: (restam: number) => `Código incorreto. Você tem mais ${restam} tentativas.`,
    expirado: 'Este código expirou. Peça um novo.',
    /** a referência é a foto de um minuto depois do bloqueio: faltam 14 dos 15 min */
    bloqueado: (minutos: number) => `Muitas tentativas. Você pode tentar de novo às ${somar(mock.relogio.hora, R.bloqueioDoCodigoMin)}, daqui a ${minutos} min.`,
  },
  negado: {
    titulo: 'Seu acesso ainda não foi liberado',
    texto: 'Seu código está certo, mas a empresa ainda não liberou seu cadastro no transporte. Fale com o RH para saber como acompanhar seu ônibus.',
    contato: { titulo: `RH · ${mock.empresa.nome}`, apoio: [`${rh.canal} ${rh.numero} · ${rh.horario.replace(' 17h', '')}`, '17h'] as const },
    volta: 'Voltar',
  },
};
