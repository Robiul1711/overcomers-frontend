import React from 'react';
import { X, ChevronDown, Calendar } from 'lucide-react';

const AssignProgramModal = ({ isOpen, onClose, program }) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-Third/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-[min(95vw,600px)] rounded-[32px] md:rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 text-left">
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center justify-between border-b-2 border-Primary/30">
          <h2 className="text-2xl md:text-3xl font-black text-Third tracking-tight leading-tight">Assign Program</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border-2 border-Secondary/20 flex items-center justify-center text-Secondary hover:bg-Secondary hover:text-white transition-all shadow-sm shrink-0"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 flex flex-col gap-5 md:gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Program Info Card */}
          <div className="bg-[#F0F7FF] border-2 border-[#DCEBFF] rounded-[24px] p-5 md:p-6">
             <h3 className="text-lg md:text-xl font-black text-[#0066FF] mb-1 leading-tight">Program: {program.title}</h3>
             <p className="text-[#5C9EFF] font-bold text-[12px] md:text-[14px] uppercase tracking-wider">{program.category} • {program.level}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] md:text-[13px] font-black text-Third uppercase tracking-widest pl-1">Select Client</label>
            <div className="relative group">
              <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-5 md:px-6 outline-none appearance-none cursor-pointer text-[14px] md:text-[15px] font-bold hover:border-Primary/30 transition-colors shadow-sm">
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-Secondary transition-colors shadow-sm" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] md:text-[13px] font-black text-Third uppercase tracking-widest pl-1">Clinical Start Date</label>
            <div className="relative">
               <input 
                 type="date" 
                 className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-5 md:px-6 outline-none focus:border-Primary/50 focus:ring-4 focus:ring-Primary/5 transition-all text-[14px] md:text-[15px] font-bold shadow-sm"
               />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] md:text-[13px] font-black text-Third uppercase tracking-widest pl-1">Implementation Notes</label>
            <textarea 
              rows={3}
              placeholder="Add any additional notes..." 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-[20px] md:rounded-[24px] p-5 md:p-6 outline-none focus:border-Primary/50 focus:ring-4 focus:ring-Primary/5 transition-all text-[14px] md:text-[15px] font-bold shadow-sm resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-end gap-3 md:gap-4 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-4 bg-Primary text-Secondary font-black text-[14px] md:text-[15px] rounded-xl md:rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-Primary/10 uppercase tracking-wider"
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-Secondary text-white font-black text-[14px] md:text-[15px] rounded-xl md:rounded-2xl hover:bg-Secondary/90 shadow-xl shadow-Secondary/10 active:scale-95 transition-all uppercase tracking-wider">
            Assign Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignProgramModal;
