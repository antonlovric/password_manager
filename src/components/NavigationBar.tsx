import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { auth } from '../helpers/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsOpen(!isOpen);
    setMenuElement(e.currentTarget);
  };

  const toggleProfileMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsProfileOpen(!isProfileOpen);
    setMenuElement(e.currentTarget);
  };

  const getInitials = () => {
    const name = user?.displayName?.split(' ');
    if (!name) return '';
    const initials = name[0][0] + name[1][0];
    return initials.toUpperCase();
  };

  const handleLogout = async () => {
    await signOut(auth);
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
          <Avatar color='#FFF'>{getInitials()}</Avatar>
          <Menu open={isProfileOpen} anchorEl={menuElement}>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default NavigationBar;
