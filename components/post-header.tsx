import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <div>
        <CoverImage title={title} src={coverImage} />
      </div>
      <div>
        <DateFormatter dateString={date} />
      </div>
    </>
  );
};

export default PostHeader;
