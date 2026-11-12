// O háptico (movimento 7): leve, em quatro momentos. No navegador do computador e no iPhone não existe;
// no Android, a vibração do navegador faz o papel. No produto real, é o háptico nativo.
// Nunca em atualização de previsão.
type Toque = 'chegando' | 'no-ponto' | 'sucesso' | 'aviso';
const PADRAO: Record<Toque, number | number[]> = {
  chegando: 12, // um toque
  'no-ponto': [12, 80, 12], // dois toques
  sucesso: [10, 40, 18], // confirmou a troca ou o embarque
  aviso: [18, 60, 18, 60, 18], // cancelada ou trocado, junto do push
};

export function haptico(toque: Toque): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) navigator.vibrate(PADRAO[toque]);
  } catch {
    /* sem vibração neste aparelho */
  }
}
