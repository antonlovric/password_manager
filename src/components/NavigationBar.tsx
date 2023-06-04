import { AccountCircle } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import logo from '../assets/logo.png';

const NavigationBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const toggleProfileMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsProfileOpen(!isProfileOpen);
    setMenuElement(e.currentTarget);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };
  return (
    <AppBar position='sticky'>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Toolbar>
          <Box component={'img'} src={logo} height={'70px'} />
        </Toolbar>

        <IconButton
          onClick={toggleProfileMenu}
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <Avatar color='#FFF'>
            <AccountCircle />
          </Avatar>
          <Menu open={isProfileOpen} anchorEl={menuElement}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default NavigationBar;
