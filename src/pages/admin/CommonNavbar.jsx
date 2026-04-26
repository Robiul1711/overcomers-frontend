import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, ChevronLeft, Home } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  const currentDate = "Monday, March 7, 2026";

  const isCaseDetails = pathname.match(/\/cases\/./);

  let title = "Dashboard";
  let subtitle = currentDate;

  if (isCaseDetails) {
    title = "Case Details";
    subtitle =
      "View information and updates related to the assigned client case";
  } else if (pathname.includes("/cases")) {
    title = "Assigned Cases";
    subtitle = "View and manage the cases currently assigned to you.";
  } else if (pathname.includes("/documents")) {
    title = "Documents & Certifications";
    subtitle =
      "Upload and manage your required certifications and compliance documents.";
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
    <div className="flex items-center justify-between w-full py-4  px-4 md:px-10 bg-[#FAFAFA] border-b border-gray-100 md:border-none sticky top-0 z-[40]">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <span
          onClick={() => setOpen(!open)}
          className="xl:hidden block cursor-pointer shrink-0"
        >
          <Menu color="#4A3E3D" size={24} className="md:w-[26px]" />
        </span>

        {(pathname.includes("/settings") || isCaseDetails) && (
          <button
            onClick={() => window.history.back()}
            className="border border-[#D1D5DB] hover:bg-white bg-[#FAFAFA] text-Secondary rounded-[10px] md:rounded-[12px] px-2.5 py-1.5 md:px-4 md:py-2 flex items-center justify-center gap-1 md:gap-1.5 font-bold text-[12px] md:text-[14px] transition-colors shrink-0"
          >
            <ChevronLeft size={16} className="md:w-[18px]" strokeWidth={2.5} />{" "}
            <span className="hidden xs:inline">Back</span>
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-[18px] sm:text-[22px] md:text-[28px] font-bold text-Third leading-tight truncate md:whitespace-normal">
            {title}
          </h1>
          <p className="text-gray-500 text-[12px] md:text-[14px] mt-0.5 truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <Link
          to="/dashboard/notifications"
          className="relative cursor-pointer p-1.5 md:p-0"
        >
          <Bell color="#4A3E3D" size={20} className="md:w-[24px]" />
          {/* Notification red dot indicator */}
          <span className="absolute top-1 md:top-0 right-1 w-2 md:w-2.5 h-2 md:h-2.5 bg-Secondary rounded-full border-2 border-[#FAFAFA]"></span>
        </Link>

        <div className="hidden sm:block">
          <CommonButton
            text="Home"
            isLink={true}
            to="/"
            bgVariant="bg-Secondary"
            textVariant="text-white"
            hoverVariant="hover:bg-Secondary/90"
            className="!py-2 md:!py-2.5 !px-4 md:!px-5 !text-[13px] md:!text-[14px]"
          />
        </div>
        <Link
          to="/"
          className="sm:hidden flex items-center justify-center w-9 h-9 bg-Secondary text-white rounded-lg"
        >
          <Home size={18} />
        </Link>
      </div>
    </div>
  );
};

export default CommonNavbar;
