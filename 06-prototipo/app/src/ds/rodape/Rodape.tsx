// O rodapé fixo com o botão (F02): a legenda, quando tem, acima do botão de 48.
import type { ReactNode } from 'react';
import { Material } from '@/ds/vidro/Material';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './rodape.css';

export function Rodape({ legenda, children, indicadorDentro }: { legenda?: ReactNode; children: ReactNode; indicadorDentro?: boolean }) {
  const deVidro = usarVidro('rodape');
  // de vidro, o rodapé não é uma faixa: o botão flutua sobre o fim da rolagem, e a borda de rolagem (um desfoque
  // que some para cima) segura a legenda. Quem é vidro é o botão
  if (deVidro) {
    return (
      <footer className="ft flutuante" data-peca-de-vidro="rodape" data-material="vidro">
        <div className="borda-de-rolagem de-baixo" aria-hidden="true" />
        {legenda && <p className="t13 ao-centro">{legenda}</p>}
        {children}
        {indicadorDentro && <div className="hb-dentro" aria-hidden="true" />}
      </footer>
    );
  }
  return (
    <Material peca="rodape" tamanho="medio" lente={false} como="footer" className="ft">
      {legenda && <p className="t13 ao-centro">{legenda}</p>}
      {children}
      {indicadorDentro && <div className="hb-dentro" aria-hidden="true" />}
    </Material>
  );
}
