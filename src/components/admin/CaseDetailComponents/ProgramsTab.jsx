import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const ProgramsTab = ({ programsDataset, onAddNote }) => {
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Demo statuses for the list view
  const statuses = ['Active', 'Pending', 'Completed'];

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setView('details');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProgram(null);
  };

  if (view === 'details' && selectedProgram) {
    return (
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="mb-8 relative">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={handleBackToList}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#76121F] hover:bg-[#76121F] hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight">Programs</h2>
          </div>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Program Hero Section */}
          <div className="border-b border-gray-100 pb-8">
            <h3 className="text-[24px] md:text-[28px] font-bold text-[#3A331E] mb-4">{selectedProgram.title}</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <span className="px-5 py-1.5 bg-[#FAF6F7] text-[#76121F] font-bold text-[11px] rounded-full uppercase tracking-wider">
                  {selectedProgram.category}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-[22px] font-bold text-[#800000]">Description</h4>
                <p className="text-gray-500 text-[15px] font-medium leading-relaxed max-w-4xl">
                  {selectedProgram.description}
                </p>
                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[12px] uppercase tracking-wide mt-1">
                  <span>{selectedProgram.level}</span>
                  <span>-</span>
                  <span>{selectedProgram.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Task List Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#800000]">Task List</h3>
              <button onClick={onAddNote} className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[14px] px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                Add Note
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, title: "Task 1 - Responds To Name Within 3 Seconds", trials: 5, correct: 3, incorrect: 2 },
                { id: 2, title: "Task 2 - Labels 5+ Common Objects Verbally", trials: 5, correct: 5, incorrect: 0 },
                { id: 3, title: "Task 3 - Initiates Conversation With Peer", trials: 5, correct: 5, incorrect: 0 },
                { id: 4, title: "Task 4 - Labels 5+ Common Objects Verbally", trials: 0, correct: 0, incorrect: 0 },
              ].map((task) => (
                <div key={task.id} className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all">
                  <h5 className="text-[16px] font-bold text-[#3A331E] mb-6">{task.title}</h5>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">Trials</label>
                      <input type="number" className="bg-[#F4F4F4] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px]" value={task.trials} onChange={(e) => handleTaskChange(task.id, 'trials', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">Correct</label>
                      <input type="number" className="bg-[#E5F9ED] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px] border border-[#10B981]/10" value={task.correct} onChange={(e) => handleTaskChange(task.id, 'correct', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">Incorrect</label>
                      <input type="number" className="bg-[#FAF6F7] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px] border border-[#76121F]/10" value={task.incorrect} onChange={(e) => handleTaskChange(task.id, 'incorrect', e.target.value)} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-[#10B981] text-white py-2.5 rounded-xl text-[14px] font-bold shadow-sm hover:bg-[#0E9F6E] transition-all flex items-center justify-center gap-2 active:scale-95">
                       <span className="text-[16px]">✓</span> Yes
                    </button>
                    <button className="flex-1 border-2 border-[#FF5C5C] text-[#FF5C5C] py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#FF5C5C] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95">
                       <span className="text-[16px]">✕</span> No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="mb-8 overflow-hidden">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Programs</h2>
        <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#3A331E]">Assigned programs</h3>
        <button className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[14px] px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
          View All Programs
        </button>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programsDataset.map((program, index) => {
          const status = statuses[index % statuses.length];
          const statusColors = {
            'Active': 'bg-[#76121F] text-white',
            'Pending': 'bg-[#FFBB03] text-white',
            'Completed': 'bg-[#10B981] text-white'
          };

          return (
            <div key={program.id} className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="flex flex-col gap-1 mb-4">
                <h4 className="text-[20px] font-bold text-[#76121F] leading-tight line-clamp-2 min-h-[56px]">
                  {program.title}
                </h4>
                <div className="mt-2">
                   <span className="px-5 py-1.5 bg-[#FAF6F7] text-[#76121F] font-bold text-[11px] rounded-full uppercase tracking-wider">
                      {program.category}
                   </span>
                </div>
              </div>

              <p className="text-gray-500 text-[14px] font-medium leading-relaxed mb-6 line-clamp-3">
                {program.description}
              </p>

              <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[12px] mb-8 mt-auto uppercase tracking-wide">
                <span>{program.level}</span>
                <span className="text-[#76121F]">•</span>
                <span>{program.type}</span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleViewDetails(program)}
                  className="flex-1 py-3 border-2 border-[#76121F] text-[#76121F] font-bold text-[13px] rounded-xl hover:bg-[#76121F] hover:text-white transition-all active:scale-95 text-center"
                >
                  View Details
                </button>
                <div 
                  className={`flex-1 py-3 ${statusColors[status]} font-bold text-[13px] rounded-xl text-center shadow-sm select-none`}
                >
                  {status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramsTab;
