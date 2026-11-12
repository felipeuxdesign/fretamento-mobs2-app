import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@recursos/fontes/inter.css';
import '@design-system/tokens.css';
import './estilos.css';
import './sistema/sistema.css';
import './sistema/desenhado.css';
import './ds/todas';
import './telas/todas';
import { App } from './App';
import { PonteDoVidro } from './ds/vidro/PonteDoVidro';

createRoot(document.getElementById('raiz')!).render(
  <StrictMode>
    <PonteDoVidro>
      <App />
    </PonteDoVidro>
  </StrictMode>,
);
