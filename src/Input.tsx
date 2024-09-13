import DragAndDrop from './DragAndDrop.js';

type InputProps = {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export default function Input({ id, label, onChange, value }: InputProps) {
  function onChangeInternal(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value: nextValue } = event.target;

    onChange(nextValue);
  }

  function onDnDChange([firstValue]: string[]) {
    onChange(firstValue || '');
  }

  return (
    <DragAndDrop acceptOnlyNFiles={1} onChange={onDnDChange}>
      <div>
        <h3>
          <label className={label} htmlFor={id}>
            {label}
          </label>
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
