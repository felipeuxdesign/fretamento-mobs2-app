// O banner fixo de aviso (F02, F04): logo abaixo da barra, com a faixa da esquerda e o ícone dizendo o nível.
// Empilha até dois, por prioridade; um terceiro espera a vez.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { BotaoDeIcone } from '@/ds/barra/Barra';
import { Material } from '@/ds/vidro/Material';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { usarDentroDaBarraDeVidro } from '@/ds/barra/Topo';
import './banner.css';

export interface AcaoDoBanner {
  rotulo: string;
  aoTocar?: () => void;
}

export interface BannerProps {
  nivel?: 'info' | 'atencao';
  icone: string;
  children: ReactNode;
  acoes?: AcaoDoBanner[];
  aoFechar?: () => void;
  /** o banner do Entrar, de uma linha só, com respiro de 16 à direita */
  largo?: boolean;
}

export function Banner({ nivel = 'info', icone, children, acoes, aoFechar, largo }: BannerProps) {
  const deVidro = usarVidro('banner');
  const naBarraDeVidro = usarDentroDaBarraDeVidro();
  // dentro de uma barra de vidro, o banner não é outro vidro (vidro nunca fica sobre vidro):
  // ele usa o vidro da barra, e só a faixa, o ícone e o tom dizem o nível
  const Caixa = ({ className, children: miolo }: { className: string; children: ReactNode }) =>
    naBarraDeVidro ? (
      <div className={clsx(className, !deVidro && 'mantem')} role="status" data-peca-de-vidro="banner" data-material={deVidro ? 'vidro' : 'solido'}>
        {miolo}
      </div>
    ) : (
      <Material peca="banner" tamanho="medio" lente={false} className={className} role="status">
        {miolo}
      </Material>
    );
  if (largo) {
    return (
      <Caixa className="bf largo">
        <Icone nome={icone} />
        <span className="cresce">{children}</span>
      </Caixa>
    );
  }
  return (
    <Caixa className={clsx('bf', nivel === 'atencao' && 'w')}>
      <Icone nome={icone} className="ic" />
      <div className="bt">
        <span>{children}</span>
        {acoes && acoes.length > 0 && (
          <div className="ba">
            {acoes.map((a) => (
              <button key={a.rotulo} type="button" className="bb" onClick={a.aoTocar}>
                {a.rotulo}
              </button>
            ))}
          </div>
        )}
      </div>
      {aoFechar && <BotaoDeIcone rotulo="Fechar aviso" icone="fechar" tamanho={20} className="fecha" onClick={aoFechar} />}
    </Caixa>
  );
}

/** A pilha de banners: mostra os dois de maior prioridade, na ordem dada. */
export function PilhaDeBanners({ children }: { children: ReactNode[] }) {
  const validos = children.filter(Boolean).slice(0, 2);
  return validos.length ? <>{validos}</> : null;
}
