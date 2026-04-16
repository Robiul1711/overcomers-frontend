import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProfileTab = ({ onViewClientDetail, onViewMember }) => {
  const clientInfo = [
    { label: "Client Name", value: "John Smith" },
    { label: "Date of Birth", value: "June 14, 2018" },
    { label: "Service Location", value: "Home" },
    { label: "Assigned Date", value: "March 1, 2026" },
  ];

  const serviceDetails = [
    { label: "Assigned Therapist", value: "Eleanor Pena", hasMore: true },
    { label: "Supervising BCBA", value: "Dr. Devon Lane", hasMore: true },
    { label: "Service Type", value: "ABA Therapy" },
    { label: "Session Frequency", value: "3× per week" },
    { label: "Service Start Date", value: "March 1, 2026" },
    { label: "Session Time", value: "2:00 PM – 5:00 PM" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Client Information Card */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Client Information</h2>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {clientInfo.map((info, i) => (
            <div key={i} className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5">
              <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
              <p className="text-[#800000] font-bold text-[18px] leading-tight">{info.value}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={onViewClientDetail}
          className="mt-4 flex items-center gap-1.5 text-[#76121F] font-bold text-[15px] hover:underline transition-all w-fit"
        >
          View More <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Service Details Card */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Service Details</h2>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {serviceDetails.map((info, i) => (
            <div key={i} className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5">
              <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
              <p className="text-[#800000] font-bold text-[18px] leading-tight">{info.value}</p>
              {info.hasMore && (
                <button 
                  onClick={() => onViewMember(info.value)}
                  className="mt-1 flex items-center gap-1.5 text-[#76121F] font-bold text-[12px] hover:underline transition-all"
                >
                  View More <ArrowUpRight size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
