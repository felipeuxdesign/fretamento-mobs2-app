// A cena de uma tela: o objeto do caso. Diz o que muda sobre a semente: a hora, a fase da viagem, o sinal, a rede,
// o que o servidor respondeu, o que está aberto por cima. Um estado é o próprio app montado com a cena daquele caso.
// No fluxo, tocar leva a tela de uma cena para outra; parado numa referência, a tela mostra a cena dela e não muda.
import { useCallback } from 'react';
import type { CodigoDaTela } from '@/dados';
import { ler, guardarCena, usarEstado } from './armazem';

export function usarCena<T>(tela: CodigoDaTela, cenas: Record<string, T>, doFluxo: T, parado: string | null): [T, (cena: T | ((antes: T) => T)) => void] {
  const guardada = usarEstado((e) => e.cenas[tela]) as T | undefined;
  const cena = parado && cenas[parado] ? cenas[parado] : (guardada ?? doFluxo);
  const mudarCena = useCallback(
    (nova: T | ((antes: T) => T)) => {
      if (ler().parado) return; // parado, o app é uma foto
      const antes = (ler().cenas[tela] as T | undefined) ?? doFluxo;
      guardarCena(tela, typeof nova === 'function' ? (nova as (a: T) => T)(antes) : nova);
    },
    [tela, doFluxo],
  );
  return [cena, mudarCena];
}

/** Põe uma tela numa cena, de fora dela (a T08 confirma a troca e o Início abre com a troca ativa). */
export function porCena<T>(tela: CodigoDaTela, cena: T): void {
  guardarCena(tela, cena);
}
