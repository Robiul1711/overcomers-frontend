import React, { useState, useRef } from 'react';

import { 
  DollarSign, 
  Download, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  FileText,
  Target
} from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';
import useClient from '@/hooks/useClient';

const formatPayPeriod = (start, end) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const opts = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${d1.toLocaleDateString('en-US', opts)} – ${d2.toLocaleDateString('en-US', opts)}`;
};

const formatCurrency = (val) => {
  const num = parseFloat(val || 0);
  return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const Payroll = () => {
const [activeTab, setActiveTab] = useState('Payment History');
  const [showModal, setShowModal] = useState(false);
  const [selectedStub, setSelectedStub] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useClient({
    queryKey: ['employeePayrolls'],
    url: '/employee/payrolls',
  });
  const { data:textDocument, isLoading:textDocumentLoading, isError:textDocumentError, refetch:textDocumentRefetch } = useClient({
    queryKey: ['employeeTextDocumentsPayrolls'],
    url: '/employee/payrolls/tax-documents',
  });
  const topCards = data?.data?.top_cards || {};
  const workload = data?.data?.workload_summary || {};
  const hourlyRate = data?.data?.hourly_rate || '0';
  const payrolls = data?.data?.payrolls || [];
  const pagination = data?.data?.pagination || {};

  const stats = [
    {
      icon: <Clock className="text-Secondary" size={24} />,
      label: "Total Hours Worked",
      value: `${topCards.total_hours_this_month ?? 0}`,
      subtext: topCards.this_month_name || "This month",
      suffix: "hrs"
    },
    {
      icon: <DollarSign className="text-Secondary" size={24} />,
      label: "Total Earnings",
      value: formatCurrency(topCards.total_earnings_this_month ?? 0),
      subtext: topCards.this_month_name || "This month"
    },
    {
      icon: <ShieldCheck className="text-Secondary" size={24} />,
      label: "Pending Payments",
      value: formatCurrency(topCards.pending_payments ?? 0),
      subtext: "Awaiting processing"
    },
    {
      icon: <Calendar className="text-Secondary" size={24} />,
      label: "Last Payment",
      value: formatCurrency(topCards.last_payment_amount ?? 0),
      subtext: topCards.last_payment_date || "-"
    },
  ];

  const hoursSummary = [
    {
      label: "Today",
      value: `${workload?.today?.worked ?? 0}h 00m`,
      scheduled: `${workload?.today?.scheduled ?? 0}h 00m`,
      icon: <Clock size={16} />,
      progress: workload?.today?.scheduled > 0
        ? Math.round(((workload?.today?.worked ?? 0) / workload?.today?.scheduled) * 100)
        : 0
    },
    {
      label: "This Week",
      value: `${workload?.this_week?.worked ?? 0}h 00m`,
      target: `${workload?.this_week?.target ?? 0}h / week`,
      icon: <Calendar size={16} />,
      progress: workload?.this_week?.target > 0
        ? Math.round(((workload?.this_week?.worked ?? 0) / workload?.this_week?.target) * 100)
        : 0
    },
    {
      label: "This Month",
      value: `${workload?.this_month?.worked ?? 0}h 00m`,
      target: `${workload?.this_month?.target ?? 0}h / month`,
      icon: <Target size={16} />,
      progress: workload?.this_month?.target > 0
        ? Math.round(((workload?.this_month?.worked ?? 0) / workload?.this_month?.target) * 100)
        : 0
    },
  ];

  const filteredPayrolls = statusFilter === 'All Statuses'
    ? payrolls
    : payrolls.filter((p) => p.status === statusFilter);


  const handleViewPaystub = (item) => {
    setSelectedStub(item);
    setShowModal(true);
  
  };

  const SkeletonBox = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6 md:gap-8 font-poppins pb-10'>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex items-center gap-4">
              <SkeletonBox className="w-12 h-12 rounded-full shrink-0" />
              <div className="space-y-2">
                <SkeletonBox className="h-7 w-24" />
                <SkeletonBox className="h-4 w-28" />
                <SkeletonBox className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
        {/* Tabs Skeleton */}
        <SkeletonBox className="h-12 w-72 mx-1" />
        {/* Workload Skeleton */}
        <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50 mx-1">
          <SkeletonBox className="h-6 w-44 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-Secondary/10 rounded-2xl p-5 flex flex-col items-center gap-3">
                <SkeletonBox className="h-8 w-20" />
                <SkeletonBox className="h-8 w-16" />
                <SkeletonBox className="h-4 w-28" />
                <SkeletonBox className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col gap-6 md:gap-8 font-poppins pb-10 px-1'>
        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-50 overflow-hidden p-20 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-400">
            <DollarSign size={40} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-Third">Failed to load payroll data</h4>
            <p className="text-gray-400 text-sm">Please try again later</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl hover:bg-Secondary/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                 {stat.suffix && <span className="text-xs font-bold text-gray-400">{stat.suffix}</span>}
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
                      style={{ width: `${Math.min(item.progress, 100)}%` }}
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
                  {filteredPayrolls.length > 0 ? (
                    filteredPayrolls.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-6 text-Third font-bold text-[14px]">
                          {formatPayPeriod(item.pay_period_start, item.pay_period_end)}
                        </td>
                        <td className="py-5 px-6 text-gray-500 font-medium text-[14px] text-center">
                          {parseFloat(item.total_hours).toFixed(2)} hrs
                        </td>
                        <td className="py-5 px-6 text-gray-500 font-medium text-[14px] text-center">
                          {formatCurrency(item.hourly_rate)} / hr
                        </td>
                        <td className="py-5 px-6 text-Secondary font-bold text-[15px] text-center">
                          {formatCurrency(item.gross_pay)}
                        </td>
                        <td className="py-5 px-6 text-red-500 font-bold text-[15px] text-center">
                          {formatCurrency(item.deductions)}
                        </td>
                        <td className="py-5 px-6 text-[#1eb15d] font-bold text-[15px] text-center">
                          {formatCurrency(item.net_pay)}
                        </td>
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
                              item.status === 'Pending'
                                ? "bg-Secondary text-white border-Secondary" 
                                : "bg-white text-Secondary border-Secondary/20 hover:bg-Secondary hover:text-white"
                            }`}
                          >
                            View Paystub
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-gray-400 font-medium">
                        <div className="flex flex-col items-center gap-2">
                          <DollarSign size={32} className="text-gray-300" />
                          <p>No payroll records found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination / mobile hint */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div className="md:hidden py-3 px-4 bg-gray-50/50 rounded-xl text-center w-full">
                 <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view complete records</p>
              </div>
              {pagination?.total > pagination?.per_page && (
                <p className="hidden sm:block text-[12px] text-gray-400 font-medium">
                  Page {pagination.current_page} of {pagination.last_page} ({pagination.total} total)
                </p>
              )}
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
                  {textDocument?.data?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6">
                         <div className="flex flex-col">
                            <p className="text-Third font-bold text-[14px]">{item.form_reference}</p>
                            <p className="text-gray-400 text-[11px] font-medium leading-none mt-1">{item.description}</p>
                         </div>
                      </td>
                      <td className="py-5 px-6 text-gray-500 font-bold text-[12px] text-center">{item.extension}</td>
                      <td className="py-5 px-6 text-gray-500 font-bold text-[13px] text-center">{item.fiscal_year}</td>
                      <td className="py-5 px-6 text-gray-500 font-medium text-[13px] text-center whitespace-nowrap">{item.date_issued}</td>
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
      {showModal && selectedStub && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-[650px] max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col p-0 font-poppins animate-in fade-in zoom-in duration-300 custom-scrollbar">
            {/* Paystub content (captured for PDF) */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 font-poppins">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-full">
                  <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Paystub</h2>
                  <p className="text-[#6B7280] text-[15px] font-medium mb-3">
                    {formatPayPeriod(selectedStub.pay_period_start, selectedStub.pay_period_end)}
                  </p>
                  <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
                </div>
                <img src={ImageProvider.Logo} alt="Overcomers" className="h-[90px] w-auto object-contain -mt-4" />
              </div>

              {/* Top Summary Card */}
              <div className="bg-[#FAF8F8] border border-[#F3F4F6] rounded-[32px] p-8 mb-8 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <span className="text-[#800000] font-bold text-[18px]">Gross</span>
                     <span className="text-[#800000] font-black text-[40px] leading-tight">{formatCurrency(selectedStub.gross_pay)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-[#6B7280] text-[15px] font-bold mb-4">
                     <span>Deductions: {formatCurrency(selectedStub.deductions)}</span>
                     <div className="w-[1px] h-4 bg-gray-300"></div>
                     <span>Net Pay: {formatCurrency(selectedStub.net_pay)}</span>
                  </div>
                  <p className="text-[#3A331E] font-extrabold text-[16px] uppercase tracking-wider">Total Payment Summary</p>
              </div>

              {/* Professional Section */}
              <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-[28px] p-6 sm:p-8 mb-6">
                 <h4 className="text-[#3A331E] font-extrabold text-[18px] tracking-wide mb-6">Professional (Read-only)</h4>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Pay Period", value: formatPayPeriod(selectedStub.pay_period_start, selectedStub.pay_period_end) },
                      { label: "Payment Date", value: selectedStub.payment_date ? new Date(selectedStub.payment_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "-" },
                      { label: "Hours Worked", value: `${parseFloat(selectedStub.total_hours).toFixed(2)} hrs` },
                      { label: "Pay Rate", value: `${formatCurrency(selectedStub.hourly_rate)} / hr` },
                      { label: "Gross Payment", value: formatCurrency(selectedStub.gross_pay) },
                      { label: "Status", value: selectedStub.status, isStatus: true },
                    ].map((info, i) => (
                      <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1.5">
                        <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">{info.label}</p>
                        {info.isStatus ? (
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold w-fit ${
                            info.value === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-[#FFFBEE] text-[#FFBB03]'
                          }`}>
                            {info.value}
                          </span>
                        ) : (
                          <p className="text-[#800000] font-bold text-[16px] leading-tight">{info.value}</p>
                        )}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-[28px] p-6 sm:p-8 mb-6">
                 <h4 className="text-[#3A331E] font-extrabold text-[18px] tracking-wide mb-6">Deductions Breakdown</h4>
                 
                 <div className="space-y-4">
                   <div className="flex justify-between items-center px-2">
                      <span className="text-[#6B7280] font-bold text-[14px]">Total Deductions</span>
                      <span className="font-bold text-[#EF4444]">{formatCurrency(selectedStub.deductions)}</span>
                   </div>
                   <div className="h-px bg-[#FFF3D6] my-2"></div>
                   <div className="flex justify-between items-center px-2 pt-2">
                      <span className="text-[#6B7280] font-bold text-[14px]">Net Payment</span>
                      <span className="font-extrabold text-[#10B981] text-[16px]">{formatCurrency(selectedStub.net_pay)}</span>
                   </div>
                 </div>
              </div>

              {/* Notice */}
              <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-2xl p-4 flex items-center gap-3">
                 <ShieldCheck size={18} className="text-[#800000] shrink-0" />
                 <p className="text-[13px] font-bold text-[#800000]/70 leading-relaxed">Payroll is automatically calculated from approved clock-in/out records</p>
              </div>
            </div>

            {/* Actions (NOT included in PDF - outside the ref div) */}
            <div className="flex items-center justify-end gap-3 p-8 sm:p-10 pt-0">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-[#FFBB03] hover:bg-[#eab002] text-white font-bold text-[15px] px-10 py-3.5 rounded-xl transition-all active:scale-95 shadow-md shadow-[#FFBB03]/10"
              >
                Cancel
              </button>
              <button 
         
           
                className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[15px] px-10 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-60"
              >
                <Download size={18} />Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
