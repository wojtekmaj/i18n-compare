import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import styles from './Preview.module.css';

const Markdown = lazy(() => import(/* webpackChunkName: "react-markdown" */ './Markdown'));

export default function Preview({ textSource }) {
  return (
    <div className={styles.wrapper}>
      <h3>Preview</h3>
      <div className={styles.body}>
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
