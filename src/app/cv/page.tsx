import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>CV</h1>
      <p>
        <strong>Sameer Kulkarni</strong>
        <br />
        Senior Software Engineer · Berlin, Germany
      </p>

      <p>
        I’ve worked across backend, platform, and product teams, focusing on building systems that are reliable,
        observable, and easy to operate.
      </p>

      <h2>Highlights</h2>
      <ul>
        <li>Backend engineering: Java/Kotlin, Spring Boot, APIs, event-driven systems</li>
        <li>Cloud &amp; platform: AWS, Kubernetes, CI/CD, observability</li>
        <li>Experience across product + platform teams</li>
      </ul>

      <h2>Experience</h2>
      <h3>Senior Backend Engineer · Delivery Hero (Mar 2022 - Dec 2022)</h3>
      <ul>
        <li>Optimized delivery pricing setup workflows with Kotlin, Kafka, BigQuery, Kubernetes on AWS</li>
        <li>Onboarded new team members</li>
      </ul>

      <h3>Senior Software Engineer · Tignum GmbH (Jan 2018 - Feb 2022)</h3>
      <ul>
        <li>Built Spring Boot REST services and integrations</li>
        <li>Migrated CI/CD from Jenkins to GitHub Actions</li>
        <li>Android (Kotlin) interface app connected to backend services</li>
      </ul>

      <h2>Education</h2>
      <ul>
        <li>
          Masters in Software Engineering for Industrial Application — University of Applied Sciences, Hof (2010–2012)
        </li>
        <li>Bachelor of Engineering — Pune University (2003–2007)</li>
      </ul>
    </div>
  );
}

