import React, { useState } from "react";
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
  Pencil,
  Plus,
  Search,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CaseDetails = () => {
  const { id } = useParams();

  // Modals state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Library program selection and search/pagination
  const [libraryPage, setLibraryPage] = useState(1);
  const [librarySearch, setLibrarySearch] = useState("");
  const [selectedLibraryProgramId, setSelectedLibraryProgramId] = useState(null);

  // Custom program form state
  const [customTitle, setCustomTitle] = useState("");
  const [customCategory, setCustomCategory] = useState("Communication");
  const [otherCategory, setOtherCategory] = useState("");
  const [customType, setCustomType] = useState("Skill Acquisition");
  const [otherType, setOtherType] = useState("");
  const [customLevel, setCustomLevel] = useState("Beginner");
  const [customDescription, setCustomDescription] = useState("");
  const [customTasks, setCustomTasks] = useState([""]);

  const handleTaskChange = (index, value) => {
    const newTasks = [...customTasks];
    newTasks[index] = value;
    setCustomTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = customTasks.filter((_, i) => i !== index);
    setCustomTasks(newTasks.length ? newTasks : [""]);
  };

  // Edit program form state
  const [editProgramId, setEditProgramId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLevel, setEditLevel] = useState("Beginner");
  const [editDescription, setEditDescription] = useState("");
  const [editTasks, setEditTasks] = useState([""]);

  const handleEditTaskChange = (index, value) => {
    const newTasks = [...editTasks];
    newTasks[index] = value;
    setEditTasks(newTasks);
  };

  const handleRemoveEditTask = (index) => {
    const newTasks = editTasks.filter((_, i) => i !== index);
    setEditTasks(newTasks.length ? newTasks : [""]);
  };

  // API Queries & Mutations
  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["supervisorCaseDetails", id],
    url: `/supervisor/cases/${id}`,
  });

  const caseDetails = resData?.data;

  const { data: libraryData, isLoading: isLoadingLibrary } = useClient({
    queryKey: ["supervisorLibraryPrograms", libraryPage],
    url: "/supervisor/library-programs",
    params: { page: libraryPage },
    enabled: isAssignModalOpen,
  });

  const libraryPrograms = libraryData?.data?.data || [];
  const libraryPagination = libraryData?.data || {};

  const { mutate: assignProgram, isPending: isAssigning } = useMutationClient({
    url: `/supervisor/cases/${id}/programs/assign`,
    method: "post",
    invalidateKeys: [["supervisorCaseDetails", id]],
    successMessage: "Program assigned successfully",
  });

  const { mutate: createCustomProgram, isPending: isCreatingCustom } = useMutationClient({
    url: `/supervisor/cases/${id}/programs/custom`,
    method: "post",
    invalidateKeys: [["supervisorCaseDetails", id]],
    successMessage: "Custom program created successfully",
  });

  const { mutate: updateProgram, isPending: isUpdatingProgram } = useMutationClient({
    url: (programId) => `/supervisor/programs/${programId}`,
    method: "put",
    invalidateKeys: [["supervisorCaseDetails", id]],
    successMessage: "Program updated successfully",
  });

  const employeeId = caseDetails?.employee_id || caseDetails?.employee?.id;

  const handleAssignSubmit = () => {
    if (!selectedLibraryProgramId || !employeeId) return;
    assignProgram(
      {
        data: {
          library_program_id: selectedLibraryProgramId.toString(),
          employee_id: employeeId.toString(),
        },
      },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
          setSelectedLibraryProgramId(null);
        },
      }
    );
  };

  const handleCustomSubmit = () => {
    if (!customTitle.trim() || !employeeId) return;

    const finalCategory = customCategory === "Other" ? otherCategory : customCategory;
    const finalType = customType === "Other" ? otherType : customType;
    const filteredTasks = customTasks.map(t => t.trim()).filter(t => t !== "");

    createCustomProgram(
      {
        data: {
          employee_id: employeeId.toString(),
          title: customTitle,
          category: finalCategory,
          type: finalType,
          level: customLevel,
          description: customDescription,
          tasks: filteredTasks,
        },
      },
      {
        onSuccess: () => {
          setIsCustomModalOpen(false);
          setCustomTitle("");
          setCustomCategory("Communication");
          setOtherCategory("");
          setCustomType("Skill Acquisition");
          setOtherType("");
          setCustomLevel("Beginner");
          setCustomDescription("");
          setCustomTasks([""]);
        },
      }
    );
  };

  const handleOpenEditModal = (program) => {
    setEditProgramId(program.id);
    setEditTitle(program.title || "");
    setEditDescription(program.description || "");
    setEditLevel(program.level || "Beginner");
    const existingTasks = program.tasks ? program.tasks.map(t => t.title || "") : [];
    setEditTasks(existingTasks.length ? existingTasks : [""]);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editTitle.trim()) return;
    const filteredTasks = editTasks.map(t => t.trim()).filter(t => t !== "");
    updateProgram(
      {
        id: editProgramId,
        data: {
          title: editTitle,
          description: editDescription,
          level: editLevel,
          tasks: filteredTasks,
        },
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditProgramId(null);
          setEditTitle("");
          setEditDescription("");
          setEditLevel("Beginner");
          setEditTasks([""]);
        },
      }
    );
  };

  // Local filtering for library search
  const filteredLibraryPrograms = libraryPrograms.filter(
    (prog) =>
      prog.title?.toLowerCase().includes(librarySearch.toLowerCase()) ||
      prog.category?.toLowerCase().includes(librarySearch.toLowerCase()) ||
      prog.description?.toLowerCase().includes(librarySearch.toLowerCase())
  );

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
        <p className="text-gray-500 mt-1">Failed to load case details. Please try again later.</p>
        <Link to="/supervisor-dashboard/cases" className="mt-4 inline-flex items-center gap-2 text-Secondary hover:underline font-bold">
          <ArrowLeft size={16} /> Back to Cases
        </Link>
      </div>
    );
  }

  const parent = caseDetails?.parent || {};
  const employee = caseDetails?.employee || {};
  const service = caseDetails?.service || {};
  const programs = caseDetails?.programs || [];

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
    <div className="flex flex-col gap-6 md:gap-8 font-poppins text-Third  w-full">
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <Link
          to="/supervisor-dashboard/cases"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-Secondary font-semibold text-sm transition-colors w-max"
        >
          <ArrowLeft size={18} /> Back to Managed Cases
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{caseDetails?.case_number}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(caseDetails?.status)}`}>
                {caseDetails?.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">
              Service: <span className="text-Third font-semibold">{service?.name || "N/A"}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 bg-[#FAF6F7] px-4 py-2.5 rounded-2xl border border-gray-50">
            <Calendar size={18} className="text-Secondary" />
            <span>Start Date: <strong className="text-Third">{caseDetails?.start_date}</strong></span>
          </div>
        </div>
      </div>

      {/* Profile and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Client (Parent) Information */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Client (Parent)</h2>
              <p className="text-xs text-gray-400">Personal & Contact Info</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
              <span className="text-sm font-semibold text-Third mt-0.5 block">{parent?.name || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <div className="overflow-hidden">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Email Address</label>
                <span className="text-xs font-medium text-gray-600 block truncate">{parent?.email || "N/A"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Phone Number</label>
                <span className="text-xs font-medium text-gray-600 block">{parent?.phone_number || "N/A"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Session Location</label>
                <span className="text-xs font-medium text-gray-600 block">{caseDetails?.location || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Therapist (RBT) Information */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Assigned RBT</h2>
              <p className="text-xs text-gray-400">Therapist Profile</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
              <span className="text-sm font-semibold text-Third mt-0.5 block">{employee?.name || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <div className="overflow-hidden">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Email Address</label>
                <span className="text-xs font-medium text-gray-600 block truncate">{employee?.email || "N/A"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Info size={16} className="text-gray-400 shrink-0" />
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Employment Role</label>
                <span className="text-xs font-medium text-gray-600 block">Registered Behavior Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Session Schedule Details */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2.5 bg-Primary/20 text-[#76121F] rounded-2xl">
              <Clock size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Session Hours</h2>
              <p className="text-xs text-gray-400">Weekly Schedule & Times</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Start / End Time</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-Third bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  {caseDetails?.session_start_time || "00:00"}
                </span>
                <span className="text-gray-400 text-xs font-bold">to</span>
                <span className="text-sm font-semibold text-Third bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  {caseDetails?.session_end_time || "00:00"}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Session Frequency</label>
              <span className="text-sm font-semibold text-Third mt-0.5 block">
                {caseDetails?.frequency} session(s) per week
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-Secondary/10 text-Secondary rounded-2xl">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Assigned Programs</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Active learning programs & tasks assigned to this case ({programs?.length} total)
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {!employeeId && (
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-2 rounded-xl">
                No RBT assigned to this case
              </span>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLibraryPage(1);
                  setLibrarySearch("");
                  setSelectedLibraryProgramId(null);
                  setIsAssignModalOpen(true);
                }}
                disabled={!employeeId}
                className="px-4 py-2.5 bg-Primary text-[#76121F] font-bold text-xs rounded-xl hover:bg-Primary/90 transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={14} /> Assign from Library
              </button>
              <button
                onClick={() => setIsCustomModalOpen(true)}
                disabled={!employeeId}
                className="px-4 py-2.5 bg-Secondary text-white font-bold text-xs rounded-xl hover:bg-Secondary/90 transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={14} /> Create Custom
              </button>
            </div>
          </div>
        </div>

        {programs?.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-50 shadow-sm">
            <p className="text-gray-400 font-medium">No programs assigned to this case yet.</p>
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
                      <h3 className="text-base font-bold text-Third leading-snug">{program.title}</h3>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1 block">
                        Type: {program.type || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-Primary/10 text-Secondary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {program.category}
                      </span>
                      <button
                        onClick={() => handleOpenEditModal(program)}
                        className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-Secondary rounded-xl border border-gray-100 transition-colors"
                        title="Edit program details"
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mt-3 leading-relaxed font-medium">
                    {program.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-bold">Level:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getLevelStyles(program.level)}`}>
                      {program.level}
                    </span>
                  </div>

                  <div className="text-gray-400 font-medium">
                    Start: <strong className="text-gray-600">{program.start_date || "N/A"}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DIALOG: Assign from Library */}
      <Dialog
        open={isAssignModalOpen}
        onOpenChange={(open) => {
          setIsAssignModalOpen(open);
          if (!open) {
            setSelectedLibraryProgramId(null);
            setLibrarySearch("");
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-5 sm:p-7 flex flex-col gap-5 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight">
                Assign Library Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Choose a pre-defined learning program to assign to this client.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search programs by title or category..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full bg-[#F4F4F4] rounded-xl pl-11 pr-4 py-3 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
              />
            </div>

            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
              {isLoadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="animate-spin text-Secondary" size={32} />
                  <span className="text-xs text-gray-400 font-semibold">Loading programs...</span>
                </div>
              ) : filteredLibraryPrograms.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  No programs found
                </div>
              ) : (
                filteredLibraryPrograms.map((prog) => {
                  const isSelected = selectedLibraryProgramId === prog.id;
                  return (
                    <div
                      key={prog.id}
                      onClick={() => setSelectedLibraryProgramId(prog.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected
                          ? "border-Secondary bg-Secondary/[0.03] shadow-sm"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-Third">{prog.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                              {prog.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${getLevelStyles(prog.level)}`}>
                              {prog.level}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "border-Secondary bg-Secondary" : "border-gray-200"
                          }`}
                        >
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      {prog.description && (
                        <p className="text-gray-500 text-xs leading-relaxed mt-1 font-medium line-clamp-3">
                          {prog.description}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {libraryPagination?.last_page > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <button
                  onClick={() => setLibraryPage((p) => Math.max(1, p - 1))}
                  disabled={libraryPage === 1 || isLoadingLibrary}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-gray-400 font-medium">
                  Page {libraryPage} of {libraryPagination.last_page}
                </span>
                <button
                  onClick={() => setLibraryPage((p) => Math.min(libraryPagination.last_page, p + 1))}
                  disabled={libraryPage >= libraryPagination.last_page || isLoadingLibrary}
                  className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedLibraryProgramId(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={!selectedLibraryProgramId || isAssigning}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAssigning ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Assigning...
                  </>
                ) : (
                  "Assign Program"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Create Custom Program */}
      <Dialog
        open={isCustomModalOpen}
        onOpenChange={(open) => {
          setIsCustomModalOpen(open);
          if (!open) {
            setCustomTitle("");
            setCustomCategory("Communication");
            setOtherCategory("");
            setCustomType("Skill Acquisition");
            setOtherType("");
            setCustomLevel("Beginner");
            setCustomDescription("");
            setCustomTasks([""]);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-5 sm:p-7 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight">
                Create Custom Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Design a custom, target-specific program for this client's unique therapy targets.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Program Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Toilet Training Protocol"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">Category *</label>
                  <div className="relative">
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                    >
                      <option value="Communication">Communication</option>
                      <option value="Daily Living Skills">Daily Living Skills</option>
                      <option value="Social Skills">Social Skills</option>
                      <option value="Behavior Reduction">Behavior Reduction</option>
                      <option value="Cognition">Cognition</option>
                      <option value="Self-Care">Self-Care</option>
                      <option value="Academic">Academic</option>
                      <option value="Other">Other (Custom Category)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">Program Type *</label>
                  <div className="relative">
                    <select
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                    >
                      <option value="Skill Acquisition">Skill Acquisition</option>
                      <option value="Task Analysis">Task Analysis</option>
                      <option value="Direct Instruction">Direct Instruction</option>
                      <option value="DTT (Discrete Trial Training)">DTT (Discrete Trial)</option>
                      <option value="NET (Natural Environment Teaching)">NET (Natural Env)</option>
                      <option value="Other">Other (Custom Type)</option>
                    </select>
                  </div>
                </div>
              </div>

              {customCategory === "Other" && (
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">Specify Custom Category *</label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                    required
                  />
                </div>
              )}

              {customType === "Other" && (
                <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[13px]">Specify Custom Type *</label>
                  <input
                    type="text"
                    placeholder="Enter type name"
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                    required
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Target Level *</label>
                <div className="relative">
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Instructions & Description</label>
                <textarea
                  placeholder="Describe target instructions, prompt hierarchy, and mastery criteria..."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium h-24 resize-none"
                />
              </div>

              {/* Custom Tasks Input list */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-Third font-bold text-[13px]">Program Tasks</label>
                  <button
                    type="button"
                    onClick={() => setCustomTasks([...customTasks, ""])}
                    className="flex items-center gap-1 text-[11px] text-Secondary hover:underline font-bold"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {customTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`e.g. Task ${index + 1}`}
                        value={task}
                        onChange={(e) => handleTaskChange(index, e.target.value)}
                        className="flex-1 bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                      />
                      {customTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(index)}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors border border-red-100 flex items-center justify-center"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                disabled={!customTitle.trim() || isCreatingCustom || (customCategory === "Other" && !otherCategory.trim()) || (customType === "Other" && !otherType.trim())}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreatingCustom ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Creating...
                  </>
                ) : (
                  "Create Program"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Edit Program */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) {
            setEditProgramId(null);
            setEditTitle("");
            setEditDescription("");
            setEditLevel("Beginner");
            setEditTasks([""]);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-5 sm:p-7 flex flex-col gap-6 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-[22px] font-extrabold text-Third leading-tight">
                Edit Assigned Program
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Update details or therapist instructions for this assigned learning program.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Program Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Expressive Language"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Target Level *</label>
                <div className="relative">
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[13px]">Instructions & Description</label>
                <textarea
                  placeholder="Instructions for the therapist..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium h-28 resize-none"
                />
              </div>

              {/* Edit Tasks Input list */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-Third font-bold text-[13px]">Program Tasks</label>
                  <button
                    type="button"
                    onClick={() => setEditTasks([...editTasks, ""])}
                    className="flex items-center gap-1 text-[11px] text-Secondary hover:underline font-bold"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {editTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`e.g. Task ${index + 1}`}
                        value={task}
                        onChange={(e) => handleEditTaskChange(index, e.target.value)}
                        className="flex-1 bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium"
                      />
                      {editTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEditTask(index)}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors border border-red-100 flex items-center justify-center"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editTitle.trim() || isUpdatingProgram}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdatingProgram ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetails;
