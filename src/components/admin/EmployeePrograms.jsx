import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Info, ClipboardCheck } from 'lucide-react';
import ProgramDetailModal from './CaseDetailComponents/Modals/ProgramDetailModal';
import AddProgramModal from './CaseDetailComponents/Modals/AddProgramModal';
import AssignProgramModal from './CaseDetailComponents/Modals/AssignProgramModal';

const EmployeePrograms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedType, setSelectedType] = useState("All Types");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [assigningProgram, setAssigningProgram] = useState(null);

  const programsDataset = [
    { id: 1, title: "Communication Skills Development", category: "Communication", description: "Helps improve verbal and non-verbal communication skills through evidence-based protocols.", level: "Beginner", type: "Skill Acquisition", tasks: ["Echoics", "Mands"] },
    { id: 2, title: "Social Interaction Fundamentals", category: "Social Skills", description: "Focuses on foundational social behaviors and group participation skills.", level: "Beginner", type: "Skill Acquisition", tasks: ["Turn-taking"] },
    { id: 3, title: "Emotion Recognition & Regulation", category: "Social Skills", description: "Targets the identification of emotional states in self and others.", level: "Beginner", type: "Skill Acquisition", tasks: ["Labeling emotions"] },
    // ... rest of dataset
  ];

  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <div className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm border border-gray-100">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-5 border-b border-gray-100 gap-4">
           <div>
              <h2 className="text-xl md:text-2xl font-black text-Third tracking-tight">Clinical Programs</h2>
              <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.15em] mt-0.5">Curricula Library</p>
           </div>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="w-full md:w-auto px-6 py-3 bg-Secondary text-white rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-Secondary/90 shadow-lg shadow-Secondary/10 active:scale-95 transition-all uppercase tracking-wide"
           >
              <Plus size={18} strokeWidth={2.5} /> New Program
           </button>
        </div>

        {/* Filters - More Compact */}
        <div className="bg-gray-50/50 rounded-2xl p-4 md:p-5 border border-gray-100 mb-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Universal Search</label>
                <div className="relative group">
                   <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-Secondary transition-colors" />
                   <input 
                     type="text" 
                     placeholder="Keywords, skills..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-Primary transition-all text-[13px] font-semibold text-Third shadow-sm"
                   />
                </div>
              </div>

              {["Domain", "Mastery", "Protocols"].map((label, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{label}</label>
                  <div className="relative group">
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 outline-none appearance-none cursor-pointer text-[13px] font-semibold text-Third hover:border-gray-300 transition-colors shadow-sm"
                      onChange={(e) => {
                        if(label === "Domain") setSelectedCategory(e.target.value);
                        if(label === "Mastery") setSelectedLevel(e.target.value);
                        if(label === "Protocols") setSelectedType(e.target.value);
                      }}
                    >
                      {label === "Domain" && ["All Categories", "Communication", "Social Skills", "Behavior Reduction", "Daily Living Skills"].map(o => <option key={o}>{o}</option>)}
                      {label === "Mastery" && ["All Levels", "Beginner", "Intermediate", "Advanced"].map(o => <option key={o}>{o}</option>)}
                      {label === "Protocols" && ["All Types", "Skill Acquisition", "Behavior Intervention"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Section Title */}
        <div className="mb-6 flex items-center gap-3">
           <h3 className="text-md font-bold text-Third tracking-tight">Available Programs</h3>
           <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programsDataset.filter(prog => {
              const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCat = selectedCategory === "All Categories" || prog.category === selectedCategory;
              const matchesLvl = selectedLevel === "All Levels" || prog.level === selectedLevel;
              const matchesType = selectedType === "All Types" || prog.type === selectedType;
              return matchesSearch && matchesCat && matchesLvl && matchesType;
          }).map((prog) => (
            <div key={prog.id} className="bg-white border border-gray-100 rounded-[20px] p-5 hover:border-Secondary/20 hover:shadow-xl hover:shadow-black/[0.02] transition-all flex flex-col h-full group relative overflow-hidden">
               <div className="absolute -top-4 -right-4 w-16 h-16 bg-Secondary/5 rounded-full blur-xl group-hover:bg-Secondary/10 transition-colors"></div>
               
               <h4 className="text-Third font-bold text-[16px] leading-snug mb-2 min-h-[44px] line-clamp-2 group-hover:text-Secondary transition-colors">
                 {prog.title}
               </h4>
               
               <div className="flex mb-3">
                  <span className="px-2.5 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 font-bold text-[9px] rounded-md tracking-wider uppercase">
                    {prog.category}
                  </span>
               </div>

               <p className="text-gray-500 font-medium text-[13px] leading-relaxed mb-5 line-clamp-2 opacity-80">
                 {prog.description}
               </p>
               
               <div className="flex items-center gap-4 mb-5 pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Level</span>
                    <span className="text-[12px] font-bold text-Third">{prog.level}</span>
                  </div>
                  <div className="w-px h-5 bg-gray-100"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Strategy</span>
                    <span className="text-[12px] font-bold text-Third truncate max-w-[80px]">{prog.type}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleViewProgram(prog)}
                    className="py-2.5 border border-gray-200 text-Third font-bold text-[11px] rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => { setAssigningProgram(prog); setIsAssignModalOpen(true); }}
                    className="py-2.5 bg-Primary text-Secondary font-bold text-[11px] rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ClipboardCheck size={14} /> Assign
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedProgram && (
        <ProgramDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedProgram={selectedProgram} />
      )}
      <AddProgramModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <AssignProgramModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} program={assigningProgram} />
    </div>
  );
};

export default EmployeePrograms;