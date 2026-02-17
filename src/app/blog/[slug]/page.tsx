import type { Metadata } from "next";
import { getPost, listPostSlugs } from "@/lib/markdown";

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const keywords = Array.from(
    new Set([...(post.frontmatter.tags ?? []), ...(post.frontmatter.categories ?? []), "backend engineering"])
  );
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      {post.frontmatter.header?.overlay_image ? (
        <figure className="not-prose">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <img
              src={post.frontmatter.header.overlay_image}
              alt=""
              className="h-auto w-full"
              loading="eager"
            />
          </div>
          {post.frontmatter.header.caption ? (
            <figcaption className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {post.frontmatter.header.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <h1>{post.frontmatter.title}</h1>
      {post.frontmatter.date ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{post.frontmatter.date}</p>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

