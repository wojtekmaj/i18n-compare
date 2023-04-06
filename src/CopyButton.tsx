import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

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
  children,
  confirmationLabel,
  failureLabel,
  temporaryLabelTimeout,
  text,
}: CopyButtonProps) {
  const [copyState, setCopyState] = useState<boolean | null>(null);

  const label = useMemo(() => {
    if (copyState === null) {
      return children;
    }

    return copyState ? confirmationLabel : failureLabel;
  }, [children, copyState, confirmationLabel, failureLabel]);

  async function onClick() {
    const reset = () => setTimeout(() => setCopyState(null), temporaryLabelTimeout);

    try {
      copyToClipboard(text);
      setCopyState(true);
    } catch (error) {
      setCopyState(false);
    } finally {
      reset();
    }
  }

  return (
    <button className={button} type="button" onClick={onClick} disabled={copyState === true}>
      {label}
    </button>
  );
}

CopyButton.defaultProps = {
  children: 'Copy',
  confirmationLabel: 'Copied!',
  failureLabel: 'Failed to copy',
  temporaryLabelTimeout: 3000,
};

CopyButton.propTypes = {
  children: PropTypes.node,
  confirmationLabel: PropTypes.node,
  failureLabel: PropTypes.node,
  temporaryLabelTimeout: PropTypes.number,
  text: PropTypes.string.isRequired,
};
