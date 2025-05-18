import React from 'react';
import logo from '../assets/Garden-for-Good.png';

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-[#81bd27] text-white px-6 py-4 flex items-center gap-4 shadow-md z-50">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Garden For Good Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-extrabold">Garden For Good</h1>
      </div>

      <h2 className="text-lg font-semibold mr-4">Join Community Events!</h2>
    </header>
  );
};

export default Header;