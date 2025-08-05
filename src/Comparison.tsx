import { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { wrapper } from './Comparison.module.css';

import Preview from './Comparison/Preview.js';
import Section from './Comparison/Section.js';
import TextSource from './Comparison/TextSource.js';

import parse from './utils/parse.js';

type DiffData = {
  extraKeys?: string[];
  missingKeys?: string[];
};

function unescapeHtml(html: string) {
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

function getTextSource({ diffData }: { diffData: DiffData }) {
  const source = renderSource({ diffData });
  return unescapeHtml(renderToStaticMarkup(source));
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
