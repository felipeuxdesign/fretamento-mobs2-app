// T04 · Bloqueado. O app reaberto com o desbloqueio ligado: um pedido só, no centro, e vários motivos para ele
// aparecer. Nada da viagem aparece atrás do pedido. O pedido de biometria é o do Face ID, do sistema, simulado.
import { useEffect } from 'react';
import { mock } from '@/dados';
import { irPara } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { comecarODia } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { EstadoCentral, AcoesCentrais } from '@/ds/central/Central';
import { Botao, BotaoLink } from '@/ds/botao/Botao';
import { Nota } from '@/ds/nota/Nota';
import { CartaoDeContato } from '@/ds/cartao/Cartao';
import { PedidoDoFaceID } from '@/sistema/Alerta';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { pedirCodigoDeNovo } from '@/telas/comum/sessao';
import { CENAS, DO_FLUXO, ESPERA_DA_BIOMETRIA_MS, type CenaT04 } from './cenas';

function T04({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT04>('T04', CENAS, DO_FLUXO, parado);
  const rh = mock.empresa.rh;

  // o pedido do Face ID abre sozinho, 300 ms depois do app
  useEffect(() => {
    if (parado || cena.motivo !== 'reabertura' || cena.folha) return;
    const t = window.setTimeout(() => mudar((c) => (c.motivo === 'reabertura' ? { ...c, folha: true } : c)), ESPERA_DA_BIOMETRIA_MS);
    return () => window.clearTimeout(t);
    // só ao abrir a tela
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // reconhecida, a Ana chega ao Início às 06:24, e o dia começa a andar
  const entrar = () => {
    mudar(DO_FLUXO);
    irPara('T05', { substituir: true });
    comecarODia();
  };
  const pedirCodigo = () => pedirCodigoDeNovo('T02');
  const abrirFolha = () => mudar({ motivo: 'reabertura', folha: true });

  if (cena.motivo === 'acesso-encerrado') {
    return (
      <Estrutura status="cartao" miolo="so-centro">
        <EstadoCentral icone="sem-acesso" titulo="Seu acesso foi encerrado">
          <p>Sua empresa ou a transportadora encerrou seu cadastro no transporte. Se for um engano, fale com o RH.</p>
          <CartaoDeContato
            icone="marca-whatsapp"
            titulo={`RH · ${mock.empresa.nome}`}
            apoio={
              <>
                {rh.canal} {rh.numero} · {rh.horario.replace('às 17h', 'às')}&nbsp;17h
              </>
            }
          />
          <AcoesCentrais>
            <Botao onClick={() => irPara('T01', { substituir: true })}>Entendi</Botao>
          </AcoesCentrais>
        </EstadoCentral>
      </Estrutura>
    );
  }

  return (
    <Estrutura status="pagina" miolo="so-centro">
      {cena.motivo === 'reabertura' && (
        <EstadoCentral variante="bloqueio" icone="desbloquear" titulo="Confirme que é você">
          <p>Use o Face ID ou a senha do celular para abrir o app.</p>
          <AcoesCentrais>
            <Botao onClick={abrirFolha}>Desbloquear</Botao>
            <BotaoLink alinhar="centro" onClick={() => pedirCodigoDeNovo('T01')}>
              Entrar com código
            </BotaoLink>
          </AcoesCentrais>
        </EstadoCentral>
      )}
      {cena.motivo === 'nao-reconhecido' && (
        <EstadoCentral variante="bloqueio" icone="desbloquear" titulo="Confirme que é você">
          <p>Use o Face ID ou a senha do celular para abrir o app.</p>
          <Nota tipo="erro">O celular não reconheceu você. Tente de novo, ou use a senha do celular.</Nota>
          <AcoesCentrais>
            <Botao onClick={abrirFolha}>Tentar de novo</Botao>
            <BotaoLink alinhar="centro" onClick={entrar}>
              Usar a senha do celular
            </BotaoLink>
          </AcoesCentrais>
        </EstadoCentral>
      )}
      {cena.motivo === 'travada' && (
        <EstadoCentral variante="bloqueio" icone="desbloquear" titulo="Confirme que é você">
          <p>Use a senha do celular para abrir o app.</p>
          <Nota tipo="aviso">O celular travou o Face ID depois de várias tentativas. Ele volta em {cena.voltaEm}. Enquanto isso, use a senha do celular.</Nota>
          <AcoesCentrais>
            <Botao onClick={entrar}>Usar a senha do celular</Botao>
            <BotaoLink alinhar="centro" onClick={() => pedirCodigoDeNovo('T01')}>
              Entrar com código
            </BotaoLink>
          </AcoesCentrais>
        </EstadoCentral>
      )}
      {cena.motivo === 'biometria-mudou' && (
        <EstadoCentral variante="bloqueio" icone="seguranca-mudou" tom="aviso" titulo="A segurança do seu celular mudou">
          <p>O Face ID cadastrado no celular foi alterado. Para proteger suas viagens, entre de novo com um código: ele chega em {mock.pessoa.emailMascarado}.</p>
          <AcoesCentrais>
            <Botao onClick={pedirCodigo}>Receber código</Botao>
            <BotaoLink alinhar="centro" onClick={() => irPara('T10')}>
              Não fui eu que mudei
            </BotaoLink>
          </AcoesCentrais>
        </EstadoCentral>
      )}
      {cena.motivo === 'sessao-expirada' && (
        <EstadoCentral variante="bloqueio" icone="horario" titulo="Faz tempo que você não abre o app">
          <p>
            Por segurança, depois de {mock.regras.sessaoDias} dias sem abrir, pedimos o código de novo. É rápido: ele chega em {mock.pessoa.emailMascarado}.
          </p>
          <AcoesCentrais>
            <Botao onClick={pedirCodigo}>Receber código</Botao>
          </AcoesCentrais>
          <p className="t13 estreito">Suas linhas e seu ponto continuam salvos.</p>
        </EstadoCentral>
      )}
      {cena.folha && (
        // no fluxo, só se chega aqui de propósito, pelo painel do palco: o pedido fica na tela até a pessoa tocar
        // no desenho do Face ID (ou numa das saídas), e não confirma sozinho
        <PedidoDoFaceID
          aoConfirmar={parado ? undefined : entrar}
          esperaOToque
          botoes={[
            { rotulo: 'Usar a senha do celular', aoTocar: entrar },
            { rotulo: 'Cancelar', aoTocar: () => mudar({ motivo: 'nao-reconhecido', folha: false }) },
          ]}
        >
          Confirme que é você para abrir o app.
        </PedidoDoFaceID>
      )}
    </Estrutura>
  );
}

registrarTela('T04', T04);
