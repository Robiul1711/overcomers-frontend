import React from 'react';
import { Bell, ChevronLeft, Home, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const notificationsData = [
    { 
      id: 1, 
      type: "assignment", 
      title: "New case assignment received", 
      message: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.", 
      time: "2 hours ago", 
      isRead: false 
    },
    { 
      id: 2, 
      type: "certification", 
      title: "Certification renewal required", 
      message: "Your RBT certification expired on March 1, 2026. Please upload your renewed certificate.", 
      time: "1 day ago", 
      isRead: true 
    },
    { 
      id: 3, 
      type: "assignment", 
      title: "New case assignment received", 
      message: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.", 
      time: "2 days ago", 
      isRead: true 
    },
    { 
      id: 4, 
      type: "assignment", 
      title: "New case assignment received", 
      message: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.", 
      time: "3 days ago", 
      isRead: true 
    },
  ];

  const getIcon = (type) => {
    switch(type) {
      case "assignment": return <FileText size={20} className="text-Secondary" />;
      case "certification": return <CheckCircle size={20} className="text-Secondary" />;
      default: return <Bell size={20} className="text-Secondary" />;
    }
  };

  return (
    <div className='flex flex-col gap-6 font-poppins'>


      {/* Content Container */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-Third">All Notifications</h3>
            <p className="text-gray-400 text-sm font-medium mt-0.5">1 unread notification</p>
          </div>
          <button className="px-6 py-2.5 border border-Secondary text-Secondary font-bold text-[14px] rounded-xl hover:bg-Secondary hover:text-white transition-all">
            Mark All as Read
          </button>
        </div>

        <div className="flex flex-col">
          {notificationsData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 transition-all duration-300 ${
                !item.isRead ? 'bg-[#FAF6F7] rounded-3xl' : 'border-b border-gray-50 last:border-0'
              }`}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl border border-gray-50 flex-shrink-0 flex items-center justify-center shadow-sm">
                  {getIcon(item.type)}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-Third text-[16px] leading-tight">{item.title}</h4>
                  <p className="text-gray-500 text-[14px] font-medium max-w-2xl leading-relaxed">{item.message}</p>
                  <span className="text-Secondary/70 text-[12px] font-bold mt-1">{item.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button className="px-5 py-2 border border-Secondary text-Secondary font-bold text-[13px] rounded-xl hover:bg-Secondary hover:text-white transition-all">
                  View Details
                </button>
                <button className="p-2 border border-Secondary text-Secondary rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArrowUpRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default Notifications;
