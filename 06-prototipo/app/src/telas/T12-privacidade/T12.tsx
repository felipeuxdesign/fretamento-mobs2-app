// T12 · Privacidade. O desbloqueio, os dois textos legais, a localização e Meus dados. O que se abre daqui com um
// toque fica nesta section: o aviso, os termos, Meus dados, o pedido e o protocolo.
import { useEffect } from 'react';
import { mock } from '@/dados';
import { irPara, mudar as mudarEstado, usarEstado, voltar, voltarAoInicio } from '@/estado/armazem';
import { usarCena, porCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Botao } from '@/ds/botao/Botao';
import { AreaDeTexto } from '@/ds/campo/Campo';
import { Cartao, CartaoDeContato } from '@/ds/cartao/Cartao';
import { EstadoCentral, AcoesCentrais } from '@/ds/central/Central';
import { Lista, Linha, ItemSelecionavel } from '@/ds/lista/Lista';
import { Nota } from '@/ds/nota/Nota';
import { Rodape } from '@/ds/rodape/Rodape';
import { Sheet } from '@/ds/sheet/Sheet';
import { Switch } from '@/ds/switch/Switch';
import { PedidoDoFaceID } from '@/sistema/Alerta';
import { Teclado } from '@/sistema/Teclado';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { CENAS, DO_FLUXO, PROTOCOLO, TEXTOS, TIPOS, type CenaT12, type Vista } from './cenas';

/** De outra tela (Preparar o app, Excluir conta): abre a Privacidade já num dos textos ou em Meus dados. */
export function abrirNaPrivacidade(vista: Vista): void {
  porCena<CenaT12>('T12', { ...DO_FLUXO, vista, deFora: true });
  irPara('T12');
}

