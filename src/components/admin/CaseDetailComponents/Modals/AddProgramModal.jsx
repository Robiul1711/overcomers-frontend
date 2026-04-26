import React from 'react';
import { X, ChevronDown, Calendar } from 'lucide-react';

const AddProgramModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-Third/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[650px] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400">
        
        {/* Header - More Compact */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-Third tracking-tight">Add New Program</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Clinical Protocol Entry</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body - Organized Grid */}
        <div className="p-6 md:p-8 max-h-[65vh] overflow-y-auto custom-scrollbar flex flex-col gap-5">
          
          {/* Title Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Program Title *</label>
            <input 
              type="text" 
              placeholder="e.g., Social Initiation Protocol" 
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-Primary focus:ring-4 focus:ring-Primary/5 transition-all text-[14px] font-bold text-Third"
            />
          </div>

          {/* 2x2 Grid for Selectors & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Category</label>
              <div className="relative group">
                <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third hover:border-gray-300 transition-colors">
                  <option>Select Category</option>
                  <option>Communication</option>
                  <option>Social Skills</option>
                  <option>Behavior Reduction</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Start Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Level</label>
              <div className="relative group">
                <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third">
                  <option>Select Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Type</label>
              <div className="relative group">
                <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third">
                  <option>Select Type</option>
                  <option>Skill Acquisition</option>
                  <option>Behavior Intervention</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Task List</label>
            <textarea 
              rows={2}
              placeholder="Enter tasks (one per line)..." 
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Description</label>
            <textarea 
              rows={2}
              placeholder="Detailed program description..." 
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer - Integrated Actions */}
        <div className="p-5 border-t border-gray-50 flex items-center justify-end gap-3 bg-gray-50/30">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-Secondary font-bold text-[13px] rounded-xl hover:bg-gray-100 transition-all uppercase tracking-wide"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl shadow-lg shadow-Secondary/10 hover:bg-Secondary/90 active:scale-95 transition-all uppercase tracking-wide">
            Add Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProgramModal;