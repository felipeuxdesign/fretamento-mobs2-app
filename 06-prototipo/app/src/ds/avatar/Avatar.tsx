// O avatar: 32 na barra e 72 no Perfil. Usa os tokens do papel dele (avatar-fundo, avatar-tinta).
// De vidro, é o GlassAvatar da biblioteca: a inicial em roxo sobre um disco de vidro claro, com o fio de luz na borda.
import { GlassAvatar } from '@/components/glassyui/glass-avatar';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './avatar.css';

/** As duas iniciais de um nome: a primeira letra do primeiro nome e a do último. */
export const iniciaisDe = (nome: string): string => {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  return ((partes[0]?.[0] ?? '') + (partes.length > 1 ? (partes[partes.length - 1][0] ?? '') : '')).toUpperCase();
};

export function Avatar({ inicial, iniciais, tamanho = 32 }: { inicial: string; /** com o conteúdo de vidro, o avatar mostra as duas iniciais */ iniciais?: string; tamanho?: 32 | 72 }) {
  const deVidro = usarVidro('botoesDaBarra');
  const comDuas = usarVidro('conteudo') && !!iniciais;
  if (deVidro) return <GlassAvatar fallback={comDuas ? iniciais : inicial} className={tamanho === 72 ? 'avatar-de-vidro grande' : 'avatar-de-vidro'} />;
  return <span className={tamanho === 72 ? 'av72' : 'av'}>{inicial}</span>;
}
