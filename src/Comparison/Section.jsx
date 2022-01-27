import PropTypes from 'prop-types';

export default function Section({ keys, title }) {
  if (!keys || !keys.length) {
    return null;
  }

  return (
    <>
      ## {title}
      {'\n'}
      {keys.map((key) => `* "\`${key}\`"\n`)}
      {'\n'}
    </>
  );
}

export const isKeys = PropTypes.arrayOf(PropTypes.string);

Section.propTypes = {
  keys: isKeys.isRequired,
  title: PropTypes.string,
};
