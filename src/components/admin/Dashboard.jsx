import React from 'react';
import { Briefcase, FileText, Bell, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const casesData = [
    { name: "John Smith", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "Home", status: "Active" },
    { name: "Sarah Johnson", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "School", status: "Active" },
    { name: "Mike Wilson", id: "ABA-2026-009", date: "March 9, 2026", time: "10:00 AM", location: "Daycare", status: "Active" },
    { name: "Lisa Davis", id: "ABA-2026-009", date: "March 8, 2026", time: "10:00 AM", location: "Home", status: "Pending" },
    { name: "Bessie Cooper", id: "ABA-2026-009", date: "March 7, 2026", time: "10:00 AM", location: "Daycare", status: "Completed" },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active": return "bg-green-100/70 text-green-600";
      case "Pending": return "bg-orange-100 text-orange-500";
      case "Completed": return "bg-blue-100/70 text-blue-500";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8'>
      {/* Welcome Section */}
      <div className="px-1">
        <h2 className="text-[22px] sm:text-[26px] font-bold text-Third leading-tight">Welcome back, Eleanor!</h2>
        <p className="text-gray-500 text-[14px] sm:text-[15px] mt-1.5">Here is an overview of your assignments, documents, and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6 hover:shadow-md transition-shadow">
          <div className="w-[48px] md:w-[52px] h-[48px] md:h-[52px] rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Briefcase className="text-Secondary w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-Secondary leading-none">4</h3>
            <p className="text-Secondary text-[14px] md:text-[15px] font-medium mt-1">Active Cases</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6 hover:shadow-md transition-shadow">
          <div className="w-[48px] md:w-[52px] h-[48px] md:h-[52px] rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <FileText className="text-Secondary w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-Secondary leading-none">2</h3>
            <p className="text-Secondary text-[14px] md:text-[15px] font-medium mt-1">Pending Documents</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6 hover:shadow-md transition-shadow lg:col-span-1 sm:col-span-2 lg:sm:col-span-1">
          <div className="w-[48px] md:w-[52px] h-[48px] md:h-[52px] rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Bell className="text-Secondary w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-Secondary leading-none">1</h3>
            <p className="text-Secondary text-[14px] md:text-[15px] font-medium mt-1">New Notification</p>
          </div>
        </div>
      </div>

      {/* Recent Case Assignments Table Container */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 md:p-7 border-b border-gray-100 bg-[#FAFAFA]/50">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-Third">Recent Case Assignments</h3>
            <p className="text-gray-500 text-[13px] md:text-sm mt-0.5">View the most recent cases assigned to you</p>
          </div>
          <Link to="/dashboard/cases" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] py-2.5 px-6 rounded-xl transition duration-300 shadow-sm active:scale-95">
            View All <span className="hidden xs:inline">Cases</span> <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Client Name</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Case ID</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Time</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Location</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {casesData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 md:py-5 px-6">
                    <span className="font-bold text-Third text-[14px]">{item.name}</span>
                  </td>
                  <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">{item.id}</td>
                  <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium whitespace-nowrap">{item.date}</td>
                  <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">{item.time}</td>
                  <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">{item.location}</td>
                  <td className="py-4 md:py-5 px-6">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-block leading-none border border-transparent ${getStatusStyles(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 md:py-5 px-6">
                    <Link 
                      to={`/dashboard/cases/${item.id}`}
                      className="inline-flex items-center justify-center border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[12px] py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer for mobile hinting */}
        <div className="sm:hidden py-3 px-6 bg-gray-50/30 text-center border-t border-gray-100">
           <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view more details</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;