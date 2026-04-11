import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopTabs = ({ tabs = [] }) => {
  const location = useLocation();

  const defaultTabs = [
    { name: 'Dashboard', path: '/parent-dashboard' },
    { name: 'My Child', path: '/parent-dashboard/my-child' },
    { name: 'Programs', path: '/parent-dashboard/programs' },
    { name: 'Progress Reports', path: '/parent-dashboard/reports' },
    { name: 'Care Team', path: '/parent-dashboard/care-team' },
    { name: 'Authorizations', path: '/parent-dashboard/authorizations' },
    { name: 'Notifications', path: '/parent-dashboard/notifications' },
    { name: 'Profile & Settings', path: '/parent-dashboard/settings' },
  ];

  const displayTabs = tabs.length > 0 ? tabs : defaultTabs;

  return (
    <div className="w-full sm:bg-[#FDFCFB] sm:py-4 sm:px-4 sm:border-b sm:border-gray-100 sticky top-0 z-20 rounded-2xl mb-4 sm:mb-6">
      {/* Scrollable Container */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {displayTabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
        
              className={`
                px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap
                ${isActive 
                  ? 'bg-[#FFB800] text-[#741111] shadow-md shadow-orange-100' 
                  : 'text-[#6B7280] hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopTabs; 