// A ponte com 04-dados: o mock, os casos e o palco em dados. Nada aqui é digitado: tudo é lido dos arquivos da pasta.
import mockJson from '@dados/mock.json';
import casosJson from '@dados/casos.json';
import palcoJson from '@prototipo/palco-estados.json';

export type CodigoDaTela = 'T01' | 'T02' | 'T03' | 'T04' | 'T05' | 'T06' | 'T07' | 'T08' | 'T09' | 'T10' | 'T11' | 'T12' | 'T13';

export interface Caso {
  ref: string;
  tela: CodigoDaTela;
  tipo: 'tela' | 'momento' | 'estado';
  nome: string;
  como: string;
  caso: string;
  html: string;
  png: string;
}

export const mock = mockJson;
export type Mock = typeof mockJson;
export const casos = casosJson as Caso[];
export const palco = palcoJson;

export const TELAS = palco.telas.map((t) => t.codigo as CodigoDaTela);
export const casoDe = (ref: string): Caso | undefined => casos.find((c) => c.ref === ref);
export const telaDe = (ref: string): CodigoDaTela | undefined => casoDe(ref)?.tela;
export const nomeDaTela = (codigo: CodigoDaTela): string => palco.telas.find((t) => t.codigo === codigo)?.nome ?? codigo;

/** Conta de horas no relógio fixo: "06:24" + 18 = "06:42". Nada aqui lê a hora de verdade. */
export const minutos = (hora: string): number => {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
};
export const hora = (min: number): string => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
export const somar = (h: string, min: number): string => hora(minutos(h) + min);
export const falta = (de: string, ate: string): number => minutos(ate) - minutos(de);

/** O tempo relativo de um agora até uma hora. É a única função que escreve um relativo na tela: o herói, a linha do
    tempo e o mapa saem dela, com o mesmo arredondamento. */
export const relativo = (agora: string, ate: string): string => {
  const m = falta(agora, ate);
  return m <= 0 ? 'agora' : m < mock.regras.chegandoMin ? `menos de ${mock.regras.chegandoMin} min` : `${m} min`;
};
/** Quantas pessoas embarcam numa parada. Abaixo de 2, "até 1 pessoa": a contagem nunca identifica alguém. */
export const pessoasQueEmbarcam = (n: number, comMaiuscula = true): string => (n < 2 ? `${comMaiuscula ? 'Até' : 'até'} 1 pessoa embarca aqui` : `${n} pessoas embarcam aqui`);
/** O ônibus, sempre na mesma ordem: o prefixo primeiro, a placa depois. */
export const prefixoEPlaca = (o: { prefixo: string; placa: string }): string => `${o.prefixo} · ${o.placa}`;
