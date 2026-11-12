// O palco: a moldura que apresenta o protótipo no computador. O app no meio, os estados do lado,
// as telas atrás do botão do canto. O palco não é produto: nada dele entra no app, e nada do app vaza para ele.
import { useEffect, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { palco, nomeDaTela, TELAS } from '@/dados';
import { usarEstado, telaVisivel, temaDe, irPara, escolherAparencia, temTocador } from '@/estado/armazem';
import { tocarOuPausar, avancar, voltarUmPasso } from '@/estado/dia';
import { Aparelho } from '@/sistema/Aparelho';
import { TelaDoAparelho } from '@/TelaDoAparelho';
import { ListaDeEstados, VoltarAoFluxo, DICA_DO_FLUXO } from './Estados';
import { Tocador } from './Tocador';
import './palco.css';

/** A data desta versão do protótipo, a mesma do registro de mudanças. Não é o relógio de verdade. */
export const ATUALIZADO_EM = '12/11/2026';
export const NOME_DO_PROTOTIPO = 'App Passageiro';

const APARELHO = { largura: 432, altura: 886 }; // a tela de 390 × 844, mais a borda de 15 e o aro de 6
const COLUNA = { largura: 300, distancia: 40 };
const MARGEM = 24;

/** Em janela mais baixa, o aparelho encolhe por inteiro. */
const escalaDoAparelho = (altura: number): number => Math.min(1, (altura - 2 * MARGEM) / APARELHO.altura);
/** A largura em que o palco cabe inteiro, nesta altura de janela: a margem, o aparelho, a distância, a coluna e a margem. */
export const larguraDoPalco = (altura: number): number => MARGEM + APARELHO.largura * escalaDoAparelho(altura) + COLUNA.distancia + COLUNA.largura + MARGEM;

/** O Modo claro do palco e a Aparência do Perfil são a mesma chave. Ligado é o Claro, desligado é o Escuro; com a
    Aparência no Sistema, o interruptor mostra o tema que está valendo, e mexer nele grava Claro ou Escuro. */
export function ModoEscuro() {
  const tema = usarEstado(temaDe);
  const ligado = tema === 'claro';
  return (
    <div className="pl-mode">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <span>Modo claro</span>
      <button type="button" className={clsx('pl-sw', ligado && 'on')} role="switch" aria-checked={ligado} aria-label="Modo claro" onClick={() => escolherAparencia(ligado ? 'escuro' : 'claro')}>
        <i />
      </button>
    </div>
  );
}

function Painel({ fechar }: { fechar: () => void }) {
  const tela = usarEstado(telaVisivel);
  useEffect(() => {
    const tecla = (ev: KeyboardEvent) => ev.key === 'Escape' && fechar();
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [fechar]);
  return (
    <>
      <div className="pl-pele pl-fora" onClick={fechar} />
      <aside className="pl-pele pl-side" aria-label="Painel do protótipo">
        <div className="pl-sh">
          <div>
            <div className="pl-eb">Protótipo</div>
            <h3>{NOME_DO_PROTOTIPO}</h3>
          </div>
          <button type="button" className="pl-x" aria-label="Fechar o painel" onClick={fechar} autoFocus>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <nav className="pl-sb" aria-label="As telas">
          <div className="pl-sl">
            <span className="pl-eb">As telas</span>
          </div>
          {TELAS.map((t) => (
            <button key={t} type="button" className={clsx('pl-nv', t === tela && 'on')} aria-current={t === tela ? 'page' : undefined} onClick={() => irPara(t)}>
              <span className="c">{t}</span>
              <span className="nm">{nomeDaTela(t)}</span>
            </button>
          ))}
        </nav>
        <div className="pl-sf">
          <ModoEscuro />
          <div className="pl-upd">Atualizado em {ATUALIZADO_EM}</div>
        </div>
      </aside>
    </>
  );
}

export function Palco() {
  const tela = usarEstado(telaVisivel);
  const parado = usarEstado((e) => e.parado);
  const [painel, setPainel] = useState(false);
  const [janela, setJanela] = useState({ l: window.innerWidth, a: window.innerHeight });
  useLayoutEffect(() => {
    const mede = () => setJanela({ l: window.innerWidth, a: window.innerHeight });
    window.addEventListener('resize', mede);
    return () => window.removeEventListener('resize', mede);
  }, []);

  // no teclado, com o foco fora do app: espaço é play ou pausa; as setas esquerda e direita são voltar e avançar
  useEffect(() => {
    const tecla = (ev: KeyboardEvent) => {
      const alvo = ev.target as HTMLElement | null;
      if (alvo?.closest('#tela-do-aparelho') || alvo?.closest('button, input, select, textarea, [role="switch"]')) return;
      if (!temTocador(tela) || parado) return;
      if (ev.key === ' ') (ev.preventDefault(), tocarOuPausar());
      if (ev.key === 'ArrowRight') avancar();
      if (ev.key === 'ArrowLeft') voltarUmPasso();
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [tela, parado]);

  // em janela mais baixa, o aparelho encolhe por inteiro; nunca corta. A coluna acompanha a altura dele
  const escala = escalaDoAparelho(janela.a);
  const larg = APARELHO.largura * escala;
  const alt = APARELHO.altura * escala;
  const meio = (janela.l - larg) / 2;
  const cabeAColuna = janela.l - MARGEM - COLUNA.largura - COLUNA.distancia - larg;
  const x = Math.max(MARGEM, Math.min(meio, cabeAColuna));
  const y = (janela.a - alt) / 2;

  return (
    <div className="pl pl-stage" data-palco data-tema="escuro">
      <button type="button" className="pl-pele pl-cnr" aria-label={painel ? 'Fechar o painel do protótipo' : 'Abrir o painel do protótipo'} aria-expanded={painel} onClick={() => setPainel(!painel)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      </button>
      <div className="pl-lugar" style={{ left: x, top: y, transform: `scale(${escala})` }}>
        <Aparelho>
          <TelaDoAparelho />
        </Aparelho>
      </div>
      <section className="pl-pele pl-col" aria-label="Estados desta tela" style={{ left: x + larg + COLUNA.distancia, top: y, height: alt }}>
        <div className="pl-eb">Estados desta tela</div>
        <div className="pl-ttl">
          {tela} · {palco.telas.find((t) => t.codigo === tela)?.nome}
        </div>
        {parado ? <VoltarAoFluxo /> : <div className="pl-hint">{DICA_DO_FLUXO}</div>}
        <ListaDeEstados tela={tela} />
        {temTocador(tela) && <Tocador />}
      </section>
      {painel && <Painel fechar={() => setPainel(false)} />}
    </div>
  );
}
