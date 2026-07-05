import React from 'react';
import { Link } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { Mail, Phone, MapPin } from 'lucide-react';
import useClient from "@/hooks/useClient";

const Footer = () => {
  const { data } = useClient({
    queryKey: ["footerdata"],
    url: "/cms/footer",
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Phone':
        return Phone;
      case 'Email':
        return Mail;
      case 'Location':
        return MapPin;
      default:
        return Phone;
    }
  };

  const fallbackLinks = [
    { url: "/", label: "Home" },
    { url: "/enrollment", label: "Enrollment" },
    { url: "/careers", label: "Career" },
    { url: "/contact", label: "Contact Us" }
  ];

  const fallbackContact = [
    { type: "Phone", value: "+19083427584" },
    { type: "Email", value: "info@overcomersaba.com" },
    { type: "Location", value: "New Jersey, United States" }
  ];

  const footerData = data?.data?.content?.footer;
  const copyright = footerData?.copyright || "Copyright © 2022 Overcomers ABA Services - All Rights Reserved.";
  const aboutText = footerData?.about_text || "Providing compassionate, evidence-based ABA therapy to children and families throughout New Jersey.";
  const links = footerData?.quick_links || fallbackLinks;
  const contactInfo = footerData?.contact_info || fallbackContact;

  return (
    <footer className="w-full bg-white pt-16 pb-8 section-padding-x border-t border-gray-100">
      <div className="max-w-[1540px] mx-auto flex flex-col">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Logo & Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-[550px]">
            <img 
              src={ImageProvider.Logo} 
              alt="Overcomers Logo" 
              className="w-[140px] md:w-[160px] object-contain shrink-0" 
            />
            <p className="text-gray-600 text-[14px] md:text-[15px] leading-[1.8] whitespace-pre-line">
              {aboutText}
            </p>
          </div>

          {/* Spacing for responsive */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-28 w-full lg:w-auto items-center sm:items-start justify-center lg:justify-end text-center sm:text-left">
            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-Third font-bold text-[16px] mb-2">Quick Links</h4>
              {links.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.url === '/career' ? '/careers' : link.url} 
                  className="text-gray-600 hover:text-Primary transition-colors text-[14px] font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 3: Contact Us */}
            <div className="flex flex-col gap-4 items-center sm:items-start">
              <h4 className="text-Third font-bold text-[16px] mb-2">Contact Us</h4>
              {contactInfo.map((info, idx) => {
                const Icon = getIcon(info.type);
                return (
                  <div key={idx} className="flex items-center gap-3 justify-center sm:justify-start">
                    <Icon size={18} strokeWidth={1.5} className="text-Secondary shrink-0" />
                    <span className="text-gray-600 text-[14px] font-medium">{info.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="w-full border-t border-gray-200 pt-8 flex justify-center">
          <p className="text-gray-500 text-[13px] text-center font-medium">
            {copyright}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;