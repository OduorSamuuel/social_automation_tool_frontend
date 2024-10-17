// components/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileAlt, faUsers, faInbox, faChartLine, faCog, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faSnapchat } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {
  const menuItems = [
    { icon: faChartPie, label: 'Dashboard' },
    { icon: faFileAlt, label: 'Content Manager' },
    { icon: faUsers, label: 'Team' },
    { icon: faInbox, label: 'Inbox' },
    { icon: faChartLine, label: 'Statistics' },
    { icon: faCog, label: 'Settings' },
  ];

  const socialIcons = [
    { icon: faFacebookF, color: 'text-blue-600' },
    { icon: faInstagram, color: 'text-pink-500' },
    { icon: faTiktok, color: 'text-black' },
    { icon: faXTwitter, color: 'text-black' },
    { icon: faSnapchat, color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-6">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 rounded-md">
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-4 py-2">
        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add a page</span>
        </button>
      </div>
      <div className="flex justify-around px-4 py-2">
        {socialIcons.map((item, index) => (
          <a key={index} href="#" className={`${item.color} hover:opacity-75`}>
            <FontAwesomeIcon icon={item.icon} />
          </a>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <a href="#" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-700">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;