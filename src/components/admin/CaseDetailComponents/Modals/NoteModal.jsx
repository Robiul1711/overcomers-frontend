import React from 'react';
import { X } from 'lucide-react';

const NoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-[32px] w-full max-w-[600px] relative z-10 shadow-2xl flex flex-col p-8 sm:p-10 font-poppins animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-full">
            <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Add Case Notes</h2>
            <p className="text-[#6B7280] text-[15px] font-medium mb-3">Add important notes and updates</p>
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
           <div className="flex flex-col gap-3">
              <label className="text-[14px] font-bold text-[#3A331E]">Add Notes</label>
              <textarea 
                className="w-full h-40 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-[#3A331E] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76121F]/20 transition-all font-medium"
                placeholder="Write a new case notes..."
              ></textarea>
           </div>

           <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={onClose}
                className="px-10 py-3.5 bg-[#FFBB03] text-white rounded-xl font-bold text-[14px] hover:bg-[#E5A802] transition-all active:scale-95 shadow-md"
              >
                Cancel
              </button>
              <button 
                className="px-10 py-3.5 bg-[#76121F] text-white rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md shadow-[#76121F]/10"
              >
                Save Note
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
