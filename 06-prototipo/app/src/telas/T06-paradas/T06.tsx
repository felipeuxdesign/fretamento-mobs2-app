// T06 · Paradas da viagem. A lista inteira da viagem em foco, da origem ao destino, com o ônibus cortando o
// trilho onde está. É consulta: cada parada que vem abre um sheet com a previsão e a opção de embarcar nela hoje.
import { irPara, usarEstado, voltar } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { quadroDoDia, momentoDoDia, antesDoEmbarque, CHEGOU } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Cartao, CartaoInterativo } from '@/ds/cartao/Cartao';
import { Botao } from '@/ds/botao/Botao';
import { Nota } from '@/ds/nota/Nota';
import { Icone } from '@/ds/icone/Icone';
import { Trilho } from '@/ds/trilho/Trilho';
import { Sheet } from '@/ds/sheet/Sheet';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import type { FluxoT05 } from '@/telas/T05-inicio/T05';
import { escolherPontoDeHoje } from '@/telas/T08-outro-ponto/fluxo';
import { motivoSemTroca } from '@/telas/T08-outro-ponto/cenas';
import { CENAS, cenaDoMomento, TEXTOS, paradaDoSheet, type CenaT06 } from './cenas';

/** O que o fluxo guarda das Paradas: a parada aberta no sheet. */
interface FluxoT06 {
  sheet?: string;
}
const DO_FLUXO: FluxoT06 = {};
const CENAS_DO_FLUXO: Record<string, FluxoT06> = {};

function T06({ parado }: PropsDaTela) {
  const dia = usarEstado((e) => e.dia);
  const doInicio = usarEstado((e) => e.cenas.T05 as FluxoT05 | undefined);
  const m = momentoDoDia(dia, doInicio);
  const [fluxo, mudarFluxo] = usarCena<FluxoT06>('T06', CENAS_DO_FLUXO, DO_FLUXO, null);

  // parado, a cena é a da referência. No fluxo, é o quadro do passo do dia; com a troca de ponto ativa, a lista dela,
  // em todos os passos até a chegada
  let cena: CenaT06;
  if (parado) cena = CENAS[parado];
  else if (m.deSempre || m.passo === CHEGOU) cena = { ...CENAS[quadroDoDia('T06', dia)], sheet: fluxo.sheet };
  else cena = { ...cenaDoMomento(m), sheet: fluxo.sheet };

  // abre o sheet a parada que vem e que não é o ponto de hoje nem o destino: é a que dá para escolher
  const abre = (id: string) => {
    const l = cena.linhas.find((x) => x.tipo === 'parada' && x.id === id);
    return !!l && l.tipo === 'parada' && !l.passada && !l.minha && l.baixo !== null && !cena.cancelada;
  };
  const noSheet = cena.sheet ? paradaDoSheet(cena, cena.sheet) : null;
  // a troca só vale antes do embarque e com margem: sem isso, o botão fica desligado, com o motivo escrito
  const semTroca = cena.sheet && !parado ? motivoSemTroca(cena.sheet, cena.hora, !antesDoEmbarque(m)) : null;
  const fechar = () => mudarFluxo({});

  return (
    <Estrutura
      barra={
        <Barra variante="interna" titulo={TEXTOS.titulo} aoVoltar={() => voltar('T05')} />
      }
      banners={
        cena.banner ? (
          <Banner nivel={cena.banner.nivel} icone={cena.banner.icone}>
            {cena.banner.texto}
          </Banner>
        ) : undefined
      }
     
    >
      <p className="meta da-lista">
        {TEXTOS.linha} · {cena.origem}
      </p>
      {cena.nota && (
        <Nota tipo="info" icone={cena.nota.icone}>
          {cena.nota.texto}
        </Nota>
      )}
      {cena.cancelada && (
        <Cartao variante="perigo" espaco={8}>
          <p className="t15 com-icone">
            <span className="marca perigo">
              <Icone nome="cancelada" tamanho={20} />
            </span>
            <span>
              <b className="forte">{TEXTOS.cancelada.titulo}</b>
              <br />
              <span className="t13">{TEXTOS.cancelada.texto}</span>
            </span>
          </p>
        </Cartao>
      )}
      <Cartao espaco={8} respiro="lista">
        <Trilho agora={cena.dadoDe ?? cena.hora} linhas={cena.linhas} aoTocarNaParada={parado ? undefined : (id) => abre(id) && mudarFluxo({ sheet: id })} tocaveis={abre} />
      </Cartao>
      <p className="t13 solto">{TEXTOS.agrupadas}</p>
      <CartaoInterativo compacto seta icone="mapa" titulo={TEXTOS.mapa.titulo} apoio={TEXTOS.mapa.apoio} onClick={() => irPara('T07')} />
      {noSheet && (
        <Sheet titulo={noSheet.nome} aoFechar={parado ? undefined : fechar}>
          <p className="t13">
            {TEXTOS.sheet.tipo} · {noSheet.apoio}
          </p>
          <p>
            {TEXTOS.sheet.previsao} <b className="muito-forte">{noSheet.hora}</b>
          </p>
          {semTroca && <p className="t13">{semTroca}</p>}
          <div className="pilha-de-botoes">
            <Botao
              icone="trocar-ponto"
              desligado={!!semTroca}
              onClick={() => {
                const id = cena.sheet!;
                fechar();
                escolherPontoDeHoje(id);
              }}
            >
              {TEXTOS.sheet.embarcar}
            </Botao>
            <Botao
              variante="secundario"
              icone="mapa"
              onClick={() => {
                fechar();
                irPara('T07');
              }}
            >
              {TEXTOS.sheet.mapa}
            </Botao>
          </div>
        </Sheet>
      )}
    </Estrutura>
  );
}

registrarTela('T06', T06);
