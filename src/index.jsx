import { StrictMode } from 'react';
import { render } from 'react-dom';

import Root from './Root';

import './index.less';

render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById('react-root'),
);
