import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";
import TopTabs from "@/components/common/TopTabs";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  Wallet,
  Calendar,
  Bell,
  Layers,
} from "lucide-react";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard"],
    },
    {
      id: 2,
      icon: <Briefcase size={20} />,
      text: "Cases",
      path: "/dashboard/cases",
      activePaths: ["/dashboard/cases"],
    },
    {
      id: 3,
      icon: <FileText size={20} />,
      text: "Documents",
      path: "/dashboard/documents",
      activePaths: ["/dashboard/documents"],
    },
    {
      id: 4,
      icon: <Layers size={20} />,
      text: "Programs",
      path: "/dashboard/programs",
      activePaths: ["/dashboard/programs"],
    },
    {
      id: 5,
      icon: <Wallet size={20} />,
      text: "Payroll",
      path: "/dashboard/payroll",
      activePaths: ["/dashboard/payroll"],
    },
    {
      id: 6,
      icon: <Calendar size={20} />,
      text: "My Schedule",
      path: "/dashboard/schedule",
      activePaths: ["/dashboard/schedule"],
    },
    {
      id: 7,
      icon: <FileText size={20} />,
      text: "Clinic Files",
      path: "/dashboard/clinic-files",
      activePaths: ["/dashboard/clinic-files"],
    },
    {
      id: 8,
      icon: <Bell size={20} />,
      text: "Notifications",
      path: "/dashboard/notifications",
      activePaths: ["/dashboard/notifications"],
    },
    {
      id: 9,
      icon: <Settings size={20} />,
      text: "Profile & Settings",
      path: "/dashboard/settings",
      activePaths: ["/dashboard/settings"],
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
          open={Open}
          setOpen={setOpen}
          sidebar={sideBar}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className="flex-1 flex flex-col overflow-y-auto h-screen w-full relative">
          <CommonNavbar open={Open} setOpen={setOpen} />
          <div className="p-4 sm:p-6 md:p-8 bg-[#FAF6F7]">
            {/* <TopTabs 
              tabs={sideBar.map(item => ({ name: item.text, path: item.path }))} 
            /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
