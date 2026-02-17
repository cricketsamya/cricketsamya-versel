import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Sameer Kulkarni — Java backend engineer in Berlin",
    template: "%s · Sameer Kulkarni",
  },
  description:
    "Sameer Kulkarni is a Java/Kotlin backend engineer in Berlin. Notes on backend engineering, cloud & platform engineering, and building reliable systems.",
  keywords: [
    "Sameer Kulkarni",
    "Java backend engineer Berlin",
    "Kotlin backend engineer",
    "backend engineering",
    "cloud platform engineering",
    "AWS",
    "Kubernetes",
    "CI/CD",
    "observability",
    "reliability engineering",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

