import React, { useState } from 'react';
import { 
    User, 
    ClipboardList, 
    TrendingUp, 
    Users, 
    ShieldCheck, 
    Bell, 
    Settings, 
    LogOut, 
    LayoutDashboard, 
    Calendar, 
    MapPin, 
    Clock, 
    ChevronRight,
    FileText,
    Camera,
    X
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EditChildProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed h-screen inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white rounded-[2.5rem] w-full max-w-[min(95vw,512px)] relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh] flex flex-col border border-gray-100">
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                    <div className="relative mb-6">
                        <h3 className="text-2xl md:text-3xl font-black text-Third tracking-tight leading-tight">Edit Clinical Profile</h3>
                        <p className="text-[12px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">Update patient demographics</p>
                        <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
                    </div>

                    <div className="mt-12 mb-10 flex justify-start">
                        <div className="relative group cursor-pointer">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-Secondary rounded-[2rem] flex items-center justify-center text-Primary text-3xl font-black border-4 border-[#FFFBEE] shadow-xl group-hover:rotate-3 transition-transform">
                                CF
                            </div>
                            <div className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full border-2 border-gray-50 text-Secondary shadow-lg">
                                <Camera size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: "Patient Full Name", placeholder: "Cody Fisher" },
                            { label: "Date of Birth", placeholder: "June 14, 2018" },
                            { label: "Current Age", placeholder: "7 years old" },
                            { label: "Enrolled School", placeholder: "Greenwood School" },
                            { label: "School Location", placeholder: "Austin, TX 78704" },
                            { label: "Main Service Node", placeholder: "Home" },
                        ].map((field, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <label className="block text-[11px] md:text-xs font-black text-Third uppercase tracking-[0.2em] pl-1">{field.label} *</label>
                                <input 
                                    type="text" 
                                    placeholder={field.placeholder}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl px-5 py-3.5 md:py-4 focus:border-Primary/50 focus:ring-4 focus:ring-Primary/5 outline-none transition-all text-[14px] md:text-sm font-bold shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 md:p-8 bg-gray-50/50 flex flex-col sm:flex-row gap-3 md:gap-4 border-t border-gray-100">
                    <button 
                        onClick={onClose} 
                        className="flex-1 bg-Primary text-Secondary py-4 rounded-xl md:rounded-2xl font-black text-[14px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-Primary/10 order-2 sm:order-1"
                    >
                        Cancel
                    </button>
                    <button className="flex-1 bg-Secondary text-white py-4 rounded-xl md:rounded-2xl font-black text-[14px] uppercase tracking-widest hover:bg-Secondary/90 active:scale-95 transition-all shadow-xl shadow-Secondary/10 order-1 sm:order-2">
                        Update Case
                    </button>
                </div>
            </div>
        </div>
    );
};

