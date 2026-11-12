// O cartão do herói (F07): o elemento-assinatura do app. O número grande, com o selo de confiança colado
// e o alvo escrito acima. O estado muda o conteúdo; a forma do cartão muda só em chegando e no ponto
// (fundo-destaque, raio 24) e em cancelada (borda perigo).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Cartao, Divisoria } from '@/ds/cartao/Cartao';
import { Selo, Selos, type TipoDeSelo } from '@/ds/selo/Selo';
import './heroi.css';

export interface SeloDoHeroi {
  tipo: TipoDeSelo;
  icone?: string;
  texto: string;
}

export interface ChegadaDoHeroi {
  rotulo: string;
  lugar: string;
  hora: string;
  /** "programado", sob a hora, quando ela não é ao vivo */
  sob?: string;
  apagada?: boolean;
}

export interface HeroiProps {
  forma?: 'normal' | 'destaque' | 'perigo';
  /** "Linha 210 · Macaxeira – Fábrica" */
  linha: ReactNode;
  /** "Ida de sempre · ônibus 1234 · ABC1D23" */
  viagem: ReactNode;
  /** a linha fina entre o cabeçalho e o número: some nos cartões em destaque */
  comDivisoria?: boolean;
  /** de quem é o horário: "Passa no seu ponto · Av. Abdias de Carvalho, 1200" */
  alvo: ReactNode;
  /** "cerca de", antes do número, no dado aproximado */
  antes?: ReactNode;
  /** "18 min", "06:42", "Chegando" */
  numero: ReactNode;
  /** apagado: o programado · riscado: a viagem cancelada */
  tom?: 'apagado' | 'riscado';
  /** "às 06:42", "horário programado" */
  complemento?: ReactNode;
  /** o complemento numa linha própria, abaixo do número ("previsão feita às 06:24") */
  complementoAbaixo?: ReactNode;
  selos?: SeloDoHeroi[];
  /** o texto ao lado do selo, em apoio ("menos de 2 min") */
  aoLadoDoSelo?: ReactNode;
  /** a linha de ajuda, logo abaixo dos selos, dentro do bloco do número */
  ajuda?: ReactNode;
  /** o que vem depois do bloco do número: a placa, a ação, a nota, o link */
  children?: ReactNode;
  chegada?: ChegadaDoHeroi;
  /** muda quando o estado do herói muda: o conteúdo faz o fade cruzado de 150 ms (movimento 3). O número, sozinho, só troca */
  chave?: string;
}

export function Heroi({ forma = 'normal', linha, viagem, comDivisoria = true, alvo, antes, numero, tom, complemento, complementoAbaixo, selos, aoLadoDoSelo, ajuda, children, chegada, chave }: HeroiProps) {
  return (
    <Cartao variante={forma === 'destaque' ? 'destaque' : forma === 'perigo' ? 'perigo' : 'normal'} className="heroi">
      <div className="h-cab">
        <h3 className="t17">{linha}</h3>
        <p className="t13">{viagem}</p>
      </div>
      {comDivisoria && <Divisoria />}
      <div className="h-num" key={chave} data-troca={chave ? '' : undefined}>
        <p className="t13b">{alvo}</p>
        <div className="h-linha">
          {antes && <span className="pre">{antes}</span>}
          <span className={clsx('hero', tom === 'apagado' && 'muted', tom === 'riscado' && 'muted strike')}>{numero}</span>
          {complemento && <span className="comp">{complemento}</span>}
        </div>
        {complementoAbaixo && <span className="comp">{complementoAbaixo}</span>}
        {(selos?.length || aoLadoDoSelo) && (
          <Selos>
            {selos?.map((s) => (
              <Selo key={s.texto} tipo={s.tipo} icone={s.icone}>
                {s.texto}
              </Selo>
            ))}
            {aoLadoDoSelo && <span className="t13">{aoLadoDoSelo}</span>}
          </Selos>
        )}
        {ajuda}
      </div>
      {children}
      {chegada && (
        <>
          <Divisoria />
          <div className="sec2">
            <div className="h-cab">
              <span className="t13">{chegada.rotulo}</span>
              <span className="h-lugar">{chegada.lugar}</span>
            </div>
            <div className="h-hora">
              <span className={clsx('t17', 'h-chega', chegada.apagada && 'muted')}>{chegada.hora}</span>
              {chegada.sob && <span className="h-sob">{chegada.sob}</span>}
            </div>
          </div>
        </>
      )}
    </Cartao>
  );
}
