import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const POSTS_DIR = join(ROOT, 'src', 'content', 'posts')
const DIST_DIR = join(ROOT, 'dist')
const SITE_ORIGIN = 'https://cloud-lord.com'
const FEED_LIMIT = 20

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(date) {
  return new Date(date).toUTCString()
}

function toIsoDate(date) {
  const d = new Date(date)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function loadPosts() {
  if (!existsSync(POSTS_DIR)) return []
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), 'utf8')
      const { data } = matter(raw)
      const slug = data.slug || file.replace(/\.md$/, '')
      return {
        slug,
        title: data.title || slug,
        date: data.date,
        excerpt: data.excerpt || '',
        hero: data.hero || null,
      }
    })
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function buildRss(posts) {
  const items = posts.slice(0, FEED_LIMIT).map((post) => {
    const link = `${SITE_ORIGIN}/blog/${post.slug}`
    const media = post.hero
      ? `\n      <media:content url="${escapeXml(SITE_ORIGIN + post.hero)}" />`
      : ''
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>${media}
    </item>`
  }).join('\n')

  const lastBuild = posts.length ? toRfc822(posts[0].date) : toRfc822(new Date())

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cloud Lord</title>
    <link>${SITE_ORIGIN}</link>
    <description>Posts from cloud-lord.com</description>
    <language>en-us</language>
    <atom:link href="${SITE_ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

function buildSitemap(posts) {
  const staticUrls = ['/', '/privacy', '/blog']
  const today = toIsoDate(new Date())
  const staticEntries = staticUrls.map((path) => `  <url>
    <loc>${SITE_ORIGIN}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')

  const postEntries = posts.map((post) => `  <url>
    <loc>${SITE_ORIGIN}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${toIsoDate(post.date)}</lastmod>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>
`
}

function main() {
  mkdirSync(DIST_DIR, { recursive: true })
  const posts = loadPosts()

  const feed = buildRss(posts)
  writeFileSync(join(DIST_DIR, 'feed.xml'), feed, 'utf8')

  const sitemap = buildSitemap(posts)
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf8')

  console.log(`Wrote dist/feed.xml (${Math.min(posts.length, FEED_LIMIT)} items)`)
  console.log(`Wrote dist/sitemap.xml (${posts.length + 3} urls)`)
}

main()
