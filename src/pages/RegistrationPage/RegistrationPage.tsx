import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { RegistrationSchema, schema } from './variables';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';

const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchema>({ resolver: zodResolver(schema) });

  const onSubmit = (data: RegistrationSchema) => {
    createUserWithEmailAndPassword(auth, data.email, data.password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
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
          />
        )}
      />

      <Button variant='contained' type='submit'>
        Register
      </Button>
    </Box>
  );
};

export default Registration;
