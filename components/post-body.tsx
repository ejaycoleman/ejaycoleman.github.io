import ReactMarkdown from "react-markdown";
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
};

const PostBody = ({ content }: Props) => {
  return (
    <ReactMarkdown
      className="blogContent"
      children={content}
      remarkPlugins={[remarkGfm]}
      components={componentConverter}
    />
  );
};

export default PostBody;
