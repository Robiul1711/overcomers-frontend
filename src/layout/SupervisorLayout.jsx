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
  Clock,
  Settings,
} from "lucide-react";

const SupervisorLayout = () => {
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
      path: "/supervisor-dashboard",
      activePaths: ["/supervisor-dashboard"],
    },
    {
      id: 2,
      icon: <Briefcase size={20} />,
      text: "Cases",
      path: "/supervisor-dashboard/cases",
      activePaths: ["/supervisor-dashboard/cases"],
    },
    // {
    //   id: 3,
    //   icon: <Layers size={20} />,
    //   text: "Programs",
    //   path: "/supervisor-dashboard/programs",
    //   activePaths: ["/supervisor-dashboard/programs"],
    // },
    {
      id: 4,
      icon: <Clock size={20} />,
      text: "Sessions",
      path: "/supervisor-dashboard/sessions",
      activePaths: ["/supervisor-dashboard/sessions"],
    },
    {
      id: 5,
      icon: <Settings size={20} />,
      text: "Profile",
      path: "/supervisor-dashboard/profile",
      activePaths: ["/supervisor-dashboard/profile"],
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

export default SupervisorLayout;
