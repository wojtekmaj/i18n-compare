import PropTypes from 'prop-types';

import './Input.less';

import DragAndDrop from './DragAndDrop';

export default function Input({ id, label, onChange, value }) {
  function onChangeInternal(event) {
    const { value: nextValue } = event.target;

    onChange(nextValue);
  }

  function onDnDChange([firstValue]) {
    onChange(firstValue);
  }

  return (
    <DragAndDrop acceptOnlyNFiles={1} onChange={onDnDChange}>
      <div className="Input">
        <h3>
          <label htmlFor={id}>{label}</label>
        </h3>
        <textarea
          id={id}
          value={value}
          onChange={onChangeInternal}
          rows={value.split('\n').length}
          wrap="off"
        />
      </div>
    </DragAndDrop>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
