import { wrapper } from './TextSource.module.css';

import CopyButton from '../CopyButton.js';

type TextSourceProps = {
  textSource: string;
};

export default function TextSource({ textSource }: TextSourceProps) {
  return (
    <div className={wrapper}>
      <h3>Source</h3>
      <CopyButton text={textSource}>Copy source</CopyButton>
      <textarea
        onFocus={(event) => {
          event.target.select();
        }}
        value={textSource}
      />
    </div>
  );
}
