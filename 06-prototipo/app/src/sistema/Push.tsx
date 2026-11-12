// As duas fotos do celular com o aviso do app: a tela de bloqueio e a tela inicial com o banner no topo.
// São do sistema, simuladas: as cores e os glifos são os do celular, não os do app. Os avisos são os do app.
import type { ReactNode } from 'react';
import iconeDoApp from '@recursos/marca/icone-app.svg';
import { BarraDeStatus } from './BarraDeStatus';

/** Os apps da tela inicial desenhada: a forma do glifo, o fundo e a tinta de cada um. */
const GRADE: { forma: string; fundo?: string; tinta?: string; nome: string | null }[] = [{"forma": "hk-s", "fundo": "#F2F2F5", "tinta": "#8E8E93", "nome": "Agenda"}, {"forma": "hk-c", "fundo": "#B4695A", "tinta": "#FFFFFF", "nome": "Fotos"}, {"forma": "hk-r", "fundo": "#2C2C30", "tinta": "#E5E5EA", "nome": "Câmera"}, {"forma": "hk-h", "fundo": "#5B6B82", "tinta": "#FFFFFF", "nome": "Clima"}, {"forma": "hk-r", "fundo": "#1E1E22", "tinta": "#F2F2F5", "nome": "Relógio"}, {"forma": "app", "nome": "Fretamento"}, {"forma": "hk-l", "fundo": "#E6DCCB", "tinta": "#7A6A55", "nome": "Notas"}, {"forma": "hk-l", "fundo": "#F2F2F5", "tinta": "#8E8E93", "nome": "Lembretes"}, {"forma": "hk-s", "fundo": "#3E4A61", "tinta": "#DCE3EE", "nome": "Banco"}, {"forma": "hk-c", "fundo": "#9B5C74", "tinta": "#FFFFFF", "nome": "Música"}, {"forma": "hk-d", "fundo": "#C08A3E", "tinta": "#FFFFFF", "nome": "Livros"}, {"forma": "hk-r", "fundo": "#6C6F9C", "tinta": "#FFFFFF", "nome": "Podcasts"}, {"forma": "hk-s", "fundo": "#4F7C80", "tinta": "#FFFFFF", "nome": "Arquivos"}, {"forma": "hk-p", "fundo": "#F2F2F5", "tinta": "#B4695A", "nome": "Saúde"}, {"forma": "hk-l", "fundo": "#2C2C30", "tinta": "#E5E5EA", "nome": "Carteira"}, {"forma": "hk-c", "fundo": "#A3A8B4", "tinta": "#FFFFFF", "nome": "Contatos"}, {"forma": "hk-d", "fundo": "#5B6B82", "tinta": "#FFFFFF", "nome": "Tradutor"}, {"forma": "hk-c", "fundo": "#1E1E22", "tinta": "#B4695A", "nome": "Gravador"}, {"forma": "hk-p", "fundo": "#8E8E93", "tinta": "#FFFFFF", "nome": "Calculadora"}, {"forma": "hk-h", "fundo": "#6F5B4F", "tinta": "#F3E9E1", "nome": "Bússola"}];
const DOCA: { forma: string; fundo?: string; tinta?: string; nome: string | null }[] = [{"forma": "hk-r", "fundo": "#7C8255", "tinta": "#FFFFFF", "nome": null}, {"forma": "hk-c", "fundo": "#4F7C80", "tinta": "#FFFFFF", "nome": null}, {"forma": "hk-h", "fundo": "#F2F2F5", "tinta": "#5B6B82", "nome": null}, {"forma": "hk-l", "fundo": "#3E4A61", "tinta": "#DCE3EE", "nome": null}];

export interface AvisoDoCelular {
  titulo: ReactNode;
  texto: ReactNode;
  quando: string;
}

/** O cartão de aviso do sistema, com o ícone do app. */
function CartaoDeAviso({ aviso, noTopo }: { aviso: AvisoDoCelular; noTopo?: boolean }) {
  return (
    <div className={noTopo ? 'nt-card nt-hu' : 'nt-card'}>
      <img className="nt-ic" src={iconeDoApp} width={38} height={38} alt="Fretamento" />
      <div className="nt-tx">
        <div className="nt-h">
          <b>{aviso.titulo}</b>
          <span>{aviso.quando}</span>
        </div>
        <p>{aviso.texto}</p>
      </div>
    </div>
  );
}

function App({ app }: { app: (typeof GRADE)[number] }) {
  return (
    <div className="hs-app">
      {app.forma === 'app' ? (
        <img src={iconeDoApp} width={60} height={60} alt="" />
      ) : (
        <i className={app.forma} style={{ background: app.fundo, color: app.tinta }}>
          <b />
        </i>
      )}
      {app.nome && <span>{app.nome}</span>}
    </div>
  );
}

/** A tela de bloqueio do celular, com os avisos do app empilhados. Tocar num aviso abre o app. */
export function TelaDeBloqueio({ data, hora, avisos, aoTocar }: { data: string; hora: string; avisos: AvisoDoCelular[]; aoTocar?: () => void }) {
  return (
    <div className="fx-push" data-do-sistema onClick={aoTocar}>
      <div className="ph ls">
        <BarraDeStatus fundo="nenhum" semHora />
        <div className="ls-top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="ls-date">{data}</span>
          <span className="ls-clock">{hora}</span>
        </div>
        <div className="ls-list">
          {avisos.map((a, i) => (
            <CartaoDeAviso key={i} aviso={a} />
          ))}
        </div>
        <div className="ls-btn l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z" /><line x1="6" x2="18" y1="6" y2="6" /><line x1="12" x2="12" y1="12" y2="12" /></svg></div>
        <div className="ls-btn r"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg></div>
        <div className="hb" />
      </div>
    </div>
  );
}

/** A tela inicial do celular, com o aviso do app no topo. Some sozinho e fica na lista. */
export function TelaInicialDoCelular({ aviso, aoTocar }: { aviso: AvisoDoCelular; aoTocar?: () => void }) {
  return (
    <div className="fx-push" data-do-sistema onClick={aoTocar}>
      <div className="ph hs">
        <BarraDeStatus fundo="nenhum" />
        <div className="hs-grid">
          {GRADE.map((a, i) => (
            <App key={i} app={a} />
          ))}
        </div>
        <div className="hs-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Buscar
        </div>
        <div className="hs-dock">
          {DOCA.map((a, i) => (
            <App key={i} app={a} />
          ))}
        </div>
        <CartaoDeAviso aviso={aviso} noTopo />
        <div className="hb" />
      </div>
    </div>
  );
}
