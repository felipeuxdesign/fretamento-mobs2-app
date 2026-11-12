// As notificações do celular simulado, no fluxo: o que a pessoa respondeu ao pedido do Preparar o app vale para o
// Início, as Notificações e os Avisos. Parado numa referência, quem diz a permissão é o caso.
import { ler, responderNotificacoes } from '@/estado/armazem';
import { porCena } from '@/estado/cena';

/** O "Ativar" dos banners de avisos desligados. No celular de verdade ele abre os ajustes; aqui, a permissão passa a
    valer na hora, como se a pessoa tivesse ligado lá e voltado para o app. */
export function ativarAvisos(): void {
  if (ler().parado) return;
  responderNotificacoes('permitida');
  // o Início guarda o banner dele na própria cena
  const inicio = ler().cenas.T05 as { avisosNegados?: boolean } | undefined;
  if (inicio?.avisosNegados) porCena('T05', { ...inicio, avisosNegados: false });
}
