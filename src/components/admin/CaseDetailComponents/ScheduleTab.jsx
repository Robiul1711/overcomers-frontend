import React from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, LayoutGrid } from 'lucide-react';

const ScheduleTab = ({ weeklySchedule }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
           <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl shadow-inner border border-gray-100">
               <button className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-Secondary active:scale-90"><ChevronLeft size={20} strokeWidth={2.5} /></button>
               <div className="px-6 py-2 bg-transparent font-black text-Secondary text-[14px] md:text-[16px] uppercase tracking-widest whitespace-nowrap">March 2026</div>
               <button className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-Secondary active:scale-90"><ChevronRight size={20} strokeWidth={2.5} /></button>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#FAF6F4] text-Secondary font-black text-[13px] md:text-[14px] rounded-xl hover:bg-[#F2ECE8] transition-colors shadow-sm uppercase tracking-wider">
                <Calendar size={18} /> Master Schedule
              </button>
           </div>
       </div>

       {/* Weekly Grid Wrapper for Horizontal Scroll */}
       <div className="overflow-x-auto custom-scrollbar pb-6 -mx-2 px-2 scroll-smooth">
          <div className="flex gap-4 min-w-max lg:grid lg:grid-cols-7 lg:min-w-0">
             {weeklySchedule.map((day, idx) => (
               <div key={idx} className="flex flex-col gap-4 w-[160px] md:w-[180px] lg:w-auto">
                  {/* Day Header */}
                  <div className={`rounded-2xl p-5 text-center border-2 transition-all ${day.session?.isActiveDay ? 'bg-Primary/10 border-Primary shadow-lg shadow-Primary/5' : 'bg-gray-50 border-transparent opacity-60'}`}>
                     <p className={`text-[12px] font-black uppercase tracking-[0.2em] leading-none mb-2 ${day.session?.isActiveDay ? 'text-Secondary' : 'text-gray-400'}`}>{day.day}</p>
                     <p className={`text-[28px] md:text-3xl font-black leading-none ${day.session?.isActiveDay ? 'text-Secondary' : 'text-Secondary/90'}`}>{day.date}</p>
                  </div>

                  {/* Sessions List */}
                  <div className="flex flex-col gap-3">
                    {day.session ? (
                       <div className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] flex flex-col gap-4 group hover:border-Secondary/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-Secondary/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                          
                          <div className="flex flex-col gap-1 relative z-10">
                             <h4 className="font-black text-Third text-[14px] md:text-[15px] leading-tight line-clamp-1">{day.session.client}</h4>
                             <div className="flex items-center gap-1.5 mt-0.5">
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${day.session.isActiveDay ? 'bg-green-500' : 'bg-blue-400'}`}></div>
                                <span className={`text-[10px] uppercase font-black tracking-widest ${day.session.isActiveDay ? 'text-green-600' : 'text-blue-500'}`}>{day.session.status}</span>
                             </div>
                          </div>
                          
                          <div className="flex flex-col gap-3 relative z-10">
                             <div className="flex items-center gap-2.5 text-gray-400 font-bold text-[11px] md:text-[12px]">
                                <Clock size={14} className="text-Secondary/30 shrink-0" /> <span className="truncate">{day.session.time}</span>
                             </div>
                             <div className="px-4 py-1.5 bg-gray-50 border border-gray-100 text-Secondary/60 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-wider w-fit shrink-0">
                                {day.session.type}
                             </div>
                             <div className="flex items-center gap-2.5 text-gray-400 font-bold text-[11px] md:text-[12px]">
                                <MapPin size={14} className="text-Primary/50 shrink-0" /> <span className="truncate">{day.session.room}</span>
                             </div>
                          </div>

                          <button 
                            disabled={!day.session.isActiveDay}
                            className={`w-full py-3.5 rounded-xl font-black text-[12px] md:text-[13px] transition-all duration-300 shadow-sm active:scale-95 z-10 mt-2 uppercase tracking-widest ${
                              day.session.isActiveDay 
                                ? 'bg-Secondary text-white hover:shadow-lg shadow-Secondary/20' 
                                : 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed opacity-50'
                            }`}
                          >
                            Clock In
                          </button>
                       </div>
                    ) : (
                       <div className="h-[240px] md:h-[280px] rounded-[32px] border-2 border-dashed border-gray-100 bg-gray-50/20 flex items-center justify-center group/empty transition-colors hover:border-gray-200">
                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-200 group-hover/empty:scale-110 transition-transform shadow-sm">
                              <LayoutGrid size={18} />
                           </div>
                       </div>
                    )}
                  </div>
               </div>
             ))}
          </div>
       </div>
       
       <div className="mt-6 text-center lg:hidden">
           <p className="text-[11px] text-gray-300 font-black uppercase tracking-widest italic">Slide horizontally to explore full weekly schedule</p>
       </div>
    </div>
  );
};

export default ScheduleTab;

