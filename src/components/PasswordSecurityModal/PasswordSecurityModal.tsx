import {
  Modal,
  Fade,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { supabase } from '../../supabase';
import { PASSWORD_REGEX } from '../../pages/RegistrationPage/variables';
import { DateTime } from 'luxon';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IPasswordSecurityModal {
  isVisible: boolean;
  closeModal: () => void;
}

interface IPassword {
  id: number;
  created_at: string;
  updated_at: string;
  password: string;
  user_id: string;
  website: string;
  username: string;
  expiration_date: string;
}

const PasswordSecurityModal = ({ isVisible, closeModal }: IPasswordSecurityModal) => {
  const [isChecked, setIsChecked] = useState(false);
  const [expiredPasswords, setExpiredPasswords] = useState<IPassword[]>();
  const [unsafePasswords, setUnsafePasswords] = useState<IPassword[]>();

  const handleCheck = async () => {
    const data = await supabase.from('passwords').select('*');
    const passwords = data.data as IPassword[];
    const checkedPasswords = passwords.filter(
      (password) => !PASSWORD_REGEX.test(password.password)
    );
    setUnsafePasswords(checkedPasswords);
    const checkedExpiredPasswords = passwords.filter(
      (password) =>
        DateTime.now().startOf('day') < DateTime.fromISO(password.expiration_date).startOf('day')
    );
    setExpiredPasswords(checkedExpiredPasswords);
    setIsChecked(true);
  };

  const SecurityCheck = () => {
    const noExpiredPasswords = expiredPasswords?.length === 0;
    const noUnsafePasswords = unsafePasswords?.length === 0;
    return (
      <Box>
        <Accordion disabled={noExpiredPasswords}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display={'flex'} gap={'30px'}>
              <Typography>Expired passwords</Typography>
              <Typography color={'text.secondary'}>
                {noExpiredPasswords
                  ? 'You have no expired passwords!'
                  : `${expiredPasswords?.length} Expired passwords`}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {expiredPasswords?.map(
              (password) =>
                `Password for ${password.website} expired on ${DateTime.fromISO(
                  password.expiration_date
                ).toFormat('dd/MM/yyyy')}`
            )}
            <Box display={'flex'} alignItems={'center'} gap={'10px'}>
              <InfoIcon />
              <Typography mt={'15px'}>
                You should update your passwords every 30 days to be more safe
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled={noUnsafePasswords}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display={'flex'} gap={'30px'}>
              <Typography>Unsafe passwords</Typography>
              <Typography color={'text.secondary'}>
                {noUnsafePasswords
                  ? 'You have no unsafe passwords!'
                  : `${unsafePasswords?.length} Unsafe passwords`}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {unsafePasswords?.map(
              (password) => `Password for ${password.website} is not safe enough`
            )}
            <Box display={'flex'} alignItems={'center'} gap={'10px'}>
              <InfoIcon />
              <Typography mt={'15px'} color={'text.secondary'}>
                Safe passwords have atleast 10 lowercase or uppercase characters, at least one
                number and one special character
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Box mt={'30px'} display={'flex'} justifyContent={'center'}>
          <Button variant='contained' onClick={handleCheck}>
            Retry security check
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Modal
      component={'div'}
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
          width={'50%'}
          top={'50%'}
        >
          <h2>Security check</h2>
          {isChecked ? (
            <SecurityCheck />
          ) : (
            <Box my={'40px'} display={'flex'} justifyContent={'center'} width={'100%'}>
              <Button variant='contained' onClick={handleCheck}>
                Run security check
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default PasswordSecurityModal;
