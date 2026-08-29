import React, { useState, useMemo } from "react";
import { Search, ChevronDown, Check, Calendar, MapPin, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import TableSkeleton from "@/components/common/TableSkeleton";
import useClient from "@/hooks/useClient";
import { formatTimeOnlyWithZone } from "@/utils/timeUtils";

const DirectorMasterSchedule = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useClient({
    queryKey: ["directorMasterSchedule"],
    url: "/director/schedules/master-schedule",
  });

  const eventsList = data?.data?.events || [];

  const statuses = ["All Statuses", "PENDING", "PROCESSING", "COMPLETED", "MISSED"];

  // Filtered and searched data
  const filteredData = useMemo(() => {
    return eventsList.filter((event) => {
      // 1. Status Filter
      const matchStatus =
        selectedStatus === "All Statuses" ||
        event.status?.toUpperCase() === selectedStatus.toUpperCase();

      // 2. Search Filter
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        event.client_name?.toLowerCase().includes(query) ||
        event.staff_name?.toLowerCase().includes(query) ||
        event.supervisor_name?.toLowerCase().includes(query) ||
        event.guardian_name?.toLowerCase().includes(query) ||
        event.session_type?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query);

      return matchStatus && matchSearch;
    });
  }, [eventsList, selectedStatus, searchQuery]);

  const getStatusStyles = (status) => {
    const upperStatus = status?.toUpperCase() || "";
    switch (upperStatus) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "PROCESSING":
      case "IN_PROGRESS":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "PENDING":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "MISSED":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatTime = (timeStr) => {
    return formatTimeOnlyWithZone(timeStr);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Filters & Search Container */}
      <div className="bg-white rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by client, staff, guardian, type, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-xs md:text-sm text-Third font-semibold placeholder:text-gray-400 focus:bg-white focus:border-[#76121F] transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">
              Showing {filteredData?.length} of {eventsList.length} records
            </span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between gap-2 bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="opacity-70 font-medium">Status:</span> {selectedStatus}
                </span>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown Options */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 top-[110%] w-[180px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-20 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                    {statuses?.map((status) => {
                      const isSelected = selectedStatus === status;
                      return (
                        <div
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all text-[12px] font-bold ${
                            isSelected
                              ? "bg-[#76121F] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status}
                          {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table representation */}
        {isLoading ? (
          <TableSkeleton rows={8} columns={8} />
        ) : isError ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-rose-500 font-bold text-sm">Failed to load master schedule records.</p>
            <p className="text-gray-400 text-xs mt-1">Please check your network and try again.</p>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center gap-3">
            <Calendar className="text-gray-300 animate-pulse" size={40} />
            <div>
              <p className="text-gray-500 font-bold text-sm">No schedule events found</p>
              <p className="text-gray-400 text-xs mt-1">Try adjusting your search query or status filter.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider rounded-tl-xl">
                    Date & Day
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider">
                    Client Details
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider">
                    Assigned Staff
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider">
                    Time Window
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider">
                    Session & Location
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[12px] uppercase tracking-wider rounded-tr-xl text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData?.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    {/* Date column */}
                    <td className="py-5 px-6 font-semibold text-Third text-[13px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{event.date_formatted}</span>
                          {event.is_today && (
                            <span className="bg-rose-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                              Today
                            </span>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs font-normal">{event.day_of_week}</span>
                      </div>
                    </td>

                    {/* Client column */}
                    <td className="py-5 px-6 font-bold text-Third text-[14px]">
                      <div>{event.client_name}</div>
                      {event.guardian_name && (
                        <div className="text-[11px] text-gray-400 font-normal mt-1">
                          Parent: {event.guardian_name}
                        </div>
                      )}
                    </td>

                    {/* Staff column */}
                    <td className="py-5 px-6 font-bold text-Third text-[14px]">
                      <div>{event.staff_name}</div>
                      {event.staff_role && (
                        <div className="inline-block bg-gray-100 text-gray-500 font-extrabold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider mt-1">
                          {event.staff_role}
                        </div>
                      )}
                    </td>

                    {/* Supervisor column */}
                    <td className="py-5 px-6 font-bold text-Third text-[14px]">
                      <div>{event.supervisor_name || "—"}</div>
                      {event.supervisor_name && (
                        <div className="inline-block bg-[#76121F]/10 text-[#76121F] font-extrabold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider mt-1">
                          Supervisor
                        </div>
                      )}
                    </td>

                    {/* Time window column */}
                    <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span>{event.time}</span>
                      </div>
                    </td>

                    {/* Session Type & Location */}
                    <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        <span className="text-Third font-bold text-[13px]">{event.session_type}</span>
                        {event.location && (
                          <div className="flex items-center gap-1 text-[11px] text-gray-400 font-normal">
                            <MapPin size={12} className="text-gray-300" />
                            <span className="truncate" title={event.location}>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-6 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border shadow-[0_2px_8px_rgba(0,0,0,0.01)] uppercase tracking-wider ${getStatusStyles(
                          event.status
                        )}`}
                      >
                        {event.status || "PENDING"}
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-5 px-6 text-center">
                      <Link
                        to={`/director-dashboard/cases/${event.clinical_case_id}`}
                        className="inline-block"
                      >
                        <button className="border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[11px] py-2 px-4.5 rounded-xl transition-all duration-200 shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5">
                          <FileText size={13} />
                          <span>View Case</span>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile hint */}
        <div className="lg:hidden mt-4 py-3 px-4 bg-gray-50/50 rounded-xl text-center">
          <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view complete records</p>
        </div>
      </div>
    </div>
  );
};

export default DirectorMasterSchedule;
