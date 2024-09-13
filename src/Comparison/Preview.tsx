import { lazy, Suspense } from 'react';

import { body } from './Preview.module.css';

const Markdown = lazy(() => import('./Markdown.js'));

type PreviewProps = {
  textSource: string;
};

export default function Preview({ textSource }: PreviewProps) {
  return (
    <div>
      <h3>Preview</h3>
      <div className={body}>
        <Suspense fallback={<p>Loading preview...</p>}>
          <Markdown>{textSource}</Markdown>
        </Suspense>
      </div>
    </div>
  );
}
