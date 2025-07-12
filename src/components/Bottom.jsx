import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sync the selected tab with the current route
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.pathname === '/home') setValue(0);
    else if (location.pathname === '/create') setValue(1);
    else if (location.pathname === '/profile') setValue(2);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/home');
    else if (newValue === 1) navigate('/create');
    else if (newValue === 2) navigate('/profile');
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Notes" icon={<NotesIcon />} />
        <BottomNavigationAction label="Create" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Bottom;
