import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function stripDatePrefix(filenameNoExt) {
  const match = filenameNoExt.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) return { slug: filenameNoExt, date: undefined };
  return { slug: match[4], date: `${match[1]}-${match[2]}-${match[3]}` };
}

function cleanDescription(s) {
  return (
    s
      // remove code fences inline-ish
      .replace(/`{1,3}[^`]+`{1,3}/g, "")
      // remove images
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      // replace links [text](url) -> text
      .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
      // strip markdown emphasis
      .replace(/[*_]+/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function inferDescriptionFromMarkdown(markdown) {
  const blocks = markdown
    .split(/\n\s*\n/g)
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (block.startsWith("#")) continue;
    if (block.startsWith(">")) continue;
    if (block.startsWith("```")) continue;
    const cleaned = cleanDescription(block);
    if (cleaned.length >= 20) return cleaned.slice(0, 180);
  }
  return undefined;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFileIfMissing(src, dst) {
  await ensureDir(path.dirname(dst));
  try {
    await fs.access(dst);
    return;
  } catch {
    // continue
  }
  await fs.copyFile(src, dst);
}

async function copyDirFiltered(srcDir, dstDir, exts) {
  if (!fssync.existsSync(srcDir)) return;
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const srcPath = path.join(srcDir, ent.name);
    const dstPath = path.join(dstDir, ent.name);
    if (ent.isDirectory()) {
      await copyDirFiltered(srcPath, dstPath, exts);
      continue;
    }
    const ext = path.extname(ent.name).toLowerCase();
    if (!exts.has(ext)) continue;
    await ensureDir(path.dirname(dstPath));
    await fs.copyFile(srcPath, dstPath);
  }
}

async function migratePosts({ sourceRoot, destRoot }) {
  const srcPostsDir = path.join(sourceRoot, "_posts");
  const dstPostsDir = path.join(destRoot, "content", "posts");
  await ensureDir(dstPostsDir);

  const files = (await fs.readdir(srcPostsDir)).filter((f) => f.endsWith(".md") || f.endsWith(".markdown"));
  const collisions = new Set();

  for (const file of files) {
    const ext = path.extname(file);
    const base = file.slice(0, -ext.length);
    const { slug, date } = stripDatePrefix(base);

    const srcPath = path.join(srcPostsDir, file);
    const raw = await fs.readFile(srcPath, "utf8");
    const parsed = matter(raw);

    const data = { ...parsed.data };
    if (!data.date && date) data.date = date;

    const existingDesc =
      typeof data.description === "string"
        ? data.description
        : typeof data.excerpt === "string"
          ? data.excerpt
          : undefined;
    const inferredDesc = inferDescriptionFromMarkdown(parsed.content);
    const desc = cleanDescription(existingDesc ?? "") || inferredDesc;
    if (!data.description && desc) data.description = desc;

    // Jekyll's `excerpt` is often empty and not used in this app
    if (typeof data.excerpt === "string" && data.excerpt.trim() === "") delete data.excerpt;

    let outSlug = slug;
    if (collisions.has(outSlug)) {
      outSlug = date ? `${date}-${outSlug}` : `${outSlug}-2`;
    }
    collisions.add(outSlug);

    const outPath = path.join(dstPostsDir, `${outSlug}.md`);
    const out = matter.stringify(parsed.content.trimStart(), data);
    await fs.writeFile(outPath, out, "utf8");
  }

  return files.length;
}

async function migrateAssets({ sourceRoot, destRoot }) {
  const dstPublic = path.join(destRoot, "public");
  await ensureDir(dstPublic);

  // Keep old `/assets/...` URLs working by copying to `public/assets/...`
  const allowedExts = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".xml",
    ".webmanifest",
  ]);

  await copyDirFiltered(path.join(sourceRoot, "assets"), path.join(dstPublic, "assets"), allowedExts);
  await copyDirFiltered(path.join(sourceRoot, "_site", "assets"), path.join(dstPublic, "assets"), allowedExts);

  // Root favicon if present
  const srcFavicon = path.join(sourceRoot, "favicon.ico");
  if (fssync.existsSync(srcFavicon)) {
    await copyFileIfMissing(srcFavicon, path.join(dstPublic, "favicon.ico"));
  }
}

async function main() {
  const sourceRoot =
    process.argv[2] ?? process.env.JEKYLL_SOURCE ?? "/Users/sameer/Development/personal/cricketsamya.github.io";
  const destRoot = process.cwd();

  if (!fssync.existsSync(sourceRoot)) {
    throw new Error(`Source root not found: ${sourceRoot}`);
  }

  const postsCount = await migratePosts({ sourceRoot, destRoot });
  await migrateAssets({ sourceRoot, destRoot });

  // eslint-disable-next-line no-console
  console.log(`Migrated ${postsCount} posts from ${sourceRoot}`);
}

await main();

