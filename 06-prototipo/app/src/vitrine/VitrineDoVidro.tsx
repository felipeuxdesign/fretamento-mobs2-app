// A vitrine do vidro (?vitrine=vidro): cada uma das 17 peças de vidro, isolada, sobre fundos de verdade.
// Para cada peça: a sólida (a original) ao lado da de vidro, sobre quatro fundos (o mapa com a rota e o ônibus;
// o Início rolado, com o herói e o botão lima; a página lisa; e o pior caso de contraste), nos dois temas.
// Nenhuma peça de vidro entra numa tela antes de estar certa aqui.
import { useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { mock } from '@/dados';
import { mudar, usarEstado, escolherAparencia, temaDe, type Tema } from '@/estado/armazem';
import { LugarDoPorCima } from '@/ds/tela/PorCima';
import { MaterialForcado } from '@/ds/vidro/usarVidro';
import { VIDRO, type PecaDeVidro } from '@/ds/vidro/vidro.config';
import { Topo } from '@/ds/barra/Topo';
import { Barra, Sino, BotaoDeIcone, BotaoDoPerfil } from '@/ds/barra/Barra';
import { Avatar } from '@/ds/avatar/Avatar';
import { Banner } from '@/ds/banner/Banner';
import { Rodape } from '@/ds/rodape/Rodape';
import { Botao, DoisBotoes } from '@/ds/botao/Botao';
import { Chip } from '@/ds/escolha/Escolha';
import { Campo, CampoDeCodigo } from '@/ds/campo/Campo';
import { Sheet } from '@/ds/sheet/Sheet';
import { Toast } from '@/ds/toast/Toast';
import { Switch } from '@/ds/switch/Switch';
import { Segmentado } from '@/ds/segmentado/Segmentado';
import { Heroi } from '@/ds/heroi/Heroi';
import { Cartao, CartaoInterativo, Placa } from '@/ds/cartao/Cartao';
import { Selo, Selos } from '@/ds/selo/Selo';
import { Mapa, pontoNaRota } from '@/ds/mapa/Mapa';
import { OnibusNoMapa } from '@/ds/mapa/Marcadores';
import { ControlesDoMapa, BalaoDoOnibus, PainelDoMapa } from '@/ds/mapa/PecasDoMapa';
import { AlertaDoSistema, PedidoDoFaceID } from '@/sistema/Alerta';
import contraste from './contraste.json';
import './vitrine.css';

const p = mock.paradasDaIda;
const sempre = p.find((x) => x.pontoDeSempre)!;
const semente = mock.sementeDoCaminhoFeliz;
const onibus = `${mock.onibus.placa} · ${mock.onibus.prefixo}`;

type TipoDeFundo = 'mapa' | 'inicio' | 'liso' | 'pior';
const FUNDOS: { id: TipoDeFundo; nome: string }[] = [
  { id: 'mapa', nome: 'o mapa, com a rota e o ônibus' },
  { id: 'inicio', nome: 'o Início rolado' },
  { id: 'liso', nome: 'a página lisa' },
  { id: 'pior', nome: 'o pior caso de contraste' },
];

/** Onde a peça fica no quadro: em cima, embaixo ou no meio. O fundo põe o que importa atrás dela. */
type Lugar = 'cima' | 'baixo' | 'meio';

function Fundo({ tipo, lugar, mexe }: { tipo: TipoDeFundo; lugar: Lugar; mexe: boolean }) {
  if (tipo === 'liso') return null;
  if (tipo === 'mapa' || tipo === 'pior') {
    // o ônibus e a rota exatamente atrás da peça: é o pior ponto do fundo para as peças do mapa
    const fracao = 0.26;
    const { ponto } = pontoNaRota(fracao);
    const alvoY = lugar === 'cima' ? 62 : lugar === 'baixo' ? 250 : 150;
    const camera = { x: 195 - ponto[0] - (tipo === 'pior' ? 0 : 40), y: alvoY - ponto[1] };
    return (
      <div className={clsx('fundo', 'fundo-mapa', mexe && 'mexe')}>
        <Mapa camera={camera} rota={{ corte: ponto, aceso: pontoNaRota(0.33).ponto }}>
          <OnibusNoMapa em={ponto} />
        </Mapa>
      </div>
    );
  }
  // o Início rolado: o herói em chegando (fundo-destaque) e o botão lima passando por baixo
  return (
    <div className={clsx('fundo', 'fundo-inicio', `para-${lugar}`, mexe && 'mexe')}>
      <div className="rola">
        <Heroi forma="destaque" comDivisoria={false} linha={mock.linha.rotulo} viagem={mock.viagens[0].rotulo} alvo={`No seu ponto · ${sempre.nome}`} numero="No ponto" selos={[{ tipo: 'ao-vivo', texto: 'Ao vivo' }]} aoLadoDoSelo="o ônibus está parado aqui">
          <Placa rotulo="Confira o ônibus" placa={onibus} />
          <Botao icone="embarquei">Embarquei</Botao>
        </Heroi>
        <Cartao variante="perigo">
          <Selos>
            <Selo tipo="perigo" icone="cancelada">
              Viagem cancelada
            </Selo>
            <Selo tipo="atraso" icone="atrasado">
              Atrasado 8 min
            </Selo>
          </Selos>
          <Botao>Ver a viagem das {mock.viagens[1].sai}</Botao>
        </Cartao>
        <CartaoInterativo compacto icone="mapa" titulo="Ver no mapa" apoio="Ônibus no seu ponto" />
      </div>
    </div>
  );
}

function Celula({ tema, tipo, lugar, altura, solido, mexe, children, nome }: { tema: Tema; tipo: TipoDeFundo; lugar: Lugar; altura: number; solido?: boolean; mexe: boolean; children: ReactNode; nome: string }) {
  const [porCima, setPorCima] = useState<HTMLElement | null>(null);
  return (
    <figure className="celula">
      <div className="ph quadro" data-tema={tema} data-quadro data-fundo={tipo} data-material-do-quadro={solido ? 'solido' : 'vidro'} style={{ height: altura }}>
        {/* o fundo é conteúdo: fica sempre sólido, e só a peça do quadro é de vidro */}
        <MaterialForcado.Provider value="solido">
          <Fundo tipo={tipo} lugar={lugar} mexe={mexe} />
        </MaterialForcado.Provider>
        <MaterialForcado.Provider value={solido ? 'solido' : null}>
          <LugarDoPorCima.Provider value={porCima}>
            {children}
            <div className="por-cima" ref={setPorCima} />
          </LugarDoPorCima.Provider>
        </MaterialForcado.Provider>
      </div>
      <figcaption>{nome}</figcaption>
    </figure>
  );
}

interface PecaDaVitrine {
  peca: PecaDeVidro;
  nome: string;
  regra: string;
  lugar: Lugar;
  altura: number;
  desenha: () => ReactNode;
}

function Controles({ mexe, setMexe }: { mexe: boolean; setMexe: (v: boolean) => void }) {
  const tema = usarEstado(temaDe);
  const vidro = usarEstado((e) => e.vidro);
  const prefs = usarEstado((e) => e.preferenciasDoVidro);
  const prefsDe = (parte: Partial<typeof prefs>) => mudar((e) => ({ preferenciasDoVidro: { ...e.preferenciasDoVidro, ...parte } }));
  return (
    <div className="controles" role="group" aria-label="Controles da vitrine">
      <label>
        <input type="checkbox" checked={tema === 'claro'} onChange={(ev) => escolherAparencia(ev.target.checked ? 'claro' : 'escuro')} /> tema claro
      </label>
      <label>
        <input type="checkbox" checked={vidro} onChange={(ev) => mudar(() => ({ vidro: ev.target.checked }))} /> vidro ligado
      </label>
      <label>
        qualidade{' '}
        <select value={prefs.qualidade ?? ''} onChange={(ev) => prefsDe({ qualidade: (ev.target.value || null) as typeof prefs.qualidade })}>
          <option value="">a do aparelho</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={prefs.reduzirTransparencia} onChange={(ev) => prefsDe({ reduzirTransparencia: ev.target.checked })} /> reduzir transparência
      </label>
      <label>
        <input type="checkbox" checked={prefs.reduzirMovimento} onChange={(ev) => prefsDe({ reduzirMovimento: ev.target.checked })} /> reduzir movimento
      </label>
      <button type="button" aria-pressed={mexe} onClick={() => setMexe(!mexe)}>
        {mexe ? 'parar o fundo' : 'mexer o fundo'}
      </button>
    </div>
  );
}

function ControlesVivos() {
  const [seg, setSeg] = useState<'email' | 'celular'>('email');
  const [ap, setAp] = useState<'claro' | 'escuro' | 'sistema'>('escuro');
  return (
    <div className="pilha-da-vitrine">
      <Segmentado rotulo="Como entrar" valor={seg} aoMudar={setSeg} opcoes={[{ valor: 'email', rotulo: 'E-mail' }, { valor: 'celular', rotulo: 'Celular' }]} />
      <Segmentado rotulo="Aparência" comIcones valor={ap} aoMudar={setAp} opcoes={[{ valor: 'claro', rotulo: 'Claro', icone: 'claro' }, { valor: 'escuro', rotulo: 'Escuro', icone: 'escuro' }, { valor: 'sistema', rotulo: 'Sistema', icone: 'sistema' }]} />
    </div>
  );
}
function SwitchesVivos() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="fila-da-vitrine">
      <Switch rotulo="Ligado" ligado={a} aoMudar={setA} />
      <Switch rotulo="Desligado" ligado={b} aoMudar={setB} />
      <Switch rotulo="Indisponível" ligado={false} indisponivel />
    </div>
  );
}

