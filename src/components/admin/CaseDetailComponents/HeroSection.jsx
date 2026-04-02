import React from 'react';
import { MapPin, Calendar, Heart, Share2, MoreVertical, Layers, Clock } from 'lucide-react';

const HeroSection = ({ onScrollToContent }) => {
  return (
    <div className="bg-Secondary rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-2xl relative overflow-hidden group">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-Primary/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 lg:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-3">
             <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <span className="text-white/60 text-[12px] md:text-[13px] font-bold uppercase tracking-wider">Protocol CR-4421</span>
             </div>
             <span className="bg-[#E5F9ED] text-[#1EB15D] px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-2 shadow-sm uppercase tracking-wide">
               <span className="w-1.5 h-1.5 rounded-full bg-[#1EB15D] animate-pulse"></span> Case Active
             </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] md:leading-none tracking-tight">John <span className="text-Primary">Smith</span></h1>
            <p className="text-white/40 font-bold text-[12px] md:text-[14px] uppercase tracking-widest flex items-center gap-2">
               Established Client <span className="w-1 h-1 rounded-full bg-white/20"></span> Priority Case
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-4">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[12px] md:text-[13px] font-bold text-Primary border border-white/5 transition-all hover:bg-white/20 cursor-default group/pill">
              <MapPin size={14} className="text-Primary group-hover/pill:scale-110 transition-transform" /> <span className="opacity-90">Residential Center</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[12px] md:text-[13px] font-bold text-Primary border border-white/5 transition-all hover:bg-white/20 cursor-default group/pill">
              <Calendar size={14} className="text-Primary group-hover/pill:scale-110 transition-transform" /> <span className="opacity-90">Auth Valid thru Aug 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-stretch sm:items-center gap-2 sm:gap-4 w-full xl:w-auto">
          <button 
            onClick={() => onScrollToContent('Programs')}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-5 md:px-8 py-2.5 md:py-3.5 bg-Primary text-Secondary rounded-xl md:rounded-2xl font-black text-[10px] md:text-[14px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-Primary/10 group/btn"
          >
            <Layers size={18} className="group-hover/btn:rotate-12 transition-transform hidden sm:block" /> VIEW PROGRAMS
          </button>
          <button 
            onClick={() => onScrollToContent('Client Schedule')}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-5 md:px-8 py-2.5 md:py-3.5 bg-white/5 border-2 border-white/10 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-[14px] hover:bg-white/10 active:scale-95 transition-all group/btn"
          >
            <Clock size={18} className="group-hover/btn:-rotate-12 transition-transform hidden sm:block" /> SESSION LOGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

