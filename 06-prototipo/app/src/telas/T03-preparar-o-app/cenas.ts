// T03 · Preparar o app: as cenas, uma por referência. O caso diz o que a pessoa já decidiu (os avisos, a proteção)
// e o que o celular respondeu.
import { mock } from '@/dados';

export interface CenaT03 {
  avisos: boolean;
  protecao: boolean;
  /** a pergunta do celular sobre as notificações, por cima */
  perguntaDosAvisos?: boolean;
  /** o pedido do Face ID, do celular, por cima */
  pedeADigital?: boolean;
  /** o celular não tem bloqueio de tela: a proteção fica indisponível */
  semBloqueioDeTela?: boolean;
  /** o celular não reconheceu. Cancelar o pedido não chega aqui: só fecha, com o interruptor desligado */
  naoReconhecido?: boolean;
  /** "Não Permitir" na pergunta do celular */
  avisosNegados?: boolean;
}

export const DO_FLUXO: CenaT03 = { avisos: true, protecao: false };

export const CENAS: Record<string, CenaT03> = {
  'T03-00': DO_FLUXO,
  'T03-01': { ...DO_FLUXO, perguntaDosAvisos: true },
  'T03-02': { avisos: true, protecao: true, pedeADigital: true },
  'T03-03': { ...DO_FLUXO, semBloqueioDeTela: true },
  'T03-04': { ...DO_FLUXO, naoReconhecido: true },
  'T03-05': { avisos: false, protecao: false, avisosNegados: true },
};

export const TEXTOS = {
  titulo: 'Preparar o app',
  dados: {
    titulo: 'Seus dados',
    blocos: [
      { icone: 'empresa', forte: 'Quem cuida dos seus dados:', texto: ` a ${mock.empresa.nome} e a transportadora ${mock.transportadora.nome}. A Mobs2 opera o app em nome delas.` },
      { icone: 'onibus', forte: 'O que usamos:', texto: ' seu nome, contato, linhas e ponto de embarque, para mostrar quando seu ônibus chega.' },
      { icone: 'oculto', forte: 'O que ninguém vê:', texto: ' outros passageiros não veem seu nome nem seu ponto. Você também não vê o deles.' },
      { icone: 'localizacao', forte: 'Sua localização:', texto: ' só quando você pedir, com o app aberto, e não fica guardada.' },
    ],
    links: ['Aviso de privacidade', 'Termos de uso'] as const,
  },
  avisos: {
    titulo: 'Avisos',
    opcao: 'Avisar quando o ônibus estiver chegando',
    apoio: `${mock.pessoa.avisoDeChegadaMin} min antes, e se ele atrasar, trocar ou a viagem for cancelada.`,
    negados: 'O celular não permitiu os avisos. Dá para ligar depois em Ajustes › Notificações. ',
  },
  protecao: {
    titulo: 'Proteção',
    opcao: 'Pedir o Face ID para abrir o app',
    apoio: 'Quem confere é o celular: seu rosto não sai do aparelho.',
    semBloqueio: 'Seu celular não tem bloqueio de tela. Ative nos ajustes para usar aqui. ',
    naoReconhecido: 'O celular não reconheceu você. Tente de novo, ou use a senha do celular.',
  },
  ajustes: 'Abrir ajustes',
  rodape: 'Ao começar, você aceita os Termos de uso.',
  comecar: 'Começar',
  pergunta: { titulo: '“Mobs2 Fretamento” Deseja Enviar Notificações', texto: 'As notificações podem incluir alertas, sons e indicadores no ícone. Elas podem ser configuradas em Ajustes.', nao: 'Não Permitir', sim: 'Permitir' },
  /** o pedido do Face ID: o motivo que o app dá ao celular, e as saídas do celular */
  faceId: { texto: 'Confirme que é você para ligar o desbloqueio.', senha: 'Usar a senha do celular', cancela: 'Cancelar' },
};
