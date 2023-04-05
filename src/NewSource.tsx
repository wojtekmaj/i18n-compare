import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { wrapper } from './NewSource.module.css';

import TextSource from './Comparison/TextSource';

import parse from './utils/parse';

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
  Object.keys(leftData).forEach((key) => {
    newSource[key] = (key in rightData && rightData[key]) || '<missing>';
  });

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

NewSource.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};
