import AsyncButton from '@wojtekmaj/react-async-button';

import { button } from './CopyButton.module.css';

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

type CopyButtonProps = {
  children?: React.ReactNode;
  confirmationLabel?: React.ReactNode;
  failureLabel?: React.ReactNode;
  temporaryLabelTimeout?: number;
  text: string;
};

export default function CopyButton({
  children = 'Copy',
  confirmationLabel = 'Copied!',
  failureLabel = 'Failed to copy',
  temporaryLabelTimeout = 3000,
  text,
}: CopyButtonProps) {
  const successConfig = {
    children: confirmationLabel,
  };

  const errorConfig = {
    children: failureLabel,
  };

  function onClick() {
    copyToClipboard(text);
  }

  return (
    <>
      <AsyncButton
        className={button}
        errorConfig={errorConfig}
        onClick={onClick}
        resetTimeout={temporaryLabelTimeout}
        successConfig={successConfig}
        type="button"
      >
        {children}
      </AsyncButton>
    </>
  );
}
