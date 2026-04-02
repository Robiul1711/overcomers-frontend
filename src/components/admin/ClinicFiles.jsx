import React from 'react';
import { Video, FileText, ArrowUpRight, Download, PlusSquare, History } from 'lucide-react';

const ClinicFiles = () => {
  const previousFiles = [
    { id: 1, date: "Mar 15", title: "Training Documents", type: "Video", format: "video" },
    { id: 2, date: "Mar 13", title: "Training Documents", type: "Sheet", format: "document" },
    { id: 3, date: "Mar 12", title: "Training Documents", type: "Sheet", format: "document" },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins px-1 md:px-0">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Add Clinic Files Card */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col gap-8 min-h-fit md:min-h-[550px]">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
             <div>
                <h2 className="text-[22px] md:text-3xl font-extrabold text-Third leading-tight">Contribution Center</h2>
                <div className="w-24 h-[4px] bg-Primary rounded-full mt-2"></div>
             </div>
          </div>

          <div className="flex flex-col gap-6 flex-grow">
            {/* File Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Assigned Title</label>
              <input 
                type="text" 
                placeholder="e.g. Behavioral Analysis 101" 
                className="w-full bg-gray-50 border border-transparent focus:border-Primary/30 rounded-2xl py-4 px-6 outline-none text-[15px] font-bold text-Third transition-all"
              />
            </div>

            {/* Upload Section */}
            <div className="flex flex-col gap-3">
               <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Asset Selection</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Video Upload */}
                  <div className="bg-Secondary/[0.02] border-2 border-dashed border-Secondary/10 rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-Secondary/[0.05] transition-all group border-animate">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-Secondary shadow-lg shadow-Secondary/5 group-hover:scale-110 transition-transform">
                        <Video size={28} />
                     </div>
                     <span className="text-Secondary font-extrabold text-[18px] md:text-[20px]">Video</span>
                     <span className="text-Secondary/40 font-bold text-[11px] uppercase tracking-widest">MP4, MOV Formats</span>
                  </div>

                  {/* Documents Upload */}
                  <div className="bg-Primary/[0.02] border-2 border-dashed border-Primary/30 rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-Primary/[0.05] transition-all group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#B59654] shadow-lg shadow-Primary/5 group-hover:scale-110 transition-transform">
                        <FileText size={28} />
                     </div>
                     <span className="text-[#B59654] font-extrabold text-[18px] md:text-[20px]">Document</span>
                     <span className="text-[#B59654]/40 font-bold text-[11px] uppercase tracking-widest">PDF, DOC Formats</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="flex items-center justify-center gap-2 px-10 py-4 md:py-5 bg-gray-100 text-gray-400 font-bold rounded-2xl w-full sm:w-fit group cursor-not-allowed transition-all opacity-70">
            Publish Record <ArrowUpRight size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Previous Clinic Files Card */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col gap-8 min-h-fit md:min-h-[550px]">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
             <div>
                <h2 className="text-[22px] md:text-3xl font-extrabold text-Third leading-tight">Asset Repository</h2>
                <div className="w-24 h-[4px] bg-Secondary/10 rounded-full mt-2"></div>
             </div>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {previousFiles.map((file) => (
              <div key={file.id} className="bg-white border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:translate-y-[-4px] transition-all duration-300">
                <div className="flex items-center gap-5 md:gap-6 w-full sm:w-auto">
                  {/* Date Box */}
                  <div className="bg-Secondary/[0.03] rounded-2xl px-4 py-3 flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] border border-Secondary/5">
                    <span className="text-Secondary/40 font-bold text-[10px] md:text-[11px] uppercase tracking-tighter leading-none mb-1">{file.date.split(' ')[0]}</span>
                    <span className="text-Secondary font-extrabold text-[20px] md:text-[24px] leading-none shrink-0">{file.date.split(' ')[1]}</span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 w-full overflow-hidden">
                    <h3 className="text-[17px] md:text-[19px] font-extrabold text-Third group-hover:text-Secondary transition-colors truncate leading-tight">{file.title}</h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl w-fit border border-gray-100">
                      {file.format === 'video' ? <Video size={12} className="text-gray-400 shrink-0" /> : <FileText size={12} className="text-gray-400 shrink-0" />}
                      <span className="text-gray-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wide">{file.type} Asset</span>
                    </div>
                  </div>
                </div>

                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-Secondary/20 text-Secondary font-bold text-[13px] rounded-xl overflow-hidden relative shadow-sm active:scale-95 group/btn">
                  <div className="absolute inset-0 bg-Secondary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  <Download size={16} className="relative z-10 transition-colors group-hover/btn:text-white" /> 
                  <span className="relative z-10 transition-colors group-hover/btn:text-white">Download</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-6 text-center">
             <p className="text-[12px] font-bold text-gray-300 uppercase tracking-widest flex items-center justify-center gap-2">
                <PlusSquare size={14} /> End of active repository
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicFiles;