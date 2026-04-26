import React, { useState } from "react";
import { Clock, CheckCircle2, ShieldCheck } from "lucide-react";

// Sub-components
import StatsCards from "./ScheduleComponents/StatsCards";
import WeeklyCalendar from "./ScheduleComponents/WeeklyCalendar";
import ClockInModal from "./ScheduleComponents/ClockInModal";
import ClockOutModal from "./ScheduleComponents/ClockOutModal";
import ScheduleSessionModal from "./ScheduleComponents/ScheduleSessionModal";

const MySchedule = () => {
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState("");

  // Weekly Data structure
  const [weeklySessions, setWeeklySessions] = useState([
    {
      day: "Sun",
      date: "22",
      sessions: [
        {
          id: 1,
          client: "John Smith",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 2,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 3,
          client: "Mike Wilson",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Mon",
      date: "23",
      sessions: [
        {
          id: 4,
          client: "Sarah Johnson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 5,
          client: "Lisa Davis",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Tue",
      date: "24",
      sessions: [
        {
          id: 6,
          client: "Mike Wilson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 7,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Daycare",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Wed",
      date: "25",
      sessions: [
        {
          id: 8,
          client: "Robert Fox",
          time: "09:00 - 10:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 9,
          client: "Lisa Davis",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 10,
          client: "Sarah Johnson",
          time: "12:00 - 01:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Thu",
      date: "26",
      sessions: [
        {
          id: 11,
          client: "Lisa Davis",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 12,
          client: "Sarah Johnson",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Fri",
      date: "27",
      sessions: [
        {
          id: 13,
          client: "John Smith",
          time: "09:00 - 10:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
        {
          id: 14,
          client: "Robert Fox",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
        {
          id: 15,
          client: "Sarah Johnson",
          time: "12:00 - 01:00",
          type: "Group",
          room: "Daycare",
          status: "Upcoming",
        },
      ],
    },
    {
      day: "Sat",
      date: "28",
      sessions: [
        {
          id: 16,
          client: "Mike Wilson",
          time: "09:00 - 10:00",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
        {
          id: 17,
          client: "John Smith",
          time: "10:30 - 11:30",
          type: "One-to-One",
          room: "Clinic",
          status: "Upcoming",
        },
        {
          id: 18,
          client: "Robert Fox",
          time: "12:00 - 11:00",
          type: "One-to-One",
          room: "In-Home",
          status: "Upcoming",
        },
      ],
    },
  ]);

  const stats = [
    {
      label: "Today's Hours",
      value: "6.5",
      unit: "hrs",
      icon: <Clock size={22} className="text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Weekly Hours",
      value: "28.5",
      unit: "hrs",
      icon: <CheckCircle2 size={22} className="text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Hours Logged",
      value: "142",
      unit: "hrs",
      icon: <ShieldCheck size={22} className="text-purple-500" />,
      bgColor: "bg-purple-50",
    },
  ];

  const [actualStartTime, setActualStartTime] = useState("10:26 AM");
  const [actualEndTime, setActualEndTime] = useState("11:30 AM");

  const handleClockAction = (session) => {
    setSelectedSession(session);
    if (session.status === "Upcoming") {
      setActualStartTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setShowClockInModal(true);
    } else if (session.status === "In Progress") {
      setActualEndTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setShowClockOutModal(true);
    }
  };

  const confirmClockIn = () => {
    updateSessionStatus(selectedSession.id, "In Progress");
    setShowClockInModal(false);
  };

  const confirmClockOut = () => {
    updateSessionStatus(selectedSession.id, "Completed");
    setShowClockOutModal(false);
    setSessionNotes(""); // Reset notes after clocking out
  };

  const updateSessionStatus = (sessionId, newStatus) => {
    setWeeklySessions((prev) =>
      prev.map((dayObj) => ({
        ...dayObj,
        sessions: dayObj.sessions.map((s) =>
          s.id === sessionId ? { ...s, status: newStatus } : s,
        ),
      })),
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins pb-10 px-1 md:px-0">
      {/* Top Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Calendar Card */}
      <WeeklyCalendar 
        weeklySessions={weeklySessions}
        setShowScheduleModal={setShowScheduleModal}
        handleClockAction={handleClockAction}
      />

      {/* Modals */}
      <ClockInModal 
        isOpen={showClockInModal}
        onClose={() => setShowClockInModal(false)}
        selectedSession={selectedSession}
        actualStartTime={actualStartTime}
        setActualStartTime={setActualStartTime}
        confirmClockIn={confirmClockIn}
      />

      <ClockOutModal 
        isOpen={showClockOutModal}
        onClose={() => setShowClockOutModal(false)}
        selectedSession={selectedSession}
        actualStartTime={actualStartTime}
        actualEndTime={actualEndTime}
        setActualEndTime={setActualEndTime}
        sessionNotes={sessionNotes}
        setSessionNotes={setSessionNotes}
        confirmClockOut={confirmClockOut}
      />

      <ScheduleSessionModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
};

export default MySchedule;
