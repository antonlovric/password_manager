import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertColor, Box, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { REDIRECT_URL } from '../../helpers/variables';
import { supabase } from '../../supabase';
import { MagicLinkSchema, magicLinkSchema } from './variables';

const MagicLinkLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MagicLinkSchema>({ resolver: zodResolver(magicLinkSchema) });

  const [toast, setToast] = useState({
    message: '',
    type: 'success' as AlertColor,
    isVisible: false,
  });

  const handleClose = () => setToast({ ...toast, isVisible: false });

  const handleOpen = (toastInfo: typeof toast) => setToast({ ...toastInfo });
  const onSubmit = async (data: MagicLinkSchema) => {
    try {
      const res = await supabase.auth.signInWithOtp({
        email: data.email,
        options: { shouldCreateUser: false, emailRedirectTo: REDIRECT_URL },
      });
      if (res.error) handleOpen({ isVisible: true, message: res.error.message, type: 'error' });
    } catch (error) {
      handleOpen({ isVisible: true, message: 'Error when logging in', type: 'error' });
    }
  };

  return (
    <>
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
    </>
  );
};

export default MagicLinkLogin;
