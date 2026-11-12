// Os botões (F06). Um primário por tela, em vivo. Sem hover: só pressionado e desligado.
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { GlassButton } from '@/components/glassyui/glass-button';
import { GlassSpinner } from '@/components/glassyui/glass-spinner';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { usarEstado } from '@/estado/armazem';
import './botao.css';

type Nativo = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export interface BotaoProps extends Nativo {
  variante?: 'primario' | 'secundario' | 'destrutivo';
  /** desligado: fundo-elevado com tinta-apagada. Não responde ao toque */
  desligado?: boolean;
  /** carregando: a barra no lugar do texto, por 700 ms */
  carregando?: boolean;
  /** o texto enquanto carrega, para o leitor de tela: "Enviando", "Validando" */
  rotuloCarregando?: string;
  icone?: string;
  children: ReactNode;
}

export function Botao({ variante = 'primario', desligado, carregando, rotuloCarregando, icone, children, className, ...resto }: BotaoProps) {
  const deVidro = usarVidro('botoes');
  const comLente = usarEstado((e) => e.endereco.lente);
  // de vidro, é o botão da biblioteca, na forma que ela propõe (a cápsula): o primário é vidro tingido de vivo, o
  // destrutivo é vidro tingido de perigo, e o secundário é vidro claro. Carregando, o botão fica como está, parado,
  // com o anel de espera da biblioteca (GlassSpinner) antes do texto
  if (deVidro) {
    return (
      <GlassButton
        variant={variante === 'secundario' || desligado ? 'primary' : 'prominent'}
        preset={variante === 'secundario' || desligado ? 'control' : 'showcase'}
        lens={comLente}
        className={clsx('btn-de-vidro', variante === 'destrutivo' && !desligado && 'dgr', desligado && 'dis', carregando && 'carregando', className)}
        disabled={desligado}
        aria-busy={carregando || undefined}
        tabIndex={carregando ? -1 : undefined}
        data-peca-de-vidro="botoes"
        data-material="vidro"
        {...resto}
      >
        {carregando ? <GlassSpinner size="sm" aria-hidden /> : icone && <Icone nome={icone} />}
        {carregando ? (rotuloCarregando ?? children) : children}
      </GlassButton>
    );
  }
  return (
    <button
      type="button"
      className={clsx('btn', variante === 'secundario' && 'sec', variante === 'destrutivo' && 'dgr', desligado && 'dis', carregando && 'load', deVidro && 'capsula', className)}
      disabled={desligado || carregando}
      aria-busy={carregando || undefined}
      data-peca-de-vidro="botoes"
      data-material={deVidro ? 'vidro' : 'solido'}
      {...resto}
    >
      {carregando ? (
        <>
          <span className="barra" aria-hidden="true" />
          {rotuloCarregando ?? children}
        </>
      ) : (
        <>
          {icone && <Icone nome={icone} />}
          {children}
        </>
      )}
    </button>
  );
}

export interface BotaoLinkProps extends Nativo {
  /** onde o link se alinha: à esquerda (padrão) ou no centro */
  alinhar?: 'esquerda' | 'centro';
  /** o link pequeno, de 13, dos textos legais */
  pequeno?: boolean;
  children: ReactNode;
}

/** A espera sem botão: o anel da biblioteca e uma palavra, no lugar onde a resposta vai aparecer.
    É o estado "validando" do Código, que começa sozinho no sexto dígito. */
export function Validando({ children }: { children: ReactNode }) {
  const deVidro = usarVidro('botoes');
  return (
    <p className="t13 validando" role="status" aria-live="polite">
      {deVidro ? <GlassSpinner size="sm" aria-hidden /> : <span className="anel" aria-hidden="true" />}
      {children}
    </p>
  );
}

export function BotaoLink({ alinhar = 'esquerda', pequeno, className, children, ...resto }: BotaoLinkProps) {
  return (
    <button type="button" className={clsx('lnk', alinhar === 'centro' && 'centro', pequeno && 'pequeno', className)} {...resto}>
      {children}
    </button>
  );
}

/** Dois botões lado a lado, no sheet: o que desiste à esquerda, o que confirma à direita. */
export function DoisBotoes({ children, comRespiro }: { children: ReactNode; /** com 4 de respiro em cima, dentro de um cartão */ comRespiro?: boolean }) {
  return <div className={comRespiro ? 'acts2x com-respiro' : 'acts2x'}>{children}</div>;
}
