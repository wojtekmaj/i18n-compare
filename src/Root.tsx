import { useState } from 'react';

import getDebugValue from './__debug/getDebugValue.js';
import Comparison from './Comparison.js';
import InputWrapper from './InputWrapper.js';
import NewSource from './NewSource.js';

export default function Root() {
  const [left, setLeft] = useState<string>(getDebugValue.next().value || '');
  const [right, setRight] = useState<string>(getDebugValue.next().value || '');

  const leftTrimmed = left?.trim();
  const rightTrimmed = right?.trim();

  return (
    <>
      <h1>i18n compare</h1>
      <main>
        <InputWrapper
          onChangeLeft={setLeft}
          onChangeRight={setRight}
          valueLeft={left}
          valueRight={right}
        />
        <Comparison left={leftTrimmed} right={rightTrimmed} />
        <NewSource left={leftTrimmed} right={rightTrimmed} />
      </main>
    </>
  );
}
