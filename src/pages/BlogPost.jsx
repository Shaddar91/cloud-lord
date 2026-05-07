import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

import { getPostBySlug } from '../lib/blogPosts';
import { flushEmotionStyles } from '../lib/flushEmotionStyles';
import BlogPostMeta from '../components/BlogPostMeta';
import { tokens } from '../theme';

const SITE_ORIGIN = 'https://cloud-lord.com';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/cloud-lord-og.png`;

const notFoundWrapSx = {
  py: { xs: '80px', md: '120px' },
  textAlign: 'center',
};

const notFoundTitleSx = {
  fontFamily: tokens.display,
  fontWeight: 600,
  fontSize: 'clamp(28px, 3.2vw, 40px)',
  letterSpacing: '-0.02em',
  color: tokens.fg,
  m: 0,
  mb: '16px',
};

const notFoundBodySx = {
  color: tokens.fg2,
  fontSize: 16,
  m: 0,
  mb: '28px',
};

const notFoundLinkSx = {
  fontFamily: tokens.mono,
  fontSize: 13,
  padding: '12px 18px',
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: tokens.fg,
  border: `1px solid ${tokens.line2}`,
  textDecoration: 'none',
  transition: 'border-color 120ms ease, color 120ms ease',
  '&:hover': { borderColor: tokens.accent, color: tokens.accent },
};

const headerSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
  gap: { xs: '16px', sm: '64px' },
  mb: { xs: '32px', sm: '48px' },
  alignItems: 'start',
};

const tagStripSx = {
  fontFamily: tokens.mono,
  fontSize: 12,
  color: tokens.fg3,
  letterSpacing: '0.04em',
  pt: '8px',
};

const titleSx = {
  fontFamily: tokens.display,
  fontWeight: 600,
  fontSize: 'clamp(32px, 4.2vw, 52px)',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  m: 0,
  mb: '20px',
  color: tokens.fg,
};

const heroWrapSx = {
  maxWidth: '800px',
  mx: 'auto',
  mb: '40px',
  borderRadius: '10px',
  overflow: 'hidden',
  border: `1px solid ${tokens.line}`,
};

const heroImgSx = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const articleSx = {
  maxWidth: '720px',
  mx: 'auto',
  fontFamily: tokens.body,
  color: tokens.fg2,
  fontSize: '16.5px',
  lineHeight: 1.75,
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: `1px solid ${tokens.line}`,
    display: 'block',
    my: '24px',
  },
  '& ul, & ol': {
    pl: '22px',
    my: '20px',
    '& li': { my: '6px' },
  },
  '& blockquote': {
    borderLeft: `3px solid ${tokens.accentDim}`,
    pl: '18px',
    color: tokens.fg3,
    fontStyle: 'italic',
    my: '24px',
    mx: 0,
  },
  '& hr': {
    border: 0,
    borderTop: `1px solid ${tokens.line}`,
    my: '40px',
  },
};

const ctaWrapSx = {
  maxWidth: '720px',
  mx: 'auto',
  mt: '64px',
  pt: '32px',
  borderTop: `1px solid ${tokens.line}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
};

const ctaTextSx = {
  fontFamily: tokens.body,
  fontSize: 16,
  color: tokens.fg2,
  m: 0,
  maxWidth: '58ch',
};

const ctaButtonSx = {
  fontFamily: tokens.mono,
  fontSize: 13,
  padding: '12px 18px',
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: tokens.accent,
  color: tokens.bg,
  textDecoration: 'none',
  border: '1px solid transparent',
  transition: 'background 120ms ease, color 120ms ease',
  '&:hover': { background: tokens.fg, color: tokens.bg },
};

