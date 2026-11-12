// O segmentado (F06): trilho em fundo-elevado, raio 12; a opção escolhida em fundo-cartao.
// No Entrar, duas opções de 44; na Aparência do Perfil, três de 38, com ícone.
import clsx from 'clsx';
import { Icone } from '@/ds/icone/Icone';
import { GlassSegmentedControl, GlassSegmentedControlItem } from '@/components/glassyui/glass-segmented-control';
import { usarVidro } from '@/ds/vidro/usarVidro';
import '@/ds/vidro/vidro.css';
import './segmentado.css';

export interface OpcaoDoSegmentado<T extends string> {
  valor: T;
  rotulo: string;
  icone?: string;
}

export interface SegmentadoProps<T extends string> {
  rotulo: string;
  opcoes: OpcaoDoSegmentado<T>[];
  valor: T;
  aoMudar?: (valor: T) => void;
  /** com ícone em cada opção (a Aparência) */
  comIcones?: boolean;
}

export function Segmentado<T extends string>({ rotulo, opcoes, valor, aoMudar, comIcones }: SegmentadoProps<T>) {
  const indice = opcoes.findIndex((o) => o.valor === valor);
  // de vidro, é o GlassSegmentedControl da GlassyUI, na cápsula dela, com o nosso tamanho (44 ou 38 de altura):
  // a opção escolhida é uma gota de vidro que desliza
  const deVidro = usarVidro('segmentado');
  if (deVidro) {
    return (
      <GlassSegmentedControl className={clsx('seg-de-vidro', comIcones && 'icones')} value={valor} onValueChange={(v) => aoMudar?.(v as T)} aria-label={rotulo} data-peca-de-vidro="segmentado" data-material="vidro">
        {opcoes.map((o) => (
          <GlassSegmentedControlItem key={o.valor} value={o.valor}>
            {o.icone && <Icone nome={o.icone} className="ic" tamanho={16} />}
            {o.rotulo}
          </GlassSegmentedControlItem>
        ))}
      </GlassSegmentedControl>
    );
  }
  return (
    <div className={clsx('seg', comIcones && 'icones')} role="radiogroup" aria-label={rotulo} data-peca-de-vidro="segmentado" data-material="solido" style={{ ['--seg-n' as string]: opcoes.length, ['--seg-i' as string]: indice }}>
      {opcoes.map((o, i) => (
        <span
          key={o.valor}
          className={o.valor === valor ? 'on' : undefined}
          role="radio"
          aria-checked={o.valor === valor}
          tabIndex={o.valor === valor ? 0 : -1}
          onClick={() => aoMudar?.(o.valor)}
          onKeyDown={(ev) => {
            const passo = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
            if (!passo) return;
            ev.preventDefault();
            const prox = opcoes[(i + passo + opcoes.length) % opcoes.length];
            aoMudar?.(prox.valor);
            (ev.currentTarget.parentElement?.children[(i + passo + opcoes.length) % opcoes.length] as HTMLElement | undefined)?.focus();
          }}
        >
          {o.icone && <Icone nome={o.icone} className="ic" tamanho={16} />}
          {o.rotulo}
        </span>
      ))}
    </div>
  );
}
