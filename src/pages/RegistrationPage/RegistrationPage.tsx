import { Alert, AlertColor, Box, Button, Snackbar, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { RegistrationSchema, schema } from './variables';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { auth } from '../../helpers/firebase';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { REDIRECT_URL } from '../../helpers/variables';

const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchema>({ resolver: zodResolver(schema) });
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as AlertColor,
    isVisible: false,
  });
  const handleClose = () => setToast({ ...toast, isVisible: false });
  const handleOpen = (toastInfo: typeof toast) => setToast({ ...toastInfo });

  const onSubmit = async (data: RegistrationSchema) => {
    try {
      const res = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        phone: data.phoneNumber,
        options: { emailRedirectTo: REDIRECT_URL },
      });

      if (!res.error) {
        await supabase
          .from('users')
          .insert([
            {
              id: res.data.user?.id,
              first_name: data.firstName,
              last_name: data.lastName,
              phone_number: data.phoneNumber,
              email: data.email,
            },
          ])
          .single();
      } else {
        handleOpen({ isVisible: true, message: res.error.message, type: 'error' });
      }

      handleOpen({
        isVisible: true,
        message: 'Registration successful! Please follow the instructions you received via email!',
        type: 'success',
      });
    } catch (error) {
      handleOpen({
        isVisible: true,
        message: 'There has been an error, please try again',
        type: 'error',
      });
    }
  };

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'}>
      {auth.currentUser && <Navigate to={'/'} />}
      <Box component={'h1'} textAlign={'center'}>
        Registration
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
        }}
        component={'form'}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='firstName'
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextField
              error={!!errors['firstName']}
              helperText={errors['firstName']?.message}
              label='First name'
              {...field}
              style={{ maxWidth: '350px', width: '350px' }}
            />
          )}
        />

        <Controller
          name='lastName'
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextField
              error={!!errors['lastName']}
              helperText={errors['lastName']?.message}
              label='Last name'
              {...field}
              style={{ maxWidth: '350px', width: '350px' }}
            />
          )}
        />

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
              style={{ maxWidth: '350px', width: '350px' }}
            />
          )}
        />

        <Controller
          name='phoneNumber'
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextField
              error={!!errors['phoneNumber']}
              helperText={errors['phoneNumber']?.message}
              label='Phone number'
              {...field}
              style={{ maxWidth: '350px', width: '350px' }}
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
              style={{ maxWidth: '350px', width: '350px' }}
              {...field}
            />
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextField
              error={!!errors['confirmPassword']}
              helperText={errors['confirmPassword']?.message}
              label='Confirm Password'
              type='password'
              {...field}
              style={{ maxWidth: '350px', width: '350px' }}
            />
          )}
        />

        <Box>
          <Button variant='contained' type='submit'>
            Register
          </Button>
        </Box>
        <Box component={'p'}>
          Have an account? Proceed to <Link to={'/login'}>Login</Link>.
        </Box>
      </Box>
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

export default Registration;
