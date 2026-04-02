import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cases = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const casesData = [
    { name: "John Smith", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "Home", status: "Active" },
    { name: "Sarah Johnson", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "School", status: "Active" },
    { name: "Mike Wilson", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "Daycare", status: "Active" },
    { name: "Lisa Davis", id: "ABA-2026-009", date: "March 8, 2026", time: "10:00 AM", location: "Home", status: "Pending" },
    { name: "Bessie Cooper", id: "ABA-2026-009", date: "March 7, 2026", time: "10:00 AM", location: "Daycare", status: "Completed" },
    { name: "Robert Fox", id: "ABA-2026-009", date: "March 6, 2026", time: "10:00 AM", location: "Daycare", status: "Completed" },
    { name: "Guy Hawkins", id: "ABA-2026-009", date: "March 5, 2026", time: "10:00 AM", location: "Daycare", status: "Completed" },
    { name: "Eleanor Pena", id: "ABA-2026-009", date: "March 5, 2026", time: "10:00 AM", location: "Daycare", status: "Completed" },
  ];

  const statuses = ["All Statuses", "Active", "Pending", "Completed"];

  // filter data
  const filteredData = selectedStatus === "All Statuses" 
    ? casesData 
    : casesData.filter(item => item.status === selectedStatus);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active": return "bg-green-100/70 text-green-600";
      case "Pending": return "bg-[#FFF4E5] text-[#FF8A00]";
      case "Completed": return "bg-blue-100/70 text-blue-500";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className='flex flex-col gap-6 h-full'>
      {/* Table Container */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h3 className="text-[20px] md:text-[24px] font-bold text-Third">All Managed Cases</h3>
            <p className="text-gray-500 text-[13px] md:text-[14px] mt-1">Showing {filteredData.length} total records</p>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between gap-2 w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <span className="flex items-center gap-2">
                 <span className="opacity-70 font-medium">Filter:</span> {selectedStatus}
              </span>
              <ChevronDown size={18} />
            </button>
            
            {/* Dropdown Options */}
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute right-0 top-[110%] w-full sm:w-[200px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-20 flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
                  {statuses.map(status => {
                    const isSelected = selectedStatus === status;
                    return (
                      <div 
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all text-[13px] ${
                          isSelected 
                            ? 'bg-Secondary text-white font-bold' 
                            : 'bg-white border border-transparent text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {status}
                        {isSelected && <Check size={16} className="text-white" strokeWidth={3}/>}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider rounded-tl-xl">Client Name</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Case ID</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Time</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Location</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider rounded-tr-xl text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-Third text-[14px]">{item.name}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">{item.id}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">{item.date}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">{item.time}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">{item.location}</td>
                  <td className="py-5 px-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${getStatusStyles(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <Link to={`/dashboard/cases/${item.id}`} className="inline-block min-w-[120px]">
                      <button className="border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[12px] py-2 px-5 rounded-xl transition-all duration-200 shadow-sm">
                        View Details
                      </button>
                    </Link>
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
  );
};

export default Cases;

