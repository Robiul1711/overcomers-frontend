import React from 'react';
import { FileText, Download, Plus } from 'lucide-react';

const ClinicFilesSection = ({ clinicFiles }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 transition-all hover:shadow-md h-full">
      <div className="mb-8">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
            <h3 className="text-[22px] md:text-2xl font-black text-Third tracking-tight leading-none">Diagnostic Documentation</h3>
         </div>
         <p className="text-gray-400 font-bold text-[13px] md:text-[14px] uppercase tracking-widest ml-4">Authorized HIPAA secure artifacts</p>
      </div>
      
      <div className="flex flex-col gap-4">
        {clinicFiles.map((file, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-[32px] border border-gray-100 bg-gray-50/50 group hover:bg-white hover:border-Primary/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white border border-gray-100 group-hover:bg-Primary group-hover:border-Primary rounded-[22px] flex items-center justify-center text-Secondary shadow-sm transition-all duration-300 shrink-0">
                <FileText size={28} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-Secondary font-black text-[16px] md:text-[17px] leading-tight truncate">{file.name}</span>
                <div className="flex items-center gap-2 flex-wrap">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 bg-Secondary/5 text-Secondary rounded border border-Secondary/5">Secure PDF</span>
                   <span className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">{file.date}</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white border-2 border-gray-100 text-Secondary font-black text-[13px] rounded-2xl hover:bg-Secondary hover:text-white hover:border-Secondary transition-all duration-300 shadow-sm active:scale-95 uppercase tracking-wider group/btn shrink-0">
              <Download size={18} className="group-hover/btn:translate-y-0.5 transition-transform" /> Export File
            </button>
          </div>
        ))}

        {/* Empty state / placeholder for more files if needed */}
        <div className="mt-4 p-8 border-2 border-dashed border-gray-50 rounded-[32px] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-gray-50 transition-colors opacity-60">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform shadow-sm mb-3">
              <Plus size={20} />
           </div>
           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">Deposit New Document</p>
        </div>
      </div>
    </div>
  );
};

export default ClinicFilesSection;
