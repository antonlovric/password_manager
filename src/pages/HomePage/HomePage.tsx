import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddPasswordSchema, addPasswordSchema } from './variables';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { supabase, theme } from '../../main';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { DateTime } from 'luxon';
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPasswordSchema>({ resolver: zodResolver(addPasswordSchema) });
  const [data, setData] = useState<ITableRow[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [visibleTablePasswords, setVisibleTablePasswords] = useState<number[]>([]);

  const toggleVisibility = () => setIsPasswordShown(!isPasswordShown);

  const addVisiblePassword = (index: number) => {
    setVisibleTablePasswords([...visibleTablePasswords, index]);
  };
  const removeVisiblePassword = (index: number) =>
    setVisibleTablePasswords(visibleTablePasswords.filter((password) => password !== index));

  const isVisiblePassword = (index: number) => visibleTablePasswords.includes(index);

  const handleAddPassword = async () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const getExpirationDate = () => {
    return DateTime.now().plus({ days: 30 }).toISO();
  };

  const getExpiresIn = (date: string | null) => {
    if (!date) return 'Invalid date';
    return Math.ceil(DateTime.fromISO(date).diffNow('days').days);
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
  };

  const fetchData = async () => {
    const res = await supabase
      .from('passwords')
      .select('website,username,password,expiration_date');
    setData(res.data || []);
  };

  const editPassword = (row: ITableRow) => {
    console.log(row);
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
                      <SettingsIcon />
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
      <Modal
        component={'form'}
        onSubmit={handleSubmit(onSubmitPassword)}
        open={isVisible}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isVisible}>
          <Box
            bgcolor={theme.palette.background.paper}
            position={'absolute'}
            left={'50%'}
            right={'50%'}
            padding={'20px'}
            borderRadius={'15px'}
            sx={{ transform: 'translate(-50%, -50%)' }}
            display={'flex'}
            width={'70%'}
            top={'50%'}
            flexDirection={'column'}
            gap={'30px'}
          >
            <h2>Add password</h2>
            <Controller
              name='website'
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  error={!!errors['website']}
                  helperText={errors['website']?.message}
                  label='Website'
                  {...field}
                />
              )}
            />
            <Controller
              name='username'
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  error={!!errors['username']}
                  helperText={errors['username']?.message}
                  label='Username / email'
                  {...field}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <FormControl>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    error={!!errors['password']}
                    // helperText={errors['password']?.message}
                    label='password'
                    type={isPasswordShown ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton onClick={toggleVisibility}>
                          {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                </FormControl>
              )}
            />
            <Box display={'flex'} gap={'15px'} justifyContent={'flex-end'}>
              <Button variant='contained' type='submit'>
                Add
              </Button>
              <Button variant='contained' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HomePage;
