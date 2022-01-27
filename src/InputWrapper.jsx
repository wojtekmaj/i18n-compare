import PropTypes from 'prop-types';

import './InputWrapper.less';

import Input from './Input';
import DragAndDrop from './DragAndDrop';

export default function InputWrapper({ onChangeLeft, onChangeRight, valueLeft, valueRight }) {
  function onDnDChange(values) {
    onChangeLeft(values[0]);
    onChangeRight(values[1]);
  }

  function onSwap() {
    onChangeLeft(valueRight);
    onChangeRight(valueLeft);
  }

  return (
    <DragAndDrop acceptOnlyNFiles={2} onChange={onDnDChange}>
      <section className="InputWrapper">
        <div>
          <h2>Input</h2>
          <p>
            Paste i18n files here. You can also drop one file on each field, or two files at the
            same time.
          </p>
        </div>
        <Input id="left" label="Left" onChange={onChangeLeft} value={valueLeft} />
        <Input id="right" label="Right" onChange={onChangeRight} value={valueRight} />
        <button
          type="button"
          className="InputWrapper__swapButton"
          onClick={onSwap}
          title="Swap outputs"
        >
          <span role="img" aria-label="Swap outputs">
            🔄
          </span>
        </button>
      </section>
    </DragAndDrop>
  );
}

InputWrapper.propTypes = {
  onChangeLeft: PropTypes.func.isRequired,
  onChangeRight: PropTypes.func.isRequired,
  valueLeft: PropTypes.string,
  valueRight: PropTypes.string,
};
