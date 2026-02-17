import type { Metadata } from "next";
import { getPost, listPostSlugs } from "@/lib/markdown";

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{post.frontmatter.title}</h1>
      {post.frontmatter.date ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{post.frontmatter.date}</p>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

