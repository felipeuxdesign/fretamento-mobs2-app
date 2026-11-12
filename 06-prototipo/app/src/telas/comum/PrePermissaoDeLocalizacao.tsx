// O sheet de pré-permissão da localização: aparece antes do pedido do celular, na primeira vez que a pessoa
// toca em "Perto de mim" (Outro ponto hoje) ou em "Minha localização" (Mapa). Diz para que serve e o que não acontece.
import { Sheet } from '@/ds/sheet/Sheet';
import { Botao, DoisBotoes } from '@/ds/botao/Botao';

export const PRE_PERMISSAO = {
  titulo: 'Mostrar os pontos perto de você?',
  texto: 'Para ordenar por distância a pé, o app usa a sua localização enquanto estiver aberto. Ela não fica guardada e ninguém da empresa vê onde você está.',
  desiste: 'Agora não',
  confirma: 'Permitir',
};

export function PrePermissaoDeLocalizacao({ aoDesistir, aoPermitir }: { aoDesistir?: () => void; aoPermitir?: () => void }) {
  return (
    <Sheet titulo={PRE_PERMISSAO.titulo} aoFechar={aoDesistir}>
      <p>{PRE_PERMISSAO.texto}</p>
      <DoisBotoes>
        <Botao variante="secundario" onClick={aoDesistir}>
          {PRE_PERMISSAO.desiste}
        </Botao>
        <Botao onClick={aoPermitir}>{PRE_PERMISSAO.confirma}</Botao>
      </DoisBotoes>
    </Sheet>
  );
}
