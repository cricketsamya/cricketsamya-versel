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

export default function CvPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>CV</h1>
      <p>
        <strong>Sameer Kulkarni</strong>
        <br />
        Software Engineering Lead · Senior Software Engineer
        <br />
        Berlin Metropolitan Area
      </p>

      <h2>Contact</h2>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/sameerkulkarni30/" target="_blank" rel="noreferrer">
            linkedin.com/in/sameerkulkarni30
          </a>
        </li>
        <li>
          <a href="https://medium.com/@cricketsamya" target="_blank" rel="noreferrer">
            medium.com/@cricketsamya
          </a>
        </li>
        <li>
          <a href="https://sameerkulkarni.de" target="_blank" rel="noreferrer">
            sameerkulkarni.de
          </a>
        </li>
        <li>
          <a href="https://github.com/cricketsamya" target="_blank" rel="noreferrer">
            github.com/cricketsamya
          </a>
        </li>
      </ul>

      <h2>Summary</h2>
      <p>
        In past, my leadership in software engineering teams has been fundamental, enhancing product architecture and
        streamlining backend processes. My team helped the transition to NodeJS and Typescript, which I spearheaded, has
        elevated our systems&apos; efficiency and scalability. Utilizing Terraform, we&apos;ve crafted robust
        infrastructure solutions, aligning with the innovative vision. Collaborative at heart, I&apos;ve partnered with
        Product Managers to precisely capture team requirements, ensuring our engineering outcomes resonate with
        customer needs. Regular one-on-one engagements with team members have fostered a culture of continuous
        improvement and personal development, reflecting my commitment to both technological excellence and team growth.
      </p>

      <h2>Experience</h2>
      <h3>Senior Software Engineer · WeatherPromise (Dec 2023 - Present)</h3>
      <ul>
        <li>Berlin, Germany</li>
      </ul>

      <h3>Software Engineering Lead · beeboard (Jul 2023 - Dec 2023)</h3>
      <ul>
        <li>Lead different teams</li>
        <li>Help to make overall architectural decisions of the product</li>
        <li>Collaboration with Product Managers for gathering requirements for the teams</li>
        <li>Perform 1:1 with team members</li>
      </ul>

      <h3>Principal Software Engineer · beeboard (Jan 2023 - Jun 2023)</h3>
      <ul>
        <li>Migration of current backend from NPL (Noumena Platform Language) Kotlin/Java to NodeJS, Typescript</li>
        <li>Lead Backend Team</li>
        <li>Used Terraform for setting up infrastructure</li>
        <li>Helped to improve the overall architecture of the Backend</li>
      </ul>

      <h3>Senior Backend Engineer · Delivery Hero (Mar 2022 - Dec 2022)</h3>
      <ul>
        <li>
          Designed a solution that optimizes the manual process of setting up delivery prices using Kotlin, Python,
          Apache Kafka, Google BigQuery, Kubernetes, Helm on AWS
        </li>
        <li>Optimizing existing BigQuery SQLs as per requirements</li>
        <li>Onboarded new team members</li>
      </ul>

      <h3>Senior Software Engineer · TIGNUM (Jan 2018 - Feb 2022)</h3>
      <ul>
        <li>Design and Implementation of Modular Monoliths from a Monolith Application</li>
        <li>Development of Spring MVC Web Services (Monolith Applications) using J2EE Components</li>
        <li>Interaction of Modular Monoliths to external applications via Enterprise Service Bus (ESB)</li>
        <li>Android Application (Kotlin) to develop an interface that connects the app with Backend Services</li>
        <li>Developed Kibana Dashboards based on Elastic Search</li>
        <li>Developed jMeter tests for load testing of Backend Services</li>
        <li>Worked as a Mentor</li>
        <li>Successfully migrated from Nexus/Jenkins to GitHub Packages &amp; Actions</li>
      </ul>

      <h3>Software Engineer · HealthCarion GmbH (Apr 2012 - Dec 2017)</h3>
      <ul>
        <li>
          Development of Software Solutions for process management and patient safety; design and development of J2EE
          components and Vaadin UI components
        </li>
        <li>
          Implemented customer-specific demands including database, backend, and web user interface; mainly worked with
          Vaadin Framework
        </li>
        <li>Developed Android application for commercial purposes</li>
        <li>Managed plugin-based development for existing software solutions</li>
        <li>Managed application building using Jenkins</li>
        <li>Developed a wrapper framework over Selenium for automated GUI testing</li>
        <li>Interfaced BluetoothLE devices with Raspberry Pi using Python</li>
      </ul>

      <h2>Education</h2>
      <ul>
        <li>Hochschule Hof, University of Applied Sciences — MS, Software Engineering</li>
        <li>Sinhgad College of Engineering — BE, Computer</li>
      </ul>

      <h2>Top skills</h2>
      <ul>
        <li>DevOps</li>
        <li>Ruby</li>
        <li>CDK</li>
      </ul>

      <h2>Languages</h2>
      <ul>
        <li>Hindi (Native or Bilingual)</li>
        <li>English (Native or Bilingual)</li>
        <li>Marathi (Native or Bilingual)</li>
        <li>German (Limited Working)</li>
        <li>Japanese (Elementary)</li>
      </ul>

      <h2>Certifications</h2>
      <ul>
        <li>Cognizant Certified Professional (CCP) - Banking and Financial Services (L0)</li>
        <li>Cognizant Certified Professional (CCP) - Investment Management (L1)</li>
        <li>Cognizant Certified Professional (CCP) - Oracle – SQL/PLSQL</li>
        <li>Cognizant Certified Professional (CCP) - Core Java</li>
        <li>Cognizant Certified Professional (CCP) - Visual C#</li>
      </ul>

      <h2>Honors &amp; Awards</h2>
      <ul>
        <li>University Rank Holder</li>
      </ul>
    </div>
  );
}

