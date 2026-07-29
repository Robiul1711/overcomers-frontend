import React, { useState, useMemo, useRef } from "react";
import { Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

// Sub-components
import StatsCards from "@/components/admin/ScheduleComponents/StatsCards";
import WeeklyCalendar from "@/components/admin/ScheduleComponents/WeeklyCalendar";
import ClockInModal from "@/components/admin/ScheduleComponents/ClockInModal";
import ClockOutModal from "@/components/admin/ScheduleComponents/ClockOutModal";
import ScheduleSessionModal from "@/components/admin/ScheduleComponents/ScheduleSessionModal";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

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

const generateWeekDays = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayIdx = date.getDay();
    days.push({
      day: DAY_ABBR[dayIdx],
      dayFull: DAY_NAMES[dayIdx],
      date: date.getDate(),
      dateObj: date,
      month: MONTH_NAMES[date.getMonth()],
      year: date.getFullYear(),
      isToday: i === 0,
      sessions: [],
    });
  }
  return days;
};

const mapSessionsToDays = (scheduleData, sessionStatuses) => {
  const weekDays = generateWeekDays();
  if (!scheduleData) return weekDays;

  scheduleData.forEach((item) => {
    const matchingDay = weekDays.find((d) => d.dayFull === item.day_of_week);
    if (matchingDay) {
      const status = sessionStatuses[item.id] || item.status || "Upcoming";
      matchingDay.sessions.push({
        id: item.id,
        clinical_case_id: item.clinical_case_id,
        client: item.client_name,
        time: item.time,
        start_time_raw: item.start_time_raw,
        end_time_raw: item.end_time_raw,
        type: item.session_type,
        room: item.location,
        status,
      });
    }
  });

  return weekDays;
};

