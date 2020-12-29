import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import './Preview.less';

const ReactMarkdown = lazy(() => new Promise((resolve, reject) => {
  import(/* webpackChunkName: "react-markdown" */ 'react-markdown/with-html')
    .then((result) => resolve(result.default ? result : { default: result }))
    .catch(reject);
}));

export default function Preview({ textSource }) {
  return (
    <div className="Preview">
      <h3>Preview</h3>
      <div className="Preview__body">
        <Suspense fallback={<p>Loading preview...</p>}>
          <ReactMarkdown
            // Have to change &shy; into <wbr /> as React-Markdown has issues rendering these
            source={textSource.replace(/&shy;/g, '<wbr />')}
            escapeHtml={false}
          />
        </Suspense>
      </div>
    </div>
  );
}

Preview.propTypes = {
  textSource: PropTypes.string,
};
