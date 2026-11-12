// A barra do topo (F02): 56 de altura. Na home, a saudação, o sino com a contagem e o avatar;
// nas internas, o voltar e o título.
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { GlassButton } from '@/components/glassyui/glass-button';
import { GlassPanel } from '@/components/glassyui/glass-panel';
import { usarEstado } from '@/estado/armazem';
import { usarBarraDeVidro } from './Topo';
import './barra.css';

export interface BotaoDeIconeProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'aria-label'> {
  /** o nome acessível: obrigatório, o botão só tem o glifo */
  rotulo: string;
  icone?: string;
  /** lado do glifo: 24 na barra, 20 no fechar do banner */
  tamanho?: number;
  /** é um botão da barra do topo (voltar, sino, perfil): de vidro, ganha o disco no toque */
  daBarra?: boolean;
  /** o que fica por cima do botão e sai da forma dele: o contador do sino */
  porFora?: ReactNode;
  children?: ReactNode;
}

export function BotaoDeIcone({ rotulo, icone, tamanho, children, className, daBarra, porFora, ...resto }: BotaoDeIconeProps) {
  const deVidro = usarVidro('botoesDaBarra') && !!daBarra;
  const comLente = usarEstado((e) => e.endereco.lente);
  // de vidro, o botão da barra mora numa esfera de vidro pequena, com a lente: o glifo fica em cima dela.
  // O que sai da esfera (o contador do sino) vai por fora, para não ser cortado
  if (deVidro) {
    return (
      <span className="esfera-da-barra">
        <GlassButton variant="primary" lens={comLente} className={clsx('esfera', className)} aria-label={rotulo} data-peca-de-vidro="botoesDaBarra" data-material="vidro" {...resto}>
          {icone && <Icone nome={icone} tamanho={tamanho} />}
          {children}
        </GlassButton>
        {porFora}
      </span>
    );
  }
  return (
    <button type="button" className={clsx('ib', className)} aria-label={rotulo} data-peca-de-vidro={daBarra ? 'botoesDaBarra' : undefined} data-material={daBarra ? 'solido' : undefined} {...resto}>
      {icone && <Icone nome={icone} tamanho={tamanho} />}
      {children}
      {porFora}
    </button>
  );
}

export interface BarraProps {
  /** home: saudação, sino e avatar · interna: voltar e título · so-titulo: sem voltar · nua: só o voltar, sobre a página */
  variante?: 'interna' | 'home' | 'so-titulo' | 'nua';
  titulo?: ReactNode;
  aoVoltar?: () => void;
  /** o que fica à direita do título: uma ação de texto, o sino, o avatar */
  children?: ReactNode;
  className?: string;
}

export function Barra({ variante = 'interna', titulo, aoVoltar, children, className }: BarraProps) {
  // sobre o mapa, de vidro, o título vai numa cápsula: tudo o que flutua sobre o mapa é vidro
  const tipo = usarBarraDeVidro();
  const comLenteNaCapsula = usarEstado((e) => e.endereco.lente);
  return (
    <header className={clsx('tb', variante !== 'interna' && variante, className)}>
      {aoVoltar && <BotaoDeIcone daBarra rotulo="Voltar" icone="voltar" onClick={aoVoltar} />}
      {titulo !== undefined &&
        (tipo === 'barraDoMapa' ? (
          <GlassPanel variant="pill" preset="control" lens={comLenteNaCapsula} className="titulo-em-capsula" data-peca-de-vidro="barraDoMapa" data-material="vidro">
            <h2>{titulo}</h2>
          </GlassPanel>
        ) : (
          <h2>{titulo}</h2>
        ))}
      {children}
    </header>
  );
}

/** O botão do perfil, na home: o avatar. De vidro, o avatar da biblioteca já é a peça redonda: não entra numa esfera. */
export function BotaoDoPerfil({ children, inicial, onClick }: { children: ReactNode; /** a inicial de quem usa, para a esfera de vidro */ inicial?: string; onClick?: () => void }) {
  const deVidro = usarVidro('botoesDaBarra');
  const esferaNeutra = usarVidro('conteudo') && !!inicial;
  const comLente = usarEstado((e) => e.endereco.lente);
  if (!deVidro)
    return (
      <BotaoDeIcone daBarra rotulo="Perfil" onClick={onClick}>
        {children}
      </BotaoDeIcone>
    );
  // com o conteúdo de vidro, o perfil é a mesma esfera de vidro do sino, com a inicial no lugar do glifo
  if (esferaNeutra)
    return (
      <span className="esfera-da-barra">
        <GlassButton variant="primary" lens={comLente} className="esfera do-perfil" aria-label="Perfil" data-peca-de-vidro="botoesDaBarra" data-material="vidro" onClick={onClick}>
          <span className="inicial-do-perfil" aria-hidden="true">
            {inicial}
          </span>
        </GlassButton>
      </span>
    );
  return (
    <button type="button" className="ib do-perfil" aria-label="Perfil" data-peca-de-vidro="botoesDaBarra" data-material="vidro" onClick={onClick}>
      {children}
    </button>
  );
}

/** O sino da home, com a contagem dos avisos não lidos. */
export function Sino({ naoLidos, onClick }: { naoLidos: number; onClick?: () => void }) {
  return (
    <BotaoDeIcone daBarra rotulo={naoLidos ? `Notificações, ${naoLidos} não lidas` : 'Notificações'} icone="aviso" tamanho={24} onClick={onClick} porFora={naoLidos > 0 ? <span className="badge">{naoLidos}</span> : undefined} />
  );
}
