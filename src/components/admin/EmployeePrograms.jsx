import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, Bell, Home, Plus, Info, Check } from 'lucide-react';
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
    { id: 1, title: "Communication Skills Development", category: "Communication", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Echoics", "Mands"] },
    { id: 2, title: "Social Interaction Fundamentals", category: "Social Skills", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Turn-taking"] },
    { id: 3, title: "Emotion Recognition & Regulation", category: "Social Skills", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Labeling emotions"] },
    { id: 4, title: "Challenging Behavior Intervention", category: "Behavior Reduction", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Function analysis"] },
    { id: 5, title: "Daily Routines & Self-Care", category: "Daily Living Skills", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Toileting"] },
    { id: 6, title: "Advanced Communication Strategies", category: "Communication", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Conversational skills"] },
    { id: 7, title: "Peer Interaction & Play Skills", category: "Social Skills", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Group play"] },
    { id: 8, title: "Functional Communication Training", category: "Communication", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Requesting breaks"] },
    { id: 9, title: "Community & Safety Skills", category: "Daily Living Skills", description: "Helps improve verbal and non-verbal communication skills...", level: "Beginner", type: "Skill Acquisition", tasks: ["Crossing streets"] },
  ];

  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen ">
      

      <div className="flex flex-col gap-6 md:gap-8 ">
        {/* Main Content Area - Full Width */}
        <div className="w-full flex flex-col gap-6 md:gap-8">
          <div className="bg-white rounded-[24px] md:rounded-[40px] p-5 md:p-12 shadow-sm border border-gray-50 md:border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b-2 border-Primary gap-4">
               <div>
                  <h2 className="text-2xl md:text-4xl font-black text-Third tracking-tight">Clinical Programs</h2>
                  <p className="text-gray-400 font-bold text-[12px] md:text-[14px] uppercase tracking-widest mt-1">Universal Curricula Library</p>
               </div>
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className="w-full md:w-auto px-10 py-4 bg-Secondary text-white rounded-2xl font-bold text-[14px] md:text-[15px] flex items-center justify-center gap-2 hover:bg-Secondary/90 shadow-xl shadow-Secondary/10 active:scale-95 transition-all uppercase tracking-wider"
               >
                  <Plus size={20} strokeWidth={3} /> Add Program
               </button>
            </div>

            {/* Consistently Re-styled Command Bar - Responsive Grid */}
            <div className="bg-gray-50/50 rounded-[24px] md:rounded-[32px] p-5 md:p-8 border border-gray-100 mb-10 overflow-hidden">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                  {/* Universal Search */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] md:text-[12px] font-black text-Third uppercase tracking-widest pl-1">Universal Search</label>
                    <div className="relative group">
                       <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-Secondary transition-colors" />
                       <input 
                         type="text" 
                         placeholder="Keywords, skills..." 
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full bg-white border-2 border-gray-100/50 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-Primary/50 focus:ring-4 focus:ring-Primary/5 transition-all text-[14px] md:text-[15px] font-bold shadow-sm"
                       />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] md:text-[12px] font-black text-Third uppercase tracking-widest pl-1">Domain</label>
                    <div className="relative group">
                       <select 
                         value={selectedCategory}
                         onChange={(e) => setSelectedCategory(e.target.value)}
                         className="w-full bg-white border-2 border-gray-100/50 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-5 outline-none appearance-none cursor-pointer text-[14px] md:text-[15px] font-bold hover:border-Primary/30 transition-colors shadow-sm"
                       >
                          {["All Categories", "Communication", "Social Skills", "Behavior Reduction", "Daily Living Skills"].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                       </select>
                       <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-Secondary transition-colors" />
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] md:text-[12px] font-black text-Third uppercase tracking-widest pl-1">Mastery</label>
                    <div className="relative group">
                       <select 
                         value={selectedLevel}
                         onChange={(e) => setSelectedLevel(e.target.value)}
                         className="w-full bg-white border-2 border-gray-100/50 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-5 outline-none appearance-none cursor-pointer text-[14px] md:text-[15px] font-bold hover:border-Primary/30 transition-colors shadow-sm"
                       >
                          {["All Levels", "Beginner", "Intermediate", "Advanced"].map(lvl => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                       </select>
                       <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-Secondary transition-colors" />
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] md:text-[12px] font-black text-Third uppercase tracking-widest pl-1">Protocols</label>
                    <div className="relative group">
                       <select 
                         value={selectedType}
                         onChange={(e) => setSelectedType(e.target.value)}
                         className="w-full bg-white border-2 border-gray-100/50 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-5 outline-none appearance-none cursor-pointer text-[14px] md:text-[15px] font-bold hover:border-Primary/30 transition-colors shadow-sm"
                       >
                          {["All Types", "Skill Acquisition", "Behavior Intervention"].map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                       </select>
                       <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-Secondary transition-colors" />
                    </div>
                  </div>
               </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-Primary/10 text-Secondary rounded-xl hidden sm:flex">
                     <Info size={18} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-Third tracking-tight">Available Programs</h3>
               </div>
               <div className="flex-1 h-px bg-Primary/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {programsDataset.filter(prog => {
                  const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCat = selectedCategory === "All Categories" || prog.category === selectedCategory;
                  const matchesLvl = selectedLevel === "All Levels" || prog.level === selectedLevel;
                  const matchesType = selectedType === "All Types" || prog.type === selectedType;
                  return matchesSearch && matchesCat && matchesLvl && matchesType;
              }).map((prog) => (
                <div key={prog.id} className="bg-white border-2 border-gray-50 rounded-[32px] md:rounded-[40px] p-6 md:p-8 hover:border-Secondary/10 hover:shadow-2xl hover:shadow-black/[0.04] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-1.5 h-full relative group shadow-sm">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-Secondary opacity-[0.02] rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                   
                   <h4 className="text-Secondary font-black text-[20px] md:text-[22px] leading-tight mb-2 min-h-[50px] line-clamp-2">{prog.title}</h4>
                   <div className="flex mb-4">
                      <span className="px-4 py-1 bg-Secondary/[0.03] border border-Secondary/5 text-Secondary font-black text-[11px] rounded-lg tracking-widest uppercase">
                        {prog.category}
                      </span>
                   </div>
                   <p className="text-gray-500 font-medium text-[14px] md:text-[15px] leading-relaxed mb-6 line-clamp-3 opacity-90 transition-opacity group-hover:opacity-100">
                     {prog.description}
                   </p>
                   
                   <div className="flex items-center gap-4 mb-8 pt-6 border-t border-gray-50 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Proficiency</span>
                        <span className="text-[13px] font-extrabold text-Third leading-none">{prog.level}</span>
                      </div>
                      <div className="w-px h-6 bg-gray-100"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Strategy</span>
                        <span className="text-[13px] font-extrabold text-Third leading-none truncate max-w-[100px]">{prog.type}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 relative z-10">
                      <button 
                        onClick={() => handleViewProgram(prog)}
                        className="py-3.5 border-2 border-Secondary/10 text-Secondary font-black text-[12px] md:text-[14px] rounded-xl hover:bg-Secondary/5 active:scale-95 transition-all text-center px-2"
                      >
                         View Details
                      </button>
                      <button 
                        onClick={() => {
                           setAssigningProgram(prog);
                           setIsAssignModalOpen(true);
                        }}
                        className="py-3.5 bg-Primary text-Secondary font-black text-[12px] md:text-[14px] rounded-xl shadow-lg shadow-Primary/10 hover:shadow-Primary/20 hover:translate-y-[-1px] active:scale-95 transition-all text-center px-1"
                      >
                         Assign to Client
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProgram && (
        <ProgramDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedProgram={selectedProgram}
        />
      )}

      <AddProgramModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <AssignProgramModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        program={assigningProgram}
      />
    </div>
  );
};

export default EmployeePrograms;

