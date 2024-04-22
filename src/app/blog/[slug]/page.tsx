import Link from "next/link";
import { getPost as getPostNotCached } from "../../../lib/posts";
import { cache } from "react";

type ParamsType = {
  slug: string;
};

const getPost = cache(async (slug: string) => await getPostNotCached(slug));

export async function generateMetadata(
  { params }: { params: ParamsType },
  parent: { description?: string }
) {
  try {
    const { frontmatter } = await getPost(params.slug);
    return frontmatter;
  } catch (error) {
    return {
      title: "Post not found",
    };
  }
}

export default async function BlogPage({ params }: { params: ParamsType }) {
  let post;

  try {
    post = await getPost(params.slug);
  } catch (error) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose dark:prose-invert">
      <div className="flex space-x-2 mb-8">
        {(post.frontmatter.tags as string[]).map((tag: string) => (
          <Link
            key={tag}
            href={`/blog?tags=${tag}`}
            className="dark:text-gray-400 text-gray-500"
          >
            #{tag}
          </Link>
        ))}
      </div>
      {post.content}
    </article>
  );
}
