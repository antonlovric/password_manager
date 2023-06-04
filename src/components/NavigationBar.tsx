import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsOpen(!isOpen);
    setMenuElement(e.currentTarget);
  };

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
          <IconButton
            onClick={toggleMenu}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            <Menu open={isOpen} anchorEl={menuElement}>
              <MenuItem>Home</MenuItem>
              <MenuItem>Password health checker</MenuItem>
            </Menu>
          </IconButton>
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
