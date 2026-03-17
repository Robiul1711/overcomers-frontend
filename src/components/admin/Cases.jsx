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
      <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col min-h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[22px] font-bold text-Third">All Cases</h3>
            <p className="text-gray-500 text-[14px] mt-1">3 active case assignments</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-Secondary hover:bg-Secondary/90 text-white font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors"
            >
              {selectedStatus} <ChevronDown size={18} />
            </button>
            
            {/* Dropdown Options */}
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute right-0 top-[110%] w-[180px] bg-[#FFFBF3] rounded-xl shadow-lg border border-gray-100 p-2 z-20 flex flex-col gap-2">
                  {statuses.map(status => {
                    const isSelected = selectedStatus === status;
                    return (
                      <div 
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-[14px] ${
                          isSelected 
                            ? 'bg-Primary border border-Primary font-bold text-Third' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {isSelected && <Check size={16} className="text-Third" strokeWidth={3}/>}
                        {status}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#EFEFEF]">
                <th className="py-4 px-6 font-bold text-Third text-[14px] rounded-tl-xl w-[20%]">Client Name</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">Case ID</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[12%]">Time</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[13%]">Location</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[10%]">Status</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] rounded-tr-xl w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b border-[#F0F0F0] hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-Third text-[14px]">{item.name}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{item.id}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{item.date}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{item.time}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{item.location}</td>
                  <td className="py-5 px-6">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyles(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <Link to={`/dashboard/cases/${item.id}`} className="inline-block w-full">
                      <button className="border border-Secondary text-Secondary hover:bg-Secondary hover:text-white font-bold text-[13px] py-2 px-5 rounded-[10px] transition-colors w-full text-center">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cases;
