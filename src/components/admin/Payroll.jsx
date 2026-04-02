import React, { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  FileText,
  X,
  Search
} from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('Payment History');
  const [showModal, setShowModal] = useState(false);
  const [selectedStub, setSelectedStub] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const stats = [
    { icon: <Clock className="text-Secondary" size={24} />, label: "Total Hours Worked", value: "120hrs", subtext: "This month", bgColor: "bg-white" },
    { icon: <DollarSign className="text-Secondary" size={24} />, label: "Total Earnings", value: "$3,000", subtext: "March 2026", bgColor: "bg-white" },
    { icon: <ShieldCheck className="text-Secondary" size={24} />, label: "Pending Payments", value: "$500", subtext: "Awaiting processing", bgColor: "bg-white" },
    { icon: <Calendar className="text-Secondary" size={24} />, label: "Last Payment", value: "Mar 15", subtext: "2026", bgColor: "bg-white" },
  ];

  const hoursSummary = [
    { label: "Today", value: "2h 00m", scheduled: "4h 00m", icon: <Clock size={16} />, progress: 50 },
    { label: "This Week", value: "18h 30m", target: "32h / week", icon: <Calendar size={16} />, progress: 58 },
    { label: "This Month", value: "120h 00m", target: "128h / month", icon: <Target size={16} />, progress: 93 },
  ];

  const payrollData = [
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Pending" },
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Paid" },
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Paid" },
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Paid" },
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Paid" },
    { period: "Feb 15 – Feb 28, 2026", hours: "40 hrs", rate: "$25.00 / hr", gross: "$1,000", deductions: "$76.50", net: "$923.50", status: "Paid" },
  ];

  const taxData = [
    { form: "1099-NEC", desc: "Nonemployee Compensation", type: "PDF", year: "2026", date: "March 9, 2026", status: "Available" },
  ];

  const handleViewPaystub = (item) => {
    setSelectedStub(item);
    setShowModal(true);
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8 font-poppins pb-10'>
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 border border-gray-50 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F7] flex items-center justify-center flex-shrink-0">
              {stat.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                 <span className="text-xl md:text-2xl font-bold text-Third leading-none">{stat.value}</span>
                 {stat.label === "Total Hours Worked" && <span className="text-xs font-bold text-gray-400">hrs</span>}
              </div>
              <p className="text-[12px] md:text-[13px] font-bold text-Third mt-1 truncate">{stat.label}</p>
              <p className="text-[11px] text-gray-400 font-medium">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth px-1">
        <div className="flex items-center min-w-max gap-6 md:gap-8">
          {['Payment History', 'Tax Documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 text-[14px] md:text-[15px] font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-Secondary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === 'Payment History' ? <DollarSign size={18} /> : <FileText size={18} />}
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-Secondary rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Payment History" ? (
        <div className="flex flex-col gap-6 md:gap-8 px-1">
          {/* Hours Summary Section */}
          <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50">
            <div className="mb-8">
              <h3 className="text-[18px] md:text-xl font-bold text-Third">Workload Summary</h3>
              <p className="text-gray-400 text-[13px] font-medium mt-0.5">Automated tracking from session approvals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hoursSummary.map((item, i) => (
                <div key={i} className="border border-Secondary/10 bg-Secondary/[0.01] rounded-2xl p-5 relative overflow-hidden flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[12px] md:text-[13px] mb-2">
                    {item.icon} <span className="uppercase tracking-wider">{item.label}</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-Third mb-1">{item.value}</h4>
                  <p className="text-gray-400 text-[12px] md:text-[13px] font-medium mb-5">
                    {item.scheduled ? `Scheduled: ${item.scheduled}` : `Target: ${item.target}`}
                  </p>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-auto">
                    <div 
                      className="h-full bg-Secondary rounded-full transition-all duration-1000" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History Table Container */}
          <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-[18px] md:text-xl font-bold text-Third">Disbursement Logs</h3>
                <p className="text-gray-400 text-[13px] font-medium mt-0.5">Historical overview of your processed earnings</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                {/* Status Filter */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between gap-4 w-full sm:w-auto px-5 py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-Third bg-white hover:bg-gray-50 transition-all active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                       <span className="opacity-50 font-medium">Filter:</span> {statusFilter}
                    </span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute top-[110%] right-0 w-full sm:w-48 bg-white rounded-xl shadow-2xl border border-gray-50 z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                      {['All Statuses', 'Paid', 'Pending'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 text-[13px] font-bold transition-all ${
                            statusFilter === status ? "bg-Secondary text-white" : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-Primary hover:bg-Primary/90 text-Third font-bold text-[13px] rounded-xl transition-all shadow-sm active:scale-95">
                  <Download size={18} /> Export <span className="hidden xs:inline">Statement</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider rounded-tl-xl">Pay Period</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Total Hours</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Pay Rate</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Gross Pay</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Deductions</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Net Pay</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider rounded-tr-xl text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payrollData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6 text-Third font-bold text-[14px]">{item.period}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px] text-center">{item.hours}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px] text-center">{item.rate}</td>
                      <td className="py-5 px-6 text-Secondary font-bold text-[15px] text-center">{item.gross}</td>
                      <td className="py-5 px-6 text-red-500 font-bold text-[15px] text-center">{item.deductions}</td>
                      <td className="py-5 px-6 text-[#1eb15d] font-bold text-[15px] text-center">{item.net}</td>
                      <td className="py-5 px-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-block leading-none border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
                          item.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <button 
                          onClick={() => handleViewPaystub(item)}
                          className={`min-w-[130px] px-6 py-2.5 rounded-xl text-[12px] font-bold transition-all border shadow-sm active:scale-95 ${
                            index === 0 
                              ? "bg-Secondary text-white border-Secondary" 
                              : "bg-white text-Secondary border-Secondary/20 hover:bg-Secondary hover:text-white"
                          }`}
                        >
                          View Paystub
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* mobile hint */}
            <div className="md:hidden mt-4 py-3 px-4 bg-gray-50/50 rounded-xl text-center">
               <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view complete records</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100 mx-1">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-[18px] md:text-xl font-bold text-Third">Internal Revenue Forms</h3>
                <p className="text-gray-400 text-[13px] font-medium mt-0.5">Secure yearly tax documentation generated by administration</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 border border-Primary/30 bg-[#FFFBF3] rounded-2xl w-full md:w-auto">
                 <ShieldCheck size={18} className="text-Secondary" strokeWidth={2.5} />
                 <span className="text-[11px] md:text-[12px] font-bold text-Secondary uppercase tracking-wide">Archived by Admin</span>
              </div>
           </div>

           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider rounded-tl-xl w-[30%]">Form Reference</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Ext.</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Fiscal Year</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Date Issued</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-6 text-Third font-bold text-[13px] uppercase tracking-wider rounded-tr-xl text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {taxData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex flex-col">
                            <p className="text-Third font-bold text-[14px]">{item.form}</p>
                            <p className="text-gray-400 text-[11px] font-medium leading-none mt-1">{item.desc}</p>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-gray-500 font-bold text-[12px] text-center">{item.type}</td>
                      <td className="py-5 px-6 text-gray-500 font-bold text-[13px] text-center">{item.year}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[13px] text-center whitespace-nowrap">{item.date}</td>
                      <td className="py-5 px-6 text-center">
                        <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-green-50 text-green-600 border border-transparent shadow-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[12px] font-bold transition-all border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white shadow-sm active:scale-95">
                          <Download size={16} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      )}

      {/* Paystub Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col p-6 sm:p-10 font-poppins animate-in fade-in slide-in-from-bottom-8 duration-300">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="text-[24px] md:text-3xl font-extrabold text-Third leading-tight">Paystub Record</h2>
                <div className="flex items-center gap-2 mt-1">
                   <Calendar size={14} className="text-gray-400" />
                   <p className="text-gray-400 text-[13px] font-bold">Feb 15 – Feb 28, 2026</p>
                </div>
                <div className="w-24 h-[4px] bg-Primary rounded-full mt-6"></div>
              </div>
              <img src={ImageProvider.Logo} alt="Overcomers" className="h-16 md:h-20 w-auto object-contain self-end sm:self-auto" />
            </div>

            {/* Summary Box */}
            <div className="bg-Secondary rounded-[24px] p-6 md:p-8 mb-8 text-center text-white relative overflow-hidden shadow-xl shadow-Secondary/20">
               <div className="relative z-10">
                  <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Total Professional Disbursement</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                     <span className="text-Primary font-extrabold text-[40px] md:text-[52px] leading-none">$923.50</span>
                  </div>
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/10 rounded-full text-[12px] font-bold border border-white/5 backdrop-blur-sm">
                     <span className="opacity-70">Gross: $1,000.00</span>
                     <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                     <span className="text-red-300">Taxes: $76.50</span>
                  </div>
               </div>
               
               {/* Decorative Circle */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
            </div>

            {/* Information Grid Container */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-[28px] p-5 sm:p-8 mb-6">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-Secondary rounded-full"></div>
                  <h4 className="text-[14px] md:text-[15px] font-bold text-Third uppercase tracking-wider">Statement Details</h4>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Payee Name", value: "Eleanor Pena" },
                    { label: "Personnel ID", value: "EMP-2024-017" },
                    { label: "Pay Frequency", value: "Bi-Weekly" },
                    { label: "Issuance Date", value: "April 1, 2026" },
                    { label: "Hours Claimed", value: "40.00 hrs" },
                    { label: "Base Rate", value: "$25.00 / hr" },
                  ].map((info, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">{info.label}</p>
                      <p className="text-[15px] font-bold text-Third leading-tight">{info.value}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 mb-8 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-red-400 rounded-full"></div>
                  <h4 className="text-[14px] md:text-[15px] font-bold text-Third uppercase tracking-wider">Adjustment Summary</h4>
               </div>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <span className="text-gray-500 font-bold text-[13px]">Statutory Deductions (FICA)</span>
                    <span className="font-bold text-red-500">-$76.50</span>
                 </div>
                 <div className="h-px bg-gray-50 my-4"></div>
                 <div className="flex justify-between items-center text-[15px] px-2 pt-2">
                    <span className="text-gray-400 font-bold">Total Earnings</span>
                    <span className="font-bold text-Third">$1,000.00</span>
                 </div>
                 <div className="flex justify-between items-center text-[18px] md:text-[20px] bg-Primary/5 px-4 py-4 rounded-2xl border border-Primary/10 mt-6">
                    <span className="text-Secondary font-extrabold uppercase tracking-tight">Net Transfer</span>
                    <span className="font-extrabold text-[#1eb15d]">$923.50</span>
                 </div>
               </div>
            </div>

            {/* Notice */}
            <div className="bg-orange-50/50 rounded-2xl p-4 flex items-center gap-4 mb-8 border border-orange-100/50">
               <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Info size={14} className="text-orange-600" />
               </div>
               <p className="text-[12px] font-bold text-orange-800/80 leading-relaxed">This record is automatically generated based on verified session logs and approved clinical overrides.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={() => setShowModal(false)}
                className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                Close Statement
              </button>
              <button 
                className="w-full sm:flex-1 bg-Secondary hover:bg-Secondary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-Secondary/20 active:scale-95"
              >
                <Download size={20} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Target icon was not imported from lucide-react, using Crosshair as replacement or placeholder
const Target = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default Payroll;
