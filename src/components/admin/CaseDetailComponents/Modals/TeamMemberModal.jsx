import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const TeamMemberModal = ({ isOpen, onClose, selectedMember }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[min(95vw,650px)] p-6 md:p-12 rounded-[32px] md:rounded-[48px] border-none shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-10 bg-Secondary rounded-full"></div>
               <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-black text-Third tracking-tight leading-none mb-1">Clinical Personnel</h2>
                  <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-widest">{selectedMember?.dateRange}</p>
               </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-[20px] border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90 shrink-0"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>
          
          <div className="w-24 h-[4px] bg-Primary/20 rounded-full -mt-4"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Authorized Provider", value: selectedMember?.name, icon: "👤" },
              { label: "Clinical Role", value: selectedMember?.role, icon: "🎓" },
              { label: "Secure Line", value: selectedMember?.phone, icon: "📞" },
              { label: "HIPAA Email", value: selectedMember?.email, icon: "📧" }
            ].map((info, idx) => (
              <div key={idx} className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 flex flex-col gap-2 min-h-[110px] justify-center hover:bg-white hover:border-Primary/30 transition-all group">
                 <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em]">{info.label}</span>
                    <span className="text-[14px] opacity-40 group-hover:opacity-100 transition-opacity">{info.icon}</span>
                 </div>
                 <span className="text-Secondary font-black text-[16px] md:text-[18px] leading-tight truncate">{info.value}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-Secondary text-white font-black rounded-2xl md:rounded-[24px] text-[15px] shadow-2xl shadow-Secondary/20 hover:bg-Secondary/90 transition-all active:scale-95 uppercase tracking-[0.2em]"
          >
            Acknowledge Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;
