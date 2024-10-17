import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faFileAlt, faUsers, faInbox, faChartBar, faCog, faSignOutAlt, 
  faSearch, faBell, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const DashLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarItems = [
    { icon: faHome, text: 'Dashboard', link: '/dashboard' },
    { icon: faFileAlt, text: 'Content Manager', link: '/content-management' },
    { icon: faUsers, text: 'Team', link: '/team' },
    { icon: faInbox, text: 'Inbox', link: '/inbox' },
    { icon: faChartBar, text: 'Statistics', link: '/statistics' },
    { icon: faCog, text: 'Settings', link: '/settings' },
    { icon: faSignOutAlt, text: 'Logout', link: '/logout' },
  ];

  return (
    <div className="h-screen flex flex-col relative">
      {/* Top bar */}
      <div className="h-2/5 bg-gray-300 z-10 sticky top-0">
        <nav className="h-full flex items-start justify-between px-4 pt-4 rounded-r-lg">
          <div className="text-gray-800 text-2xl font-bold">Social Media Tool</div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600"><FontAwesomeIcon icon={faSearch} /></button>
            <button className="text-gray-600"><FontAwesomeIcon icon={faBell} /></button>
            <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="User avatar" />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex absolute inset-0 pt-16 ml-2">
        {/* Sidebar */}
        <div className={`bg-gray-800 text-white rounded-r-xl z-20 shadow-lg sticky top-5 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>
          <div className="flex flex-col pt-4">
            {sidebarItems.map((item, index) => (
              <Link key={index} to={item.link} className={`flex items-center px-4 py-2 ${item.text === 'Content Manager' ? 'bg-gray-700' : ''}`}>
                <FontAwesomeIcon icon={item.icon} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                {!isCollapsed && <span>{item.text}</span>}
              </Link>
            ))}
          </div>
          <button 
            onClick={toggleSidebar} 
            className="absolute bottom-4 right-0 transform translate-x-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-2 bg-gray-50 rounded-t-lg z-20 shadow-lg mr-2 p-6 overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashLayout;