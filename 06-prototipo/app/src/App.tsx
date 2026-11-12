// A raiz: decide entre o palco (computador), só o aparelho, o app na tela inteira (celular) e as vitrines.
import { useEffect, useSyncExternalStore } from 'react';
import { palco, telaDe } from '@/dados';
import { usarEstado, ler } from '@/estado/armazem';
import { TelaDoAparelho } from '@/TelaDoAparelho';
import { VitrineDePecas } from '@/vitrine/VitrineDePecas';
import { VitrineDoVidro } from '@/vitrine/VitrineDoVidro';
import { VitrineDaMarca } from '@/vitrine/VitrineDaMarca';
import { VitrineDeTokens } from '@/vitrine/VitrineDeTokens';
import { Palco, larguraDoPalco } from '@/palco/Palco';
import { Gaveta } from '@/palco/Gaveta';
import { MotorDoDia } from '@/palco/Tocador';
import { Aparelho } from '@/sistema/Aparelho';

const ESTREITO = 600;
const assinarJanela = (o: () => void) => {
  window.addEventListener('resize', o);
  return () => window.removeEventListener('resize', o);
};
/** Abaixo de 600 de largura, o app ocupa a tela inteira e o palco some. */
export const usarEstreito = (): boolean => useSyncExternalStore(assinarJanela, () => window.innerWidth < ESTREITO);
/** Entre os 600 e a largura em que o palco cabe inteiro, a coluna sairia cortada: vale a tela inteira também. */
const usarPalcoSemLugar = (): boolean => useSyncExternalStore(assinarJanela, () => window.innerWidth < larguraDoPalco(window.innerHeight));

/** O voltar do navegador (o botão, ou o gesto de dois dedos) não tira ninguém do protótipo no meio do caminho.
    Uma entrada de guarda fica no histórico: o voltar cai nela, o app faz o que o toque faria (fecha o que está
    aberto por cima, ou toca o voltar da barra) e a guarda é posta de novo. Numa tela sem voltar, ou parado num
    estado, o app fica onde está. Só de onde abriu, sem ter saído do lugar (o Entrar, ou a referência do
    endereço), o voltar do navegador sai de verdade. */
let guardado = false;
function guardarOVoltar(): void {
  if (guardado) return;
  guardado = true;
  window.history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', () => {
    const e = ler();
    const noComeco = e.pilha.length === 0 && (e.parado ? e.parado === e.endereco.ref && e.tela === telaDe(e.parado) : e.tela === palco.abreEm.tela && !e.endereco.ref);
    if (noComeco) return window.history.back();
    if (!e.parado) {
      const app = document.getElementById('tela-do-aparelho');
      const veu = app?.querySelector<HTMLElement>('.por-cima [data-veu]');
      (veu ?? app?.querySelector<HTMLElement>('.topo button[aria-label="Voltar"]'))?.click();
    }
    // o endereço da guarda é o de agora: a referência em que o app está parado, ou nenhuma
    const url = new URL(window.location.href);
    if (e.parado) url.searchParams.set('ref', e.parado);
    else url.searchParams.delete('ref');
    window.history.pushState(null, '', url);
  });
}

export function App() {
  const endereco = usarEstado((e) => e.endereco);
  const estreito = usarEstreito();
  const semLugar = usarPalcoSemLugar();
  const vitrine = endereco.vitrine;
  useEffect(() => {
    if (!vitrine) guardarOVoltar();
  }, [vitrine]);

  if (vitrine === 'pecas') return <VitrineDePecas />;
  if (vitrine === 'vidro') return <VitrineDoVidro />;
  if (vitrine === 'marca') return <VitrineDaMarca />;
  if (vitrine === 'tokens') return <VitrineDeTokens />;
  // o relógio do dia anda com ou sem palco: quem abre só o app também vê o ônibus chegar
  // no celular de verdade, a barra de status e o indicador de início são os do sistema; com ?so-app=1 valem os desenhados
  if (estreito || (semLugar && !endereco.soApp))
    return (
      <>
        <MotorDoDia />
        <TelaDoAparelho doCelular={!endereco.soApp} />
        {endereco.palco && <Gaveta />}
      </>
    );
  // só o aparelho, sem palco
  if (endereco.soApp)
    return (
      <div className="so-app">
        <MotorDoDia />
        <Aparelho>
          <TelaDoAparelho />
        </Aparelho>
      </div>
    );
  return (
    <>
      <MotorDoDia />
      <Palco />
    </>
  );
}
