import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getDpimsData = async () => {
    setResults([]);
    setLoading(true);
    const url = `http://localhost:6565/v1/getdpims?nama=${search}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          getDpimsData().then((data) => {
            setResults(data.matches);
            setLoading(false);
            setOpen(true);
          });
        }}
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
            onClick={() => {
              getDpimsData().then((data) => {
                setResults(data.matches);
                setLoading(false);
                setOpen(true);
              });
            }}
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
        </div>
        {loading ? (
          <Box
            sx={{
              width: '350',
            }}
          >
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
            <Skeleton animation='wave' />
          </Box>
        ) : null}
      </Box>
      {results.length > 0 ? (
        <TableContainer component={Paper}>
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
    </>
  );
}
