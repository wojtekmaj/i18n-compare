import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root';

import './global.css';

createRoot(document.getElementById('react-root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
