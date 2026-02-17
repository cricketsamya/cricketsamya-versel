import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sameer Kulkarni — Java/Kotlin backend engineer in Berlin. Writing about backend engineering, cloud & platform work, and keeping production boring.",
  keywords: ["Java backend engineer Berlin", "Kotlin", "backend engineering", "cloud platform", "observability", "AWS"],
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-950">
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Senior Software Engineer · Berlin
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Building backend systems that stay boring in production.
          </h1>
          <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-200">
            I write about Java/Kotlin, cloud platforms, observability, and the practical stuff you learn while operating
            real systems.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/cv"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
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
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">What I build</h2>
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
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <Image
            src="/assets/diagrams/backend-pipeline.svg"
            alt="Backend pipeline diagram"
            width={1200}
            height={420}
            className="h-auto w-full"
            priority={false}
          />
        </div>
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
            <h2 className="text-base font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{card.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

