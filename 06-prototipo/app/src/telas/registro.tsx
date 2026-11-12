// As 13 telas do app, pelo código. Cada tela mora na pasta dela.
import type { ComponentType } from 'react';
import { nomeDaTela, type CodigoDaTela } from '@/dados';
import { BarraDeStatus } from '@/sistema/BarraDeStatus';

export interface PropsDaTela {
  /** a referência em que o app está parado, ou nada quando está no fluxo */
  parado: string | null;
}

function SoONome({ codigo }: { codigo: CodigoDaTela }) {
  return (
    <>
      <BarraDeStatus />
      <div className="so-o-nome">
        <span>{codigo}</span>
        <b>{nomeDaTela(codigo)}</b>
      </div>
    </>
  );
}

const telas: Partial<Record<CodigoDaTela, ComponentType<PropsDaTela>>> = {};

export function registrarTela(codigo: CodigoDaTela, componente: ComponentType<PropsDaTela>): void {
  telas[codigo] = componente;
}

export function Tela({ codigo, parado }: { codigo: CodigoDaTela; parado: string | null }) {
  const Componente = telas[codigo];
  return Componente ? <Componente parado={parado} /> : <SoONome codigo={codigo} />;
}
