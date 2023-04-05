import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';

import { wrapper } from './Comparison.module.css';

import Section, { isKeys } from './Comparison/Section';
import TextSource from './Comparison/TextSource';
import Preview from './Comparison/Preview';

import parse from './utils/parse';

type DiffData = {
  extraKeys?: string[];
  missingKeys?: string[];
};

function unescape(html: string) {
  const el = document.createElement('textarea');
  el.innerHTML = html;

  return el.value;
}

function renderSource({ diffData }: { diffData: DiffData }) {
  const { missingKeys, extraKeys } = diffData;

  return (
    <>
      <Section keys={missingKeys} title="✨ Missing keys" />
      <Section keys={extraKeys} title="🗑️ Extra keys" />
    </>
  );
}

renderSource.propTypes = {
  diffData: PropTypes.shape({
    extraKeys: isKeys,
    missingKeys: isKeys,
  }),
};

function getTextSource({ diffData }: { diffData: DiffData }) {
  const source = renderSource({ diffData });
  return unescape(renderToStaticMarkup(source));
}

type ComparisonProps = {
  left: string;
  right: string;
};

export default function Comparison({ left, right }: ComparisonProps) {
  const leftData = useMemo(() => parse(left), [left]);
  const rightData = useMemo(() => parse(right), [right]);

  const diffData: DiffData = useMemo(() => {
    if (!leftData || !rightData) {
      return {};
    }

    const extraKeys = Object.keys(rightData).filter((rightKey) => !(rightKey in leftData));

    const missingKeys = Object.keys(leftData).filter((leftKey) => !(leftKey in rightData));

    return {
      extraKeys,
      missingKeys,
    };
  }, [leftData, rightData]);

  const textSource = getTextSource({ diffData });

  return (
    <section className={wrapper}>
      <div>
        <h2>Comparison</h2>
        <p>
          Use this data to verify differences. If file does not contain any extra keys and has no
          missing keys, empty output will be produced.
        </p>
      </div>
      <TextSource textSource={textSource} />
      <Preview textSource={textSource} />
    </section>
  );
}

Comparison.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};
