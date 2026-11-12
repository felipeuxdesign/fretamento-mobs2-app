// T11 · Avisos: as cenas, uma por referência. As únicas escolhas do passageiro sobre os avisos: o de chegada
// (e com quantos minutos) e o de saída. O caso diz a escolha, a permissão do celular e a rede.
import { mock } from '@/dados';

export interface CenaT11 {
  chegando: boolean;
  minutos: number;
  saiu: boolean;
  banner?: 'avisos-desligados' | 'sem-internet';
}

export const MINUTOS = [5, 10, 15];
export const DO_FLUXO: CenaT11 = { chegando: true, minutos: mock.pessoa.avisoDeChegadaMin, saiu: mock.pessoa.avisoDeSaida };
export const CENAS: Record<string, CenaT11> = {
  'T11-00': DO_FLUXO,
  'T11-01': { ...DO_FLUXO, chegando: false },
  'T11-02': { ...DO_FLUXO, banner: 'avisos-desligados' },
  'T11-03': { ...DO_FLUXO, banner: 'sem-internet' },
};

export const TEXTOS = {
  titulo: 'Avisos',
  chegando: { titulo: 'Ônibus chegando', apoio: 'Um aviso antes de o ônibus passar no seu ponto' },
  quando: 'Avisar quando faltar:',
  saiu: { titulo: 'Ônibus saiu', apoio: 'Quando o ônibus começar a viagem' },
  sempre: 'Atrasos, trocas, cancelamentos e comunicados são sempre avisados.',
  banners: {
    'avisos-desligados': { icone: 'avisos-desligados', texto: 'Avisos desligados no celular. Ative para receber os alertas.', acao: 'Ativar' as string | undefined },
    'sem-internet': { icone: 'sem-internet', texto: 'Sem internet. A mudança fica guardada e é enviada quando a conexão voltar.', acao: undefined as string | undefined },
  },
};
