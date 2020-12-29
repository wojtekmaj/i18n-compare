import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './CopyButton.less';

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const result = document.execCommand('copy');
  document.body.removeChild(textArea);
  if (!result) {
    throw new Error('execCommand failed');
  }
}

async function copy(text) {
  try {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API not supported');
    }

    const permission = await navigator.permissions.query({ name: 'clipboard-write' });

    if (permission.state === 'granted' || permission.state === 'prompt') {
      await navigator.clipboard.writeText(text);
    } else {
      throw new Error('clipboard-write permission not granted');
    }
  } catch (error) {
    fallbackCopy(text);
  }
}

export default function CopyButton({
  children,
  confirmationLabel,
  failureLabel,
  temporaryLabelTimeout,
  text,
}) {
  const [copyState, setCopyState] = useState(null);

  const label = useMemo(() => {
    if (copyState === null) {
      return children;
    }

    return copyState ? confirmationLabel : failureLabel;
  }, [children, copyState, confirmationLabel, failureLabel]);

  async function onClick() {
    const reset = () => setTimeout(() => setCopyState(null), temporaryLabelTimeout);

    try {
      await copy(text);
      setCopyState(true);
    } catch (error) {
      setCopyState(false);
    } finally {
      reset();
    }
  }

  return (
    <button
      className="CopyButton"
      type="button"
      onClick={onClick}
      disabled={copyState === true}
    >
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
