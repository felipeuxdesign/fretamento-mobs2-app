// T05 · Início. Responde num relance quando o ônibus passa no meu ponto, em qual ônibus eu entro e se posso
// confiar nesse número. O elemento da tela é o cartão do herói. O estado é o app montado com a cena do caso.
import { useEffect, useState } from 'react';
import { mock } from '@/dados';
import { irPara, usarEstado } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { quadroDoDia, embarcou, voltarUmPasso, momentoDoDia, trocarOPontoDeHoje, NO_PONTO, CHEGOU } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra, Sino, BotaoDoPerfil } from '@/ds/barra/Barra';
import { Avatar, iniciaisDe } from '@/ds/avatar/Avatar';
import { Banner } from '@/ds/banner/Banner';
import { ativarAvisos } from '@/telas/comum/avisos';
import { Heroi } from '@/ds/heroi/Heroi';
import { Cartao, CartaoInterativo, Placa } from '@/ds/cartao/Cartao';
import { Botao, BotaoLink, DoisBotoes } from '@/ds/botao/Botao';
import { Nota } from '@/ds/nota/Nota';
import { Trilho, type LinhaDoTrilho } from '@/ds/trilho/Trilho';
import { Vazio, Osso } from '@/ds/central/Central';
import { Sheet } from '@/ds/sheet/Sheet';
import { Toast } from '@/ds/toast/Toast';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { abrirAjuda } from '@/telas/T10-perfil/T10';
import { naoLidas, DO_FLUXO as AVISOS_DO_FLUXO, type CenaT09 } from '@/telas/T09-notificacoes/cenas';
import { CENAS, CENA_DA_VOLTA, cenaDaTroca, cenaDoMomento, apoioDaIdaDeSempre, avisoDaOutraIda, BANNERS, ORDEM_DOS_BANNERS, OUTRAS, TEXTOS, PLACA, SEMPRE, type CenaT05, type Acao, type IdDoBanner, type LinhaDaCena, type OutraViagem } from './cenas';

/** O que o fluxo guarda do Início: o que a pessoa fez tocando, por cima do passo do dia. */
export interface FluxoT05 {
  /** a troca de ponto de hoje, ativa (volta da T08 com a troca confirmada): o ponto de hoje, ou nada */
  troca: string | false;
  /** a hora em que a troca foi feita (ou desfeita), quando não foi às 06:24: o dia segue em rota a partir dela */
  desde?: string;
  /** vendo a outra ida do dia, e não a de sempre */
  outraIda: boolean;
  /** a volta do dia aberta: o cartão "Sua volta hoje" */
  volta?: boolean;
  sheet: CenaT05['sheet'];
  /** os banners que a pessoa fechou */
  fechados: IdDoBanner[];
  toast: string | null;
  /** os 650 ms do skeleton, ao abrir */
  carregou: boolean;
  /** o celular não permitiu os avisos (o "Não Permitir" do Preparar o app): o Início avisa, com o atalho para ativar */
  avisosNegados?: boolean;
}
export const FLUXO_DO_INICIO: FluxoT05 = { troca: false, outraIda: false, sheet: undefined, fechados: [], toast: null, carregou: false };
const CENAS_DO_FLUXO: Record<string, FluxoT05> = {};

const paraOTrilho = (l: LinhaDaCena): LinhaDoTrilho =>
  l.tipo === 'onibus'
    ? { tipo: 'onibus', texto: l.texto, apagado: l.apagado, cima: l.cima ?? null, baixo: l.baixo ?? null }
    : l.tipo === 'grupo'
      ? { tipo: 'grupo', texto: l.texto }
      : { tipo: 'parada', id: l.id!, nome: l.texto, icone: l.icone!, minha: l.minha, cheia: l.cheia, passada: l.passada, forte: l.forte, horaApagada: l.horaApagada, papeis: l.papel ? [{ texto: l.papel }] : undefined, apoio: l.apoio, hora: l.hora, sobAHora: l.sob, cima: l.cima ?? null, baixo: l.baixo ?? null };

/** No Início a lista começa onde o ônibus está: o que já passou sai daqui (a lista inteira está nas Paradas).
    Sem ônibus na lista, saem só as paradas que já passaram. */
