import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV / Resume",
  description:
    "CV of Sameer Kulkarni — Java/Kotlin backend engineer in Berlin. Experience across backend, platform, cloud infrastructure, and engineering leadership.",
  keywords: [
    "Java backend engineer Berlin",
    "Kotlin",
    "resume",
    "CV",
    "platform engineering",
    "AWS",
    "Kubernetes",
    "Terraform",
    "CI/CD",
  ],
};

type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
};

const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "WeatherPromise",
    period: "Dec 2023 – Present",
    location: "Berlin, Germany",
    points: [],
  },
  {
    role: "Software Engineering Lead",
    company: "beeboard",
    period: "Jul 2023 – Dec 2023",
    points: [
      "Lead different teams",
      "Help to make overall architectural decisions of the product",
      "Collaboration with Product Managers for gathering requirements for the teams",
      "Perform 1:1 with team members",
    ],
  },
  {
    role: "Principal Software Engineer",
    company: "beeboard",
    period: "Jan 2023 – Jun 2023",
    points: [
      "Migration of current backend from NPL (Noumena Platform Language) Kotlin/Java to NodeJS, Typescript",
      "Lead Backend Team",
      "Used Terraform for setting up infrastructure",
      "Helped to improve the overall architecture of the Backend",
    ],
  },
  {
    role: "Senior Backend Engineer",
    company: "Delivery Hero",
    period: "Mar 2022 – Dec 2022",
    points: [
      "Designed a solution that optimizes the manual process of setting up delivery prices using Kotlin, Python, Apache Kafka, Google BigQuery, Kubernetes, Helm on AWS",
      "Optimizing existing BigQuery SQLs as per requirements",
      "Onboarded new team members",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "TIGNUM",
    period: "Jan 2018 – Feb 2022",
    points: [
      "Design and Implementation of Modular Monoliths from a Monolith Application",
      "Development of Spring MVC Web Services (Monolith Applications) using J2EE Components",
      "Interaction of Modular Monoliths to external applications via Enterprise Service Bus (ESB)",
      "Android Application (Kotlin) to develop an interface that connects the app with Backend Services",
      "Developed Kibana Dashboards based on Elastic Search",
      "Developed jMeter tests for load testing of Backend Services",
      "Worked as a Mentor",
      "Successfully migrated from Nexus/Jenkins to GitHub Packages & Actions",
    ],
  },
  {
    role: "Software Engineer",
    company: "HealthCarion GmbH",
    period: "Apr 2012 – Dec 2017",
    points: [
      "Development of Software Solutions for process management and patient safety; design and development of J2EE components and Vaadin UI components",
      "Implemented customer-specific demands including database, backend, and web user interface; mainly worked with Vaadin Framework",
      "Developed Android application for commercial purposes",
      "Managed plugin-based development for existing software solutions",
      "Managed application building using Jenkins",
      "Developed a wrapper framework over Selenium for automated GUI testing",
      "Interfaced BluetoothLE devices with Raspberry Pi using Python",
    ],
  },
];

const contact = [
  { label: "linkedin.com/in/sameerkulkarni30", href: "https://www.linkedin.com/in/sameerkulkarni30/" },
  { label: "medium.com/@cricketsamya", href: "https://medium.com/@cricketsamya" },
  { label: "sameerkulkarni.de", href: "https://sameerkulkarni.de" },
  { label: "github.com/cricketsamya", href: "https://github.com/cricketsamya" },
];

const education = [
  "Hochschule Hof, University of Applied Sciences — MS, Software Engineering",
  "Sinhgad College of Engineering — BE, Computer",
];

const languages = [
  "Hindi (Native or Bilingual)",
  "English (Native or Bilingual)",
  "Marathi (Native or Bilingual)",
  "German (Limited Working)",
  "Japanese (Elementary)",
];

const certifications = [
  "Cognizant Certified Professional (CCP) — Banking and Financial Services (L0)",
  "Cognizant Certified Professional (CCP) — Investment Management (L1)",
  "Cognizant Certified Professional (CCP) — Oracle SQL/PLSQL",
  "Cognizant Certified Professional (CCP) — Core Java",
  "Cognizant Certified Professional (CCP) — Visual C#",
];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-white p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Sameer Kulkarni</h1>
        <p className="mt-1 text-slate-700 dark:text-slate-200">
          Software Engineering Lead · Senior Software Engineer
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Berlin Metropolitan Area</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {contact.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-400"
            >
              {c.label}
            </a>
          ))}
        </div>
      </header>

      <Panel title="Summary">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          In past, my leadership in software engineering teams has been fundamental, enhancing product architecture and
          streamlining backend processes. My team helped the transition to NodeJS and Typescript, which I spearheaded,
          has elevated our systems&apos; efficiency and scalability. Utilizing Terraform, we&apos;ve crafted robust
          infrastructure solutions, aligning with the innovative vision. Collaborative at heart, I&apos;ve partnered
          with Product Managers to precisely capture team requirements, ensuring our engineering outcomes resonate with
          customer needs. Regular one-on-one engagements with team members have fostered a culture of continuous
          improvement and personal development, reflecting my commitment to both technological excellence and team
          growth.
        </p>
      </Panel>

      {/* Experience timeline */}
      <Panel title="Experience">
        <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-slate-800">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 dark:border-slate-950" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
                  {job.role} · <span className="text-indigo-600 dark:text-indigo-400">{job.company}</span>
                </h3>
                <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {job.period}
                </span>
              </div>
              {job.location ? (
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{job.location}</p>
              ) : null}
              {job.points.length > 0 ? (
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Education">
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Top skills">
          <div className="flex flex-wrap gap-2">
            {["Software Engineering", "Java", "Kotlin", "Python"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Languages">
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Certifications">
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Honors & Awards">
        <ul className="text-sm text-slate-700 dark:text-slate-300">
          <li>University Rank Holder</li>
        </ul>
      </Panel>
    </div>
  );
}
