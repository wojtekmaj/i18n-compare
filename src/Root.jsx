import { useState } from 'react';

import getDebugValue from './__debug/getDebugValue';

import InputWrapper from './InputWrapper';
import Comparison from './Comparison';
import NewSource from './NewSource';

export default function Root() {
  const [left, setLeft] = useState(getDebugValue.next().value);
  const [right, setRight] = useState(getDebugValue.next().value);

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
        <Comparison left={left.trim()} right={right.trim()} />
        <NewSource left={left.trim()} right={right.trim()} />
      </main>
    </>
  );
}
