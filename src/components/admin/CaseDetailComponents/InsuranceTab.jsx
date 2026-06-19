import React from 'react';
import { ShieldCheck, Info, CreditCard, Activity, FileText } from 'lucide-react';

const InsuranceTab = ({ insuranceCaseData, isLoading }) => {
  // ---- Skeleton - Loading State ----
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Summary Card Skeleton */}
        <div className="bg-gray-100 rounded-[24px] md:rounded-[32px] p-8 md:p-10 mb-10 min-h-[160px] animate-pulse" />

        {/* Property Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
              <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
              <div className="h-5 w-28 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.05 + 0.03}s` }} />
            </div>
          ))}
        </div>

        {/* Unit Consumption + Admin Protocol Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">
          <div className="flex flex-col gap-6">
            <div className="h-5 w-48 bg-gray-200 rounded-full animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border-2 border-gray-50 rounded-[24px] p-6 flex flex-col items-center gap-2">
                  <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  <div className="h-3 w-20 bg-gray-100 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-[28px] p-8 min-h-[200px] animate-pulse" />
        </div>

        {/* CPT Codes Skeleton */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="h-5 w-48 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border-2 border-gray-50 rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row gap-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl animate-pulse shrink-0" />
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="h-4 w-44 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-7 w-28 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!insuranceCaseData) {
    return (
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShieldCheck size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-300 font-bold text-[15px]">No insurance data available</p>
          <p className="text-gray-200 text-[12px] font-bold mt-1">Insurance details will appear here once assigned</p>
        </div>
      </div>
    );
  }

  const {
    primary_network = "",
    insurance_provider = "",
    member_id = "",
    plan_policy_number = "",
    authorization_number = "",
    auth_start_date = "",
    auth_end_date = "",
    days_remaining = 0,
    total_authorized_units = 0,
    units_used = 0,
    units_left = 0,
    status = "active",
    cpts = [],
  } = insuranceCaseData;

  // Parse the primary network to extract name and type if possible
  const networkParts = primary_network.split(" - ");
  const networkName = networkParts[0] || primary_network;
  const networkType = networkParts[1] || "";

  const propertyItems = [
    { label: "Authorization Number", value: authorization_number },
    { label: "Insurance Provider", value: insurance_provider },
    { label: "Member ID", value: member_id },
    { label: "Plan / Policy Number", value: plan_policy_number },
    { label: "Authorization Start Date", value: auth_start_date },
    { label: "Authorization End Date", value: auth_end_date },
  ];

  const daysRemainingFormatted = Math.floor(days_remaining);
  const isActive = status === "active";

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
              <h2 className="text-[24px] md:text-3xl font-bold mb-2 tracking-tight">
                {networkName}
                {networkType && <span className="text-[#FFBB03]/40"> {networkType}</span>}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                 {member_id && (
                   <span className="text-white/60 text-[12px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">ID: {member_id}</span>
                 )}
                 {authorization_number && (
                   <span className="text-white/60 text-[12px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">Auth: #{authorization_number}</span>
                 )}
              </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto lg:text-right relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
           <div className="flex-1 w-full text-center sm:text-left lg:text-right">
              <p className="text-[#FFBB03] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-2 leading-none">Authorization Window</p>
              <h2 className="text-[20px] md:text-[28px] font-bold mb-1 whitespace-nowrap tracking-tight">
                {auth_end_date}
              </h2>
              <p className="text-[#1EB15D] text-[13px] font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start lg:justify-end gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#1EB15D]"></span> {daysRemainingFormatted} Days Remaining
              </p>
           </div>
        </div>
      </div>

      {/* Property Grid - High Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
        {propertyItems.map((item, idx) => (
          <div key={idx} className="bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-gray-100 flex flex-col gap-1.5 hover:bg-white hover:border-[#FFBB03]/30 hover:shadow-md transition-all group shadow-sm">
             <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest leading-none mb-1 group-hover:text-[#76121F] transition-colors">{item.label}</span>
             <span className="text-[#76121F] font-bold text-[14px] md:text-[15px] leading-tight">{item.value || "—"}</span>
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
                 { label: "Approved Block", val: String(total_authorized_units), color: "text-[#76121F]", sub: "Total Units" },
                 { label: "Logged Count", val: String(units_used), color: "text-[#76121F]", sub: "Units Used" },
                 { label: "Active Balance", val: String(units_left), color: "text-[#76121F]", sub: "Units Left" }
               ].map((u, i) => (
                  <div key={i} className="bg-white border-2 border-gray-50 rounded-[24px] p-6 text-center flex flex-col items-center justify-center gap-0.5 hover:border-[#76121F]/10 hover:shadow-lg transition-all duration-300">
                     <span className={`text-2xl md:text-3xl font-bold leading-none ${u.color}`}>{u.val}</span>
                     <span className="text-gray-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wider mt-2">{u.sub}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Alert Component - Administrative Protocol */}
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
      {cpts.length > 0 && (
        <div className="text-left">
           <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-6">
              <CreditCard size={20} className="text-[#76121F]" />
              <h4 className="text-[16px] md:text-[18px] font-bold text-[#3A331E] tracking-tight">Active Billing Identifiers (CPT)</h4>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cpts.map((code) => (
                 <div key={code.id} className="bg-white border-2 border-gray-50 rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#FFBB03]/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#76121F] flex-shrink-0 shadow-inner border border-gray-100 group">
                       <FileText size={28} className="group-hover:rotate-6 transition-transform" />
                    </div>
                    <div className="flex flex-col gap-3">
                       <div className="flex items-center justify-between gap-4 flex-wrap">
                          <h2 className="text-[28px] md:text-[32px] font-bold text-[#76121F] tracking-tighter leading-none">{code.cpt_code}</h2>
                          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm ${
                            code.status === "active" || code.status === "Active"
                              ? "bg-[#E5F9ED] text-[#1EB15D]"
                              : "bg-gray-100 text-gray-400"
                          }`}>
                             <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                               code.status === "active" || code.status === "Active" ? "bg-[#1EB15D]" : "bg-gray-400"
                             }`}></span>
                             {code.status}
                          </span>
                       </div>
                       <div className="flex flex-col gap-1.5">
                          <h5 className="font-bold text-[#3A331E] text-[15px] md:text-[16px] leading-tight">{code.title}</h5>
                          {code.description && (
                            <p className="text-gray-400 text-[12px] md:text-[13px] font-medium leading-relaxed max-w-sm line-clamp-2">{code.description}</p>
                          )}
                       </div>
                       <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-2 w-full bg-gray-50 p-1.5 pr-4 rounded-xl border border-gray-100">
                             <div className="w-7 h-7 rounded-lg bg-[#76121F] flex items-center justify-center text-white shrink-0">
                                <span className="text-[9px] font-bold">UNITS</span>
                             </div>
                             <span className="text-[#76121F] font-bold text-[12px] md:text-[13px] truncate">{code.authorized_units} Registered</span>
                          </div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceTab;
