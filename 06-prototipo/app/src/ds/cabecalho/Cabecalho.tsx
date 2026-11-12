// O cabeçalho de autenticação e o pé do Entrar (F06, F10): a marca, "Fretamento" em legenda, e a assinatura
// "por mobs2". As cores entram por token, nunca com a cor do arquivo.
import { useId, type ReactNode } from 'react';
import clsx from 'clsx';
import iconeDoApp from '@recursos/marca/icone-app.svg';
import mobs2Cru from '@recursos/marca/mobs2.svg?raw';
import pictogramaCru from '@recursos/marca/pictograma.svg?raw';
import { usarVidro } from '@/ds/vidro/usarVidro';
import { usarEstado } from '@/estado/armazem';
import './cabecalho.css';

const MOBS2 = {
  viewBox: /viewBox="([^"]+)"/.exec(mobs2Cru)?.[1] ?? '0 0 271 57',
  miolo: mobs2Cru.slice(mobs2Cru.indexOf('>') + 1, mobs2Cru.lastIndexOf('</svg>')).replace(/fill="[^"]*"/g, 'fill="currentColor"'),
};

// O pictograma: o desenho do ícone do app, o mesmo, sem o quadrado de fundo e com os recortes vazados
// (05-recursos/marca/pictograma.svg). No ícone, as janelas, o letreiro, os faróis e os contornos são pintados com a
// cor do quadrado; no pictograma eles são buracos, e o que está atrás aparece por eles. O arquivo traz duas máscaras,
// a da figura e a do ônibus, e dois retângulos pintados através delas. Aqui só entram as duas cores, por variável
// (--marca-figura e --marca-onibus, sempre token), e um nome único para as máscaras de cada cópia na tela.
const MIOLO_DO_PICTOGRAMA = pictogramaCru
  .slice(pictogramaCru.indexOf('>') + 1, pictogramaCru.lastIndexOf('</svg>'))
  .replace(/<!--[\s\S]*?-->/, '')
  .replace(/fill="[^"]*"( mask="url\(#figura\)")/, 'fill="var(--marca-figura)"$1')
  .replace(/fill="[^"]*"( mask="url\(#onibus\)")/, 'fill="var(--marca-onibus)"$1');

/** O pictograma da marca: a passageira e o ônibus, em duas cores de token, com os recortes vazados. O tamanho vem do CSS. */
export function Pictograma({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const miolo = MIOLO_DO_PICTOGRAMA.replace(/(id="|url\(#)(figura|onibus)/g, `$1${id}$2`);
  return <svg className={clsx('pictograma', className)} viewBox="0 0 1024 1024" role="img" aria-label="Fretamento" dangerouslySetInnerHTML={{ __html: miolo }} />;
}

/** A marca mobs2, em linha, na cor do texto ao lado. */
export function MarcaMobs2() {
  return <svg className="marca-mobs2" viewBox={MOBS2.viewBox} width="48" height="10" role="img" aria-label="mobs2" dangerouslySetInnerHTML={{ __html: MOBS2.miolo }} />;
}

/** "por mobs2": a assinatura discreta, no pé do Entrar e do Perfil. */
export function Assinatura() {
  return (
    <span className="by">
      por
      <MarcaMobs2 />
    </span>
  );
}

/** A assinatura no pé da rolagem do Perfil. */
export function AssinaturaDoPe() {
  return (
    <p className="t13 assinatura-do-pe">
      por
      <MarcaMobs2 />
    </p>
  );
}

/** A marca no Entrar. Sólida, é o ícone do app em 72 e o nome, como nos quadros. Com o conteúdo de vidro, é um de três
    arranjos, escolhidos pelo endereço (?marca=l1, l2 ou l3; sem nada, l1):
      · l1: o quadro de vidro de 88 com o pictograma, e o nome embaixo;
      · l2: o pictograma solto, de 72, direto sobre o fundo, e o nome embaixo;
      · l3: o quadro de 40 e o nome ao lado, numa linha.
    ?cor=invertida troca as duas cores do pictograma. Atrás da marca, só no Entrar, fica um ponto de luz. */
export function CabecalhoDeEntrada() {
  const deVidro = usarVidro('conteudo');
  const marca = usarEstado((e) => e.endereco.marca);
  const cor = usarEstado((e) => e.endereco.cor);
  if (!deVidro)
    return (
      <div className="lock">
        <img className="appic" src={iconeDoApp} width={72} height={72} alt="Fretamento" />
        <span className="fret">Fretamento</span>
      </div>
    );
  return (
    <div className="lock da-marca" data-marca={marca} data-cor={cor ?? undefined}>
      <span className="luz-da-marca" aria-hidden="true" />
      {marca === 'l2' ? (
        <Pictograma />
      ) : (
        <span className="tile-marca">
          <Pictograma />
        </span>
      )}
      <span className="fret">Fretamento</span>
    </div>
  );
}

/** O pé do Entrar: o link de quem não recebeu convite e a assinatura. */
export function PeDoEntrar({ children }: { children: ReactNode }) {
  return (
    <div className="foot">
      {children}
      <Assinatura />
    </div>
  );
}
