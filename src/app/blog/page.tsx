import Link from "next/link";
import type { Metadata } from "next";
import { listPosts } from "@/lib/markdown";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts by Sameer Kulkarni about backend engineering, Java/Kotlin, cloud & platform engineering, and production reliability.",
  keywords: ["backend engineering", "Java", "Kotlin", "cloud platform", "AWS", "Kubernetes", "observability"],
};

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <div className="space-y-8">
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h1>Blog</h1>
        <p>Notes on backend engineering, tooling, and lessons learned.</p>
      </div>

      <section className="not-prose">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">Topics</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Java/Kotlin", "CI/CD", "AWS", "Kubernetes", "Observability", "Reliability", "SQL/BigQuery"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Most posts are short and practical — the kind you want bookmarked for later.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/50"
          >
            <div className="flex flex-col gap-1.5">
              {post.frontmatter.date ? (
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {formatDate(post.frontmatter.date)}
                </div>
              ) : null}
              <div className="font-display text-lg font-semibold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {post.frontmatter.title}
              </div>
              {post.frontmatter.description ? (
                <div className="text-sm text-slate-700 dark:text-slate-300">{post.frontmatter.description}</div>
              ) : null}
              <div className="pt-1 text-sm font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100 dark:text-indigo-400">
                Read post →
              </div>
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

