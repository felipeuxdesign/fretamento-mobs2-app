// T02 · Digite o código. Seis dígitos e o caminho de volta sempre visível: reenviar, trocar o contato, pedir ajuda.
// A tela abre com o teclado aberto e valida sozinha no sexto dígito (digitado ou colado): não há botão de entrar.
// O erro fica no campo até ser resolvido e diz quantas tentativas restam.
import { useEffect } from 'react';
import { mock } from '@/dados';
import { irPara, ler, voltar } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { comecarODia } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Botao, BotaoLink, Validando } from '@/ds/botao/Botao';
import { CampoDeCodigo } from '@/ds/campo/Campo';
import { CartaoDeContato } from '@/ds/cartao/Cartao';
import { EstadoCentral, AcoesCentrais } from '@/ds/central/Central';
import { Nota } from '@/ds/nota/Nota';
import { Teclado } from '@/sistema/Teclado';
import { CartaoDoFormulario } from '@/telas/comum/CartaoDoFormulario';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { contatoEhCelular, contatoMascarado, entrou } from '@/telas/comum/sessao';
import { ComoGanharAcesso } from '@/telas/T01-entrar/T01';
import { CENAS, DO_FLUXO, TEXTOS, type CenaT02 } from './cenas';

const R = mock.regras;

function T02({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT02>('T02', CENAS, DO_FLUXO, parado);
  const bloqueado = cena.erro === 'bloqueado';
  const completo = cena.codigo.length === 6;

  // o contador do reenvio: um segundo de cada vez, até liberar
  useEffect(() => {
    if (parado || cena.falta <= 0 || bloqueado) return;
    const t = window.setTimeout(() => mudar((c) => ({ ...c, falta: Math.max(0, c.falta - 1) })), 1000);
    return () => window.clearTimeout(t);
  }, [cena.falta, bloqueado]); // eslint-disable-line react-hooks/exhaustive-deps

  // os 700 ms da validação, que começa sozinha no sexto dígito. No protótipo, qualquer código de seis dígitos entra:
  // quem navega não precisa saber um código. O incorreto, o expirado e o bloqueado se veem como estados parados
  useEffect(() => {
    if (!cena.validando || parado) return;
    const espera = window.setTimeout(() => {
      const primeiro = ler().sessao.primeiroAcesso;
      mudar(DO_FLUXO);
      entrou();
      irPara(primeiro ? 'T03' : 'T05', { substituir: true });
      if (!primeiro) comecarODia();
    }, R.esperaDoBotaoMs);
    return () => window.clearTimeout(espera);
  }, [cena.validando]); // eslint-disable-line react-hooks/exhaustive-deps

  // o sexto dígito valida: digitado, colado ou sugerido pelo celular. Corrigiu um erro até completar seis, valida de novo
  const digitar = (v: string) =>
    mudar((c) => ({
      ...c,
      codigo: v,
      erro: c.erro === 'incorreto' && v ? undefined : c.erro === 'expirado' ? undefined : c.erro,
      validando: v.length === 6 && c.erro !== 'bloqueado' ? true : c.validando,
    }));
  const entrar = () => completo && !bloqueado && !cena.validando && mudar((c) => ({ ...c, validando: true }));
  // o código novo recomeça a tela, e o campo continua ativo, com o teclado aberto, para a pessoa digitar
  const reenviar = () => {
    mudar({ ...DO_FLUXO, erros: cena.erros });
    document.getElementById('tela-do-aparelho')?.querySelector<HTMLInputElement>('input[autocomplete="one-time-code"]')?.focus({ preventScroll: true });
  };
  const trocar = () => voltar('T01');
  const abrirAjuda = () => mudar((c) => ({ ...c, ajuda: true }));

  if (cena.negado) {
    return (
      <Estrutura status="cartao" miolo="so-centro">
        <EstadoCentral icone="sem-acesso" titulo={TEXTOS.negado.titulo}>
          <p>{TEXTOS.negado.texto}</p>
          <CartaoDeContato
            icone="marca-whatsapp"
            titulo={TEXTOS.negado.contato.titulo}
            apoio={
              <>
                {TEXTOS.negado.contato.apoio[0]}&nbsp;{TEXTOS.negado.contato.apoio[1]}
              </>
            }
          />
          <AcoesCentrais>
            <Botao variante="secundario" onClick={() => irPara('T01', { substituir: true })}>
              {TEXTOS.negado.volta}
            </Botao>
          </AcoesCentrais>
        </EstadoCentral>
      </Estrutura>
    );
  }

  const erro = cena.erro === 'incorreto' ? TEXTOS.erro.incorreto(R.errosDoCodigo - cena.erros) : cena.erro === 'expirado' ? TEXTOS.erro.expirado : bloqueado ? TEXTOS.erro.bloqueado(parado ? R.bloqueioDoCodigoMin - 1 : R.bloqueioDoCodigoMin) : null;

  return (
    <Estrutura status="pagina" miolo="auth tarefa" barra={<Barra variante="nua" aoVoltar={trocar} />} solto={cena.digitando && parado ? <Teclado tipo="numeros" /> : undefined}>
      <div className="pilha8">
        <h2 className="h1">{TEXTOS.titulo}</h2>
        <p className="lead">
          {TEXTOS.frase[0]}
          <b>{contatoMascarado()}</b>
          {TEXTOS.frase[1]}
        </p>
      </div>
      <CartaoDoFormulario>
      <CampoDeCodigo
        rotulo={TEXTOS.rotulo}
        valor={cena.codigo}
        erro={cena.erro === 'incorreto' || cena.erro === 'expirado'}
        desligado={bloqueado || cena.validando}
        fotoComFoco={!!parado && cena.digitando}
        comFoco={!parado}
        aoMudar={digitar}
        aoEnviar={entrar}
      >
        {erro && <Nota tipo="erro-liso">{erro}</Nota>}
      </CampoDeCodigo>
      {cena.erro === 'expirado' ? (
        <Botao onClick={reenviar}>{TEXTOS.reenviar}</Botao>
      ) : (
        cena.validando && <Validando>{TEXTOS.entrando}</Validando>
      )}
      </CartaoDoFormulario>
      {bloqueado ? (
        <>
          <Nota tipo="info">{TEXTOS.nuncaChega}</Nota>
          <BotaoLink onClick={abrirAjuda}>{TEXTOS.ajuda}</BotaoLink>
        </>
      ) : cena.erro === 'expirado' ? (
        <BotaoLink onClick={trocar}>{TEXTOS.trocar}</BotaoLink>
      ) : cena.falta > 0 ? (
        <>
          <p className="t13">{TEXTOS.reenviarEm(cena.falta)}</p>
          {!cena.digitando && <BotaoLink onClick={trocar}>{TEXTOS.trocar}</BotaoLink>}
        </>
      ) : (
        <>
          <BotaoLink onClick={reenviar}>{TEXTOS.reenviar}</BotaoLink>
          {/* a caixa de spam é do e-mail: quem pediu o código pelo celular lê a mesma nota sem ela */}
          <Nota tipo="info">{!parado && contatoEhCelular() ? TEXTOS.naoChegouNoCelular : TEXTOS.naoChegou}</Nota>
          <div className="lnks de-16">
            <BotaoLink onClick={trocar}>{TEXTOS.trocar}</BotaoLink>
            <BotaoLink onClick={abrirAjuda}>{TEXTOS.ajuda}</BotaoLink>
          </div>
        </>
      )}
      {cena.ajuda && <ComoGanharAcesso aoFechar={() => mudar((c) => ({ ...c, ajuda: false }))} />}
    </Estrutura>
  );
}

registrarTela('T02', T02);
