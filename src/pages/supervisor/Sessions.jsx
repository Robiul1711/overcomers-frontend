import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check, Eye, EyeOff, Loader2, Award, MapPin, Clock as ClockIcon, FileText, User, Trash2, Download } from "lucide-react";
import TableSkeleton from "@/components/common/TableSkeleton";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Sessions = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const axiosSecure = useAxiosSecure();
  const [downloadingSessionId, setDownloadingSessionId] = useState(null);

  const { data, isLoading, isError } = useClient({
    queryKey: ["supervisorPendingSessions"],
    url: "/supervisor/sessions/pending-approval",
  });

  const { mutate: approveSession, isPending: isApproving } = useMutationClient({
    url: (id) => `/supervisor/sessions/${id}/approve`,
    method: "post",
    invalidateKeys: [["supervisorPendingSessions"]],
    successMessage: "Session approved successfully",
  });

  const { mutate: rejectSession, isPending: isRejecting } = useMutationClient({
    url: (id) => `/supervisor/sessions/${id}/reject`,
    method: "post",
    invalidateKeys: [["supervisorPendingSessions"]],
    successMessage: "Session rejected successfully",
  });

  const sessionsList = data?.data?.data || [];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApprove = (id) => {
    approveSession(id);
  };

  const handleReject = (id) => {
    rejectSession({ id: id, data: { id: id } });
  };

  const handleDownloadPDF = async (sessionId, clientName) => {
    setDownloadingSessionId(sessionId);
    try {
      const response = await axiosSecure.get(
        `/supervisor/sessions/${sessionId}/download-pdf`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const cleanName = clientName ? clientName.replace(/[^a-z0-9]/gi, "_").toLowerCase() : `session-${sessionId}`;
      link.setAttribute("download", `${cleanName}_session_${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded successfully");
    } catch (err) {
      console.error("Failed to download PDF:", err);
      toast.error("Failed to download PDF");
    } finally {
      setDownloadingSessionId(null);
    }
  };

  const formatSignatureSrc = (sig) => {
    if (!sig) return null;
    if (sig.startsWith("data:")) return sig;
    return `data:image/jpeg;base64,${sig}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    try {
      const date = new Date(timeStr.replace(" ", "T"));
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full font-poppins text-Third  w-full">
      {/* Table Container */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        <div className="mb-8">
          <h3 className="text-[20px] md:text-[24px] font-bold text-Third">Pending Sessions</h3>
          <p className="text-gray-500 text-[13px] md:text-[14px] mt-1">
            Review and approve therapist sessions awaiting validation ({sessionsList?.length} total)
          </p>
        </div>

        {isLoading ? (
          <TableSkeleton rows={6} columns={7} />
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Failed to load pending sessions. Please try again later.
          </div>
        ) : sessionsList?.length === 0 ? (
          <div className="bg-gray-50/50 rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <Award className="mx-auto text-Secondary mb-3 opacity-80 animate-bounce" size={40} />
            <p className="text-gray-400 font-bold text-lg">All caught up!</p>
            <p className="text-gray-400 text-sm mt-1">No sessions are currently pending approval.</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider rounded-tl-xl w-[50px]"></th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                    Therapist (RBT)
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                    Case Number
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider text-center">
                    Actions
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider text-center">
                    Download & Remove
                  </th>
                  <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider text-center rounded-tr-xl">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sessionsList?.map((item) => {
                  const isExpanded = !!expandedRows[item.id];
                  const client = item?.schedule?.clinical_case?.parent || {};
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`hover:bg-gray-50/30 transition-colors ${isExpanded ? "bg-Secondary/[0.01]" : ""}`}>
                        <td className="py-5 px-6">
                          <button
                            onClick={() => toggleRow(item.id)}
                            className="text-gray-400 hover:text-Secondary transition-colors"
                          >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </td>
                        <td className="py-5 px-6 font-bold text-Third text-[14px]">
                          {item?.employee?.name || "N/A"}
                        </td>
                        <td className="py-5 px-6 text-gray-600 text-[14px] font-semibold">
                          {client?.name || "N/A"}
                        </td>
                        <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">
                          {item?.schedule?.clinical_case?.case_number || "N/A"}
                        </td>
                        <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">
                          {formatTime(item?.start_time)}
                        </td>
                        <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">
                          {item?.schedule?.location || "N/A"}
                        </td>
                        <td className="py-5 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleApprove(item.id)}
                              disabled={item?.status === "in_progress" || item?.status === "Approved" || isApproving || isRejecting}
                              className={`h-9 px-4 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 ${
                                item?.status === "Approved"
                                  ? "bg-green-50 text-green-700 border border-green-200 cursor-not-allowed"
                                  : item?.status === "in_progress"
                                  ? "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed"
                                  : "bg-Secondary hover:bg-Secondary/90 text-white disabled:opacity-50"
                              }`}
                            >
                              <Check size={14} />
                              <span>
                                {item?.status === "Approved"
                                  ? "Approved"
                                  : item?.status === "in_progress"
                                  ? "In Progress"
                                  : "Approve"}
                              </span>
                            </button>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDownloadPDF(item.id, client?.name)}
                              disabled={downloadingSessionId === item.id}
                              className="h-9 px-3 border border-Primary bg-Primary/10 hover:bg-Primary/20 text-[#B45309] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloadingSessionId === item.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Download size={14} />
                              )}
                              <span>PDF</span>
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              disabled={item?.status === "in_progress" || item?.status === "Approved" || isApproving || isRejecting}
                              className="h-9 px-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject/Delete Session"
                            >
                              {isRejecting ? (
                                <Loader2 size={14} className="animate-spin text-red-500" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                              <span>Reject</span>
                            </button>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => toggleRow(item.id)}
                              className="h-9 px-3 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs font-semibold whitespace-nowrap"
                            >
                              {isExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
                              <span>{isExpanded ? "Hide" : "View"}</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={9} className="p-4 bg-Secondary/[0.01] border-t border-gray-50">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              
                              {/* Session Notes */}
                              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                                <span className="flex items-center gap-2 text-Secondary font-bold text-xs uppercase tracking-wider">
                                  <FileText size={14} /> Session Notes
                                </span>
                                <div className="bg-gray-50 p-4 rounded-xl text-sm leading-relaxed text-gray-600 flex-grow max-h-[150px] overflow-y-auto custom-scrollbar">
                                  {item?.session_notes || <span className="italic text-gray-400">No session notes provided.</span>}
                                </div>
                              </div>

                              {/* Locations and Signatures */}
                              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                <span className="flex items-center gap-2 text-Secondary font-bold text-xs uppercase tracking-wider">
                                  <MapPin size={14} /> Session Metadata
                                </span>
                                <div className="flex flex-col gap-3 text-xs text-gray-600">
                                  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                    <span className="font-bold text-gray-400">Clock-In Location:</span>
                                    <span className="font-semibold text-Third">{item?.clock_in_location || "N/A"}</span>
                                  </div>
                                  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                    <span className="font-bold text-gray-400">Clock-Out Location:</span>
                                    <span className="font-semibold text-Third">{item?.clock_out_location || "N/A"}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-gray-400">Session Type:</span>
                                    <span className="font-semibold text-Third">{item?.schedule?.session_type || "N/A"}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Signatures */}
                              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                <span className="flex items-center gap-2 text-Secondary font-bold text-xs uppercase tracking-wider">
                                  <User size={14} /> Verification Signatures
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Parent Signature</span>
                                    <div className="border border-gray-100 rounded-xl p-2 bg-gray-50/50 flex items-center justify-center min-h-[70px] max-h-[80px]">
                                      {item?.parent_signature ? (
                                        <img
                                          src={formatSignatureSrc(item.parent_signature)}
                                          alt="Parent Signature"
                                          className="max-h-[60px] max-w-full object-contain"
                                        />
                                      ) : (
                                        <span className="text-[10px] text-gray-400 italic">Unsigned</span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">RBT Signature</span>
                                    <div className="border border-gray-100 rounded-xl p-2 bg-gray-50/50 flex items-center justify-center min-h-[70px] max-h-[80px]">
                                      {item?.employee_signature ? (
                                        <img
                                          src={formatSignatureSrc(item.employee_signature)}
                                          alt="RBT Signature"
                                          className="max-h-[60px] max-w-full object-contain"
                                        />
                                      ) : (
                                        <span className="text-[10px] text-gray-400 italic">Unsigned</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
