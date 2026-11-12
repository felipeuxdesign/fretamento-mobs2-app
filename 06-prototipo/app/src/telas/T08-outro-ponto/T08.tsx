// T08 · Outro ponto hoje. Só para a ida de hoje: a lista dos pontos à frente do ônibus, com a razão de cada um,
// e a confirmação que explica o que acontece. O sucesso volta para o Início com o cartão da troca.
import { useEffect } from 'react';
import { mock } from '@/dados';
import { ler, usarEstado, voltar, voltarAoInicio, responderLocalizacao } from '@/estado/armazem';
import { usarCena, porCena } from '@/estado/cena';
import { momentoDoDia, trocarOPontoDeHoje } from '@/estado/dia';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Botao, DoisBotoes } from '@/ds/botao/Botao';
import { Divisoria } from '@/ds/cartao/Cartao';
import { Chip } from '@/ds/escolha/Escolha';
import { Icone } from '@/ds/icone/Icone';
import { Lista, ItemSelecionavel, GrupoRecolhido } from '@/ds/lista/Lista';
import { Nota } from '@/ds/nota/Nota';
import { Rodape } from '@/ds/rodape/Rodape';
import { ChipDePapel } from '@/ds/selo/Selo';
import { Sheet } from '@/ds/sheet/Sheet';
import { Vazio } from '@/ds/central/Central';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { haptico } from '@/sistema/haptico';
import { PrePermissaoDeLocalizacao } from '@/telas/comum/PrePermissaoDeLocalizacao';
import { FLUXO_DO_INICIO, type FluxoT05 } from '@/telas/T05-inicio/T05';
import { TEXTOS as DO_INICIO } from '@/telas/T05-inicio/cenas';
import { CENAS, TEXTOS, SEMPRE, legendaDe, textosDaTroca, cenaDoMomento, motivoSemTroca, type CenaT08, type ItemDaCena } from './cenas';
import { FLUXO_DA_TROCA, type FluxoT08 } from './fluxo';

const CENAS_DO_FLUXO: Record<string, FluxoT08> = {};
const GRUPO = 'ponto-de-hoje';

function Itens({ itens, escolhido, aoEscolher }: { itens: ItemDaCena[]; escolhido?: string; aoEscolher?: (id: string) => void }) {
  return (
    <>
      {itens.map((i, n) => (
        <span key={i.id} className="so-conteudo">
          {n > 0 && <Divisoria />}
          <ItemSelecionavel
            nomeDoGrupo={GRUPO}
            marcador={
              <span className={i.cheio ? 'mini term apagado' : i.desligado ? 'mini dis' : 'mini'}>
                <Icone nome={i.icone} traco={2.4} />
              </span>
            }
            nome={
              <>
                {i.nome}
                {i.papel && <ChipDePapel>{i.papel}</ChipDePapel>}
              </>
            }
            apoio={i.apoio}
            escolhido={i.id === escolhido}
            desligado={i.desligado}
            aoEscolher={aoEscolher ? () => aoEscolher(i.id) : undefined}
          />
        </span>
      ))}
    </>
  );
}

