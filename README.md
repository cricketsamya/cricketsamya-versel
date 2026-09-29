# Sameer Personal Site

Personal site and blog built with Next.js (App Router), Tailwind CSS and TypeScript, deployed on Vercel.

## Run locally

From the repo root:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

## Project layout

```
content/posts/     Blog posts as Markdown files
public/assets/     Images and other static files
scripts/           One-off tooling (Jekyll migration)
src/app/           Routes: /, /about, /blog, /blog/[slug], /cv, robots.txt, sitemap.xml
src/components/    Header, footer, nav, theme toggle, email link
src/lib/           Markdown loading and date helpers
src/proxy.ts       Edge proxy that blocks AI scrapers
```

## Add a blog post

Create a Markdown file in `content/posts/`. The filename (without `.md`) becomes the URL slug, so `content/posts/my-post.md` is served at `/blog/my-post`.

Frontmatter fields the site reads:

```yaml
---
title: Post title
date: '2026-08-26'
description: Short summary used in listings and OG metadata. Optional; inferred from the first paragraph if omitted.
tags:
  - springboot
  - metrics
categories:
  - Posts
header:
  overlay_image: /assets/images/my-post.png   # featured image, also used for OG
  caption: Optional caption
---
```

Markdown is rendered to HTML with `remark` and `remark-html`.

## Migrating posts from Jekyll

`scripts/migrate-jekyll.mjs` copies posts from the old Jekyll site into `content/posts/`, strips the date prefix from filenames, and moves the date into frontmatter.

```bash
node scripts/migrate-jekyll.mjs /path/to/jekyll/site
```

The source path can also be set with the `JEKYLL_SOURCE` environment variable.

## Bot blocking

`robots.txt` (from `src/app/robots.ts`) asks AI crawlers to stay away. `src/proxy.ts` goes further and returns `403` at the edge for a list of user agents known to ignore `robots.txt`. Static assets and Next internals are excluded from the matcher.

## Analytics

Vercel Web Analytics is enabled via `@vercel/analytics` in the root layout.

## Deploy on Vercel

- Import this GitHub repo in Vercel
- Root Directory: repo root (leave blank)
- Framework preset: Next.js (auto-detected)
- Build command: `next build` (default)
