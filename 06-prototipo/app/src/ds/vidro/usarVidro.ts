// Diz se uma peça deve ser desenhada de vidro agora. O vidro tem volta em quatro lugares:
// a linha da peça no vidro.config.ts, ?vidro=0, "reduzir transparência" (do sistema ou da vitrine) e ?sem-vidro=<peça>.
import { createContext, useContext, useSyncExternalStore } from 'react';
import { usarEstado } from '@/estado/armazem';
import { VIDRO, type PecaDeVidro } from './vidro.config';

const TRANSPARENCIA = '(prefers-reduced-transparency: reduce)';
const assinar = (o: () => void) => {
  const m = window.matchMedia(TRANSPARENCIA);
  m.addEventListener('change', o);
  return () => m.removeEventListener('change', o);
};
/** A "reduzir transparência" do sistema. */
export const usarTransparenciaReduzida = (): boolean => useSyncExternalStore(assinar, () => window.matchMedia(TRANSPARENCIA).matches);

/** A vitrine mostra a peça sólida ao lado da de vidro: aqui ela força o sólido num quadro só. */
export const MaterialForcado = createContext<'solido' | null>(null);

/** O vidro inteiro: ligado no endereço e sem "reduzir transparência". */
export function usarVidroLigado(): boolean {
  const ligado = usarEstado((e) => e.vidro && !e.preferenciasDoVidro.reduzirTransparencia);
  const doSistema = usarTransparenciaReduzida();
  const forcado = useContext(MaterialForcado);
  return ligado && !doSistema && forcado !== 'solido';
}

export function usarVidro(peca: PecaDeVidro): boolean {
  const ligado = usarVidroLigado();
  const semEsta = usarEstado((e) => e.endereco.semVidro.includes(peca));
  return ligado && VIDRO[peca] && !semEsta;
}
