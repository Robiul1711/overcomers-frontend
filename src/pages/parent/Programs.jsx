import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  X,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTaskResult } from "../../redux/slices/programsSlice";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const ProgramDetailsView = ({ program, onBack }) => {
  const dispatch = useDispatch();
  const [isSavedAll, setIsSavedAll] = useState(false);
  const [taskData, setTaskData] = useState(
    (program.tasks || []).map((task) => ({
      id: task.id,
      title: typeof task === "string" ? task : task.title,
      trials: task.trials || 0,
      correct: task.correct || 0,
      incorrect: task.incorrect || 0,
      is_completed: task.is_completed || 0,
      undoAction: null,
    }))
  );

  const { mutate: trackTask } = useMutationClient({
    url: (id) => `/parent/programs/tasks/${id}/track`,
    method: "post",
    invalidateKeys: [["parentPrograms"]],
    successMessage: "Task updated!",
  });

  const pendingTimersRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(pendingTimersRef.current).forEach((timerObj) => {
        if (timerObj?.timerId) clearTimeout(timerObj.timerId);
      });
    };
  }, []);

  const handleAction = (index, type) => {
    let taskId;
    setTaskData((prev) => {
      const next = [...prev];
      const task = { ...next[index] };
      taskId = task.id;
      
      if (pendingTimersRef.current[taskId]) {
        clearTimeout(pendingTimersRef.current[taskId].timerId);
        delete pendingTimersRef.current[taskId];
      }

      task.trials += 1;
      if (type === "yes") {
        task.correct += 1;
      } else {
        task.incorrect += 1;
      }   
      task.undoAction = {
        type,
        expiresAt: Date.now() + 3000,
      };
      
      next[index] = task;
      return next;
    });

    if (taskId) {
      const timerId = setTimeout(() => {
        setTaskData((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, undoAction: null } : t))
        );

        trackTask({
          id: taskId,
          data: { status: type === "yes" ? "correct" : "incorrect" },
        }, {
          onSuccess: (res) => {
            const apiData = res?.data?.data;
            if (apiData) {
              setTaskData((prev) => {
                const next = [...prev];
                const itemIndex = next.findIndex((t) => t.id === taskId);
                if (itemIndex !== -1) {
                  next[itemIndex] = {
                    ...next[itemIndex],
                    trials: apiData.trials,
                    correct: apiData.correct,
                    incorrect: apiData.incorrect,
                  };
                }
                return next;
              });
            }
          },
        });

        delete pendingTimersRef.current[taskId];
      }, 3000);

      pendingTimersRef.current[taskId] = { timerId, type };
    }
  };

  const handleUndo = (index) => {
    let taskId;
    setTaskData((prev) => {
      const next = [...prev];
      const task = { ...next[index] };
      
      if (!task.undoAction) return prev;
      taskId = task.id;

      if (pendingTimersRef.current[taskId]) {
        clearTimeout(pendingTimersRef.current[taskId].timerId);
        delete pendingTimersRef.current[taskId];
      }

      task.trials = Math.max(0, task.trials - 1);
      if (task.undoAction.type === "yes") {
        task.correct = Math.max(0, task.correct - 1);
      } else {
        task.incorrect = Math.max(0, task.incorrect - 1);
      }
      
      task.undoAction = null;
      next[index] = task;
      return next;
    });
  };

  const [ticker, setTicker] = useState(0);

  // Background timer to trigger re-render for 3, 2, 1s countdown display
  useEffect(() => {
    const interval = setInterval(() => {
      if (taskData?.some((t) => t.undoAction)) {
        setTicker((t) => t + 1);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [taskData]);

  // Clear "Locked" state after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setTaskData(prev => prev.map(t => ({ ...t, isLocked: false })));
    }, 1000);
    return () => clearTimeout(timer);
  }, [taskData.some(t => t.isLocked)]);

  // Sync data to Redux for global charts
  useEffect(() => {
    dispatch(updateTaskResult({ programTitle: program.title, tasks: taskData }));
  }, [taskData, dispatch, program.title]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-10">


      <div className="mb-4 md:mb-6 flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-1.5 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <h3 className="text-xl md:text-2xl font-bold text-[#3A331E]">
          {program.title}
        </h3>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#FAF8F8] border border-[#F3F4F6] rounded-[2.5rem] md:p-10 p-4 shadow-sm">
        {/* Category & Description */}
        <div className="mb-6 md:mb-10">
          <span className="bg-[#FAF6F7] text-[#800000] px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold border border-[#FEE2E2] inline-block mb-3 md:mb-4">
            {program.category}
          </span>
          <h4 className="text-xl md:text-2xl font-bold text-[#800000] mb-2 md:mb-3">Description</h4>
          <p className="text-[#6B7280] leading-relaxed mb-3 md:mb-4 text-base md:text-lg">
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
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {taskData.map((task, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] p-5 md:p-8 border border-gray-100 shadow-sm transition-all"
            >
              <h5 className="text-base md:text-lg font-bold text-[#3A331E] mb-5 md:mb-6 pb-4 border-b border-gray-100">
                Task {i + 1} - {task.title}
              </h5>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Trials
                  </label>
                  <input
                    type="number"
                    value={task.trials}
                    readOnly
                    disabled={task.isLocked || task.undoAction}
                    className={`w-full ${task.isLocked ? "bg-gray-100 text-gray-400" : "bg-[#F3F4F6] text-[#374151]"} rounded-xl py-1 sm:py-2 md:py-3 text-center font-bold text-lg outline-none transition-all cursor-default`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Correct
                  </label>
                  <input
                    type="number"
                    value={task.correct}
                    readOnly
                    disabled={task.isLocked || task.undoAction}
                    className={`w-full ${task.isLocked ? "bg-gray-50 text-gray-400" : "bg-[#F0FDF4] border border-[#DCFCE7] text-green-700"} rounded-xl py-1 sm:py-2 md:py-3 text-center font-bold text-lg outline-none transition-all cursor-default`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3A331E] mb-2 text-center uppercase tracking-wider opacity-60">
                    Incorrect
                  </label>
                  <input
                    type="number"
                    value={task.incorrect}
                    readOnly
                    disabled={task.isLocked || task.undoAction}
                    className={`w-full ${task.isLocked ? "bg-gray-50 text-gray-400" : "bg-[#FEF2F2] border border-[#FEE2E2] text-red-700"} rounded-xl py-1 sm:py-2 md:py-3 text-center font-bold text-lg outline-none transition-all cursor-default`}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {task.isLocked ? (
                  <div className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-200">
                    <X size={18} />
                    Finalized & Locked
                  </div>
                ) : task.undoAction ? (
                  <button
                    onClick={() => handleUndo(i)}
                    className="flex-1 bg-[#4B5563] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#374151] transition-all animate-in fade-in zoom-in duration-300"
                  >
                    <RotateCcw size={18} />
                    Undo Save ({Math.max(0, Math.ceil((task.undoAction.expiresAt - Date.now()) / 1000))}s)
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAction(i, "yes")}
                      className="flex-1 bg-[#10B981] text-white py-1 sm:py-2 md:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#059669] transition-all active:scale-95"
                    >
                      <span className="text-lg text-white">✓</span> Yes
                    </button>
                    <button
                      onClick={() => handleAction(i, "no")}
                      className="flex-1 border-2 border-[#FEE2E2] text-[#EF4444] py-1 sm:py-2 md:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#FEF2F2] transition-all active:scale-95"
                    >
                      <span className="text-lg">✕</span> No
                    </button>
                  </>
                )}
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
  const [view, setView] = useState("list");

  const { data: programsData, isLoading } = useClient({
    queryKey: ["parentPrograms"],
    url: "/parent/my-programs",
  });

  const programs = programsData?.data?.programs || [];
  const programNotes = programsData?.data?.program_notes || [];

  const handleOpenDetails = (program) => {
    setSelectedProgram(program);
    setView("details");
    window.scrollTo(0, 0);
  };

  if (view === "details" && selectedProgram) {
    return <ProgramDetailsView program={selectedProgram} onBack={() => setView("list")} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#F3F4F6]">
          <div className="mb-8 relative w-fit">
            <SkeletonBox className="h-8 w-56" />
            <SkeletonBox className="h-1 w-full bg-[#FFBB03]/30 rounded-full mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-[#F3F4F6] flex flex-col h-full">
                <SkeletonBox className="h-6 w-44 mb-3" />
                <SkeletonBox className="h-5 w-24 rounded-full mb-4" />
                <div className="space-y-2 mb-6 flex-grow">
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-5/6" />
                  <SkeletonBox className="h-4 w-3/4" />
                </div>
                <SkeletonBox className="h-4 w-36 mb-6" />
                <SkeletonBox className="h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Notes Skeleton */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#F3F4F6]">
          <div className="mb-8 relative w-fit">
            <SkeletonBox className="h-8 w-32" />
            <SkeletonBox className="h-1 w-full bg-[#FFBB03]/30 rounded-full mt-2" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border-l-[6px] border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <SkeletonBox className="h-5 w-44" />
                </div>
                <div className="space-y-2">
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
          {programs.map((program, i) => (
            <div
              key={program.id || i}
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
          {programNotes.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center font-medium">
              No notes available yet.
            </p>
          ) : (
            programNotes.map((note, i) => (
              <div
                key={note.id || i}
                className="bg-[#FAF6F7] px-8 py-6 rounded-2xl border-l-[6px] border-[#800000] transition-all hover:bg-white hover:shadow-sm group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-[#800000] group-hover:text-[#B91C1C] transition-colors">
                      {note.employee_name}
                    </h4>
                    <span className="text-xs font-semibold text-[#800000]/60 bg-[#800000]/5 px-2 py-0.5 rounded-full">
                      {note.role}
                    </span>
                    <span className="text-[#9CA3AF] text-sm font-medium">
                      · {note.program_name}
                    </span>
                    <span className="text-[#9CA3AF] text-sm font-medium ml-auto">
                      {note.date}
                    </span>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-4xl">
                  {note.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
