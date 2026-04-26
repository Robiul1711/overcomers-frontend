import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, LayoutGrid, User, RefreshCw } from 'lucide-react';

const ProgramDetailModal = ({ isOpen, onClose, selectedProgram }) => {
  if (!selectedProgram) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[min(95vw,650px)] p-6 md:p-8 rounded-[24px] md:rounded-[32px] overflow-y-auto max-h-[90vh] border-none shadow-2xl animate-in zoom-in-95 duration-300 custom-scrollbar">
        <div className="flex flex-col gap-6">
          
          {/* Header Section */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-Primary rounded-full"></div>
                <h2 className="text-xl md:text-2xl font-black text-Third leading-tight tracking-tight">
                  {selectedProgram.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-Secondary/5 border border-Secondary/10 text-Secondary font-bold text-[10px] uppercase tracking-wider rounded-lg">
                  {selectedProgram.category}
                </span>
                <span className="text-gray-400 font-medium text-[11px] uppercase tracking-wide">
                  {selectedProgram.level} • {selectedProgram.type}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90 shrink-0"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-y border-gray-50">
            {/* Strategy Section */}
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Therapeutic Strategy</h4>
              <p className="text-gray-600 text-[14px] font-medium leading-relaxed italic">
                "{selectedProgram.description}"
              </p>
            </div>
            
            {/* Metadata Section - More Compact */}
            <div className="space-y-3 md:border-l md:pl-6 border-gray-100">
               <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase mb-1">
                    <User size={10} /> Clinician
                  </div>
                  <p className="text-Third font-bold text-xs">{selectedProgram.createdBy}</p>
               </div>
               <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase mb-1">
                    <RefreshCw size={10} /> Revised
                  </div>
                  <p className="text-Third font-bold text-xs">{selectedProgram.lastUpdated}</p>
               </div>
            </div>
          </div>

          {/* Task List Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-Primary/10 flex items-center justify-center text-Primary">
                  <LayoutGrid size={18} />
               </div>
               <h4 className="text-lg font-bold text-Third tracking-tight">Task List</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProgram.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50/50 border border-transparent rounded-xl hover:border-Primary/30 transition-colors group">
                  <div className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center text-gray-400 font-bold text-[10px] group-hover:bg-Primary group-hover:text-white transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-[13px] font-semibold text-gray-600 leading-tight">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-gray-50">
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-gray-100 text-Secondary font-bold rounded-xl text-[13px] hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-wide"
            >
              Close
            </button>
            <button 
              onClick={onClose} 
              className="px-8 py-3 bg-Secondary text-white font-bold rounded-xl text-[13px] shadow-lg shadow-Secondary/20 hover:bg-Secondary/90 transition-all active:scale-95 uppercase tracking-wide"
            >
              Modify Protocol
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailModal;