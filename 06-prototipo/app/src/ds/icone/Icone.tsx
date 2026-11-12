// O componente de ícone, montado a partir dos 64 SVG de 05-recursos/icones. Sempre em currentColor.
// Os arquivos entram crus no build; aqui só se lê o viewBox e o desenho de cada um.
import type { CSSProperties } from 'react';

const arquivos = import.meta.glob('@recursos/icones/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

interface Desenho {
  viewBox: string;
  cheio: boolean;
  miolo: string;
}

const DESENHOS: Record<string, Desenho> = {};
for (const [caminho, svg] of Object.entries(arquivos)) {
  const nome = caminho.split('/').pop()!.replace('.svg', '');
  const cabeca = svg.slice(0, svg.indexOf('>') + 1);
  DESENHOS[nome] = {
    viewBox: /viewBox="([^"]+)"/.exec(cabeca)?.[1] ?? '0 0 24 24',
    cheio: /fill="currentColor"/.test(cabeca),
    miolo: svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>')),
  };
}

// Dois glifos que as telas desenham e que não estão entre os 64 arquivos: o triângulo de "saiu" e o sino sem badalo.
// O desenho de cada um foi lido das referências (T09, T10, T11).
DESENHOS.saiu = { viewBox: '1 0 24 24', cheio: false, miolo: '<polygon points="6 3 20 12 6 21 6 3"/>' };
DESENHOS.sino = { viewBox: '0 0 24 24', cheio: false, miolo: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>' };

export const NOMES_DOS_ICONES = Object.keys(DESENHOS).sort();
export type NomeDoIcone = string;

export interface IconeProps {
  nome: NomeDoIcone;
  /** lado, em px. Sem ele, o tamanho vem da folha de estilo da peça */
  tamanho?: number;
  /** espessura do traço: 2 por padrão; 2,4 no trilho, 2,2 no mapa, 1,5 no estado central */
  traco?: number;
  className?: string;
  style?: CSSProperties;
  /** nome para o leitor de tela; sem ele, o ícone é decorativo */
  rotulo?: string;
}

export function Icone({ nome, tamanho, traco = 2, className, style, rotulo }: IconeProps) {
  const d = DESENHOS[nome];
  if (!d) {
    if (import.meta.env.DEV) console.warn(`ícone sem arquivo: ${nome}`);
    return null;
  }
  return (
    <svg
      className={className}
      style={style}
      width={tamanho}
      height={tamanho}
      viewBox={d.viewBox}
      fill={d.cheio ? 'currentColor' : 'none'}
      stroke={d.cheio ? 'none' : 'currentColor'}
      strokeWidth={d.cheio ? undefined : traco}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={rotulo ? 'img' : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      dangerouslySetInnerHTML={{ __html: d.miolo }}
    />
  );
}
