// T13 · Excluir conta. Diz em duas frases o que some e o que fica, e aponta para Meus dados quem quer apagar
// o cadastro também. Confirmada, termina num estado central sem barra nem voltar, porque não há sessão.
import { useEffect } from 'react';
import { mock } from '@/dados';
import { voltar } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Botao, BotaoLink } from '@/ds/botao/Botao';
import { EstadoCentral, AcoesCentrais } from '@/ds/central/Central';
import { Nota } from '@/ds/nota/Nota';
import { Rodape } from '@/ds/rodape/Rodape';
import { Sheet } from '@/ds/sheet/Sheet';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { excluirConta } from '@/telas/comum/sessao';
import { abrirNaPrivacidade } from '@/telas/T12-privacidade/T12';
import { CENAS, DO_FLUXO, TEXTOS, type CenaT13 } from './cenas';

function T13({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT13>('T13', CENAS, DO_FLUXO, parado);
  const t = TEXTOS;

  // os 700 ms da exclusão, e a conta deixa de existir
  useEffect(() => {
    if (!cena.excluindo || parado) return;
    const espera = window.setTimeout(() => mudar({ excluida: true }), mock.regras.esperaDoBotaoMs);
    return () => window.clearTimeout(espera);
  }, [cena.excluindo]); // eslint-disable-line react-hooks/exhaustive-deps

  if (cena.excluida) {
    return (
      <Estrutura status="cartao" miolo="so-centro">
        <EstadoCentral icone="no-horario" tom="ok" titulo={t.excluida.titulo}>
          <p>{t.excluida.texto}</p>
          <AcoesCentrais>
            <Botao onClick={excluirConta}>{t.excluida.volta}</Botao>
          </AcoesCentrais>
        </EstadoCentral>
      </Estrutura>
    );
  }

  return (
    <Estrutura
      barra={<Barra titulo={t.titulo} aoVoltar={() => voltar('T10')} />}
      banners={cena.semInternet ? <Banner icone="sem-internet">{t.semInternet}</Banner> : undefined}
      rodape={
        <Rodape>
          <Botao variante={cena.excluindo ? 'primario' : 'destrutivo'} desligado={cena.semInternet} carregando={cena.excluindo} rotuloCarregando={t.excluir} onClick={() => mudar((c) => ({ ...c, confirmando: true, falhou: false }))}>
            {t.excluir}
          </Botao>
        </Rodape>
      }
    >
      <div className="prose">
        <p>{t.some}</p>
        <p>
          {t.fica[0]}
          <b className="forte">{t.fica[1]}</b>
          {t.fica[2]}
        </p>
        <BotaoLink onClick={() => abrirNaPrivacidade('meus-dados')}>{t.meusDados}</BotaoLink>
      </div>
      {cena.falhou && (
        <Nota tipo="erro" icone="cancelada">
          {t.falhou}
        </Nota>
      )}
      {cena.confirmando && (
        <Sheet titulo={t.confirmar.titulo} aoFechar={parado ? undefined : () => mudar((c) => ({ ...c, confirmando: false }))}>
          <p>{t.confirmar.texto}</p>
          <div className="pilha-de-botoes">
            <Botao variante="destrutivo" onClick={() => mudar({ excluindo: true })}>
              {t.confirmar.confirma}
            </Botao>
            <Botao variante="secundario" onClick={() => mudar((c) => ({ ...c, confirmando: false }))}>
              {t.confirmar.desiste}
            </Botao>
          </div>
        </Sheet>
      )}
    </Estrutura>
  );
}

registrarTela('T13', T13);
