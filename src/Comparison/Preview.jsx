import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import './Preview.less';

const Markdown = lazy(() => import(/* webpackChunkName: "react-markdown" */ './Markdown'));

export default function Preview({ textSource }) {
  return (
    <div className="Preview">
      <h3>Preview</h3>
      <div className="Preview__body">
        <Suspense fallback={<p>Loading preview...</p>}>
          <Markdown>{textSource}</Markdown>
        </Suspense>
      </div>
    </div>
  );
}

Preview.propTypes = {
  textSource: PropTypes.string,
};
