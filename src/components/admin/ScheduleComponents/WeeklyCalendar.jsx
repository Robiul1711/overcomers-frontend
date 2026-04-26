import React from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, Plus } from "lucide-react";

const WeeklyCalendar = ({ 
  weeklySessions, 
  setShowScheduleModal, 
  handleClockAction 
}) => {
  return (
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
  );
};

export default WeeklyCalendar;
