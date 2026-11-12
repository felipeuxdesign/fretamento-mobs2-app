// Onde cada parada da ida fica no desenho do mapa, e as setas do sentido sobre a rota.
// É a transcrição do desenho das referências da T07, como o traçado em desenho.ts. No produto real, vem do mapa de verdade.
import type { PontoDoMapa } from './Mapa';

/** A posição de cada parada, pelo id dela no mock. */
export const PARADAS_NO_MAPA: Record<string, PontoDoMapa> = {
  macaxeira: [205, 95],
  'casa-amarela': [190, 285],
  'av-norte': [210, 470],
  'sem-nome-1': [212.3, 521.4],
  'sem-nome-2': [208.4, 691.5],
  abdias: [205, 760],
  'av-recife': [225, 950],
  barro: [250, 1130],
  fabrica: [300, 1290],
};

/** As setas do sentido: onde ficam e para onde apontam, em graus. */
export const SETAS_DO_SENTIDO: { em: PontoDoMapa; giro: number }[] = [
  { em: [213, 561.2], giro: 180.4 },
  { em: [209.4, 671.1], giro: 182.6 },
  { em: [222, 890.2], giro: 177 },
  { em: [229.2, 1000], giro: 174.7 },
  { em: [271.5, 1215.5], giro: 162 },
];

/** Com a linha inteira na tela, as setas são duas. */
export const SETAS_DA_LINHA_INTEIRA: { em: PontoDoMapa; giro: number }[] = [
  { em: [212.1, 517.2], giro: 177.8 },
  { em: [259.7, 1173.2], giro: 166.6 },
];
