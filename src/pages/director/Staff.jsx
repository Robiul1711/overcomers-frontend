import React, { useState } from "react";
import { ChevronDown, Check, User, Shield, UserCheck, Search, ChevronLeft, ChevronRight, Loader2, Mail, Phone, Clock, DollarSign, Calendar, MapPin, BadgeCheck, X, Layers } from "lucide-react";
import TableSkeleton from "@/components/common/TableSkeleton";
import useClient from "@/hooks/useClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Staff = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Single staff details states
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Fetch staff list
  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["directorStaffList", page],
    url: "/director/staff",
    params: { page },
  });

  const staffObject = resData?.data || {};
  const staffList = staffObject.data || [];

  // Fetch selected staff details
  const { data: detailRes, isLoading: isLoadingDetail } = useClient({
    queryKey: ["directorStaffDetails", selectedStaffId],
    url: `/director/staff/${selectedStaffId}`,
    enabled: !!selectedStaffId && isDetailsOpen,
  });

  const staffDetails = detailRes?.data?.staff || {};
  const assignedCases = detailRes?.data?.assigned_cases || [];

  const roles = ["All Roles", "Supervisors", "RBTs"];

  // Filter staff list locally
  const filteredStaff = staffList.filter((item) => {
    const searchLower = search.toLowerCase();
    const name = item.name?.toLowerCase() || "";
    const email = item.email?.toLowerCase() || "";
    const phone = item.phone_number?.toLowerCase() || "";
    const role = item.user_type?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchLower) ||
      email.includes(searchLower) ||
      phone.includes(searchLower);

    const matchesRole =
      roleFilter === "All Roles" ||
      (roleFilter === "Supervisors" && role === "supervisor") ||
      (roleFilter === "RBTs" && role === "employee");

    return matchesSearch && matchesRole;
  });

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  const getRoleLabel = (role) => {
    switch (role?.toLowerCase()) {
      case "supervisor":
        return { text: "BCBA Supervisor", icon: <Shield size={12} className="text-indigo-600" />, bg: "bg-indigo-50 border-indigo-100" };
      case "employee":
        return { text: "RBT Therapist", icon: <UserCheck size={12} className="text-purple-600" />, bg: "bg-purple-50 border-purple-100" };
      default:
        return { text: role || "Staff Member", icon: <User size={12} className="text-gray-600" />, bg: "bg-gray-50 border-gray-100" };
    }
  };

  const handleOpenDetails = (staffId) => {
    setSelectedStaffId(staffId);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 h-full font-poppins text-Third">
      {/* Directory Table Card */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[22px] md:text-[26px] font-extrabold text-Third">Staff Directory</h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 font-medium">
              View and audit clinic supervisors (BCBAs) and behavior technicians (RBTs).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search staff by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F8F9FA] rounded-xl pl-10 pr-4 py-2 text-xs text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
              />
            </div>

            {/* Filter dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between gap-2 w-full sm:w-auto bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
              >
                <span className="flex items-center gap-1.5">
                  <span className="opacity-70 font-medium">Role:</span> {roleFilter}
                </span>
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 top-[110%] w-full sm:w-[160px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-20 flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
                    {roles.map((role) => {
                      const isSelected = roleFilter === role;
                      return (
                        <div
                          key={role}
                          onClick={() => {
                            setRoleFilter(role);
                            setPage(1);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all text-xs font-semibold ${
                            isSelected
                              ? "bg-Secondary text-white font-bold"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {role}
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

        {/* Table list */}
        {isLoading ? (
          <TableSkeleton rows={6} columns={6} />
        ) : isError ? (
          <div className="text-center py-12 text-red-500 font-semibold bg-red-50/50 rounded-2xl border border-dashed border-red-200">
            Failed to load staff list. Please try again later.
          </div>
        ) : (
          <div className="flex flex-col justify-between flex-1">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider rounded-tl-2xl">
                      Staff Member
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Role
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Contact Phone
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider">
                      Hourly Rate
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="py-4 px-6 font-bold text-Third text-xs uppercase tracking-wider rounded-tr-2xl text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 font-medium bg-gray-50/20">
                        No staff records matched selection.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => {
                      const roleDetails = getRoleLabel(staff.user_type);
                      return (
                        <tr key={staff.id} className="hover:bg-gray-50/40 transition-colors">
                          {/* Name / Email */}
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              {staff.profile_picture ? (
                                <img
                                  src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/storage/${staff.profile_picture}`}
                                  alt={staff.name}
                                  className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
                                  }}
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-Primary/20 text-Secondary flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                                  {staff.name?.slice(0, 2)}
                                </div>
                              )}
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-Third text-[14px]">
                                  {staff.name}
                                </span>
                                <span className="text-gray-400 text-xs font-medium">
                                  {staff.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Role Badge */}
                          <td className="py-5 px-6">
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border w-fit font-bold text-[10px] uppercase tracking-wider ${roleDetails.bg}`}>
                              {roleDetails.icon}
                              <span>{roleDetails.text}</span>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-5 px-6 text-gray-600 text-xs font-semibold">
                            {staff.phone_number || "—"}
                          </td>

                          {/* Hourly Rate */}
                          <td className="py-5 px-6">
                            {staff.hourly_rate ? (
                              <div className="flex items-center gap-0.5 text-Third text-xs font-extrabold">
                                <DollarSign size={13} className="text-gray-400" />
                                <span>{staff.hourly_rate}/hr</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs font-semibold">Salaried / None</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-5 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyles(staff.status)}`}>
                              {staff.status || "Inactive"}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-5 px-6 text-center">
                            <button
                              onClick={() => handleOpenDetails(staff.id)}
                              className="px-4 py-2 border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-sm"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination block */}
            {staffObject.last_page > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6 text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-gray-400 font-medium">
                  Page {page} of {staffObject.last_page}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(staffObject.last_page, p + 1))}
                  disabled={page >= staffObject.last_page}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DIALOG: Staff Details Modal */}
      <Dialog
        open={isDetailsOpen}
        onOpenChange={(open) => {
          setIsDetailsOpen(open);
          if (!open) {
            setSelectedStaffId(null);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[700px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          {isLoadingDetail ? (
            <div className="p-16 flex flex-col items-center justify-center gap-3 bg-white min-h-[300px]">
              <Loader2 className="animate-spin text-Secondary" size={36} />
              <span className="text-xs text-gray-400 font-semibold">Loading staff credentials...</span>
            </div>
          ) : (
            <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* Header profile info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-gray-100">
                {staffDetails.profile_picture ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/storage/${staffDetails.profile_picture}`}
                    alt={staffDetails.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-Primary/30 shadow-sm shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-Primary/20 text-Secondary flex items-center justify-center font-bold text-lg shrink-0 uppercase border border-Primary/10">
                    {staffDetails.name?.slice(0, 2)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-extrabold text-Third leading-tight">{staffDetails.name}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getStatusStyles(staffDetails.status)}`}>
                      {staffDetails.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1.5 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Mail size={13} className="text-gray-400" />
                      <span>{staffDetails.email}</span>
                    </div>
                    {staffDetails.phone_number && (
                      <div className="flex items-center gap-1">
                        <Phone size={13} className="text-gray-400" />
                        <span>{staffDetails.phone_number}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio & Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Profile Details */}
                <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-4">
                  <h3 className="text-xs font-black text-Third uppercase tracking-wide pb-2 border-b border-gray-100 flex items-center gap-2">
                    <BadgeCheck size={15} className="text-Secondary" /> Personal Credentials
                  </h3>
                  
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Role Type</span>
                      <span className="font-bold text-Third mt-0.5 block uppercase">{staffDetails.user_type === "employee" ? "RBT Therapist" : "BCBA Supervisor"}</span>
                    </div>
                    {staffDetails.hourly_rate && (
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Hourly Billable Rate</span>
                        <span className="font-bold text-Third mt-0.5 block">${staffDetails.hourly_rate} USD</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Address Location</span>
                      <span className="font-medium text-gray-600 mt-0.5 block">{staffDetails.address || "No address defined"}</span>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-4">
                  <h3 className="text-xs font-black text-Third uppercase tracking-wide pb-2 border-b border-gray-100 flex items-center gap-2">
                    <User size={15} className="text-Secondary" /> Staff Biography
                  </h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                    {staffDetails.biography || "No professional bio provided by staff member."}
                  </p>
                </div>
              </div>

              {/* Assigned Cases List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
                  <Layers size={15} className="text-Secondary" />
                  <h3 className="text-xs font-black text-Third uppercase tracking-wide">Assigned Active Caseload</h3>
                </div>

                {assignedCases.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 font-medium text-xs bg-gray-50/30 rounded-2xl border border-dashed border-gray-200">
                    No active cases currently assigned to this staff member.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {assignedCases.map((c) => (
                      <div key={c.id} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                          <span className="font-bold text-xs text-Third">{c.case_number}</span>
                          <span className="bg-Primary/10 text-Secondary text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {c.status || "Active"}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-1.5 text-[11px] text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <User size={12} className="text-gray-400 shrink-0" />
                            <span>Client: <strong className="text-gray-600">{c.parent?.name || "N/A"}</strong></span>
                          </div>
                          {c.employee && staffDetails.user_type !== "employee" && (
                            <div className="flex items-center gap-1.5">
                              <UserCheck size={12} className="text-gray-400 shrink-0" />
                              <span>Therapist: <strong className="text-gray-600">{c.employee.name}</strong></span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-gray-400 shrink-0" />
                            <span className="truncate">Location: <strong className="text-gray-600">{c.location}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-end pt-3 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    setIsDetailsOpen(false);
                    setSelectedStaffId(null);
                  }}
                  className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Staff;
