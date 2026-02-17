import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sameer Kulkarni — a Java/Kotlin backend engineer in Berlin. I build reliable systems and write about backend engineering, cloud & platform, and observability.",
  keywords: [
    "Java backend engineer Berlin",
    "Kotlin",
    "backend engineering",
    "platform engineering",
    "AWS",
    "Kubernetes",
    "observability",
    "reliability",
  ],
};

export default function AboutPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>About</h1>
      <p>
        Hi, I’m Sameer — a Senior Software Engineer based in Berlin. I build backend systems and write about the
        practical side of engineering: reliability, observability, and shipping.
      </p>

      <div className="not-prose">
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: "Boring production", desc: "Prefer simple, predictable systems that are easy to operate." },
            { title: "Observability-first", desc: "Dashboards + alerts + traces are part of the definition of done." },
            { title: "Pragmatic delivery", desc: "Small steps, good defaults, and tooling that reduces toil." },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">{card.title}</div>
              <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{card.desc}</div>
            </div>
          ))}
        </div>

        <figure className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <Image
              src="/assets/diagrams/backend-pipeline.svg"
              alt="Backend pipeline diagram"
              width={1200}
              height={420}
              className="h-auto w-full"
              unoptimized
            />
          </div>
          <figcaption className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            A simple sketch of the kind of backend + events + analytics work I enjoy.
          </figcaption>
        </figure>
      </div>

      <h2>What I work on</h2>
      <ul>
        <li>Backend systems in Java/Kotlin</li>
        <li>APIs, event-driven architectures, and data pipelines</li>
        <li>Cloud &amp; platform engineering (AWS, Kubernetes, CI/CD)</li>
        <li>Observability, performance, reliability</li>
      </ul>

      <h2>Toolbox (quick list)</h2>
      <p>Some tools and topics I’ve worked with recently:</p>
      <ul>
        <li>Java/Kotlin, Node.js/TypeScript</li>
        <li>AWS, Kubernetes, Helm, Terraform</li>
        <li>Kafka, SQL/BigQuery</li>
        <li>Dashboards/alerts, tracing, load testing</li>
      </ul>

      <h2>Links</h2>
      <ul>
        <li>
          <a href="https://github.com/cricketsamya" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://medium.com/@cricketsamya" target="_blank" rel="noreferrer">
            Medium
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/sameerkulkarni30/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:mail@sameerkulkarni.de">Email</a>
        </li>
      </ul>
    </div>
  );
}

