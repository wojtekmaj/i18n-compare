import { wrapper, swapButton } from './InputWrapper.module.css';

import Input from './Input.js';
import DragAndDrop from './DragAndDrop.js';
import { useId } from 'react';

type InputWrapperProps = {
  onChangeLeft: (value: string) => void;
  onChangeRight: (value: string) => void;
  valueLeft: string;
  valueRight: string;
};

export default function InputWrapper({
  onChangeLeft,
  onChangeRight,
  valueLeft,
  valueRight,
}: InputWrapperProps) {
  const leftId = useId();
  const rightId = useId();

  function onDnDChange(values: string[]) {
    onChangeLeft(values[0] || '');
    onChangeRight(values[1] || '');
  }

  function onSwap() {
    onChangeLeft(valueRight);
    onChangeRight(valueLeft);
  }

  return (
    <DragAndDrop acceptOnlyNFiles={2} onChange={onDnDChange}>
      <section className={wrapper}>
        <div>
          <h2>Input</h2>
          <p>
            Paste i18n files here. You can also drop one file on each field, or two files at the
            same time.
          </p>
        </div>
        <Input id={leftId} label="Left" onChange={onChangeLeft} value={valueLeft} />
        <Input id={rightId} label="Right" onChange={onChangeRight} value={valueRight} />
        <button type="button" className={swapButton} onClick={onSwap} title="Swap outputs">
          <span aria-label="Swap outputs" role="img">
            🔄
          </span>
        </button>
      </section>
    </DragAndDrop>
  );
}
