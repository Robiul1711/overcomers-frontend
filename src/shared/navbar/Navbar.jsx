import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImageProvider } from "@/utils/ImageProvider";
import { ArrowUpRight, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, selectUserType, clearAuth } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Enrollment", path: "/enrollment" },
  { name: "Events", path: "/events" },
  { name: "Careers", path: "/careers" },
  { name: "Scholarship", path: "/scholarship" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  console.log(userType)
  const dashboardPath = userType === "employee" ? "/dashboard" : "/parent-dashboard";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.success("Logged out successfully");
    navigate("/");
    setIsUserMenuOpen(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2 md:py-3" : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="section-padding-x flex items-center justify-between">
          <Link to="/" className="z-50 shrink-0">
            <img 
              src={ImageProvider.Logo} 
              alt="Overcomers Logo" 
              className={`object-contain transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "h-[50px] md:h-[60px] lg:h-[70px]" : "h-[60px] md:h-[70px] lg:h-[90px]"}`} 
            />
          </Link>
          
          {/* Desktop Menu Elements */}
          <div className="hidden lg:flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-10 absolute lg:relative top-[100%] lg:top-auto left-0 w-full lg:w-auto bg-white lg:bg-transparent p-6 lg:p-0 shadow-lg lg:shadow-none">
            <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-5 xl:gap-6 text-[15px] font-medium transition-colors duration-300 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <React.Fragment key={index}>
                    <Link 
                      to={link.path} 
                      className={`hover:text-Primary transition-colors whitespace-nowrap ${
                        isActive 
                          ? (isScrolled ? "text-Secondary font-semibold" : "text-Primary font-semibold") 
                          : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <span className={`hidden lg:block w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
                        isScrolled ? "bg-gray-400" : "bg-white"
                      }`}></span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>
            {isAuthenticated ? (
              /* User Dropdown when logged in */
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all group ${
                    isScrolled
                      ? "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isScrolled
                      ? "bg-[#800000] text-white"
                      : "bg-white/20 text-white"
                  }`}>
                    U
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isScrolled ? "text-gray-500" : "text-white/70"
                    } ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <Link
                      to={dashboardPath}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B7280] hover:bg-[#FAF6F7] hover:text-[#2D2D2D] transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
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
            ) : (
              <Link to="/auth/sign-in" className="hidden lg:block">
                <button className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] px-6 py-2.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
                  Login <ArrowUpRight size={16} strokeWidth={2.5}/>
                </button>
              </Link>
            )}

          {/* Mobile Hamburger Icon */}
          <div className="flex items-center gap-4 lg:hidden z-50">
            <Link to="/auth/sign-up" className="hidden sm:block">
              <button className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[12px] px-4 py-2 rounded-[8px] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap">
                Sign Up <ArrowUpRight size={14} strokeWidth={2.5}/>
              </button>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-Secondary bg-gray-100" : "text-white bg-white/10 hover:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Wrapper */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white pt-[90px] md:pt-[100px] overflow-y-auto lg:hidden flex flex-col"
          >
            <div className="flex flex-col items-center justify-center gap-8 py-10 px-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-[20px] font-bold tracking-wide transition-colors ${
                        isActive ? "text-Primary" : "text-gray-800 hover:text-Primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 + 0.1, duration: 0.4 }}
                className="w-full mt-6 flex flex-col items-center gap-4 sm:hidden border-t border-gray-100 pt-8"
              >
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardPath} className="w-full max-w-[250px]" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="bg-Secondary text-white font-bold text-[16px] px-6 py-4 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full">
                        Dashboard <LayoutDashboard size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="w-full max-w-[250px] bg-red-50 text-red-600 font-bold text-[16px] px-6 py-4 rounded-[12px] flex items-center justify-center gap-2 transition-colors border border-red-100"
                    >
                      Logout <LogOut size={18} />
                    </button>
                  </>
                ) : (
                  <Link to="/auth/sign-in" className="w-full max-w-[250px]">
                    <button className="bg-Secondary text-white font-bold text-[16px] px-6 py-4 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full">
                     Login <ArrowUpRight size={18} strokeWidth={2.5}/>
                    </button>
                  </Link>
                )}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
