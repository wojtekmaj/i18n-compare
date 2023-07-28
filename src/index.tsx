import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root.js';

import './global.css';

createRoot(document.getElementById('react-root') as HTMLDivElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
