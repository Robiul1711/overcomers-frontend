import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImageProvider } from "@/utils/ImageProvider";
import { ArrowUpRight } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/">
          <img 
            src={ImageProvider.Logo} 
            alt="Overcomers Logo" 
            className={`object-contain transition-all duration-300 ${isScrolled ? "h-[70px]" : "h-[90px]"}`} 
          />
        </Link>
        
        <div className={`hidden lg:flex items-center gap-6 text-[15px] font-medium transition-colors duration-300 ${
          isScrolled ? "text-gray-700" : "text-white"
        }`}>
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <React.Fragment key={index}>
                <Link 
                  to={link.path} 
                  className={`hover:text-Primary transition-colors ${
                    isActive 
                      ? (isScrolled ? "text-Secondary font-semibold" : "text-Primary font-semibold") 
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
                    isScrolled ? "bg-gray-400" : "bg-white"
                  }`}></span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <Link to="/auth/sign-in">
          <button className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] px-6 py-2.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors">
            Employee Login <ArrowUpRight size={16} strokeWidth={2.5}/>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
