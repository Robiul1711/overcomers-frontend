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
    <div className='flex flex-col gap-6 font-poppins'>
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F7] flex items-center justify-center flex-shrink-0">
              {stat.icon}
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-bold text-Third leading-none">{stat.value}</span>
                 {stat.label === "Total Hours Worked" && <span className="text-xs font-bold text-gray-400">hrs</span>}
              </div>
              <p className="text-[13px] font-bold text-Third mt-1">{stat.label}</p>
              <p className="text-[11px] text-gray-400 font-medium">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100 mt-2">
        {['Payment History', 'Tax Documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-[15px] font-bold flex items-center gap-2 transition-all relative ${
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

      {activeTab === "Payment History" ? (
        <>
          {/* Hours Summary Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-Third">Hours Summary</h3>
              <p className="text-gray-400 text-sm font-medium mt-0.5">Automatically calculated from approved sessions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hoursSummary.map((item, i) => (
                <div key={i} className="border border-Secondary/50 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[13px] mb-2">
                    {item.icon} <span>{item.label}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-Third mb-1">{item.value}</h4>
                  <p className="text-gray-400 text-[13px] font-medium mb-4">
                    {item.scheduled ? `Scheduled: ${item.scheduled}` : `Target: ${item.target}`}
                  </p>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full bg-[#F5F5F5] h-2 rounded-full mt-auto">
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
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-Third">Payment History</h3>
                <p className="text-gray-400 text-sm font-medium mt-0.5">Payroll automatically calculated from approved sessions</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Status Filter */}
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-8 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-Third bg-white hover:bg-gray-50 transition-colors"
                  >
                    {statusFilter} <ChevronDown size={18} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                      {['All Statuses', 'Paid', 'Pending'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${
                            statusFilter === status ? "bg-Primary text-Secondary" : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button className="flex items-center gap-2 px-5 py-2.5 bg-Primary hover:bg-Primary/90 text-Third font-bold text-sm rounded-xl transition duration-300">
                  <Download size={18} /> Export CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#F8F8F8]">
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px] rounded-tl-2xl">Pay Period</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Total Hours</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Pay Rate</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Gross Pay</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Deductions</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Net Pay</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Status</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px] rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payrollData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6 text-Third font-bold text-[14px]">{item.period}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px]">{item.hours}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px]">{item.rate}</td>
                      <td className="py-5 px-6 text-Secondary font-bold text-[15px]">{item.gross}</td>
                      <td className="py-5 px-6 text-red-500 font-bold text-[15px]">{item.deductions}</td>
                      <td className="py-5 px-6 text-green-500 font-bold text-[15px]">{item.net}</td>
                      <td className="py-5 px-6">
                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${
                          item.status === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <button 
                          onClick={() => handleViewPaystub(item)}
                          className={`px-6 py-2 rounded-xl text-[13px] font-bold transition-all border ${
                            index === 0 
                              ? "bg-Secondary text-white border-Secondary shadow-md" 
                              : "bg-white text-Secondary border-Secondary hover:bg-Secondary hover:text-white"
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
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-Third">Tax Documents</h3>
                <p className="text-gray-400 text-sm font-medium mt-0.5">Yearly tax forms generated by administration. Employees can view and download only.</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-[#FFBB03]/30 bg-[#FFBB03]/5 rounded-xl">
                 <ShieldCheck size={16} className="text-[#FFBB03]" />
                 <span className="text-[12px] font-bold text-Secondary">Generated by Admin at year-end</span>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#F8F8F8]">
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px] rounded-tl-2xl">Form Type</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">File Type</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Year</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Generated Date</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px]">Status</th>
                    <th className="py-4 px-6 text-gray-500 font-bold text-[13px] rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {taxData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6">
                         <p className="text-Third font-bold text-[14px]">{item.form}</p>
                         <p className="text-gray-400 text-[11px] font-medium">{item.desc}</p>
                      </td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px]">{item.type}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px]">{item.year}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[14px]">{item.date}</td>
                      <td className="py-5 px-6">
                        <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-green-50 text-green-500">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <button className="flex items-center gap-2 px-6 py-2 rounded-xl text-[13px] font-bold transition-all border border-Secondary text-Secondary hover:bg-Secondary hover:text-white">
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col p-8 font-poppins">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-Third">Paystub</h2>
                <p className="text-gray-400 text-sm font-medium">Feb 15 – Feb 28, 2026</p>
                <div className="w-48 h-[3px] bg-Primary mt-4"></div>
              </div>
              <img src={ImageProvider.Logo} alt="Overcomers" className="h-20 w-auto object-contain" />
            </div>

            {/* Summary Box */}
            <div className="bg-[#FAF6F7] rounded-[24px] p-6 mb-8 text-center border border-[#76121F]/5 shadow-inner">
               <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-sm font-bold text-Secondary">Gross</span>
                  <span className="text-3xl font-extrabold text-Secondary">$1,000</span>
               </div>
               <div className="flex items-center justify-center gap-3 text-sm font-medium text-gray-500">
                  <span>Deductions: $76.50</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span>Net Pay: <span className="text-green-500 font-bold">$923.50</span></span>
               </div>
               <p className="text-[12px] font-bold text-gray-400 mt-3 tracking-wide uppercase">Total Payment Summary</p>
            </div>

            {/* Information Grid Container */}
            <div className="border border-[#F5F5F5] rounded-[24px] p-6 mb-6">
               <h4 className="text-[15px] font-bold text-Third mb-6 uppercase tracking-wider">Professional (Read-only)</h4>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Employee Name", value: "Eleanor Pena" },
                    { label: "Employee ID", value: "EMP-2024-017" },
                    { label: "Pay Period", value: "Mar 1 – Mar 15, 2026" },
                    { label: "Payment Date", value: "April 1, 2026" },
                    { label: "Hours Worked", value: "40 hrs" },
                    { label: "Pay Rate", value: "$25.00 / hr" },
                    { label: "Gross Payment", value: "$1,000" },
                    { label: "Status", value: "Pending", isStatus: true },
                  ].map((info, i) => (
                    <div key={i} className="bg-[#FAF9F6]/50 rounded-2xl p-4 border border-[#F5F5F4]">
                      <p className="text-[11px] font-bold text-Secondary/60 uppercase mb-1">{info.label}</p>
                      {info.isStatus ? (
                        <span className="text-[11px] font-extrabold bg-orange-50 text-orange-400 px-3 py-1 rounded-full uppercase">
                          {info.value}
                        </span>
                      ) : (
                        <p className="text-[15px] font-bold text-Secondary leading-tight">{info.value}</p>
                      )}
                    </div>
                  ))}
               </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="border border-[#F5F5F5] rounded-[24px] p-6 mb-6">
               <h4 className="text-[15px] font-bold text-Third mb-5 uppercase tracking-wider">Deductions Breakdown</h4>
               <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Federal Tax (FICA 7.65%)</span>
                    <span className="font-bold text-Third">$76.50</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50">
                    <span className="text-Secondary font-bold">Total Deductions</span>
                    <span className="font-bold text-red-500">$76.50</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-Secondary font-bold">Net Payment</span>
                    <span className="font-bold text-green-500">$923.50</span>
                 </div>
               </div>
            </div>

            {/* Notice */}
            <div className="bg-[#FAF6F7] rounded-xl p-4 flex items-center gap-3 mb-8 border border-[#76121F]/5">
               <div className="w-5 h-5 rounded-full border border-Secondary/30 flex items-center justify-center text-[10px] text-Secondary font-bold">i</div>
               <p className="text-[12px] font-bold text-Secondary/70">Payroll is automatically calculated from approved clock-in/out records</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-Primary hover:bg-Primary/90 text-Third font-bold py-4 rounded-2xl transition duration-300 shadow-sm"
              >
                Cancel
              </button>
              <button 
                className="flex-1 bg-Secondary hover:bg-Secondary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-maroon/20"
              >
                <Download size={20} /> Download
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
