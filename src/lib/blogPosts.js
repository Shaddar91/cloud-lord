import '../polyfills'
import matter from 'gray-matter'

const modules = import.meta.glob('../content/posts/*.md', { as: 'raw', eager: true })

const WORDS_PER_MINUTE = 220

function calcReadingTime(body) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function parseOne(rawContent, fileName) {
  const { data, content } = matter(rawContent)
  const slug = data.slug || fileName.replace(/\.md$/, '')
  const readingTime = data.readingTime ?? calcReadingTime(content)
  return {
    slug,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    hero: data.hero || null,
    author: data.author || 'Tomislav Ivanović',
    readingTime,
    body: content,
  }
}

const posts = Object.entries(modules)
  .map(([path, raw]) => parseOne(raw, path.split('/').pop()))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null
}
