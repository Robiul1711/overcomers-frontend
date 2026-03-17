import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { LayoutDashboard, Briefcase, FileText, Settings } from "lucide-react";

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
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1 flex flex-col overflow-y-auto h-screen w-full relative">
          <CommonNavbar open={Open} setOpen={setOpen} />
          <div className="p-6 md:p-8 bg-[#FAF6F7]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
