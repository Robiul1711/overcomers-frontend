import React from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  Trash2,
  FilePlus,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ParentNotifications = () => {
    const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            title: "New program assignment received",
            description: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.",
            time: "2 hours ago",
            isUnread: true,
            icon: <FilePlus size={22} strokeWidth={2.5} />
        },
        {
            id: 2,
            title: "Certification renewal required",
            description: "Your RBT certification expired on March 1, 2026. Please upload your renewed certificate.",
            time: "1 day ago",
            isUnread: false,
            icon: <FileText size={22} strokeWidth={2.5} />
        },
        {
            id: 3,
            title: "New case assignment received",
            description: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.",
            time: "2 days ago",
            isUnread: false,
            icon: <FilePlus size={22} strokeWidth={2.5} />
        },
        {
            id: 4,
            title: "New case assignment received",
            description: "Case #ABA-2024-009 - John Smith has been assigned to you by your supervisor.",
            time: "3 days ago",
            isUnread: false,
            icon: <FilePlus size={22} strokeWidth={2.5} />
        }
    ];

    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Notifications Section */}
            <div className="sm:bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6] overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 md:mb-12">
                    <div className="relative">
                        <h3 className="text-2xl md:text-3xl font-black text-Third tracking-tight leading-tight">Sync Updates</h3>
                        <p className="text-[12px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">You have 1 prioritized notification</p>
                        <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
                    </div>
                    <button className="w-full sm:w-auto bg-Secondary/5 text-Secondary border-2 border-Secondary/10 px-6 py-3 rounded-xl md:rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-Secondary hover:text-white transition-all active:scale-95 shadow-sm">
                        Mark All Synchronized
                    </button>
                </div>

                <div className="divide-y divide-gray-100 -mx-6 md:-mx-10 border-t border-gray-100">
                    {notifications.map((notification) => (
                        <div 
                            key={notification.id} 
                            className={`px-6 md:px-10 py-6 md:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all cursor-pointer group relative hover:bg-gray-50/50 ${
                                notification.isUnread ? "bg-Secondary/5" : "bg-white"
                            }`}
                        >
                            {notification.isUnread && (
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-Secondary animate-pulse"></div>
                            )}
                            
                            <div className="flex items-start gap-5 md:gap-6 flex-1 w-full">
                                <div className={`p-4 rounded-[20px] md:rounded-[24px] shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg ${
                                    notification.isUnread ? "bg-Secondary text-white shadow-Secondary/20" : "bg-gray-100 text-gray-400 shadow-gray-200"
                                }`}>
                                    {notification.icon}
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1.5">
                                        <h4 className={`text-[17px] md:text-[20px] font-black tracking-tight leading-tight transition-colors ${notification.isUnread ? "text-Third group-hover:text-Secondary" : "text-gray-400"}`}>
                                            {notification.title}
                                        </h4>
                                        {notification.isUnread && (
                                            <span className="w-fit bg-Primary text-Secondary px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-Primary/20">Prioritized</span>
                                        )}
                                    </div>
                                    <p className="text-[14px] md:text-[15px] text-gray-500 font-bold leading-relaxed max-w-2xl line-clamp-2 uppercase tracking-tight opacity-70">
                                        {notification.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3.5">
                                        {notification.isUnread && <div className="w-2 h-2 rounded-full bg-Primary/40 animate-ping"></div>}
                                        <p className="text-[11px] font-black text-Secondary group-hover:text-Secondary uppercase tracking-[0.2em] opacity-80 leading-none">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 relative z-10">
                                <button className="flex-1 lg:flex-none bg-Secondary text-white px-8 py-3.5 rounded-xl md:rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-Secondary/90 active:scale-95 transition-all shadow-xl shadow-Secondary/10 whitespace-nowrap">
                                    View Logic
                                </button>
                                <button className="p-3.5 bg-gray-100 text-gray-400 rounded-xl md:rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all group/delete shadow-sm border border-transparent hover:border-red-100 active:scale-90">
                                    <Trash2 size={20} strokeWidth={2.5} className="group-hover/delete:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParentNotifications;
