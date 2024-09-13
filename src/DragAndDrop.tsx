import { useState } from 'react';
import clsx from 'clsx';

import { active } from './DragAndDrop.module.css';

function readFileAsText(file: File | null): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const fileReader = new FileReader();
    fileReader.onerror = (error) => {
      fileReader.abort();
      reject(error);
    };

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.readAsText(file);
  });
}

type DragAndDropProps = {
  acceptOnlyNFiles?: number;
  children: React.ReactNode;
  onChange: (files: string[]) => void;
};

export default function DragAndDrop({ acceptOnlyNFiles, children, onChange }: DragAndDropProps) {
  const [isActive, setIsActive] = useState(false);

  function shouldReact(event: React.DragEvent<HTMLDivElement>) {
    if (acceptOnlyNFiles && event.dataTransfer.items.length !== acceptOnlyNFiles) {
      return false;
    }

    return true;
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (!shouldReact(event)) {
      return;
    }

    event.preventDefault();

    setIsActive(true);
  }

  function onDragLeave() {
    setIsActive(false);
  }

  function cleanupDrag(event: React.DragEvent<HTMLDivElement>) {
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      event.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      event.dataTransfer.clearData();
    }

    onDragLeave();
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
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
      className={clsx(isActive && active)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}
