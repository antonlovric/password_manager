import loginImg from '../../assets/login-img.svg';
import { Box, Button, TextField } from '@mui/material';
import { LoginSchema, loginSchema } from './variables';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../helpers/firebase';

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    const res = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log(res);
  };

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'50px'}>
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
    </Box>
  );
};

export default LoginPage;