const aPartirDoOnibus = (linhas: LinhaDaCena[]): LinhaDaCena[] => {
  const i = linhas.findIndex((l) => l.tipo === 'onibus');
  const resto = i >= 0 ? linhas.slice(i) : linhas.filter((l) => !l.passada);
  return resto.map((l, n) => (n === 0 ? { ...l, cima: null } : l));
};

function T05({ parado }: PropsDaTela) {
  const dia = usarEstado((e) => e.dia);
  const [fluxo, mudarFluxo] = usarCena<FluxoT05>('T05', CENAS_DO_FLUXO, FLUXO_DO_INICIO, null);
  const m = momentoDoDia(dia, fluxo);
  const [contestado, setContestado] = useState(false);
  // o sino conta o que ainda não foi lido nas Notificações
  const avisos = usarEstado((e) => e.cenas.T09 as CenaT09 | undefined);

  // os 650 ms entre abrir e receber a viagem
  useEffect(() => {
    if (parado || fluxo.carregou) return;
    const t = window.setTimeout(() => mudarFluxo((f) => ({ ...f, carregou: true })), mock.regras.esqueletoMs);
    return () => window.clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // parado, a cena é a da referência. No fluxo, é o quadro do passo do dia, com o que a pessoa fez por cima
  let cena: CenaT05;
  if (parado) cena = CENAS[parado];
  else if (!fluxo.carregou) cena = CENAS['T05-11'];
  else if (fluxo.volta) cena = CENA_DA_VOLTA;
  else if (fluxo.outraIda) cena = CENAS['T05-06'];
  else if (m.deSempre || m.passo === CHEGOU) cena = { ...CENAS[quadroDoDia('T05', dia)], sheet: fluxo.sheet };
  // a troca vale em todos os passos do dia: às 06:24 é o quadro desenhado dela; adiante, o quadro do passo com o ponto de hoje
  else if (m.passo === 0 && !fluxo.desde) cena = { ...cenaDaTroca(m.ponto), sheet: fluxo.sheet };
  else cena = { ...cenaDoMomento(m), sheet: fluxo.sheet };
  // vendo a volta ou a outra ida, o que se vê não é a viagem do dia: as paradas e o mapa são os dela
  const emOutraViagem = !parado && fluxo.carregou && (!!fluxo.volta || fluxo.outraIda);
  const daCena = !parado && fluxo.avisosNegados ? [...cena.banners, 'avisos-desligados' as IdDoBanner] : cena.banners;
  const banners = ORDEM_DOS_BANNERS.filter((b) => daCena.includes(b) && !fluxo.fechados.includes(b)).slice(0, 2);

  const agir = (acao: Acao) => {
    if (acao === 'embarcar') embarcou();
    if (acao === 'nao-embarquei' && dia.passo === NO_PONTO + 1) voltarUmPasso();
    if (acao === 'nao-fui-eu') mudarFluxo((f) => ({ ...f, sheet: 'nao-fui-eu' }));
    if (acao === 'pontos-a-frente') irPara('T08');
    if (acao === 'ver-outra-ida') mudarFluxo((f) => ({ ...f, outraIda: true }));
    if (acao === 'voltar-a-ida-de-sempre') mudarFluxo((f) => ({ ...f, outraIda: false, volta: false }));
  };
  const abrirOutra = (v: OutraViagem) => {
    // o cartão fica no fim da tela e o que muda é o herói, lá em cima: a tela volta ao topo para a troca se ver
    document.getElementById('tela-do-aparelho')?.querySelector('main')?.scrollTo({ top: 0 });
    if (v === 'outra-ida') mudarFluxo((f) => ({ ...f, outraIda: true, volta: false }));
    if (v === 'ida-de-sempre') mudarFluxo((f) => ({ ...f, outraIda: false, volta: false }));
    if (v === 'volta') mudarFluxo((f) => ({ ...f, volta: true, outraIda: false }));
  };
  const fecharSheet = () => mudarFluxo((f) => ({ ...f, sheet: undefined }));
  const confirmarSheet = () => {
    if (cena.sheet === 'voltar-ao-ponto') trocarOPontoDeHoje(SEMPRE.id, { ...fluxo, sheet: undefined, toast: null });
    else if (cena.sheet === 'nao-fui-eu') {
      setContestado(true);
      fecharSheet();
    } else if (cena.sheet === 'religar') {
      fecharSheet();
      irPara('T12');
    }
  };

  const barra = (
    <Barra variante="home" titulo={`${cena.saudacao}, ${mock.pessoa.saudacao}`}>
      <Sino naoLidos={parado ? cena.naoLidos : naoLidas(avisos ?? AVISOS_DO_FLUXO)} onClick={() => irPara('T09')} />
      <BotaoDoPerfil inicial={iniciaisDe(mock.pessoa.nome)} onClick={() => irPara('T10')}>
        <Avatar inicial={mock.pessoa.inicial} />
      </BotaoDoPerfil>
    </Barra>
  );
  const faixa = banners.length ? (
    <>
      {banners.map((id) => {
        const b = BANNERS[id];
        return (
          <Banner key={id} nivel={b.nivel} icone={b.icone} acoes={b.acoes?.map((rotulo) => ({ rotulo, aoTocar: id === 'avisos-desligados' ? ativarAvisos : undefined }))} aoFechar={b.fecha ? () => mudarFluxo((f) => ({ ...f, fechados: [...f.fechados, id] })) : undefined}>
            {b.texto}
          </Banner>
        );
      })}
    </>
  ) : undefined;

  if (cena.especial === 'carregando') {
    return (
      <Estrutura barra={barra}>
        <Cartao>
          <Osso altura={20} largura={228} />
          <Osso altura={14} largura={147} />
          <Osso altura={56} largura={179} forte style={{ marginTop: 8 }} />
          <Osso altura={14} largura={196} />
        </Cartao>
        <Cartao>
          <Osso altura={16} />
          <Osso altura={16} />
          <Osso altura={16} largura={261} />
        </Cartao>
        <div className="dois-ossos">
          <Osso altura={64} style={{ flex: 1, borderRadius: 16 }} />
          <Osso altura={64} style={{ flex: 1, borderRadius: 16 }} />
        </div>
      </Estrutura>
    );
  }
  if (cena.especial === 'sem-viagem') {
    return (
      <Estrutura barra={barra}>
        <Vazio icone="sem-viagem" titulo={TEXTOS.semViagem.titulo}>
          <p>
            {TEXTOS.semViagem.proxima[0]}&nbsp;{TEXTOS.semViagem.proxima[1]}.
          </p>
        </Vazio>
        <h3 className="lbl titulo-de-bloco">Suas linhas</h3>
        {TEXTOS.linhas.map((l) => (
          <CartaoInterativo key={l.titulo} icone="linha" cor={l.cor} seta titulo={l.titulo} apoio={l.apoio.join('')} onClick={() => irPara('T10')} />
        ))}
      </Estrutura>
    );
  }
  if (cena.especial === 'erro') {
    return (
      <Estrutura barra={barra}>
        <Vazio icone="erro" titulo="Não conseguimos carregar sua viagem">
          <p>Parece que a internet caiu. Confira o sinal e tente de novo.</p>
          <Botao variante="secundario" className="do-vazio" onClick={() => mudarFluxo({ ...FLUXO_DO_INICIO })}>
            Tentar de novo
          </Botao>
          <BotaoLink alinhar="centro" onClick={abrirAjuda}>
            Preciso de ajuda
          </BotaoLink>
        </Vazio>
      </Estrutura>
    );
  }

  const h = cena.heroi;
  // a ida que já chegou não é mais uma das outras viagens de hoje
  const outras = parado || m.passo < CHEGOU ? cena.outras : cena.outras.filter((v) => v !== 'ida-de-sempre');
  const sheet = cena.sheet ? TEXTOS.sheets[cena.sheet] : null;
  return (
    <Estrutura barra={barra} banners={faixa} noFim={cena.rolada}>
      <Heroi
        forma={h.forma}
        linha={mock.linha.rotulo}
        viagem={h.viagem}
        comDivisoria={h.divisoria}
        alvo={h.alvo}
        antes={h.antes}
        numero={h.numero}
        tom={h.tom}
        complemento={h.complemento}
        selos={h.selos}
        aoLadoDoSelo={h.aoLado}
        ajuda={h.ajuda ? <p className="t15">{h.ajuda}</p> : undefined}
        chave={`${h.numero}|${h.alvo}|${h.forma}`}
      >
        {h.blocos.map((b, i) => {
          if (b.bloco === 'placa') return <Placa key={i} rotulo="Confira o ônibus" placa={PLACA} />;
          if (b.bloco === 'botao')
            return (
              <Botao key={i} variante={b.variante} icone={b.icone} onClick={() => agir(b.acao)}>
                {b.texto}
              </Botao>
            );
          if (b.bloco === 'apoio')
            return (
              <p key={i} className="t13">
                {b.texto}
              </p>
            );
          if (b.bloco === 'confirma')
            return (
              <Nota key={i} tipo="confirma">
                {contestado && b.texto.includes('crachá') ? 'Embarque marcado como contestado.' : b.texto}
              </Nota>
            );
          if (b.bloco === 'info')
            return (
              <Nota key={i} tipo="info">
                {emOutraViagem && fluxo.outraIda ? avisoDaOutraIda(m) : b.texto}
              </Nota>
            );
          return (
            <BotaoLink key={i} onClick={() => agir(b.acao)}>
              {b.texto}
            </BotaoLink>
          );
        })}
      </Heroi>
      {cena.troca && (
        <Cartao variante="destaque" espaco={8}>
          <p className="t15">
            Hoje você embarca em: <b className="forte">{cena.troca.ponto}</b>
          </p>
          <p className="t13">Seu ponto de sempre continua {cena.troca.sempre}.</p>
          {!cena.troca.semVolta && <BotaoLink onClick={() => mudarFluxo((f) => ({ ...f, sheet: 'voltar-ao-ponto' }))}>Voltar ao ponto de sempre</BotaoLink>}
        </Cartao>
      )}
      {cena.trilho && (
        <Cartao espaco={8}>
          <div className="cab-do-cartao">
            <h3 className="lbl">{cena.trilho.titulo}</h3>
            {!emOutraViagem && (
              <BotaoLink className="do-cartao" onClick={() => irPara('T06')}>
                Ver todas
              </BotaoLink>
            )}
          </div>
          <Trilho agora={cena.dadoDe ?? cena.hora} linhas={aPartirDoOnibus(cena.trilho.linhas).map(paraOTrilho)} />
        </Cartao>
      )}
      {(cena.mapa || cena.outroPonto) && (
        <div className="acts2">
          {cena.mapa && <CartaoInterativo compacto icone="mapa" titulo="Ver no mapa" apoio={cena.mapa} onClick={emOutraViagem ? undefined : () => irPara('T07')} />}
          {cena.outroPonto && <CartaoInterativo compacto icone="trocar-ponto" titulo="Outro ponto hoje" apoio={cena.outroPonto.apoio} desligado={cena.outroPonto.indisponivel} onClick={() => irPara('T08')} />}
        </div>
      )}
      {outras.length > 0 && (
        <>
          <h3 className="lbl titulo-de-bloco">Outras viagens de hoje</h3>
          {outras.map((v) => (
            <CartaoInterativo key={v} icone="onibus" cor={OUTRAS[v].cor} seta titulo={OUTRAS[v].titulo} apoio={v === 'ida-de-sempre' && !parado ? apoioDaIdaDeSempre(m) : OUTRAS[v].apoio} onClick={() => abrirOutra(v)} />
          ))}
        </>
      )}
      {sheet && (
        <Sheet titulo={sheet.titulo} aoFechar={parado ? undefined : fecharSheet}>
          <p>{sheet.texto}</p>
          <DoisBotoes>
            <Botao variante="secundario" onClick={fecharSheet}>
              {sheet.desiste}
            </Botao>
            <Botao onClick={confirmarSheet}>{sheet.confirma}</Botao>
          </DoisBotoes>
        </Sheet>
      )}
      {fluxo.toast && !parado && <Toast aoSumir={() => mudarFluxo((f) => ({ ...f, toast: null }))}>{fluxo.toast}</Toast>}
    </Estrutura>
  );
}

registrarTela('T05', T05);
export { SEMPRE };
