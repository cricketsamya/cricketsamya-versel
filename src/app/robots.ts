import type { MetadataRoute } from "next";

const SITE_URL = "https://sameerkulkarni.de";

// AI crawlers / scrapers we ask not to index or train on the site.
// Well-behaved bots obey this; the middleware enforces a hard block on the
// most aggressive ones (see middleware.ts).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "PerplexityBot",
  "Bytespider",
  "Amazonbot",
  "FacebookBot",
  "meta-externalagent",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "Omgili",
  "cohere-ai",
  "YouBot",
  "AI2Bot",
  "Timpibot",
  "Webzio-Extended",
  "DataForSeoBot",
  "Scrapy",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Normal search engines and everything else: allow.
      {
        userAgent: "*",
        allow: "/",
      },
      // AI crawlers: disallow everything.
      {
        userAgent: AI_CRAWLERS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
