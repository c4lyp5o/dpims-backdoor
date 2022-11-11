import { useRouter } from 'next/router';
import useSWR from 'swr';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Personal() {
  const router = useRouter();
  let { link } = router.query;
  if (link) {
    link = link.replace('&', '%26');
  }

  const { data, error } = useSWR(
    `https://multi.calypsocloud.one/v1/getdpimsinfo?dpims=${link}`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (error) return <div>failed to load</div>;

  return (
    <>
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
    </>
  );
}
