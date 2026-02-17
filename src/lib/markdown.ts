import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Frontmatter = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  categories?: string[];
  header?: {
    overlay_image?: string;
    caption?: string;
  };
};

export type MarkdownDoc = {
  slug: string;
  frontmatter: Frontmatter;
  contentHtml: string;
};

function cleanDescription(s: string) {
  return s
    .replace(/`{1,3}[^`]+`{1,3}/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
    .replace(/[*_]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDescriptionFromMarkdown(markdown: string): string | undefined {
  const blocks = markdown
    .split(/\n\s*\n/g)
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (block.startsWith("#")) continue;
    if (block.startsWith("```")) continue;
    // allow blockquotes if they are all we have
    const cleaned = cleanDescription(block.replace(/^>\s?/gm, ""));
    if (cleaned.length >= 20) return cleaned.slice(0, 180);
  }

  return undefined;
}

function tryPaths(...absolutePaths: string[]) {
  for (const p of absolutePaths) {
    if (fs.existsSync(p)) return p;
  }
  return absolutePaths[0];
}

function contentRootCandidates(): string[] {
  const cwd = process.cwd();

  // Handle common Vercel/monorepo setups where the build "Root Directory"
  // may be the repo root, a `vercel-site/` subdir, or a nested app folder.
  return [
    path.join(cwd, "content"),
    path.join(cwd, "vercel-site", "content"),
    path.join(cwd, "..", "content"),
    path.join(cwd, "..", "vercel-site", "content"),
  ];
}

function resolveContentRoot(): string {
  return tryPaths(...contentRootCandidates());
}

function localContentPath(...parts: string[]) {
  return path.join(resolveContentRoot(), ...parts);
}

function legacyJekyllPostsPath() {
  // When deploying on Vercel, the project root is typically `vercel-site/`.
  // The original Jekyll posts live at `../_posts` in this repo.
  return path.join(process.cwd(), "..", "_posts");
}

function inferDateFromSlug(slug: string): string | undefined {
  const match = slug.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (!match) return undefined;
  return `${match[1]}-${match[2]}-${match[3]}`;
}

export function listPostSlugs(): string[] {
  const dirs = [localContentPath("posts"), legacyJekyllPostsPath()];
  const slugs = dirs.flatMap((dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  });
  return Array.from(new Set(slugs));
}

export async function getPost(slug: string): Promise<MarkdownDoc> {
  const fullPath = tryPaths(
    localContentPath("posts", `${slug}.md`),
    path.join(legacyJekyllPostsPath(), `${slug}.md`)
  );
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const inferredDate = inferDateFromSlug(slug);
  const inferredDescription = inferDescriptionFromMarkdown(content);
  const header =
    data.header && typeof data.header === "object"
      ? {
          overlay_image:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data.header as any).overlay_image ? String((data.header as any).overlay_image) : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          caption: (data.header as any).caption ? String((data.header as any).caption) : undefined,
        }
      : undefined;

  return {
    slug,
    frontmatter: {
      title: (data.title as string) ?? slug,
      date: data.date ? String(data.date) : inferredDate,
      description: data.description
        ? String(data.description)
        : data.excerpt
          ? String(data.excerpt)
          : inferredDescription,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      categories: Array.isArray(data.categories) ? (data.categories as string[]) : undefined,
      header,
    },
    contentHtml,
  };
}

export async function listPosts(): Promise<Array<Omit<MarkdownDoc, "contentHtml">>> {
  const slugs = listPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = tryPaths(
        localContentPath("posts", `${slug}.md`),
        path.join(legacyJekyllPostsPath(), `${slug}.md`)
      );
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const inferredDate = inferDateFromSlug(slug);
      const inferredDescription = inferDescriptionFromMarkdown(content);
      const header =
        data.header && typeof data.header === "object"
          ? {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              overlay_image: (data.header as any).overlay_image ? String((data.header as any).overlay_image) : undefined,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              caption: (data.header as any).caption ? String((data.header as any).caption) : undefined,
            }
          : undefined;
      return {
        slug,
        frontmatter: {
          title: (data.title as string) ?? slug,
          date: data.date ? String(data.date) : inferredDate,
          description: data.description
            ? String(data.description)
            : data.excerpt
              ? String(data.excerpt)
              : inferredDescription,
          tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
          categories: Array.isArray(data.categories) ? (data.categories as string[]) : undefined,
          header,
        },
      };
    })
  );

  // newest first if date exists
  return posts.sort((a, b) => (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? ""));
}

