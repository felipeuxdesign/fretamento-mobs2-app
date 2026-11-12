// O que o fluxo guarda do "Outro ponto hoje", e as portas de entrada dele vindas de outras telas.
import { irPara } from '@/estado/armazem';
import { porCena } from '@/estado/cena';
import { momentoDeAgora, antesDoEmbarque } from '@/estado/dia';

export interface FluxoT08 {
  /** a parada escolhida na lista */
  escolhido?: string;
  /** "Perto de mim" ligado: a lista por distância a pé */
  perto: boolean;
  /** os pontos que o ônibus já passou, abertos */
  passados: boolean;
  /** o que está aberto por cima: a pré-permissão da localização, ou a confirmação da troca */
  sheet?: 'pre-permissao' | 'confirmar';
  /** o botão Confirmar esperando a resposta */
  enviando: boolean;
}
export const FLUXO_DA_TROCA: FluxoT08 = { perto: false, passados: false, enviando: false };

/** Das Paradas e do Mapa: "Embarcar aqui hoje" numa parada segue direto para a confirmação. */
export function escolherPontoDeHoje(id: string): void {
  // depois do embarque não há troca; e o ponto que já é o de hoje não se escolhe de novo
  const m = momentoDeAgora();
  if (!antesDoEmbarque(m) || id === m.ponto) return;
  porCena<FluxoT08>('T08', { ...FLUXO_DA_TROCA, escolhido: id, sheet: 'confirmar' });
  irPara('T08');
}
