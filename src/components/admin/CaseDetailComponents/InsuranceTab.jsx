import React from 'react';
import { ShieldCheck, Info, Calendar, CreditCard, Clock, Activity, FileText } from 'lucide-react';

const InsuranceTab = ({ insuranceDetails, cptCodes, authHistory }) => {
  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-6 bg-[#FFBB03] rounded-full"></div>
           <h3 className="text-lg md:text-xl font-bold text-[#3A331E] tracking-tight flex items-center gap-3">
             Insurance <span className="text-gray-400 text-[10px] md:text-[12px] font-bold uppercase tracking-widest hidden sm:inline">(Admin Access Only)</span>
           </h3>
        </div>
        <div className="w-16 h-[3px] bg-[#FFBB03]/20 rounded-full md:hidden"></div>
      </div>

      {/* Modern Insurance Summary Card */}
      <div className="bg-[#76121F] rounded-[24px] md:rounded-[32px] p-8 md:p-10 text-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-10 mb-10 shadow-xl shadow-[#76121F]/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFBB03]/5 rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110"></div>
        
        <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto">
           <div>
              <p className="text-[#FFBB03] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-2 leading-none">Primary Network</p>
              <h2 className="text-[24px] md:text-3xl font-bold mb-2 tracking-tight">Aetna <span className="text-[#FFBB03]/40">PPO</span></h2>
              <div className="flex items-center gap-3 flex-wrap">
                 <span className="text-white/60 text-[12px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">ID: M-2024-4421</span>
                 <span className="text-white/60 text-[12px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">Auth: #C8812945</span>
              </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto lg:text-right relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
           <div className="flex-1 w-full text-center sm:text-left lg:text-right">
              <p className="text-[#FFBB03] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-2 leading-none">Authorization Window</p>
              <h2 className="text-[20px] md:text-[28px] font-bold mb-1 whitespace-nowrap tracking-tight">August 31, <span className="opacity-40 font-bold">2026</span></h2>
              <p className="text-[#1EB15D] text-[13px] font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start lg:justify-end gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#1EB15D]"></span> 177 Days Remaining
              </p>
           </div>
        </div>
      </div>

      {/* Property Grid - High Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
        {insuranceDetails.map((item, idx) => (
          <div key={idx} className="bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-gray-100 flex flex-col gap-1.5 hover:bg-white hover:border-[#FFBB03]/30 hover:shadow-md transition-all group shadow-sm">
             <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest leading-none mb-1 group-hover:text-[#76121F] transition-colors">{item.label}</span>
             <span className="text-[#76121F] font-bold text-[14px] md:text-[15px] leading-tight">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Multi-Section Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12 items-start">
         {/* Authorized Units Viz */}
         <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
               <Activity size={20} className="text-[#76121F]" />
               <h4 className="text-[16px] md:text-[18px] font-bold text-[#3A331E] tracking-tight">Unit Consumption Monitoring</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
               {[
                 { label: "Approved Block", val: "240", color: "text-[#76121F]", sub: "Total Units" },
                 { label: "Logged Count", val: "68", color: "text-[#76121F]", sub: "Units Used" },
                 { label: "Active Balance", val: "172", color: "text-[#76121F]", sub: "Units Left" }
               ].map((u, i) => (
                  <div key={i} className="bg-white border-2 border-gray-50 rounded-[24px] p-6 text-center flex flex-col items-center justify-center gap-0.5 hover:border-[#76121F]/10 hover:shadow-lg transition-all duration-300">
                     <span className={`text-2xl md:text-3xl font-bold leading-none ${u.color}`}>{u.val}</span>
                     <span className="text-gray-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wider mt-2">{u.sub}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Alert Component */}
         <div className="bg-[#FFBB03]/[0.03] border-2 border-dashed border-[#FFBB03]/30 rounded-[28px] p-8 flex flex-col items-center sm:items-start text-center sm:text-left gap-5 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Info size={100} />
            </div>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#76121F] shadow-lg shadow-[#FFBB03]/10">
               <Info size={24} />
            </div>
            <div className="flex flex-col gap-3">
               <h4 className="text-[16px] md:text-[18px] font-bold text-[#76121F] uppercase tracking-widest leading-tight">Administrative Protocol</h4>
               <p className="text-[#76121F]/60 text-[13px] md:text-[14px] font-medium leading-relaxed italic max-w-md">
                 Authorization cycles are synchronized by corporate billing. Direct modifications are restricted to Case Managers and BCBA supervisors with tier-2 clearance.
               </p>
            </div>
            <button className="px-7 py-3 bg-[#76121F] text-white rounded-xl font-bold text-[12px] uppercase tracking-widest mt-auto shadow-lg shadow-[#76121F]/10 active:scale-95">Open Compliance Hub</button>
         </div>
      </div>

      {/* CPT Codes with Clinical Look */}
      <div className="mb-12 text-left">
         <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-6">
            <CreditCard size={20} className="text-[#76121F]" />
            <h4 className="text-[16px] md:text-[18px] font-bold text-[#3A331E] tracking-tight">Active Billing Identifiers (CPT)</h4>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cptCodes.map((code, i) => (
               <div key={i} className="bg-white border-2 border-gray-50 rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#FFBB03]/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#76121F] flex-shrink-0 shadow-inner border border-gray-100 group">
                     <FileText size={28} className="group-hover:rotate-6 transition-transform" />
                  </div>
                  <div className="flex flex-col gap-3">
                     <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h2 className="text-[28px] md:text-[32px] font-bold text-[#76121F] tracking-tighter leading-none">{code.code}</h2>
                        <span className="flex items-center gap-2 px-3 py-1 bg-[#E5F9ED] text-[#1EB15D] rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                           <span className="w-1.5 h-1.5 bg-[#1EB15D] rounded-full animate-pulse"></span> {code.status}
                        </span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <h5 className="font-bold text-[#3A331E] text-[15px] md:text-[16px] leading-tight">{code.title}</h5>
                        <p className="text-gray-400 text-[12px] md:text-[13px] font-medium leading-relaxed max-w-sm line-clamp-2">{code.desc}</p>
                     </div>
                     <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-2 w-full bg-gray-50 p-1.5 pr-4 rounded-xl border border-gray-100">
                           <div className="w-7 h-7 rounded-lg bg-[#76121F] flex items-center justify-center text-white shrink-0">
                              <span className="text-[9px] font-bold">UNITS</span>
                           </div>
                           <span className="text-[#76121F] font-bold text-[12px] md:text-[13px] truncate">{code.units} Registered</span>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* History Table - Professional Look */}
      <div className="text-left">
         <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-6">
            <Clock size={22} className="text-[#76121F]" />
            <h4 className="text-[16px] md:text-[18px] font-bold text-[#3A331E] tracking-tight">Full Authorization Timeline</h4>
         </div>
         <div className="overflow-x-auto custom-scrollbar -mx-2 px-2">
            <div className="min-w-[950px] inline-block w-full align-middle border-2 border-gray-50 rounded-[24px] overflow-hidden shadow-sm">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50/80 border-b border-gray-50">
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Transaction Number</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Activation Date</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Terminating Date</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">CPT Block</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Authorized Units</th>
                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">Protocol Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {authHistory.map((h, i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors group">
                           <td className="py-4 px-6 font-bold text-[#76121F] text-[14px]">{h.number}</td>
                           <td className="py-4 px-6 font-medium text-gray-500 text-[13px]">{h.start}</td>
                           <td className="py-4 px-6 font-medium text-gray-500 text-[13px]">{h.end}</td>
                           <td className="py-4 px-6">
                              <span className="font-medium text-gray-500 text-[13px] py-1 px-3 bg-gray-50 border border-gray-100 rounded-lg">{h.codes}</span>
                           </td>
                           <td className="py-4 px-6 font-bold text-[#3A331E] text-[14px]">{h.units}</td>
                           <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                                 h.status === 'Active' ? 'bg-[#E5F9ED] text-[#1EB15D]' : 'bg-[#FAF6F7] text-[#76121F] opacity-50'
                              }`}>
                                 <div className={`w-1.5 h-1.5 rounded-full ${h.status === 'Active' ? 'bg-[#1EB15D]' : 'bg-[#76121F]'}`}></div>
                                 {h.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         <div className="mt-4 text-center lg:hidden">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic">Slide horizontally for complete transaction history</p>
         </div>
      </div>
    </div>
  );
};

export default InsuranceTab;