const formatTimeForApi = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${ampm}`;
};

const getWeekLabel = (weekDays) => {
  if (!weekDays || weekDays.length === 0) return "";
  const first = weekDays[0];
  const last = weekDays[weekDays.length - 1];
  if (first.month === last.month) {
    return `${first.month} ${first.year}`;
  }
  return `${first.month} - ${last.month} ${first.year}`;
};

const SupervisorMySchedule = () => {
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [actualStartTime, setActualStartTime] = useState("");
  const [actualEndTime, setActualEndTime] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionStatuses, setSessionStatuses] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const parentSignatureRef = useRef(null);
  const employeeSignatureRef = useRef(null);

  const handleOpenScheduleModal = (dateObj) => {
    setSelectedDateForModal(dateObj || null);
    setShowScheduleModal(true);
  };

  // Fetch supervisor schedule overview stats
  const { data: statsData, isLoading: statsLoading } = useClient({
    queryKey: ["supervisor/schedules/overview"],
    url: "/supervisor/schedules/overview",
  });

  // Fetch weekly schedule for supervisor
  const { data: schedulesData, isLoading: schedulesLoading } = useClient({
    queryKey: ["supervisor/schedules"],
    url: "/supervisor/schedules",
  });

  // Generate 7-day week and map sessions
  const weeklySessions = useMemo(
    () => mapSessionsToDays(schedulesData?.data, sessionStatuses),
    [schedulesData, sessionStatuses]
  );

  const weekLabel = useMemo(() => getWeekLabel(weeklySessions), [weeklySessions]);

  // Session start mutation for supervisor
  const { mutate: startSession, isPending: isStarting } = useMutationClient({
    url: "/supervisor/schedules/start",
    method: "post",
    isPrivate: true,
    invalidateKeys: [["supervisor/schedules"]],
    successMessage: "Session started successfully",
  });

  // Session end mutation for supervisor
  const { mutate: endSession, isPending: isEnding } = useMutationClient({
    url: (id) => `/supervisor/schedules/${id}/end`,
    method: "post",
    isPrivate: true,
    invalidateKeys: [["supervisor/schedules"]],
    successMessage: "Session ended successfully",
  });

  const stats = [
    {
      label: "Today's Hours",
      value: statsData?.data?.todays_hours || 0,
      unit: "hrs",
      icon: <Clock size={22} className="text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Weekly Hours",
      value: statsData?.data?.weekly_hours || 0,
      unit: "hrs",
      icon: <CheckCircle2 size={22} className="text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Hours Logged",
      value: statsData?.data?.total_hours_logged
        ? parseFloat(statsData.data.total_hours_logged).toFixed(1)
        : 0,
      unit: "hrs",
      icon: <ShieldCheck size={22} className="text-purple-500" />,
      bgColor: "bg-purple-50",
    },
  ];

  const handleClockAction = (session) => {
    setSelectedSession(session);
    setLatitude("");
    setLongitude("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
          toast.warn(
            "Could not retrieve current location. Please allow location permissions."
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.warn("Geolocation is not supported by this browser.");
    }

    const status = session.status?.toUpperCase();
    if (
      status === "PROCESSING" ||
      status === "IN_PROGRESS" ||
      status === "In Progress"
    ) {
      setSessionNotes("");
      setActualEndTime(formatTimeForApi(new Date()));
      setShowClockOutModal(true);
    } else {
      setActualStartTime(formatTimeForApi(new Date()));
      setShowClockInModal(true);
    }
  };

  const confirmClockIn = () => {
    const formData = new FormData();
    formData.append("clinical_case_schedule_id", selectedSession.id);
    formData.append("time", actualStartTime);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    startSession(
      {
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      },
      {
        onSuccess: (res) => {
          const status = res?.data?.data?.status || "PROCESSING";
          setSessionStatuses((prev) => ({
            ...prev,
            [selectedSession.id]: status,
          }));
          setShowClockInModal(false);
        },
      }
    );
  };

  const confirmClockOut = () => {
    const parentSig = parentSignatureRef.current?.getSignatureData?.();
    const employeeSig = employeeSignatureRef.current?.getSignatureData?.();
    const parentEmpty = parentSignatureRef.current?.isCanvasEmpty?.();
    const employeeEmpty = employeeSignatureRef.current?.isCanvasEmpty?.();

    if (!sessionNotes.trim()) {
      toast.error("Please add session notes");
      return;
    }
    if (parentEmpty !== false) {
      toast.error("Please provide parent signature");
      return;
    }
    if (employeeEmpty !== false) {
      toast.error("Please provide employee signature");
      return;
    }

    endSession(
      {
        id: selectedSession.id,
        data: {
          session_notes: sessionNotes,
          parent_signature: parentSig,
          employee_signature: employeeSig,
          latitude: latitude,
          longitude: longitude,
          time: actualEndTime,
        },
      },
      {
        onSuccess: (res) => {
          const status = res?.data?.data?.status || "COMPLETED";
          setSessionStatuses((prev) => ({
            ...prev,
            [selectedSession.id]: status,
          }));
          setShowClockOutModal(false);
          setSessionNotes("");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins pb-10 px-1 md:px-0">
      {/* Top Stats Cards */}
      <StatsCards stats={stats} isLoading={statsLoading} />

      {/* Main Calendar Card */}
      <WeeklyCalendar
        weeklySessions={weeklySessions}
        weekLabel={weekLabel}
        isLoading={schedulesLoading}
        setShowScheduleModal={handleOpenScheduleModal}
        handleClockAction={handleClockAction}
      />

      {/* Modals */}
      <ClockInModal
        isOpen={showClockInModal}
        onClose={() => setShowClockInModal(false)}
        selectedSession={selectedSession}
        actualStartTime={actualStartTime}
        setActualStartTime={setActualStartTime}
        latitude={latitude}
        longitude={longitude}
        confirmClockIn={confirmClockIn}
        isProcessing={isStarting}
      />

      <ClockOutModal
        isOpen={showClockOutModal}
        onClose={() => setShowClockOutModal(false)}
        selectedSession={selectedSession}
        sessionNotes={sessionNotes}
        setSessionNotes={setSessionNotes}
        actualEndTime={actualEndTime}
        latitude={latitude}
        longitude={longitude}
        confirmClockOut={confirmClockOut}
        isProcessing={isEnding}
        parentSignatureRef={parentSignatureRef}
        employeeSignatureRef={employeeSignatureRef}
      />

      <ScheduleSessionModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedDateForModal(null);
        }}
        initialDate={selectedDateForModal}
      />
    </div>
  );
};

export default SupervisorMySchedule;
