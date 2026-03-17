import React from 'react';
import { Link } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 section-padding-x border-t border-gray-100">
      <div className="max-w-[1540px] mx-auto flex flex-col">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Logo & Text */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-[550px]">
            <img 
              src={ImageProvider.Logo} 
              alt="Overcomers Logo" 
              className="w-[120px] md:w-[140px] object-contain shrink-0" 
            />
            <p className="text-gray-600 text-[14px] md:text-[15px] leading-[1.8]">
              Providing compassionate, evidence-based <br />
              ABA therapy to children and families <br />
              throughout New Jersey.
            </p>
          </div>

          {/* Divider/Spacing for responsive */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-Third font-bold text-[15px] mb-1">Quick Links</h4>
              <Link to="/" className="text-gray-600 hover:text-Primary transition-colors text-[14px] font-medium">Home</Link>
              <Link to="/enrollment" className="text-gray-600 hover:text-Primary transition-colors text-[14px] font-medium">Enrollment</Link>
              <Link to="/careers" className="text-gray-600 hover:text-Primary transition-colors text-[14px] font-medium">Career</Link>
              <Link to="/contact" className="text-gray-600 hover:text-Primary transition-colors text-[14px] font-medium">Contact Us</Link>
            </div>

            {/* Column 3: Contact Us */}
            <div className="flex flex-col gap-4">
              <h4 className="text-Third font-bold text-[15px] mb-1">Contact Us</h4>
              
              <div className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} className="text-Secondary shrink-0 mt-0.5" />
                <span className="text-gray-600 text-[14px] font-medium">908-342-7584</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} className="text-Secondary shrink-0 mt-0.5" />
                <span className="text-gray-600 text-[14px] font-medium">provider@booknlink.ca</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={18} strokeWidth={1.5} className="text-Secondary shrink-0 mt-0.5" />
                <span className="text-gray-600 text-[14px] font-medium">New Jersey, United States</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="w-full border-t border-gray-200 pt-8 flex justify-center">
          <p className="text-gray-500 text-[13px] text-center font-medium">
            Copyright © 2022 Overcomers ABA Services - All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;