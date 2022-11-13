import { useRouter } from 'next/router';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
          <Box sx={{ minWidth: 275 }}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5' component='div'>
                  Name: {item.nama}
                </Typography>
                <Typography variant='body2'>
                  MDC Number: {item.registrationNo}
                  <br />
                  Date of Registration: {item.dateOfRegistration}
                  <br />
                  Category: {item.category}
                  <br />
                  Qualification: {item.qualification}
                  <br />
                  Practising Address: {item.practisingAddress}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ))}
    </>
  );
}
