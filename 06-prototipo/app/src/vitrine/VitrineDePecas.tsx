// A vitrine das peças (?vitrine=pecas): cada peça do design system, com os estados dela, nos dois temas.
// Os exemplos usam o mock: a Ana, a Linha 210, o ônibus 1234.
import { useState } from 'react';
import { mock, somar } from '@/dados';
import { Barra, Sino, BotaoDeIcone } from '@/ds/barra/Barra';
import { Avatar } from '@/ds/avatar/Avatar';
import { Botao, BotaoLink, DoisBotoes } from '@/ds/botao/Botao';
import { Rodape } from '@/ds/rodape/Rodape';
import { Banner } from '@/ds/banner/Banner';
import { Cartao, CartaoInterativo, CartaoDeContato, Divisoria, Opcao, Placa } from '@/ds/cartao/Cartao';
import { Nota } from '@/ds/nota/Nota';
import { Selo, Selos, ChipDePapel } from '@/ds/selo/Selo';
import { Trilho, type LinhaDoTrilho } from '@/ds/trilho/Trilho';
import { EstadoCentral, AcoesCentrais, Vazio, Osso } from '@/ds/central/Central';
import { Lista, Linha, NotaDaLista, ItemSelecionavel, GrupoRecolhido, LinhaDeAviso, TituloDeSecao } from '@/ds/lista/Lista';
import { Chip, Chips } from '@/ds/escolha/Escolha';
import { Switch } from '@/ds/switch/Switch';
import { Segmentado } from '@/ds/segmentado/Segmentado';
import { Campo, CampoDeCodigo, AreaDeTexto } from '@/ds/campo/Campo';
import { Sheet } from '@/ds/sheet/Sheet';
import { Toast } from '@/ds/toast/Toast';
import { Heroi } from '@/ds/heroi/Heroi';
import { CabecalhoDeEntrada, PeDoEntrar, AssinaturaDoPe } from '@/ds/cabecalho/Cabecalho';
import { Icone, NOMES_DOS_ICONES } from '@/ds/icone/Icone';
import { Teclado } from '@/sistema/Teclado';
import { AlertaDoSistema, PedidoDoFaceID } from '@/sistema/Alerta';
import { BarraDeStatus } from '@/sistema/BarraDeStatus';
import { Folha, Peca } from './Quadro';
import './vitrine.css';

const p = mock.paradasDaIda;
const sempre = p.find((x) => x.pontoDeSempre)!;
const ida = mock.viagens[0];
const onibus = `${mock.onibus.placa} · ${mock.onibus.prefixo}`;
const viagem = `${ida.rotulo} · ônibus ${mock.onibus.prefixo} · ${mock.onibus.placa}`;
const semente = mock.sementeDoCaminhoFeliz;
const pessoas = (n: number) => (n < 2 ? 'Até 1 pessoa embarca aqui' : `${n} pessoas embarcam aqui`);

// o trilho da semente: o ônibus entre o Mercado de Casa Amarela e a Av. Norte
const trilho: LinhaDoTrilho[] = [
  { tipo: 'parada', id: p[0].id, nome: p[0].nome, icone: 'terminal', cheia: true, passada: true, hora: p[0].programado, sobAHora: 'passou', cima: null, baixo: 'passado' },
  { tipo: 'parada', id: p[1].id, nome: p[1].nome, icone: 'comercio', passada: true, hora: p[1].programado, sobAHora: 'passou', cima: 'passado', baixo: 'passado' },
  { tipo: 'onibus', texto: `Indo para a ${p[2].nome}`, cima: 'passado', baixo: 'ida' },
  { tipo: 'parada', id: p[2].id, nome: p[2].nome, icone: 'ponto', apoio: pessoas(p[2].previstos!), hora: p[2].programado, cima: 'ida', baixo: 'ida' },
  { tipo: 'grupo', texto: '2 outras paradas' },
  { tipo: 'parada', id: sempre.id, nome: sempre.nome, icone: 'pessoa', minha: true, forte: true, papeis: [{ texto: 'Seu ponto' }], apoio: pessoas(sempre.previstos!), hora: sempre.programado, sobAHora: `${semente.minutosAteOSeuPonto} min`, cima: 'ida', baixo: 'ida' },
  { tipo: 'parada', id: p[6].id, nome: p[6].nome, icone: 'ponto', apoio: pessoas(p[6].previstos!), hora: p[6].programado, cima: 'ida', baixo: 'ida' },
  { tipo: 'parada', id: p[8].id, nome: p[8].nome, icone: 'fabrica', cheia: true, papeis: [{ texto: 'Destino' }], hora: p[8].programado, cima: 'ida', baixo: null },
];

