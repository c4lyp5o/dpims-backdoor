import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Box } from '@mui/material';

export default function Copyright() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='body2' color='text.secondary' align='center'>
        {'Copyright © '}
        <MuiLink color='inherit' href='https://calypsocloud.one/'>
          copyleft
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
