// A barra de status do iPhone dos quadros: 9:41, sinal, rede e bateria. No celular de verdade é a do sistema.
import { mock } from '@/dados';

export function BarraDeStatus({ fundo = 'pagina', semHora }: { fundo?: 'pagina' | 'cartao' | 'nenhum'; /** na tela de bloqueio, a hora é a do relógio grande */ semHora?: boolean }) {
  return (
    <div className={fundo === 'cartao' ? 'sa cartao' : 'sa'} aria-hidden="true">
      <span className="st-t">{semHora ? null : mock.relogio.barraDeStatus}</span>
      <span className="st-i">
        <svg width="18" height="12" viewBox="0 0 18 12">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <circle cx="8.5" cy="10.3" r="1.6" />
          <path d="M5.1 7.6a4.9 4.9 0 0 1 6.8 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M1.8 4.4a9.6 9.6 0 0 1 13.4 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity=".4" />
          <rect x="2" y="2" width="20" height="9" rx="2" />
          <path d="M25 4.3v4.4a2.2 2.2 0 0 0 0-4.4Z" fillOpacity=".4" />
        </svg>
      </span>
    </div>
  );
}

/** O indicador de início, no pé da tela. */
export function IndicadorDeInicio() {
  return <div className="hb" aria-hidden="true" />;
}
