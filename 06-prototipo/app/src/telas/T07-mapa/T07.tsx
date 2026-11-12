// T07 · Mapa. O mesmo trilho, sobre o mapa: o ônibus como único ponto brilhante, a rota com o trecho até a
// próxima parada aceso, e o painel de três alturas. É consulta: a parada tocada abre o detalhe com "Embarcar aqui hoje".
import { irPara, usarEstado, voltar, responderLocalizacao } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { quadroDoDia, momentoDoDia, antesDoEmbarque, CHEGOU } from '@/estado/dia';
import { mock, prefixoEPlaca, relativo } from '@/dados';
import { Barra, BotaoDeIcone } from '@/ds/barra/Barra';
import { Topo } from '@/ds/barra/Topo';
import { BarraDeStatus } from '@/sistema/BarraDeStatus';
import { Banner } from '@/ds/banner/Banner';
import { Botao } from '@/ds/botao/Botao';
import { Cartao } from '@/ds/cartao/Cartao';
import { Selo, Selos } from '@/ds/selo/Selo';
import { Trilho } from '@/ds/trilho/Trilho';
import { Mapa, MAPA, verticeDaRota, type PontoDoMapa } from '@/ds/mapa/Mapa';
import { ControlesDoMapa, BalaoDoOnibus, PainelDoMapa, type AlturaDoPainel } from '@/ds/mapa/PecasDoMapa';
import { ParadaNoMapa, ParadaSemNome, SetasDoSentido, OnibusNoMapa, PontoAzul, Escala, FATOR_AFASTADO, type EstadoDaParada } from '@/ds/mapa/Marcadores';
import { PARADAS_NO_MAPA as EM } from '@/ds/mapa/paradas';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { PrePermissaoDeLocalizacao } from '@/telas/comum/PrePermissaoDeLocalizacao';
import { escolherPontoDeHoje } from '@/telas/T08-outro-ponto/fluxo';
import { motivoSemTroca } from '@/telas/T08-outro-ponto/cenas';
import type { FluxoT05 } from '@/telas/T05-inicio/T05';
import { pessoas } from '@/telas/T06-paradas/cenas';
import { CENAS, TEXTOS, PARADAS, SEMPRE, cenaDoMomento, type CenaT07 } from './cenas';

/** O que o fluxo guarda do Mapa: o que a pessoa fez tocando, por cima do passo do dia. */
interface FluxoT07 {
  painel: AlturaDoPainel;
  escolhida?: string;
  /** para onde a câmera olha: o quadro do passo, o ônibus (e segue), o seu ponto, onde a pessoa está */
  olha: 'passo' | 'onibus' | 'ponto' | 'local';
  /** o quanto a pessoa arrastou o mapa, por cima de para onde a câmera olha */
  arrasto: { x: number; y: number };
  afastado: boolean;
  balao: boolean;
  /** o sheet de pré-permissão, e o aviso de localização negada */
  pede: boolean;
}
const DO_FLUXO: FluxoT07 = { painel: 'recolhido', olha: 'passo', arrasto: { x: 0, y: 0 }, afastado: false, balao: false, pede: false };
const CENAS_DO_FLUXO: Record<string, FluxoT07> = {};
const ALTURAS = { meio: 460, inteiro: 797, parada: 236, linhaInteira: 130, controlesAfastados: 158 };
/** onde fica, na tela, aquilo para onde a câmera olha: no mapa que sobra entre a barra e o painel */
const ALVO = { parada: [195, 415] as PontoDoMapa, onibus: [193, 415] as PontoDoMapa, ponto: [195, 360] as PontoDoMapa, local: [195, 420] as PontoDoMapa, balao: 295 };
const por = (ponto: PontoDoMapa, alvo: PontoDoMapa) => ({ x: alvo[0] - ponto[0], y: alvo[1] - ponto[1] });
const AFASTADO = { x: 88, y: 80, escala: 0.5, desce: 30 };
const ONDE_A_PESSOA_ESTA: PontoDoMapa = [150, 820];
/** até onde a câmera vai: o desenho nunca sai da tela */
const LIMITE = { x: [390 - (MAPA.x + MAPA.largura), -MAPA.x], y: [844 - (MAPA.y + MAPA.altura), -MAPA.y] };
const ICONE: Record<string, string> = { terminal: 'terminal', comercio: 'comercio', ponto: 'ponto', fabrica: 'fabrica' };