function Controles() {
  const [seg, setSeg] = useState<'email' | 'celular'>('email');
  const [ap, setAp] = useState<'claro' | 'escuro' | 'sistema'>('escuro');
  const [sw, setSw] = useState(true);
  const [min, setMin] = useState(mock.pessoa.avisoDeChegadaMin);
  return (
    <>
      <Segmentado rotulo="Como entrar" valor={seg} aoMudar={setSeg} opcoes={[{ valor: 'email', rotulo: 'E-mail' }, { valor: 'celular', rotulo: 'Celular' }]} />
      <Segmentado rotulo="Aparência" comIcones valor={ap} aoMudar={setAp} opcoes={[{ valor: 'claro', rotulo: 'Claro', icone: 'claro' }, { valor: 'escuro', rotulo: 'Escuro', icone: 'escuro' }, { valor: 'sistema', rotulo: 'Sistema', icone: 'sistema' }]} />
      <div className="fila">
        <Switch rotulo="Ligado" ligado={sw} aoMudar={setSw} />
        <Switch rotulo="Desligado" ligado={!sw} aoMudar={(v) => setSw(!v)} />
        <Switch rotulo="Indisponível" ligado={false} indisponivel />
      </div>
      <Chips rotulo="Avisar quando faltar">
        {[5, 10, 15].map((n) => (
          <Chip key={n} comoRadio ligado={min === n} aoTocar={() => setMin(n)}>
            {n} min
          </Chip>
        ))}
      </Chips>
      <div className="fila">
        <Chip icone="localizacao">Perto de mim</Chip>
        <Chip icone="localizacao" ligado>
          Perto de mim · do mais perto ao mais longe
        </Chip>
      </div>
    </>
  );
}