function T12({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT12>('T12', CENAS, DO_FLUXO, parado);
  // no fluxo, o desbloqueio é o da sessão: o que a pessoa decidiu no Preparar o app, ou mudou aqui. Parado, é o do caso
  const daSessao = usarEstado((e) => e.sessao.desbloqueio);
  const desbloqueio = parado ? cena.desbloqueio : daSessao;
  const t = TEXTOS;
  const para = (vista: Vista) => mudar((c) => ({ ...c, vista }));
  const sairDaVista = (anterior: Vista) => (cena.deFora && anterior === 'privacidade' ? (mudar(DO_FLUXO), voltar('T10')) : para(anterior));
  const semInternet = cena.semInternet ? <Banner icone="sem-internet">{t.dados.semInternet}</Banner> : undefined;

  // os 700 ms do envio, e o pedido fica registrado com o protocolo
  useEffect(() => {
    if (!cena.pedido.enviando || parado) return;
    const espera = window.setTimeout(() => mudar((c) => ({ ...c, vista: 'registrado', emAndamento: true, pedido: { ...c.pedido, enviando: false } })), mock.regras.esperaDoBotaoMs);
    return () => window.clearTimeout(espera);
  }, [cena.pedido.enviando]); // eslint-disable-line react-hooks/exhaustive-deps

  if (cena.vista === 'aviso' || cena.vista === 'termos') {
    return (
      <Estrutura key={cena.vista} barra={<Barra titulo={cena.vista === 'aviso' ? t.aviso : t.termos} aoVoltar={() => sairDaVista('privacidade')} />} miolo="sc sem-vao">
        <div className="prose">
          <p className="mu">{t.versao}</p>
          {cena.vista === 'aviso'
            ? t.avisoDePrivacidade.map((s) => (
                <span key={s.titulo} className="so-conteudo">
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </span>
              ))
            : t.termosDeUso.map((p) => <p key={p}>{p}</p>)}
        </div>
      </Estrutura>
    );
  }

  if (cena.vista === 'meus-dados') {
    return (
      <Estrutura
        key="meus-dados"
        barra={<Barra titulo={t.meusDados.titulo} aoVoltar={() => sairDaVista('privacidade')} />}
        banners={semInternet}
        rodape={
          <Rodape>
            <Botao desligado={cena.semInternet} onClick={() => para('pedido')}>
              {t.dados.fazer}
            </Botao>
          </Rodape>
        }
      >
        <div className="prose">
          <p>{t.dados.texto}</p>
          <p className="mu">{t.dados.prazo}</p>
        </div>
        {cena.emAndamento && (
          <Cartao className="e4">
            <p className="t13b">{t.dados.andamento.titulo}</p>
            <p className="t15">{TIPOS.find((x) => x.id === cena.pedido.tipo)!.nome}</p>
            <p className="t13">
              {t.dados.andamento.antes}
              <b className="forte tinta">{PROTOCOLO}</b>
              {t.dados.andamento.depois}
            </p>
          </Cartao>
        )}
      </Estrutura>
    );
  }

  if (cena.vista === 'pedido') {
    const p = cena.pedido;
    // sem nada escrito, o pedido não sai: o campo pede o texto, no lugar
    const enviar = () => mudar((c) => ({ ...c, pedido: c.pedido.texto.trim() ? { ...c.pedido, enviando: true, falhou: false, vazio: false } : { ...c.pedido, vazio: true } }));
    return (
      <Estrutura
        key="pedido"
        barra={<Barra titulo={t.pedido.titulo} aoVoltar={() => para('meus-dados')} />}
        banners={semInternet}
        rodape={
          p.digitando && parado ? undefined : (
            <Rodape>
              <Botao desligado={cena.semInternet} carregando={p.enviando} rotuloCarregando={t.pedido.enviar} onClick={enviar}>
                {t.pedido.enviar}
              </Botao>
            </Rodape>
          )
        }
        solto={p.digitando && parado ? <Teclado tipo="letras" rotuloDoIr="OK" /> : undefined}
      >
        <p className="lbl">{t.pedido.tipo}</p>
        <Lista>
          <div role="radiogroup" aria-label={t.pedido.tipo} className="so-conteudo">
            {TIPOS.map((x) => (
              <ItemSelecionavel key={x.id} nomeDoGrupo="tipo-de-pedido" nome={x.nome} escolhido={p.tipo === x.id} aoEscolher={() => mudar((c) => ({ ...c, pedido: { ...c.pedido, tipo: x.id } }))} />
            ))}
          </div>
        </Lista>
        {p.tipo === 'apagar' && <Nota tipo="aviso-do-pedido">{t.pedido.apagar}</Nota>}
        <AreaDeTexto rotulo={t.pedido.campo} dica={t.pedido.dica} valor={p.texto} erro={p.vazio} foto={!!parado && !p.digitando} fotoComFoco={!!parado && p.digitando} aoMudar={(v) => mudar((c) => ({ ...c, pedido: { ...c.pedido, texto: v, vazio: false } }))}>
          {p.vazio && <Nota tipo="erro-liso">{t.pedido.campo}</Nota>}
        </AreaDeTexto>
        {p.falhou && (
          <Nota tipo="erro" icone="cancelada">
            {t.pedido.falhou}
          </Nota>
        )}
      </Estrutura>
    );
  }

  if (cena.vista === 'registrado') {
    return (
      <Estrutura key="registrado" barra={<Barra titulo={t.meusDados.titulo} aoVoltar={() => para('meus-dados')} />} miolo="so-centro">
        <EstadoCentral icone="no-horario" tom="ok" titulo={t.registrado.titulo}>
          <p>{t.registrado.texto}</p>
          <CartaoDeContato icone="documento" invertido comRespiro titulo={<span className="tabular">{PROTOCOLO}</span>} apoio={t.registrado.protocolo} />
          <AcoesCentrais>
            <Botao
              variante="secundario"
              onClick={() => {
                // a Privacidade volta para a primeira tela dela, com o pedido em andamento guardado
                mudar((c) => ({ ...c, vista: 'privacidade', deFora: false, pedido: { ...c.pedido, texto: '' } }));
                voltarAoInicio();
              }}
            >
              {t.registrado.volta}
            </Botao>
          </AcoesCentrais>
        </EstadoCentral>
      </Estrutura>
    );
  }

  const desligar = () => {
    mudarEstado((e) => ({ sessao: { ...e.sessao, desbloqueio: false } }));
    mudar((c) => ({ ...c, desbloqueio: false, desligando: false }));
  };
  const ligar = () => {
    mudarEstado((e) => ({ sessao: { ...e.sessao, desbloqueio: true } }));
    mudar((c) => ({ ...c, desbloqueio: true, ligando: false }));
  };

  return (
    <Estrutura key="privacidade" barra={<Barra titulo={t.titulo} aoVoltar={() => voltar('T10')} />}>
      <Lista>
        <Linha
          icone="bloqueio"
          titulo={t.desbloqueio.titulo}
          apoio={cena.semBloqueioDeTela ? t.desbloqueio.semBloqueio : desbloqueio || cena.ligando ? t.desbloqueio.apoio : t.desbloqueio.desligado}
          desligada={cena.semBloqueioDeTela}
          controle={<Switch rotulo={t.desbloqueio.titulo} ligado={desbloqueio} indisponivel={cena.semBloqueioDeTela} aoMudar={(v) => mudar((c) => (v ? { ...c, ligando: true } : { ...c, desligando: true }))} />}
        />
        {cena.semBloqueioDeTela && <Linha icone="sem-bloqueio" titulo={t.desbloqueio.ajustes} seta aoTocar={() => {}} />}
        <Linha icone="documento" titulo={t.aviso} seta aoTocar={() => para('aviso')} />
        <Linha icone="documento" titulo={t.termos} seta aoTocar={() => para('termos')} />
        {/* a localização aqui é só leitura: diz como o app a usa, e não leva a lugar nenhum dentro dele */}
        <Linha icone={cena.localizacaoDesligada ? 'sem-localizacao' : 'localizacao'} titulo={t.localizacao.titulo} apoio={cena.localizacaoDesligada ? t.localizacao.desligada : t.localizacao.apoio} seta />
        <Linha icone="meu-ponto" titulo={t.meusDados.titulo} apoio={t.meusDados.apoio} seta aoTocar={() => para('meus-dados')} />
      </Lista>
      {cena.desligando && (
        <Sheet titulo={t.desligar.titulo} aoFechar={parado ? undefined : () => mudar((c) => ({ ...c, desligando: false }))}>
          <p>{t.desligar.texto}</p>
          <div className="pilha-de-botoes">
            <Botao variante="destrutivo" onClick={desligar}>
              {t.desligar.confirma}
            </Botao>
            <Botao variante="secundario" onClick={() => mudar((c) => ({ ...c, desligando: false }))}>
              {t.desligar.desiste}
            </Botao>
          </div>
        </Sheet>
      )}
      {cena.ligando && (
        <PedidoDoFaceID
          aoConfirmar={parado ? undefined : ligar}
          botoes={[
            // as mesmas saídas do pedido no Preparar o app e no Bloqueado. A referência parada traz só o Cancelar
            ...(parado ? [] : [{ rotulo: t.ligar.senha, aoTocar: ligar }]),
            { rotulo: t.ligar.desiste, aoTocar: () => mudar((c) => ({ ...c, ligando: false })) },
          ]}
        >
          {t.ligar.texto}
        </PedidoDoFaceID>
      )}
    </Estrutura>
  );
}

registrarTela('T12', T12);
