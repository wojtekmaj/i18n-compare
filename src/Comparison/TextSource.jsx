import PropTypes from 'prop-types';

import './TextSource.less';

import CopyButton from '../CopyButton';

export default function TextSource({ textSource }) {
  return (
    <div className="TextSource">
      <h3>Source</h3>
      <CopyButton text={textSource}>Copy source</CopyButton>
      <textarea
        onFocus={(event) => {
          event.target.select();
        }}
        value={textSource}
      />
    </div>
  );
}

TextSource.propTypes = {
  textSource: PropTypes.string,
};