function T07({ parado }: PropsDaTela) {
  const dia = usarEstado((e) => e.dia);
  const permissao = usarEstado((e) => e.permissoes.localizacao);
  const [fluxo, mudarFluxo] = usarCena<FluxoT07>('T07', CENAS_DO_FLUXO, DO_FLUXO, null);

  const doInicio = usarEstado((e) => e.cenas.T05 as FluxoT05 | undefined);
  const m = momentoDoDia(dia, doInicio);
  /** o ponto de hoje: o de sempre, ou o da troca */
  const meu = parado ? SEMPRE.id : m.ponto;

  // parado, a cena é a da referência. No fluxo, é o quadro do passo do dia, com o que a pessoa fez por cima; com a
  // troca de ponto ativa, o mesmo quadro com o ponto de hoje
  const doPasso = parado ? CENAS[parado] : m.deSempre || m.passo === CHEGOU ? CENAS[quadroDoDia('T07', dia)] : cenaDoMomento(m, m.passo === 0 && !doInicio?.desde);
  // a parada aberta deixa de estar aberta quando vira o ponto de hoje
  const escolhida = fluxo.escolhida !== meu ? fluxo.escolhida : undefined;
  let cena: CenaT07 = doPasso;
  let base = doPasso.camera;
  if (!parado) {
    // para onde a câmera olha: a parada aberta, o ônibus com o balão, o ônibus seguido, o seu ponto, onde a pessoa está.
    // Sem nada disso, é o quadro do passo, que sobe ou desce com a altura do painel
    const p = doPasso.camera;
    base = escolhida
      ? por(EM[escolhida], ALVO.parada)
      : fluxo.balao && doPasso.onibus
        ? { x: p.x, y: ALVO.balao - doPasso.onibus.em[1] }
        : fluxo.olha === 'onibus' && doPasso.onibus
          ? por(doPasso.onibus.em, ALVO.onibus)
          : fluxo.olha === 'ponto'
            ? por(EM[meu], ALVO.ponto)
            : fluxo.olha === 'local' && permissao === 'permitida'
              ? por(ONDE_A_PESSOA_ESTA, ALVO.local)
              : { x: p.x, y: p.y + (fluxo.painel === 'meio' ? 30 : fluxo.painel === 'inteiro' ? -90 : 0) };
    cena = {
      ...doPasso,
      camera: fluxo.afastado ? AFASTADO : { x: base.x + fluxo.arrasto.x, y: base.y + fluxo.arrasto.y },
      afastado: fluxo.afastado,
      recolhido: fluxo.afastado ? ALTURAS.linhaInteira : doPasso.recolhido,
      painel: fluxo.afastado ? 'recolhido' : fluxo.painel,
      escolhida: fluxo.afastado ? undefined : escolhida,
      seguindo: fluxo.olha === 'onibus' && !!doPasso.onibus,
      localizacao: permissao === 'permitida' && fluxo.olha === 'local' ? ONDE_A_PESSOA_ESTA : undefined,
      balao: fluxo.balao && doPasso.onibus ? { titulo: `Ônibus ${prefixoEPlaca(mock.onibus)}`, apoio: CENAS['T07-10'].balao!.apoio } : undefined,
      banner: permissao === 'negada' && fluxo.olha === 'local' ? CENAS['T07-15'].banner : doPasso.banner,
    };
  }

  const escala = cena.afastado ? AFASTADO.escala : 1;
  const desce = cena.afastado ? AFASTADO.desce : 0;
  const k = cena.afastado ? FATOR_AFASTADO : 1;
  /** um ponto do mapa, na tela */
  const naTela = ([x, y]: PontoDoMapa): PontoDoMapa => [cena.camera.x + x * escala, cena.camera.y + y * escala - desce];
  /** onde o marcador é desenhado: dentro do desenho, ou parado na tela quando a linha inteira está à vista */
  const lugar = (p: PontoDoMapa): PontoDoMapa => (cena.afastado ? [cena.camera.x + p[0] * escala, cena.camera.y + p[1] * escala] : p);

  const corte = cena.rota === 'inteira' ? -1 : cena.rota === 'percorrida' ? Infinity : verticeDaRota(cena.rota.corte);
  const passou = (id: string) => verticeDaRota(EM[id]) < corte;
  const meuPontoVem = !passou(meu);
  const proximaParada = typeof cena.rota === 'object' ? (cena.rota.aceso ?? cena.rota.corte) : cena.rota === 'percorrida' ? EM[PARADAS[PARADAS.length - 1].id] : null;
  // o rótulo do seu ponto só aparece quando cabe no mapa à vista, acima do painel
  const rotuloAVista = naTela(EM[meu])[1] + 20 + 18 < 844 - (cena.escolhida ? ALTURAS.parada : cena.painel === 'recolhido' ? cena.recolhido : ALTURAS[cena.painel]);
  const chegando = !parado && m.fase === 'chegando';

  const detalhe = cena.escolhida ? PARADAS.find((p) => p.id === cena.escolhida)! : null;
  const altura = detalhe ? ALTURAS.parada : cena.painel === 'recolhido' ? cena.recolhido : ALTURAS[cena.painel];
  const inteiro = cena.painel === 'inteiro' && !detalhe;

  const noMeuPonto = !parado && fluxo.olha === 'ponto' && !fluxo.afastado && !escolhida && !fluxo.balao && fluxo.arrasto.x === 0 && fluxo.arrasto.y === 0;
  const abrirParada = (id: string) => mudarFluxo((f) => ({ ...f, escolhida: id, balao: false, arrasto: { x: 0, y: 0 } }));
  const fecharParada = () => mudarFluxo((f) => ({ ...f, escolhida: undefined }));
  const tocarNaMira = () => {
    if (permissao === 'nao-pediu') mudarFluxo((f) => ({ ...f, pede: true }));
    else mudarFluxo((f) => ({ ...f, olha: f.olha === 'local' ? 'passo' : 'local', arrasto: { x: 0, y: 0 }, afastado: false, balao: false, escolhida: undefined }));
  };
  // o arrasto para na beira do desenho. Um quadro que já olha para além dela (a chegada na fábrica) fica como está
  const dentro = (v: number, [min, max]: number[], daBase: number) => Math.max(Math.min(min, daBase), Math.min(Math.max(max, daBase), v));
  const arrastar = (dx: number, dy: number) =>
    mudarFluxo((f) => ({
      ...f,
      arrasto: { x: dentro(base.x + f.arrasto.x + dx, LIMITE.x, base.x) - base.x, y: dentro(base.y + f.arrasto.y + dy, LIMITE.y, base.y) - base.y },
      olha: f.olha === 'onibus' ? 'passo' : f.olha,
    }));
  // a troca só vale antes do embarque e com margem: sem isso, o botão fica desligado, com o motivo escrito
  const semTroca = !parado && cena.escolhida ? motivoSemTroca(cena.escolhida, cena.hora, !antesDoEmbarque(m)) : null;

  const marcadores = (
    <>
      {PARADAS.map((p, i) => {
        if (p.agrupada) return cena.afastado ? null : <ParadaSemNome key={p.id} em={EM[p.id]} passada={passou(p.id)} />;
        const ponta = i === 0 ? 'origem' : p.destino ? 'destino' : undefined;
        const minha = p.id === meu;
        const estado: EstadoDaParada = p.id === cena.escolhida ? 'escolhida' : passou(p.id) ? 'passada' : minha ? 'minha' : 'vem';
        // dá para tocar na parada que vem e que não é o seu ponto nem o destino: é a que dá para escolher
        const toca = !parado && estado === 'vem' && !ponta && !cena.heroi.cancelada && !cena.afastado;
        return <ParadaNoMapa key={p.id} em={lugar(EM[p.id])} icone={minha ? 'pessoa' : ICONE[p.tipo]} estado={estado} ponta={ponta} chegando={minha && chegando} k={k} rotulo={toca ? p.nome! : undefined} aoTocar={toca ? () => abrirParada(p.id) : undefined} />;
      })}
      {cena.localizacao && <PontoAzul em={lugar(cena.localizacao)} />}
      {cena.onibus && <OnibusNoMapa em={lugar(cena.onibus.em)} ponteiro={cena.onibus.ponteiro} apagado={cena.onibus.apagado} k={k} rotulo={parado || cena.afastado ? undefined : `Ônibus ${mock.onibus.prefixo}`} aoTocar={parado || cena.afastado ? undefined : () => mudarFluxo((f) => ({ ...f, balao: !f.balao }))} />}
    </>
  );
  const destino = PARADAS[PARADAS.length - 1];

  return (
    <>
      <Mapa
        camera={{ ...cena.camera, escala }}
        desceAJanela={desce}
        rota={cena.rota}
        afastado={cena.afastado}
        desliza={!parado}
        aoArrastar={parado || cena.afastado ? undefined : arrastar}
        aoPincar={parado ? undefined : (afastar) => mudarFluxo((f) => (f.afastado === afastar ? f : { ...f, afastado: afastar, escolhida: undefined, balao: false, painel: 'recolhido' }))}
        fixos={
          <>
            {cena.afastado && marcadores}
            {cena.afastado && (
              <text aria-hidden="true" fill="var(--tinta)" fontFamily="inherit" fontSize="9" fontWeight="600" letterSpacing=".02em" paintOrder="stroke" stroke="var(--mapa-terreno)" strokeLinejoin="round" strokeWidth="2.4" x={lugar(EM[destino.id])[0] + 14} y={lugar(EM[destino.id])[1] + 4}>
                {destino.nome}
              </text>
            )}
            {!cena.semInstrumentos && !inteiro && (
              <Escala x={16} y={844 - altura - 20 + desce} texto={cena.afastado ? TEXTOS.escala.longe : TEXTOS.escala.perto} />
            )}
          </>
        }
        porCima={
          <>
            {meuPontoVem && rotuloAVista && !inteiro && (
              <span className="mkl" style={{ left: naTela(EM[meu])[0], top: naTela(EM[meu])[1] + 20 }}>
                {!parado && m.trocado ? TEXTOS.seuPontoHoje : TEXTOS.seuPonto}
              </span>
            )}
            {cena.onibus?.rotulo && !inteiro && (
              <span className="mkl m" style={{ left: naTela(cena.onibus.em)[0] + 88, top: naTela(cena.onibus.em)[1] - 9 }}>
                {cena.onibus.rotulo}
              </span>
            )}
            {cena.balao && cena.onibus && <BalaoDoOnibus style={{ left: naTela(cena.onibus.em)[0], top: naTela(cena.onibus.em)[1] - 30 }} titulo={cena.balao.titulo} apoio={cena.balao.apoio} />}
          </>
        }
      >
        <SetasDoSentido depoisDe={proximaParada} afastado={cena.afastado} />
        {cena.afastado && PARADAS.filter((p) => p.agrupada).map((p) => <ParadaSemNome key={p.id} em={EM[p.id]} passada={passou(p.id)} dobro />)}
        {!cena.afastado && marcadores}
      </Mapa>
      {inteiro && (
        <div className="topo sobre-o-mapa">
          <BarraDeStatus fundo="cartao" />
        </div>
      )}
      {!inteiro && (
        <Topo
          peca="barraDoMapa"
          className="sobre-o-mapa"
          barra={<Barra titulo={TEXTOS.titulo} aoVoltar={() => voltar('T05')} />}
          banners={
            cena.banner ? (
              <Banner nivel={cena.banner.nivel} icone={cena.banner.icone} acoes={cena.banner.acao ? [{ rotulo: cena.banner.acao }] : undefined}>
                {cena.banner.texto}
              </Banner>
            ) : undefined
          }
        />
      )}
      {!inteiro && (
        <ControlesDoMapa
          style={{ bottom: cena.afastado ? ALTURAS.controlesAfastados : altura + 12 }}
          controles={[
            { id: 'onibus', rotulo: TEXTOS.controles.onibus, icone: 'onibus', ligado: cena.seguindo, desligado: !cena.onibus, aoTocar: () => mudarFluxo((f) => ({ ...f, olha: f.olha === 'onibus' ? 'passo' : 'onibus', arrasto: { x: 0, y: 0 }, afastado: false, balao: false, escolhida: undefined })) },
            // aceso enquanto o mapa está centrado no seu ponto: arrastar o mapa apaga, e tocar de novo volta ao quadro do passo
            { id: 'ponto', rotulo: TEXTOS.controles.ponto, icone: 'pessoa', ligado: noMeuPonto, aoTocar: () => mudarFluxo((f) => ({ ...f, olha: noMeuPonto ? 'passo' : 'ponto', arrasto: { x: 0, y: 0 }, afastado: false, balao: false, escolhida: undefined })) },
            { id: 'local', rotulo: TEXTOS.controles.local, icone: 'minha-posicao', ligado: !!cena.localizacao, aoTocar: tocarNaMira },
          ]}
        />
      )}
      <PainelDoMapa
        alturas={detalhe || cena.afastado ? { recolhido: altura, meio: altura, inteiro: altura } : { recolhido: cena.recolhido, meio: ALTURAS.meio, inteiro: ALTURAS.inteiro }}
        altura={detalhe || cena.afastado ? 'recolhido' : cena.painel}
        aoMudar={(a) => mudarFluxo((f) => ({ ...f, painel: a }))}
        rotuloDaAlca={detalhe ? 'Fechar ponto' : cena.afastado ? 'Aproximar de volta' : undefined}
        aoTocarNaAlca={detalhe ? fecharParada : cena.afastado ? () => mudarFluxo((f) => ({ ...f, afastado: false })) : undefined}
        fechaAoPuxar={!!detalhe}
      >
        {detalhe ? (
          <>
            <div className="cab-do-painel">
              <div>
                <h3>{detalhe.nome!.replace('Av. ', 'Av. ')}</h3>
                <p className="mnote">
                  {TEXTOS.parada.tipo} · {pessoas((detalhe as { previstos: number }).previstos + (!parado && m.trocado ? (detalhe.id === m.ponto ? 1 : detalhe.id === SEMPRE.id ? -1 : 0) : 0))}
                </p>
              </div>
              <BotaoDeIcone rotulo="Fechar" icone="fechar" tamanho={24} onClick={fecharParada} />
            </div>
            <p className="t15">
              {TEXTOS.parada.previsao} <b className="muito-forte">{(detalhe as { programado: string }).programado}</b>
            </p>
            {semTroca && <p className="t13">{semTroca}</p>}
            <Botao
              icone="trocar-ponto"
              desligado={!!semTroca}
              onClick={() => {
                fecharParada();
                escolherPontoDeHoje(detalhe.id);
              }}
            >
              {TEXTOS.parada.embarcar}
            </Botao>
          </>
        ) : cena.afastado ? (
          <div className="mhero">
            <p className="t13b">{TEXTOS.linhaInteira.titulo}</p>
            <p className="mnote">{TEXTOS.linhaInteira.apoio}</p>
          </div>
        ) : cena.painel === 'meio' ? (
          <>
            <h3>{TEXTOS.proximos}</h3>
            <Trilho agora={cena.dadoDe ?? cena.hora} linhas={cena.proximos} tracoDoOnibus={2.2} />
          </>
        ) : cena.painel === 'inteiro' ? (
          <>
            <h3>{TEXTOS.todas}</h3>
            <p className="mnote sob-o-titulo">
              {TEXTOS.titulo} · {cena.origem}
            </p>
            <Trilho agora={cena.dadoDe ?? cena.hora} linhas={cena.todas} tracoDoOnibus={2.2} />
          </>
        ) : (
          <Heroi cena={cena} />
        )}
      </PainelDoMapa>
      {fluxo.pede && !parado && (
        <PrePermissaoDeLocalizacao
          aoDesistir={() => mudarFluxo((f) => ({ ...f, pede: false }))}
          aoPermitir={() => {
            responderLocalizacao('permitida');
            mudarFluxo((f) => ({ ...f, pede: false, olha: 'local', arrasto: { x: 0, y: 0 }, afastado: false }));
          }}
        />
      )}
    </>
  );
}

