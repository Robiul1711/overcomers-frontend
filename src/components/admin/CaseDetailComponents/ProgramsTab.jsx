import React from 'react';
import { Search, Filter, ChevronDown, Layers, Info, CheckCircle2, ChevronRight } from 'lucide-react';

const ProgramsTab = ({ programsDataset, onViewDetails }) => {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
              <h3 className="text-2xl md:text-3xl font-black text-Third tracking-tight">Clinical Programs</h3>
           </div>
           <p className="text-gray-400 font-bold text-[13px] md:text-[14px] uppercase tracking-widest ml-4">Therapeutic Roadmap & Active Objectives</p>
        </div>
        <div className="hidden xl:flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
           <Info size={18} className="text-Primary" />
           <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider italic">3 programs currently authorized for this insurance block</p>
        </div>
      </div>

      {/* Global Command Bar */}
      <div className="bg-gray-50/80 backdrop-blur-sm border-2 border-dashed border-gray-100 rounded-[32px] p-6 md:p-8 mb-12 shadow-inner shadow-black/[0.01]">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Universal Search</label>
               <div className="relative group">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-Primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Keywords, skills, or categories..." 
                    className="w-full bg-white border border-gray-100 rounded-[18px] py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-Primary/20 focus:border-Primary transition-all text-[15px] font-bold shadow-sm"
                  />
               </div>
            </div>
            
            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Skill Domain</label>
               <div className="relative">
                  <Filter size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="w-full bg-white border border-gray-100 rounded-[18px] py-4 pl-12 pr-10 outline-none appearance-none cursor-pointer text-[15px] font-bold shadow-sm hover:border-gray-200 transition-colors">
                     <option>All Therapeutic Domains</option>
                     <option>Verbal Behavior</option>
                     <option>Social Pragmatics</option>
                     <option>Functional Academics</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Mastery Tier</label>
               <div className="relative">
                  <select className="w-full bg-white border border-gray-100 rounded-[18px] py-4 px-5 outline-none appearance-none cursor-pointer text-[15px] font-bold shadow-sm hover:border-gray-200 transition-colors">
                     <option>Combined Levels</option>
                     <option>Acquisition (Early)</option>
                     <option>Generalization (Mid)</option>
                     <option>Maintenance (Adv)</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Intervention Style</label>
               <div className="relative">
                  <select className="w-full bg-white border border-gray-100 rounded-[18px] py-4 px-5 outline-none appearance-none cursor-pointer text-[15px] font-bold shadow-sm hover:border-gray-200 transition-colors">
                     <option>All Strategy Types</option>
                     <option>Discrete Trial (DTT)</option>
                     <option>Natural Environment (NET)</option>
                     <option>Precision Teaching</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>
         </div>
      </div>

      {/* Grid of Programs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-gray-50">
         <div className="flex items-center gap-3">
            <Layers size={24} className="text-Secondary shrink-0" />
            <h4 className="text-[20px] md:text-2xl font-black text-Third tracking-tight shrink-0">Assigned Curricula</h4>
         </div>
         <button className="w-full sm:w-auto px-10 py-3.5 bg-Secondary text-white rounded-2xl font-black text-[14px] md:text-[15px] uppercase tracking-wider hover:bg-Secondary/90 transition-all shadow-xl shadow-Secondary/10 active:scale-95">Open Global Repository</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {programsDataset.map((program) => (
            <div key={program.id} className="bg-white border-2 border-gray-50 rounded-[40px] p-8 hover:border-Secondary/20 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] transition-all duration-300 group flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-Secondary opacity-[0.02] rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
               
               <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="px-5 py-1.5 bg-Secondary/[0.03] border border-Secondary/10 text-Secondary font-black text-[11px] md:text-[12px] rounded-full uppercase tracking-widest shrink-0">
                     {program.category}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-Primary/10 flex items-center justify-center text-Primary group-hover:bg-Primary group-hover:text-Secondary transition-all duration-300">
                     <CheckCircle2 size={24} />
                  </div>
               </div>

               <h3 className="text-[20px] md:text-[22px] font-black text-Third leading-tight mb-4 group-hover:text-Secondary transition-colors relative z-10 shrink-0 line-clamp-2 min-h-[54px]">{program.title}</h3>
               
               <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed mb-8 flex-grow relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  {program.description}
               </p>

               <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 relative z-10 shrink-0">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1.5">Proficiency</span>
                     <span className="text-[13px] font-extrabold text-Third leading-none">{program.level}</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1.5">Strategy</span>
                     <span className="text-[13px] font-extrabold text-Third leading-none truncate max-w-[120px]">{program.type}</span>
                  </div>
               </div>

               <div className="flex items-center gap-3 relative z-10 mt-auto shrink-0">
                  <button 
                    onClick={() => onViewDetails(program)}
                    className="flex-grow flex items-center justify-center gap-2.5 px-8 py-4 bg-gray-50 border border-gray-100 text-Secondary font-black text-[13px] md:text-[14px] rounded-[22px] hover:bg-Secondary hover:text-white hover:border-Secondary transition-all duration-300 shadow-sm active:scale-95 group/btn"
                  >
                    View Detail <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
               </div>
            </div>
         ))}
         
         {/* Placeholder for new programs */}
         <div className="hidden border-4 border-dashed border-gray-50 rounded-[40px] flex-col items-center justify-center p-12 text-center group cursor-pointer hover:bg-gray-50 hover:border-Secondary/10 transition-all opacity-40">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform shadow-lg shadow-black/[0.02] mb-4">
               <Search size={32} />
            </div>
            <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Authorize New Objective</p>
         </div>
      </div>
    </div>
  );
};

export default ProgramsTab;

