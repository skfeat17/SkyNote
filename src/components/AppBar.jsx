import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarX = () => {
  return (
    <AppBar position="fixed" sx={{top:0}}>
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }} color="inherit">
          SkyNote
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarX;