function T08({ parado }: PropsDaTela) {
  const permissao = usarEstado((e) => e.permissoes.localizacao);
  const dia = usarEstado((e) => e.dia);
  const doInicio = usarEstado((e) => e.cenas.T05 as FluxoT05 | undefined);
  const m = momentoDoDia(dia, doInicio);
  const [fluxo, mudarFluxo] = usarCena<FluxoT08>('T08', CENAS_DO_FLUXO, FLUXO_DA_TROCA, null);

  // parado, a cena é a da referência. No fluxo, é a lista das 06:24 com o que a pessoa fez por cima; com a troca
  // ativa ou o dia mais adiante, é a lista da hora do dia, com o ponto de hoje marcado
  let cena: CenaT08;
  if (parado) cena = CENAS[parado];
  else {
    const daSemente = m.deSempre && m.passo === 0;
    const base = daSemente ? { ...(fluxo.perto ? CENAS['T08-03'] : CENAS['T08-00']), passados: { quantos: 2, abertos: fluxo.passados ? CENAS['T08-04'].passados!.abertos : undefined } } : cenaDoMomento(m, { perto: fluxo.perto, passadosAbertos: fluxo.passados });
    const diferente = !!fluxo.escolhido && fluxo.escolhido !== m.ponto && !motivoSemTroca(fluxo.escolhido, m.hora, false);
    cena = {
      ...base,
      escolhido: fluxo.escolhido,
      nota: daSemente && !fluxo.escolhido && !fluxo.perto && !fluxo.passados,
      legenda: diferente ? legendaDe(fluxo.escolhido!, m.hora) : undefined,
      aceso: diferente,
      sheet: fluxo.sheet,
    };
  }
  const alvo = cena.escolhido ?? CENAS['T08-01'].escolhido!;
  const t = textosDaTroca(alvo);
  const voltaAoDeSempre = !parado && alvo === SEMPRE.id;

  // o Confirmar espera a resposta, e o sucesso volta para o Início com o cartão da troca e o toast
  useEffect(() => {
    if (!fluxo.enviando || parado) return;
    const espera = window.setTimeout(() => {
      const inicio = (ler().cenas.T05 as FluxoT05 | undefined) ?? FLUXO_DO_INICIO;
      trocarOPontoDeHoje(alvo, { ...inicio, sheet: undefined, carregou: true, toast: voltaAoDeSempre ? null : t.pronto });
      porCena<FluxoT08>('T08', FLUXO_DA_TROCA);
      haptico('sucesso');
      voltarAoInicio();
    }, mock.regras.esperaDoBotaoMs);
    return () => window.clearTimeout(espera);
  }, [fluxo.enviando]); // eslint-disable-line react-hooks/exhaustive-deps

  const fecharSheet = () => mudarFluxo((f) => ({ ...f, sheet: undefined, enviando: false }));
  const tocarEmPerto = () => {
    if (permissao === 'nao-pediu') mudarFluxo((f) => ({ ...f, sheet: 'pre-permissao' }));
    else if (permissao === 'permitida') mudarFluxo((f) => ({ ...f, perto: !f.perto }));
  };

  const barra = <Barra titulo={TEXTOS.titulo} aoVoltar={() => voltar('T05')} />;

  if (cena.vazio) {
    return (
      <Estrutura barra={barra}>
        <Vazio icone="sem-ponto" titulo={TEXTOS.vazio.titulo}>
          <p>{TEXTOS.vazio.texto}</p>
        </Vazio>
        <Lista>
          <GrupoRecolhido aberto>{TEXTOS.passados(cena.passados!.quantos)}</GrupoRecolhido>
          <Divisoria />
          <Itens itens={cena.passados!.abertos!} />
        </Lista>
        <Botao variante="secundario" className="com-respiro" onClick={() => voltar('T05')}>
          {TEXTOS.vazio.volta}
        </Botao>
      </Estrutura>
    );
  }

  return (
    <Estrutura
      barra={barra}
      banners={
        cena.banner ? (
          <Banner icone="sem-internet" largo>
            {cena.banner}
          </Banner>
        ) : undefined
      }
      rodape={
        <Rodape legenda={cena.legenda} indicadorDentro>
          <Botao desligado={!cena.aceso} onClick={() => mudarFluxo((f) => ({ ...f, sheet: 'confirmar' }))}>
            {TEXTOS.embarcar}
          </Botao>
        </Rodape>
      }
    >
      <p className="t15">
        {TEXTOS.vale[0]}
        <b className="forte">{TEXTOS.vale[1]}</b>
        {TEXTOS.vale[2]}
      </p>
      {cena.perto && (
        <Chip icone="localizacao" ligado={cena.perto === 'ligado'} aoTocar={tocarEmPerto}>
          {cena.perto === 'ligado' ? TEXTOS.pertoLigado : TEXTOS.perto}
        </Chip>
      )}
      <Lista>
        <div role="radiogroup" aria-label={TEXTOS.titulo} className="so-conteudo">
          <Itens itens={cena.itens} escolhido={cena.escolhido} aoEscolher={parado ? undefined : (id) => mudarFluxo((f) => ({ ...f, escolhido: id }))} />
        </div>
      </Lista>
      {cena.passados && (
        <Lista>
          <GrupoRecolhido aberto={!!cena.passados.abertos} aoTocar={() => mudarFluxo((f) => ({ ...f, passados: !f.passados }))}>
            {TEXTOS.passados(cena.passados.quantos)}
          </GrupoRecolhido>
          {cena.passados.abertos && (
            <>
              <Divisoria />
              <Itens itens={cena.passados.abertos} />
            </>
          )}
        </Lista>
      )}
      {cena.nota && <p className="t13">{TEXTOS.nota}</p>}
      {cena.sheet === 'pre-permissao' && (
        <PrePermissaoDeLocalizacao
          aoDesistir={parado ? undefined : fecharSheet}
          aoPermitir={() => {
            responderLocalizacao('permitida');
            mudarFluxo((f) => ({ ...f, sheet: undefined, perto: true }));
          }}
        />
      )}
      {(cena.sheet === 'confirmar' || cena.sheet === 'falhou') &&
        (voltaAoDeSempre ? (
          <Sheet titulo={DO_INICIO.sheets['voltar-ao-ponto'].titulo} aoFechar={fecharSheet}>
            <p>{DO_INICIO.sheets['voltar-ao-ponto'].texto}</p>
            <DoisBotoes>
              <Botao variante="secundario" onClick={fecharSheet}>
                {DO_INICIO.sheets['voltar-ao-ponto'].desiste}
              </Botao>
              <Botao carregando={fluxo.enviando} onClick={() => mudarFluxo((f) => ({ ...f, enviando: true }))}>
                {DO_INICIO.sheets['voltar-ao-ponto'].confirma}
              </Botao>
            </DoisBotoes>
          </Sheet>
        ) : (
          <Sheet titulo={t.confirmar.titulo} aoFechar={parado ? undefined : fecharSheet}>
            <p>
              {t.confirmar.antes}
              <b className="forte">{t.confirmar.hora}</b>
              {t.confirmar.depois}
            </p>
            {cena.sheet === 'falhou' ? <Nota tipo="erro-do-sheet">{t.confirmar.erro}</Nota> : <p className="t13">{t.confirmar.apoio}</p>}
            <DoisBotoes>
              <Botao variante="secundario" onClick={fecharSheet}>
                {t.confirmar.desiste}
              </Botao>
              <Botao carregando={!parado && fluxo.enviando} onClick={() => mudarFluxo((f) => ({ ...f, enviando: true }))}>
                {t.confirmar.confirma}
              </Botao>
            </DoisBotoes>
          </Sheet>
        ))}
      {cena.sheet === 'passou' && (
        <Sheet titulo={t.passou.titulo}>
          <Nota tipo="erro-do-sheet">{t.passou.erro}</Nota>
          <p>{t.passou.texto}</p>
          <DoisBotoes>
            <Botao variante="secundario">{t.passou.desiste}</Botao>
            <Botao>{t.passou.confirma}</Botao>
          </DoisBotoes>
        </Sheet>
      )}
    </Estrutura>
  );
}

registrarTela('T08', T08);
