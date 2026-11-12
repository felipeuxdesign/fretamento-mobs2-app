// T12 · Privacidade: as cenas, uma por referência. O que protege a pessoa e os dados dela, numa section só:
// o desbloqueio, os dois textos legais, a localização e Meus dados, de onde saem os pedidos.
import { mock } from '@/dados';

export type Vista = 'privacidade' | 'aviso' | 'termos' | 'meus-dados' | 'pedido' | 'registrado';
export type TipoDePedido = 'ver' | 'corrigir' | 'apagar';

export interface CenaT12 {
  vista: Vista;
  desbloqueio: boolean;
  /** o sheet que explica o risco antes de desligar */
  desligando?: boolean;
  /** o celular pede o Face ID antes de ligar */
  ligando?: boolean;
  /** o celular não tem senha nem biometria */
  semBloqueioDeTela?: boolean;
  /** a permissão de localização está negada no celular */
  localizacaoDesligada?: boolean;
  pedido: { tipo: TipoDePedido; texto: string; digitando?: boolean; enviando?: boolean; falhou?: boolean; /** tocou em Enviar sem escrever nada */ vazio?: boolean };
  /** já existe um pedido registrado */
  emAndamento?: boolean;
  semInternet?: boolean;
  /** abriu de outra tela (Preparar o app, Excluir conta): o voltar leva de volta para ela */
  deFora?: boolean;
}

const TEXTO_DO_PEDIDO = 'Quero saber quais dados de embarque vocês guardam dos últimos 3 meses.';
/** A tela como na referência, com o campo do pedido vazio. */
const VAZIA: CenaT12 = { vista: 'privacidade', desbloqueio: true, pedido: { tipo: 'ver', texto: '' } };
/** No fluxo, o pedido já vem escrito, para quem usa o protótipo não ter de digitar. */
export const DO_FLUXO: CenaT12 = { ...VAZIA, pedido: { tipo: 'ver', texto: TEXTO_DO_PEDIDO } };
const com = (parte: Partial<CenaT12>, pedido: Partial<CenaT12['pedido']> = {}): CenaT12 => ({ ...VAZIA, ...parte, pedido: { ...VAZIA.pedido, ...pedido } });

export const CENAS: Record<string, CenaT12> = {
  'T12-00': VAZIA,
  'T12-01': com({ desligando: true }),
  'T12-02': com({ desbloqueio: false, ligando: true }),
  'T12-03': com({ vista: 'aviso' }),
  'T12-04': com({ vista: 'termos' }),
  'T12-05': com({ vista: 'meus-dados' }),
  'T12-06': com({ vista: 'pedido' }),
  'T12-07': com({ vista: 'pedido' }, { texto: TEXTO_DO_PEDIDO, digitando: true }),
  'T12-08': com({ vista: 'pedido' }, { tipo: 'apagar' }),
  'T12-09': com({ vista: 'registrado', emAndamento: true }, { texto: TEXTO_DO_PEDIDO }),
  'T12-10': com({ desbloqueio: false, semBloqueioDeTela: true }),
  'T12-11': com({ localizacaoDesligada: true }),
  'T12-12': com({ vista: 'meus-dados', emAndamento: true }),
  'T12-13': com({ vista: 'meus-dados', semInternet: true }),
  'T12-14': com({ vista: 'pedido' }, { texto: TEXTO_DO_PEDIDO, enviando: true }),
  'T12-15': com({ vista: 'pedido' }, { texto: TEXTO_DO_PEDIDO, falhou: true }),
  'T12-16': com({ vista: 'pedido', semInternet: true }),
};

const R = mock.regras;
const tr = mock.transportadora.nome;
export const TIPOS: { id: TipoDePedido; nome: string }[] = [
  { id: 'ver', nome: 'Ver os dados que vocês têm sobre mim' },
  { id: 'corrigir', nome: 'Corrigir um dado' },
  { id: 'apagar', nome: 'Apagar meu cadastro no transporte' },
];

