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

const ProgramDetailModal = ({ isOpen, onClose, program }) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed h-screen inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <h3 className="text-3xl font-bold text-[#3A331E] pr-12">
                {program.title}
              </h3>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
            </div>
            <button
              onClick={onClose}
              className="bg-white border-2 border-[#76121F] text-[#76121F] p-1.5 rounded-full hover:bg-[#76121F] hover:text-white transition-all transform hover:rotate-90 active:scale-95"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="space-y-8 mt-10">
            {/* Category Tag */}
            <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1.5 rounded-full text-sm font-bold border border-[#FEE2E2]">
              {program.category}
            </span>

            {/* Description */}
            <div>
              <h4 className="text-xl font-bold text-[#76121F] my-3">
                Description
              </h4>
              <p className="text-[#6B7280] leading-relaxed">
                {program.longDescription || program.description}
                {program.isSpecial &&
                  " This comprehensive program includes evidence-based strategies and structured interventions designed to support skill development and track progress over time. The program follows ABA principles and is suitable for individualized treatment plans."}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-3 font-medium">
                {program.level}
              </p>
            </div>

            {/* Task List */}
            <div>
              <h4 className="text-xl font-bold text-[#76121F] mb-4">
                Task List
              </h4>
              <div className="space-y-3">
                {(
                  program.tasks || [
                    "Responds to name when called",
                    "Uses simple phrases to communicate needs",
                    "Follows one-step instructions consistently",
                    "Makes eye contact during interactions",
                    "Initiates conversations with peers",
                    "Uses appropriate greetings",
                  ]
                ).map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[#6B7280]"
                  >
                    <span className="font-bold text-[#76121F] min-w-[20px]">
                      {i + 1}.
                    </span>
                    <p className="text-[15px]">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h4 className="text-xl font-bold text-[#76121F] mb-6">
                Additional Information
              </h4>
              <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-3xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                    <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Created By
                    </p>
                    <p className="text-lg font-bold text-[#76121F]">
                      {program.createdBy || "Dr. Eleanor Pena, BCBA"}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                    <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Last Updated
                    </p>
                    <p className="text-lg font-bold text-[#76121F]">
                      {program.lastUpdated || "March 30, 2026"}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                    <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Category
                    </p>
                    <p className="text-lg font-bold text-[#76121F]">
                      {program.category}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                    <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Skill Level
                    </p>
                    <p className="text-lg font-bold text-[#76121F]">
                      {program.skillLevel || "Beginner"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#FFBB03] text-black py-3 rounded-2xl font-bold hover:bg-[#e6a802] transition-colors active:scale-95 shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#76121F] text-white py-3 rounded-2xl font-bold hover:bg-[#600000] transition-colors active:scale-95 shadow-md">
            Assign to Client
          </button>
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assignedPrograms = [
    {
      title: "Communication Skills Development",
      category: "Communication",
      description:
        "Helps improve verbal and non-verbal communication skills that are essential for social development.",
      level: "Beginner · Skill Acquisition",
      isSpecial: true,
      tasks: [
        "Responds to name when called",
        "Uses simple phrases to communicate needs",
        "Follows one-step instructions consistently",
        "Makes eye contact during interactions",
        "Initiates conversations with peers",
        "Uses appropriate greetings",
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

  const handleOpenModal = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Modal */}
      <ProgramDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        program={selectedProgram}
      />

      {/* Assigned Programs Section */}
      <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border bsm:order-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Assigned programs
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedPrograms.map((program, i) => (
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

              <p className="text-sm text-[#6B7280] mb-6 flex-grow leading-relaxed">
                {program.description}
              </p>

              <div className="text-xs text-[#B45309] font-bold mb-6 flex items-center gap-1.5 opacity-80">
                <ClipboardList size={14} /> {program.level}
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleOpenModal(program)}
                  className="flex-1 border border-[#800000] text-[#800000] py-2.5 rounded-xl text-sm font-bold hover:bg-[#800000] hover:text-white transition-all active:scale-95"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleOpenModal(program)}
                  className="flex-1 bg-[#FFBB03] text-black py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Assigned
                </button>
              </div>
            </div>
          ))}
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
