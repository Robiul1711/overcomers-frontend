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
    <div className='flex flex-col gap-6 md:gap-8 font-poppins pb-10 px-1 md:px-0'>
      {/* Content Container */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-1.5 h-6 bg-Secondary rounded-full"></div>
               <h3 className="text-xl md:text-2xl font-bold text-Third leading-none">Activity Feed</h3>
            </div>
            <p className="text-gray-400 text-[13px] md:text-sm font-medium">You have <span className="text-Secondary font-bold">1 unread</span> update pending</p>
          </div>
          <button className="w-full sm:w-auto px-8 py-3 bg-white border border-Secondary/30 text-Secondary font-bold text-[13px] md:text-[14px] rounded-xl hover:bg-Secondary hover:text-white transition-all shadow-sm active:scale-95">
            Clear All Alerts
          </button>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {notificationsData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-6 md:p-8 transition-all duration-300 relative overflow-hidden group ${
                !item.isRead ? 'bg-[#FAF6F7]/60' : 'bg-white hover:bg-gray-50/50'
              }`}
            >
              <div className="flex gap-4 md:gap-6 items-start">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border flex-shrink-0 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                   !item.isRead ? 'bg-white border-Secondary/20 text-Secondary' : 'bg-gray-50 border-gray-100 text-gray-400'
                }`}>
                  {getIcon(item.type)}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                     <h4 className="font-extrabold text-Third text-[15px] md:text-[17px] leading-tight line-clamp-1">{item.title}</h4>
                     {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-Secondary animate-pulse"></span>
                     )}
                  </div>
                  <p className="text-gray-500 text-[13px] md:text-[14px] font-medium max-w-3xl leading-relaxed">{item.message}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                     <span className="text-Secondary font-bold text-[11px] md:text-[12px] uppercase tracking-widest opacity-60">{item.time}</span>
                     <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                     <span className="text-gray-400 font-bold text-[11px] md:text-[12px] uppercase tracking-widest">{item.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0">
                <button className="flex items-center gap-2 xl:flex-none px-6 py-3 bg-white border border-Secondary/20 text-Secondary font-bold text-[13px] rounded-xl hover:bg-Secondary hover:text-white hover:border-Secondary transition-all shadow-sm active:scale-95">
                  View Detail <ArrowUpRight size={16} />
                </button>
                <button className="p-3 bg-white border border-Secondary/10 text-Secondary rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm active:scale-95 shrink-0">
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Unread Indicator Bar */}
              {!item.isRead && (
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-Secondary"></div>
              )}
            </div>
          ))}
        </div>
        
        {notificationsData.length === 0 && (
           <div className="p-20 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                 <Bell size={40} />
              </div>
              <div>
                 <h4 className="text-xl font-bold text-Third">Nothing to report</h4>
                 <p className="text-gray-400 text-sm">We'll let you know when something comes up!</p>
              </div>
           </div>
        )}
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
