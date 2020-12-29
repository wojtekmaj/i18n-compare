import { useState } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import './DragAndDrop.less';

function readFileAsText(file) {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = (error) => {
      fileReader.abort();
      reject(error);
    };

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsText(file);
  });
}

export default function DragAndDrop({ acceptOnlyNFiles, children, onChange }) {
  const [isActive, setIsActive] = useState(false);

  function shouldReact(event) {
    if (acceptOnlyNFiles && event.dataTransfer.items.length !== acceptOnlyNFiles) {
      return false;
    }

    return true;
  }

  function onDragOver(event) {
    if (!shouldReact(event)) {
      return;
    }

    event.preventDefault();

    setIsActive(true);
  }

  function onDragLeave() {
    setIsActive(false);
  }

  function cleanupDrag(event) {
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      event.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      event.dataTransfer.clearData();
    }

    onDragLeave();
  }

  function onDrop(event) {
    if (!shouldReact(event)) {
      return;
    }

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    const files = (() => {
      if (event.dataTransfer.items) {
        return Array.from(event.dataTransfer.items)
          .filter((item) => item.kind === 'file')
          .map((item) => item.getAsFile());
      }

      return Array.from(event.dataTransfer.files);
    })();

    if (files.length === 0) {
      return;
    }

    Promise.all(files.map(readFileAsText)).then(onChange);

    cleanupDrag(event);
  }

  return (
    <div
      className={mergeClassNames('DragAndDrop', isActive && 'DragAndDrop--active')}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}

DragAndDrop.propTypes = {
  acceptOnlyNFiles: PropTypes.number,
  children: PropTypes.node,
  onChange: PropTypes.func,
};
