import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hard block: these bots are known to ignore robots.txt, so we reject them at
// the edge with a 403 instead of just asking nicely (see app/robots.ts).
// Matched case-insensitively as a substring of the User-Agent header.
const BLOCKED_USER_AGENTS = [
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",
  "claudebot",
  "claude-web",
  "anthropic-ai",
  "ccbot",
  "perplexitybot",
  "bytespider",
  "amazonbot",
  "facebookbot",
  "meta-externalagent",
  "diffbot",
  "imagesiftbot",
  "omgilibot",
  "omgili",
  "cohere-ai",
  "youbot",
  "ai2bot",
  "timpibot",
  "dataforseobot",
  "scrapy",
  "python-requests",
];

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";

  if (BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain" },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals; only run on real page requests.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
