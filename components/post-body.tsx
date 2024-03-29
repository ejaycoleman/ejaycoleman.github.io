import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

const componentConverter = {
  blockquote: ({ node, ...props }) => (
    <blockquote
      style={{
        borderLeft: "5px solid #ccc",
        margin: "1.5em 10px",
        padding: "0.5em 10px",
      }}
      {...props}
    />
  ),
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        PreTag="div"
      />
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
};

const PostBody = ({ content }: Props) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={componentConverter}
    />
  );
};

export default PostBody;
