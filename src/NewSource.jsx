import { useMemo } from 'react';
import PropTypes from 'prop-types';

import './NewSource.less';

import TextSource from './Comparison/TextSource';

import parse from './utils/parse';

function getNewSource({ leftData, rightData }) {
  if (!leftData || !rightData) {
    return '';
  }

  const newSource = {};
  Object.keys(leftData).forEach((key) => {
    newSource[key] = rightData[key] || '<missing>';
  });

  return JSON.stringify(newSource, null, 2);
}

export default function NewSource({ left, right }) {
  const leftData = useMemo(() => parse(left), [left]);
  const rightData = useMemo(() => parse(right), [right]);

  const newSource = getNewSource({ leftData, rightData });

  return (
    <section className="NewSource">
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
