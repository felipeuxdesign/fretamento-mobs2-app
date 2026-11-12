// T10 · Perfil. O centro de tudo o que é da pessoa e não da viagem. Nada aqui se edita no app: o que é da
// empresa muda no cadastro, e o app só mostra. O "Preciso de ajuda" mora aqui, como momento.
import { useCallback, useState } from 'react';
import { mock } from '@/dados';
import { irPara, usarEstado, voltar, escolherAparencia, type Aparencia } from '@/estado/armazem';
import { usarCena, porCena } from '@/estado/cena';
import { Estrutura } from '@/ds/tela/Estrutura';
import { Avatar, iniciaisDe } from '@/ds/avatar/Avatar';
import { Barra } from '@/ds/barra/Barra';
import { Banner } from '@/ds/banner/Banner';
import { Botao, DoisBotoes } from '@/ds/botao/Botao';
import { AssinaturaDoPe } from '@/ds/cabecalho/Cabecalho';
import { CartaoDeAjuda } from '@/ds/cartao/Cartao';
import { Lista, Linha, NotaDaLista, TituloDeSecao } from '@/ds/lista/Lista';
import { Segmentado } from '@/ds/segmentado/Segmentado';
import { Sheet } from '@/ds/sheet/Sheet';
import { Toast } from '@/ds/toast/Toast';
import { registrarTela, type PropsDaTela } from '@/telas/registro';
import { sair } from '@/telas/comum/sessao';
import type { CenaT11 } from '@/telas/T11-avisos/cenas';
import { CENAS, DO_FLUXO, TEXTOS, type CenaT10 } from './cenas';

/** De qualquer tela (o Início, a viagem cancelada): abre o Perfil já no "Preciso de ajuda". */
export function abrirAjuda(): void {
  porCena<CenaT10>('T10', { ajuda: true });
  irPara('T10');
}

function Ajuda({ cena, aoVoltar, parado }: { cena: CenaT10; aoVoltar: () => void; parado: boolean }) {
  const a = TEXTOS.ajuda;
  // o WhatsApp e a ligação são do celular: o protótipo não sai dele, e diz isso num toast, sem fingir que abriu
  const [fora, setFora] = useState<string | null>(null);
  const some = useCallback(() => setFora(null), []);
  const quem = cena.semTransportadora ? [a.rh] : [a.rh, a.transportadora];
  return (
    <Estrutura key="ajuda" barra={<Barra titulo={a.titulo} aoVoltar={aoVoltar} />}>
      <p className="t13 solto">{a.abre}</p>
      {quem.map((q) => (
        <CartaoDeAjuda key={q.icone} icone={q.icone} titulo={q.titulo} resolve={q.resolve} linhas={q.linhas}>
          <DoisBotoes comRespiro>
            <Botao variante="secundario" icone="whatsapp" onClick={() => setFora(a.fora[0])}>
              {a.acoes[0]}
            </Botao>
            <Botao variante="secundario" icone="ligar" onClick={() => setFora(a.fora[1])}>
              {a.acoes[1]}
            </Botao>
          </DoisBotoes>
        </CartaoDeAjuda>
      ))}
      <TituloDeSecao>{a.perguntas.titulo}</TituloDeSecao>
      {/* as perguntas já trazem a resposta na própria linha: são leitura, e não levam a lugar nenhum */}
      <Lista>
        {a.perguntas.itens(!cena.semTransportadora).map((p) => (
          <Linha key={p.titulo} icone={p.icone} titulo={p.titulo} apoio={p.apoio} />
        ))}
      </Lista>
      <AssinaturaDoPe />
      {fora && !parado && <Toast aoSumir={some}>{fora}</Toast>}
    </Estrutura>
  );
}

