import React from "react";
import { X, Calendar, Clock, ChevronRight } from "lucide-react";

const ScheduleSessionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
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
            onClick={onClose}
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
                <option value="One-to-One">One-to-One</option>
                <option value="Group">Group</option>
                <option value="Parent Training">Parent Training</option>
                <option value="Treatment Planning">Treatment Planning</option>
                <option value="Assessment">Assessment</option>
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
                type="date"
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
                  type="time"
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
                  type="time"
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
              placeholder="Any additional information..."
              className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-Secondary text-white font-bold rounded-xl shadow-lg shadow-Secondary/20 hover:bg-[#426c3c] transition-all active:scale-[0.98] mt-2 uppercase tracking-wider text-[15px]"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
