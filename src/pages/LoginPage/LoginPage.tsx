import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertColor, Box, Button, Snackbar, TextField } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/login-img.svg';
import { auth } from '../../helpers/firebase';
import { supabase } from '../../supabase';
import { LoginSchema, loginSchema } from './variables';

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate('/');
  });

  const [toast, setToast] = useState({
    message: '',
    type: 'success' as AlertColor,
    isVisible: false,
  });

  const handleClose = () => setToast({ ...toast, isVisible: false });

  const handleOpen = (toastInfo: typeof toast) => setToast({ ...toastInfo });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      const user = (await supabase.auth.getUser()).data.user;
      const isVerified = user?.email_confirmed_at;

      if (!isVerified)
        handleOpen({ isVisible: true, message: 'Please verify your email', type: 'error' });
      else navigate('/', { replace: true });
    } catch (error) {
      handleOpen({ isVisible: true, message: 'Error when logging in', type: 'error' });
    }
  };

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
        <Box component={'h1'}>Login</Box>
        <Box
          component={'form'}
          display={'flex'}
          flexDirection={'column'}
          gap={'15px'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name='email'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                error={!!errors['email']}
                helperText={errors['email']?.message}
                label='Email'
                type='email'
                {...field}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                error={!!errors['password']}
                helperText={errors['password']?.message}
                label='Password'
                type='password'
                {...field}
              />
            )}
          />

          <Box>
            <Button variant='contained' type='submit'>
              Login
            </Button>
          </Box>
          <Box component={'p'}>
            Don't have an account? Please register <Link to={'/registration'}>here</Link> so you can
            use the application.
          </Box>
        </Box>
      </Box>
      <Box component={'img'} src={loginImg} width={'400px'}></Box>
      <Snackbar
        open={toast.isVisible}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toast.type} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
