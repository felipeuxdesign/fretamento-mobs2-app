// T11 · Avisos. Dois switches e três chips, numa lista só. A nota com o cadeado diz o que não se desliga:
// atrasos, trocas, cancelamentos e comunicados chegam sempre.
import { avisosNegadosNoCelular, usarEstado, voltar } from '@/estado/armazem';
import { usarCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Chip, Chips } from '@/ds/escolha/Escolha';
import { Lista, Linha, NotaDaLista } from '@/ds/lista/Lista';
import { Switch } from '@/ds/switch/Switch';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { ativarAvisos } from '@/telas/comum/avisos';
import { CENAS, DO_FLUXO, MINUTOS, TEXTOS, type CenaT11 } from './cenas';

function T11({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT11>('T11', CENAS, DO_FLUXO, parado);
  // no fluxo, a permissão é a que o celular deu no Preparar o app; parado, é a do caso
  const negados = usarEstado(avisosNegadosNoCelular);
  const qual = cena.banner ?? (negados ? 'avisos-desligados' : undefined);
  const banner = qual ? TEXTOS.banners[qual] : null;
  // com a permissão do celular negada, as escolhas ficam como estão, apagadas
  const semPermissao = qual === 'avisos-desligados';

  return (
    <Estrutura
      barra={<Barra titulo={TEXTOS.titulo} aoVoltar={() => voltar('T10')} />}
      banners={
        banner ? (
          <Banner icone={banner.icone} acoes={banner.acao ? [{ rotulo: banner.acao, aoTocar: ativarAvisos }] : undefined}>
            {banner.texto}
          </Banner>
        ) : undefined
      }
    >
      <Lista>
        <Linha
          icone="aviso-tocando"
          titulo={TEXTOS.chegando.titulo}
          apoio={TEXTOS.chegando.apoio}
          desligada={semPermissao}
          controle={<Switch rotulo={TEXTOS.chegando.titulo} ligado={cena.chegando} indisponivel={semPermissao} aoMudar={(v) => mudar((c) => ({ ...c, chegando: v }))} />}
        />
        <Linha emColuna="inicio">
          <span className="t13" id="quando-avisar">
            {TEXTOS.quando}
          </span>
          <Chips rotulo={TEXTOS.quando}>
            {MINUTOS.map((m) => (
              <Chip key={m} comoRadio ligado={cena.chegando && cena.minutos === m} desligado={!cena.chegando || semPermissao} aoTocar={() => mudar((c) => ({ ...c, minutos: m }))}>
                {m} min
              </Chip>
            ))}
          </Chips>
        </Linha>
        <Linha
          icone="saiu"
          titulo={TEXTOS.saiu.titulo}
          apoio={TEXTOS.saiu.apoio}
          desligada={semPermissao}
          controle={<Switch rotulo={TEXTOS.saiu.titulo} ligado={cena.saiu} indisponivel={semPermissao} aoMudar={(v) => mudar((c) => ({ ...c, saiu: v }))} />}
        />
      </Lista>
      <Lista>
        <NotaDaLista icone="bloqueio">{TEXTOS.sempre}</NotaDaLista>
      </Lista>
    </Estrutura>
  );
}

registrarTela('T11', T11);
