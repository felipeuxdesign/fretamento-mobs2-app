// A gaveta do celular: com ?palco=1 no celular de verdade, uma aba de 6 × 44 na borda esquerda abre a gaveta,
// de baixo, por cima do app, com véu. Tem os mesmos grupos do palco, na mesma ordem. É assim que se testa com gente.
import { useEffect, useRef, useState } from 'react';
import { TELAS, nomeDaTela, type CodigoDaTela } from '@/dados';
import { usarEstado, telaVisivel, irPara, temTocador } from '@/estado/armazem';
import { LinhasDeEstado, VoltarAoFluxo } from './Estados';
import { Tocador } from './Tocador';
import { ModoEscuro, NOME_DO_PROTOTIPO } from './Palco';
import './palco.css';

export function Gaveta() {
  const tela = usarEstado(telaVisivel);
  const parado = usarEstado((e) => e.parado);
  const [aberta, setAberta] = useState(false);
  const arrasto = useRef<number | null>(null);
  useEffect(() => {
    const tecla = (ev: KeyboardEvent) => ev.key === 'Escape' && setAberta(false);
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, []);
  return (
    <div className="pl" data-tema="escuro" data-gaveta-do-palco>
      {!aberta && <button type="button" className="pl-pele pl-tab" aria-label="Abrir o palco" data-aba-do-palco onClick={() => setAberta(true)} />}
      {aberta && (
        <>
          <div className="pl-pele pl-scrim" onClick={() => setAberta(false)} />
          <div className="pl-pele pl-dr" role="dialog" aria-label="Palco do protótipo">
            <div className="pl-grip" />
            <div
              className="pl-sh"
              onPointerDown={(ev) => (arrasto.current = ev.clientY)}
              onPointerUp={(ev) => {
                // puxar para baixo fecha
                if (arrasto.current != null && ev.clientY - arrasto.current > 60) setAberta(false);
                arrasto.current = null;
              }}
            >
              <div>
                <div className="pl-eb">Protótipo</div>
                <h3>{NOME_DO_PROTOTIPO}</h3>
              </div>
              <button type="button" className="pl-x" aria-label="Fechar a gaveta" onClick={() => setAberta(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="pl-dsb">
              <label className="pl-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span>Tela</span>
                <span className="r">
                  {tela} · {nomeDaTela(tela)}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <select aria-label="Tela" value={tela} onChange={(ev) => irPara(ev.target.value as CodigoDaTela)}>
                  {TELAS.map((t) => (
                    <option key={t} value={t}>
                      {t} · {nomeDaTela(t)}
                    </option>
                  ))}
                </select>
              </label>
              {parado && <VoltarAoFluxo />}
              <div className="pl-dsl">
                <span className="pl-eb">Estados desta tela</span>
              </div>
              <div className="pl-tch">
                <LinhasDeEstado tela={tela} aoEscolher={() => setAberta(false)} />
              </div>
              <div className="pl-dft">
                {temTocador(tela) && <Tocador semTeclado />}
                <ModoEscuro />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
