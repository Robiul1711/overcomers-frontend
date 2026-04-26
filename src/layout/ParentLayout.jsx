import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  ClipboardList, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Home,
  ArrowLeft,
  Layers
} from "lucide-react";
import { ImageProvider } from "@/utils/ImageProvider";
import TopTabs from "@/components/common/TopTabs";

const sidebarItems = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", path: "/parent-dashboard" },
  { icon: <User size={20} />, text: "My Child", path: "/parent-dashboard/my-child" },
  { icon: <Layers size={20} />, text: "Programs", path: "/parent-dashboard/programs" },
  { icon: <TrendingUp size={20} />, text: "Progress Reports", path: "/parent-dashboard/reports" },
  { icon: <Users size={20} />, text: "Care Team", path: "/parent-dashboard/care-team" },
  // { icon: <ShieldCheck size={20} />, text: "Authorizations", path: "/parent-dashboard/authorizations" },
  { icon: <Bell size={20} />, text: "Notifications", path: "/parent-dashboard/notifications" },
  { icon: <Settings size={20} />, text: "Profile & Settings", path: "/parent-dashboard/settings" },
];

const ParentSidebar = ({ open, setOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/parent-dashboard") {
      return location.pathname === "/parent-dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

     <div
        className={`h-screen py-6 flex flex-col gap-8 transition-all duration-300 ease-in-out z-50 bg-white border-r border-gray-100 xl:relative fixed ${
          open 
            ? "left-0 top-0 shadow-xl" 
            : "-left-full xl:left-0"
        } ${isCollapsed ? "w-[90px]" : "w-[280px]"}`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-8 bg-white border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#FFBB03] rounded-full p-1 shadow-sm hidden xl:flex items-center justify-center transition-colors z-[60]"
        >
          {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
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

        <div className="flex flex-col gap-1.5 flex-grow px-4 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 py-3 rounded-xl transition-all duration-200 ${
                  isCollapsed ? "justify-center px-0" : "px-5"
                } ${
                  active
                    ? "bg-[#FFBB03] text-Secondary font-semibold shadow-sm"
                    : "text-[#6B7280] hover:bg-[#FAF6F7] hover:text-[#2D2D2D]"
                }`}
              >
                <div className="min-w-[20px] flex justify-center">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap">{item.text}</span>}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto px-4">
          <div 
            className={`flex items-center gap-4 py-3 cursor-pointer text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#B91C1C] rounded-xl transition-colors duration-200 ${
              isCollapsed ? "justify-center px-0" : "px-5"
            }`}
          >
            <div className="min-w-[20px] flex justify-center"><LogOut size={20} /></div>
            {!isCollapsed && <p className="font-medium whitespace-nowrap">Logout</p>}
          </div>
        </div>
      </div>
    </>
  );
};

const ParentNavbar = ({ setOpen }) => {
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const getRouteInfo = () => {
    const path = location.pathname;
    const info = {
      title: "Dashboard",
      subtitle: currentDate,
      showBack: false
    };

    if (path === "/parent-dashboard") {
      info.title = "Dashboard";
      info.subtitle = currentDate;
      info.showBack = false;
    } else if (path.includes("/my-child")) {
      info.title = "My Child";
      info.subtitle = "View Cody's profile and care plan";
      info.showBack = true;
    } else if (path.includes("/programs")) {
      info.title = "Programs";
      info.subtitle = "View assigned programs and therapy notes";
      info.showBack = true;
    } else if (path.includes("/reports")) {
      info.title = "Progress Reports";
      info.subtitle = "Track Cody's development and therapy progress over time";
      info.showBack = true;
    } else if (path.includes("/care-team")) {
      info.title = "Care Team";
      info.subtitle = "View professionals assigned to Cody's care";
      info.showBack = true;
    // } else if (path.includes("/authorizations")) {
    //   info.title = "Authorizations";
    //   info.subtitle = "View insurance authorization details";
    //   info.showBack = true;
    } else if (path.includes("/notifications")) {
      info.title = "Notifications";
      info.subtitle = "Stay informed about updates and important announcements";
      info.showBack = true;
    } else if (path.includes("/settings")) {
      info.title = "Profile & Settings";
      info.subtitle = "Manage your account and preferences";
      info.showBack = true;
    }

    return info;
  };

  const { title, subtitle, showBack } = getRouteInfo();

  return (
    <nav className="py-4 bg-white/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-10 sticky top-0 z-[40] border-b border-gray-100/50">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button 
          onClick={() => setOpen(true)}
          className="xl:hidden p-2 text-[#6B7280] hover:bg-gray-100 rounded-lg shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 border border-[#E5E7EB] px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl text-[#2D2D2D] hover:bg-gray-50 transition-colors font-medium text-xs md:text-sm bg-white shrink-0"
            >
              <ArrowLeft size={16} /> <span className="hidden xs:inline">Back</span>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-xl md:text-3xl font-bold text-[#2D2D2D] leading-tight truncate md:whitespace-normal">{title}</h2>
            <p className="text-xs md:text-sm text-[#9CA3AF] font-medium mt-0.5 truncate hidden sm:block">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <button className="relative p-2 text-[#B91C1C] hover:bg-[#FEF2F2] rounded-full transition-colors group">
          <Bell size={20} className="md:w-5 md:h-5" />
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#B91C1C] text-white text-[9px] md:text-[10px] flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform shadow-sm">3</span>
        </button>
        <Link to="/" className="flex items-center justify-center gap-2 bg-[#800000] text-white p-2.5 md:px-5 md:py-2.5 rounded-xl text-sm font-semibold hover:bg-[#600000] transition-all shadow-md active:scale-95">
          <Home size={18} className="md:hidden" />
          <span className="hidden md:inline">Home</span>
          <ChevronRight size={16} className="hidden md:inline" />
        </Link>
      </div>
    </nav>
  );
};

const ParentLayout = () => {
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <ScrollRestoration />
      <div className="flex bg-[#FAFAFA] h-screen w-full font-poppins overflow-hidden">
        <ParentSidebar 
          open={open} 
          setOpen={setOpen} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
        <div className="flex-1 flex flex-col overflow-y-auto h-screen w-full relative">
          <ParentNavbar setOpen={setOpen} />
          <div className="p-4 sm:p-6 md:p-8 bg-[#FAF6F7]">
            {/* <TopTabs 
              tabs={sidebarItems.map(item => ({ name: item.text, path: item.path }))} 
            /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentLayout;