export const TEXTOS = {
  titulo: 'Privacidade',
  desbloqueio: {
    titulo: 'Desbloqueio ao abrir o app',
    apoio: `Método: Face ID · Pedido ao abrir e depois de ${R.desbloqueioForaDoAppMin} min fora do app`,
    /** desligado, o apoio diz o que passa a valer: as palavras são as do sheet que confirma o desligar */
    desligado: 'Desligado · O app abre sem pedir o Face ID nem a senha do celular',
    semBloqueio: 'Precisa do bloqueio de tela ligado no celular.',
    ajustes: 'Abrir ajustes do celular',
  },
  aviso: 'Aviso de privacidade',
  termos: 'Termos de uso',
  localizacao: { titulo: 'Localização', apoio: 'Só quando você pede, com o app aberto', desligada: 'Desligada no celular' },
  meusDados: { titulo: 'Meus dados', apoio: 'Pedir acesso, correção ou exclusão' },
  desligar: { titulo: 'Desligar o desbloqueio?', texto: 'O app vai abrir sem pedir o Face ID nem a senha do celular. Quem pegar seu celular desbloqueado poderá ver suas viagens.', confirma: 'Desligar', desiste: 'Cancelar' },
  ligar: { texto: 'Confirme que é você para ligar o desbloqueio ao abrir o app.', senha: 'Usar a senha do celular', desiste: 'Cancelar' },
  versao: 'Versão 1.0 · 27/10/2026',
  avisoDePrivacidade: [
    { titulo: 'Quem cuida dos seus dados', texto: `A ${mock.empresa.nome} e a transportadora ${tr} são responsáveis pelos seus dados. A Mobs2 opera o app em nome delas.` },
    { titulo: 'O que usamos', texto: 'Seu nome, contato, linhas e ponto de embarque, para mostrar quando seu ônibus chega e enviar avisos da sua viagem.' },
    { titulo: 'O que ninguém vê', texto: 'Outros passageiros não veem seu nome nem seu ponto. O motorista não aparece para você.' },
    { titulo: 'Localização', texto: 'Só quando você pede, com o app aberto. Ela não fica guardada.' },
    { titulo: 'Por quanto tempo', texto: 'Registros de acesso ficam guardados por 6 meses, como exige a lei.' },
    { titulo: 'Seus direitos', texto: `Peça acesso, correção ou exclusão em Perfil › Privacidade › Meus dados. O encarregado de dados da ${tr} recebe o pedido.` },
  ],
  termosDeUso: [
    'O app mostra a previsão do seu ônibus de fretamento e avisos da sua viagem.',
    'A previsão é uma estimativa. Saia de casa com folga, principalmente quando o app mostrar horário programado ou sem sinal.',
    'Não compartilhe a posição do ônibus com pessoas de fora do transporte.',
    'Seu acesso depende do seu cadastro na empresa. Se ele for encerrado, o app deixa de mostrar suas viagens.',
    'Ao tocar em Começar, no primeiro acesso, você aceita estes termos.',
  ],
  dados: {
    texto: `Você pode pedir acesso, correção ou exclusão dos seus dados. O pedido vai para a ${tr}, responsável pelos seus dados.`,
    prazo: `Prazo informado pela ${tr}: ${R.prazoDoPedidoDias} dias.`,
    fazer: 'Fazer um pedido',
    andamento: { titulo: 'Pedido em andamento', antes: 'Protocolo ', depois: ` · registrado hoje · resposta em até ${R.prazoDoPedidoDias} dias` },
    semInternet: 'Sem internet. Conecte-se para enviar.',
  },
  pedido: {
    titulo: 'Fazer um pedido',
    tipo: 'Tipo de pedido',
    campo: 'Conte o que você precisa',
    dica: 'Ex.: quero saber quais dados de embarque vocês guardam',
    apagar: 'Apagar o cadastro encerra seu acesso ao app e ao fretado. A transportadora confirma com você antes de apagar.',
    enviar: 'Enviar pedido',
    falhou: 'Não foi possível enviar. Tente de novo.',
  },
  registrado: {
    titulo: 'Pedido registrado',
    texto: `Encaminhado à ${tr}, responsável pelos seus dados. A resposta chega pelo e-mail cadastrado em até ${R.prazoDoPedidoDias} dias.`,
    protocolo: 'Protocolo',
    volta: 'Voltar ao início',
  },
};
export const PROTOCOLO = mock.pedidoDeDados.protocolo;
