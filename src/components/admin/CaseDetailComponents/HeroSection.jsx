import React from "react";
import { MapPin, Calendar } from "lucide-react";

const HeroSection = ({ dataCasted, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#76121F] rounded-[24px] md:rounded-3xl p-4 md:p-6 shadow-xl overflow-hidden animate-pulse">
        <div className="flex flex-col gap-5">
          {/* Top badges */}
          <div className="flex gap-3">
            <div className="h-7 w-24 bg-white/10 rounded-full"></div>
            <div className="h-7 w-32 bg-white/10 rounded-full"></div>
          </div>

          {/* Name */}
          <div className="space-y-3">
            <div className="h-10 w-64 bg-white/10 rounded-lg"></div>
            <div className="h-5 w-40 bg-white/10 rounded-lg"></div>
          </div>

          {/* Bottom pills */}
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-36 bg-white/10 rounded-xl"></div>
            <div className="h-10 w-40 bg-white/10 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#76121F] rounded-[24px] md:rounded-3xl p-4 md:p-6 shadow-xl relative overflow-hidden group">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#FFBB03]/10 rounded-full -mr-28 -mt-28 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              <span className="text-white/60 text-[10px] md:text-[12px] font-bold uppercase tracking-wider">
                {dataCasted?.case_number}
              </span>
            </div>

            <span className="bg-[#E5F9ED] text-[#1EB15D] px-3.5 py-1 rounded-full text-[10px] md:text-[12px] font-bold flex items-center gap-1.5 shadow-sm uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1EB15D] animate-pulse"></span>
              Case {dataCasted?.client_information?.case_status}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] md:text-3xl lg:text-4xl font-extrabold text-white leading-[1.1] md:leading-none tracking-tight">
              {dataCasted?.client_name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mt-1 md:mt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] md:text-[12px] font-bold text-[#FFBB03] border border-white/5">
              <MapPin size={12} />
              <span>{dataCasted?.center_type}</span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] md:text-[12px] font-bold text-[#FFBB03] border border-white/5">
              <Calendar size={12} />
              <span>{dataCasted?.auth_valid_thru}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
