import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import H1 from "@/components/h1";

export function loadPost(slug: string) {
  const filename = slug.endsWith(".mdx") ? slug : `${slug}.mdx`;

  return fs.readFileSync(path.join(process.cwd(), "src", "content", filename));
}

export async function getPost(slug: string) {
  const source = loadPost(slug);

  return await compileMDX({
    source,
    components: {
      h1: (props) => <H1 {...props} />,
    },
    options: {
      parseFrontmatter: true,
    },
  });
}

export async function getPosts({
  newest = true,
  page = 1,
  limit = 4,
  tags = [] as string[],
} = {}) {
  const files = fs.readdirSync(path.join(process.cwd(), "src", "content"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const { frontmatter } = await getPost(filename);

      return {
        frontmatter,
        slug: filename.replace(/\.mdx$/, ""),
      };
    })
  );

  let filteredPosts = posts;

  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      (post.frontmatter.tags as Array<string>).some((tag) => tags.includes(tag))
    );
  }

  if (newest) {
    filteredPosts = filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date as string);
      const dateB = new Date(b.frontmatter.date as string);

      return dateB.getTime() - dateA.getTime();
    });
  } else {
    filteredPosts = filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date as string);
      const dateB = new Date(b.frontmatter.date as string);

      return dateA.getTime() - dateB.getTime();
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    pageCount: Math.ceil(filteredPosts.length / limit),
  };
}
