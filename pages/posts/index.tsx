import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { getAllPosts } from "../../lib/api";
import PostType from "../../interfaces/post";
import Image from "next/image";

export default ({ posts }: { posts: PostType[] }) => {
  return (
    <Card style={{ padding: 30 }}>
      <Breadcrumbs>
        <Link style={{ color: "#3E1B36", textDecoration: "none" }} href="/">
          ejayc.co.uk
        </Link>
        <Typography>posts</Typography>
      </Breadcrumbs>
      <CardHeader
        title="Posts"
        subheader="Have a read of some conent I've written"
      />
      <CardContent
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {posts.map(({ slug, title, coverImage }) => (
          <Card
            variant="outlined"
            style={{ width: 400, margin: 30 }}
            key={title}
          >
            <CardHeader title={title} />
            <CardContent>
              <Typography>
                <Image
                  src={coverImage}
                  alt={`Cover Image for ${title}`}
                  width={400}
                  height={150}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                />
                Read my latest blog post: {title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                as={`/posts/${slug}`}
                href="/posts/[slug]"
                className="hover:underline"
              >
                <Button variant="contained">View</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "coverImage"]);

  return {
    props: { posts },
  };
};
