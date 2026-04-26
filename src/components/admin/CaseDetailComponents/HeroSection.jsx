import React from 'react';
import { MapPin, Calendar, } from 'lucide-react';

const HeroSection = ({ onScrollToContent }) => {
  return (
    <div className="bg-[#76121F] rounded-[24px] md:rounded-[40px] p-6 md:p-10 shadow-xl relative overflow-hidden group">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#FFBB03]/10 rounded-full -mr-28 -mt-28 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-2.5">
             <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
                <span className="text-white/60 text-[10px] md:text-[12px] font-bold uppercase tracking-wider">Protocol CR-4421</span>
             </div>
             <span className="bg-[#E5F9ED] text-[#1EB15D] px-3.5 py-1 rounded-full text-[10px] md:text-[12px] font-bold flex items-center gap-1.5 shadow-sm uppercase tracking-wide">
               <span className="w-1.5 h-1.5 rounded-full bg-[#1EB15D] animate-pulse"></span> Case Active
             </span>
          </div>
 
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] md:leading-none tracking-tight">John <span className="text-[#FFBB03]">Smith</span></h1>

          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-1 md:mt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] md:text-[12px] font-bold text-[#FFBB03] border border-white/5 transition-all hover:bg-white/20 cursor-default group/pill">
              <MapPin size={12} className="text-[#FFBB03] group-hover/pill:scale-110 transition-transform" /> <span className="opacity-90">Residential Center</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] md:text-[12px] font-bold text-[#FFBB03] border border-white/5 transition-all hover:bg-white/20 cursor-default group/pill">
              <Calendar size={12} className="text-[#FFBB03] group-hover/pill:scale-110 transition-transform" /> <span className="opacity-90">Auth Valid thru Aug 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
