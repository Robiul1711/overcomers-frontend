import React, { useState, useMemo } from "react";
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
  Shield,
  UserCheck,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Download,
  CreditCard,
  Activity,
  Plus,
  Search,
  Loader2,
  X
} from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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
    return (
      <div className="bg-[#76121F] text-white p-2 px-4 rounded-xl text-center shadow-lg transform -translate-y-2 relative font-poppins">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#76121F] rotate-45"></div>
        <p className="text-[12px] font-medium relative z-10 leading-tight">
          {payload[0].payload?.task_title || "Success"}
        </p>
        <p className="text-[18px] font-bold relative z-10 leading-tight">
          {Math.round(payload[0].value)}%
        </p>
      </div>
    );
  }
  return null;
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
  const [taskPerformanceParams, setTaskPerformanceParams] = useState({
    period: "all_time",
    program_id: undefined,
  });

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");
  const [assigningProgramId, setAssigningProgramId] = useState(null);

  // Fetch available programs for this case
  const { data: libraryProgramsRes, isLoading: isLibraryLoading } = useClient({
    queryKey: ["directorAvailableProgramsList", id],
    url: `/director/cases/${id}/programs/available`,
  });
  const libraryPrograms = libraryProgramsRes?.data || [];

  const filteredLibraryPrograms = useMemo(() => {
    if (!Array.isArray(libraryPrograms)) return [];
    return libraryPrograms
      .filter((prog) => !prog.is_archived)
      .filter((prog) => {
        const searchLower = librarySearch.toLowerCase();
        return (
          prog.title?.toLowerCase().includes(searchLower) ||
          prog.category?.toLowerCase().includes(searchLower) ||
          prog.type?.toLowerCase().includes(searchLower)
        );
      });
  }, [libraryPrograms, librarySearch]);

  // Assign program mutation
  const { mutate: assignProgram } = useMutationClient({
    url: `/director/cases/${id}/programs/assign`,
    method: "post",
    invalidateKeys: [
      ["directorCasePrograms", id],
      ["directorCaseDetails", id],
      ["directorAvailableProgramsList", id],
    ],
    successMessage: "Program assigned to caseload successfully",
  });

  const handleAssignProgram = (libraryProgramId) => {
    setAssigningProgramId(libraryProgramId);
    assignProgram(
      {
        data: {
          library_program_id: libraryProgramId.toString(),
        },
      },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
          setLibrarySearch("");
          setAssigningProgramId(null);
        },
        onError: () => {
          setAssigningProgramId(null);
        },
      }
    );
  };

  // Fetch client details
  const {
    data: resData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["directorCaseDetails", id],
    url: `/director/cases/${id}`,
  });

  // Fetch schedules details
  const {
    data: schedulesData,
    isLoading: isSchedulesLoading,
  } = useClient({
    queryKey: ["directorCaseSchedules", id],
    url: `/director/cases/${id}/schedules`,
  });

  // Fetch programs details
  const {
    data: programsData,
    isLoading: isProgramsLoading,
  } = useClient({
    queryKey: ["directorCasePrograms", id],
    url: `/director/cases/${id}/programs`,
  });

  // Fetch notes details
  const {
    data: notesData,
    isLoading: isNotesLoading,
  } = useClient({
    queryKey: ["directorCaseNotes", id],
    url: `/director/cases/${id}/notes`,
  });

  // Fetch reports details
  const {
    data: reportsData,
    isLoading: isReportsLoading,
  } = useClient({
    queryKey: ["directorCaseReports", id],
    url: `/director/cases/${id}/reports`,
  });

  // Fetch task performance details
  const {
    data: taskPerformanceData,
    isLoading: isPerformanceLoading,
    isError: isPerformanceError,
  } = useClient({
    queryKey: ["directorCasePerformance", id, taskPerformanceParams],
    url: `/director/cases/${id}/task-performance`,
    params: taskPerformanceParams,
  });

  // Fetch insurance details
  const {
    data: insuranceData,
    isLoading: isInsuranceLoading,
  } = useClient({
    queryKey: ["directorCaseInsurance", id],
    url: `/director/cases/${id}/insurances`,
  });

  const caseDetails = resData?.data;

  // Extract fields from new or old structure
  const clientInfo = caseDetails?.client_information || {};
  const serviceDetails = caseDetails?.service_details || {};
  
  // Case meta information
  const caseNumber = caseDetails?.case_number || "N/A";
  const caseStatus = clientInfo?.case_status || caseDetails?.status || "Active";
  const clientName = caseDetails?.client_name || clientInfo?.client_name || caseDetails?.parent?.name || "N/A";
  const centerType = caseDetails?.center_type || caseDetails?.service?.name || "Residential Center";
  const authValidThru = caseDetails?.auth_valid_thru || "Aug 2026";

  // Client info tiles
  const clientInfoName = clientInfo?.client_name || caseDetails?.parent?.name || "N/A";
  const clientInfoDob = clientInfo?.date_of_birth || "N/A";
  const clientInfoLocation = clientInfo?.service_location || caseDetails?.location || "N/A";
  const clientInfoAssignedDate = clientInfo?.assigned_date || caseDetails?.start_date || "N/A";

  // Service details professional
  const assignedProfessionals = serviceDetails?.assigned_professionals || [];
  const mainProfessional = assignedProfessionals[0] || {
    assigned_therapist: caseDetails?.employee?.name || "Unassigned",
    role: "Therapist",
    phone: "N/A",
    email: caseDetails?.employee?.email || "N/A"
  };

  // Service details tiles
  const therapistName = mainProfessional.assigned_therapist;
  const sessionFrequency = serviceDetails?.session_frequency || caseDetails?.frequency || "1";
  const serviceStartDate = serviceDetails?.service_start_date || caseDetails?.start_date || "N/A";
  const sessionTime = serviceDetails?.session_time || 
    (caseDetails?.session_start_time ? `${caseDetails.session_start_time} - ${caseDetails.session_end_time}` : "1:00 AM - 12:00 PM");

  // Schedules and Programs fallback from API or old structure
  const programs = caseDetails?.programs || [];
  const schedules = caseDetails?.schedules || [];

  // Parse overall performance details
  const overallPerformance = taskPerformanceData?.data?.overall_task_performance;
  const chartData = overallPerformance?.chart_data || [];
  const availablePrograms = overallPerformance?.available_programs || [];
  const taskResponds = taskPerformanceData?.data?.task_responds || [];

  // Parse insurance details
  const insuranceCaseData = insuranceData?.data?.[0];
  const primaryNetwork = insuranceCaseData?.primary_network || "";
  const insuranceProvider = insuranceCaseData?.insurance_provider || "";
  const memberId = insuranceCaseData?.member_id || "";
  const planPolicyNumber = insuranceCaseData?.plan_policy_number || "";
  const authorizationNumber = insuranceCaseData?.authorization_number || "";
  const authStartDate = insuranceCaseData?.auth_start_date || "";
  const authEndDate = insuranceCaseData?.auth_end_date || "";
  const daysRemaining = insuranceCaseData?.days_remaining || 0;
  const totalAuthorizedUnits = insuranceCaseData?.total_authorized_units || 0;
  const unitsUsed = insuranceCaseData?.units_used || 0;
  const unitsLeft = insuranceCaseData?.units_left || 0;
  const insuranceStatus = insuranceCaseData?.status || "active";
  const insuranceCpts = insuranceCaseData?.cpts || [];

  const networkParts = primaryNetwork.split(" - ");
  const networkName = networkParts[0] || primaryNetwork;
  const networkType = networkParts[1] || "";

  const insurancePropertyItems = [
    { label: "Authorization Number", value: authorizationNumber },
    { label: "Insurance Provider", value: insuranceProvider },
    { label: "Member ID", value: memberId },
    { label: "Plan / Policy Number", value: planPolicyNumber },
    { label: "Authorization Start Date", value: authStartDate },
    { label: "Authorization End Date", value: authEndDate },
  ];

  const selectedProgramId = taskPerformanceParams?.program_id;
  const activePeriod = taskPerformanceParams?.period || "all_time";

  const dynamicChartData = useMemo(() => {
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
    // Find the Sunday of this week
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
        isToday:
          date.toDateString() === new Date().toDateString(),
        sessions: [],
      });
    }
    return days;
  };

  const weeklySessions = useMemo(() => {
    const weekDays = generateWeekDays(weekOffset);
    const scheduleData = schedulesData?.data;
    if (!scheduleData) return weekDays;

    scheduleData.forEach((item) => {
      const itemDate = new Date(item.timestamp * 1000);
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
  }, [schedulesData, weekOffset]);

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
        <h1 className="text-2xl font-bold text-red-500 font-poppins">Error</h1>
        <p className="text-gray-500 mt-1 font-poppins">
          Failed to load case details. Please try again later.
        </p>
        <Link
          to="/director-dashboard/cases"
          className="mt-4 inline-flex items-center gap-2 text-Secondary hover:underline font-bold"
        >
          <ArrowLeft size={16} /> Back to Cases
        </Link>
      </div>
    );
  }


  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins text-Third w-full">
      
      {/* Header Back Link */}
      <div className="flex flex-col gap-4">
        <Link
          to="/director-dashboard/cases"
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

      {/* Tabs Navigation (Matches custom design) */}
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
              {
                id: "Insurance",
                label: "Insurance",
                icon: <ShieldCheck size={18} />,
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
                          <span className="text-sm font-bold text-[#76121F] truncate" title={clientInfo.email}>
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
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-2">
                          <span className="text-[10px] font-bold text-amber-700/60 uppercase tracking-wider">
                            School Location
                          </span>
                          <span className="text-sm font-bold text-[#76121F]">
                            {clientInfo.school_location}
                          </span>
                        </div>
                      )}

                      {clientInfo.address && (
                        <div className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 sm:col-span-2">
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
                          onClick={() => setIsTherapistExpanded(!isTherapistExpanded)}
                          className="text-[10px] font-extrabold text-[#76121F] hover:underline flex items-center gap-0.5"
                        >
                          {isTherapistExpanded ? "View Less" : "View More"} <ExternalLink size={10} />
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
                              <UserCheck size={14} className="text-amber-600 shrink-0" />
                              <span className="text-gray-500 font-medium">Role:</span>
                              <strong className="text-[#76121F] font-bold">{mainProfessional.role}</strong>
                            </div>
                          )}
                          {mainProfessional.phone && mainProfessional.phone !== "N/A" && (
                            <div className="flex items-center gap-2 text-xs">
                              <Phone size={14} className="text-amber-600 shrink-0" />
                              <span className="text-gray-500 font-medium">Phone:</span>
                              <strong className="text-[#76121F] font-bold">{mainProfessional.phone}</strong>
                            </div>
                          )}
                          {mainProfessional.email && mainProfessional.email !== "N/A" && (
                            <div className="flex items-center gap-2 text-xs overflow-hidden">
                              <Mail size={14} className="text-amber-600 shrink-0" />
                              <span className="text-gray-500 font-medium">Email:</span>
                              <strong className="text-[#76121F] font-bold truncate" title={mainProfessional.email}>{mainProfessional.email}</strong>
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
                          <p className="text-Third/80 text-xs md:text-sm font-medium leading-relaxed">
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

                      {(!selectedProgram.tasks || selectedProgram.tasks.length === 0) ? (
                        <div className="text-center py-8 bg-gray-50 rounded-2xl text-gray-400 text-xs font-semibold">
                          No tasks defined for this program.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProgram.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                            >
                              <h5 className="text-sm font-bold text-Third mb-4">
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
                          Active learning programs & tasks assigned to this case ({programsData?.data?.length || 0} total)
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setIsAssignModalOpen(true)}
                      className="flex items-center justify-center gap-2 bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                    >
                      <Plus size={14} /> Assign Program
                    </button>
                  </div>

                  {(!programsData?.data || programsData.data.length === 0) ? (
                    <div className="bg-gray-50 rounded-3xl p-12 text-center border border-dashed border-gray-200">
                      <Layers className="mx-auto text-gray-300 mb-3" size={40} />
                      <p className="text-gray-400 font-semibold text-sm">
                        No programs assigned to this case yet.
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        Once program modules are linked to this client, they will be listed here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {programsData.data.map((program) => (
                        <div
                          key={program.id}
                          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#76121F]/10 transition-all duration-300 gap-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-base font-bold text-[#76121F] leading-snug line-clamp-2">
                                {program.title}
                              </h4>
                              <span className="bg-Primary/10 text-Secondary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                                {program.category}
                              </span>
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
                                  setProgramView("details");
                                }}
                                className="flex-1 py-2 bg-[#FAF6F7] border border-Secondary/20 text-[#76121F] font-bold text-xs rounded-xl hover:bg-[#76121F] hover:text-white transition-all active:scale-95 text-center cursor-pointer"
                              >
                                View Details
                              </button>
                              <div
                                className={`capitalize flex-1 py-2 ${program.status === "active" ? "bg-emerald-500 text-white" : program.status === "pending" ? "bg-[#E4A220] text-white" : "bg-red-500 text-white"} font-bold text-xs rounded-xl text-center shadow-sm select-none`}
                              >
                                {program.status}
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
                    <div className="relative">
                      <select
                        value={selectedProgramId || "all"}
                        onChange={(e) =>
                          handleProgramChange(
                            e.target.value === "all" ? undefined : Number(e.target.value),
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
                  </div>

                  {isPerformanceLoading ? (
                    <div className="flex items-center justify-center h-[280px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-xs font-semibold">Loading performance...</span>
                      </div>
                    </div>
                  ) : isPerformanceError ? (
                    <div className="flex items-center justify-center h-[280px]">
                      <span className="text-red-500 font-semibold text-xs">Failed to load performance data</span>
                    </div>
                  ) : dynamicChartData.length > 0 ? (
                    <div className="w-full h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={dynamicChartData}
                          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#76121F" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#76121F" stopOpacity={0} />
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
                            tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
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
                        <tr className="bg-gray-50 rounded-t-xl">
                          <th className="py-3 px-4 font-bold text-Third text-xs rounded-tl-xl whitespace-nowrap">
                            Program
                          </th>
                          <th className="py-3 px-2 font-bold text-Third text-xs whitespace-nowrap">
                            Trials
                          </th>
                          <th className="py-3 px-2 font-bold text-[#10B981] text-xs whitespace-nowrap">
                            Yes
                          </th>
                          <th className="py-3 px-4 font-bold text-red-500 text-xs rounded-tr-xl whitespace-nowrap">
                            No
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {isPerformanceLoading ? (
                          <tr>
                            <td colSpan={4} className="py-10 text-center text-gray-400 text-xs font-semibold">
                              Loading responds...
                            </td>
                          </tr>
                        ) : taskResponds.length > 0 ? (
                          taskResponds.map((row, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-gray-50/50 transition-colors"
                            >
                              <td className="py-3 px-4 text-Third text-xs font-bold whitespace-nowrap truncate max-w-[120px]" title={row.program_name}>
                                {row.program_name}
                              </td>
                              <td className="py-3 px-2 text-gray-500 text-xs font-semibold whitespace-nowrap">
                                {row.trials}
                              </td>
                              <td className="py-3 px-2 text-emerald-600 text-xs font-extrabold whitespace-nowrap">
                                {row.correct}
                              </td>
                              <td className="py-3 px-4 text-red-500 text-xs font-extrabold whitespace-nowrap">
                                {row.incorrect}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-10 text-center text-gray-400 text-xs font-semibold"
                            >
                              No task response data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Side-by-side columns: Notes and Reports */}
              <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Case Notes Column */}
                <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-Third">
                      Case Notes
                    </h2>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm font-medium mb-4">
                    Review clinical notes and updates log related to this case.
                  </p>
                  <div className="w-full h-[2.5px] bg-[#E4A220] rounded-full mb-6"></div>

                  {isNotesLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-Primary"></div>
                    </div>
                  ) : (!notesData?.data || notesData.data.length === 0) ? (
                    <div className="text-center py-10 text-gray-400 text-sm font-semibold">
                      No case notes found.
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 space-y-4 custom-scrollbar">
                      {notesData.data.map((note) => (
                        <div
                          key={note.id}
                          className="bg-[#FFFDF6] border-l-4 border-[#76121F] border border-[#F7EED9] rounded-2xl p-5 shadow-sm flex flex-col gap-2.5"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#76121F] font-bold text-sm">
                              {note.employee_name}
                            </span>
                            <span className="text-gray-400 font-bold text-[11px]">
                              {note.date_formatted}
                            </span>
                          </div>
                          <p className="text-[#3A331E]/80 text-xs md:text-sm leading-relaxed font-medium">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Case Reports Column */}
                <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-Third">
                      Case Reports
                    </h2>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm font-medium mb-4">
                    Access and download documentation related to this case.
                  </p>
                  <div className="w-full h-[2.5px] bg-[#E4A220] rounded-full mb-6"></div>

                  {isReportsLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#76121F]"></div>
                    </div>
                  ) : (!reportsData?.data || reportsData.data.length === 0) ? (
                    <div className="text-center py-10 text-gray-400 text-sm font-semibold">
                      No case reports found.
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 space-y-4 custom-scrollbar">
                      {reportsData.data.map((report) => (
                        <div
                          key={report.id}
                          className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between group hover:border-[#76121F]/30 hover:shadow-md transition-all gap-4"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-[#FAF6F7] flex items-center justify-center text-[#76121F] border border-gray-50 shrink-0">
                              <FileText size={18} />
                            </div>
                            <div className="flex flex-col gap-0.5 overflow-hidden">
                              <h4 className="text-sm font-bold text-[#76121F] truncate" title={report.title}>
                                {report.title}
                              </h4>
                              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider truncate">
                                {report.file_name} ({report.file_size}) • {report.date_formatted}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(report.file_url, report.file_name)}
                            className="flex items-center gap-1.5 border-2 border-[#76121F] text-[#76121F] px-3.5 py-1.5 rounded-xl font-bold text-xs hover:bg-[#76121F] hover:text-white transition-all active:scale-95 shrink-0"
                          >
                            <Download size={14} />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* INSURANCE TAB */}
          {activeTab === "Insurance" && (
            <div>
              {isInsuranceLoading ? (
                <div className="flex items-center justify-center min-h-[250px] bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-Primary"></div>
                </div>
              ) : !insuranceCaseData ? (
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 animate-in fade-in duration-500">
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ShieldCheck size={48} className="text-gray-200 mb-4 animate-bounce" />
                    <p className="text-gray-400 font-bold text-sm">No insurance data available</p>
                    <p className="text-gray-300 text-xs font-semibold mt-1">Insurance details will appear here once assigned.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Title Bar */}
                  <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-Third tracking-tight">
                        Insurance Coverage Details
                      </h2>
                    </div>
                  </div>

                  {/* Modern Insurance Summary Card */}
                  <div className="bg-[#76121F] rounded-3xl p-6 md:p-8 text-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 shadow-xl shadow-[#76121F]/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110"></div>
                    
                    <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto">
                      <div>
                        <p className="text-amber-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 leading-none">Primary Network</p>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                          {networkName}
                          {networkType && <span className="text-amber-400/40"> {networkType}</span>}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap mt-3">
                          {memberId && (
                            <span className="text-white/70 text-[11px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">ID: {memberId}</span>
                          )}
                          {authorizationNumber && (
                            <span className="text-white/70 text-[11px] font-bold py-1 px-3 bg-white/5 rounded-lg border border-white/10">Auth: #{authorizationNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto lg:text-right relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                      <div className="flex-1 w-full text-center sm:text-left lg:text-right">
                        <p className="text-amber-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 leading-none">Authorization Window</p>
                        <h4 className="text-lg md:text-xl font-bold mb-1 whitespace-nowrap tracking-tight">
                          {authEndDate || "N/A"}
                        </h4>
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start lg:justify-end gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {Math.floor(daysRemaining)} Days Remaining
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Property Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                    {insurancePropertyItems.map((item, idx) => (
                      <div key={idx} className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col gap-1 hover:bg-white hover:border-amber-400/40 hover:shadow-md transition-all group shadow-sm">
                        <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider leading-none mb-1 group-hover:text-[#76121F] transition-colors">{item.label}</span>
                        <span className="text-[#76121F] font-bold text-xs md:text-sm leading-tight">{item.value || "—"}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8 items-stretch">
                    {/* Unit Consumption Viz */}
                    <div className="flex flex-col gap-5 border border-gray-100 p-6 rounded-3xl bg-white shadow-sm">
                      <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
                        <Activity size={18} className="text-[#76121F]" />
                        <h4 className="text-sm md:text-base font-bold text-Third tracking-tight">Unit Consumption Monitoring</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                        {[
                          { val: String(totalAuthorizedUnits), color: "text-[#76121F]", sub: "Total Units" },
                          { val: String(unitsUsed), color: "text-[#76121F]", sub: "Units Used" },
                          { val: String(unitsLeft), color: "text-[#76121F]", sub: "Units Left" }
                        ].map((u, i) => (
                          <div key={i} className="bg-[#FFFDF6] border border-[#F7EED9] rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-1 hover:shadow-md hover:border-[#76121F]/10 transition-all duration-200 shadow-xs">
                            <span className={`text-xl md:text-2xl font-bold leading-none ${u.color}`}>{u.val}</span>
                            <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider mt-1">{u.sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Protocol Card */}
                    <div className="bg-amber-400/[0.02] border border-dashed border-amber-400/35 rounded-3xl p-6 flex flex-col items-center sm:items-start text-center sm:text-left gap-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Info size={80} />
                      </div>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#76121F] shadow-md border border-amber-100">
                        <Info size={20} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold text-[#76121F] uppercase tracking-widest leading-tight">Administrative Protocol</h4>
                        <p className="text-[#76121F]/60 text-xs md:text-sm font-medium leading-relaxed italic max-w-md">
                          Authorization cycles are synchronized by corporate billing. Direct modifications are restricted to Case Managers and BCBA supervisors with tier-2 clearance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CPT Codes Section */}
                  {insuranceCpts.length > 0 && (
                    <div className="text-left mt-6">
                      <div className="flex items-center gap-3 border-b border-gray-50 pb-3 mb-5">
                        <CreditCard size={18} className="text-[#76121F]" />
                        <h4 className="text-sm md:text-base font-bold text-Third tracking-tight">Active Billing Identifiers (CPT)</h4>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {insuranceCpts.map((code) => (
                          <div key={code.id} className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 hover:border-amber-400/20 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#76121F] flex-shrink-0 border border-gray-100 shrink-0">
                              <FileText size={22} />
                            </div>
                            <div className="flex flex-col gap-2.5 flex-1">
                              <div className="flex items-center justify-between gap-3 flex-wrap">
                                <h3 className="text-lg md:text-xl font-bold text-[#76121F] tracking-tighter leading-none">{code.cpt_code}</h3>
                                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-xs ${
                                  code.status === "active" || code.status === "Active"
                                    ? "bg-[#E5F9ED] text-[#1EB15D]"
                                    : "bg-gray-100 text-gray-400"
                                }`}>
                                  <span className={`w-1 h-1 rounded-full animate-pulse ${
                                    code.status === "active" || code.status === "Active" ? "bg-[#1EB15D]" : "bg-gray-400"
                                  }`}></span>
                                  {code.status}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <h5 className="font-bold text-Third text-xs md:text-sm leading-tight">{code.title}</h5>
                                {code.description && (
                                  <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-sm line-clamp-2">{code.description}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-2 w-full bg-gray-50 p-1.5 pr-3 rounded-lg border border-gray-100">
                                  <div className="w-6 h-6 rounded bg-[#76121F] flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                                    UNITS
                                  </div>
                                  <span className="text-[#76121F] font-bold text-xs truncate">{code.authorized_units} Registered</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

      {/* DIALOG: Assign Program Modal */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[32px] overflow-hidden border-none shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white max-h-[85vh] overflow-y-auto custom-scrollbar font-poppins">
            {/* Header */}
            <div className="flex justify-between items-start w-full border-b border-[#E9EFF2] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-Third tracking-tight leading-none">
                  Assign Program Template
                </h2>
                <span className="text-[10px] font-extrabold text-[#9AA6AC] uppercase tracking-wider mt-1.5 block">
                  Select and assign from clinical library
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setLibrarySearch("");
                }}
                className="w-8 h-8 rounded-full border border-[#E9EFF2] flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search program templates by title, category, or type..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full bg-[#F8F9FB] border border-[#E9EFF2] rounded-xl pl-10 pr-4 py-3 text-xs text-Third font-semibold placeholder:text-[#BAC6CD] focus:bg-white focus:border-Primary transition-all outline-none"
              />
            </div>

            {/* List */}
            {isLibraryLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="animate-spin text-Secondary" size={24} />
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loading templates...</span>
              </div>
            ) : filteredLibraryPrograms.length === 0 ? (
              <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center gap-2">
                <Layers className="text-gray-300" size={32} />
                <span className="text-xs text-gray-400 font-semibold">No templates found matching your query.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
                {filteredLibraryPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 bg-[#F8F9FB] border border-[#E9EFF2] rounded-2xl flex items-center justify-between gap-4 hover:shadow-md hover:border-[#76121F]/10 transition-all duration-300 group"
                  >
                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-[#E5F9ED] text-[#1EB15D] uppercase tracking-wider">
                          {prog.category || "General"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-blue-50 text-blue-600 uppercase tracking-wider border border-blue-100">
                          {prog.level || "Intermediate"}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-Third leading-snug group-hover:text-Secondary transition-colors truncate">
                        {prog.title}
                      </h4>
                      <p className="text-gray-400 text-[10px] font-medium leading-none">
                        Type: {prog.type || "Standard"}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={assigningProgramId !== null}
                      onClick={() => handleAssignProgram(prog.id)}
                      className="bg-Secondary hover:bg-Secondary/95 text-white font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      {assigningProgramId === prog.id ? (
                        <>
                          <Loader2 className="animate-spin" size={12} /> Assigning
                        </>
                      ) : (
                        "Assign"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
