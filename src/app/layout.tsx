import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Sameer Kulkarni",
    template: "%s · Sameer Kulkarni",
  },
  description:
    "Senior Software Engineer in Berlin. Writing about backend engineering (Java/Kotlin), cloud, and reliability.",
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

