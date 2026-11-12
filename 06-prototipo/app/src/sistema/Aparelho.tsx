// A moldura do aparelho: o iPhone 14 dos quadros, em 100%, com a tela do app dentro.
import type { ReactNode } from 'react';
import './aparelho.css';

export function Aparelho({ children }: { children: ReactNode }) {
  return (
    <div className="pl-dev" data-aparelho>
      <i className="pl-bt l" style={{ top: 160, height: 30 }} />
      <i className="pl-bt l" style={{ top: 228, height: 56 }} />
      <i className="pl-bt l" style={{ top: 300, height: 56 }} />
      <i className="pl-bt r" style={{ top: 236, height: 92 }} />
      <div className="pl-gl">{children}</div>
    </div>
  );
}
