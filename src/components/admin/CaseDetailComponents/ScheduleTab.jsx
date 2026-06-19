import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import WeeklyCalendar from "../ScheduleComponents/WeeklyCalendar";
import useClient from "@/hooks/useClient";

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

const ScheduleTab = () => {
  const { id } = useParams();
  const [weekOffset, setWeekOffset] = useState(0);

  const { data: schedulesData, isLoading } = useClient({
    queryKey: ["employeeCaseSchedules", id],
    url: `/employee/cases/${id}/schedules`,
  });

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

  const handlePrevWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <WeeklyCalendar
        weeklySessions={weeklySessions}
        weekLabel={weekLabel}
        isLoading={isLoading}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        hideActions={true}
      />
    </div>
  );
};

export default ScheduleTab;
