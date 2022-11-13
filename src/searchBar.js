import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const getDpimsData = async (way) => {
    let query;
    setResults([]);
    setLoading(true);
    const url = `https://multi.calypsocloud.one/v1/getdpims?nama=${search}`;
    const page = (direction) =>
      `https://multi.calypsocloud.one/v1/getdpims?nama=${search}&pageNum=${direction}&pageSize=${pages[0].result}`;
    if (!way) {
      query = url;
    }
    if (way === 'next') {
      query = page(pages[0].next);
    }
    if (way === 'prev') {
      query = page(pages[0].prev);
    }
    const response = await fetch(query);
    const data = await response.json();
    return data;
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getDpimsData()
      .then((data) => {
        setResults(data.matches);
        if (data.pages) {
          setPages(data.pages);
        }
        setLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOpenError(true);
      });
  };

  const getPage = async (way) => {
    setLoading(true);
    getDpimsData(way)
      .then((data) => {
        setResults(data.matches);
        if (data.pages) {
          setPages(data.pages);
        }
        setLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOpenError(true);
      });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { mt: 1 },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            label='Nama Pegawai'
            id='filled-start-adornment'
            sx={{ m: 1, width: '80%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>Dr.</InputAdornment>
              ),
            }}
            variant='filled'
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1, width: '10%' }}
            onClick={handleSubmit}
          >
            Search
          </Button>
          <Snackbar onClose={handleClose} open={open} autoHideDuration={6000}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Found {results.length} entries!
            </Alert>
          </Snackbar>
          <Snackbar
            onClose={handleClose}
            open={openError}
            autoHideDuration={6000}
          >
            <Alert
              onClose={handleClose}
              severity='error'
              sx={{ width: '100%' }}
            >
              No data could be found! Network error?
            </Alert>
          </Snackbar>
        </div>
        {loading ? (
          <Box
            sx={{
              width: '350',
              mt: 2,
            }}
          >
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
          </Box>
        ) : null}
      </Box>
      {results.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 300 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>No.</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell align='right'>No MDC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow
                  key={row.no}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>{row.no}</TableCell>
                  <TableCell component='th' scope='row'>
                    <Link href={`/${row.link}`}>{row.nama}</Link>
                  </TableCell>
                  <TableCell align='right'>{row.nomborMdc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      {results.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Stack spacing={2} direction='row'>
            {pages[0].next <= pages[0].endpage && pages[0].next !== 1 ? (
              <Button variant='outlined' onClick={(e) => getPage('prev')}>
                Prev
              </Button>
            ) : (
              <Button variant='outlined' disabled>
                Prev
              </Button>
            )}
            <Typography variant='body2' color='text.secondary'>
              {pages[0].result > 20 ? (
                <span>
                  Page {pages[0].next} of {pages[0].endpage}
                </span>
              ) : null}
            </Typography>
            {pages[0].next !== pages[0].endpage ? (
              <Button variant='outlined' onClick={(e) => getPage('next')}>
                Next
              </Button>
            ) : (
              <Button variant='outlined' disabled>
                Next
              </Button>
            )}
          </Stack>
        </Box>
      ) : null}
    </>
  );
}
