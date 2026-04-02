import React from 'react';
import { Plus } from 'lucide-react';

const CaseNotesSection = ({ caseNotes, onAddNote }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
              <h3 className="text-[22px] md:text-2xl font-black text-Third tracking-tight leading-none">Clinical Progress Notes</h3>
           </div>
           <p className="text-gray-400 font-bold text-[13px] md:text-[14px] uppercase tracking-widest ml-4">Authorized observations & updates</p>
        </div>
        <button 
          onClick={onAddNote}
          className="w-full sm:w-auto px-8 py-3.5 bg-Secondary text-white rounded-2xl font-black text-[14px] md:text-[15px] flex items-center justify-center gap-2.5 hover:bg-Secondary/90 transition-all shadow-[0_12px_24px_-8px_rgba(118,18,31,0.3)] active:scale-95 uppercase tracking-wider"
        >
          <Plus size={20} strokeWidth={3} /> New Observation
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {caseNotes.map((note, idx) => (
          <div key={idx} className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-lg hover:border-Secondary/10 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-gray-100/50 pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-Secondary/5 flex items-center justify-center text-Secondary font-black text-[12px] border border-Secondary/10 shadow-inner">
                    {note.author.split(' ').map(n=>n[0]).join('')}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-Secondary font-black text-[15px] leading-none mb-1">{note.author}</span>
                    <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest">{note.author.includes('(BCBA)') ? 'Supervising Analyst' : 'Clinical Tech'}</span>
                 </div>
              </div>
              <span className="text-gray-400 text-[12px] font-bold px-3 py-1 bg-white rounded-lg border border-gray-50 shadow-sm w-fit shrink-0">{note.date}</span>
            </div>
            <div className="relative">
               <Quote size={24} className="absolute -left-2 -top-2 text-Secondary/5 rotate-12" />
               <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed font-bold italic relative z-10 pl-2">"{note.note}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Quote icon if not imported
const Quote = ({ className, size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 15.1046 21.017 14V9C21.017 7.89543 20.1216 7 19.017 7H16.017C14.9124 7 14.017 7.89543 14.017 9V14M14.017 21C12.9124 21 12.017 20.1046 12.017 19V14C12.017 11.7909 13.8079 10 16.017 10H19.017V9H16.017C15.4647 9 15.017 8.55228 15.017 8C15.017 7.44772 15.4647 7 16.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V14C21.017 16.2091 19.2261 18 17.017 18H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C11.1216 16 12.017 15.1046 12.017 14V9C12.017 7.89543 11.1216 7 10.017 7H7.017C5.91243 7 5.017 7.89543 5.017 9V14M5.017 21C3.91243 21 3.017 20.1046 3.017 19V14C3.017 11.7909 4.80786 10 7.017 10H10.017V9H7.017C6.46472 9 6.017 8.55228 6.017 8C6.017 7.44772 6.46472 7 7.017 7H10.017C11.1216 7 12.017 7.89543 12.017 9V14C12.017 16.2091 10.2261 18 8.017 18H5.017V21Z" />
  </svg>
);

export default CaseNotesSection;