export function VitrineDePecas() {
  return (
    <div className="vitrine" data-vitrine="pecas">
      <header>
        <h1>As peças</h1>
        <p>Cada peça do design system, uma vez, com os estados dela, no escuro e no claro. As medidas vêm das referências; as cores, dos tokens. Com o vidro ligado, as peças são as de vidro, sobre o fundo de luz; com `?vidro=0`, são as sólidas, iguais às folhas F02 a F07 desenhadas.</p>
      </header>

      <Folha titulo="F02 · Chrome" regra="Barras, rodapé, folhas, diálogos, toast e o que o celular desenha.">
        <Peca nome="Barra de status e barra superior · home">
          <BarraDeStatus fundo="cartao" />
          <Barra variante="home" titulo={`Bom dia, ${mock.pessoa.saudacao}`}>
            <Sino naoLidos={semente.avisosNaoLidos} />
            <BotaoDeIcone rotulo="Perfil">
              <Avatar inicial={mock.pessoa.inicial} />
            </BotaoDeIcone>
          </Barra>
        </Peca>
        <Peca nome="Barra superior · interna, com ação">
          <Barra titulo="Notificações" aoVoltar={() => {}}>
            <BotaoLink className="da-barra">Marcar todas como lidas</BotaoLink>
          </Barra>
        </Peca>
        <Peca nome="Barra superior · só o título, e só o voltar">
          <Barra variante="so-titulo" titulo="Preparar o app" />
          <Barra variante="nua" aoVoltar={() => {}} />
        </Peca>
        <Peca nome="Banner fixo · três jeitos, e a pilha de dois">
          <Banner icone="sem-internet">Sem internet. Mostrando dados de {mock.relogio.hora}.</Banner>
          <Banner nivel="atencao" icone="cracha" acoes={[{ rotulo: 'Fui eu' }, { rotulo: 'Não fui eu' }]}>
            Seu crachá foi lido às {mock.relogio.hora} no ônibus {mock.onibusTrocado.prefixo}.
          </Banner>
          <Banner icone="onibus-trocado" aoFechar={() => {}}>
            Ônibus trocado. Hoje é o {mock.onibusTrocado.prefixo} · {mock.onibusTrocado.placa}.
          </Banner>
          <Banner largo icone="sem-internet">
            Sem internet. Conecte-se para receber o código.
          </Banner>
        </Peca>
        <Peca nome="Rodapé fixo · com legenda">
          <Rodape legenda="Ao começar, você aceita os Termos de uso.">
            <Botao>Começar</Botao>
          </Rodape>
        </Peca>
        <Peca nome="Sheet de confirmação" altura={360}>
          <Sheet titulo={<>Embarcar na {p[2].nome} hoje?</>}>
            <p>
              O ônibus passa lá às <b className="forte">{p[2].programado}</b>, {semente.minutosAteOSeuPonto - 7} min antes do seu ponto de sempre. A transportadora vai saber que você embarca neste ponto hoje.
            </p>
            <DoisBotoes>
              <Botao variante="secundario">Cancelar</Botao>
              <Botao>Confirmar</Botao>
            </DoisBotoes>
          </Sheet>
        </Peca>
        <Peca nome="Sheet com erro no lugar, e destrutivo" altura={360}>
          <Sheet titulo="Sair da conta?">
            <p>Para entrar de novo, você vai receber um novo código.</p>
            <Nota tipo="erro-do-sheet">Não foi possível confirmar. Nada mudou. Tente de novo.</Nota>
            <Botao variante="destrutivo">Sair</Botao>
            <Botao variante="secundario">Cancelar</Botao>
          </Sheet>
        </Peca>
        <Peca nome="Toast" altura={120}>
          <Toast parado>Pronto. Hoje você embarca na {p[2].nome}.</Toast>
        </Peca>
        <Peca nome="Alerta do sistema" altura={300}>
          <AlertaDoSistema titulo="“Mobs2 Fretamento” Deseja Enviar Notificações" lado botoes={[{ rotulo: 'Não Permitir' }, { rotulo: 'Permitir', forte: true }]}>
            As notificações podem incluir alertas, sons e indicadores no ícone. Elas podem ser configuradas em Ajustes.
          </AlertaDoSistema>
        </Peca>
        <Peca nome="Folha da biometria" altura={300}>
          <PedidoDoFaceID botoes={[{ rotulo: 'Usar a senha do celular' }, { rotulo: 'Cancelar' }]}>
            Confirme que é você para abrir o app.
          </PedidoDoFaceID>
        </Peca>
        <Peca nome="Teclado do sistema · e-mail" altura={291}>
          <Teclado tipo="letras" />
        </Peca>
        <Peca nome="Teclado do sistema · numérico" altura={291}>
          <Teclado tipo="numeros" />
        </Peca>
      </Folha>

      <Folha titulo="F04 · Cartões" regra="O cartão é a unidade da tela; a linha é a unidade do cartão.">
        <Peca nome="Cartão, destaque e perigo" soltos>
          <Cartao>
            <h3 className="t17">{mock.linha.rotulo}</h3>
            <Divisoria />
            <p className="t13">Cartão: fundo-cartao, raio 16, respiro 16.</p>
          </Cartao>
          <Cartao variante="destaque" espaco={8}>
            <p className="t15">
              Hoje você embarca em: <b className="forte">{p[2].nome}</b>
            </p>
            <p className="t13">Seu ponto de sempre continua {sempre.nome}.</p>
            <BotaoLink>Voltar ao ponto de sempre</BotaoLink>
          </Cartao>
          <Cartao variante="perigo">
            <p className="t15">Viagem cancelada pela transportadora.</p>
          </Cartao>
          <Placa rotulo="Confira o ônibus" placa={onibus} />
        </Peca>
        <Peca nome="Cartão interativo · com poço e seta" soltos>
          <CartaoInterativo compacto icone="mapa" titulo="Ver no mapa" apoio="Ônibus a 2 pontos do seu" />
          <CartaoInterativo compacto icone="trocar-ponto" titulo="Outro ponto hoje" apoio="Só hoje" />
          <CartaoInterativo icone="onibus" cor="volta" seta titulo={`Sua volta hoje · ${mock.viagens[2].sai}`} apoio={`Sai da ${mock.viagens[2].embarque} · programado`} />
          <CartaoInterativo icone="onibus" cor="tinta" seta desligado titulo={`Outra ida hoje · ${mock.viagens[1].sai}`} apoio={`Passa no seu ponto às ${mock.viagens[1].passaNoSeuPonto}`} />
          <CartaoDeContato icone="marca-whatsapp" titulo={`RH · ${mock.empresa.nome}`} apoio={`${mock.empresa.rh.canal} ${mock.empresa.rh.numero} · ${mock.empresa.rh.horario}`} />
        </Peca>
        <Peca nome="Linha de lista · divisória menos na última" soltos>
          <Lista>
            <Linha icone="aviso-tocando" titulo="Ônibus chegando" apoio="Um aviso antes de o ônibus passar no seu ponto" controle={<Switch rotulo="Ônibus chegando" ligado />} />
            <Linha icone="documento" titulo="Aviso de privacidade" seta aoTocar={() => {}} />
            <Linha icone="email" titulo={mock.pessoa.email} apoio="E-mail" invertida />
            <Linha icone="sair" titulo="Sair da conta" perigo aoTocar={() => {}} />
          </Lista>
          <Lista>
            <NotaDaLista icone="bloqueio">Atrasos, trocas, cancelamentos e comunicados são sempre avisados.</NotaDaLista>
          </Lista>
        </Peca>
        <Peca nome="Linha de notificação · o disco na cor do estado" soltos>
          <TituloDeSecao>Hoje</TituloDeSecao>
          <Lista>
            <LinhaDeAviso tom="ok" icone="aviso-tocando" titulo="Seu ônibus chega em 10 min" texto={`${sempre.nome} · ônibus ${mock.onibus.prefixo} (${mock.onibus.placa})`} hora="06:32" lida={false} />
            <LinhaDeAviso tom="in" icone="info" titulo="Comunicado da transportadora" texto={mock.notificacoes[1].texto} hora={mock.notificacoes[1].hora} lida={false} />
            <LinhaDeAviso tom="wa" icone="atrasado" titulo={mock.notificacoes[4].titulo} texto={mock.notificacoes[4].texto} hora={mock.notificacoes[4].hora} lida />
            <LinhaDeAviso tom="dg" icone="cancelada" titulo={mock.notificacoes[6].titulo} texto={mock.notificacoes[6].texto} hora={mock.notificacoes[6].hora} lida />
            <LinhaDeAviso tom="neutro" icone="cadastro" titulo={mock.notificacoes[5].titulo} texto={mock.notificacoes[5].texto} hora={mock.notificacoes[5].hora} lida />
          </Lista>
        </Peca>
        <Peca nome="Estado central · ícone de 48, título, frase e um botão" altura={420}>
          <EstadoCentral variante="bloqueio" icone="desbloquear" titulo="Confirme que é você">
            <p>Use o Face ID ou a senha do celular para abrir o app.</p>
            <AcoesCentrais>
              <Botao>Desbloquear</Botao>
              <BotaoLink alinhar="centro">Entrar com código</BotaoLink>
            </AcoesCentrais>
          </EstadoCentral>
        </Peca>
        <Peca nome="Vazio e erro ao abrir" soltos>
          <Vazio icone="sem-viagem" titulo="Sem viagem hoje">
            <p>Sua próxima viagem é segunda, 02/11, às&nbsp;06:05.</p>
          </Vazio>
          <Vazio icone="erro" titulo="Não conseguimos carregar sua viagem">
            <p>Parece que a internet caiu. Confira o sinal e tente de novo.</p>
          </Vazio>
        </Peca>
        <Peca nome="Nota, erro no lugar e aviso no lugar" soltos>
          <Nota tipo="info">Esta não é a sua viagem. Sua ida de sempre é a das {ida.sai}.</Nota>
          <Nota tipo="confirma">Você embarcou às {somar(sempre.programado!, 2)}.</Nota>
          <Nota tipo="erro">O celular não reconheceu você. Tente de novo, ou use a senha do celular.</Nota>
          <Nota tipo="erro-liso">Código incorreto. Você tem mais 4 tentativas.</Nota>
          <Nota tipo="aviso">O celular travou a digital depois de várias tentativas.</Nota>
          <Nota tipo="aviso-do-pedido">Apagar o cadastro encerra seu acesso ao app e ao fretado.</Nota>
        </Peca>
        <Peca nome="Skeleton" soltos>
          <Cartao>
            <Osso altura={20} largura={228} />
            <Osso altura={14} largura={147} />
            <Osso altura={56} largura={179} forte style={{ marginTop: 8 }} />
            <Osso altura={14} largura={196} />
          </Cartao>
        </Peca>
      </Folha>

      <Folha titulo="F05 · Instrumentos" regra="O que diz se o número é real, e onde o ônibus está.">
        <Peca nome="Selos de confiança e de pontualidade" soltos>
          <Cartao>
            <Selos>
              <Selo tipo="ao-vivo">Ao vivo</Selo>
              <Selo tipo="neutro" icone="no-horario">
                No horário
              </Selo>
              <Selo tipo="atraso" icone="atrasado">
                Atrasado 8 min
              </Selo>
              <Selo tipo="neutro" icone="adiantado">
                Adiantado 4 min
              </Selo>
            </Selos>
            <Selos>
              <Selo tipo="aproximado" icone="aproximado">
                Aproximado · há 2 min
              </Selo>
              <Selo tipo="forte" icone="programado">
                Programado
              </Selo>
              <Selo tipo="sem-sinal" icone="sem-sinal">
                Sem sinal há 9 min
              </Selo>
            </Selos>
            <Selos>
              <Selo tipo="sem-sinal" icone="sem-internet">
                Sem internet
              </Selo>
              <Selo tipo="perigo" icone="cancelada">
                Viagem cancelada
              </Selo>
              <Selo tipo="apagado" icone="confirmado">
                Passou no seu ponto às 06:44
              </Selo>
            </Selos>
            <Selos>
              <ChipDePapel>Seu ponto</ChipDePapel>
              <ChipDePapel>Destino</ChipDePapel>
              <ChipDePapel apagado>Ponto de sempre</ChipDePapel>
            </Selos>
          </Cartao>
        </Peca>
        <Peca nome="Trilho de paradas · o ônibus cortando o trilho" soltos>
          <Cartao espaco={8} respiro="lista">
            <Trilho linhas={trilho} />
          </Cartao>
        </Peca>
      </Folha>

      <Folha titulo="F06 · Entrada" regra="Botões, campos, escolhas e os cabeçalhos de autenticação e perfil.">
        <Peca nome="Botões · 48 · raio 12" soltos>
          <Botao>Receber código</Botao>
          <Botao variante="secundario" icone="embarquei">
            Embarquei
          </Botao>
          <Botao variante="destrutivo">Excluir conta</Botao>
          <Botao desligado>Entrar</Botao>
          <Botao carregando rotuloCarregando="Enviando">
            Receber código
          </Botao>
          <DoisBotoes>
            <Botao variante="secundario">Cancelar</Botao>
            <Botao>Confirmar</Botao>
          </DoisBotoes>
          <BotaoLink>Trocar e-mail ou celular</BotaoLink>
        </Peca>
        <Peca nome="Segmentado, switch e chips" soltos>
          <Controles />
        </Peca>
        <Peca nome="Campos · 48, rótulo em cima, erro no lugar" soltos>
          <Campo rotulo="E-mail" tipo="email" valor="" dica="nome@empresa.com.br" />
          <Campo rotulo="E-mail" tipo="email" valor={mock.pessoa.email} fotoComFoco />
          <Campo rotulo="E-mail" tipo="email" valor="ana@metalurgica" erro>
            <Nota tipo="erro">Falta o final do e-mail, como .com.br</Nota>
          </Campo>
          <CampoDeCodigo rotulo="Código" valor="" />
          <CampoDeCodigo rotulo="Código" valor="1234" fotoComFoco />
          <AreaDeTexto rotulo="Conte o que você precisa" valor="" dica="Ex.: quero saber quais dados de embarque vocês guardam" foto />
        </Peca>
        <Peca nome="Item selecionável e grupo recolhido" soltos>
          <Lista>
            <ItemSelecionavel nomeDoGrupo="ponto" escolhido nome={<>{p[2].nome}</>} apoio={`Previsão ${p[2].programado} · ${p[2].previstos} pessoas embarcam aqui`} />
            <div className="hline" />
            <ItemSelecionavel
              nomeDoGrupo="ponto"
              nome={
                <>
                  {sempre.nome}
                  <ChipDePapel apagado>Ponto de sempre</ChipDePapel>
                </>
              }
              apoio={`Previsão ${sempre.programado} · ${sempre.previstos} pessoas embarcam aqui`}
            />
            <div className="hline" />
            <ItemSelecionavel nomeDoGrupo="ponto" desligado nome={p[1].nome} apoio="O ônibus passou às 06:13" />
          </Lista>
          <Lista>
            <GrupoRecolhido>Pontos que o ônibus já passou (2)</GrupoRecolhido>
          </Lista>
        </Peca>
        <Peca nome="Cabeçalho de autenticação e o pé do Entrar" altura={440}>
          <div className="auth entrar">
            <CabecalhoDeEntrada />
            <div className="pilha8">
              <h2 className="h1">Acompanhe seu ônibus</h2>
              <p className="lead">Use o e-mail ou o celular que sua empresa cadastrou.</p>
            </div>
          </div>
          <PeDoEntrar>
            <BotaoLink alinhar="centro">Não recebi convite</BotaoLink>
          </PeDoEntrar>
        </Peca>
        <Peca nome="Cabeçalho de perfil · avatar 72" soltos>
          <div className="pfh">
            <Avatar inicial={mock.pessoa.inicial} tamanho={72} />
            <h2>{mock.pessoa.nome}</h2>
            <p>
              {mock.empresa.nome} · Transporte: {mock.transportadora.nome}
            </p>
            <p>Dados cadastrados pela sua empresa.</p>
          </div>
          <AssinaturaDoPe />
        </Peca>
      </Folha>

      <Folha titulo="F07 · Domínio" regra="O cartão do herói: o estado muda o conteúdo; a forma muda só em chegando, no ponto e cancelada.">
        <Peca nome="Em rota · no horário · ao vivo" soltos>
          <Heroi
            linha={mock.linha.rotulo}
            viagem={viagem}
            alvo={`Passa no seu ponto · ${sempre.nome}`}
            numero={`${semente.minutosAteOSeuPonto} min`}
            complemento={`às ${sempre.programado!}`}
            selos={[{ tipo: 'ao-vivo', texto: 'Ao vivo' }, { tipo: 'neutro', icone: 'no-horario', texto: 'No horário' }]}
            chegada={{ rotulo: 'Chega na fábrica', lugar: p[8].nome!, hora: p[8].programado! }}
          />
        </Peca>
        <Peca nome="Chegando · fundo-destaque · placa em destaque" soltos>
          <Heroi forma="destaque" comDivisoria={false} linha={mock.linha.rotulo} viagem={ida.rotulo} alvo={`Passa no seu ponto · ${sempre.nome}`} numero="Chegando" selos={[{ tipo: 'ao-vivo', texto: 'Ao vivo' }]} aoLadoDoSelo="menos de 2 min">
            <Placa rotulo="Confira o ônibus" placa={onibus} />
            <Botao variante="secundario" icone="embarquei">
              Embarquei
            </Botao>
            <p className="t13">Toque quando subir: a transportadora sabe que você está a bordo.</p>
          </Heroi>
        </Peca>
        <Peca nome="Programado · antes de sair" soltos>
          <Heroi
            linha={mock.linha.rotulo}
            viagem={viagem}
            alvo={`Passa no seu ponto · ${sempre.nome}`}
            numero={sempre.programado}
            tom="apagado"
            complemento="horário programado"
            selos={[{ tipo: 'forte', icone: 'programado', texto: 'Programado' }]}
            ajuda={<p className="t15">A previsão ao vivo começa quando o ônibus sair, às {ida.sai}.</p>}
            chegada={{ rotulo: 'Chega na fábrica', lugar: p[8].nome!, hora: p[8].programado!, sob: 'programado', apagada: false }}
          />
        </Peca>
        <Peca nome="Cancelada · borda perigo" soltos>
          <Heroi forma="perigo" comDivisoria={false} linha={mock.linha.rotulo} viagem={ida.rotulo} alvo={`Passa no seu ponto · ${sempre.nome}`} numero={sempre.programado} tom="riscado" selos={[{ tipo: 'perigo', icone: 'cancelada', texto: 'Viagem cancelada' }]}>
            <p className="t15">Aviso da {mock.transportadora.nomeCurto}: “Manutenção do ônibus. A viagem das {mock.viagens[1].sai} está mantida.”</p>
            <Botao>Ver a viagem das {mock.viagens[1].sai}</Botao>
          </Heroi>
        </Peca>
      </Folha>

      <Folha titulo="F03 · Glifos" regra={`Os ${NOMES_DOS_ICONES.length} ícones, de traço 2, sempre em currentColor.`}>
        <Peca nome="Os ícones, em 20" soltos>
          <div className="glifos">
            {NOMES_DOS_ICONES.map((n) => (
              <Icone key={n} nome={n} tamanho={20} rotulo={n} />
            ))}
          </div>
        </Peca>
      </Folha>
    </div>
  );
}
