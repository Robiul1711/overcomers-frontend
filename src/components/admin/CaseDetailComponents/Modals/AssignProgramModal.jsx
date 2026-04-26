import React from 'react';
import { X, ChevronDown, ClipboardList } from 'lucide-react';

const AssignProgramModal = ({ isOpen, onClose, program }) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-Third/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[500px] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400">
        
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-Third tracking-tight">Assign Program</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Clinical Assignment</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          {/* Program Context Card - More Refined */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-Secondary shadow-sm">
              <ClipboardList size={20} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-Third leading-tight">{program.title}</h3>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mt-0.5">
                {program.category} • {program.level}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Select Client *</label>
            <div className="relative group">
              <select className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer text-[14px] font-bold text-Third hover:border-gray-300 transition-colors">
                <option>Select a client...</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Clinical Start Date *</label>
            <input 
              type="date" 
              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Implementation Notes</label>
            <textarea 
              rows={2}
              placeholder="Provide specific instructions for this client..." 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 outline-none focus:border-Primary transition-all text-[14px] font-bold text-Third resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-50 flex items-center justify-end gap-3 bg-gray-50/30">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-Secondary font-bold text-[13px] rounded-xl hover:bg-gray-100 transition-all uppercase tracking-wide"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-Secondary text-white font-bold text-[13px] rounded-xl shadow-lg shadow-Secondary/10 hover:bg-Secondary/90 active:scale-95 transition-all uppercase tracking-wide">
            Assign Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignProgramModal;