import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState([]);
  let { link } = router.query;
  link = link.replace('&', '%26');

  // const { data, error } = useSWR(
  //   `http://localhost:6565/v1/getdpimsinfo?dpims=${link}`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   }
  // );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://multi.calypsocloud.one/v1/getdpimsinfo?dpims=${link}`
      );
      const data = await response.json();
      setData(data);
    };
    fetchData().catch((err) => {
      setData([]);
      console.log(err);
    });
  }, []);

  // if (error) return <div>failed to load</div>;
  if (data.length === 0) {
    return (
      <Container maxWidth='sm'>
        <Box sx={{ my: 18 }}>
          <Box
            sx={{
              width: '350',
            }}
          >
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Link href='/' color='secondary'>
          Go back
        </Link>
        <Typography variant='h4' component='h1' gutterBottom>
          Info Page
        </Typography>
        {data.exactInfo.map((item) => (
          <>
            <Typography variant='body1' gutterBottom>
              Nama: {item.nama}
            </Typography>
            <Typography variant='body1' gutterBottom>
              MDC Number: {item.registrationNo}
            </Typography>
            <Typography variant='body1' gutterBottom>
              Date of Registration: {item.dateOfRegistration}
            </Typography>
            <Typography variant='body1' gutterBottom>
              Category: {item.category}
            </Typography>
            <Typography variant='body1' gutterBottom>
              Qualification: {item.qualification}
            </Typography>
            <Typography variant='body1' gutterBottom>
              Practising Address: {item.practisingAddress}
            </Typography>
          </>
        ))}
        <Copyright />
      </Box>
    </Container>
  );
}
