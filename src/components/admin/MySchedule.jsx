import React, { useState } from "react";
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
  LayoutGrid,
} from "lucide-react";

const MySchedule = () => {
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState("");

  // Weekly Data structure
  const [weeklySessions, setWeeklySessions] = useState([
    {
      day: "Sun",
      date: "22",
      sessions: [
        {
          id: 1,
          client: "John Smith",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 2,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 3,
          client: "Mike Wilson",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Mon",
      date: "23",
      sessions: [
        {
          id: 4,
          client: "Sarah Johnson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 5,
          client: "Lisa Davis",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Tue",
      date: "24",
      sessions: [
        {
          id: 6,
          client: "Mike Wilson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 7,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Daycare",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Wed",
      date: "25",
      sessions: [
        {
          id: 8,
          client: "Robert Fox",
          time: "09:00 - 10:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 9,
          client: "Lisa Davis",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 10,
          client: "Sarah Johnson",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Thu",
      date: "26",
      sessions: [
        {
          id: 11,
          client: "Lisa Davis",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 12,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Fri",
      date: "27",
      sessions: [
        {
          id: 13,
          client: "John Smith",
          time: "09:00 - 10:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 14,
          client: "Robert Fox",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 15,
          client: "Sarah Johnson",
          time: "12:00 - 01:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Sat",
      date: "28",
      sessions: [
        {
          id: 16,
          client: "Mike Wilson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
        {
          id: 17,
          client: "John Smith",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
        {
          id: 18,
          client: "Robert Fox",
          time: "12:00 - 11:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
      ],
    },
  ]);

  const stats = [
    {
      label: "Today's Hours",
      value: "6.5",
      unit: "hrs",
      icon: <Clock size={22} className="text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Weekly Hours",
      value: "28.5",
      unit: "hrs",
      icon: <CheckCircle2 size={22} className="text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Hours Logged",
      value: "142",
      unit: "hrs",
      icon: <ShieldCheck size={22} className="text-purple-500" />,
      bgColor: "bg-purple-50",
    },
  ];

  const [actualStartTime, setActualStartTime] = useState("10:26 AM");
  const [actualEndTime, setActualEndTime] = useState("11:30 AM");

  const handleClockAction = (session) => {
    setSelectedSession(session);
    if (session.status === "Upcoming") {
      setActualStartTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setShowClockInModal(true);
    } else if (session.status === "In Progress") {
      setActualEndTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setShowClockOutModal(true);
    }
  };

  const confirmClockIn = () => {
    updateSessionStatus(selectedSession.id, "In Progress");
    setShowClockInModal(false);
  };

  const confirmClockOut = () => {
    updateSessionStatus(selectedSession.id, "Completed");
    setShowClockOutModal(false);
    setSessionNotes(""); // Reset notes after clocking out
  };

  const updateSessionStatus = (sessionId, newStatus) => {
    setWeeklySessions((prev) =>
      prev.map((dayObj) => ({
        ...dayObj,
        sessions: dayObj.sessions.map((s) =>
          s.id === sessionId ? { ...s, status: newStatus } : s,
        ),
      })),
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins pb-10 px-1 md:px-0">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm flex items-center gap-4 md:gap-6 border border-gray-50 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5`}
            >
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] md:text-[15px] font-bold text-gray-400 mb-0.5 truncate">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-Secondary leading-tight">
                  {stat.value}
                </span>
                <span className="text-sm md:text-md font-bold text-Secondary opacity-60">
                  {stat.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-sm border border-gray-100">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl shadow-inner border border-gray-100">
              <button className="p-2 md:p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-Secondary active:scale-90">
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div className="px-4 md:px-6 py-2 bg-transparent font-extrabold text-Secondary text-[14px] md:text-[16px] uppercase tracking-wider">
                March 2026
              </div>
              <button className="p-2 md:p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-Secondary active:scale-90">
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#FAF6F4] text-Secondary font-bold text-[13px] md:text-[14px] rounded-xl hover:bg-[#F2ECE8] transition-colors shadow-sm">
              Weekly View
            </button>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-white bg-Secondary font-bold text-[13px] md:text-[14px] rounded-xl hover:bg-[#426c3c] transition-colors shadow-sm"
            >
              <Calendar size={18} /> Schedule Session
            </button>
          </div>
        </div>

        {/* Weekly Grid Container with Horizontal Scroll */}
        <div className="overflow-x-auto custom-scrollbar pb-4 -mx-1 px-1">
          <div className="flex gap-4 min-w-max xl:grid xl:grid-cols-7 xl:min-w-0">
            {weeklySessions.map((dayData, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 w-[160px] md:w-[180px] xl:w-auto"
              >
                {/* Day Header */}
                <div
                  className={`rounded-2xl p-4 text-center border-2 transition-colors ${dayData.day === "Sun" ? "bg-Primary/10 border-Primary" : "bg-gray-50 border-transparent"}`}
                >
                  <p
                    className={`text-[12px] font-bold uppercase tracking-widest leading-none mb-1.5 ${dayData.day === "Sun" ? "text-Secondary" : "text-gray-400"}`}
                  >
                    {dayData.day}
                  </p>
                  <p
                    className={`text-[26px] md:text-3xl font-extrabold leading-none ${dayData.day === "Sun" ? "text-Secondary" : "text-Secondary/90"}`}
                  >
                    {dayData.date}
                  </p>
                </div>

                {/* Sessions List */}
                <div className="flex flex-col gap-3">
                  {dayData.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-4 group hover:border-Secondary/30 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 relative z-10">
                        <h4 className="font-extrabold text-Third text-[14px] md:text-[15px] leading-tight line-clamp-1">
                          {session.client}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
                              session.status === "In Progress"
                                ? "bg-green-500"
                                : session.status === "Completed"
                                  ? "bg-gray-300"
                                  : "bg-blue-400"
                            }`}
                          ></div>
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider ${
                              session.status === "In Progress"
                                ? "text-green-600"
                                : session.status === "Completed"
                                  ? "text-gray-400"
                                  : "text-blue-500"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px]">
                          <Clock
                            size={12}
                            className="text-Secondary/30 shrink-0"
                          />{" "}
                          <span className="truncate">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px]">
                          <MapPin
                            size={12}
                            className="text-Primary/50 shrink-0"
                          />{" "}
                          <span className="truncate">{session.room}</span>
                        </div>
                      </div>

                      <div className="px-3 py-1 bg-gray-50 border border-gray-100 text-Secondary/60 rounded-full text-[10px] font-bold w-fit relative z-10 shrink-0">
                        {session.type} Alt
                      </div>

                      {session.status !== "Completed" ? (
                        <button
                          onClick={() => handleClockAction(session)}
                          className={`w-full py-3 rounded-xl font-bold text-[12px] md:text-[13px] transition-all duration-300 shadow-sm active:scale-95 z-10 mt-1 uppercase tracking-wider ${
                            session.status === "In Progress"
                              ? "bg-Secondary text-white hover:shadow-lg shadow-Secondary/10"
                              : "bg-Primary text-Secondary hover:bg-Primary/90"
                          }`}
                        >
                          {session.status === "In Progress"
                            ? "End Session"
                            : "Start Session"}
                        </button>
                      ) : (
                        <div className="w-full py-3 rounded-xl font-bold text-[12px] text-center bg-gray-50 border border-gray-100 text-gray-300 pointer-events-none mt-1 uppercase tracking-wider z-10">
                          Archived
                        </div>
                      )}

                      {/* Subtle Decoration */}
                      <div
                        className={`absolute top-0 right-0 w-16 h-16 opacity-[0.03] transition-opacity group-hover:opacity-[0.07] pointer-events-none -translate-x-1/4 -translate-y-1/4 ${
                          session.status === "In Progress"
                            ? "text-green-500"
                            : "text-Secondary"
                        }`}
                      >
                        <Calendar size={64} strokeWidth={2} />
                      </div>
                    </div>
                  ))}

                  {/* Empty placeholders if less than 3 sessions */}
                  {dayData.sessions.length < 3 &&
                    Array(3 - dayData.sessions.length)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="h-[180px] md:h-[220px] rounded-[24px] border-2 border-dashed border-gray-100 bg-gray-50/30 flex items-center justify-center group/empty transition-colors hover:border-gray-200"
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-200 group-hover/empty:scale-110 transition-transform">
                            <Plus size={16} />
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="xl:hidden mt-4 text-center">
          <p className="text-[11px] text-gray-300 font-bold uppercase tracking-widest italic">
            Slide horizontally to view your full week
          </p>
        </div>
      </div>

      {/* Clock In Modal */}
      {showClockInModal && selectedSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowClockInModal(false)}
          ></div>
          <div className="bg-white rounded-[32px] w-full max-w-[95vw] sm:max-w-lg relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-6 sm:p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-Third leading-tight">
                  Session Ready
                </h2>
              </div>
              <button
                onClick={() => setShowClockInModal(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-Secondary/[0.03] border border-Secondary/10 rounded-2xl p-5 mb-8 shadow-inner shadow-black/[0.01]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-lg text-Secondary shadow-sm">
                  <LayoutGrid size={16} />
                </div>
                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  Protocol Check
                </span>
              </div>
              <p className="text-Secondary font-extrabold text-[18px] md:text-[20px] leading-tight">
                {selectedSession.client}{" "}
                <span className="opacity-40 px-2">|</span>{" "}
                {selectedSession.type}
              </p>
              <div className="flex items-center gap-2 mt-3 text-Secondary/60 font-bold text-[13px]">
                <Clock size={14} className="opacity-50" />
                <span>Scheduled Window: {selectedSession.time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
                  Confirmation Time
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={actualStartTime}
                    onChange={(e) => setActualStartTime(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-gray-100 px-12 py-5 rounded-2xl text-Third font-extrabold text-[16px] focus:outline-none focus:border-Primary transition-all shadow-sm"
                  />
                </div>
                <p className="text-[11px] text-gray-400 font-bold italic mt-1 px-1 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-green-500" /> Logged
                  timestamp for billing accuracy
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4">
              <button
                onClick={() => setShowClockInModal(false)}
                className="w-full sm:flex-1 py-4.5 bg-gray-50 text-gray-500 font-bold rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all active:scale-95"
              >
                Hold On
              </button>
              <button
                onClick={confirmClockIn}
              
                className="w-full sm:flex-1 py-4.5 bg-Secondary text-white font-extrabold rounded-2xl shadow-xl shadow-Secondary/20 hover:scale-[1.02] active:scale-95 transition-all text-[15px] uppercase tracking-wider"
              >
                Confirm Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clock Out Modal */}
      {showClockOutModal && selectedSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowClockOutModal(false)}
          ></div>
          <div className="bg-white rounded-[32px] w-full max-w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-8 duration-300 custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-Third leading-tight">
                 Clock Out
                </h2>
              </div>
              <button
                onClick={() => setShowClockOutModal(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#FAF6F7] border border-Secondary/10 rounded-2xl p-5 mb-8 shadow-inner shadow-black/[0.01]">
              <p className="text-Secondary font-extrabold text-[18px] md:text-[20px] leading-tight">
                {selectedSession.client}{" "}
                <span className="opacity-20 px-2">|</span>{" "}
                {selectedSession.type}
              </p>
              <div className="flex items-center gap-2 mt-3 text-Secondary/50 font-bold text-[13px]">
                <CheckCircle2 size={14} className="text-green-500" />
                <span>
                  Started at:{" "}
                  <span className="text-Secondary/80 font-extrabold">
                    {actualStartTime}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
                  Ending Time
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={actualEndTime}
                    onChange={(e) => setActualEndTime(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-gray-100 px-12 py-5 rounded-2xl text-Third font-extrabold text-[16px] focus:outline-none focus:border-Secondary transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-extrabold text-Third uppercase tracking-wider ml-1">
                 Add session notes *
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Detail key behaviors, objectives met, and any critical notes..."
                  className="w-full bg-[#FAF9F6] border border-gray-100 px-5 py-5 rounded-2xl text-Third font-medium text-[14px] min-h-[140px] focus:outline-none focus:border-Secondary transition-all shadow-sm resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4">
              <button
                onClick={() => setShowClockOutModal(false)}
                className="w-full sm:flex-1 py-4.5 bg-Primary text-white shadow-xl shadow-Primary/20 font-bold rounded-2xl border border-gray-100 hover:bg-Primary/80 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={confirmClockOut}
                disabled={!sessionNotes.trim()}
                className={`w-full sm:flex-1 py-4.5 bg-Secondary text-white font-extrabold rounded-2xl shadow-xl shadow-Secondary/20 hover:scale-[1.02] active:scale-95 transition-all text-[15px] uppercase tracking-wider ${!sessionNotes.trim() ? "opacity-40 cursor-not-allowed grayscale-[0.5]" : ""}`}
              >
              Submit & Clock Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowScheduleModal(false)}
          ></div>
          <div className="bg-white rounded-[32px] w-full max-w-[600px] max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl p-8 sm:p-10 animate-in fade-in zoom-in duration-300 custom-scrollbar">
            <div className="flex justify-between items-start mb-6">
              <div className="w-full">
                <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">
                  Schedule Session
                </h2>
                <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {/* Client Selection */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#3A331E] font-bold text-[14px]">
                  Select Client *
                </label>
                <div className="relative group">
                  <select className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer">
                    <option value="">Select</option>
                    <option value="john">John Smith</option>
                    <option value="sarah">Sarah Johnson</option>
                    <option value="mike">Mike Wilson</option>
                    <option value="lisa">Lisa Davis</option>
                    <option value="bessie">Bessie Cooper</option>
                    <option value="robert">Robert Fox</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                    <ChevronRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Session Type */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#3A331E] font-bold text-[14px]">
                  Session Type *
                </label>
                <div className="relative group">
                  <select className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer">
                    <option value="">Select type</option>
                    <option value="1-1">One-to-One</option>
                    <option value="group">Group</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                    <ChevronRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Session Date */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#3A331E] font-bold text-[14px]">
                  Session Date *
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                  />
                </div>
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#3A331E] font-bold text-[14px]">
                    Start Time *
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="9:00 AM"
                      className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#3A331E] font-bold text-[14px]">
                    End Time *
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="11:00 AM"
                      className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#3A331E] font-bold text-[14px]">
                  Location *
                </label>
                <div className="relative group">
                  <select className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer">
                    <option value="">Select</option>
                    <option value="home">In-Home</option>
                    <option value="school">School</option>
                    <option value="daycare">Daycare</option>
                    <option value="clinic">Clinic</option>
                    <option value="community">Community</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                    <ChevronRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Session Notes */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#3A331E] font-bold text-[14px]">
                  Session Notes (Optional)
                </label>
                <textarea
                  placeholder="Add any notes..."
                  className="w-full bg-[#F4F4F4] rounded-xl p-5 text-[15px] text-[#3A331E] min-h-[120px] outline-none border border-transparent focus:border-[#FFBB03] transition-all resize-none font-medium"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="bg-[#FFBB03] hover:bg-[#eab002] text-white font-bold text-[16px] px-10 py-3.5 rounded-xl transition-all active:scale-95 shadow-md shadow-[#FFBB03]/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[16px] px-10 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Save Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySchedule;
