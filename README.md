## Sameer Personal Site (Vercel)

This is the new site (Next.js + Tailwind) intended to be deployed on Vercel.

### Run locally

From the repo root:

```bash
cd vercel-site
npm install
npm run dev
```

Open `http://localhost:3000`.

### Add blog posts

Add markdown files to `vercel-site/content/posts`.

### Deploy on Vercel

In Vercel:

- **Import** this GitHub repo
- Set **Root Directory** to `vercel-site`
- Framework preset: **Next.js** (auto-detected)
- Build command: `next build` (default)
- Output: handled automatically by Next.js

