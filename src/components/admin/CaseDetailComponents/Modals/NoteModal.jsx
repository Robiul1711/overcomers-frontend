import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const NoteModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[min(95vw,600px)] p-6 md:p-10 rounded-[32px] md:rounded-[48px] border-none shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
               <h2 className="text-2xl md:text-3xl font-black text-Third tracking-tight">Add Case Note</h2>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-Secondary hover:border-Secondary transition-all active:scale-90"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="w-24 h-[4px] bg-Primary/20 rounded-full -mt-2"></div>
          
          <div className="relative group">
            <textarea 
              placeholder="Detail the session observations, breakthroughs, or behavioral shifts..." 
              className="w-full h-[220px] bg-gray-50/50 hover:bg-white rounded-[24px] p-6 text-[15px] font-bold text-Secondary outline-none border-2 border-transparent focus:border-Primary focus:bg-white transition-all shadow-inner placeholder:text-gray-300 italic"
            ></textarea>
            <div className="absolute bottom-4 right-6 text-[10px] font-black text-gray-300 uppercase tracking-widest">Secure Input Field</div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
            <button 
              onClick={onClose} 
              className="order-2 sm:order-1 px-8 py-4 bg-gray-100 text-Secondary font-black rounded-2xl text-[14px] md:text-[15px] hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-wider"
            >
              Discard
            </button>
            <button 
              onClick={onClose} 
              className="order-1 sm:order-2 px-10 py-4 bg-Secondary text-white font-black rounded-2xl text-[14px] md:text-[15px] shadow-xl shadow-Secondary/10 hover:bg-Secondary/90 transition-all active:scale-95 uppercase tracking-widest"
            >
              Submit Note
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
