import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Home/shared/Navbar/Navbar';
import Footer from '../pages/Home/Home/shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default RootLayout;