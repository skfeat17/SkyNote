import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBarX from './AppBar';   // ✅ Corrected import
import Bottom from './Bottom';     // ✅ Correct

const Layout = () => {
  return (
    <>
      <AppBarX />
      <Outlet />
      <Bottom />
    </>
  );
};

export default Layout;
