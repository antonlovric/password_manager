import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('login');
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box component={'div'} display={'flex'} justifyContent={'center'}>
      <h1>You have successfully verified your email. You will be redirected to the login page</h1>
    </Box>
  );
};

export default VerificationPage;
