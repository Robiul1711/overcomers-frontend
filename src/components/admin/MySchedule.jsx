import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Plus,
  ShieldCheck,
  CheckCircle2,
  CircleDashed,
  LayoutGrid
} from 'lucide-react';

const MySchedule = () => {
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Weekly Data structure
  const [weeklySessions, setWeeklySessions] = useState([
    {
      day: "Sun",
      date: "22",
      sessions: [
        { id: 1, client: "John Smith", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 2, client: "Sarah Johnson", time: "10:30 - 11:30", type: "Group", room: "Room 101", status: "Upcoming" },
        { id: 3, client: "Mike Wilson", time: "12:00 - 01:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Mon",
      date: "23",
      sessions: [
        { id: 4, client: "Sarah Johnson", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 5, client: "Lisa Davis", time: "12:00 - 01:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Tue",
      date: "24",
      sessions: [
        { id: 6, client: "Mike Wilson", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 7, client: "Sarah Johnson", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Wed",
      date: "25",
      sessions: [
        { id: 8, client: "Robert Fox", time: "09:00 - 10:00", type: "Group", room: "Room 101", status: "Upcoming" },
        { id: 9, client: "Lisa Davis", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 10, client: "Sarah Johnson", time: "12:00 - 01:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Thu",
      date: "26",
      sessions: [
        { id: 11, client: "Lisa Davis", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 12, client: "Sarah Johnson", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Fri",
      date: "27",
      sessions: [
        { id: 13, client: "John Smith", time: "09:00 - 10:00", type: "Group", room: "Room 101", status: "Upcoming" },
        { id: 14, client: "Robert Fox", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 15, client: "Sarah Johnson", time: "12:00 - 01:00", type: "Group", room: "Room 101", status: "Upcoming" },
      ]
    },
    {
      day: "Sat",
      date: "28",
      sessions: [
        { id: 16, client: "Mike Wilson", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 17, client: "John Smith", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" },
        { id: 18, client: "Robert Fox", time: "12:00 - 11:00", type: "One-to-One", room: "Room 101", status: "Upcoming" },
      ]
    }
  ]);

  const stats = [
    { label: "Today's Hours", value: "6.5", unit: "hrs", icon: <Clock size={22} className="text-blue-500" />, bgColor: "bg-blue-50" },
    { label: "Weekly Hours", value: "28.5", unit: "hrs", icon: <CheckCircle2 size={22} className="text-green-500" />, bgColor: "bg-green-50" },
    { label: "Total Hours Logged", value: "142", unit: "hrs", icon: <ShieldCheck size={22} className="text-purple-500" />, bgColor: "bg-purple-50" },
  ];

  const [actualStartTime, setActualStartTime] = useState("10:26 AM");
  const [actualEndTime, setActualEndTime] = useState("11:30 AM");

  const handleClockAction = (session) => {
    setSelectedSession(session);
    if (session.status === 'Upcoming') {
      setActualStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setShowClockInModal(true);
    } else if (session.status === 'In Progress') {
      setActualEndTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setShowClockOutModal(true);
    }
  };

  const confirmClockIn = () => {
    updateSessionStatus(selectedSession.id, 'In Progress');
    setShowClockInModal(false);
  };

  const confirmClockOut = () => {
    updateSessionStatus(selectedSession.id, 'Completed');
    setShowClockOutModal(false);
  };

  const updateSessionStatus = (sessionId, newStatus) => {
    setWeeklySessions(prev => prev.map(dayObj => ({
      ...dayObj,
      sessions: dayObj.sessions.map(s => s.id === sessionId ? { ...s, status: newStatus } : s)
    })));
  };

  return (
    <div className='flex flex-col gap-6 font-poppins'>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm flex items-center gap-6 border border-gray-50">
            <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center flex-shrink-0Shadow-sm`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-400 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-Secondary leading-tight">{stat.value}</span>
                <span className="text-md font-bold text-Secondary">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button className="p-2.5 hover:bg-gray-50 transition-colors text-Secondary"><ChevronLeft size={20} strokeWidth={2.5}/></button>
                <div className="px-5 py-2.5 bg-white font-bold text-Secondary text-[15px] border-x border-gray-100 italic">March 2026</div>
                <button className="p-2.5 hover:bg-gray-50 transition-colors text-Secondary"><ChevronRight size={20} strokeWidth={2.5}/></button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FAF6F4] text-Secondary font-bold text-[14px] rounded-xl hover:bg-[#F2ECE8] transition-colors">
            Weekly View
          </button>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-7 gap-3">
          {weeklySessions.map((dayData, i) => (
            <div key={i} className="flex flex-col gap-3 min-w-[140px]">
              {/* Day Header */}
              <div className={`rounded-t-2xl p-4 text-center border-b-2 ${dayData.day === 'Sun' ? 'bg-Primary border-Secondary/20' : 'bg-[#F2F2F2] border-transparent'}`}>
                 <p className={`text-[13px] font-bold ${dayData.day === 'Sun' ? 'text-Secondary' : 'text-gray-500'}`}>{dayData.day}</p>
                 <p className={`text-2xl font-extrabold ${dayData.day === 'Sun' ? 'text-Secondary' : 'text-Secondary/80'}`}>{dayData.date}</p>
              </div>

              {/* Sessions List */}
              <div className="flex flex-col gap-3">
                {dayData.sessions.map((session) => (
                  <div key={session.id} className="bg-[#FAF9F6] rounded-[24px] p-4 border border-[#F5F5F4] flex flex-col gap-3 group hover:border-Secondary/20 transition-all duration-300">
                     <div className="flex flex-col gap-0.5">
                        <h4 className="font-bold text-Third text-[14px] leading-tight truncate">{session.client}</h4>
                        <span className={`text-[10px] font-bold ${
                          session.status === 'In Progress' ? 'text-green-500' : 
                          session.status === 'Completed' ? 'text-gray-400' : 'text-blue-400'
                        }`}>
                          {session.status}
                        </span>
                     </div>
                     
                     <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[11px]">
                           <Clock size={12} className="text-Secondary/40" /> <span>{session.time}</span>
                        </div>
                        <div className="px-3 py-1 bg-[#FAF6F7] text-Secondary rounded-full text-[10px] font-bold w-fit border border-Secondary/5">
                           {session.type}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[11px]">
                           <MapPin size={12} className="text-Primary" /> <span>{session.room}</span>
                        </div>
                     </div>

                     {session.status !== 'Completed' ? (
                       <button 
                         onClick={() => handleClockAction(session)}
                         className={`w-full py-2.5 rounded-xl font-bold text-[13px] transition-all duration-300 shadow-sm ${
                           session.status === 'In Progress' 
                             ? 'bg-Secondary text-white hover:bg-Secondary/90' 
                             : 'bg-Primary text-Secondary hover:bg-Primary/90'
                         }`}
                       >
                         {session.status === 'In Progress' ? 'Clock Out' : 'Clock In'}
                       </button>
                     ) : (
                        <div className="w-full py-2.5 rounded-xl font-bold text-[13px] text-center bg-white border border-gray-100 text-gray-300">
                           Clock In
                        </div>
                     )}
                  </div>
                ))}
                
                {/* Empty placeholders if less than 3 sessions */}
                {dayData.sessions.length < 3 && Array(3 - dayData.sessions.length).fill(0).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-[180px] rounded-[24px] border border-dashed border-gray-100 bg-gray-50/20"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clock In Modal */}
      {showClockInModal && selectedSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowClockInModal(false)}></div>
           <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-Third">Start Session</h2>
                 <button onClick={() => setShowClockInModal(false)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                    <X size={20} />
                 </button>
              </div>
              <div className="w-full h-[3px] bg-Primary mb-6"></div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
                 <p className="text-blue-600 font-bold text-[16px]">Session: {selectedSession.client} - {selectedSession.type}</p>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                 <h4 className="font-bold text-Third text-lg">Confirm your session start time.</h4>
                 <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-500">Actual Start Time</label>
                    <input 
                      type="text"
                      value={actualStartTime}
                      onChange={(e) => setActualStartTime(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-gray-100 px-5 py-4 rounded-xl text-Third font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-Primary/20"
                    />
                 </div>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setShowClockInModal(false)}
                   className="flex-1 py-4 bg-Primary text-Secondary font-bold rounded-2xl shadow-sm hover:bg-Primary/90 transition-colors"
                 >
                    Cancel
                 </button>
                 <button 
                   onClick={confirmClockIn}
                   className="flex-1 py-4 bg-Secondary text-white font-bold rounded-2xl shadow-lg hover:bg-Secondary/90 transition-colors"
                 >
                    Confirm & Clock In
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Clock Out Modal */}
      {showClockOutModal && selectedSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowClockOutModal(false)}></div>
           <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-Third">Start Session</h2>
                 <button onClick={() => setShowClockOutModal(false)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                    <X size={20} />
                 </button>
              </div>
              <div className="w-full h-[3px] bg-Primary mb-6"></div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
                 <p className="text-blue-600 font-bold text-[16px]">Session: {selectedSession.client} - {selectedSession.type}</p>
              </div>

              <div className="flex flex-col gap-6 mb-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-500">Actual End Time</label>
                    <input 
                      type="text"
                      value={actualEndTime}
                      onChange={(e) => setActualEndTime(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-gray-100 px-5 py-4 rounded-xl text-Third font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-Secondary/20"
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-500">Add Session Notes *</label>
                    <textarea 
                      placeholder="Write a session notes..."
                      className="w-full bg-[#F2F2F2] border border-gray-100 px-5 py-4 rounded-xl text-Third font-medium text-[14px] min-h-[120px] focus:outline-none focus:ring-2 focus:ring-Secondary/20"
                    />
                 </div>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setShowClockOutModal(false)}
                   className="flex-1 py-4 bg-Primary text-Secondary font-bold rounded-2xl shadow-sm hover:bg-Primary/90 transition-colors"
                 >
                    Cancel
                 </button>
                 <button 
                   onClick={confirmClockOut}
                   className="flex-1 py-4 bg-Secondary text-white font-bold rounded-2xl shadow-lg hover:bg-Secondary/90 transition-colors"
                 >
                    Submit & Clock Out
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MySchedule;
