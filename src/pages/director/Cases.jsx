import React, { useState } from "react";
import { ChevronDown, Check, User, Shield, UserCheck, MapPin, Search, ChevronLeft, ChevronRight, Loader2, HelpCircle, Mail, Phone, Clock, Calendar, Trash2, AlertTriangle } from "lucide-react";
import TableSkeleton from "@/components/common/TableSkeleton";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Cases = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Assign staff modal states
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [assignedSupervisorId, setAssignedSupervisorId] = useState("");
  const [assignedEmployeeId, setAssignedEmployeeId] = useState("");

  // Case details modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsCase, setDetailsCase] = useState(null);

  // Delete case states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  const handleOpenDetailsModal = (caseItem) => {
    setDetailsCase(caseItem);
    setIsDetailsModalOpen(true);
  };

  const handleOpenDeleteModal = (caseItem) => {
    setCaseToDelete(caseItem);
    setIsDeleteModalOpen(true);
  };

  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["directorCases", page, selectedStatus],
    url: "/director/cases",
    params: {
      page,
      status: selectedStatus === "All Statuses" ? undefined : selectedStatus,
    },
  });

  const casesObject = resData?.data?.cases || {};
  const casesList = casesObject.data || [];
  const supervisors = resData?.data?.supervisors || [];
  const employees = resData?.data?.employees || []; // RBTs

  // Staff Assignment Mutation
  const { mutate: assignStaff, isPending: isAssigning } = useMutationClient({
    url: (caseId) => `/director/cases/${caseId}/assign`,
    method: "post",
    invalidateKeys: [["directorCases", page, selectedStatus]],
    successMessage: "Staff assignment updated successfully",
  });

  // Delete Case Mutation
  const { mutate: deleteCase, isPending: isDeleting } = useMutationClient({
    url: (caseId) => `/director/cases/${caseId}`,
    method: "delete",
    invalidateKeys: [["directorCases", page, selectedStatus]],
    successMessage: "Case deleted successfully",
  });

  const statuses = ["All Statuses", "Active", "Pending", "Completed"];

  // Filter clients locally for search keyword
  const filteredCases = casesList.filter((item) => {
    const searchLower = search.toLowerCase();
    const caseNum = item.case_number?.toLowerCase() || "";
    const parentName = item.parent?.name?.toLowerCase() || "";
    const serviceName = item.service?.name?.toLowerCase() || "";
    const supervisorName = item.supervisor?.name?.toLowerCase() || "";
    const employeeName = item.employee?.name?.toLowerCase() || "";
    const loc = item.location?.toLowerCase() || "";

    return (
      caseNum.includes(searchLower) ||
      parentName.includes(searchLower) ||
      serviceName.includes(searchLower) ||
      supervisorName.includes(searchLower) ||
      employeeName.includes(searchLower) ||
      loc.includes(searchLower)
    );
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100/70 text-green-600 border-green-100";
      case "Pending":
        return "bg-orange-100/70 text-orange-600 border-orange-100";
      case "Completed":
        return "bg-blue-100/70 text-blue-500 border-blue-100";
      default:
        return "bg-gray-100 text-gray-600 border-gray-100";
    }
  };

  const handleOpenAssignModal = (caseItem) => {
    setSelectedCase(caseItem);
    setAssignedSupervisorId(caseItem.supervisor_id?.toString() || "");
    setAssignedEmployeeId(caseItem.employee_id?.toString() || "");
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = () => {
    if (!selectedCase) return;

    assignStaff(
      {
        id: selectedCase.id,
        data: {
          supervisor_id: assignedSupervisorId ? assignedSupervisorId.toString() : "",
          employee_id: assignedEmployeeId ? assignedEmployeeId.toString() : "",
        },
      },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
          setSelectedCase(null);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!caseToDelete) return;

    deleteCase(
      {
        id: caseToDelete.id,
      },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setCaseToDelete(null);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full font-poppins">
      {/* Table Container */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[22px] md:text-[26px] font-extrabold text-Third">Managed Cases</h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 font-medium">
              Oversee and assign supervisors (BCBAs) and therapists (RBTs) to clients.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search cases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F8F9FA] rounded-xl pl-10 pr-4 py-2 text-xs text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between gap-2 w-full sm:w-auto bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
              >
                <span className="flex items-center gap-1.5">
                  <span className="opacity-70 font-medium">Filter:</span> {selectedStatus}
                </span>
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 top-[110%] w-full sm:w-[180px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-20 flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
                    {statuses.map((status) => {
                      const isSelected = selectedStatus === status;
                      return (
                        <div
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status);
                            setPage(1);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all text-xs font-semibold ${
                            isSelected
                              ? "bg-Secondary text-white font-bold"
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

        {/* Loading / Error States */}
        {isLoading ? (
          <TableSkeleton rows={6} columns={7} />
        ) : isError ? (
          <div className="text-center py-12 text-red-500 font-semibold bg-red-50/50 rounded-2xl border border-dashed border-red-200">
            Failed to load clinical cases. Please try again later.
          </div>
        ) : (
          <div className="flex flex-col justify-between flex-1">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider rounded-tl-2xl">
                      Client / Parent
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Case Number
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Clinical Service
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Assigned Supervisor
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Assigned RBT
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider rounded-tr-2xl text-center">
                      Caseload Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredCases.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400 font-medium bg-gray-50/20">
                        No active case records matches filters.
                      </td>
                    </tr>
                  ) : (
                    filteredCases.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                        {/* Client details */}
                        <td className="py-5 px-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-Third text-[14px]">
                              {item.parent?.name || "N/A"}
                            </span>
                            <span className="text-gray-400 text-xs font-medium">
                              {item.parent?.email || "No Email"}
                            </span>
                          </div>
                        </td>

                        {/* Case Number */}
                        <td className="py-5 px-6 font-semibold text-gray-700 text-xs">
                          {item.case_number}
                        </td>

                        {/* Clinical Service */}
                        <td className="py-5 px-6 text-gray-600 text-xs font-semibold">
                          {item.service?.name || "N/A"}
                        </td>

                        {/* Assigned Supervisor */}
                        <td className="py-5 px-6">
                          {item.supervisor ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                <Shield className="text-indigo-600" size={12} />
                              </div>
                              <span className="text-gray-700 text-xs font-bold truncate max-w-[150px]" title={item.supervisor.name}>
                                {item.supervisor.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs font-medium italic">Unassigned</span>
                          )}
                        </td>

                        {/* Assigned RBT */}
                        <td className="py-5 px-6">
                          {item.employee ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                                <UserCheck className="text-purple-600" size={12} />
                              </div>
                              <span className="text-gray-700 text-xs font-bold truncate max-w-[150px]" title={item.employee.name}>
                                {item.employee.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs font-medium italic">Unassigned</span>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                            <MapPin size={14} className="text-gray-400" />
                            <span>{item.location || "N/A"}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-5 px-6 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyles(
                              item.status
                            )}`}
                          >
                            {item.status || "Inactive"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-5 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenDetailsModal(item)}
                              className="px-3.5 py-2 bg-Primary text-[#76121F] font-bold text-xs rounded-xl hover:bg-Primary/95 transition-all shadow-sm active:scale-95 whitespace-nowrap animate-all"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleOpenAssignModal(item)}
                              className="px-3.5 py-2 border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-sm whitespace-nowrap"
                            >
                              Assign Staff
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(item)}
                              className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 shadow-sm shrink-0"
                              title="Delete Case"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination block */}
            {casesObject.last_page > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6 text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-gray-400 font-medium">
                  Page {page} of {casesObject.last_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(casesObject.last_page, p + 1))}
                  disabled={page >= casesObject.last_page}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile horizontal scroll helper */}
        <div className="lg:hidden mt-4 py-3 px-4 bg-gray-50/50 rounded-xl text-center">
          <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view complete caseload records</p>
        </div>
      </div>

      {/* DIALOG: Assign Staff Modal */}
      <Dialog
        open={isAssignModalOpen}
        onOpenChange={(open) => {
          setIsAssignModalOpen(open);
          if (!open) {
            setSelectedCase(null);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white">
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-Third leading-tight">
                Staff Caseload Assignment
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Assign a clinical supervisor (BCBA) and therapist (RBT) to case <strong className="text-Third">{selectedCase?.case_number}</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Supervisor Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px] flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-600" />
                  Clinical Supervisor (BCBA)
                </label>
                <div className="relative">
                  <select
                    value={assignedSupervisorId}
                    onChange={(e) => setAssignedSupervisorId(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="">Unassigned</option>
                    {supervisors.map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name} ({sup.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RBT Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px] flex items-center gap-1.5">
                  <UserCheck size={14} className="text-purple-600" />
                  Behavior Technician (RBT)
                </label>
                <div className="relative">
                  <select
                    value={assignedEmployeeId}
                    onChange={(e) => setAssignedEmployeeId(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="">Unassigned</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedCase(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={isAssigning}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAssigning ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Saving...
                  </>
                ) : (
                  "Save Assignment"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Case Details Modal */}
      <Dialog
        open={isDetailsModalOpen}
        onOpenChange={(open) => {
          setIsDetailsModalOpen(open);
          if (!open) {
            setDetailsCase(null);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[750px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-black text-Third leading-tight">
                    Case {detailsCase?.case_number}
                  </h2>
                  {detailsCase?.status && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border bg-green-50 text-green-700 border-green-200">
                      {detailsCase.status}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-1.5 font-semibold">
                  Service: <strong className="text-Third">{detailsCase?.service?.name || "N/A"}</strong>
                </p>
              </div>

              {detailsCase?.start_date && (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#FAF6F7] px-3.5 py-2 rounded-xl border border-gray-50 self-start md:self-auto font-medium">
                  <Calendar size={15} className="text-Secondary" />
                  <span>Start Date: <strong className="text-Third">{detailsCase.start_date}</strong></span>
                </div>
              )}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Client (Parent) Information */}
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100">
                  <div className="p-2 bg-Primary/20 text-[#76121F] rounded-xl shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-Third uppercase tracking-wide">Client (Parent) Info</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</span>
                    <span className="text-xs font-bold text-Third mt-0.5 block">{detailsCase?.parent?.name || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-gray-600 block truncate">{detailsCase?.parent?.email || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-gray-600 block">{detailsCase?.parent?.phone_number || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-gray-600 block truncate">{detailsCase?.location || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Assignments */}
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100">
                  <div className="p-2 bg-Primary/20 text-[#76121F] rounded-xl shrink-0">
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-Third uppercase tracking-wide">Staff Caseload</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Supervisor */}
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Supervisor (BCBA)</span>
                    {detailsCase?.supervisor ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                          <Shield className="text-indigo-600" size={10} />
                        </div>
                        <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]" title={detailsCase.supervisor.name}>
                          {detailsCase.supervisor.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 italic block mt-0.5">Unassigned</span>
                    )}
                  </div>

                  {/* Employee RBT */}
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Behavior Therapist (RBT)</span>
                    {detailsCase?.employee ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                          <UserCheck className="text-purple-600" size={10} />
                        </div>
                        <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]" title={detailsCase.employee.name}>
                          {detailsCase.employee.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 italic block mt-0.5">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Session Schedule Hours & Frequency */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-Primary/20 text-[#76121F] rounded-xl shrink-0">
                    <Clock size={16} />
                  </div>
                  <h3 className="text-xs font-black text-Third uppercase tracking-wide">Weekly Caseload Hours</h3>
                </div>
                <span className="text-[11px] font-bold text-Secondary bg-Primary/10 px-2.5 py-1 rounded-lg">
                  {detailsCase?.frequency || 0} Session(s) / Week
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Daily Caseload Window</span>
                  <div className="flex items-center gap-1.5 mt-1 font-semibold text-xs">
                    <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md text-Third">
                      {detailsCase?.session_start_time || "00:00"}
                    </span>
                    <span className="text-gray-400 text-[10px] font-bold">to</span>
                    <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md text-Third">
                      {detailsCase?.session_end_time || "00:00"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Caseload Location</span>
                  <span className="text-xs font-bold text-Third mt-1.5 block">{detailsCase?.location || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Schedules Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Clock className="text-Secondary" size={16} />
                <h3 className="text-xs font-black text-Third uppercase tracking-wide">Day-by-Day Session Schedules</h3>
              </div>

              {!detailsCase?.schedules || detailsCase.schedules.length === 0 ? (
                <div className="text-center py-6 text-gray-400 font-medium text-xs bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  No session schedules defined yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {detailsCase.schedules.map((sched) => {
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
                        className={`${cardBgClass} p-3.5 rounded-xl border flex flex-col gap-2`}
                      >
                        <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                          <span className="font-bold text-xs text-Third">{sched.day_of_week}</span>
                          <span className="bg-Primary/10 text-Secondary text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                            {sched.session_type || "ONE-TO-ONE"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px] text-gray-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400 shrink-0" />
                            <span className="truncate">{sched.start_time?.slice(0, 5)} - {sched.end_time?.slice(0, 5)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-400 shrink-0" />
                            <span className="truncate">{sched.location || "N/A"}</span>
                          </div>
                          {sessionStatus && (
                            <div className="mt-1 pt-1.5 border-t border-gray-50 flex items-center justify-between">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Status</span>
                              <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase border ${
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

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-gray-100 mt-2">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setDetailsCase(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Delete Case Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) {
            setCaseToDelete(null);
          }
        }}
      >
        <DialogContent className="max-w-[90vw] sm:max-w-[420px] p-6 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <div className="flex flex-col items-center text-center gap-5 bg-white">
            <div className="w-[60px] h-[60px] bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-inner">
              <AlertTriangle size={30} />
            </div>
            
            <div>
              <h3 className="text-lg font-black text-Third leading-tight">Delete Case?</h3>
              <p className="text-gray-400 text-xs mt-2 font-medium leading-relaxed px-2">
                Are you sure you want to permanently delete case <strong className="text-Third">{caseToDelete?.case_number}</strong>? This action is irreversible.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCaseToDelete(null);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Deleting...
                  </>
                ) : (
                  "Delete Case"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cases;
