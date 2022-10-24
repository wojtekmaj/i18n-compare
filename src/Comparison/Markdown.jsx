import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

export default function Markdown({ children }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {/* Have to change &shy; into <wbr /> as React-Markdown has issues rendering these */}
      {children.replace(/&shy;/g, '<wbr />')}
    </ReactMarkdown>
  );
}

Markdown.propTypes = {
  children: PropTypes.string,
};
