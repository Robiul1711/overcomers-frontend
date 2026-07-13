import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useMutationClient from "@/hooks/useMutationClient";

const ProgramsTab = ({ programsDataset, isLoading, onAddNote }) => {
  const [view, setView] = useState("list"); // 'list' or 'details'
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [tasksState, setTasksState] = useState([]);
  const { id: caseId } = useParams();

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setTasksState(program.tasks || []);
    setView("details");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedProgram(null);
    setTasksState([]);
  };

  const { mutate: trackTask } = useMutationClient({
    url: (params) => `/employee/cases/${params.caseId}/programs/tasks/${params.taskId}/track`,
    method: "post",
    invalidateKeys: [
      ["employeeCaseDetails", caseId],
      ["employeeCasePrograms"],
    ],
    successMessage: "Task updated successfully",
  });

  const handleAction = (index, type) => {
    const task = tasksState[index];
    if (!task) return;

    // Optimistically update local state
    const nextTasks = [...tasksState];
    const updatedTask = { ...task };
    updatedTask.trials = (updatedTask.trials || 0) + 1;
    if (type === "yes") {
      updatedTask.correct = (updatedTask.correct || 0) + 1;
    } else {
      updatedTask.incorrect = (updatedTask.incorrect || 0) + 1;
    }
    nextTasks[index] = updatedTask;
    setTasksState(nextTasks);

    // Call API
    trackTask(
      {
        id: { caseId: caseId, taskId: task.id },
        data: { status: type === "yes" ? "correct" : "incorrect" },
      },
      {
        onSuccess: (res) => {
          const apiData = res?.data?.data;
          if (apiData) {
            setTasksState((prev) => {
              const next = [...prev];
              next[index] = {
                ...next[index],
                trials: apiData.trials,
                correct: apiData.correct,
                incorrect: apiData.incorrect,
              };
              return next;
            });
          }
        },
      },
    );
  };

  if (view === "details" && selectedProgram) {
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
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight">
           Client Programs
            </h2>
          </div>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Program Hero Section */}
          <div className="border-b border-gray-100 pb-8">
            <h3 className="text-[24px] md:text-[28px] font-bold text-[#3A331E] mb-4">
              {selectedProgram.title}
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <span className="px-5 py-1.5 bg-[#FAF6F7] text-[#76121F] font-bold text-[11px] rounded-full uppercase tracking-wider">
                  {selectedProgram.category}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-[22px] font-bold text-[#800000]">
                  Description
                </h4>
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
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#800000]">
                Task List
              </h3>
              <button
                onClick={() => onAddNote(selectedProgram.id)}
                className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[14px] px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Add Note
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tasksState?.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <h5 className="text-[16px] font-bold text-[#3A331E] mb-6 font-poppins">
                    {task.title}
                  </h5>

                  <div className="grid grid-cols-3 gap-3 ">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">
                        Trials
                      </label>
                      <div className="bg-[#F4F4F4] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px]">
                        {task?.trials || 0}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">
                        Correct
                      </label>
                      <div className="bg-[#E5F9ED] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px] border border-[#10B981]/10">
                        {task?.correct || 0}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#3A331E] ml-1">
                        Incorrect
                      </label>
                      <div className="bg-[#FAF6F7] rounded-xl py-3 px-2 text-center text-[#3A331E] font-bold text-[16px] border border-[#76121F]/10">
                        {task?.incorrect || 0}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => handleAction(index, "yes")}
                      className="flex-1 bg-[#10B981] text-white py-2.5 rounded-xl text-[14px] font-bold shadow-sm hover:bg-[#0E9F6E] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <span className="text-[16px]">✓</span> Yes
                    </button>
                    <button
                      onClick={() => handleAction(index, "no")}
                      className="flex-1 border-2 border-[#FF5C5C] text-[#FF5C5C] py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#FF5C5C] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
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
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">
          Programs
        </h2>
        <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#3A331E]">
          Assigned programs
        </h3>
        <Link to="/dashboard/programs" className="bg-[#76121F] hover:bg-[#600000] text-white font-bold text-[14px] px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
          View All Programs
        </Link>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programsDataset?.map((program, index) => {

          return (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm flex flex-col hover:shadow-md transition-all duration-300"
            >
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
                  className={ `capitalize flex-1 py-3 ${program?.status === "active" ? "bg-[#10B981] text-white" : program?.status === "pending" ? "bg-[#FFBB03] text-white" : "bg-[#76121F] text-white"} font-bold text-[13px] rounded-xl text-center shadow-sm select-none`}
                >
                  {program?.status}
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
