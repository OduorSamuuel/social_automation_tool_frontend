import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faThLarge, faList, faPen, faChevronDown, faPlus,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, faInstagram, faTiktok, faTwitter, faSnapchatGhost
} from '@fortawesome/free-brands-svg-icons';
import SocialMediaPostCard from '../Components/SocialMediaPostCard';
import DashLayout from '../layouts/DashLayout';

function ContentManagement() {
  return (
    <DashLayout>
      <div className="flex-1 flex flex-col h-screen">
        {/* Social Media Icons Row */}
        <div className="bg-white flex justify-end items-center p-3 space-x-4 z-30 ">
          <button className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
          <button className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faInstagram} />
          </button>
          <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTiktok} />
          </button>
          <button className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTwitter} />
          </button>
          <button className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faSnapchatGhost} />
          </button>
        </div>

        {/* Sticky Controls Section */}
        <div className="bg-gray-50 shadow-lg p-6 ">
          <div className="flex justify-between items-center mb-4">
            {/* All Posts and Post Statuses */}
            <div className="flex space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                All Posts <span className="ml-1 bg-blue-200 px-1.5 rounded-full">13</span>
              </div>
              <div className="text-gray-600 px-3 py-1">
                In Draft <span className="ml-1 bg-gray-200 px-1.5 rounded-full">2</span>
              </div>
              <div className="text-gray-600 px-3 py-1">
                Scheduled <span className="ml-1 bg-gray-200 px-1.5 rounded-full">3</span>
              </div>
              <div className="text-gray-600 px-3 py-1">
                Published <span className="ml-1 bg-gray-200 px-1.5 rounded-full">7</span>
              </div>
            </div>

            {/* Create New Post Button */}
            <button className="bg-customGray text-white px-4 py-2 rounded-md flex items-center">
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              Create New Post 
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Dropdown Controls */}
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                Platform <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                Project <FontAwesomeIcon icon={faFolderOpen} className="ml-1" />
              </button>
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex space-x-2">
            <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded">
              <FontAwesomeIcon icon={faThLarge} className="mr-2" />
              Grid View
            </button>
            <button className="bg-white text-gray-600 px-4 py-1 rounded border border-gray-300">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              List View
            </button>
          </div>
        </div>

        {/* Scrollable Card Content */}
        <div className="flex-1 overflow-y-scroll p-6 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <SocialMediaPostCard />
            <SocialMediaPostCard />
            <SocialMediaPostCard />
            <SocialMediaPostCard />
          </div>
        </div>
      </div>
    </DashLayout>
  );
}

export default ContentManagement;
