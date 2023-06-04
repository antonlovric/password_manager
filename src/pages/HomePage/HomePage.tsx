import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddPasswordSchema } from './variables';
import { supabase } from '../../supabase';
import { DateTime } from 'luxon';
import PasswordModal from '../../components/PasswordModal/PasswordModal';
import PasswordTableRow from '../../components/PasswordTableRow/PasswordTableRow';
import PasswordSecurityModal from '../../components/PasswordSecurityModal/PasswordSecurityModal';
export interface ITableRow {
  website: string;
  username: string;
  password: string;
  expiration_date: string;
  id: number;
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
  const [isSecurityVisible, setIsSecurityVisible] = useState(false);

  const handleAddPassword = async () => {
    setIsVisible(true);
  };

  const getExpirationDate = () => {
    return DateTime.now().plus({ days: 30 }).toISO();
  };

  const fetchData = async () => {
    const res = await supabase
      .from('passwords')
      .select('website,username,password,expiration_date,id');
    setData(res.data || []);
  };

  const onSubmitPassword = async (data: AddPasswordSchema) => {
    const userInfo = await supabase.auth.getUser();
    const expirationDate = getExpirationDate();

    if (editData) {
      await supabase
        .from('passwords')
        .update({
          password: data.password,
          username: data.username,
          website: data.website,
          expiration_date: expirationDate,
        })
        .eq('id', editData.id);
    } else {
      await supabase.from('passwords').insert([
        {
          password: data.password,
          username: data.username,
          website: data.website,
          expiration_date: expirationDate,
          user_id: userInfo.data.user?.id,
        },
      ]);
    }

    fetchData();
    setIsVisible(false);
  };

  useEffect(() => {
    !isVisible && setEditData(undefined);
  }, [isVisible]);

  const editPassword = (row: ITableRow) => {
    setEditData(row);
    setIsVisible(true);
  };

  const deletePassword = async (row: ITableRow) => {
    await supabase.from('passwords').delete().eq('id', row.id);
    fetchData();
  };

  const handleSecurityCheck = () => {
    setIsSecurityVisible(true);
  };

  const closeSecurityModal = () => setIsSecurityVisible(false);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Password Manager</h1>
      </Box>
      <Box sx={{ px: '50px' }}>
        <Box display={'flex'} justifyContent={'space-between'} mb={'30px'}>
          <Button variant='contained' onClick={handleAddPassword}>
            Add new password
          </Button>
          <Button variant='contained' onClick={handleSecurityCheck}>
            Check password security
          </Button>
        </Box>
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
                <PasswordTableRow
                  data={row}
                  deleteHandler={deletePassword}
                  editHandler={editPassword}
                  key={index}
                />
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
      <PasswordSecurityModal isVisible={isSecurityVisible} closeModal={closeSecurityModal} />
    </>
  );
};

export default HomePage;
