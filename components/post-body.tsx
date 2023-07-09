type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
