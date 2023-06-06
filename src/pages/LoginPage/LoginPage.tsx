import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/login-img.svg';
import { auth } from '../../helpers/firebase';
import EmailLogin from '../../components/EmailLogin/EmailLogin';
import MagicLinkLogin from '../../components/MagicLinkLogin/MagicLinkLogin';

const LoginPage = () => {
  const [selectedLogin, setSelectedLogin] = useState('0');

  const loginMethods = useMemo(() => [<EmailLogin />, <MagicLinkLogin />], []);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate('/');
  });

  const handleLoginChange = (e: SelectChangeEvent) => {
    setSelectedLogin(e.target.value);
  };

  const loginMethod = useMemo(
    () => loginMethods[parseInt(selectedLogin)],
    [selectedLogin, loginMethods]
  );

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'50px'}
      height={'100vh'}
      flexDirection={'row'}
    >
      {auth.currentUser && <Navigate to={'/'} />}
      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box component={'h1'} my={'0px'}>
            Login
          </Box>
          <FormControl>
            <Select onChange={handleLoginChange} value={selectedLogin}>
              <MenuItem value={'0'}>Email and password</MenuItem>
              <MenuItem value={'1'}>Magic Link</MenuItem>
            </Select>
            <FormHelperText>Login method</FormHelperText>
          </FormControl>
        </Box>
        {loginMethod}
      </Box>
      <Box component={'img'} src={loginImg} width={'400px'}></Box>
    </Box>
  );
};

export default LoginPage;
