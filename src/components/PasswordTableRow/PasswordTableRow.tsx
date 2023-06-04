import React, { useState } from 'react';
import { ITableRow } from '../../pages/HomePage/HomePage';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { DateTime } from 'luxon';
import SettingsIcon from '@mui/icons-material/Settings';

interface IRow {
  data: ITableRow;
  editHandler: (data: ITableRow) => void | Promise<void>;
  deleteHandler: (data: ITableRow) => void | Promise<void>;
}

const getExpiresIn = (date: string | null) => {
  if (!date) return 0;
  return Math.ceil(DateTime.fromISO(date).diffNow('days').days);
};

const PasswordTableRow = ({ data, editHandler, deleteHandler }: IRow) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsMenuOpen(!isMenuOpen);
    setMenuElement(e.currentTarget);
  };

  const expiresIn = getExpiresIn(data.expiration_date);

  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={toggleMenu}>
          <SettingsIcon />
        </IconButton>
        <Menu open={isMenuOpen} anchorEl={menuElement}>
          <MenuItem onClick={() => editHandler(data)}>Edit</MenuItem>
          <MenuItem onClick={() => deleteHandler(data)}>Remove</MenuItem>
        </Menu>
      </TableCell>
      <TableCell>{data.website}</TableCell>
      <TableCell>{data.username}</TableCell>
      <TableCell>
        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          <span>{isPasswordVisible ? data.password : `******`}</span>
          <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>{expiresIn <= 0 ? 'Password expired!' : `${expiresIn} days`}</TableCell>
    </TableRow>
  );
};

export default PasswordTableRow;
