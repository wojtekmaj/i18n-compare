import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import { wrapper, body } from './Preview.module.css';

const Markdown = lazy(() => import('./Markdown'));

type PreviewProps = {
  textSource: string;
};

export default function Preview({ textSource }: PreviewProps) {
  return (
    <div className={wrapper}>
      <h3>Preview</h3>
      <div className={body}>
        <Suspense fallback={<p>Loading preview...</p>}>
          <Markdown>{textSource}</Markdown>
        </Suspense>
      </div>
    </div>
  );
}

Preview.propTypes = {
  textSource: PropTypes.string.isRequired,
};
