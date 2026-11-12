// Tudo o que abre por cima (sheet, toast, alerta, teclado) abre dentro da tela do aparelho, nunca no body.
import { createContext, useContext, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const LugarDoPorCima = createContext<HTMLElement | null>(null);

/** O elemento da tela do aparelho onde o que abre por cima é montado. */
export const usarPorCima = (): HTMLElement | null => useContext(LugarDoPorCima);

export function PorCima({ children }: { children: ReactNode }) {
  const lugar = usarPorCima();
  return lugar ? createPortal(children, lugar) : null;
}
