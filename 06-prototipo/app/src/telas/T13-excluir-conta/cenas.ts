// T13 · Excluir conta: as cenas, uma por referência. O que some e o que fica, a confirmação e o que o servidor respondeu.
export interface CenaT13 {
  /** o sheet de confirmação */
  confirmando?: boolean;
  /** os 700 ms depois de "Excluir" */
  excluindo?: boolean;
  falhou?: boolean;
  semInternet?: boolean;
  /** a conta foi excluída: não há mais sessão */
  excluida?: boolean;
}

export const DO_FLUXO: CenaT13 = {};
export const CENAS: Record<string, CenaT13> = {
  'T13-00': DO_FLUXO,
  'T13-01': { confirmando: true },
  'T13-02': { excluida: true },
  'T13-03': { excluindo: true },
  'T13-04': { falhou: true },
  'T13-05': { semInternet: true },
};

export const TEXTOS = {
  titulo: 'Excluir conta',
  some: 'Vamos apagar sua conta no app: acesso, preferências e avisos.',
  fica: ['Seu cadastro no transporte continua com sua empresa enquanto você usar o fretado. Para apagar esse cadastro, use ', 'Meus dados', '.'] as const,
  meusDados: 'Ir para Meus dados',
  excluir: 'Excluir conta',
  falhou: 'Não foi possível excluir agora. Tente de novo.',
  semInternet: 'Sem internet. Conecte-se para enviar.',
  confirmar: { titulo: 'Excluir sua conta agora?', texto: 'Você sai do app na hora. Para voltar, precisa de um código novo e de preparar o app de novo.', confirma: 'Excluir', desiste: 'Cancelar' },
  excluida: { titulo: 'Conta excluída', texto: 'Se o seu contato continuar cadastrado pela empresa, você pode entrar de novo e criar uma conta nova.', volta: 'Voltar ao início' },
};
