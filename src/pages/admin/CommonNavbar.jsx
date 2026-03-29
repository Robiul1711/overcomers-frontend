import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, ChevronLeft } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  
  const currentDate = "Monday, March 7, 2026";

  const isCaseDetails = pathname.match(/\/cases\/./);

  let title = "Dashboard";
  let subtitle = currentDate;

  if (isCaseDetails) {
    title = "Case Details";
    subtitle = "View information and updates related to the assigned client case";
  } else if (pathname.includes("/cases")) {
    title = "Assigned Cases";
    subtitle = "View and manage the cases currently assigned to you.";
  } else if (pathname.includes("/documents")) {
    title = "Documents & Certifications";
    subtitle = "Upload and manage your required certifications and compliance documents.";
  } else if (pathname.includes("/settings")) {
    title = "Profile & Settings";
    subtitle = "Manage your account and preferences.";
  } else if (pathname.includes("/notifications")) {
    title = "Notifications";
    subtitle = "Stay informed about updates and important announcements.";
  } else if (pathname.includes("/schedule")) {
    title = "My Schedule";
    subtitle = "View and manage your work schedule.";
  } else if (pathname.includes("/payroll")) {
    title = "Payroll";
    subtitle = "View and manage your payroll information.";
  }

  return (
    <div className="flex items-center justify-between w-full py-6 px-6 md:px-8 bg-[#FAFAFA]">
      <div className="flex items-center gap-6">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <Menu color="#4A3E3D" size={26} />
        </span>
        
        {(pathname.includes("/settings") || isCaseDetails) && (
           <button 
             onClick={() => window.history.back()} 
             className="border border-[#D1D5DB] hover:bg-white bg-[#FAFAFA] text-Secondary rounded-[12px] px-4 py-2 flex items-center justify-center gap-1.5 font-bold text-[14px] transition-colors shrink-0"
           >
             <ChevronLeft size={18} strokeWidth={2.5}/> Back
           </button>
        )}

        <div className="flex flex-col">
          <h1 className="text-[28px] font-bold text-Third leading-tight">{title}</h1>
          <p className="text-gray-500 text-[14px] mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell color="#4A3E3D" size={24} />
          {/* Notification red dot indicator */}
          <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-Secondary rounded-full border-2 border-[#FAFAFA]"></span>
        </div>
        
        <CommonButton 
          text="Home" 
          isLink={true} 
          to="/" 
          bgVariant="bg-Secondary" 
          textVariant="text-white" 
          hoverVariant="hover:bg-Secondary/90"
          className="!py-2.5 !px-5"
        />
      </div>
    </div>
  );
};

export default CommonNavbar;
