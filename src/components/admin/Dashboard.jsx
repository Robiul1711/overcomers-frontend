import React from 'react';
import { Briefcase, FileText, Bell, ArrowUpRight } from 'lucide-react';

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
    <div className='flex flex-col gap-8'>
      {/* Welcome Section */}
      <div>
        <h2 className="text-[26px] font-bold text-Third">Welcome back, Eleanor!</h2>
        <p className="text-gray-500 text-[15px] mt-1">Here is an overview of your assignments, documents, and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="w-[52px] h-[52px] rounded-xl bg-orange-50 flex items-center justify-center">
            <Briefcase className="text-Secondary" size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-extrabold text-Secondary leading-none">4</h3>
            <p className="text-Secondary text-[15px] font-medium leading-none mt-1">Active Cases</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="w-[52px] h-[52px] rounded-xl bg-orange-50 flex items-center justify-center">
            <FileText className="text-Secondary" size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-extrabold text-Secondary leading-none">2</h3>
            <p className="text-Secondary text-[15px] font-medium leading-none mt-1">Pending Documents</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="w-[52px] h-[52px] rounded-xl bg-orange-50 flex items-center justify-center">
            <Bell className="text-Secondary" size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-extrabold text-Secondary leading-none">1</h3>
            <p className="text-Secondary text-[15px] font-medium leading-none mt-1">New Notification</p>
          </div>
        </div>
      </div>

      {/* Recent Case Assignments Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-[20px] pb-1">
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-Third mb-1">Recent Case Assignments</h3>
            <p className="text-gray-500 text-sm">View the most recent cases assigned to you</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-Secondary hover:bg-Secondary/90 text-white font-medium text-sm py-2.5 px-5 rounded-lg transition duration-300">
            View All Cases <ArrowUpRight size={18} strokeWidth={2} />
          </button>
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
              {casesData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
                    <button className="border border-Secondary text-Secondary hover:bg-Secondary hover:text-white font-bold text-[13px] py-2 px-4 rounded-[10px] transition-colors w-full">
                      View Details
                    </button>
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

export default Dashboard;