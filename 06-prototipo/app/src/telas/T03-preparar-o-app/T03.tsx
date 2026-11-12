// T03 · Preparar o app. A única tela que só aparece uma vez: depois do código, no primeiro acesso. As três
// coisas que o app combina com a pessoa, e um botão só. Quem diz não a qualquer coisa segue em frente.
import { irPara, mudar as mudarEstado, responderNotificacoes } from '@/estado/armazem';
import { usarCena, porCena } from '@/estado/cena';
import { comecarODia } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Botao, BotaoLink } from '@/ds/botao/Botao';
import { Opcao } from '@/ds/cartao/Cartao';
import { Icone } from '@/ds/icone/Icone';
import { Rodape } from '@/ds/rodape/Rodape';
import { Switch } from '@/ds/switch/Switch';
import { AlertaDoSistema, PedidoDoFaceID } from '@/sistema/Alerta';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { FLUXO_DO_INICIO, type FluxoT05 } from '@/telas/T05-inicio/T05';
import { abrirNaPrivacidade } from '@/telas/T12-privacidade/T12';
import { DO_FLUXO as AVISOS_DO_FLUXO, type CenaT11 } from '@/telas/T11-avisos/cenas';
import { CENAS, DO_FLUXO, TEXTOS, type CenaT03 } from './cenas';

function T03({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT03>('T03', CENAS, DO_FLUXO, parado);

  // o app segue com o que a pessoa decidiu aqui: a proteção ligada ou não (a Privacidade mostra a mesma), o aviso de
  // chegada ligado ou não (os Avisos e o Perfil mostram o mesmo) e o que o celular respondeu sobre as notificações.
  // Sem resposta, o celular nem foi perguntado: o aviso de chegada ficou desligado
  const abrirOInicio = (resposta?: 'permitida' | 'negada') => {
    mudarEstado((e) => ({ sessao: { ...e.sessao, entrou: true, primeiroAcesso: false, desbloqueio: cena.protecao } }));
    if (resposta) responderNotificacoes(resposta);
    porCena<CenaT11>('T11', { ...AVISOS_DO_FLUXO, chegando: cena.avisos });
    porCena<FluxoT05>('T05', { ...FLUXO_DO_INICIO, avisosNegados: resposta === 'negada' });
    mudar(DO_FLUXO);
    irPara('T05', { substituir: true });
    comecarODia();
  };
  const comecar = () => (cena.avisos && !cena.avisosNegados ? mudar((c) => ({ ...c, perguntaDosAvisos: true })) : abrirOInicio());
  const reconhecida = () => mudar((c) => ({ ...c, pedeADigital: false, protecao: true, naoReconhecido: false }));
  // cancelar não é não reconhecer: o pedido fecha, o interruptor volta a desligado e nenhum erro aparece
  const cancelada = () => mudar((c) => ({ ...c, pedeADigital: false, protecao: false, naoReconhecido: false }));

  return (
    <Estrutura
      barra={<Barra variante="so-titulo" titulo={TEXTOS.titulo} />}
      miolo="sc justa"
      rodape={
        <Rodape legenda={TEXTOS.rodape} indicadorDentro>
          <Botao onClick={comecar}>{TEXTOS.comecar}</Botao>
        </Rodape>
      }
    >
      <section className="grp">
        <h3>{TEXTOS.dados.titulo}</h3>
        {TEXTOS.dados.blocos.map((b) => (
          <p key={b.icone} className="blk">
            <Icone nome={b.icone} />
            <span>
              <b>{b.forte}</b>
              {b.texto}
            </span>
          </p>
        ))}
        <div className="lnks">
          {TEXTOS.dados.links.map((l, i) => (
            <BotaoLink key={l} pequeno onClick={() => abrirNaPrivacidade(i === 0 ? 'aviso' : 'termos')}>
              {l}
            </BotaoLink>
          ))}
        </div>
      </section>
      <section className="grp">
        <h3>{TEXTOS.avisos.titulo}</h3>
        <Opcao
          titulo={TEXTOS.avisos.opcao}
          apoio={
            cena.avisosNegados ? (
              <small className="w">
                <Icone nome="erro" />
                <span>
                  {TEXTOS.avisos.negados}
                  <button type="button" className="lk">
                    {TEXTOS.ajustes}
                  </button>
                </span>
              </small>
            ) : (
              <small>{TEXTOS.avisos.apoio}</small>
            )
          }
          controle={<Switch rotulo={TEXTOS.avisos.opcao} ligado={cena.avisos} aoMudar={(v) => mudar((c) => ({ ...c, avisos: v }))} />}
        />
      </section>
      <section className="grp">
        <h3>{TEXTOS.protecao.titulo}</h3>
        <Opcao
          titulo={TEXTOS.protecao.opcao}
          apoio={
            cena.semBloqueioDeTela ? (
              <small className="w">
                <Icone nome="erro" />
                <span>
                  {TEXTOS.protecao.semBloqueio}
                  <button type="button" className="lk">
                    {TEXTOS.ajustes}
                  </button>
                </span>
              </small>
            ) : cena.naoReconhecido ? (
              <small className="e">
                <Icone nome="erro" />
                <span>{TEXTOS.protecao.naoReconhecido}</span>
              </small>
            ) : (
              <small>{TEXTOS.protecao.apoio}</small>
            )
          }
          controle={<Switch rotulo={TEXTOS.protecao.opcao} ligado={cena.protecao} indisponivel={cena.semBloqueioDeTela} aoMudar={(v) => (v ? mudar((c) => ({ ...c, protecao: true, pedeADigital: true })) : mudar((c) => ({ ...c, protecao: false })))} />}
        />
      </section>
      {cena.perguntaDosAvisos && (
        <AlertaDoSistema
          titulo={TEXTOS.pergunta.titulo}
          lado
          botoes={[
            { rotulo: TEXTOS.pergunta.nao, aoTocar: () => abrirOInicio('negada') },
            { rotulo: TEXTOS.pergunta.sim, forte: true, aoTocar: () => abrirOInicio('permitida') },
          ]}
        >
          {TEXTOS.pergunta.texto}
        </AlertaDoSistema>
      )}
      {cena.pedeADigital && (
        <PedidoDoFaceID
          aoConfirmar={parado ? undefined : reconhecida}
          botoes={[
            { rotulo: TEXTOS.faceId.senha, aoTocar: reconhecida },
            { rotulo: TEXTOS.faceId.cancela, aoTocar: cancelada },
          ]}
        >
          {TEXTOS.faceId.texto}
        </PedidoDoFaceID>
      )}
    </Estrutura>
  );
}

registrarTela('T03', T03);
