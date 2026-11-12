// Com o conteúdo de vidro, o formulário do Entrar e o do Código moram num cartão de vidro;
// sólido, ficam soltos na tela, como nos quadros.
import type { ReactNode } from 'react';
import { Conteudo } from '@/ds/vidro/Conteudo';
import { usarVidro } from '@/ds/vidro/usarVidro';

export function CartaoDoFormulario({ children }: { children: ReactNode }) {
  const deVidro = usarVidro('conteudo');
  return deVidro ? <Conteudo className="card cartao-de-entrada">{children}</Conteudo> : <>{children}</>;
}
