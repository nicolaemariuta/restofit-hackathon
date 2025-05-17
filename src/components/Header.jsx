import React from 'react';
import logo from '../assets/RestorArk.png'; 

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-green-600 text-white px-6 py-4 flex items-center gap-4 shadow-md z-50">
      <img src={logo} alt="RestoFit Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-extrabold">RestoFit</h1>
    </header>
  );
};

export default Header;