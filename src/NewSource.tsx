import { useMemo } from 'react';

import { wrapper } from './NewSource.module.css';

import TextSource from './Comparison/TextSource.js';

import parse from './utils/parse.js';

type Data = Record<string, string>;

function getNewSource({
  leftData,
  rightData,
}: {
  leftData?: Data | null;
  rightData?: Data | null;
}) {
  if (!leftData || !rightData) {
    return '';
  }

  const newSource: Data = {};
  for (const key of Object.keys(leftData)) {
    newSource[key] = (key in rightData && rightData[key]) || '<missing>';
  }

  return JSON.stringify(newSource, null, 2);
}

type NewSourceProps = {
  left?: string;
  right?: string;
};

export default function NewSource({ left, right }: NewSourceProps) {
  const leftData = useMemo(() => parse(left), [left]);
  const rightData = useMemo(() => parse(right), [right]);

  const newSource = getNewSource({ leftData, rightData });

  return (
    <section className={wrapper}>
      <div>
        <h2>New source</h2>
        <p>You can use this new source file to base your further translation work on.</p>
      </div>
      <TextSource textSource={newSource} />
    </section>
  );
}
