import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageProvider } from "@/utils/ImageProvider";

const SideBar = ({ sidebar, open, setOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const isActive = (paths) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.some(path => {
      // For the root dashboard, we want an exact match to avoid highlighting it for every dashboard sub-route
      if (path === "/dashboard") {
        return location.pathname === "/dashboard";
      }
      // For other routes, we use startsWith to catch detail pages like /dashboard/cases/:id
      return location.pathname.startsWith(path);
    });
  };

  return (
    <>
      {/* Overlay for mobile menus */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar container */}
      <div
        className={`h-screen py-6 flex flex-col gap-8 transition-all duration-300 ease-in-out z-50 bg-white border-r border-gray-100 xl:relative fixed ${
          open 
            ? "left-0 top-0 shadow-xl" 
            : "-left-full xl:left-0"
        } ${isCollapsed ? "w-[90px]" : "w-[280px]"}`}
      >
        {/* Collapse toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-8 bg-white border border-gray-200 text-gray-400 hover:text-Secondary rounded-full p-1 shadow-sm hidden xl:flex items-center justify-center transition-colors z-[60]"
        >
          {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5}/> : <ChevronLeft size={16} strokeWidth={2.5}/>}
        </button>

        {/* Logo */}
        <Link to={"/"} className="flex justify-center items-center mt-4 mb-2 transition-all duration-300">
          {!isCollapsed ? (
             <img 
               src={ImageProvider.Logo} 
               alt="Overcomers Logo" 
               className="md:w-36 w-[80px] sm:w-24 h-auto object-contain transition-all duration-300" 
             />
          ) : (
            <div className="w-11 h-11 bg-Primary rounded-xl flex items-center justify-center text-Third font-bold text-xl shadow-sm">
              O
            </div>
          )}
        </Link>

        {/* Navigation */}
        <div className="flex flex-col gap-2 flex-grow px-4 overflow-x-hidden">
          {sidebar?.map((item, index) => {
            const active = isActive(item?.activePaths);
            return (
              <Link
                key={index}
                to={item?.path}
                onClick={() => setOpen(false)}
                title={isCollapsed ? item.text : ""}
                className={`flex items-center gap-4 py-3.5 rounded-xl text-[15px]  transition-all duration-200 ${
                  isCollapsed ? "justify-center px-0" : "px-5 "
                } ${
                  active
                    ? "bg-Primary text-[#76121F] shadow-sm font-bold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-black font-medium"
                }`}
              >
                <div className="min-w-[20px] flex justify-center">{item?.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap">{item?.text}</span>}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="mt-auto mb-4 px-4 overflow-x-hidden">
          <div 
            className={`flex items-center gap-4 py-3 cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl transition-colors duration-200 ${
               isCollapsed ? "justify-center px-0" : "px-5"
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <div className="min-w-[20px] flex justify-center"><LogOut size={20} /></div>
            {!isCollapsed && <p className="font-medium text-[15px] whitespace-nowrap">Logout</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
