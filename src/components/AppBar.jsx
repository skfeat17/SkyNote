import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarX = () => {
  const statusBarColor = "#1976d2"; // match your AppBar color

  useEffect(() => {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute("content", statusBarColor);
  }, []);

  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: statusBarColor }}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          sx={{ textAlign: "center", width: "100%" }}
          color="inherit"
        >
          SkyNote
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarX;
