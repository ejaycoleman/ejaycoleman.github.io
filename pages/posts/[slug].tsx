import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import Link from "next/link";
import { Typography } from "@mui/material";

type Props = {
  post: PostType;
  preview?: boolean;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  const title = `post.title`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Container>
      <Typography variant="h5">
        <Link href="/" style={{ color: "#3E1B36", textDecoration: "none" }}>
          ejayc.co.uk
        </Link>
      </Typography>
      <article>
        <Head>
          <title>{title}</title>
        </Head>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
        />
        <PostBody content={post.content} />
      </article>
    </Container>
  );
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
