import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, LayoutGrid, Calendar, Tag, BarChart2, ClipboardList, CheckCircle2, Circle } from 'lucide-react';

const ProgramDetailModal = ({ isOpen, onClose, selectedProgram }) => {
  if (!selectedProgram) return null;

  const tasks = selectedProgram.tasks || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[min(95vw,650px)] p-0 rounded-xl overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col">
          
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-black text-Third leading-tight tracking-tight">
                {selectedProgram.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-Secondary/5 border border-Secondary/10 text-Secondary font-bold text-[10px] uppercase tracking-wider rounded-lg">
                  {selectedProgram.category}
                </span>
                <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-wider rounded-lg">
                  {selectedProgram.level}
                </span>
                <span className="px-3 py-1 bg-purple-50 border border-purple-100 text-purple-600 font-bold text-[10px] uppercase tracking-wider rounded-lg">
                  {selectedProgram.type}
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

          {/* Body */}
          <div className="p-6 flex flex-col gap-6 max-h-[65vh] overflow-y-auto custom-scrollbar">

            {/* Metadata Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-Secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Date</p>
                  <p className="text-[13px] font-bold text-Third">{selectedProgram.start_date || "—"}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                  <ClipboardList size={16} className="text-Secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tasks</p>
                  <p className="text-[13px] font-bold text-Third">{tasks.length} Tasks</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Tag size={12} /> Therapeutic Strategy
              </h4>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-600 text-[14px] font-medium leading-relaxed">
                  "{selectedProgram.description}"
                </p>
              </div>
            </div>

            {/* Task List Section */}
            {tasks.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <LayoutGrid size={12} /> Task List
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {tasks.map((task, i) => {
                    const taskTitle = typeof task === "string" ? task : task?.title;
                    const isCompleted = typeof task === "object" ? !!task?.is_completed : false;
                    return (
                      <div
                        key={task?.id || i}
                        className="flex items-center gap-3 p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-Secondary/20 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 font-bold text-[11px] group-hover:bg-Secondary group-hover:text-white group-hover:border-Secondary transition-all">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span className="text-[13px] font-semibold text-gray-600 leading-tight flex-1">
                          {taskTitle}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-gray-300 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tasks.length === 0 && (
              <div className="text-center py-6 text-gray-400 font-bold text-[13px]">
                No tasks have been added to this program.
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-50 bg-gray-50/30">
            <button 
              onClick={onClose} 
              className="px-6 py-2.5 bg-gray-100 text-Secondary font-bold rounded-xl text-[13px] hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-wide"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailModal;