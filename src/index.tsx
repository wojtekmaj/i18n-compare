import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root.js';

import './global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Could not find root element');
}

createRoot(root).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