const mdComponents = {
  h2: (props) => (
    <Box
      component="h2"
      sx={{
        fontFamily: tokens.display,
        fontWeight: 600,
        fontSize: 'clamp(24px, 2.4vw, 30px)',
        letterSpacing: '-0.015em',
        lineHeight: 1.2,
        color: tokens.fg,
        m: '56px 0 16px',
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <Box
      component="h3"
      sx={{
        fontFamily: tokens.display,
        fontWeight: 600,
        fontSize: '20px',
        letterSpacing: '-0.01em',
        lineHeight: 1.25,
        color: tokens.fg,
        m: '36px 0 12px',
      }}
      {...props}
    />
  ),
  p: (props) => (
    <Box
      component="p"
      sx={{ color: tokens.fg2, m: '0 0 18px', lineHeight: 1.75 }}
      {...props}
    />
  ),
  a: (props) => (
    <Box
      component="a"
      sx={{
        color: tokens.accent,
        textDecoration: 'none',
        borderBottom: `1px solid ${tokens.accentDim}`,
        transition: 'color 120ms ease, border-color 120ms ease',
        '&:hover': { color: tokens.fg, borderBottomColor: tokens.fg },
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Box
      component="pre"
      sx={{
        background: tokens.bg2,
        border: `1px solid ${tokens.line}`,
        borderRadius: '8px',
        p: '16px 18px',
        overflowX: 'auto',
        fontFamily: tokens.mono,
        fontSize: 13,
        lineHeight: 1.6,
        color: tokens.fg2,
        my: '24px',
      }}
      {...props}
    />
  ),
  code: ({ inline, ...props }) =>
    inline ? (
      <Box
        component="code"
        sx={{
          fontFamily: tokens.mono,
          fontSize: '0.9em',
          background: tokens.bg2,
          border: `1px solid ${tokens.line}`,
          borderRadius: '4px',
          padding: '1px 6px',
          color: tokens.fg,
        }}
        {...props}
      />
    ) : (
      <Box
        component="code"
        sx={{
          fontFamily: tokens.mono,
          fontSize: 13,
          color: tokens.fg2,
          background: 'transparent',
        }}
        {...props}
      />
    ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    flushEmotionStyles();
    document.dispatchEvent(new Event('render-event'));
  }, [slug]);

  if (!post) {
    return (
      <Container maxWidth="md" sx={notFoundWrapSx}>
        <Helmet>
          <title>Post not found &mdash; Cloud Lord</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Box component="h1" sx={notFoundTitleSx}>Post not found</Box>
        <Box component="p" sx={notFoundBodySx}>
          The post you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </Box>
        <Box component={RouterLink} to="/blog" sx={notFoundLinkSx}>
          &larr; Back to writing
        </Box>
      </Container>
    );
  }

  const canonicalUrl = `${SITE_ORIGIN}/blog/${post.slug}`;
  const heroAbsoluteUrl = post.hero ? `${SITE_ORIGIN}${post.hero}` : DEFAULT_OG_IMAGE;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    image: heroAbsoluteUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Cloud Lord',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/cloud-lord-logo.svg`,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} — Cloud Lord`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={heroAbsoluteUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="article:published_time" content={post.date} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Box
        component="article"
        sx={{
          py: { xs: '56px', md: '80px' },
          borderBottom: `1px solid ${tokens.line}`,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}
        >
          <Box sx={headerSx}>
            <Box sx={tagStripSx}>
              <Box component="b" sx={{ color: tokens.accent, fontWeight: 500 }}>04</Box> / blog
            </Box>
            <Box>
              <Box component="h1" sx={titleSx}>{post.title}</Box>
              <BlogPostMeta
                author={post.author}
                date={post.date}
                readingTime={post.readingTime}
                tags={post.tags}
              />
            </Box>
          </Box>

          {post.hero ? (
            <Box sx={heroWrapSx}>
              <Box
                component="img"
                src={post.hero}
                alt=""
                loading="lazy"
                sx={heroImgSx}
              />
            </Box>
          ) : null}

          <Box sx={articleSx}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus]}
              components={mdComponents}
            >
              {post.body}
            </ReactMarkdown>
          </Box>

          <Box sx={ctaWrapSx}>
            <Box component="p" sx={ctaTextSx}>
              If you&rsquo;re building or running a stack like this, I take a small
              number of consulting engagements per quarter.
            </Box>
            <Box component="a" href="/#contact" sx={ctaButtonSx}>
              Get in touch &rarr;
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;
