// A ponte entre o estado do app e a GlassyUI. Quem manda no tema é o nosso estado (a Aparência do Perfil e o
// Modo claro do palco, que são a mesma chave): toda vez que ele muda, o do vidro muda junto. O modo é sempre o clear.
// A biblioteca não guarda nada sozinha: a gravação dela foi desligada no código copiado.
import { useEffect, type ReactNode } from 'react';
import { GlassProvider, usePreferences } from '@/components/glassyui/glass-provider';
import { usarEstado, temaDe } from '@/estado/armazem';
import { usarVidroLigado } from './usarVidro';

function Sincroniza() {
  const tema = usarEstado(temaDe);
  const prefs = usarEstado((e) => e.preferenciasDoVidro);
  const ligado = usarVidroLigado();
  const { setPreferences } = usePreferences();
  useEffect(() => {
    setPreferences({
      theme: tema === 'claro' ? 'light' : 'dark',
      mode: 'clear',
      reduceTransparency: !ligado,
      reduceMotion: prefs.reduzirMovimento || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      ...(prefs.qualidade ? { quality: prefs.qualidade } : null),
    });
  }, [tema, prefs, ligado, setPreferences]);
  return null;
}

export function PonteDoVidro({ children }: { children: ReactNode }) {
  const tema = usarEstado(temaDe);
  return (
    <GlassProvider defaultTheme={tema === 'claro' ? 'light' : 'dark'}>
      <Sincroniza />
      {children}
    </GlassProvider>
  );
}
