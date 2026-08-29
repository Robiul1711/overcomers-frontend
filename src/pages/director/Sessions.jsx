import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Award,
  MapPin,
  Clock as ClockIcon,
  FileText,
  User,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileDown,
} from "lucide-react";
import TableSkeleton from "@/components/common/TableSkeleton";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatTimeWithZone, DEFAULT_TIMEZONE_LABEL } from "@/utils/timeUtils";

const Sessions = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [search, setSearch] = useState("");
  const [downloadingSessionId, setDownloadingSessionId] = useState(null);
  const [isDownloadingPendingPdf, setIsDownloadingPendingPdf] = useState(false);
  const [rejectingSession, setRejectingSession] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useClient({
    queryKey: ["directorPendingSessions"],
    url: "/director/sessions/pending-approval",
  });

  const { mutate: approveSession, isPending: isApproving } = useMutationClient({
    url: (id) => `/director/sessions/${id}/approve`,
    method: "post",
    invalidateKeys: [["directorPendingSessions"], ["directorDashboard"]],
    successMessage: "Session approved successfully",
  });

  const { mutate: rejectSession, isPending: isRejecting } = useMutationClient({
    url: (id) => `/director/sessions/${id}/reject`,
    method: "post",
    invalidateKeys: [["directorPendingSessions"], ["directorDashboard"]],
    successMessage: "Session rejected successfully",
    onSuccess: () => {
      setRejectingSession(null);
    },
  });

  const rawSessions = data?.data?.data || (Array.isArray(data?.data) ? data.data : []);
  const sessionsList = Array.isArray(rawSessions) ? rawSessions : [];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApprove = (id) => {
    approveSession(id);
  };

  const handleConfirmReject = () => {
    if (!rejectingSession) return;
    rejectSession({ id: rejectingSession.id, data: { id: rejectingSession.id } });
  };

  const handleDownloadPendingPDF = async () => {
    setIsDownloadingPendingPdf(true);
    try {
      const response = await axiosSecure.get(
        "/director/sessions/pending-approval/download-pdf",
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `pending_session_approvals_${dateStr}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Pending sessions PDF report downloaded successfully");
    } catch (err) {
      console.error("Failed to download PDF report:", err);
      toast.error("Failed to download pending sessions PDF report");
    } finally {
      setIsDownloadingPendingPdf(false);
    }
  };

  const handleDownloadIndividualPDF = async (sessionId, clientName) => {
    setDownloadingSessionId(sessionId);
    try {
      const response = await axiosSecure.get(
        `/director/sessions/${sessionId}/download-pdf`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      const cleanName = clientName
        ? clientName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : `session-${sessionId}`;
      link.setAttribute("download", `${cleanName}_session_${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Session PDF downloaded successfully");
    } catch (err) {
      console.error("Failed to download individual PDF, trying general report:", err);
      toast.error("Failed to download individual session PDF");
    } finally {
      setDownloadingSessionId(null);
    }
  };

  const formatSignatureSrc = (sig) => {
    if (!sig) return null;
    if (sig.startsWith("data:")) return sig;
    return `data:image/jpeg;base64,${sig}`;
  };

  const formatTime = (timeStr, customTz) => {
    return formatTimeWithZone(timeStr, customTz);
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "—";
    try {
      const start = new Date(startTime.includes("T") ? startTime : startTime.replace(" ", "T"));
      const end = new Date(endTime.includes("T") ? endTime : endTime.replace(" ", "T"));
      const diffMs = end - start;
      if (isNaN(diffMs) || diffMs < 0) return "—";
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${mins}m`;
    } catch {
      return "—";
    }
  };

  // Search Filter
  const filteredSessions = sessionsList.filter((item) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    const employeeName = item?.employee?.name?.toLowerCase() || "";
    const clientName = item?.schedule?.clinical_case?.parent?.name?.toLowerCase() || "";
    const caseNumber = item?.schedule?.clinical_case?.case_number?.toLowerCase() || "";
    const location = item?.schedule?.location?.toLowerCase() || "";
    const notes = item?.session_notes?.toLowerCase() || "";

    return (
      employeeName.includes(query) ||
      clientName.includes(query) ||
      caseNumber.includes(query) ||
      location.includes(query) ||
      notes.includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 h-full font-poppins text-Third w-full">
      {/* Table Container Card */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[22px] md:text-[26px] font-extrabold text-Third">
              Session Notes Approval
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 font-medium">
              Review and approve therapist session logs awaiting clinical validation ({sessionsList?.length} total)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by therapist, client, case..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F8F9FA] rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
              />
            </div>

            {/* Download PDF Report Button */}
            <button
              onClick={handleDownloadPendingPDF}
              disabled={isDownloadingPendingPdf || sessionsList.length === 0}
              className="flex items-center justify-center gap-2 bg-[#76121F] hover:bg-[#76121F]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              title="Download PDF Report of all pending sessions"
            >
              {isDownloadingPendingPdf ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <FileDown size={15} />
              )}
              <span>Export PDF Report</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <TableSkeleton rows={6} columns={8} />
        ) : isError ? (
          <div className="text-center py-12 text-red-500 font-semibold bg-red-50/50 rounded-2xl border border-dashed border-red-200">
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
            <table className="w-full text-left border-collapse min-w-[950px]">
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
                    Duration
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
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-400 font-medium bg-gray-50/20">
                      No pending sessions match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((item) => {
                    const isExpanded = !!expandedRows[item.id];
                    const client = item?.schedule?.clinical_case?.parent || {};
                    const isSessionApproving = isApproving;
                    const isSessionRejecting = isRejecting && rejectingSession?.id === item.id;
                    const durationText = calculateDuration(item?.start_time, item?.end_time);

                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          className={`hover:bg-gray-50/30 transition-colors ${
                            isExpanded ? "bg-Secondary/[0.01]" : ""
                          }`}
                        >
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
                            {formatTime(
                              item?.start_time,
                              item?.schedule?.time_zone || item?.time_zone || item?.timezone
                            )}
                          </td>
                          <td className="py-5 px-6 text-gray-500 text-[13px] font-semibold whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs border border-amber-100 font-bold">
                              {durationText}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">
                            {item?.schedule?.location || item?.clock_in_location || "N/A"}
                          </td>
                          <td className="py-5 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleApprove(item.id)}
                                disabled={
                                  item?.status === "in_progress" ||
                                  item?.status === "Approved" ||
                                  isSessionApproving ||
                                  isSessionRejecting
                                }
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
                                onClick={() => handleDownloadIndividualPDF(item.id, client?.name)}
                                disabled={downloadingSessionId === item.id}
                                className="h-9 px-3 border border-Primary bg-Primary/10 hover:bg-Primary/20 text-[#B45309] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Download PDF for this session"
                              >
                                {downloadingSessionId === item.id ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <Download size={14} />
                                )}
                                <span>PDF</span>
                              </button>
                              <button
                                onClick={() => setRejectingSession(item)}
                                disabled={
                                  item?.status === "in_progress" ||
                                  item?.status === "Approved" ||
                                  isSessionApproving ||
                                  isSessionRejecting
                                }
                                className="h-9 px-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 text-xs font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reject Session"
                              >
                                <Trash2 size={14} />
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

                        {/* Expanded Details Section */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={10} className="p-4 bg-Secondary/[0.01] border-t border-gray-50">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                
                                {/* Session Notes */}
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                                  <span className="flex items-center gap-2 text-Secondary font-bold text-xs uppercase tracking-wider">
                                    <FileText size={14} /> Session Notes
                                  </span>
                                  <div className="bg-gray-50 p-4 rounded-xl text-sm leading-relaxed text-gray-600 flex-grow max-h-[160px] overflow-y-auto custom-scrollbar">
                                    {item?.session_notes || (
                                      <span className="italic text-gray-400">
                                        No session notes provided.
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Session Metadata */}
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                  <span className="flex items-center gap-2 text-Secondary font-bold text-xs uppercase tracking-wider">
                                    <MapPin size={14} /> Session Metadata
                                  </span>
                                  <div className="flex flex-col gap-3 text-xs text-gray-600">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                      <span className="font-bold text-gray-400">Clock-In Time:</span>
                                      <span className="font-semibold text-Third">
                                        {formatTime(
                                          item?.start_time,
                                          item?.schedule?.time_zone || item?.time_zone || item?.timezone
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                      <span className="font-bold text-gray-400">Clock-Out Time:</span>
                                      <span className="font-semibold text-Third">
                                        {formatTime(
                                          item?.end_time,
                                          item?.schedule?.time_zone || item?.time_zone || item?.timezone
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                      <span className="font-bold text-gray-400">Clock-In Location:</span>
                                      <span className="font-semibold text-Third">
                                        {item?.clock_in_location || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                      <span className="font-bold text-gray-400">Clock-Out Location:</span>
                                      <span className="font-semibold text-Third">
                                        {item?.clock_out_location || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                      <span className="font-bold text-gray-400">Timezone:</span>
                                      <span className="font-bold text-Secondary bg-Secondary/10 px-2 py-0.5 rounded-md text-[11px]">
                                        {(item?.schedule?.time_zone && item?.schedule?.time_zone !== "Asia/Dhaka")
                                          ? item.schedule.time_zone
                                          : (item?.time_zone && item?.time_zone !== "Asia/Dhaka")
                                          ? item.time_zone
                                          : (item?.timezone && item?.timezone !== "Asia/Dhaka")
                                          ? item.timezone
                                          : (item?.schedule?.clinical_case?.timezone && item?.schedule?.clinical_case?.timezone !== "Asia/Dhaka")
                                          ? item.schedule.clinical_case.timezone
                                          : DEFAULT_TIMEZONE_LABEL}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-gray-400">Session Type:</span>
                                      <span className="font-semibold text-Third">
                                        {item?.schedule?.session_type || "Direct 1:1 Therapy"}
                                      </span>
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
                                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                                        Parent Signature
                                      </span>
                                      <div className="border border-gray-100 rounded-xl p-2 bg-gray-50/50 flex items-center justify-center min-h-[70px] max-h-[80px]">
                                        {item?.parent_signature ? (
                                          <img
                                            src={formatSignatureSrc(item.parent_signature)}
                                            alt="Parent Signature"
                                            className="max-h-[60px] max-w-full object-contain"
                                          />
                                        ) : (
                                          <span className="text-[10px] text-gray-400 italic">
                                            Unsigned
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                                        RBT Signature
                                      </span>
                                      <div className="border border-gray-100 rounded-xl p-2 bg-gray-50/50 flex items-center justify-center min-h-[70px] max-h-[80px]">
                                        {item?.employee_signature ? (
                                          <img
                                            src={formatSignatureSrc(item.employee_signature)}
                                            alt="RBT Signature"
                                            className="max-h-[60px] max-w-full object-contain"
                                          />
                                        ) : (
                                          <span className="text-[10px] text-gray-400 italic">
                                            Unsigned
                                          </span>
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
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Confirmation Dialog */}
      <Dialog
        open={!!rejectingSession}
        onOpenChange={(open) => {
          if (!open) setRejectingSession(null);
        }}
      >
        <DialogContent className="max-w-[90vw] sm:max-w-[460px] p-6 rounded-[24px] bg-white border-none shadow-2xl">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2 mx-auto sm:mx-0">
              <AlertCircle size={24} />
            </div>
            <DialogTitle className="text-lg font-extrabold text-Third">
              Reject Session Note?
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
              Are you sure you want to reject this session entry for{" "}
              <strong>
                {rejectingSession?.employee?.name || "Therapist"}
              </strong>{" "}
              (Client:{" "}
              <strong>
                {rejectingSession?.schedule?.clinical_case?.parent?.name || "Client"}
              </strong>
              )? This action will reject the session from the approval queue.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setRejectingSession(null)}
              disabled={isRejecting}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReject}
              disabled={isRejecting}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {isRejecting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              <span>Confirm Reject</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sessions;
