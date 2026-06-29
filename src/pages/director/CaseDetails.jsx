import React from "react";
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
} from "lucide-react";
import useClient from "@/hooks/useClient";

const CaseDetails = () => {
  const { id } = useParams();

  const {
    data: resData,
    isLoading,
    isError,
  } = useClient({
    queryKey: ["directorCaseDetails", id],
    url: `/director/cases/${id}`,
  });

  const caseDetails = resData?.data;

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
          to="/director-dashboard/cases"
          className="mt-4 inline-flex items-center gap-2 text-Secondary hover:underline font-bold"
        >
          <ArrowLeft size={16} /> Back to Cases
        </Link>
      </div>
    );
  }

  const parent = caseDetails?.parent || {};
  const supervisor = caseDetails?.supervisor || {};
  const employee = caseDetails?.employee || {};
  const service = caseDetails?.service || {};
  const programs = caseDetails?.programs || [];
  const schedules = caseDetails?.schedules || [];

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
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <Link
          to="/director-dashboard/cases"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-Secondary font-semibold text-sm transition-colors w-max"
        >
          <ArrowLeft size={18} /> Back to Managed Cases
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {caseDetails?.case_number}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(caseDetails?.status)}`}
              >
                {caseDetails?.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">
              Service:{" "}
              <span className="text-Third font-semibold">
                {service?.name || "N/A"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 bg-[#FAF6F7] px-4 py-2.5 rounded-2xl border border-gray-50">
            <Calendar size={18} className="text-Secondary" />
            <span>
              Start Date:{" "}
              <strong className="text-Third">{caseDetails?.start_date}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Profile and Details Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Client (Parent) Information */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl shrink-0">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Client (Parent)</h2>
              <p className="text-[10px] text-gray-400">
                Personal & Contact Info
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Full Name
              </label>
              <span className="text-xs font-bold text-Third mt-0.5 block truncate">
                {parent?.name || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-gray-400 shrink-0" />
              <div className="overflow-hidden">
                <label className="text-[9px] font-bold text-gray-400 uppercase block">
                  Email Address
                </label>
                <span className="text-xs font-semibold text-gray-600 block truncate">
                  {parent?.email || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block">
                  Phone Number
                </label>
                <span className="text-xs font-semibold text-gray-600 block">
                  {parent?.phone_number || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block">
                  Session Location
                </label>
                <span className="text-xs font-semibold text-gray-600 block truncate">
                  {caseDetails?.location || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Clinical Supervisor (BCBA) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl shrink-0">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Clinical Supervisor</h2>
              <p className="text-[10px] text-gray-400">BCBA Overseer</p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Full Name
              </label>
              <span className="text-xs font-bold text-Third mt-0.5 block truncate">
                {supervisor?.name || "Unassigned"}
              </span>
            </div>

            {supervisor?.email && (
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-gray-400 shrink-0" />
                <div className="overflow-hidden">
                  <label className="text-[9px] font-bold text-gray-400 uppercase block">
                    Email Address
                  </label>
                  <span className="text-xs font-semibold text-gray-600 block truncate">
                    {supervisor?.email || "N/A"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <Info size={14} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block">
                  Role Designation
                </label>
                <span className="text-xs font-semibold text-gray-600 block">
                  Board Certified Behavior Analyst
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Therapist (RBT) Information */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl shrink-0">
              <UserCheck size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Assigned RBT</h2>
              <p className="text-[10px] text-gray-400">Therapist Profile</p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Full Name
              </label>
              <span className="text-xs font-bold text-Third mt-0.5 block truncate">
                {employee?.name || "Unassigned"}
              </span>
            </div>

            {employee?.email && (
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-gray-400 shrink-0" />
                <div className="overflow-hidden">
                  <label className="text-[9px] font-bold text-gray-400 uppercase block">
                    Email Address
                  </label>
                  <span className="text-xs font-semibold text-gray-600 block truncate">
                    {employee?.email || "N/A"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <Info size={14} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block">
                  Role Designation
                </label>
                <span className="text-xs font-semibold text-gray-600 block">
                  Registered Behavior Tech
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Session Schedule Details */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Session Hours</h2>
              <p className="text-[10px] text-gray-400">Schedule & Frequency</p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Start / End Time
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-bold text-Third bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  {caseDetails?.session_start_time || "00:00"}
                </span>
                <span className="text-gray-400 text-[10px] font-bold">to</span>
                <span className="text-xs font-bold text-Third bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  {caseDetails?.session_end_time || "00:00"}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Session Frequency
              </label>
              <span className="text-xs font-bold text-Third mt-0.5 block">
                {caseDetails?.frequency} session(s) per week
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedules List Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-Primary/25 text-[#76121F] rounded-2xl">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Weekly Schedules</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              Specific day-by-day session hours for this client (
              {schedules?.length} total)
            </p>
          </div>
        </div>

        {schedules?.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-50 shadow-sm">
            <p className="text-gray-400 font-medium">
              No session schedules defined yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {schedules?.map((sched) => {
              const session = sched?.sessions?.[0];
              const sessionStatus = session?.status;
              const isCompleted = sessionStatus === "completed";
              const isInProgress = sessionStatus === "in_progress";
              const cardBgClass = isCompleted 
                ? "bg-emerald-50/40 border-emerald-100 shadow-sm" 
                : isInProgress 
                  ? "bg-amber-50/40 border-amber-100 shadow-sm" 
                  : "bg-white border-gray-100 shadow-sm";
              return (
                <div
                  key={sched.id}
                  className={`${cardBgClass} p-5 rounded-2xl border flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                    <span className="font-bold text-sm text-Third">
                      {sched.day_of_week}
                    </span>
                    <span className="bg-Primary/10 text-Secondary text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {sched.session_type || "Session"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Clock size={14} className="text-gray-400" />
                      <span>
                        {sched.start_time} - {sched.end_time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="truncate">{sched.location || "N/A"}</span>
                    </div>
                    {sessionStatus && (
                      <div className="mt-1 pt-2 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Status</span>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                          isCompleted 
                            ? "bg-emerald-100/80 text-emerald-800 border-emerald-200" 
                            : isInProgress 
                              ? "bg-amber-100/80 text-amber-800 border-amber-200" 
                              : "bg-gray-100/80 text-gray-800 border-gray-200"
                        }`}>
                          {sessionStatus.replace("_", " ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Programs List */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-Secondary/10 text-Secondary rounded-2xl">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Assigned Programs</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              Active learning programs & tasks assigned to this case (
              {programs?.length} total)
            </p>
          </div>
        </div>

        {programs?.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-50 shadow-sm">
            <p className="text-gray-400 font-medium">
              No programs assigned to this case yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs?.map((program) => (
              <div
                key={program.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-Third leading-snug">
                        {program.title}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1 block">
                        Type: {program.type || "N/A"}
                      </span>
                    </div>
                    <span className="bg-Primary/10 text-Secondary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {program.category}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs mt-3 leading-relaxed font-medium">
                    {program.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-bold">Level:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getLevelStyles(program.level)}`}
                    >
                      {program.level}
                    </span>
                  </div>

                  <div className="text-gray-400 font-medium">
                    Start:{" "}
                    <strong className="text-gray-600">
                      {program.start_date || "N/A"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetails;
