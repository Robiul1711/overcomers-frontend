import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Layers,
  Info,
  Pencil,
  Plus,
  Search,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Download,
  Activity,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import WeeklyCalendar from "@/components/admin/ScheduleComponents/WeeklyCalendar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { formatTimeOnlyWithZone } from "@/utils/timeUtils";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Normalize API statuses to the format WeeklyCalendar expects
const normalizeStatus = (status) => {
  if (!status) return "Upcoming";
  const upper = status.toUpperCase();
  if (upper === "UPCOMING") return "Upcoming";
  if (upper === "IN_PROGRESS" || upper === "IN PROGRESS") return "In Progress";
  if (upper === "COMPLETED") return "Completed";
  return status;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const label = payload[0].payload?.name || payload[0].payload?.task_title || "Success";
    return (
      <div className="bg-[#76121F] text-white p-2 px-4 rounded-xl text-center shadow-lg transform -translate-y-2 relative font-poppins">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#76121F] rotate-45"></div>
        <p className="text-[12px] font-medium relative z-10 leading-tight">
          {label}
        </p>
        <p className="text-[18px] font-bold relative z-10 leading-tight">
          {Math.round(payload[0].value)}%
        </p>
      </div>
    );
  }
  return null;
};

const formatTime = (timeStr) => {
  return formatTimeOnlyWithZone(timeStr);
};

const periodValueMap = {
  "All time": "all_time",
  Month: "month",
  Year: "year",
};

const CaseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isClientExpanded, setIsClientExpanded] = useState(false);
  const [isTherapistExpanded, setIsTherapistExpanded] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [programView, setProgramView] = useState("list"); // 'list' or 'details'
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [tasksState, setTasksState] = useState([]);
  const now = new Date();
  const [taskPerformanceParams, setTaskPerformanceParams] = useState({
    period: "all_time",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    program_id: undefined,
  });
  const [isDownloadingGraph, setIsDownloadingGraph] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Modals state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Library program selection and search/pagination
  const [libraryPage, setLibraryPage] = useState(1);
  const [librarySearch, setLibrarySearch] = useState("");
  const [selectedLibraryProgramId, setSelectedLibraryProgramId] =
    useState(null);

  // Custom program form state
  const [customTitle, setCustomTitle] = useState("");
  const [customCategory, setCustomCategory] = useState("Communication");
  const [otherCategory, setOtherCategory] = useState("");
  const [customType, setCustomType] = useState("Skill Acquisition");
  const [otherType, setOtherType] = useState("");
  const [customLevel, setCustomLevel] = useState("Beginner");
  const [customDescription, setCustomDescription] = useState("");
  const [customTasks, setCustomTasks] = useState([""]);

  const handleTaskChange = (index, value) => {
    const newTasks = [...customTasks];
    newTasks[index] = value;
    setCustomTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = customTasks.filter((_, i) => i !== index);
    setCustomTasks(newTasks.length ? newTasks : [""]);
  };

  // Edit program form state
  const [editProgramId, setEditProgramId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLevel, setEditLevel] = useState("Beginner");
  const [editTasks, setEditTasks] = useState([""]);

  const handleEditTaskChange = (index, value) => {
    const newTasks = [...editTasks];
    newTasks[index] = value;
    setEditTasks(newTasks);
  };

  const handleRemoveEditTask = (index) => {
    const newTasks = editTasks.filter((_, i) => i !== index);
    setEditTasks(newTasks.length ? newTasks : [""]);
  };

  // API Queries & Mutations
  const {
    data: resData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["supervisorCaseDetails", id],
    url: `/supervisor/cases/${id}`,
  });

  const caseDetails = resData?.data;

  // Schedules details query
  const { data: schedulesData, isLoading: isSchedulesLoading } = useClient({
    queryKey: ["supervisorCaseSchedules", id],
    url: `/supervisor/cases/${id}/schedules`,
    enabled: activeTab === "Client Schedule",
  });

  // Programs details query
  const { data: programsData, isLoading: isProgramsLoading } = useClient({
    queryKey: ["supervisorCasePrograms", id],
    url: `/supervisor/cases/${id}/programs`,
    enabled: activeTab === "Programs",
  });

  // Notes details query
  const { data: notesData, isLoading: isNotesLoading } = useClient({
    queryKey: ["supervisorCaseNotes", id],
    url: `/supervisor/cases/${id}/notes`,
    enabled: activeTab === "Notes & Reports",
  });

  // Reports details query
  const { data: reportsData, isLoading: isReportsLoading } = useClient({
    queryKey: ["supervisorCaseReports", id],
    url: `/supervisor/cases/${id}/reports`,
    enabled: activeTab === "Notes & Reports",
  });

  // Session notes details query
  const {
    data: sessionNotesData,
    isLoading: isSessionNotesLoading,
    isError: isSessionNotesError,
  } = useClient({
    queryKey: ["supervisorCaseSessionNotes", id],
    url: `/supervisor/cases/${id}/session-notes`,
    enabled: activeTab === "Notes & Reports",
  });

  // Task performance details query
  const { data: taskPerformanceData, isLoading: isPerformanceLoading } =
    useClient({
      queryKey: ["supervisorCasePerformance", id, taskPerformanceParams],
      url: `/supervisor/cases/${id}/task-performance`,
      params: taskPerformanceParams,
      enabled: activeTab === "Notes & Reports",
    });

  const { data: libraryData, isLoading: isLoadingLibrary } = useClient({
    queryKey: ["supervisorLibraryPrograms", libraryPage],
    url: "/supervisor/library-programs",
    params: { page: libraryPage },
    enabled: isAssignModalOpen,
  });

  const libraryPrograms = libraryData?.data?.data || [];
  const libraryPagination = libraryData?.data || {};

  const { mutate: assignProgram, isPending: isAssigning } = useMutationClient({
    url: `/supervisor/cases/${id}/programs/assign`,
    method: "post",
    invalidateKeys: [
      ["supervisorCaseDetails", id],
      ["supervisorCasePrograms", id],
    ],
    successMessage: "Program assigned successfully",
  });

  const { mutate: createCustomProgram, isPending: isCreatingCustom } =
    useMutationClient({
      url: `/supervisor/cases/${id}/programs/custom`,
      method: "post",
      invalidateKeys: [
        ["supervisorCaseDetails", id],
        ["supervisorCasePrograms", id],
      ],
      successMessage: "Custom program created successfully",
    });

  const { mutate: updateProgram, isPending: isUpdatingProgram } =
    useMutationClient({
      url: (programId) => `/supervisor/programs/${programId}`,
      method: "put",
      invalidateKeys: [
        ["supervisorCaseDetails", id],
        ["supervisorCasePrograms", id],
      ],
      successMessage: "Program updated successfully",
    });

  const { mutate: trackTask } = useMutationClient({
    url: (params) => `/supervisor/cases/${params.caseId}/programs/tasks/${params.taskId}/track`,
    method: "post",
    invalidateKeys: [
      ["supervisorCaseDetails", id],
      ["supervisorCasePrograms", id],
    ],
    successMessage: "Task updated successfully",
  });

  const pendingTimersRef = React.useRef({});
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tasksState?.some((t) => t.undoAction)) {
        setTicker((t) => t + 1);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [tasksState]);

  useEffect(() => {
    return () => {
      Object.values(pendingTimersRef.current).forEach((timerObj) => {
        if (timerObj?.timerId) clearTimeout(timerObj.timerId);
      });
    };
  }, []);

  const handleAction = (index, type) => {
    const task = tasksState[index];
    if (!task) return;

    if (pendingTimersRef.current[task.id]) {
      clearTimeout(pendingTimersRef.current[task.id].timerId);
      delete pendingTimersRef.current[task.id];
    }

    // Optimistically update local state
    const nextTasks = [...tasksState];
    const updatedTask = { ...task };
    updatedTask.trials = (updatedTask.trials || 0) + 1;
    if (type === "yes") {
      updatedTask.correct = (updatedTask.correct || 0) + 1;
    } else {
      updatedTask.incorrect = (updatedTask.incorrect || 0) + 1;
    }
    updatedTask.undoAction = {
      type,
      expiresAt: Date.now() + 3000,
    };
    nextTasks[index] = updatedTask;
    setTasksState(nextTasks);

    // Delay API call by 3 seconds (after undo button expires)
    const timerId = setTimeout(() => {
      setTasksState((prev) => {
        if (!prev) return prev;
        return prev.map((t) => (t.id === task.id ? { ...t, undoAction: null } : t));
      });

      trackTask(
        {
          id: { caseId: id, taskId: task.id },
          data: { status: type === "yes" ? "correct" : "incorrect" },
        },
        {
          onSuccess: (res) => {
            const apiData = res?.data?.data;
            if (apiData) {
              setTasksState((prev) => {
                if (!prev) return prev;
                return prev.map((t) =>
                  t.id === task.id
                    ? {
                        ...t,
                        trials: apiData.trials,
                        correct: apiData.correct,
                        incorrect: apiData.incorrect,
                      }
                    : t
                );
              });
            }
          },
        }
      );

      delete pendingTimersRef.current[task.id];
    }, 3000);

    pendingTimersRef.current[task.id] = { timerId, type };
  };

  const handleUndo = (index) => {
    const task = tasksState[index];
    if (!task || !task.undoAction) return;

    if (pendingTimersRef.current[task.id]) {
      clearTimeout(pendingTimersRef.current[task.id].timerId);
      delete pendingTimersRef.current[task.id];
    }

    const prevType = task.undoAction.type;
    const nextTasks = [...tasksState];
    const updatedTask = { ...task };

    updatedTask.trials = Math.max(0, (updatedTask.trials || 0) - 1);
    if (prevType === "yes") {
      updatedTask.correct = Math.max(0, (updatedTask.correct || 0) - 1);
    } else {
      updatedTask.incorrect = Math.max(0, (updatedTask.incorrect || 0) - 1);
    }
    updatedTask.undoAction = null;
    nextTasks[index] = updatedTask;
    setTasksState(nextTasks);
  };

  const employeeId = caseDetails?.employee_id || caseDetails?.employee?.id;

  const handleAssignSubmit = () => {
    if (!selectedLibraryProgramId || !employeeId) return;
    assignProgram(
      {
        data: {
          library_program_id: selectedLibraryProgramId.toString(),
          employee_id: employeeId.toString(),
        },
      },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
          setSelectedLibraryProgramId(null);
        },
      },
    );
  };

  const handleCustomSubmit = () => {
    if (!customTitle.trim() || !employeeId) return;

    const finalCategory =
      customCategory === "Other" ? otherCategory : customCategory;
    const finalType = customType === "Other" ? otherType : customType;
    const filteredTasks = customTasks
      .map((t) => t.trim())
      .filter((t) => t !== "");

    createCustomProgram(
      {
        data: {
          employee_id: employeeId.toString(),
          title: customTitle,
          category: finalCategory,
          type: finalType,
          level: customLevel,
          description: customDescription,
          tasks: filteredTasks,
        },
      },
      {
        onSuccess: () => {
          setIsCustomModalOpen(false);
          setCustomTitle("");
          setCustomCategory("Communication");
          setOtherCategory("");
          setCustomType("Skill Acquisition");
          setOtherType("");
          setCustomLevel("Beginner");
          setCustomDescription("");
          setCustomTasks([""]);
        },
      },
    );
  };

  const handleOpenEditModal = (program) => {
    setEditProgramId(program.id);
    setEditTitle(program.title || "");
    setEditDescription(program.description || "");
    setEditLevel(program.level || "Beginner");
    const existingTasks = program.tasks
      ? program.tasks.map((t) => t.title || "")
      : [];
    setEditTasks(existingTasks.length ? existingTasks : [""]);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editTitle.trim()) return;
    const filteredTasks = editTasks
      .map((t) => t.trim())
      .filter((t) => t !== "");
    updateProgram(
      {
        id: editProgramId,
        data: {
          title: editTitle,
          description: editDescription,
          level: editLevel,
          tasks: filteredTasks,
        },
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditProgramId(null);
          setEditTitle("");
          setEditDescription("");
          setEditLevel("Beginner");
          setEditTasks([""]);
        },
      },
    );
  };

  // Local filtering for library search
  const filteredLibraryPrograms = libraryPrograms.filter(
    (prog) =>
      prog.title?.toLowerCase().includes(librarySearch.toLowerCase()) ||
      prog.category?.toLowerCase().includes(librarySearch.toLowerCase()) ||
      prog.description?.toLowerCase().includes(librarySearch.toLowerCase()),
  );

  // Extract fields from new or old structure
  const clientInfo = caseDetails?.client_information || {};
  const serviceDetails = caseDetails?.service_details || {};

  // Case meta information
  const caseNumber = caseDetails?.case_number || "N/A";
  const caseStatus = clientInfo?.case_status || caseDetails?.status || "Active";
  const clientName =
    caseDetails?.client_name ||
    clientInfo?.client_name ||
    caseDetails?.parent?.name ||
    "N/A";
  const centerType =
    caseDetails?.center_type ||
    caseDetails?.service?.name ||
    "Residential Center";
  const authValidThru = caseDetails?.auth_valid_thru || "Aug 2026";

  // Client info tiles
  const clientInfoName =
    clientInfo?.client_name ||
    caseDetails?.parent?.name ||
    caseDetails?.client_name ||
    "N/A";
  const clientInfoDob = clientInfo?.date_of_birth || "N/A";
  const clientInfoLocation =
    clientInfo?.service_location || caseDetails?.location || "N/A";
  const clientInfoAssignedDate =
    clientInfo?.assigned_date || caseDetails?.start_date || "N/A";

  // Service details professional
  const assignedProfessionals = serviceDetails?.assigned_professionals || [];
  const mainProfessional = assignedProfessionals[0] || {
    assigned_therapist: caseDetails?.employee?.name || "Unassigned",
    role: "Therapist",
    phone: caseDetails?.employee?.phone_number || "N/A",
    email: caseDetails?.employee?.email || "N/A",
  };

  const therapistName = mainProfessional.assigned_therapist;
  const sessionFrequency =
    serviceDetails?.session_frequency || caseDetails?.frequency || "1";
  const serviceStartDate =
    serviceDetails?.service_start_date || caseDetails?.start_date || "N/A";
  const sessionTime =
    serviceDetails?.session_time ||
    (caseDetails?.session_start_time
      ? `${caseDetails.session_start_time} - ${caseDetails.session_end_time}`
      : "1:00 AM - 12:00 PM");

  const programs = programsData?.data || caseDetails?.programs || [];

  // Parse overall performance details
  const overallPerformance =
    taskPerformanceData?.data?.overall_task_performance;
  const rawChartData = overallPerformance?.chart_data || [];
  const availablePrograms = overallPerformance?.available_programs || [];
  const taskResponds = taskPerformanceData?.data?.task_responds || [];

  // Fallback mock chart data if performance API is empty or not implemented
  const mockChartData = [
    {
      task_label: "Eye Contact",
      task_title: "Eye Contact",
      success_rate: 65,
      trials: 10,
      correct: 6,
      incorrect: 4,
    },
    {
      task_label: "Compliance",
      task_title: "Seat Compliance",
      success_rate: 80,
      trials: 8,
      correct: 6,
      incorrect: 2,
    },
    {
      task_label: "Tact Actions",
      task_title: "Tact Actions",
      success_rate: 45,
      trials: 12,
      correct: 5,
      incorrect: 7,
    },
    {
      task_label: "Imitation",
      task_title: "Imitation",
      success_rate: 90,
      trials: 10,
      correct: 9,
      incorrect: 1,
    },
  ];

  const chartData = rawChartData.length > 0 ? rawChartData : mockChartData;

  const dynamicChartData = useMemo(() => {
    const hasHistory = chartData.some(
      (item) => Array.isArray(item.history) && item.history.length > 0
    );

    if (hasHistory) {
      const dateMap = {};
      chartData.forEach((item) => {
        if (Array.isArray(item.history)) {
          item.history.forEach((hist) => {
            const d = hist.date;
            if (!dateMap[d]) {
              dateMap[d] = {
                date: d,
                date_formatted: hist.date_formatted || d,
                trials: 0,
                correct: 0,
                incorrect: 0,
              };
            }
            dateMap[d].trials += hist.trials || 0;
            dateMap[d].correct += hist.correct || 0;
            dateMap[d].incorrect += hist.incorrect || 0;
          });
        }
      });

      const sortedDates = Object.keys(dateMap).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      return sortedDates.map((d) => {
        const dayData = dateMap[d];
        const successRate =
          dayData.trials > 0 ? (dayData.correct / dayData.trials) * 100 : 0;
        return {
          name: dayData.date_formatted,
          date: dayData.date,
          value: Math.round(successRate),
          trials: dayData.trials,
          correct: dayData.correct,
          incorrect: dayData.incorrect,
        };
      });
    }

    return chartData.map((item) => ({
      name: item.task_label,
      task_title: item.task_title,
      value: Math.round(item.success_rate),
      trials: item.trials,
      correct: item.correct,
      incorrect: item.incorrect,
    }));
  }, [chartData]);

  const generateWeekDays = (offset) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + offset * 7);
    const dayOfWeek = weekStart.getDay();
    weekStart.setDate(weekStart.getDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dayIdx = date.getDay();
      days.push({
        day: DAY_ABBR[dayIdx],
        dayFull: DAY_NAMES[dayIdx],
        date: date.getDate(),
        dateObj: date,
        month: MONTH_NAMES[date.getMonth()],
        year: date.getFullYear(),
        isToday: date.toDateString() === new Date().toDateString(),
        sessions: [],
      });
    }
    return days;
  };

  const weeklySessions = useMemo(() => {
    const weekDays = generateWeekDays(weekOffset);
    const scheduleData = schedulesData?.data || caseDetails?.schedules;
    if (!scheduleData) return weekDays;

    scheduleData.forEach((item) => {
      const itemDate = new Date(item.timestamp * 1000 || item.date);
      const matchingDay = weekDays.find(
        (d) =>
          d.dateObj.getFullYear() === itemDate.getFullYear() &&
          d.dateObj.getMonth() === itemDate.getMonth() &&
          d.dateObj.getDate() === itemDate.getDate(),
      );
      if (matchingDay) {
        matchingDay.sessions.push({
          id: item.id,
          client: item.client_name,
          time: item.time_formatted || item.time,
          type: item.session_type,
          room: item.location,
          status: normalizeStatus(item.status),
        });
      }
    });

    return weekDays;
  }, [schedulesData, caseDetails, weekOffset]);

  const weekLabel = useMemo(() => {
    if (!weeklySessions || weeklySessions.length === 0) return "";
    const first = weeklySessions[0];
    const last = weeklySessions[weeklySessions.length - 1];
    if (first.month === last.month) {
      return `${first.month} ${first.year}`;
    }
    return `${first.month} - ${last.month} ${first.year}`;
  }, [weeklySessions]);

  const handlePeriodChange = (period) => {
    setTaskPerformanceParams((prev) => ({
      ...prev,
      period,
    }));
  };

  const handleProgramChange = (programId) => {
    setTaskPerformanceParams((prev) => ({
      ...prev,
      program_id: programId || undefined,
    }));
  };

  const handleDownloadGraph = async () => {
    const chartElement = document.getElementById("overall-performance-chart-container-supervisor");
    if (!chartElement) {
      toast.error("Performance chart element not found.");
      return;
    }

    setIsDownloadingGraph(true);
    try {
      const canvas = await html2canvas(chartElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: chartElement.offsetWidth,
        height: chartElement.offsetHeight,
        onclone: (clonedDoc) => {
          // Remove stylesheet links to prevent html2canvas parsing oklch from Tailwind v4
          const stylesheets = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          stylesheets.forEach(el => el.remove());

          // Replace oklch in inline style tags
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach(style => {
            try {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, "rgb(118, 18, 31)");
            } catch (e) {}
          });

          const clonedElement = clonedDoc.getElementById("overall-performance-chart-container-supervisor");
          if (clonedElement) {
            clonedElement.style.width = `${chartElement.offsetWidth}px`;
            clonedElement.style.height = `${chartElement.offsetHeight}px`;
            clonedElement.style.backgroundColor = "#ffffff";
            
            // Clean inline oklch styles on all children
            const allElements = clonedElement.getElementsByTagName("*");
            for (let el of allElements) {
              const styleAttr = el.getAttribute("style");
              if (styleAttr && styleAttr.includes("oklch")) {
                el.setAttribute("style", styleAttr.replace(/oklch\([^)]+\)/g, "rgb(118, 18, 31)"));
              }
            }

            const svgs = clonedElement.getElementsByTagName("svg");
            for (let svg of svgs) {
              svg.setAttribute("width", chartElement.offsetWidth.toString());
              svg.setAttribute("height", chartElement.offsetHeight.toString());
              svg.style.width = `${chartElement.offsetWidth}px`;
              svg.style.height = `${chartElement.offsetHeight}px`;
            }
          }
        }
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("l", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(118, 18, 31);
      pdf.rect(0, 0, pageWidth, 20, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("OVERALL TASK PERFORMANCE REPORT", 15, 13);

      pdf.setTextColor(60, 60, 60);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      
      pdf.text(`Client Name: ${clientName || "N/A"}`, 15, 32);
      
      const selectedProg = availablePrograms.find(p => p.id === selectedProgramId);
      pdf.text(`Program/Task: ${selectedProg ? selectedProg.name : "All Programs"}`, 15, 40);
      
      const periodLabel = activePeriod === "month" ? "Month" : activePeriod === "year" ? "Year" : "All Time";
      pdf.text(`Period: ${periodLabel}`, 15, 48);
      
      const todayStr = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      pdf.text(`Report Date: ${todayStr}`, 15, 56);

      pdf.setDrawColor(220, 220, 220);
      pdf.line(15, 62, pageWidth - 15, 62);

      const imgWidth = pageWidth - 30;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 15, 68, imgWidth, Math.min(imgHeight, pageHeight - 80));

      pdf.save(`Performance_Report_${(clientName || "Client").replace(/\s+/g, "_")}.pdf`);
      toast.success("Performance report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading graph:", error);
      toast.error(`Failed to download report: ${error.message || error}`);
    } finally {
      setIsDownloadingGraph(false);
    }
  };

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download file:", err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getLevelStyles = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-teal-50 text-teal-600 border-teal-100";
      case "intermediate":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "advanced":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const selectedProgramId = taskPerformanceParams?.program_id;
  const activePeriod = taskPerformanceParams?.period || "all_time";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-Primary"></div>
      </div>
    );
  }

  if (isError || !caseDetails) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 font-poppins">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-500 mt-1">
          Failed to load case details. Please try again later.
        </p>
        <Link
          to="/supervisor-dashboard/cases"
          className="mt-4 inline-flex items-center gap-2 text-Secondary hover:underline font-bold"
        >
          <ArrowLeft size={16} /> Back to Cases
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins text-Third w-full">
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <Link
          to="/supervisor-dashboard/cases"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-Secondary font-semibold text-sm transition-colors w-max"
        >
          <ArrowLeft size={18} /> Back to Managed Cases
        </Link>

        {/* HERO BANNER SECTION (Dark Burgundy Theme) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#76121F] to-[#540A13] text-white p-6 md:p-8 rounded-3xl shadow-lg border border-[#76121F]/10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Case Number Badge */}
            <span className="px-3.5 py-1 text-xs font-bold bg-white/10 rounded-full border border-white/15 tracking-wide text-white/95">
              {caseNumber}
            </span>

            {/* Case Active status badge */}
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-emerald-500/25 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Case {caseStatus}
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-poppins leading-none">
              {clientName}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Center Type Badge */}
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8E222D] text-[#FFDB9F] text-xs font-semibold rounded-full border border-[#A73D47]">
              <MapPin size={13} className="shrink-0" />
              {centerType}
            </span>

            {/* Auth validity badge */}
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8E222D] text-[#FFDB9F] text-xs font-semibold rounded-full border border-[#A73D47]">
              <Calendar size={13} className="shrink-0" />
              {authValidThru}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-2">
        <div className="flex items-center border-b border-gray-100 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
          <div className="flex items-center min-w-max gap-2">
            {[
              { id: "Profile", label: "Profile", icon: <User size={18} /> },
              {
                id: "Client Schedule",
                label: "Client Schedule",
                icon: <Calendar size={18} />,
              },
              { id: "Programs", label: "Programs", icon: <Layers size={18} /> },
              {
                id: "Notes & Reports",
                label: "Notes & Reports",
                icon: <FileText size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 md:px-8 py-4 font-bold text-[14px] transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#76121F] border-b-4 border-[#76121F] translate-y-[1px]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="mt-6">
          {/* PROFILE TAB */}
          {activeTab === "Profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Client Information */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-Third pb-3 border-b-[3px] border-[#E4A220] tracking-tight font-poppins">
                    Client Information
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
           

                  {/* Collapsible details for client info */}
                  {isClientExpanded && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-gray-100 animate-in fade-in duration-200">
                      {clientInfo.child_name && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Child Name
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.child_name}
                          </span>
                        </div>
                      )}

                      {clientInfo.child_dob && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Child DOB
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.child_dob}
                          </span>
                        </div>
                      )}

                      {clientInfo.age !== undefined && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Age
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.age} years
                          </span>
                        </div>
                      )}

                      {clientInfo.relationship && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Relationship
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.relationship}
                          </span>
                        </div>
                      )}

                      {clientInfo.phone_number && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Phone Number
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.phone_number}
                          </span>
                        </div>
                      )}

                      {clientInfo.email && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Email Address
                          </span>
                          <span
                            className="text-sm font-bold text-[#76121F] truncate"
                            title={clientInfo.email}
                          >
                            {clientInfo.email}
                          </span>
                        </div>
                      )}

                      {clientInfo.primary_diagnosis && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Primary Diagnosis
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.primary_diagnosis}
                          </span>
                        </div>
                      )}

                      {clientInfo.school_name && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            School Name
                          </span>
                          <span className="text-sm font-bold text-[#76121F] truncate">
                            {clientInfo.school_name}
                          </span>
                        </div>
                      )}

                      {clientInfo.school_location && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            School Location
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.school_location}
                          </span>
                        </div>
                      )}

                      {clientInfo.address && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-1">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Address
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.address}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Client Name
                      </span>
                      <span className="text-sm font-bold text-[#76121F] truncate">
                        {clientInfoName}
                      </span>
                    </div>

                    {/* Date Of Birth */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Date Of Birth
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {clientInfoDob}
                      </span>
                    </div>

                    {/* Service Location */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Service Location
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {clientInfoLocation}
                      </span>
                    </div>

                    {/* Assigned Date */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Assigned Date
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {clientInfoAssignedDate}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsClientExpanded(!isClientExpanded)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76121F] hover:text-[#540A13] mt-2 self-start transition-all active:scale-95 duration-150"
                  >
                    {isClientExpanded ? (
                      <>
                        View Less <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        View More <ExternalLink size={12} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: Service Details */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-Third pb-3 border-b-[3px] border-[#E4A220] tracking-tight font-poppins">
                    Service Details
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Therapist */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                          Therapist
                        </span>
                        <button
                          onClick={() =>
                            setIsTherapistExpanded(!isTherapistExpanded)
                          }
                          className="text-[10px] font-extrabold text-[#76121F] hover:underline flex items-center gap-0.5"
                        >
                          {isTherapistExpanded ? "View Less" : "View More"}{" "}
                          <ExternalLink size={10} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#76121F] mt-1">
                        {therapistName || "Unassigned"}
                      </span>

                      {/* Expandable Therapist details */}
                      {isTherapistExpanded && (
                        <div className="mt-3 pt-3 border-t border-dashed border-[#F7EED9] flex flex-col gap-2.5 animate-in fade-in duration-200">
                          {mainProfessional.role && (
                            <div className="flex items-center gap-2 text-xs">
                              <UserCheck
                                size={14}
                                className="text-amber-600 shrink-0"
                              />
                              <span className="text-gray-500 font-medium">
                                Role:
                              </span>
                              <strong className="text-[#76121F] font-bold">
                                {mainProfessional.role}
                              </strong>
                            </div>
                          )}
                          {mainProfessional.phone &&
                            mainProfessional.phone !== "N/A" && (
                              <div className="flex items-center gap-2 text-xs">
                                <Phone
                                  size={14}
                                  className="text-amber-600 shrink-0"
                                />
                                <span className="text-gray-500 font-medium">
                                  Phone:
                                </span>
                                <strong className="text-[#76121F] font-bold">
                                  {mainProfessional.phone}
                                </strong>
                              </div>
                            )}
                          {mainProfessional.email &&
                            mainProfessional.email !== "N/A" && (
                              <div className="flex items-center gap-2 text-xs overflow-hidden">
                                <Mail
                                  size={14}
                                  className="text-amber-600 shrink-0"
                                />
                                <span className="text-gray-500 font-medium">
                                  Email:
                                </span>
                                <strong
                                  className="text-[#76121F] font-bold truncate"
                                  title={mainProfessional.email}
                                >
                                  {mainProfessional.email}
                                </strong>
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    {/* Session Frequency */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Session Frequency
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {sessionFrequency}
                      </span>
                    </div>

                    {/* Service Start Date */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Service Start Date
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {serviceStartDate}
                      </span>
                    </div>

                    {/* Session Time */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-2">
                      <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                        Session Time
                      </span>
                      <span className="text-sm font-bold text-[#76121F]">
                        {sessionTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLIENT SCHEDULE TAB */}
          {activeTab === "Client Schedule" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WeeklyCalendar
                weeklySessions={weeklySessions}
                weekLabel={weekLabel}
                isLoading={isSchedulesLoading}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
                hideActions={true}
              />
            </div>
          )}

          {/* PROGRAMS TAB */}
          {activeTab === "Programs" && (
            <div>
              {isProgramsLoading ? (
                <div className="flex items-center justify-center min-h-[250px] bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-Primary"></div>
                </div>
              ) : programView === "details" && selectedProgram ? (
                /* Program Details View */
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Header Section */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setProgramView("list");
                          setSelectedProgram(null);
                        }}
                        className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#76121F] hover:bg-[#76121F] hover:text-white transition-all active:scale-90"
                      >
                        <ArrowLeft size={16} strokeWidth={3} />
                      </button>
                      <h2 className="text-xl md:text-2xl font-bold text-Third leading-tight">
                        Program Details
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Program Info Card */}
                    <div className="bg-[#FFFDF6] border border-[#F7EED9] p-6 rounded-2xl flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-[#76121F]">
                        {selectedProgram.title}
                      </h3>

                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="px-3.5 py-1 bg-Primary/10 text-Secondary font-bold text-[10px] rounded-full uppercase tracking-wider">
                            {selectedProgram.category}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            Description
                          </span>
                          <p className="text-Third/80 text-xs md:text-sm font-medium leading-relaxed font-poppins">
                            {selectedProgram.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-wide mt-2">
                            <span className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-500">
                              {selectedProgram.level}
                            </span>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-500">
                              {selectedProgram.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Task List Section */}
                    <div>
                      <h3 className="text-lg font-bold text-Third mb-4">
                        Task List ({selectedProgram.tasks?.length || 0})
                      </h3>

                      {!tasksState || tasksState.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-2xl text-gray-400 text-xs font-semibold">
                          No tasks defined for this program.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tasksState.map((task, index) => (
                            <div
                              key={task.id}
                              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4"
                            >
                              <h5 className="text-sm font-bold text-Third mb-4 font-poppins">
                                {task.title}
                              </h5>

                              <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">
                                    Trials
                                  </label>
                                  <div className="bg-gray-50 rounded-xl py-2 px-1 text-center text-Third font-bold text-sm border border-gray-100">
                                    {task.trials || 0}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">
                                    Correct
                                  </label>
                                  <div className="bg-[#E5F9ED] rounded-xl py-2 px-1 text-center text-[#10B981] font-bold text-sm border border-[#10B981]/15">
                                    {task.correct || 0}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">
                                    Incorrect
                                  </label>
                                  <div className="bg-red-50 rounded-xl py-2 px-1 text-center text-red-500 font-bold text-sm border border-red-100">
                                    {task.incorrect || 0}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-2">
                                {task.undoAction ? (
                                  <button
                                    onClick={() => handleUndo(index)}
                                    className="flex-1 bg-[#4B5563] text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-[#374151] transition-all animate-in fade-in zoom-in duration-300 text-xs shadow-sm"
                                  >
                                    <RotateCcw size={16} />
                                    Undo ({Math.max(1, Math.ceil((task.undoAction.expiresAt - Date.now()) / 1000))}s)
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleAction(index, "yes")}
                                      className="flex-1 bg-[#10B981] text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-[#059669] transition-all active:scale-95 text-xs"
                                    >
                                      ✓ Yes
                                    </button>
                                    <button
                                      onClick={() => handleAction(index, "no")}
                                      className="flex-1 border border-red-200 text-red-500 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-red-50 transition-all active:scale-95 text-xs"
                                    >
                                      ✕ No
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Program List View */
                <div className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-Secondary/10 text-Secondary rounded-2xl">
                        <Layers size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Assigned Programs</h2>
                        <p className="text-gray-400 text-sm mt-0.5">
                          Active learning programs & tasks assigned to this case
                          ({programs?.length || 0} total)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAssignModalOpen(true)}
                        disabled={!employeeId}
                        className="px-4 py-2.5 bg-Primary text-[#76121F] font-bold text-xs rounded-xl hover:bg-Primary/90 transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={14} /> Assign from Library
                      </button>
                      <button
                        onClick={() => setIsCustomModalOpen(true)}
                        disabled={!employeeId}
                        className="px-4 py-2.5 bg-Secondary text-white font-bold text-xs rounded-xl hover:bg-Secondary/90 transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={14} /> Create Custom
                      </button>
                    </div>
                  </div>

                  {programs.length === 0 ? (
                    <div className="bg-gray-50 rounded-3xl p-12 text-center border border-dashed border-gray-200">
                      <Layers
                        className="mx-auto text-gray-300 mb-3"
                        size={40}
                      />
                      <p className="text-gray-400 font-semibold text-sm">
                        No programs assigned to this case yet.
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        Once program modules are linked to this client, they
                        will be listed here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {programs.map((program) => (
                        <div
                          key={program.id}
                          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#76121F]/10 transition-all duration-300 gap-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-base font-bold text-[#76121F] leading-snug line-clamp-2">
                                {program.title}
                              </h4>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="bg-Primary/10 text-Secondary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                  {program.category}
                                </span>
                                <button
                                  onClick={() => handleOpenEditModal(program)}
                                  className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-Secondary rounded-xl border border-gray-100 transition-colors"
                                  title="Edit program details"
                                >
                                  <Pencil size={13} />
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-500 text-xs mt-3 leading-relaxed font-medium line-clamp-3">
                              {program.description}
                            </p>
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] mb-4 uppercase tracking-wide">
                              <span>{program.level}</span>
                              <span className="text-[#76121F]">•</span>
                              <span>{program.type}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  setSelectedProgram(program);
                                  setTasksState(program.tasks || []);
                                  setProgramView("details");
                                }}
                                className="flex-1 py-2 bg-[#FAF6F7] border border-Secondary/20 text-[#76121F] font-bold text-xs rounded-xl hover:bg-[#76121F] hover:text-white transition-all active:scale-95 text-center cursor-pointer font-poppins"
                              >
                                View Details
                              </button>
                              <div
                                className={`capitalize flex-1 py-2 ${program.status === "active" || program.status === "Active" ? "bg-emerald-500 text-white" : program.status === "pending" || program.status === "Pending" ? "bg-[#E4A220] text-white" : "bg-[#76121F] text-white"} font-bold text-xs rounded-xl text-center shadow-sm select-none`}
                              >
                                {program.status || "Active"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* NOTES & REPORTS TAB */}
          {activeTab === "Notes & Reports" && (
            <div className="flex flex-col gap-8">
              {/* Overall Task Performance Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Chart Section */}
                <div className="col-span-1 xl:col-span-2 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-Third tracking-tight">
                        Overall Task Performance
                      </h2>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-gray-400 text-xs md:text-sm font-medium">
                          Success rate (%) across sessions
                        </p>
                        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                          {["Month", "Year", "All time"].map((label) => {
                            const val = periodValueMap[label];
                            return (
                              <button
                                key={label}
                                onClick={() => handlePeriodChange(val)}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                                  activePeriod === val
                                    ? "bg-Secondary text-white shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <select
                          value={selectedProgramId || "all"}
                          onChange={(e) =>
                            handleProgramChange(
                              e.target.value === "all"
                                ? undefined
                                : Number(e.target.value),
                            )
                          }
                          className="appearance-none bg-[#76121F] text-white px-4 py-2.5 pr-8 rounded-xl font-bold text-xs shadow-md cursor-pointer outline-none border-none focus:ring-2 focus:ring-[#76121F]/30"
                        >
                          <option value="all">All Programs</option>
                          {availablePrograms.map((prog) => (
                            <option key={prog.id} value={prog.id}>
                              {prog.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                          size={14}
                        />
                      </div>
                      <button
                        onClick={handleDownloadGraph}
                        disabled={isDownloadingGraph || dynamicChartData.length === 0}
                        className="flex items-center gap-1.5 bg-[#76121F] hover:bg-[#600000] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download report PDF"
                      >
                        {isDownloadingGraph ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <Download size={14} />
                        )}
                        <span>{isDownloadingGraph ? "Downloading..." : "Download Report"}</span>
                      </button>
                    </div>
                  </div>

                  {isPerformanceLoading ? (
                    <div className="flex items-center justify-center h-[280px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-xs font-semibold">
                          Loading performance...
                        </span>
                      </div>
                    </div>
                  ) : dynamicChartData.length > 0 ? (
                    <div id="overall-performance-chart-container-supervisor" className="w-full h-[280px] bg-white">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={dynamicChartData}
                          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorValue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#76121F"
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="95%"
                                stopColor="#76121F"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: "#9CA3AF",
                              fontSize: 11,
                              fontWeight: 500,
                            }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: "#9CA3AF",
                              fontSize: 11,
                              fontWeight: 500,
                            }}
                            tickFormatter={(val) => `${val}%`}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                          />
                          <RechartsTooltip
                            content={<CustomTooltip />}
                            cursor={{
                              stroke: "#76121F",
                              strokeWidth: 1,
                              strokeDasharray: "4 4",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#76121F"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            activeDot={{
                              r: 5,
                              fill: "#76121F",
                              stroke: "#FFF",
                              strokeWidth: 2,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[280px] text-gray-400 text-xs font-semibold">
                      No task performance data available.
                    </div>
                  )}
                </div>

                {/* Table Section */}
                <div className="col-span-1 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-Third tracking-tight">
                      Task Responds
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm font-medium">
                      Trial data summary
                    </p>
                  </div>

                  <div className="overflow-x-auto flex-1 max-h-[280px] custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="py-2.5 font-bold text-Third text-[11px] uppercase tracking-wider w-[60%]">
                            Task Title
                          </th>
                          <th className="py-2.5 font-bold text-Third text-[11px] uppercase tracking-wider text-center w-[20%]">
                            Trials
                          </th>
                          <th className="py-2.5 font-bold text-Third text-[11px] uppercase tracking-wider text-center w-[20%]">
                            Success
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {taskResponds.length > 0
                          ? taskResponds.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50/50">
                                <td className="py-3 font-semibold text-gray-600 text-xs truncate max-w-[150px]">
                                  {item.program_name}
                                </td>
                                <td className="py-3 text-center text-gray-500 font-bold text-xs">
                                  {item.trials}
                                </td>
                                <td className="py-3 text-center text-emerald-600 font-bold text-xs">
                                  {Math.round(item.success_rate)}%
                                </td>
                              </tr>
                            ))
                          : // Fallback mock responses if API is empty
                            mockChartData.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50/50">
                                <td className="py-3 font-semibold text-gray-600 text-xs truncate max-w-[150px]">
                                  {item.task_title}
                                </td>
                                <td className="py-3 text-center text-gray-500 font-bold text-xs">
                                  {item.trials}
                                </td>
                                <td className="py-3 text-center text-emerald-600 font-bold text-xs">
                                  {Math.round(item.success_rate)}%
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Notes & Reports lists */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Case Notes Column */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-Primary/10 text-Secondary rounded-2xl">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Case Notes</h3>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Historical notes recorded by therapists
                      </p>
                    </div>
                  </div>

                  {isNotesLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2
                        className="animate-spin text-[#76121F]"
                        size={24}
                      />
                    </div>
                  ) : !notesData?.data || notesData.data.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400 text-xs font-semibold">
                      No case notes found.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {notesData.data.map((note) => (
                        <div
                          key={note.id}
                          className="p-4 bg-[#FFFDF6] border border-[#F7EED9] rounded-2xl flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold">
                            <span>By: {note.employee_name || "Therapist"}</span>
                            <span>
                              {note.date_formatted ||
                                note.created_at_formatted ||
                                note.date}
                            </span>
                          </div>
                          <p className="text-Third text-xs font-medium leading-relaxed font-poppins">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Session Reports List */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-Primary/10 text-Secondary rounded-2xl">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Clinical Reports</h3>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Downloadable clinical summaries & reports
                      </p>
                    </div>
                  </div>

                  {isReportsLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2
                        className="animate-spin text-[#76121F]"
                        size={24}
                      />
                    </div>
                  ) : !reportsData?.data || reportsData.data.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400 text-xs font-semibold">
                      No clinical reports uploaded yet.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {reportsData.data.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors"
                        >
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-Third font-bold text-xs truncate max-w-[200px]">
                              {report.title || report.report_name}
                            </span>
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                              Uploaded:{" "}
                              {report.date_formatted ||
                                report.created_at_formatted ||
                                report.date}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDownload(
                                report.file_url || report.url,
                                report.title || report.report_name,
                              )
                            }
                            className="inline-flex items-center gap-1.5 border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[10px] py-1.5 px-3 rounded-xl transition-all"
                          >
                            <Download size={12} /> Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Session Notes List */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-Primary/10 text-Secondary rounded-2xl">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Session Notes</h3>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Recent session details and supervisor/RBT session notes
                      </p>
                    </div>
                  </div>

                  {isSessionNotesLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2
                        className="animate-spin text-[#76121F]"
                        size={24}
                      />
                    </div>
                  ) : isSessionNotesError ? (
                    <div className="text-center py-10 text-[#EF4444] text-xs font-semibold">
                      Failed to load session notes.
                    </div>
                  ) : !sessionNotesData?.data || sessionNotesData.data.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400 text-xs font-semibold">
                      No session notes found.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {sessionNotesData.data.map((sessionNote, i) => (
                        <div
                          key={i}
                          className="p-4 bg-[#FFFDF6] border border-[#F7EED9] border-l-4 border-l-[#76121F] rounded-2xl flex flex-col gap-2.5"
                        >
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <span className="text-[#76121F] font-bold text-xs uppercase">
                              {sessionNote.session_name || "SESSION"}
                            </span>
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                              sessionNote.status === "approved" || sessionNote.status === "Approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : sessionNote.status === "pending" || sessionNote.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              {sessionNote.status || "Completed"}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400 font-bold">
                            <span>By: {sessionNote.employee_name || "Therapist"}</span>
                            <span>
                              {sessionNote.date_formatted ||
                                sessionNote.created_at_formatted ||
                                sessionNote.date}
                            </span>
                          </div>
                          {(sessionNote.start_time || sessionNote.end_time) && (
                            <div className="text-[10px] text-gray-400 font-semibold bg-gray-50/50 p-1.5 rounded-lg flex justify-between gap-2">
                              <span>Start: {formatTime(sessionNote.start_time)}</span>
                              <span>End: {formatTime(sessionNote.end_time)}</span>
                            </div>
                          )}
                          <p className="text-Third text-xs font-medium leading-relaxed font-poppins">
                            {sessionNote.content || sessionNote.notes || "No content provided."}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DIALOGS AND MODALS (Assign, Create, Edit) */}

      {/* DIALOG: Assign from Library */}
      <Dialog
        open={isAssignModalOpen}
        onOpenChange={(open) => {
          setIsAssignModalOpen(open);
          if (!open) {
            setSelectedLibraryProgramId(null);
            setLibrarySearch("");
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-5 sm:p-7 flex flex-col gap-5 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight font-poppins">
                Assign Library Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Choose a pre-defined learning program to assign to this client.
              </p>
            </div>

            <div className="relative">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search programs by title or category..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full bg-[#F4F4F4] rounded-xl pl-11 pr-4 py-3 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
              />
            </div>

            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
              {isLoadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="animate-spin text-Secondary" size={32} />
                  <span className="text-xs text-gray-400 font-semibold">
                    Loading programs...
                  </span>
                </div>
              ) : filteredLibraryPrograms.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  No programs found
                </div>
              ) : (
                filteredLibraryPrograms.map((prog) => {
                  const isSelected = selectedLibraryProgramId === prog.id;
                  return (
                    <div
                      key={prog.id}
                      onClick={() => setSelectedLibraryProgramId(prog.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected
                          ? "border-Secondary bg-Secondary/[0.03] shadow-sm"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-Third">
                            {prog.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                              {prog.category}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${getLevelStyles(prog.level)}`}
                            >
                              {prog.level}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-Secondary bg-Secondary"
                              : "border-gray-200"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      {prog.description && (
                        <p className="text-gray-500 text-xs leading-relaxed mt-1 font-medium line-clamp-3">
                          {prog.description}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {libraryPagination?.last_page > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <button
                  onClick={() => setLibraryPage((p) => Math.max(1, p - 1))}
                  disabled={libraryPage === 1 || isLoadingLibrary}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-gray-400 font-medium">
                  Page {libraryPage} of {libraryPagination.last_page}
                </span>
                <button
                  onClick={() =>
                    setLibraryPage((p) =>
                      Math.min(libraryPagination.last_page, p + 1),
                    )
                  }
                  disabled={
                    libraryPage >= libraryPagination.last_page ||
                    isLoadingLibrary
                  }
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedLibraryProgramId(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={!selectedLibraryProgramId || isAssigning}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAssigning ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Assigning...
                  </>
                ) : (
                  "Assign Program"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Create Custom Program */}
      <Dialog
        open={isCustomModalOpen}
        onOpenChange={(open) => {
          setIsCustomModalOpen(open);
          if (!open) {
            setCustomTitle("");
            setCustomCategory("Communication");
            setOtherCategory("");
            setCustomType("Skill Acquisition");
            setOtherType("");
            setCustomLevel("Beginner");
            setCustomDescription("");
            setCustomTasks([""]);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-5 sm:p-7 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar font-poppins">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight">
                Create Custom Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Design a custom, target-specific program for this client's
                unique therapy targets.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Program Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toilet Training Protocol"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                    >
                      <option value="Communication">Communication</option>
                      <option value="Daily Living Skills">
                        Daily Living Skills
                      </option>
                      <option value="Social Skills">Social Skills</option>
                      <option value="Behavior Reduction">
                        Behavior Reduction
                      </option>
                      <option value="Cognition">Cognition</option>
                      <option value="Self-Care">Self-Care</option>
                      <option value="Academic">Academic</option>
                      <option value="Other">Other (Custom Category)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">
                    Program Type *
                  </label>
                  <div className="relative">
                    <select
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                    >
                      <option value="Skill Acquisition">
                        Skill Acquisition
                      </option>
                      <option value="Task Analysis">Task Analysis</option>
                      <option value="Direct Instruction">
                        Direct Instruction
                      </option>
                      <option value="DTT (Discrete Trial Training)">
                        DTT (Discrete Trial)
                      </option>
                      <option value="NET (Natural Environment Teaching)">
                        NET (Natural Env)
                      </option>
                      <option value="Other">Other (Custom Type)</option>
                    </select>
                  </div>
                </div>
              </div>

              {customCategory === "Other" && (
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">
                    Specify Custom Category *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                    required
                  />
                </div>
              )}

              {customType === "Other" && (
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">
                    Specify Custom Type *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter type name"
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                    required
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Target Level *
                </label>
                <div className="relative">
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Instructions & Description
                </label>
                <textarea
                  placeholder="Describe target instructions, prompt hierarchy, and mastery criteria..."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium h-24 resize-none"
                />
              </div>

              {/* Custom Tasks Input list */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-Third font-bold text-[13px]">
                    Program Tasks
                  </label>
                  <button
                    type="button"
                    onClick={() => setCustomTasks([...customTasks, ""])}
                    className="flex items-center gap-1 text-[11px] text-Secondary hover:underline font-bold"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {customTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`e.g. Task ${index + 1}`}
                        value={task}
                        onChange={(e) =>
                          handleTaskChange(index, e.target.value)
                        }
                        className="flex-1 bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                      />
                      {customTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(index)}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors border border-red-100 flex items-center justify-center"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                disabled={
                  !customTitle.trim() ||
                  isCreatingCustom ||
                  (customCategory === "Other" && !otherCategory.trim()) ||
                  (customType === "Other" && !otherType.trim())
                }
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreatingCustom ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Creating...
                  </>
                ) : (
                  "Create Program"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Edit Program */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) {
            setEditProgramId(null);
            setEditTitle("");
            setEditDescription("");
            setEditLevel("Beginner");
            setEditTasks([""]);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl font-poppins">
          <div className="p-5 sm:p-7 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight">
                Edit Assigned Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Update details or therapist instructions for this assigned
                learning program.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Program Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Expressive Language"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Target Level *
                </label>
                <div className="relative">
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">
                  Instructions & Description
                </label>
                <textarea
                  placeholder="Instructions for the therapist..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium h-28 resize-none"
                />
              </div>

              {/* Edit Tasks Input list */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-Third font-bold text-[13px]">
                    Program Tasks
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditTasks([...editTasks, ""])}
                    className="flex items-center gap-1 text-[11px] text-Secondary hover:underline font-bold"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {editTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`e.g. Task ${index + 1}`}
                        value={task}
                        onChange={(e) =>
                          handleEditTaskChange(index, e.target.value)
                        }
                        className="flex-1 bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                      />
                      {editTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEditTask(index)}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors border border-red-100 flex items-center justify-center"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editTitle.trim() || isUpdatingProgram}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdatingProgram ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetails;
