import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { auth, database } from '../../helpers/firebase';
import { child, get, getDatabase, onValue, ref, set } from 'firebase/database';

const HomePage = () => {
  const headerCells: readonly string[] = [
    'Website',
    'URL',
    'Email / Username',
    'Password',
    'Days until Expiry',
  ];

  const handleAddPassword = async () => {};

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Home</h1>
      </Box>
      <Box sx={{ px: '50px' }}>
        <Button onClick={handleAddPassword}>Add new password</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headerCells.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default HomePage;
