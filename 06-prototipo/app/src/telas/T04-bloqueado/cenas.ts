// T04 · Bloqueado: as cenas, uma por referência. O que muda é o motivo do pedido.
import { mock } from '@/dados';

export interface CenaT04 {
  /** por que o app está pedindo: a reabertura comum, ou um dos motivos que o celular, o tempo ou a empresa decidem */
  motivo: 'reabertura' | 'nao-reconhecido' | 'travada' | 'biometria-mudou' | 'sessao-expirada' | 'acesso-encerrado';
  /** a folha da biometria do celular, aberta por cima */
  folha: boolean;
  /** quanto falta para a digital voltar, quando o celular a travou */
  voltaEm?: string;
}

export const CENAS: Record<string, CenaT04> = {
  'T04-00': { motivo: 'reabertura', folha: false },
  'T04-01': { motivo: 'reabertura', folha: true },
  'T04-02': { motivo: 'nao-reconhecido', folha: false },
  'T04-03': { motivo: 'travada', folha: false, voltaEm: '0:27' },
  'T04-04': { motivo: 'biometria-mudou', folha: false },
  'T04-05': { motivo: 'sessao-expirada', folha: false },
  'T04-06': { motivo: 'acesso-encerrado', folha: false },
};

/** O caminho feliz abre aqui: a reabertura, com a folha da biometria abrindo sozinha logo depois. */
export const DO_FLUXO: CenaT04 = CENAS['T04-00'];

export const ESPERA_DA_BIOMETRIA_MS = mock.regras.biometriaAbreSozinhaMs;
