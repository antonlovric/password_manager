import { zodResolver } from '@hookform/resolvers/zod';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Modal,
  Fade,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddPasswordSchema, addPasswordSchema } from '../../pages/HomePage/variables';

interface IPasswordModal {
  submit: (data: any) => Promise<void>;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  initialData?: AddPasswordSchema;
}

const PasswordModal = ({ submit, isVisible, setIsVisible, initialData }: IPasswordModal) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const isEditing = !!initialData;
  const togglePassword = () => setIsPasswordShown(!isPasswordShown);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddPasswordSchema>({
    resolver: zodResolver(addPasswordSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue('password', initialData?.password);
      setValue('username', initialData?.username);
      setValue('website', initialData?.website);
    }
  }, [initialData]);

  const closeModal = () => setIsVisible(false);

  return (
    <Modal
      component={'form'}
      onSubmit={handleSubmit(submit)}
      open={isVisible}
      onClose={closeModal}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isVisible}>
        <Box
          bgcolor={'#12143b'}
          position={'absolute'}
          left={'50%'}
          right={'50%'}
          padding={'20px'}
          borderRadius={'15px'}
          sx={{ transform: 'translate(-50%, -50%)' }}
          display={'flex'}
          width={'40%'}
          top={'50%'}
          flexDirection={'column'}
          gap={'30px'}
        >
          <h2>{isEditing ? 'Edit password' : 'Add password'}</h2>
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
                      <IconButton onClick={togglePassword}>
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
              {isEditing ? 'Edit' : 'Add'}
            </Button>
            <Button variant='contained' onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PasswordModal;
