import { Suspense } from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';

import Personal from '../src/personal';

export default function Info() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Link href='/' color='secondary'>
          Go back
        </Link>
        <Typography variant='h4' component='h1' gutterBottom>
          Info Page
        </Typography>
        <Suspense
          fallback={
            <>
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
            </>
          }
        >
          <Personal />
        </Suspense>
        <Copyright />
      </Box>
    </Container>
  );
}
