import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import { getAllPosts } from '../lib/blogPosts';
import BlogCard from '../components/BlogCard';
import SectionHead from '../components/SectionHead';
import { tokens } from '../theme';

const BlogIndex = () => {
  const posts = getAllPosts();

  useEffect(() => {
    document.dispatchEvent(new Event('render-event'));
  }, []);

  return (
    <>
      <Helmet>
        <title>Writing &mdash; Cloud Lord</title>
        <meta
          name="description"
          content="Engineering notes from running an AI consultancy stack. AWS platform engineering, automation, and AI enablement, written by Tomislav Ivanović."
        />
        <link rel="canonical" href="https://cloud-lord.com/blog" />
        <meta property="og:title" content="Writing &mdash; Cloud Lord" />
        <meta
          property="og:description"
          content="Engineering notes from running an AI consultancy stack."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cloud-lord.com/blog" />
      </Helmet>

      <Box
        component="section"
        id="blog-index"
        sx={{
          py: { xs: '56px', md: '80px' },
          borderBottom: `1px solid ${tokens.line}`,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}
        >
          <SectionHead
            tagNumber="04"
            tagLabel="blog"
            title="writing"
            subtitle="engineering notes from running an AI consultancy stack"
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: '20px',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogIndex;
