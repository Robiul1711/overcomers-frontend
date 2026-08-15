import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, ChevronRight, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

import {
  formatDateToYYYYMMDD,
  formatDateToDDMMYYYY,
  formatTo12Hour,
} from "@/utils/timeUtils";

const ScheduleSessionModal = ({ isOpen, onClose, initialDate }) => {
  const location = useLocation();

  // Determine user role from url path
  let role = "employee";
  if (location.pathname.startsWith("/supervisor-dashboard")) {
    role = "supervisor";
  } else if (location.pathname.startsWith("/director-dashboard")) {
    role = "director";
  }

  const defaultDateValue = initialDate ? formatDateToYYYYMMDD(initialDate) : "";

  // State variables for form fields
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [sessionDate, setSessionDate] = useState(defaultDateValue);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [notes, setNotes] = useState("");

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setSessionDate(initialDate ? formatDateToYYYYMMDD(initialDate) : "");
      setSelectedCaseId("");
      setSessionType("");
      setStartTime("");
      setEndTime("");
      setLocationValue("");
      setNotes("");
    }
  }, [isOpen, initialDate]);

  // Fetch cases based on role
  const { data: casesResponse, isLoading: isLoadingCases } = useClient({
    queryKey: ["scheduleCasesList", role],
    url: `/${role}/schedules/cases`,
    enabled: isOpen,
  });

  const casesList = casesResponse?.data || [];

  // Mutation to create a schedule
  const { mutate: createSchedule, isPending: isSubmitting } = useMutationClient({
    url: `/${role}/schedules`,
    method: "post",
    invalidateKeys: [
      [`${role}/schedules`],
      [`${role}/schedules/overview`]
    ],
    successMessage: "Schedule session created successfully!",
    onSuccess: () => {
      onClose();
    },
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedCaseId || !sessionType || !sessionDate || !startTime || !endTime || !locationValue) {
      return;
    }

    createSchedule({
      data: {
        clinical_case_id: Number(selectedCaseId),
        session_type: sessionType,
        session_date: formatDateToDDMMYYYY(sessionDate),
        start_time: formatTo12Hour(startTime),
        end_time: formatTo12Hour(endTime),
        location: locationValue,
        session_notes: notes,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] w-full max-w-[600px] max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl p-8 sm:p-10 animate-in fade-in zoom-in duration-300 custom-scrollbar">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">
              Schedule Session
            </h2>
            <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* select case  */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#3A331E] font-bold text-[14px]">
              Select Case *
            </label>
            <div className="relative group">
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                {isLoadingCases ? (
                  <option disabled>Loading cases...</option>
                ) : (
                  casesList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.client_name || item.case_number} ({item.case_number})
                    </option>
                  ))
                )}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Session Type */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#3A331E] font-bold text-[14px]">
              Session Type *
            </label>
            <div className="relative group">
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer"
              >
                <option value="">Select type</option>
                <option value="One-to-One">One-to-One</option>
                <option value="Group">Group</option>
                <option value="Parent Training">Parent Training</option>
                <option value="Treatment Planning">Treatment Planning</option>
                <option value="Assessment">Assessment</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Session Date */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#3A331E] font-bold text-[14px]">
              Session Date *
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
              />
            </div>
          </div>

          {/* Start & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2.5">
              <label className="text-[#3A331E] font-bold text-[14px]">
                Start Time *
              </label>
              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  onClick={(e) => e.target.showPicker?.()}
                  placeholder="9:00 AM"
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#3A331E] font-bold text-[14px]">
                End Time *
              </label>
              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  onClick={(e) => e.target.showPicker?.()}
                  placeholder="11:00 AM"
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 pl-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#3A331E] font-bold text-[14px]">
              Location *
            </label>
            <div className="relative group">
              <select
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                className="w-full bg-[#F4F4F4] rounded-xl p-4 pr-12 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="home">In-Home</option>
                <option value="school">School</option>
                <option value="daycare">Daycare</option>
                <option value="clinic">Clinic</option>
                <option value="community">Community</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-Secondary transition-colors">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Session Notes */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#3A331E] font-bold text-[14px]">
              Session Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information..."
              className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !selectedCaseId ||
              !sessionType ||
              !sessionDate ||
              !startTime ||
              !endTime ||
              !locationValue
            }
            className="w-full py-4 bg-Secondary text-white font-bold rounded-xl shadow-lg shadow-Secondary/20 hover:bg-[#426c3c] transition-all active:scale-[0.98] mt-2 uppercase tracking-wider text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating...
              </>
            ) : (
              "Create Schedule"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
