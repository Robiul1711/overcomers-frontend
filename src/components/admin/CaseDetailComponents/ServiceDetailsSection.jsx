import React from 'react';
import { ExternalLink } from 'lucide-react';

const ServiceDetailsSection = ({ serviceDetails, onViewMember }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
         <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
         <h3 className="text-[20px] md:text-2xl font-extrabold text-Third leading-none">Assignment Protocol</h3>
      </div>
      <div className="w-24 h-[4px] bg-Secondary/10 rounded-full mb-8"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {serviceDetails.map((detail, idx) => (
          <div key={idx} className="bg-gray-50/50 p-5 rounded-[28px] border border-gray-100 flex flex-col gap-2 min-h-[120px] shadow-sm shadow-gray-100/10 hover:bg-white hover:border-Secondary/20 transition-all group">
            <span className="text-gray-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-none mb-1">{detail.label}</span>
            <span className="text-Secondary font-black text-[15px] md:text-[17px] leading-snug">{detail.value}</span>
            {detail.hasLink && (
              <button 
                onClick={() => onViewMember(detail.value)}
                className="w-fit flex items-center gap-2 px-3 py-1 bg-white border border-Secondary/10 text-Secondary/60 font-bold text-[11px] mt-auto rounded-lg hover:bg-Secondary hover:text-white hover:border-Secondary transition-all shadow-sm"
              >
                Team Profile <ExternalLink size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsSection;