function T10({ parado }: PropsDaTela) {
  const [cena, mudar] = usarCena<CenaT10>('T10', CENAS, DO_FLUXO, parado);
  const aparencia = usarEstado((e) => e.aparencia);
  const avisos = usarEstado((e) => (parado ? undefined : (e.cenas.T11 as CenaT11 | undefined)));
  const t = TEXTOS;

  if (cena.ajuda) {
    // o voltar do "Preciso de ajuda" volta para o Perfil; quem veio de outra tela, volta para ela
    const veioDoPerfil = !parado && cena.noFim !== undefined;
    return <Ajuda cena={cena} parado={!!parado} aoVoltar={() => (veioDoPerfil ? mudar((c) => ({ ...c, ajuda: false })) : (mudar(DO_FLUXO), voltar('T05')))} />;
  }

  return (
    <Estrutura
      key="perfil"
      barra={<Barra titulo={t.titulo} aoVoltar={() => voltar('T05')} />}
      banners={cena.semInternet ? <Banner icone="sem-internet">{t.semInternet}</Banner> : undefined}
      noFim={cena.noFim}
    >
      <div className="pfh">
        <Avatar inicial={mock.pessoa.inicial} iniciais={iniciaisDe(mock.pessoa.nome)} tamanho={72} />
        <h2>{mock.pessoa.nome}</h2>
        <p>{t.cabecalho.empresa}</p>
        <p>{t.cabecalho.nota}</p>
      </div>
      <TituloDeSecao>{t.conta.titulo}</TituloDeSecao>
      <Lista>
        {t.conta.linhas.map((l) => (
          <Linha key={l.rotulo} icone={l.icone} invertida titulo={l.valor} apoio={l.rotulo} />
        ))}
      </Lista>
      <TituloDeSecao>{t.linhas.titulo}</TituloDeSecao>
      <Lista>
        {t.linhas.itens.map((l) => (
          <Linha key={l.titulo} icone="linha" titulo={l.titulo} apoio={l.apoio} />
        ))}
        <NotaDaLista>{t.linhas.nota}</NotaDaLista>
      </Lista>
      <TituloDeSecao>{t.ajustes.titulo}</TituloDeSecao>
      <Lista>
        <Linha icone="sino" titulo={t.ajustes.avisos.titulo} apoio={avisos ? (avisos.chegando ? `Ônibus chegando: ${avisos.minutos} min antes` : 'Ônibus chegando: desligado') : t.ajustes.avisos.apoio} seta aoTocar={() => irPara('T11')} />
        <Linha icone="privacidade" titulo={t.ajustes.privacidade.titulo} apoio={t.ajustes.privacidade.apoio} seta aoTocar={() => irPara('T12')} />
        <Linha titulo={t.ajustes.aparencia} emColuna="esticada">
          <Segmentado<Aparencia>
            rotulo={t.ajustes.aparencia}
            comIcones
            opcoes={[
              { valor: 'claro', rotulo: 'Claro', icone: 'claro' },
              { valor: 'escuro', rotulo: 'Escuro', icone: 'escuro' },
              { valor: 'sistema', rotulo: 'Sistema', icone: 'sistema' },
            ]}
            valor={aparencia}
            aoMudar={escolherAparencia}
          />
        </Linha>
        <Linha icone="ajuda" titulo={t.ajustes.ajuda.titulo} apoio={t.ajustes.ajuda.apoio} seta aoTocar={() => mudar((c) => ({ ...c, ajuda: true, noFim: !!c.noFim }))} />
      </Lista>
      <Lista>
        <Linha icone="sair" titulo={t.sair} perigo desligada={cena.semInternet} aoTocar={() => mudar((c) => ({ ...c, saindo: true }))} />
        <Linha icone="excluir" titulo={t.excluir} perigo desligada={cena.semInternet} aoTocar={() => irPara('T13')} />
      </Lista>
      <AssinaturaDoPe />
      {cena.saindo && (
        <Sheet titulo={t.saindo.titulo} aoFechar={parado ? undefined : () => mudar((c) => ({ ...c, saindo: false }))}>
          <p>{t.saindo.texto}</p>
          <div className="pilha-de-botoes">
            <Botao variante="destrutivo" onClick={sair}>
              {t.saindo.confirma}
            </Botao>
            <Botao variante="secundario" onClick={() => mudar((c) => ({ ...c, saindo: false }))}>
              {t.saindo.desiste}
            </Botao>
          </div>
        </Sheet>
      )}
    </Estrutura>
  );
}

registrarTela('T10', T10);
