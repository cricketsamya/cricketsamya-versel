import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>About</h1>
      <p>
        Hi, I’m Sameer — a Senior Software Engineer based in Berlin. I build backend systems and write about the
        practical side of engineering: reliability, observability, and shipping.
      </p>

      <h2>What I work on</h2>
      <ul>
        <li>Backend systems in Java/Kotlin</li>
        <li>APIs, event-driven architectures, and data pipelines</li>
        <li>Cloud &amp; platform engineering (AWS, Kubernetes, CI/CD)</li>
        <li>Observability, performance, reliability</li>
      </ul>

      <h2>Links</h2>
      <ul>
        <li>
          <a href="https://github.com/cricketsamya" target="_blank" rel="noreferrer">
            GitHub
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

