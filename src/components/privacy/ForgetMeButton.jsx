import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { tokens } from '../../theme';

/* F5 stub: real implementation by Component 45 */
const ForgetMeButton = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onConfirm = () => {
    setConfirmOpen(false);
    /* eslint-disable-next-line no-alert */
    alert('TODO F5: wire to Matomo deleteDataSubjects API');
  };

  return (
    <Box
      sx={{
        background: tokens.bg2,
        border: `1px solid ${tokens.line}`,
        borderRadius: '10px',
        p: '24px 26px',
        my: '18px',
      }}
    >
      <Box
        sx={{
          fontFamily: tokens.mono,
          fontSize: 11,
          color: tokens.fg3,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          mb: '14px',
        }}
      >
        // Erase my data
      </Box>
      <Box
        component="p"
        sx={{ m: 0, mb: '14px', color: tokens.fg2, fontSize: 14 }}
      >
        Remove any analytics data associated with this browser from our server. This is immediate and permanent.
      </Box>
      <Button
        onClick={() => setConfirmOpen(true)}
        sx={{
          fontFamily: tokens.mono,
          fontSize: 13,
          padding: '10px 16px',
          background: 'transparent',
          color: tokens.fg,
          border: `1px solid ${tokens.line2}`,
          borderRadius: '6px',
          textTransform: 'none',
          '&:hover': { borderColor: tokens.warn, color: tokens.warn, background: 'transparent' },
        }}
      >
        Forget me on this site
      </Button>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontFamily: tokens.display }}>Erase analytics data?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: tokens.body }}>
            This will delete any analytics records tied to this browser from our server and clear the Matomo cookies here. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={onConfirm} color="secondary">Yes, erase</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ForgetMeButton;
