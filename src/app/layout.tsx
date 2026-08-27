import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
          <SiteFooter />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

