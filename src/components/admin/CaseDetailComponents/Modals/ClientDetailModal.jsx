import React from 'react';
import { X } from 'lucide-react';

const ClientDetailModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    { label: "Parent Name", value: "John Smith" },
    { label: "Relationship to Child", value: "Father" },
    { label: "Phone Number", value: "(555) 482-7391" },
    { label: "Email Address", value: "example@company.com" },
    { label: "Home Address", value: "245 Maplewood Drive" },
    { label: "City, State, ZIP", value: "Austin, TX 78704" },
    { label: "Child Name", value: "Cody Fisher" },
    { label: "Date of Birth", value: "March 12, 2018" },
    { label: "Age", value: "6 Years" },
    { label: "Primary Diagnosis", value: "Autism Spectrum Disorder" },
    { label: "School Name", value: "Greenwood School" },
    { label: "School Location", value: "Austin, TX 78704" },
    { label: "Service Location", value: "In-Home Therapy" },
    { label: "Case Status", value: "Active" },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-[32px] w-full max-w-[650px] max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col p-8 sm:p-10 font-poppins animate-in fade-in zoom-in duration-300 custom-scrollbar">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Client Information</h2>
            <p className="text-[#6B7280] text-[15px] font-medium mb-3">Additional Client Information</p>
            <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-[28px] p-6 sm:p-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((info, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1.5">
                  <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
                  <p className="text-[#800000] font-bold text-[16px] leading-tight">{info.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;
