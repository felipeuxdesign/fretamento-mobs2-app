// O interruptor de cada peça de vidro. Uma linha por peça: false devolve aquela peça ao sólido, o original,
// sem tocar em mais nada. ?vidro=0 no endereço desliga todas de uma vez, e a "reduzir transparência" do sistema faz o mesmo.
export const VIDRO = {
  barra: true,
  botoesDaBarra: true,
  barraDoMapa: true,
  controlesDoMapa: true,
  balaoDoOnibus: true,
  painelDoMapa: true,
  sheet: true,
  banner: true,
  rodape: true,
  toast: true,
  sistema: true,
  switch: true,
  segmentado: true,
  botoes: true,
  campos: true,
  selos: true,
  conteudo: true,
} as const;

export type PecaDeVidro = keyof typeof VIDRO;
export const PECAS_DE_VIDRO = Object.keys(VIDRO) as PecaDeVidro[];