const ParentDashboard = () => {
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Modal */}
            <EditChildProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />


            {/* Stats Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Programs", count: "4", icon: <Calendar className="text-Secondary" />, bgColor: "bg-white" },
                    { label: "New Notes", count: "3", icon: <ClipboardList className="text-Secondary" />, bgColor: "bg-white" },
                    { label: "Progress Updates", count: "2", icon: <FileText className="text-Secondary" />, bgColor: "bg-white" },
                    { label: "New Notification", count: "1", icon: <Bell className="text-Secondary" />, bgColor: "bg-white" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border border-[#F3F4F6]">
                        <div className="p-2.5 md:p-3 bg-Secondary/5 rounded-xl">
                            {React.cloneElement(stat.icon, { size: 20 })}
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-black text-Third leading-none">{stat.count}</div>
                            <div className="text-[12px] md:text-sm font-bold text-gray-400 mt-0.5">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* My Child Card */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-[#F3F4F6] flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-Third">My Child</h2>
                            <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-wider">Cody's clinical summary</p>
                        </div>
                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full sm:w-auto bg-Secondary text-white hover:bg-Secondary/90 px-6 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-Secondary/10"
                        >
                            View Profile
                        </button>
                    </div>

                    <div className="bg-gray-50/50 p-5 md:p-6 rounded-[24px] mb-6 border border-gray-100/50">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-Secondary rounded-3xl flex items-center justify-center text-Primary text-2xl md:text-3xl font-black shadow-xl shadow-Secondary/20 shrink-0">
                                CF
                            </div>
                            <div className="flex-1 w-full">
                                <h3 className="text-xl md:text-2xl font-black text-Third">Cody Fisher</h3>
                                <p className="text-gray-400 font-bold text-[13px] md:text-[14px]">Age 7 · Autism Spectrum Disorder</p>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                                    <span className="bg-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-[#10B981] border border-[#10B981]/20 flex items-center gap-1.5 shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span> Active Care Plan
                                    </span>
                                    <span className="bg-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-gray-500 border border-gray-100 flex items-center gap-1.5 shadow-sm">
                                        <Calendar size={12} className="text-Secondary" /> ABA Therapy
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200/50 pt-5">
                            <div className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <p className="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">RBT Therapist</p>
                                <p className="text-[14px] md:text-[15px] font-black text-Secondary">Eleanor Pena</p>
                                <button className="text-[11px] font-bold text-gray-400 flex items-center gap-1 mt-1 hover:text-Secondary transition-colors uppercase tracking-wider">Connect ↗</button>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <p className="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Supervising BCBA</p>
                                <p className="text-[14px] md:text-[15px] font-black text-Secondary">Dr. Devon Lane</p>
                                <button className="text-[11px] font-bold text-gray-400 flex items-center gap-1 mt-1 hover:text-Secondary transition-colors uppercase tracking-wider">Connect ↗</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Notes Card */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-[#F3F4F6] flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-Third">New Clinical Notes</h2>
                            <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-wider">Latest updates from the team</p>
                        </div>
                        <button className="w-full sm:w-auto bg-Secondary text-white hover:bg-Secondary/90 px-6 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-Secondary/10">
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { 
                                name: "Eleanor Pena (RBT)", 
                                date: "March 5, 2026", 
                                text: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week." 
                            },
                            { 
                                name: "Dr. Devon Lane (BCBA)", 
                                date: "Feb 28, 2026", 
                                text: "Client showing significant reduction in maladaptive behaviors during transitions. Caregiver participation in today's debrief was excellent." 
                            }
                        ].map((note, i) => (
                            <div key={i} className="bg-gray-50/50 p-5 md:p-6 rounded-[24px] border-l-[4px] border-Secondary shadow-sm">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                                    <h4 className="font-black text-Secondary text-[15px]">{note.name}</h4>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{note.date}</span>
                                </div>
                                <p className="text-[13px] md:text-[14px] text-Third font-medium leading-relaxed line-clamp-3">
                                    {note.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming Session Banner */}
            <div className="bg-Secondary rounded-[32px] md:rounded-[48px] p-6 md:p-10 text-white flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative overflow-hidden group shadow-2xl shadow-Secondary/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="relative z-10 w-full xl:w-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-Primary animate-pulse"></div>
                        <p className="text-xs md:text-sm text-Primary font-black uppercase tracking-[0.2em]">Next Clinical Session</p>
                    </div>
                    <h3 className="text-xl md:text-3xl font-black mb-6 tracking-tight leading-tight max-w-2xl">Dr. Devon Lane - Communication Development Protocol</h3>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-[12px] md:text-[14px] font-bold border border-white/10 hover:bg-white/20 transition-colors">
                            <Calendar size={18} className="text-Primary" /> Monday, March 31, 2026
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-[12px] md:text-[14px] font-bold border border-white/10 hover:bg-white/20 transition-colors">
                            <Clock size={18} className="text-Primary" /> 9:00 AM – 11:00 AM
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-[12px] md:text-[14px] font-bold border border-white/10 hover:bg-white/20 transition-colors">
                            <MapPin size={18} className="text-Primary" /> Residential Center
                        </div>
                    </div>
                </div>
                {/* <div className="bg-Primary text-Secondary px-8 py-3.5 rounded-2xl font-black text-[13px] md:text-[14px] uppercase tracking-widest h-fit relative z-10 shadow-xl shadow-Primary/10 active:scale-95 transition-all cursor-pointer">
                    Confirm Attendance
                </div> */}
            </div>
        </div>
    );
};

export default ParentDashboard;
