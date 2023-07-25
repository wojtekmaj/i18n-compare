import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

type MarkdownProps = {
  children: string;
};

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {/* Have to change &shy; into <wbr /> as React-Markdown has issues rendering these */}
      {children.replace(/&shy;/g, '<wbr />')}
    </ReactMarkdown>
  );
}
