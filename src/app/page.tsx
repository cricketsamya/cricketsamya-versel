import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { listPosts } from "@/lib/markdown";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sameer Kulkarni — Java/Kotlin backend engineer in Berlin. Writing about backend engineering, cloud & platform work, and keeping production boring.",
  keywords: ["Java backend engineer Berlin", "Kotlin", "backend engineering", "cloud platform", "observability", "AWS"],
};

export default async function HomePage() {
  const recentPosts = (await listPosts()).slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-white p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        {/* Indigo glow accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/15"
        />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Senior Software Engineer · Berlin
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Building backend systems that stay <span className="text-indigo-600 dark:text-indigo-400">boring</span> in
              production.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-200">
              I write about Java/Kotlin, cloud platforms, observability, and the practical stuff you learn while
              operating real systems.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/cv"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                View CV
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
              >
                Read posts
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
              >
                About
              </Link>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/assets/images/bio-photo.png"
              alt="Sameer Kulkarni"
              width={160}
              height={160}
              priority
              className="h-32 w-32 rounded-full object-cover ring-2 ring-indigo-500/30 md:h-40 md:w-40"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">What I build</h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          Backends that are reliable, observable, and easy to run — APIs, event-driven workflows, and data/analytics
          pipelines.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <li>
            <span className="font-medium">Backend</span>: Java/Kotlin, Node.js/TypeScript
          </li>
          <li>
            <span className="font-medium">Platform</span>: AWS, Kubernetes, Terraform, CI/CD
          </li>
          <li>
            <span className="font-medium">Reliability</span>: dashboards, alerts, tracing, load testing
          </li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Backend engineering",
            desc: "APIs, event-driven systems, and data pipelines in Java/Kotlin.",
          },
          {
            title: "Cloud & platform",
            desc: "AWS, Kubernetes, CI/CD, and production-grade observability.",
          },
          {
            title: "Writing",
            desc: "Short, practical notes — the stuff I wish I had bookmarked earlier.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <h2 className="font-display text-base font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{card.desc}</p>
          </div>
        ))}
      </section>

      {recentPosts.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">Recent writing</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              All posts →
            </Link>
          </div>
          <div className="grid gap-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/50"
              >
                {post.frontmatter.date ? (
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {formatDate(post.frontmatter.date)}
                  </div>
                ) : null}
                <div className="mt-1 font-display text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {post.frontmatter.title}
                </div>
                {post.frontmatter.description ? (
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{post.frontmatter.description}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
