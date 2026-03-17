import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';

const JoinOurMailingList = () => {
  return (
    <div className="relative w-full section-padding-y overflow-hidden flex items-center justify-center">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={ImageProvider.AboutUs} 
          alt="Children running" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for readability matching the screenshot */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content Card Container */}
      <div className="relative z-10 w-[90%] max-w-[800px] bg-Secondary/30 backdrop-blur-md rounded-[24px] py-14 px-8 md:px-16 flex flex-col items-center justify-center text-center shadow-lg border border-white/10">
        
        {/* Header Content */}
        <div className="flex flex-col items-center mb-8 w-full">
          <h3 className="text-white font-bold text-[14px] md:text-[16px] tracking-[2px] uppercase mb-3 relative inline-block">
            Join Our Mailing List
            <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-Primary rounded-full"></span>
          </h3>
          <h2 className="text-[36px] md:text-[46px] font-bold text-white mt-1">
            Stay Updated
          </h2>
        </div>

        {/* Input Form */}
        <form className="w-full max-w-[600px] flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col items-start w-full">
            <label className="text-white font-bold text-[13px] mb-2 px-1">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <input 
                type="email" 
                placeholder="Enter Email Address"
                required
                className="flex-grow bg-[#F5F5F5] rounded-[10px] px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-Primary transition-all w-full sm:w-auto"
              />
              <button 
                type="submit"
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-4 rounded-[10px] flex items-center justify-center gap-2 transition-colors shrink-0 w-full sm:w-auto"
              >
                Sign up <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>

      </div>

    </div>
  );
};

export default JoinOurMailingList;