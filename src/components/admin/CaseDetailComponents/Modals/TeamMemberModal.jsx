import React from 'react';
import { X } from 'lucide-react';

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const TeamMemberModal = ({ isOpen, onClose, selectedMember, isLoading = false }) => {
  if (!isOpen) return null;
  if (!isLoading && !selectedMember) return null;

  const sections = [
    { label: "Full Name", value: selectedMember?.name },
    { label: "Role", value: selectedMember?.role },
    { label: "Phone Number", value: selectedMember?.phone },
    { label: "Email Address", value: selectedMember?.email },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-[32px] w-full max-w-[650px] relative z-10 shadow-2xl flex flex-col p-8 sm:p-10 font-poppins animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            {isLoading ? (
              <>
                <SkeletonBox className="h-8 w-56 mb-2" />
                <SkeletonBox className="h-4 w-40 mb-3" />
                <SkeletonBox className="h-[2px] w-full rounded-full" />
              </>
            ) : (
              <>
                <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">{selectedMember.name}</h2>
                <p className="text-[#6B7280] text-[15px] font-medium mb-3">{selectedMember.dateRange || "Feb 15 – Feb 28, 2026"}</p>
                <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
              </>
            )}
          </div>
          <button 
            onClick={onClose}
            className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90 shrink-0"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-[28px] p-6 sm:p-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2">
                      <SkeletonBox className="h-3 w-20" />
                      <SkeletonBox className="h-5 w-32" />
                    </div>
                  ))
                : sections.map((info, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1.5">
                      <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
                      <p className="text-[#800000] font-bold text-[16px] leading-tight">{info.value}</p>
                    </div>
                  ))
              }
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
