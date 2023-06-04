import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddPasswordSchema } from './variables';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { supabase } from '../../supabase';
import EditIcon from '@mui/icons-material/Edit';
import { DateTime } from 'luxon';
import PasswordModal from '../../components/PasswordModal/PasswordModal';
interface ITableRow {
  website: string;
  username: string;
  password: string;
  expiration_date: string;
}

const HomePage = () => {
  const headerCells: readonly string[] = [
    '',
    'Name',
    'Email / Username',
    'Password',
    'Days until Expiry',
  ];

  const [data, setData] = useState<ITableRow[]>([]);
  const [editData, setEditData] = useState<ITableRow>();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleTablePasswords, setVisibleTablePasswords] = useState<number[]>([]);

  const addVisiblePassword = (index: number) => {
    setVisibleTablePasswords([...visibleTablePasswords, index]);
  };
  const removeVisiblePassword = (index: number) =>
    setVisibleTablePasswords(visibleTablePasswords.filter((password) => password !== index));

  const isVisiblePassword = (index: number) => visibleTablePasswords.includes(index);

  const handleAddPassword = async () => {
    setIsVisible(true);
  };

  const getExpirationDate = () => {
    return DateTime.now().plus({ days: 30 }).toISO();
  };

  const getExpiresIn = (date: string | null) => {
    if (!date) return 'Invalid date';
    return Math.ceil(DateTime.fromISO(date).diffNow('days').days);
  };

  const fetchData = async () => {
    const res = await supabase
      .from('passwords')
      .select('website,username,password,expiration_date');
    setData(res.data || []);
  };

  const onSubmitPassword = async (data: AddPasswordSchema) => {
    const userInfo = await supabase.auth.getUser();
    const expirationDate = getExpirationDate();

    await supabase.from('passwords').insert([
      {
        password: data.password,
        username: data.username,
        website: data.website,
        expiration_date: expirationDate,
        user_id: userInfo.data.user?.id,
      },
    ]);
    fetchData();
    setIsVisible(false);
  };

  useEffect(() => {
    !isVisible && setEditData(undefined);
  }, [isVisible]);

  const editPassword = (row: ITableRow) => {
    console.log(row);
    setEditData(row);
    setIsVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePassword = (index: number) => {
    const isVisible = visibleTablePasswords.includes(index);
    isVisible ? removeVisiblePassword(index) : addVisiblePassword(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Home</h1>
      </Box>
      <Box sx={{ px: '50px' }}>
        <Button variant='contained' onClick={handleAddPassword}>
          Add new password
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headerCells.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton onClick={() => editPassword(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.website}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>
                    <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                      <span>{isVisiblePassword(index) ? row.password : `******`}</span>
                      <IconButton onClick={() => togglePassword(index)}>
                        {isVisiblePassword(index) ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{getExpiresIn(row.expiration_date)} days</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <PasswordModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        submit={onSubmitPassword}
        initialData={editData}
      />
    </>
  );
};

export default HomePage;
