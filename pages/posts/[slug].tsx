import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import type PostType from "../../interfaces/post";
import Image from "next/image";

type Props = {
  post: PostType;
  preview?: boolean;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  const title = post.title;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Container title={title} date={post.date}>
      <article>
        <Head>
          <title>{title}</title>
        </Head>
        <Image
          src={post.coverImage}
          alt={`Cover Image for ${title}`}
          width={800}
          height={315}
          style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
        />
        <PostBody content={post.content} />
      </article>
    </Container>
  );
}

export const getStaticProps = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
  ]);

  return { props: { post } };
};

export const getStaticPaths = () => {
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
};
