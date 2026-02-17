import Link from "next/link";
import type { Metadata } from "next";
import { listPosts } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <div className="space-y-8">
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h1>Blog</h1>
        <p>Notes on backend engineering, tooling, and lessons learned.</p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
          >
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">{post.frontmatter.title}</div>
              {post.frontmatter.date ? (
                <div className="text-sm text-slate-600 dark:text-slate-300">{post.frontmatter.date}</div>
              ) : null}
              {post.frontmatter.description ? (
                <div className="pt-1 text-sm text-slate-700 dark:text-slate-200">{post.frontmatter.description}</div>
              ) : null}
            </div>
          </Link>
        ))}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            No posts yet. Add markdown files to <code>content/posts</code>.
          </div>
        ) : null}
      </div>
    </div>
  );
}

