// T09 · Notificações. A central dos avisos que o app mandou, por dia, cada um com o disco na cor do estado.
// Tocar num aviso de viagem leva ao Início; num aviso da transportadora, abre o texto completo; num de cadastro,
// abre o Perfil, onde o ponto e as linhas do cadastro aparecem.
import { mock } from '@/dados';
import { avisosNegadosNoCelular, irPara, usarEstado, voltar } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Botao, BotaoLink } from '@/ds/botao/Botao';
import { CartaoInterativo } from '@/ds/cartao/Cartao';
import { Vazio } from '@/ds/central/Central';
import { Lista, LinhaDeAviso, TituloDeSecao } from '@/ds/lista/Lista';
import { Sheet } from '@/ds/sheet/Sheet';
import { TelaDeBloqueio, TelaInicialDoCelular } from '@/sistema/Push';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { ativarAvisos } from '@/telas/comum/avisos';
import { AVISOS, CENAS, DA_TRANSPORTADORA, DESTINO, DISCO, DO_FLUXO, TEXTOS, foiLida, naoLidas, type Aviso, type CenaT09 } from './cenas';

const DIAS = [...new Set(AVISOS.map((a) => a.dia))];

function T09({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT09>('T09', CENAS, DO_FLUXO, parado);
  // no fluxo, a permissão é a que o celular deu no Preparar o app; parado, é a do caso
  const negados = usarEstado(avisosNegadosNoCelular);

  // o aviso chegando com o app fechado é uma foto do celular; tocar nele abre o Início
  if (cena.noCelular === 'bloqueado') return <TelaDeBloqueio data={TEXTOS.bloqueio.data} hora={TEXTOS.bloqueio.hora} avisos={TEXTOS.bloqueio.avisos} />;
  if (cena.noCelular === 'em-uso') return <TelaInicialDoCelular aviso={TEXTOS.emUso} />;

  const ler = (a: Aviso) => (c: CenaT09): CenaT09 => ({ ...c, lidas: c.lidas === 'todas' ? 'todas' : [...new Set([...c.lidas, a.id])] });
  const tocar = (a: Aviso) => {
    if (DA_TRANSPORTADORA.includes(a.tipo)) return mudar((c) => ({ ...ler(a)(c), aberto: a.id }));
    mudar(ler(a));
    irPara(DESTINO[a.tipo] ?? 'T05');
  };
  const qual = cena.banner ?? (negados ? 'avisos-desligados' : undefined);
  const banner = qual ? TEXTOS.banners[qual] : null;
  const aberto = cena.aberto != null ? AVISOS[cena.aberto] : null;
  const completo = aberto ? (TEXTOS.completo[aberto.id] ?? { de: `${mock.transportadora.nome} · ${aberto.hora}`, texto: aberto.texto }) : null;
  const preferencias = <CartaoInterativo compacto seta icone="preferencias" titulo={TEXTOS.preferencias.titulo} apoio={TEXTOS.preferencias.apoio} onClick={() => irPara('T11')} />;

  return (
    <Estrutura
      barra={
        <Barra titulo={TEXTOS.titulo} aoVoltar={() => voltar('T05')}>
          {!cena.vazio && naoLidas(cena) > 0 && (
            <BotaoLink className="da-barra" onClick={() => mudar((c) => ({ ...c, lidas: 'todas' }))}>
              {TEXTOS.marcar}
            </BotaoLink>
          )}
        </Barra>
      }
      banners={
        banner ? (
          <Banner icone={banner.icone} acoes={banner.acao ? [{ rotulo: banner.acao, aoTocar: ativarAvisos }] : undefined}>
            {banner.texto}
          </Banner>
        ) : undefined
      }
      noFim={!!aberto && !!parado}
    >
      {cena.vazio ? (
        <Vazio icone="sino" titulo={TEXTOS.vazio.titulo}>
          <p>{TEXTOS.vazio.texto}</p>
        </Vazio>
      ) : (
        DIAS.map((dia) => (
          <span key={dia} className="so-conteudo">
            <TituloDeSecao>{dia}</TituloDeSecao>
            <Lista>
              {AVISOS.filter((a) => a.dia === dia).map((a) => (
                <LinhaDeAviso key={a.id} tom={DISCO[a.tipo].tom} icone={DISCO[a.tipo].icone} titulo={a.titulo} texto={a.texto} hora={a.hora} lida={foiLida(cena, a)} aoTocar={() => tocar(a)} />
              ))}
            </Lista>
          </span>
        ))
      )}
      {preferencias}
      {aberto && completo && (
        <Sheet titulo={aberto.titulo} aoFechar={parado ? undefined : () => mudar((c) => ({ ...c, aberto: undefined }))}>
          <p className="t13">{completo.de}</p>
          <p>{completo.texto}</p>
          <div className="pilha-de-botoes">
            <Botao variante="secundario" onClick={() => mudar((c) => ({ ...c, aberto: undefined }))}>
              {TEXTOS.fechar}
            </Botao>
          </div>
        </Sheet>
      )}
    </Estrutura>
  );
}

registrarTela('T09', T09);
