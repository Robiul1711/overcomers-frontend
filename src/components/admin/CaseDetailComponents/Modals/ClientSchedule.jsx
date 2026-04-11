import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const ClientSchedule = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-[700px] rounded-[24px] md:rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between border-b-2 border-orange-100 bg-white shrink-0">
          <h2 className="text-xl sm:text-3xl font-bold text-[#741111] tracking-tight">Add Program</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#741111]/10 flex items-center justify-center text-[#741111]/70 hover:bg-[#741111]/5 hover:text-[#741111] transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-4 sm:gap-6 bg-[#FAF9F7]">
          
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Title *</label>
            <input 
              type="text" 
              placeholder="Write a program title name.." 
             className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-[18px] p-4 outline-none focus:border-orange-300 transition-all text-sm sm:text-base  shadow-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Select Category *</label>
              <div className="relative group">
                <select className="client-select-dropdown w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl  py-3 sm:py-4 pl-4  outline-none appearance-none cursor-pointer text-sm sm:text-base  hover:border-orange-300 transition-colors shadow-sm">
                  <option className="hidden">Select</option>
                  <option>All Categories</option>
                  <option>Communication</option>
                  <option>Social Skills</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40 pointer-events-none group-hover:text-[#741111]" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Select Levels *</label>
              <div className="relative group">
                <select className="client-select-dropdown w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl  py-3 sm:py-4 pl-4  outline-none appearance-none cursor-pointer text-sm sm:text-base  hover:border-orange-300 transition-colors shadow-sm">
                  <option className="hidden">Select</option>
                  <option>All Levels</option>
                  <option>Beginner</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40 pointer-events-none group-hover:text-[#741111]" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2 md:col-span-1">
              <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Select Types *</label>
              <div className="relative group">
                <select className="client-select-dropdown w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-xl  py-3 sm:py-4 pl-4  outline-none appearance-none cursor-pointer text-sm sm:text-base  hover:border-orange-300 transition-colors shadow-sm">
                  <option className="hidden">Select</option>
                  <option>All Types</option>
                  <option>Skill Acquisition</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#741111]/40 pointer-events-none group-hover:text-[#741111]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Start Date *</label>
            <input 
              type="date" 
               className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-[18px] p-4 outline-none focus:border-orange-300 transition-all text-sm sm:text-base  shadow-sm resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Task List *</label>
            <textarea 
              rows={2}
              placeholder="Add task lists..." 
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-[18px] p-4 outline-none focus:border-orange-300 transition-all text-sm sm:text-base  shadow-sm resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-[10px] sm:text-[13px] font-black text-[#741111] uppercase tracking-widest pl-1">Description *</label>
            <textarea 
              rows={2}
              placeholder="Add description..." 
              className="w-full bg-[#FDFCFB] border border-[#741111]/10 rounded-[18px] p-4 outline-none focus:border-orange-300 transition-all text-sm sm:text-base  shadow-sm resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-8 border-t border-gray-100 flex flex-row items-center justify-end gap-3 sm:gap-4 bg-white shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 sm:px-10 py-3.5 sm:py-4 bg-[#FFB800] text-[#741111] font-bold text-[12px] sm:text-[15px] rounded-xl sm:rounded-2xl hover:brightness-105 active:scale-95 transition-all shadow-md uppercase tracking-wider"
          >
            Cancel
          </button>
          
          <button className="flex-1 sm:flex-none px-4 sm:px-10 py-3.5 sm:py-4 bg-[#741111] text-white font-bold text-[12px] sm:text-[15px] rounded-xl sm:rounded-2xl hover:bg-[#5a0d0d] shadow-md active:scale-95 transition-all uppercase tracking-wider">
            Add Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSchedule;