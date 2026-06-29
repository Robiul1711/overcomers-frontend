import React, { useState } from "react";
import { Search, FileText, Calendar, Clock, User, Shield, Layers, MapPin, ClipboardList, ChevronRight, Activity } from "lucide-react";
import useClient from "@/hooks/useClient";

const Audit = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [caseSearch, setCaseSearch] = useState("");
  const [activeTab, setActiveTab] = useState("programs"); // "programs" or "sessions"

  // Fetch Cases list
  const { data: casesData, isLoading: isLoadingCases, isError: isErrorCases } = useClient({
    queryKey: ["directorCasesListForAudit"],
    url: "/director/cases",
  });

  const casesList = casesData?.data?.cases?.data || [];

  // Filter cases based on search query
  const filteredCases = casesList.filter((item) => {
    const searchLower = caseSearch.toLowerCase();
    return (
      item.case_number?.toLowerCase().includes(searchLower) ||
      item.parent?.name?.toLowerCase().includes(searchLower) ||
      item.service?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Get active selected case details
  const activeCase = casesList.find((c) => c.id === selectedCaseId);

  // Fetch Case Programs
  const { data: programsData, isLoading: isLoadingPrograms, isError: isErrorPrograms } = useClient({
    queryKey: ["directorCasePrograms", selectedCaseId],
    url: `/director/cases/${selectedCaseId}/programs`,
    enabled: !!selectedCaseId,
  });

  const programs = programsData?.data || [];

  // Fetch Case Sessions
  const { data: sessionsData, isLoading: isLoadingSessions, isError: isErrorSessions } = useClient({
    queryKey: ["directorCaseSessions", selectedCaseId],
    url: `/director/cases/${selectedCaseId}/sessions`,
    enabled: !!selectedCaseId,
  });

  const sessions = sessionsData?.data || [];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
      case "Approved":
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
    <div className="flex flex-col gap-6 font-poppins text-Third h-full">
      {/* Title */}
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Clinical Auditing Portal</h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1 font-medium">
            Review program targets, prompt levels, and session clock logs across client cases.
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Cases Directory */}
        <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-5 flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-2 pb-2.5 border-b border-gray-100">
            <Activity className="text-Secondary" size={18} />
            <h2 className="text-sm font-extrabold uppercase tracking-wide">Client Directory</h2>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by case or parent..."
              value={caseSearch}
              onChange={(e) => setCaseSearch(e.target.value)}
              className="w-full bg-gray-550 bg-[#F4F4F4] rounded-xl pl-9 pr-4 py-2 text-xs text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {isLoadingCases ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2 text-xs text-gray-400 font-semibold">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-Primary"></div>
                <span>Loading directory...</span>
              </div>
            ) : isErrorCases ? (
              <div className="text-center py-6 text-red-500 font-semibold text-xs bg-red-50 rounded-xl">
                Failed to load directory.
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium text-xs bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No cases found.
              </div>
            ) : (
              filteredCases.map((c) => {
                const isSelected = selectedCaseId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-Secondary bg-Secondary/[0.03] shadow-sm"
                        : "border-gray-50 hover:bg-gray-50/50 hover:border-gray-100"
                    }`}
                  >
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="text-xs font-bold text-Third truncate">{c.case_number}</span>
                      <span className="text-[11px] text-gray-500 font-semibold truncate">{c.parent?.name || "N/A"}</span>
                      <span className="text-[9px] font-extrabold text-Secondary bg-Primary/10 px-2 py-0.5 rounded w-fit mt-1 uppercase tracking-wider">
                        {c.service?.name}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`text-gray-400 shrink-0 transition-transform ${isSelected ? "text-Secondary translate-x-1" : ""}`} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Audit Panels */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {!selectedCaseId ? (
            <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[350px]">
              <div className="p-4 bg-Primary/20 text-[#76121F] rounded-full shadow-inner">
                <ClipboardList size={36} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-Third">Caseload Audit Details</h3>
                <p className="text-gray-400 text-xs mt-1.5 font-semibold max-w-[280px] leading-relaxed">
                  Select a clinical case from the client directory to start auditing target programs and logged session hours.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Selected Case Summary */}
              <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Auditing Caseload</span>
                  <span className="text-lg font-black text-Third mt-1">{activeCase?.case_number}</span>
                  <span className="text-xs font-semibold text-gray-500 mt-0.5">Parent Client: <strong className="text-Third">{activeCase?.parent?.name}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold border bg-Primary/10 text-Secondary uppercase tracking-wider">
                    {activeCase?.service?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${getStatusStyles(activeCase?.status)}`}>
                    {activeCase?.status}
                  </span>
                </div>
              </div>

              {/* Tabs Selector */}
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-gray-550 border-gray-100 shadow-sm w-fit self-start font-bold text-xs">
                <button
                  onClick={() => setActiveTab("programs")}
                  className={`px-5 py-2.5 rounded-xl transition-all ${
                    activeTab === "programs"
                      ? "bg-Secondary text-white shadow-sm"
                      : "text-gray-500 hover:text-Third"
                  }`}
                >
                  Assigned Programs ({programs.length})
                </button>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`px-5 py-2.5 rounded-xl transition-all ${
                    activeTab === "sessions"
                      ? "bg-Secondary text-white shadow-sm"
                      : "text-gray-500 hover:text-Third"
                  }`}
                >
                  Sessions Conducted ({sessions.length})
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === "programs" ? (
                /* PROGRAMS TAB */
                isLoadingPrograms ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-3xl border border-gray-50 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-Primary"></div>
                    <span className="text-xs text-gray-400 font-semibold">Loading assigned programs...</span>
                  </div>
                ) : isErrorPrograms ? (
                  <div className="text-center py-8 text-red-500 font-semibold text-xs bg-red-550 bg-red-50 rounded-3xl border border-gray-100">
                    Failed to fetch program targets.
                  </div>
                ) : programs.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-50 shadow-sm">
                    <p className="text-gray-400 font-medium text-xs">No learning programs assigned to this case.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base font-bold text-Third leading-snug">{program.title}</h3>
                              <span className="text-[10px] text-gray-400 font-semibold mt-1 block">
                                Type: {program.type || "N/A"}
                              </span>
                            </div>
                            <span className="bg-Primary/10 text-Secondary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                              {program.category}
                            </span>
                          </div>

                          <p className="text-gray-500 text-xs mt-3 leading-relaxed font-medium">
                            {program.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 pt-3 border-t border-gray-50 text-[11px]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400 font-bold">Level:</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getLevelStyles(program.level)}`}>
                                {program.level}
                              </span>
                            </div>
                            <div className="text-gray-400 font-medium">
                              Start: <strong className="text-gray-600">{program.start_date || "N/A"}</strong>
                            </div>
                          </div>

                          {program.employee && (
                            <div className="flex items-center gap-1.5 text-gray-400 mt-1 border-t border-dashed border-gray-100 pt-2">
                              <User size={13} className="text-gray-400" />
                              <span>Assigned RBT: <strong className="text-gray-600">{program.employee.name}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* SESSIONS TAB */
                isLoadingSessions ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-3xl border border-gray-50 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-Primary"></div>
                    <span className="text-xs text-gray-400 font-semibold">Loading session log history...</span>
                  </div>
                ) : isErrorSessions ? (
                  <div className="text-center py-8 text-red-500 font-semibold text-xs bg-red-50 rounded-3xl border border-gray-100">
                    Failed to fetch session clock logs.
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-50 shadow-sm">
                    <p className="text-gray-400 font-medium text-xs">No session clock records logged yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                              <User size={14} />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-Third">
                                {sess.employee?.name || "RBT Therapist"}
                              </h4>
                              <p className="text-[10px] text-gray-400 font-semibold">Therapist Clinician</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusStyles(sess.status)}`}>
                              {sess.status || "Clocked In"}
                            </span>
                            {sess.schedule?.session_type && (
                              <span className="bg-gray-150 text-gray-500 text-[9px] font-extrabold uppercase bg-gray-100 px-2.5 py-0.5 rounded-full">
                                {sess.schedule.session_type}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Session Hours Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-500">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clocked Start</span>
                            <div className="flex items-center gap-1.5 text-Third">
                              <Calendar size={13} className="text-gray-400" />
                              <span>{sess.start_time || "N/A"}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clocked End</span>
                            <div className="flex items-center gap-1.5 text-Third">
                              <Clock size={13} className="text-gray-400" />
                              <span>{sess.end_time || "Ongoing / In-progress"}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Session Location</span>
                            <div className="flex items-center gap-1.5 text-Third">
                              <MapPin size={13} className="text-gray-400" />
                              <span>{sess.clock_in_location || sess.schedule?.location || "N/A"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Session Notes if any */}
                        {sess.session_notes && (
                          <div className="bg-[#FAF6F7] p-4 rounded-2xl border border-gray-100 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                              <FileText size={12} className="text-Secondary" /> RBT Session Notes
                            </span>
                            <blockquote className="text-xs text-gray-600 font-medium italic leading-relaxed">
                              "{sess.session_notes}"
                            </blockquote>
                          </div>
                        )}

                        {/* Signatures */}
                        {(sess.parent_signature || sess.employee_signature) && (
                          <div className="flex flex-wrap gap-6 mt-2 pt-4 border-t border-dashed border-gray-100">
                            {sess.parent_signature && (
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Parent Signature</span>
                                <div className="bg-white border border-gray-100 rounded-2xl p-2.5 h-20 w-44 flex items-center justify-center shadow-inner">
                                  <img
                                    src={sess.parent_signature}
                                    alt="Parent Signature"
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              </div>
                            )}

                            {sess.employee_signature && (
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Therapist Signature</span>
                                <div className="bg-white border border-gray-100 rounded-2xl p-2.5 h-20 w-44 flex items-center justify-center shadow-inner">
                                  <img
                                    src={sess.employee_signature}
                                    alt="Therapist Signature"
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audit;
