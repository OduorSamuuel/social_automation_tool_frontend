import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faPuzzlePiece, faChartLine, faUsers, faCalendarAlt, faRocket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext'; // Import AuthContext

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, loading, logout } = useAuth(); // Access loading state from AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const solutions = [
    { name: 'Content Scheduling', icon: faCalendarAlt, link: '/solutions/content-scheduling' },
    { name: 'Analytics', icon: faChartLine, link: '/solutions/analytics' },
    { name: 'Team Collaboration', icon: faUsers, link: '/solutions/team-collaboration' },
  ];

  // Extract the username from email (before '@')
  const username = user ? user.email.split('@')[0] : '';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    ); // Show loading state while authentication is being checked
  }

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img className="h-8 w-auto" src="/logo.svg" alt="SocialAuto" />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <div className="flex space-x-4">
                <Link to="/features" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />
                  Features
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                    <FontAwesomeIcon icon={faRocket} className="mr-2" />
                    Solutions
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </button>
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.name}
                          to={solution.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <FontAwesomeIcon icon={solution.icon} className="mr-3" />
                          {solution.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link to="/pricing" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                  Pricing
                </Link>
                <Link to="/contact" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {username}</span>
                  <button
                    onClick={logout}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Log in
                  </Link>
                  <Link to="/get-started" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Get Started
                  </Link>
                </>
              )}
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/features" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />
                Features
              </Link>
              <div className="relative group">
                <button
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex justify-between items-center"
                >
                  <span>
                    <FontAwesomeIcon icon={faRocket} className="mr-2" />
                    Solutions
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                <div className="pl-4 hidden group-hover:block">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.name}
                      to={solution.link}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
                    >
                      <FontAwesomeIcon icon={solution.icon} className="mr-3" />
                      {solution.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/pricing" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Contact
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Hello, {username}</span>
                    <button
                      onClick={logout}
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Log in
                    </Link>
                    <Link to="/get-started" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <Outlet />

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
