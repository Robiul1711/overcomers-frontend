import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";
import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  Users,
  ClipboardList,
  Settings,
  Bell,
  FileText,
  Calendar,
  Wallet,
} from "lucide-react";

const DirectorLayout = () => {
  const token = useSelector(selectCurrentToken);
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  const sideBar = [
    {
      id: 1,
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      path: "/director-dashboard",
      activePaths: ["/director-dashboard"],
    },
    {
      id: 2,
      icon: <Briefcase size={20} />,
      text: "Cases",
      path: "/director-dashboard/cases",
      activePaths: ["/director-dashboard/cases"],
    },
    {
      id: 8,
      icon: <FileText size={20} />,
      text: "Documents",
      path: "/director-dashboard/documents",
      activePaths: ["/director-dashboard/documents"],
    },
    {
      id: 9,
      icon: <FileText size={20} />,
      text: "Clinic Files",
      path: "/director-dashboard/clinic-files",
      activePaths: ["/director-dashboard/clinic-files"],
    },
    {
      id: 10,
      icon: <Calendar size={20} />,
      text: "My Schedule",
      path: "/director-dashboard/schedule",
      activePaths: ["/director-dashboard/schedule"],
    },
    {
      id: 12,
      icon: <Calendar size={20} />,
      text: "Master Schedule",
      path: "/director-dashboard/master-schedule",
      activePaths: ["/director-dashboard/master-schedule"],
    },
    {
      id: 3,
      icon: <Layers size={20} />,
      text: "Programs",
      path: "/director-dashboard/programs",
      activePaths: ["/director-dashboard/programs"],
    },
    {
      id: 4,
      icon: <Users size={20} />,
      text: "Staff",
      path: "/director-dashboard/staff",
      activePaths: ["/director-dashboard/staff"],
    },
    // {
    //   id: 5,
    //   icon: <ClipboardList size={20} />,
    //   text: "Audit",
    //   path: "/director-dashboard/audit",
    //   activePaths: ["/director-dashboard/audit"],
    // },
    {
      id: 6,
      icon: <Bell size={20} />,
      text: "Notifications",
      path: "/director-dashboard/notifications",
      activePaths: ["/director-dashboard/notifications"],
    },
    {
      id: 13,
      icon: <Wallet size={20} />,
      text: "Payroll",
      path: "/director-dashboard/payroll",
      activePaths: ["/director-dashboard/payroll"],
    },
    {
      id: 7,
      icon: <Settings size={20} />,
      text: "Profile & Settings",
      path: "/director-dashboard/profile",
      activePaths: ["/director-dashboard/profile"],
    },
  ];
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      <ScrollRestoration />
      <div className="flex bg-[#FAFAFA] h-screen w-full font-poppins text-Third overflow-hidden">
        <SideBar
          open={open}
          setOpen={setOpen}
          sidebar={sideBar}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className="flex-1 flex flex-col overflow-y-auto h-screen w-full relative">
          <CommonNavbar open={open} setOpen={setOpen} />
          <div className="p-4 sm:p-6 md:p-8 bg-[#FAF6F7]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectorLayout;