/** O herói compacto do painel recolhido: o número e o selo de confiança, os mesmos do Início. */
function Heroi({ cena }: { cena: CenaT07 }) {
  const h = cena.heroi;
  // o número é calculado do agora do estado, como no trilho: a hora ao lado menos o agora
  const ate = /(\d\d:\d\d)/.exec(h.complemento ?? '')?.[1];
  const agora = cena.dadoDe ?? cena.hora;
  const numero = ate && typeof h.numero === 'string' && /^\d+ min$/.test(h.numero) ? relativo(agora, ate) : h.numero;
  const heroi = (
    <div className="mhero" data-agora={agora}>
      <p className="t13b">{h.alvo}</p>
      <div className="mhero-numero">
        {h.antes && <span className="pre">{h.antes}</span>}
        <span className={h.apagado ? 'big muted' : 'big'}>{numero}</span>
        <span className="comp">{h.complemento}</span>
      </div>
      <Selos>
        {h.selos.map((s) => (
          <Selo key={s.texto} tipo={s.tipo} icone={s.icone}>
            {s.texto}
          </Selo>
        ))}
      </Selos>
    </div>
  );
  if (h.cancelada)
    return (
      <Cartao variante="perigo" className="do-painel" semVidro>
        {heroi}
        <p className="t13">{h.cancelada}</p>
      </Cartao>
    );
  return (
    <>
      {heroi}
      {h.nota && <p className="mnote">{h.nota}</p>}
    </>
  );
}

registrarTela('T07', T07);
