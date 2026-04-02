import React from 'react';
import { ChevronRight } from 'lucide-react';

const ClientInfoSection = ({ clientInfo }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
         <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
         <h3 className="text-[20px] md:text-2xl font-extrabold text-Third leading-none">Vitals & ID</h3>
      </div>
      <div className="w-24 h-[4px] bg-Primary/20 rounded-full mb-8"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow mb-8">
        {clientInfo.map((info, idx) => (
          <div key={idx} className="bg-gray-50/50 p-6 rounded-[28px] border border-gray-100 flex flex-col gap-1.5 group hover:bg-white hover:border-Primary/30 transition-all shadow-sm shadow-gray-100/10">
            <span className="text-gray-400 text-[12px] md:text-[13px] font-bold uppercase tracking-wider">{info.label}</span>
            <span className="text-Third font-black text-[17px] md:text-[19px] leading-tight">{info.value}</span>
          </div>
        ))}
      </div>
      
      <button className="w-fit flex items-center justify-center gap-2.5 px-8 py-3 bg-white border border-gray-100 text-Secondary font-bold text-[14px] rounded-2xl hover:bg-Secondary hover:text-white hover:border-Secondary transition-all shadow-sm active:scale-95 group">
        Full Demographics <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default ClientInfoSection;
