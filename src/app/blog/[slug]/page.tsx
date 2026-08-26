import type { Metadata } from "next";
import { getPost, listPostSlugs } from "@/lib/markdown";
import { formatDate } from "@/lib/date";

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const keywords = Array.from(
    new Set([...(post.frontmatter.tags ?? []), ...(post.frontmatter.categories ?? []), "backend engineering"])
  );
  const image = post.frontmatter.header?.overlay_image;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords,
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/blog/${slug}`,
      publishedTime: post.frontmatter.date,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{post.frontmatter.title}</h1>
      {post.frontmatter.date ? (
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {formatDate(post.frontmatter.date)}
        </p>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

