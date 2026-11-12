// A tela do aparelho: 390 × 844, reta por dentro. É a raiz do app, e é aqui que o tema entra (data-tema).
import { usarVidro } from '@/ds/vidro/usarVidro';
import { useState, type SyntheticEvent } from 'react';
import clsx from 'clsx';
import { usarEstado, temaDe, telaVisivel, pedirVolta } from '@/estado/armazem';
import { Tela } from '@/telas/registro';
import { IndicadorDeInicio } from '@/sistema/BarraDeStatus';
import { LugarDoPorCima } from '@/ds/tela/PorCima';
import { LugarDoTeclado } from '@/sistema/Teclado';
import { createPortal } from 'react-dom';

export function TelaDoAparelho({ doCelular = false }: { doCelular?: boolean }) {
  const tema = usarEstado(temaDe);
  const tela = usarEstado(telaVisivel);
  const parado = usarEstado((e) => e.parado);
  const vidro = usarEstado((e) => e.vidro);
  const fundo = usarEstado((e) => e.endereco.fundo);
  const receita = usarEstado((e) => e.endereco.receita);
  const conteudoDeVidro = usarVidro('conteudo');
  const [porCima, setPorCima] = useState<HTMLElement | null>(null);

  // parado, o app é uma foto: não responde a toque nem a teclado, só rola. Tocar nele faz o palco pedir a volta.
  const foto = (ev: SyntheticEvent) => {
    if (!parado) return;
    ev.preventDefault();
    ev.stopPropagation();
    pedirVolta();
  };
  const soCongela = (ev: SyntheticEvent) => {
    if (!parado) return;
    ev.preventDefault();
    ev.stopPropagation();
  };

  return (
    <div
      id="tela-do-aparelho"
      className={clsx('ph', doCelular && 'do-celular', parado && 'parado')}
      data-tema={tema}
      data-vidro={vidro ? '1' : '0'}
      data-conteudo={conteudoDeVidro ? 'vidro' : undefined}
      data-fundo={fundo ?? undefined}
      data-receita={receita ?? undefined}
      data-tela={tela}
      data-ref={parado ?? undefined}
      onClickCapture={foto}
      onMouseDownCapture={soCongela}
      onKeyDownCapture={soCongela}
      onBeforeInputCapture={soCongela}
    >
      {/* com o conteúdo de vidro, o fundo de luz fica parado atrás de tudo: é o que o vidro deixa ver */}
      {conteudoDeVidro && <div className="ambiente" aria-hidden="true" />}
      <LugarDoPorCima.Provider value={porCima}>
        {/* no computador, o campo ativo sobe o teclado desenhado; no celular de verdade, sobe o do celular */}
        <LugarDoTeclado desenhar={!doCelular && !parado} porCima={(no) => (porCima ? createPortal(no, porCima) : null)}>
          <Tela key={parado ?? tela} codigo={tela} parado={parado} />
        </LugarDoTeclado>
        <div className="por-cima" ref={setPorCima} />
      </LugarDoPorCima.Provider>
      <IndicadorDeInicio />
    </div>
  );
}
