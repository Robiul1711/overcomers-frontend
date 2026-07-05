import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, ChevronLeft, Home, ChevronDown, LogOut, Settings } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectUserType, selectCurrentToken } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import useClient from "@/hooks/useClient";
import { useQueryClient } from "@tanstack/react-query";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userType = useSelector(selectUserType);
  const token = useSelector(selectCurrentToken);

  const getNotificationsPath = (type) => {
    if (type === "parent") return "/parent-dashboard/notifications";
    if (type === "director") return "/director-dashboard/notifications";
    if (type === "supervisor") return "/supervisor-dashboard/notifications";
    return "/dashboard/notifications";
  };

  const getSettingsPath = (type) => {
    if (type === "parent") return "/parent-dashboard/settings";
    if (type === "director") return "/director-dashboard/profile";
    if (type === "supervisor") return "/supervisor-dashboard/profile";
    return "/dashboard/settings";
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const { data: profileData } = useClient({
    queryKey: [`${userType}Profile`, token],
    url: `/${userType}/profile`,
    enabled: !!token && !!userType,
  });

  const { data: notifData } = useClient({
    queryKey: [`${userType}Notifications`, token],
    url: `/${userType}/notifications`,
    enabled: !!token && !!userType,
  });

  const profile = profileData?.data?.personal_information;
  const unreadCount = notifData?.data?.unread_count ?? 0;

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "E";

  const handleLogout = () => {
    dispatch(clearAuth());
    queryClient.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          to={getNotificationsPath(userType)}
          className="relative cursor-pointer p-1.5 md:p-0"
        >
          <Bell color="#4A3E3D" size={20} className="md:w-[24px]" />
          {/* Notification count badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 md:top-0 -right-1 md:right-0 min-w-[18px] h-[18px] bg-Secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAFAFA] px-1 shadow-sm">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>

        {/* User Avatar Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#800000]/30 hover:shadow-sm rounded-lg px-2 py-1.5 transition-all group"
          >
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt={profile.full_name}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#800000] rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-sm">
                {initials}
              </div>
            )}
            <span className="hidden md:block text-sm font-medium text-[#2D2D2D] max-w-[100px] truncate group-hover:text-[#800000] transition-colors">
              {profile?.full_name || "Employee"}
            </span>
            <ChevronDown
              size={14}
              className={`text-[#9CA3AF] transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-bold text-[#2D2D2D] truncate">
                  {profile?.full_name || "Employee"}
                </p>
                <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                  {profile?.email || ""}
                </p>
              </div>

              {/* Menu Items */}
              <Link
                to={getSettingsPath(userType)}
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B7280] hover:bg-[#FAF6F7] hover:text-[#2D2D2D] transition-colors"
              >
                <Settings size={16} />
                Profile Settings
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors w-full text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

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
