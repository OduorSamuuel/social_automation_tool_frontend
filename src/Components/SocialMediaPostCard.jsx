import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,  } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const SocialMediaPostCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex">
        {/* Left side - Image */}
        <div className="w-1/3 bg-pink-100 p-4">
          <img 
            src={`/images/javahouse.jpeg`}
            alt="Productivity illustration" 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-2/3 p-4">
          <h2 className="text-lg font-semibold mb-2">Want to save time and increase your productivity?</h2>
          <p className="text-sm text-gray-600 mb-4">To save time, increase productivity, and contribute to...</p>
          
          {/* Status and platform */}
          <div className="flex justify-between items-center mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              Published
            </span>
            <span className="text-gray-500 text-xs">
              <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 mr-1" />
              Facebook
            </span>
          </div>
          
          {/* Time */}
          <div className="flex items-center text-gray-500 text-xs">
            <FontAwesomeIcon icon={faClock} className="mr-1" />
            18/08 TUE 10:19
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPostCard;