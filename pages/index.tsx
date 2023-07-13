import { getRecentPost } from "../lib/api";
import Post from "../interfaces/post";
import meLol from "../public/assets/6096450.jpeg";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default ({ post: { title, slug } }: { post: Post }) => {
  return (
    <Card style={{ padding: 30 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ width: 90, height: 90 }}>
            <Image src={meLol || "EC"} alt={"alter"} layout="fill" />
          </Avatar>
          <Typography variant="h3" style={{ marginTop: 20 }}>
            {"I'm Elliott "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Full Stack Software Engineer
          </Typography>
        </div>
        <Typography sx={{ mt: 1.5 }}>TypeScript, React, Node, Azure</Typography>
        <Typography>
          Read my latest blog post:{" "}
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="hover:underline"
          >
            {title}
          </Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Link as={`/posts`} href="/posts" className="hover:underline">
          <Button variant="contained">Blog</Button>
        </Link>
        <Button variant="contained" href="https://github.com/ejaycoleman">
          Github
        </Button>
      </CardActions>
    </Card>
  );
};

export const getStaticProps = async () => {
  const post = getRecentPost(["title", "slug"]);

  return {
    props: { post },
  };
};
