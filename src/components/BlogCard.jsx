import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../theme';

const wrapperSx = {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  height: '100%',
};

const cardSx = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: tokens.bg,
  border: `1px solid ${tokens.line}`,
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'border-color 160ms ease, transform 160ms ease',
  '&:hover': {
    borderColor: tokens.accentDim,
    transform: 'translateY(-2px)',
  },
};

const heroSx = {
  aspectRatio: '16 / 9',
  width: '100%',
  display: 'block',
  objectFit: 'cover',
  borderBottom: `1px solid ${tokens.line}`,
};

const heroPlaceholderSx = {
  aspectRatio: '16 / 9',
  width: '100%',
  borderBottom: `1px solid ${tokens.line}`,
  background: `linear-gradient(135deg, color-mix(in oklab, ${tokens.accent} 8%, ${tokens.bg2}) 0%, ${tokens.bg2} 60%, ${tokens.bg3} 100%)`,
};

const bodySx = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  p: '24px',
};

const dateSx = {
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.fg3,
  letterSpacing: '0.04em',
  textTransform: 'lowercase',
  mb: '12px',
};

const titleSx = {
  fontFamily: tokens.display,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: '-0.015em',
  lineHeight: 1.2,
  color: tokens.fg,
  m: 0,
  mb: '10px',
};

const excerptSx = {
  fontFamily: tokens.body,
  fontSize: '14.5px',
  lineHeight: 1.6,
  color: tokens.fg2,
  m: 0,
  mb: '20px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const footSx = {
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.fg3,
  letterSpacing: '0.04em',
  display: 'flex',
  gap: '10px',
  mt: 'auto',
  pt: '12px',
  borderTop: `1px solid ${tokens.line}`,
};

const sepSx = {
  color: tokens.line2,
};

const formatDate = (value) => {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const BlogCard = ({ post }) => {
  const { slug, title, date, excerpt, hero, author, readingTime } = post;

  return (
    <Box
      component={RouterLink}
      to={`/blog/${slug}`}
      data-track="blog-card-click"
      sx={wrapperSx}
    >
      <Box sx={cardSx}>
        {hero ? (
          <Box component="img" src={hero} alt="" sx={heroSx} loading="lazy" />
        ) : (
          <Box sx={heroPlaceholderSx} aria-hidden="true" />
        )}
        <Box sx={bodySx}>
          <Box sx={dateSx}>&rarr; {formatDate(date)}</Box>
          <Box component="h3" sx={titleSx}>{title}</Box>
          {excerpt ? <Box component="p" sx={excerptSx}>{excerpt}</Box> : null}
          <Box sx={footSx}>
            <Box component="span">{readingTime} min read</Box>
            <Box component="span" sx={sepSx}>·</Box>
            <Box component="span">{author}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCard;
