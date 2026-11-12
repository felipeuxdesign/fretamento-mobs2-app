// T01 · Entrar. Um contato e um botão: o e-mail ou o celular que a empresa cadastrou. O app nunca diz se o
// contato existe, e antes do código não sabe de que empresa é a pessoa: nada do cadastro aparece aqui.
import { CartaoDoFormulario } from '@/telas/comum/CartaoDoFormulario';
import { useEffect } from 'react';
import { mock } from '@/dados';
import { irPara } from '@/estado/armazem';
import { usarCena, porCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Banner } from '@/ds/banner/Banner';
import { Botao, BotaoLink } from '@/ds/botao/Botao';
import { Campo } from '@/ds/campo/Campo';
import { CabecalhoDeEntrada, PeDoEntrar } from '@/ds/cabecalho/Cabecalho';
import { Nota } from '@/ds/nota/Nota';
import { Segmentado } from '@/ds/segmentado/Segmentado';
import { Sheet } from '@/ds/sheet/Sheet';
import { Teclado } from '@/sistema/Teclado';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { chegarAoEntrar, guardarContato } from '@/telas/comum/sessao';
import { DO_FLUXO as CODIGO_DO_FLUXO, type CenaT02 } from '@/telas/T02-codigo/cenas';
import { CENAS, DO_FLUXO, ERRO_DO_EMAIL, ERRO_DO_CELULAR, ERRO_DO_VAZIO, PREENCHIDO, TEXTOS, comoCelular, emailInteiro, celularInteiro, type CenaT01 } from './cenas';

/** O sheet "Como ganhar acesso": genérico, sem nome nem contato. A T02 abre o mesmo. */
export function ComoGanharAcesso({ aoFechar }: { aoFechar?: () => void }) {
  return (
    <Sheet titulo={TEXTOS.acesso.titulo} aoFechar={aoFechar}>
      <p>{TEXTOS.acesso.texto}</p>
      <Botao variante="secundario" onClick={aoFechar}>
        {TEXTOS.acesso.fecha}
      </Botao>
    </Sheet>
  );
}

function T01({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT01>('T01', CENAS, DO_FLUXO, parado);
  const campo = TEXTOS.campo[cena.meio];

  useEffect(() => {
    if (!parado) chegarAoEntrar();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // os 700 ms do envio, e a tela do código abre dizendo para onde ele foi
  useEffect(() => {
    if (!cena.enviando || parado) return;
    const espera = window.setTimeout(() => {
      guardarContato(cena.valor);
      // um pedido novo é um código novo: a tela do código recomeça limpa, sem os dígitos nem o contador de antes
      porCena<CenaT02>('T02', CODIGO_DO_FLUXO);
      mudar((c) => ({ ...c, enviando: false }));
      irPara('T02');
    }, mock.regras.esperaDoBotaoMs);
    return () => window.clearTimeout(espera);
  }, [cena.enviando]); // eslint-disable-line react-hooks/exhaustive-deps

  const receber = () => {
    if (cena.semInternet || cena.enviando) return;
    // o campo vazio ou pela metade responde no lugar, embaixo do campo, e nada é enviado
    if (!cena.valor.trim()) return mudar((c) => ({ ...c, erro: ERRO_DO_VAZIO[c.meio] }));
    if (cena.meio === 'email' && !emailInteiro(cena.valor)) return mudar((c) => ({ ...c, erro: ERRO_DO_EMAIL }));
    if (cena.meio === 'celular' && !celularInteiro(cena.valor)) return mudar((c) => ({ ...c, erro: ERRO_DO_CELULAR }));
    mudar((c) => ({ ...c, erro: undefined, enviando: true }));
  };

  return (
    <Estrutura
      status="pagina"
      miolo="auth entrar"
      banners={
        cena.semInternet ? (
          <Banner icone="sem-internet" largo>
            {TEXTOS.semInternet}
          </Banner>
        ) : undefined
      }
      solto={
        cena.digitando ? (
          <Teclado tipo="letras" />
        ) : (
          <PeDoEntrar>
            <BotaoLink alinhar="centro" onClick={() => mudar((c) => ({ ...c, comoGanharAcesso: true }))}>
              {TEXTOS.semConvite}
            </BotaoLink>
          </PeDoEntrar>
        )
      }
    >
      <CabecalhoDeEntrada />
      <div className="pilha8">
        <h2 className="h1">{TEXTOS.titulo}</h2>
        <p className="lead">{TEXTOS.frase}</p>
      </div>
      <CartaoDoFormulario>
      <Segmentado
        rotulo="Como você recebe o código"
        opcoes={[
          { valor: 'email', rotulo: 'E-mail' },
          { valor: 'celular', rotulo: 'Celular' },
        ]}
        valor={cena.meio}
        aoMudar={(meio) => mudar((c) => ({ ...c, meio, valor: parado ? '' : PREENCHIDO[meio], erro: undefined }))}
      />
      <Campo
        tipo={cena.meio}
        rotulo={campo.rotulo}
        dica={campo.dica}
        valor={cena.valor}
        erro={!!cena.erro}
        fotoComFoco={!!parado && cena.digitando}
        aoMudar={(v) => mudar((c) => ({ ...c, valor: c.meio === 'celular' ? comoCelular(v) : v, erro: undefined }))}
        aoEnviar={receber}
      >
        {cena.erro && <Nota tipo="erro">{cena.erro}</Nota>}
      </Campo>
      <Botao desligado={cena.semInternet} carregando={cena.enviando} rotuloCarregando={TEXTOS.enviando} onClick={receber}>
        {TEXTOS.receber}
      </Botao>
      </CartaoDoFormulario>
      {cena.comoGanharAcesso && <ComoGanharAcesso aoFechar={parado ? undefined : () => mudar((c) => ({ ...c, comoGanharAcesso: false }))} />}
    </Estrutura>
  );
}

registrarTela('T01', T01);
