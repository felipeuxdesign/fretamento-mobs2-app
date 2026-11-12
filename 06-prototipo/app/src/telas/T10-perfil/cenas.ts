// T10 · Perfil: as cenas, uma por referência. Nada aqui se edita: o caso diz o que está aberto, a rede e o que o
// cadastro da empresa traz.
import { mock } from '@/dados';

export interface CenaT10 {
  /** o "Preciso de ajuda" aberto: a mesma tela abre pelo Início e pela viagem cancelada */
  ajuda?: boolean;
  /** a empresa não cadastrou o contato da transportadora */
  semTransportadora?: boolean;
  /** o sheet de confirmação do "Sair da conta" */
  saindo?: boolean;
  semInternet?: boolean;
  /** rolada até o fim */
  noFim?: boolean;
}

export const DO_FLUXO: CenaT10 = {};
export const CENAS: Record<string, CenaT10> = {
  'T10-00': DO_FLUXO,
  'T10-01': { ajuda: true },
  'T10-02': { saindo: true, noFim: true },
  'T10-04': { semInternet: true, noFim: true },
  'T10-05': { ajuda: true, semTransportadora: true },
  'T10-03': { noFim: true },
};

const P = mock.pessoa;
const [IDA, , VOLTA] = mock.viagens;
const SEMPRE = mock.paradasDaIda.find((p) => p.pontoDeSempre)!;
const rh = mock.empresa.rh;
const tr = mock.transportadora;
const firme = (t: string) => t.replace(/às (\d)/g, 'às $1');

export const TEXTOS = {
  titulo: 'Perfil',
  cabecalho: { empresa: `${mock.empresa.nome} · Transporte: ${tr.nome}`, nota: 'Dados cadastrados pela sua empresa.' },
  conta: {
    titulo: 'Minha conta',
    linhas: [
      { icone: 'email', rotulo: 'E-mail', valor: P.email },
      { icone: 'celular', rotulo: 'Celular', valor: P.celular },
    ],
  },
  linhas: {
    titulo: 'Minhas linhas',
    itens: [
      { titulo: `Linha ${mock.linha.numero} · Ida`, apoio: `Ponto de sempre: ${SEMPRE.nome!.replace('Av. ', 'Av.\u00a0')} · ${IDA.sai}` },
      { titulo: `Linha ${mock.linha.numero} · Volta`, apoio: `Ponto de sempre: ${VOLTA.embarque} · ${VOLTA.sai}` },
    ],
    nota: 'Para mudar seu ponto de sempre ou suas linhas, fale com o RH.',
  },
  ajustes: {
    titulo: 'Ajustes',
    avisos: { titulo: 'Avisos', apoio: `Ônibus chegando: ${P.avisoDeChegadaMin} min antes` },
    privacidade: { titulo: 'Privacidade', apoio: 'Desbloqueio, seus dados e termos' },
    aparencia: 'Aparência',
    ajuda: { titulo: 'Preciso de ajuda', apoio: 'RH e transportadora, com telefone e horário' },
  },
  sair: 'Sair da conta',
  excluir: 'Excluir conta',
  semInternet: 'Sem internet. Mostrando o que o app já tinha.',
  saindo: { titulo: 'Sair da conta?', texto: 'Para entrar de novo, você vai receber um novo código.', confirma: 'Sair', desiste: 'Cancelar' },
  ajuda: {
    titulo: 'Preciso de ajuda',
    abre: 'Quem resolve cada coisa. Os contatos vêm do cadastro da sua empresa.',
    rh: { icone: 'empresa', titulo: rh.nome, resolve: rh.resolve, linhas: [{ icone: 'marca-whatsapp', texto: `${rh.canal} ${rh.numero}` }, { icone: 'horario', texto: firme(rh.horario) }] },
    transportadora: { icone: 'transportadora', titulo: tr.nome, resolve: tr.resolve, linhas: [{ icone: 'ligar', texto: `${tr.canal} ${tr.numero}` }, { icone: 'horario', texto: firme(tr.horario) }] },
    acoes: ['WhatsApp', 'Ligar'] as const,
    /** o que o protótipo responde quando a pessoa toca num dos dois: ele não abre o WhatsApp nem liga */
    fora: ['No protótipo, o WhatsApp não abre.', 'No protótipo, a ligação não é feita.'] as const,
    perguntas: {
      titulo: 'Perguntas de todo dia',
      itens: (comTransportadora: boolean) => [
        { icone: 'onibus', titulo: 'O ônibus não apareceu', apoio: comTransportadora ? 'Fale com a transportadora; ela vê o ônibus em tempo real.' : 'Fale com o RH; ele aciona a transportadora.' },
        { icone: 'email', titulo: 'Meu código não chega', apoio: 'Confira o spam; se o contato mudou, o RH atualiza o cadastro.' },
        { icone: 'linha', titulo: 'Meu ponto ou minha linha mudou', apoio: 'Só o RH muda o cadastro; o app mostra o que está lá.' },
      ],
    },
  },
};