const sobre: CSSProperties = { position: 'absolute', left: 0, right: 0 };

const PECAS: PecaDaVitrine[] = [
  {
    peca: 'barra',
    nome: '1 · Barra do topo',
    regra: 'De vidro, a barra não é uma faixa: o conteúdo rola por baixo dela, com a borda de rolagem (um desfoque que some na cor da página, sem linha e sem véu escuro). Quem é vidro são os botões, em esfera. A divisória sai.',
    lugar: 'cima',
    altura: 300,
    desenha: () => (
      <Topo
        barra={
          <Barra variante="home" titulo={`Bom dia, ${mock.pessoa.saudacao}`}>
            <Sino naoLidos={semente.avisosNaoLidos} />
            <BotaoDoPerfil inicial="A">
          <Avatar inicial={mock.pessoa.inicial} />
        </BotaoDoPerfil>
          </Barra>
        }
      />
    ),
  },
  {
    peca: 'botoesDaBarra',
    nome: '2 · Botões da barra',
    regra: 'A esfera de vidro da biblioteca, de 44, com o glifo em cima: o voltar, o sino, o perfil. O contador do sino fica por fora da esfera. Sem hover.',
    lugar: 'cima',
    altura: 300,
    desenha: () => (
      <Topo
        barra={
          <Barra titulo="Paradas da viagem" aoVoltar={() => {}}>
            <BotaoDeIcone daBarra rotulo="Notificações" icone="aviso" tamanho={24} className="apertado" />
          </Barra>
        }
      />
    ),
  },
  {
    peca: 'barraDoMapa',
    nome: '3 · Barra flutuante do mapa',
    regra: 'Sobre o mapa, tudo o que flutua é vidro: o voltar numa esfera e o título numa cápsula, da mesma altura. O texto precisa passar no contraste com a rota roxa e o disco lima exatamente atrás.',
    lugar: 'cima',
    altura: 300,
    desenha: () => <Topo peca="barraDoMapa" barra={<Barra titulo="Linha 210 · Ida de sempre" aoVoltar={() => {}} />} />,
  },
  {
    peca: 'controlesDoMapa',
    nome: '4 · Grupo de controles do mapa',
    regra: 'Vidro pequeno, com lente: um vidro só para o grupo. As divisórias viram vidro-separador; a borda de 1 px sai e entra o fio de luz.',
    lugar: 'meio',
    altura: 300,
    desenha: () => (
      <ControlesDoMapa
        style={{ top: 72, right: 171 }}
        controles={[
          { id: 'onibus', rotulo: 'Seguir ônibus', icone: 'onibus', ligado: true },
          { id: 'ponto', rotulo: 'Meu ponto', icone: 'pessoa' },
          { id: 'eu', rotulo: 'Minha localização', icone: 'minha-posicao', desligado: true },
        ]}
      />
    ),
  },
  {
    peca: 'balaoDoOnibus',
    nome: '5 · Balão do ônibus',
    regra: 'Vidro pequeno, sem a borda de 1 px. Duas linhas: o prefixo e a placa; a idade do dado.',
    lugar: 'meio',
    altura: 300,
    desenha: () => <BalaoDoOnibus style={{ left: 195, top: 150 }} titulo={`Ônibus ${mock.onibus.prefixo} · ${mock.onibus.placa}`} apoio="Ao vivo · posição há 12 s" />,
  },
  {
    peca: 'painelDoMapa',
    nome: '6 · Painel do mapa',
    regra: 'A mesma placa de vidro da folha da biblioteca, solta das bordas, com o canto de 40 e a alça dela, acima do indicador de início. Sem véu. As três alturas e o não fechar são nossos. O herói compacto e os selos pousam direto no vidro.',
    lugar: 'baixo',
    altura: 320,
    desenha: () => (
      <PainelDoMapa alturas={{ recolhido: 172, meio: 240, inteiro: 300 }} altura="recolhido">
        <div className="mhero">
          <p className="t13b">Passa no seu ponto · {sempre.nome}</p>
          <div className="h-linha">
            <span className="big">{semente.minutosAteOSeuPonto} min</span>
            <span className="comp">às {sempre.programado}</span>
          </div>
          <Selos>
            <Selo tipo="ao-vivo">Ao vivo</Selo>
            <Selo tipo="neutro" icone="no-horario">
              No horário
            </Selo>
          </Selos>
        </div>
      </PainelDoMapa>
    ),
  },
  {
    peca: 'sheet',
    nome: '7 · Sheet',
    regra: 'A folha da biblioteca, como ela é: solta das bordas, com o canto de 40, a lente na borda, a alça com mola e o X, só encaixada na tela do aparelho. O véu fica mais leve que o scrim. Os botões de dentro são os mesmos de fora.',
    lugar: 'baixo',
    altura: 420,
    desenha: () => (
      <Sheet titulo={<>Embarcar na {p[2].nome} hoje?</>}>
        <p>
          O ônibus passa lá às <b className="forte">{p[2].programado}</b>, 11 min antes do seu ponto de sempre. A transportadora vai saber que você embarca neste ponto hoje.
        </p>
        <DoisBotoes>
          <Botao variante="secundario">Cancelar</Botao>
          <Botao>Confirmar</Botao>
        </DoisBotoes>
      </Sheet>
    ),
  },
  {
    peca: 'banner',
    nome: '8 · Banner fixo',
    regra: 'Vidro médio, flutuando logo abaixo da barra, solto das bordas, com o canto redondo. O ícone e o tom dizem o nível; a faixa da esquerda sai.',
    lugar: 'cima',
    altura: 320,
    desenha: () => (
      <Topo
        barra={<Barra titulo="Paradas da viagem" aoVoltar={() => {}} />}
        banners={
          <>
            <Banner nivel="atencao" icone="desvio">
              O ônibus saiu do trajeto previsto. A previsão pode mudar.
            </Banner>
            <Banner icone="onibus-trocado" aoFechar={() => {}}>
              Ônibus trocado. Hoje é o {mock.onibusTrocado.prefixo} · {mock.onibusTrocado.placa}.
            </Banner>
          </>
        }
      />
    ),
  },
  {
    peca: 'rodape',
    nome: '9 · Rodapé fixo',
    regra: 'De vidro, o rodapé não é uma faixa: o botão flutua sobre o fim da rolagem, e a borda de rolagem segura a legenda. Quem é vidro é o botão.',
    lugar: 'baixo',
    altura: 300,
    desenha: () => (
      <div style={{ ...sobre, bottom: 0 }}>
        <Rodape legenda={`${p[2].nome} · passa às ${p[2].programado}, em 7 min`}>
          <Botao>Embarcar neste ponto</Botao>
        </Rodape>
      </div>
    ),
  },
  {
    peca: 'toast',
    nome: '10 · Toast',
    regra: 'Vidro médio em pílula, embaixo, dentro do aparelho. No vidro, usa o vidro do tema com a tinta. Nunca carrega erro.',
    lugar: 'baixo',
    altura: 300,
    desenha: () => <Toast parado>Pronto. Hoje você embarca na {p[2].nome}.</Toast>,
  },
  {
    peca: 'sistema',
    nome: '11 · O que o celular desenha',
    regra: 'Vidro grande, nas cores do sistema: branco e sistema-azul. Nenhum lima, nenhum roxo.',
    lugar: 'meio',
    altura: 580,
    desenha: () => (
      <>
        <AlertaDoSistema titulo="“Mobs2 Fretamento” Deseja Enviar Notificações" lado botoes={[{ rotulo: 'Não Permitir' }, { rotulo: 'Permitir', forte: true }]}>
          As notificações podem incluir alertas, sons e indicadores no ícone. Elas podem ser configuradas em Ajustes.
        </AlertaDoSistema>
        <PedidoDoFaceID comVeu={false} botoes={[{ rotulo: 'Cancelar' }]}>
          Confirme que é você para abrir o app.
        </PedidoDoFaceID>
      </>
    ),
  },
  {
    peca: 'switch',
    nome: '12 · Switch',
    regra: 'O switch da biblioteca, como ela desenha, nas nossas medidas. A bolinha vira vidro debaixo do dedo: cresce um pouco, vira lente e assenta ao soltar. Ligado é vivo, nunca o azul da biblioteca.',
    lugar: 'meio',
    altura: 200,
    desenha: () => (
      <div style={{ ...sobre, top: 60, padding: '0 16px' }}>
        <Cartao>
          <SwitchesVivos />
        </Cartao>
      </div>
    ),
  },
  {
    peca: 'segmentado',
    nome: '13 · Segmentado',
    regra: 'O segmentado da biblioteca, como ela desenha: o trilho de vidro em cápsula e a gota que desliza, com as cores dela. Aqui só entram a altura de cada opção e a letra.',
    lugar: 'meio',
    altura: 220,
    desenha: () => (
      <div style={{ ...sobre, top: 40, padding: '0 16px' }}>
        <ControlesVivos />
      </div>
    ),
  },
  {
    peca: 'botoes',
    nome: '14 · Botões',
    regra: 'O botão de vidro da biblioteca, na cápsula que ela propõe, com 48 de altura. O primário é o vidro tingido de vivo, um só em todo o app, na cor exata do token; o destrutivo, de perigo-forte; o secundário e o chip, vidro claro. Flutuam sobre a borda de rolagem do rodapé ou moram num cartão ou num sheet. Carregando, o botão fica como está, com o anel de espera da biblioteca antes do texto.',
    lugar: 'baixo',
    altura: 300,
    desenha: () => (
      <div style={{ ...sobre, bottom: 0 }}>
        <Rodape>
          <Chip icone="localizacao">Perto de mim</Chip>
          <DoisBotoes>
            <Botao variante="secundario">Cancelar</Botao>
            <Botao variante="destrutivo">Excluir</Botao>
          </DoisBotoes>
          <Botao icone="embarquei">Embarquei</Botao>
        </Rodape>
      </div>
    ),
  },
  {
    peca: 'campos',
    nome: '15 · Campos',
    regra: 'O campo e a área de texto da biblioteca, com o canto e as cores que ela propõe, nas nossas medidas: 48 de altura e texto de 15; o código em 24, peso 700.',
    lugar: 'meio',
    altura: 300,
    desenha: () => (
      <div style={{ ...sobre, top: 56, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Campo tipo="email" rotulo="E-mail" dica="nome@empresa.com.br" valor={mock.pessoa.email} />
        <CampoDeCodigo rotulo="Código" valor="1234" />
      </div>
    ),
  },
  {
    peca: 'conteudo',
    nome: '17 · Conteúdo',
    regra: 'Os cartões e as listas são o painel de vidro da biblioteca, sobre o fundo de luz da tela. O tom do vidro é o do cartão, firme, para o texto de apoio ler. Mora sobre o fundo de luz, nunca sobre o mapa nem sobre outro conteúdo.',
    lugar: 'meio',
    altura: 300,
    desenha: () => (
      <div style={{ ...sobre, top: 96, padding: '0 16px' }}>
        <Cartao>
          <p className="t13b">Passa no seu ponto · Av. Abdias de Carvalho, 1200</p>
          <p className="t13">Ida de sempre · ônibus 1234 · ABC1D23</p>
        </Cartao>
      </div>
    ),
  },
  {
    peca: 'selos',
    nome: '16 · Selos',
    regra: 'O selo da biblioteca, em pílula, com o fio de luz na borda. A cor de cada estado é a nossa, e a palavra e o ícone continuam dizendo o estado.',
    lugar: 'meio',
    altura: 300,
    desenha: () => (
      <div style={{ ...sobre, top: 96, padding: '0 16px' }}>
        <Cartao>
        <Selos>
          <Selo tipo="ao-vivo">Ao vivo</Selo>
          <Selo tipo="neutro" icone="no-horario">
            No horário
          </Selo>
          <Selo tipo="atraso" icone="atrasado">
            Atrasado 8 min
          </Selo>
          <Selo tipo="sem-sinal" icone="sem-sinal">
            Sem sinal
          </Selo>
        </Selos>
        </Cartao>
      </div>
    ),
  },
];

const medidas = contraste as Record<string, { escuro?: number; claro?: number; onde?: string }>;

export function VitrineDoVidro() {
  const [mexe, setMexe] = useState(false);
  // o tema do vidro mora na raiz da página (a ponte): a vitrine mostra um tema por vez, o do interruptor de cima
  const temaDaPonte = usarEstado(temaDe);
  return (
    <div className="vitrine vitrine-do-vidro" data-vitrine="vidro">
      <header>
        <h1>O vidro, peça por peça</h1>
        <p>As 17 peças de vidro, isoladas, sobre fundos de verdade: a sólida ao lado da de vidro, sobre quatro fundos, no tema do interruptor (escuro ou claro). O contraste do texto é medido no pior fundo de cada peça. O vidro se julga em movimento: use "mexer o fundo".</p>
        <Controles mexe={mexe} setMexe={setMexe} />
      </header>
      {PECAS.map((pc) => (
        <section className="folha" key={pc.peca} data-peca-da-vitrine={pc.peca}>
          <header>
            <h2>
              {pc.nome} {VIDRO[pc.peca] ? '' : '· sólida no vidro.config.ts'}
            </h2>
            <p>{pc.regra}</p>
            <p className="medida">
              {medidas[pc.peca]?.escuro
                ? `Contraste do texto no pior fundo: ${String(medidas[pc.peca].escuro).replace('.', ',')}:1 no escuro · ${String(medidas[pc.peca].claro).replace('.', ',')}:1 no claro · ${medidas[pc.peca].onde}`
                : 'Sem texto sobre o vidro: o que se confere aqui é o contorno e o estado do controle.'}
            </p>
          </header>
          {([temaDaPonte] as const).map((tema) => (
            <div className="linha-de-quadros" key={tema}>
              <Celula tema={tema} tipo="mapa" lugar={pc.lugar} altura={pc.altura} solido mexe={mexe} nome={`${tema} · sólida, sobre o mapa`}>
                {pc.desenha()}
              </Celula>
              {FUNDOS.map((f) => (
                <Celula key={f.id} tema={tema} tipo={f.id} lugar={pc.lugar} altura={pc.altura} mexe={mexe} nome={`${tema} · de vidro, sobre ${f.nome}`}>
                  {pc.desenha()}
                </Celula>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
