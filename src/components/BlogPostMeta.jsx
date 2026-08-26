import { Box } from '@mui/material';
import { tokens } from '../theme';

const stripSx = {
  fontFamily: tokens.mono,
  fontSize: 12,
  color: tokens.fg3,
  letterSpacing: '0.04em',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '10px',
  mb: '24px',
  pb: '16px',
  borderBottom: `1px solid ${tokens.line}`,
};

const sepSx = {
  color: tokens.line2,
};

const tagsRowSx = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
};

const chipSx = {
  display: 'inline-block',
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.fg2,
  letterSpacing: '0.04em',
  padding: '2px 8px',
  border: `1px solid ${tokens.line}`,
  borderRadius: '4px',
  background: tokens.bg2,
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

const BlogPostMeta = ({ author, date, readingTime, tags = [] }) => (
  <Box sx={stripSx}>
    {author ? <Box component="span">{author}</Box> : null}
    {author && date ? <Box component="span" sx={sepSx}>·</Box> : null}
    {date ? <Box component="span">{formatDate(date)}</Box> : null}
    {(author || date) && readingTime ? <Box component="span" sx={sepSx}>·</Box> : null}
    {readingTime ? <Box component="span">{readingTime} min read</Box> : null}
    {tags && tags.length > 0 ? (
      <>
        <Box component="span" sx={sepSx}>·</Box>
        <Box sx={tagsRowSx}>
          {tags.map((tag) => (
            <Box key={tag} component="span" sx={chipSx}>{tag}</Box>
          ))}
        </Box>
      </>
    ) : null}
  </Box>
);

export default BlogPostMeta;
