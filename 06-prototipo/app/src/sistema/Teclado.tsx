// O teclado do sistema, desenhado: o de e-mail (letras, com @ e ponto) e o numérico.
// É uma foto do sistema, nas cores do sistema. No celular de verdade ele não existe: sobe o teclado do celular.
// No computador, dá para digitar pelo teclado do computador ou clicando nas teclas desenhadas.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import './desenhado.css';

export type TipoDeTeclado = 'letras' | 'numeros';
export interface AlvoDoTeclado {
  inserir: (texto: string) => void;
  apagar: () => void;
  enviar?: () => void;
}
interface Contexto {
  abrir: (tipo: TipoDeTeclado, alvo: AlvoDoTeclado, rotuloDoIr?: string) => void;
  fechar: () => void;
}
const Ctx = createContext<Contexto>({ abrir: () => {}, fechar: () => {} });
export const usarTeclado = (): Contexto => useContext(Ctx);

const APAGAR = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
    <path d="m12 9 6 6" />
    <path d="m18 9-6 6" />
  </svg>
);
const MAIUSCULA = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
  </svg>
);
const EMOJI = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" x2="9.01" y1="9" y2="9" />
    <line x1="15" x2="15.01" y1="9" y2="9" />
  </svg>
);
const MICROFONE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

export interface TecladoProps {
  tipo: TipoDeTeclado;
  /** o que a tecla de retorno diz: "ir" no Entrar, "OK" no pedido */
  rotuloDoIr?: string;
  alvo?: AlvoDoTeclado;
}

/** O teclado desenhado. Sem alvo, é só a foto (o estado parado). */
export function Teclado({ tipo, rotuloDoIr = 'ir', alvo }: TecladoProps) {
  // a tecla não rouba o foco do campo: o toque insere e o campo continua ativo
  const tecla = (acao: () => void) => ({ onMouseDown: (ev: React.MouseEvent) => (ev.preventDefault(), acao()) });
  // o mesmo vale para o teclado inteiro: as teclas que o desenho não usa (123, maiúscula, emoji, microfone) e o vão
  // entre as teclas não fazem nada, e o campo continua ativo
  const semRoubarOFoco = { onMouseDown: (ev: React.MouseEvent) => ev.preventDefault() };
  const letra = (ch: string) => (
    <span key={ch} className="k" {...tecla(() => alvo?.inserir(ch))}>
      {ch}
    </span>
  );
  if (tipo === 'numeros') {
    return (
      <div className="kb numeros" aria-hidden="true" data-do-sistema {...semRoubarOFoco}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
          <span key={n} {...tecla(() => alvo?.inserir(n))}>
            {n}
          </span>
        ))}
        <span className="e" />
        <span {...tecla(() => alvo?.inserir('0'))}>0</span>
        <span className="e" {...tecla(() => alvo?.apagar())}>
          {APAGAR}
        </span>
      </div>
    );
  }
  return (
    <div className="kb letras" aria-hidden="true" data-do-sistema {...semRoubarOFoco}>
      <div className="r">
        <div className="g">{[...'qwertyuiop'].map(letra)}</div>
      </div>
      <div className="r">
        <div className="g">{[...'asdfghjklç'].map(letra)}</div>
      </div>
      <div className="r">
        <span className="k f w42">{MAIUSCULA}</span>
        <div className="g">{[...'zxcvbnm'].map(letra)}</div>
        <span className="k f w42" {...tecla(() => alvo?.apagar())}>
          {APAGAR}
        </span>
      </div>
      <div className="r">
        <div className="g sp">
          <span className="k f w87">123</span>
          <span className="k f sp" {...tecla(() => alvo?.inserir(' '))}>
            espaço
          </span>
          {/* o teclado de e-mail traz o @ e o ponto na última fileira; o de texto, não */}
          {rotuloDoIr === 'ir' && (
            <>
              <span className="k f" {...tecla(() => alvo?.inserir('@'))}>
                @
              </span>
              <span className="k f" {...tecla(() => alvo?.inserir('.'))}>
                .
              </span>
            </>
          )}
          <span className={clsx('k', 'go', 'w87')} {...tecla(() => alvo?.enviar?.())}>
            {rotuloDoIr}
          </span>
        </div>
      </div>
      <div className="kbs">
        <span className="ki">{EMOJI}</span>
        <span className="ki">{MICROFONE}</span>
      </div>
    </div>
  );
}

/** Quem guarda o teclado aberto na tela do aparelho. No celular de verdade não faz nada: o teclado é o do celular. */
export function LugarDoTeclado({ desenhar, children, porCima }: { desenhar: boolean; children: ReactNode; porCima: (no: ReactNode) => ReactNode }) {
  const [aberto, setAberto] = useState<{ tipo: TipoDeTeclado; rotuloDoIr?: string } | null>(null);
  const alvo = useRef<AlvoDoTeclado | null>(null);
  // o teclado some e o rodapé desce para o pé da tela. Se isso acontece no meio de um toque (a pessoa tocou no botão
  // com o teclado aberto), o botão sai de baixo do dedo e o toque se perde: o teclado espera o dedo sair da tela
  const dedoNaTela = useRef(false);
  const fechaAoSoltar = useRef(false);
  useEffect(() => {
    const desce = () => {
      dedoNaTela.current = true;
    };
    const sobe = () => {
      dedoNaTela.current = false;
      if (!fechaAoSoltar.current) return;
      fechaAoSoltar.current = false;
      // depois do toque: se outro campo ficou ativo nesse meio-tempo, o teclado é dele e fica
      window.setTimeout(() => !alvo.current && setAberto(null), 0);
    };
    document.addEventListener('pointerdown', desce, true);
    document.addEventListener('pointerup', sobe, true);
    document.addEventListener('pointercancel', sobe, true);
    return () => {
      document.removeEventListener('pointerdown', desce, true);
      document.removeEventListener('pointerup', sobe, true);
      document.removeEventListener('pointercancel', sobe, true);
    };
  }, []);
  const abrir = useCallback(
    (tipo: TipoDeTeclado, a: AlvoDoTeclado, rotuloDoIr?: string) => {
      if (!desenhar) return;
      alvo.current = a;
      fechaAoSoltar.current = false;
      setAberto({ tipo, rotuloDoIr });
    },
    [desenhar],
  );
  const fechar = useCallback(() => {
    alvo.current = null;
    if (dedoNaTela.current) fechaAoSoltar.current = true;
    else setAberto(null);
  }, []);
  const valor = useMemo(() => ({ abrir, fechar }), [abrir, fechar]);
  const ponte: AlvoDoTeclado = {
    inserir: (t) => alvo.current?.inserir(t),
    apagar: () => alvo.current?.apagar(),
    enviar: () => alvo.current?.enviar?.(),
  };
  return (
    <Ctx.Provider value={valor}>
      {children}
      {aberto && porCima(<Teclado tipo={aberto.tipo} rotuloDoIr={aberto.rotuloDoIr} alvo={ponte} />)}
    </Ctx.Provider>
  );
}
