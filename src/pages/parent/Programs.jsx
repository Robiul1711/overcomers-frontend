import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  X,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProgramDetailsView = ({ program, onBack }) => {
  const [isSavedAll, setIsSavedAll] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="relative w-fit">
          <h2 className="text-3xl font-bold text-[#2D2D2D]">Program Details</h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#3A331E]">
          {program.title}
        </h3>
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#FAF8F8] border border-[#F3F4F6] rounded-[2.5rem] p-10 shadow-sm">
        {/* Category & Description */}
        <div className="mb-10">
          <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1.5 rounded-full text-sm font-bold border border-[#FEE2E2] inline-block mb-4">
            {program.category}
          </span>
          <h4 className="text-2xl font-bold text-[#800000] mb-3">Description</h4>
          <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
            {program.longDescription || program.description}
            {program.isSpecial &&
              " This comprehensive program includes evidence-based strategies and structured interventions designed to support skill development and track progress over time. The program follows ABA principles and is suitable for individualized treatment plans."}
          </p>
          <p className="text-sm text-[#9CA3AF] font-medium uppercase tracking-wide">
            {program.level}
          </p>
        </div>

        <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

        {/* Task List Header */}
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-2xl font-bold text-[#3A331E]">Task List</h4>
          <button 
            onClick={() => setIsSavedAll(!isSavedAll)}
            className={`${
              isSavedAll ? "bg-green-600" : "bg-[#76121F] hover:bg-[#600000]"
            } text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-md flex items-center gap-2`}
          >
            {isSavedAll ? (
              <>
                <CheckCircle2 size={18} />
                All Completed
              </>
            ) : (
              "Save all as complete"
            )}
          </button>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(program.tasks || [
            "Responds To Name Within 3 Seconds",
            "Labels 5+ Common Objects Verbally",
            "Initiates Conversation With Peer",
            "Labels 5+ Common Objects Verbally",
          ]).map((task, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
            >
              <h5 className="text-lg font-bold text-[#3A331E] mb-6 pb-4 border-b border-gray-100">
                Task {i + 1} - {task}
              </h5>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Trials
                  </label>
                  <input 
                    type="number"
                    defaultValue={5}
                    className="w-full bg-[#F3F4F6] rounded-xl py-3 text-center font-bold text-lg outline-none focus:ring-2 focus:ring-[#FFBB03] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Correct
                  </label>
                  <input 
                    type="number"
                    defaultValue={3}
                    className="w-full bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl py-3 text-center font-bold text-lg outline-none focus:ring-2 focus:ring-green-400 transition-all text-green-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Incorrect
                  </label>
                  <input 
                    type="number"
                    defaultValue={2}
                    className="w-full bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl py-3 text-center font-bold text-lg outline-none focus:ring-2 focus:ring-red-400 transition-all text-red-700"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-[#10B981] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#059669] transition-all">
                  <span className="text-lg text-white">✓</span> Yes
                </button>
                <button className="flex-1 border-2 border-[#FEE2E2] text-[#EF4444] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FEF2F2] transition-all">
                  <span className="text-lg">✕</span> No
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [view, setView] = useState("list"); // "list" or "details"
  const [completedPrograms, setCompletedPrograms] = useState([]);

  const assignedPrograms = [
    {
      title: "Communication Skills Development",
      category: "Communication",
      description:
        "Helps improve verbal and non-verbal communication skills through structured activities. This comprehensive program includes evidence-based strategies and structured interventions designed to support skill development and track progress over time. The program follows ABA principles and is suitable for individualized treatment plans.",
      level: "Beginner · Skill Acquisition",
      isSpecial: true,
      tasks: [
        "Responds To Name Within 3 Seconds",
        "Labels 5+ Common Objects Verbally",
        "Initiates Conversation With Peer",
        "Labels 5+ Common Objects Verbally",
      ],
    },
    {
      title: "Social Interaction Fundamentals",
      category: "Social Skills",
      description:
        "Focuses on the core concepts of social engagement, eye contact, and turn-taking in social settings.",
      level: "Beginner · Skill Acquisition",
      tasks: [
        "Initiates play with peers",
        "Shares toys and materials",
        "Takes turns during structured activities",
        "Uses 'please' and 'thank you' appropriately",
        "Responds to simple social questions",
      ],
    },
    {
      title: "Emotion Recognition & Regulation",
      category: "Social Skills",
      description:
        "Teaches patients how to identify and appropriately respond to their own emotions and others'.",
      level: "Beginner · Skill Acquisition",
      tasks: [
        "Identifies basic emotions in pictures",
        "Labels current feeling when prompted",
        "Uses a 'calm down' strategy with help",
        "Recognizes happy/sad facial expressions",
        "Communicates frustration without aggression",
      ],
    },
  ];

  const allNotes = [
    {
      name: "Eleanor Pena (RBT)",
      date: "March 5, 2026",
      text: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.",
    },
    {
      name: "Dr. Devon Lane (BCBA)",
      date: "February 28, 2026",
      text: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.",
    },
    {
      name: "Eleanor Pena (RBT)",
      date: "March 5, 2026",
      text: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.",
    },
    {
      name: "Dr. Devon Lane (BCBA)",
      date: "February 28, 2026",
      text: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.",
    },
  ];

  const handleOpenDetails = (program) => {
    setSelectedProgram(program);
    setView("details");
    window.scrollTo(0, 0);
  };

  const toggleComplete = (index) => {
    setCompletedPrograms((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (view === "details" && selectedProgram) {
    return <ProgramDetailsView program={selectedProgram} onBack={() => setView("list")} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Assigned Programs Section */}
      <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border bsm:order-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Assigned programs
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedPrograms.map((program, i) => {
            const isCompleted = completedPrograms.includes(i);
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-[#F3F4F6] hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <h4 className="text-xl font-bold text-[#76121F] mb-2 leading-tight group-hover:text-[#800000] transition-colors">
                  {program.title}
                </h4>

                <span className="bg-[#FAF6F7] text-[#800000] px-3 py-1 rounded-full text-xs font-bold w-fit mb-4 border border-[#FEE2E2]">
                  {program.category}
                </span>

                <p className="text-sm text-[#6B7280] mb-6 flex-grow leading-relaxed line-clamp-3">
                  {program.description}
                </p>

                <div className="text-xs text-[#B45309] font-bold mb-6 flex items-center gap-1.5 opacity-80">
                  <ClipboardList size={14} /> {program.level}
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleOpenDetails(program)}
                    className="flex-1 border border-[#800000] text-[#800000] py-2.5 rounded-xl text-sm font-bold hover:bg-[#800000] hover:text-white transition-all active:scale-95"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => toggleComplete(i)}
                    className={`flex-1 ${
                      isCompleted ? "bg-green-600 text-white" : "bg-[#FFBB03] text-black"
                    } py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95`}
                  >
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Notes Section */}
      <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">All Notes</h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="space-y-4">
          {allNotes.map((note, i) => (
            <div
              key={i}
              className="bg-[#FAF6F7] px-8 py-6 rounded-2xl border-l-[6px] border-[#800000] transition-all hover:bg-white hover:shadow-sm cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#800000] group-hover:text-[#B91C1C] transition-colors">
                    {note.name}
                  </h4>
                  <span className="text-[#9CA3AF] text-sm font-medium">
                    {note.date}
                  </span>
                </div>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-4xl">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
