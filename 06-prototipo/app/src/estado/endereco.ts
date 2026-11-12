// Os endereços do protótipo. Combinam entre si e valem no computador e no celular.
import { casoDe } from '@/dados';

export interface Endereco {
  /** ?ref=T05-20: abre o app parado na referência */
  ref: string | null;
  /** ?tema=claro|escuro: fixa o tema do app */
  tema: 'claro' | 'escuro' | null;
  /** ?celular=claro: o Sistema cai no claro */
  celular: 'claro' | 'escuro';
  /** ?vidro=0: tudo sólido, como nas referências */
  vidro: boolean;
  /** ?palco=1: no celular de verdade, mostra a aba que abre a gaveta */
  palco: boolean;
  /** ?so-app=1: só o aparelho, sem palco */
  soApp: boolean;
  /** ?vitrine=pecas|vidro|marca|tokens */
  vitrine: 'pecas' | 'vidro' | 'marca' | 'tokens' | null;
  /** ?rolar=fim|meio: só para as fotos de conferência */
  rolar: 'fim' | 'meio' | null;
  /** ?sem-vidro=barra,sheet: só para a conferência do vidro. Faz o papel da linha da peça em false */
  semVidro: string[];
  /** ?lente=0: o vidro sem a lente da borda, como no Safari e no iPhone. Para julgar o vidro sem ela no Chromium */
  lente: boolean;
  /** ?fundo=anterior: o fundo de luz de antes (com o lima), no lugar do padrão. Vale em qualquer tela e estado */
  fundo: 'anterior' | null;
  /** ?marca=l1|l2|l3: o arranjo da marca no Entrar (o quadro de vidro, o pictograma solto, a linha). Sem nada, l1 */
  marca: 'l1' | 'l2' | 'l3';
  /** ?cor=invertida: troca as duas cores do pictograma, para comparar */
  cor: 'invertida' | null;
  /** ?receita=android: o vidro como o Android consegue fazer. Os cartões e as listas ficam translúcidos sem desfoque;
      o desfoque fica só no que flutua. É o alvo visual do handoff para o Android */
  receita: 'android' | null;
}

export function lerEndereco(busca: string = window.location.search): Endereco {
  const p = new URLSearchParams(busca);
  const ref = p.get('ref');
  const tema = p.get('tema');
  const vitrine = p.get('vitrine');
  const rolar = p.get('rolar');
  return {
    ref: ref && casoDe(ref) ? ref : null,
    tema: tema === 'claro' || tema === 'escuro' ? tema : null,
    celular: p.get('celular') === 'claro' ? 'claro' : 'escuro',
    vidro: p.get('vidro') !== '0',
    palco: p.get('palco') === '1',
    soApp: p.get('so-app') === '1',
    vitrine: vitrine === 'pecas' || vitrine === 'vidro' || vitrine === 'marca' || vitrine === 'tokens' ? vitrine : null,
    rolar: rolar === 'fim' || rolar === 'meio' ? rolar : null,
    semVidro: (p.get('sem-vidro') ?? '').split(',').filter(Boolean),
    lente: p.get('lente') !== '0',
    fundo: p.get('fundo') === 'anterior' ? 'anterior' : null,
    marca: p.get('marca') === 'l2' ? 'l2' : p.get('marca') === 'l3' ? 'l3' : 'l1',
    cor: p.get('cor') === 'invertida' ? 'invertida' : null,
    receita: p.get('receita') === 'android' ? 'android' : null,
  };
}

/** Escreve o ?ref= no endereço sem recarregar, mantendo os outros parâmetros. */
export function escreverRef(ref: string | null): void {
  const url = new URL(window.location.href);
  if (ref) url.searchParams.set('ref', ref);
  else url.searchParams.delete('ref');
  window.history.replaceState(null, '', url);
}
