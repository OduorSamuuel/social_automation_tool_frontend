import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="text-xl font-bold text-gray-900">
                SaaS Platform
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/features" className="text-gray-700 hover:text-gray-900">Features</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
            {/* <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>  <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>*/} 
              <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Render the current page's content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

