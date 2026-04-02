import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, LayoutGrid } from 'lucide-react';

const ProgramDetailModal = ({ isOpen, onClose, selectedProgram }) => {
  if (!selectedProgram) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[min(95vw,800px)] p-6 md:p-12 rounded-[32px] md:rounded-[56px] overflow-y-auto max-h-[90vh] border-none shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-10 bg-Primary rounded-full"></div>
                  <h2 className="text-2xl md:text-4xl font-black text-Third leading-tight tracking-tight max-w-[550px]">{selectedProgram.title}</h2>
               </div>
               <div className="flex items-center gap-3 ml-4">
                  <span className="px-5 py-1.5 bg-Secondary/5 border border-Secondary/10 text-Secondary font-black text-[12px] uppercase tracking-[0.2em] rounded-full">
                    {selectedProgram.category}
                  </span>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <span className="text-gray-400 font-bold text-[12px] uppercase tracking-widest">{selectedProgram.level} • {selectedProgram.type}</span>
               </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-[20px] border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90 shrink-0"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          <div className="w-full h-px bg-gray-50"></div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
             <div className="flex-1">
                <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">Therapeutic Strategy</h4>
                <p className="text-gray-600 text-[15px] md:text-[16px] font-bold leading-relaxed italic opacity-80">
                  "{selectedProgram.description}"
                </p>
             </div>
             
             <div className="md:w-64 bg-gray-50/50 p-6 rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col gap-4">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Clinical Metadata</h4>
                 <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-400 font-bold mb-0.5">Authorizing Clinician</span>
                       <span className="text-Third font-black text-[13px]">{selectedProgram.createdBy}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-400 font-bold mb-0.5">Revision Protocol</span>
                       <span className="text-Third font-black text-[13px]">{selectedProgram.lastUpdated}</span>
                    </div>
                 </div>
             </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-Primary/10 flex items-center justify-center text-Primary">
                  <LayoutGrid size={24} />
               </div>
               <h4 className="text-[20px] md:text-2xl font-black text-Third tracking-tight">Skill Acquisition Task List</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProgram.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[24px] shadow-sm group hover:border-Primary transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 font-black text-[11px] group-hover:bg-Primary group-hover:text-Secondary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-[14px] md:text-[15px] font-bold text-gray-600 leading-snug">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 mt-6 pt-8 border-t border-gray-50">
            <button 
              onClick={onClose} 
              className="order-2 sm:order-1 px-10 py-5 bg-gray-100 text-Secondary font-black rounded-2xl md:rounded-[24px] text-[15px] hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-wider"
            >
              Close Window
            </button>
            <button 
              onClick={onClose} 
              className="order-1 sm:order-2 px-12 py-5 bg-Secondary text-white font-black rounded-2xl md:rounded-[24px] text-[15px] shadow-2xl shadow-Secondary/20 hover:bg-Secondary/90 transition-all active:scale-95 uppercase tracking-widest"
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
