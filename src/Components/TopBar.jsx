// components/TopBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">Logo</div>
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faBell} className="text-gray-600" />
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;