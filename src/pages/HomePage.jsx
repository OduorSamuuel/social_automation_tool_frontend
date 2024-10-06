import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  // State to hold stats fetched from the backend
  const [stats, setStats] = useState({
    active_users: 0,
    uptime_percentage: 0,
    support_hours: 0,
  });

  // Fetch data from the Django backend on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stats/')
      .then(response => {
        setStats(response.data);  // Set the state with the fetched data
      })
      .catch(error => {
        console.error("There was an error fetching data!", error);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
    
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Empower Your Business with Real-Time Data Insights</h1>
          <p className="mt-4 text-lg">Access powerful analytics and insights to grow your business faster.</p>
          <div className="mt-8">
            <a href="/signup" className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-100 font-medium">
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* User Stats Section with Dynamic Data */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">{stats.active_users.toLocaleString()}</h3>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">{stats.uptime_percentage}%</h3>
              <p className="mt-2 text-gray-600">Uptime Guarantee</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">{stats.support_hours}/7</h3>
              <p className="mt-2 text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
