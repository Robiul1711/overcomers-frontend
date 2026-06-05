import React from "react";
import { X, ChevronDown } from "lucide-react";

const ClientSchedule = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="bg-white w-[95%] sm:w-full max-w-[600px] rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 flex items-center justify-between border-b border-orange-100 bg-white shrink-0">
          <h2 className="text-lg sm:text-2xl font-bold text-[#741111]">
            Add Program
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#741111]/10 flex items-center justify-center text-[#741111]/70 hover:bg-[#741111]/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-[#FAF9F7]">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
              Title *
            </label>

            <input
              type="text"
              placeholder="Write a program title name..."
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none focus:border-orange-300 text-sm shadow-sm"
            />
          </div>

          {/* Select Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
                Select Category *
              </label>

              <div className="relative">
                <select className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none appearance-none text-sm">
                  <option>Select</option>
                  <option>All Categories</option>
                  <option>Communication</option>
                  <option>Social Skills</option>
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40"
                />
              </div>
            </div>

            {/* Level */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
                Select Levels *
              </label>

              <div className="relative">
                <select className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none appearance-none text-sm">
                  <option>Select</option>
                  <option>All Levels</option>
                  <option>Beginner</option>
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40"
                />
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
                Select Types *
              </label>

              <div className="relative">
                <select className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none appearance-none text-sm">
                  <option>Select</option>
                  <option>All Types</option>
                  <option>Skill Acquisition</option>
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40"
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
              Start Date *
            </label>

            <input
              type="date"
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>

          {/* Task List */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
              Task List *
            </label>

            <textarea
              rows={3}
              placeholder="Add task lists..."
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none text-sm resize-none"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-[#741111] uppercase tracking-widest">
              Description *
            </label>

            <textarea
              rows={4}
              placeholder="Add description..."
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl px-4 py-3 outline-none text-sm resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-end gap-3 bg-white shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#FFB800] text-[#741111] font-semibold text-sm rounded-xl"
          >
            Cancel
          </button>

          <button className="px-6 py-3 bg-[#741111] text-white font-semibold text-sm rounded-xl">
            Add Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSchedule;
