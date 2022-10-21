import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root';

import './index.less';

createRoot(document.getElementById('react-root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
