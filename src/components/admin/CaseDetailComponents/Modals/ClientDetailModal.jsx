import React from 'react';
import { X } from 'lucide-react';

const ClientDetailModal = ({ isOpen, onClose,dataCasted }) => {
  console.log(dataCasted)
  const sectionData=dataCasted?.client_information
  console.log(sectionData)
  if (!isOpen) return null;

  const sections = [
        { label: "Child Name", value: sectionData?.child_name },
    { label: "Date of Birth", value: sectionData?.child_dob },
    { label: "Age", value: sectionData?.age },
    { label: "Primary Diagnosis", value: sectionData?.primary_diagnosis || "N/A" },
    { label: "School Name", value: sectionData?.school_name || "N/A" },
    { label: "School Location", value: sectionData?.school_location || "N/A" },
    { label: "Service Location", value: sectionData?.service_location || "N/A" },
    { label: "Case Status", value: "Active" },
    { label: "Parent Name", value: sectionData?.client_name },
    { label: "Relationship to Child", value: sectionData?.relationship || "N/A"},
    { label: "Phone Number", value: sectionData?.phone_number || "N/A" },
    { label: "Email Address", value: sectionData?.email || "N/A"},
    { label: "Home Address", value: sectionData?.address || "N/A"},
    { label: "City, State, ZIP", value: sectionData?.address || "N/A"},

  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-[24px] w-full max-w-[650px] max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col p-4 md:p-6 font-poppins animate-in fade-in zoom-in duration-300 custom-scrollbar">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="w-full">
            <h2 className="text-[22px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Client Information</h2>
            <p className="text-[#6B7280] text-[13px] md:text-[15px] font-medium mb-3">Additional Client Information</p>
            <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-xl p-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sections.map((info, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1.5">
                  <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
                  <p className="text-[#800000] font-semibold text-[14px]">{info.value}</p>
                </div>
              ))}
           </div>

 
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;
