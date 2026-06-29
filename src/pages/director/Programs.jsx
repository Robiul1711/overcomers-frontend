import React, { useState } from "react";
import { Search, ChevronDown, Check, BookOpen, Layers, User, Calendar, Loader2, Plus, ArrowRight, HelpCircle, Pencil, Archive, AlertTriangle } from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Programs = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProgram, setEditProgram] = useState(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [programToArchive, setProgramToArchive] = useState(null);

  // Form states for creating a program
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Communication");
  const [customCategory, setCustomCategory] = useState("");
  const [type, setType] = useState("Skill Acquisition");
  const [customType, setCustomType] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");

  // Form states for editing a program
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Communication");
  const [editCustomCategory, setEditCustomCategory] = useState("");
  const [editType, setEditType] = useState("Skill Acquisition");
  const [editCustomType, setEditCustomType] = useState("");
  const [editLevel, setEditLevel] = useState("Beginner");
  const [editDescription, setEditDescription] = useState("");

  // Fetch Library Programs list
  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["directorLibraryPrograms", page],
    url: "/director/library-programs",
    params: { page },
  });

  const programsObject = resData?.data || {};
  const programsList = programsObject.data || [];

  // Create Library Program Mutation
  const { mutate: createProgram, isPending: isCreating } = useMutationClient({
    url: "/director/library-programs",
    method: "post",
    invalidateKeys: [["directorLibraryPrograms", page]],
    successMessage: "Program added to library successfully",
  });

  // Update Library Program Mutation
  const { mutate: updateProgram, isPending: isUpdating } = useMutationClient({
    url: (programId) => `/director/library-programs/${programId}`,
    method: "put",
    invalidateKeys: [["directorLibraryPrograms", page]],
    successMessage: "Program template updated successfully",
  });

  // Archive Library Program Mutation
  const { mutate: archiveProgram, isPending: isArchiving } = useMutationClient({
    url: (programId) => `/director/library-programs/${programId}/archive`,
    method: "patch",
    invalidateKeys: [["directorLibraryPrograms", page]],
    successMessage: "Program archived successfully",
  });

  const categories = ["All Categories", "Communication", "Social Skills", "Daily Living Skills", "Behavior Reduction", "Cognitive Skills"];

  // Filter programs locally
  const filteredPrograms = programsList.filter((item) => {
    const searchLower = search.toLowerCase();
    const titleMatch = item.title?.toLowerCase().includes(searchLower) || false;
    const descMatch = item.description?.toLowerCase().includes(searchLower) || false;
    const matchesSearch = titleMatch || descMatch;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      item.category?.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const finalCategory = category === "Other" ? customCategory : category;
    const finalType = type === "Other" ? customType : type;

    createProgram(
      {
        data: {
          title,
          category: finalCategory || "General",
          type: finalType || "Standard",
          level,
          description,
        },
      },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
          // Clear form
          setTitle("");
          setCategory("Communication");
          setCustomCategory("");
          setType("Skill Acquisition");
          setCustomType("");
          setLevel("Beginner");
          setDescription("");
        },
      }
    );
  };

  const handleOpenDetails = (program) => {
    setSelectedProgram(program);
    setIsDetailsModalOpen(true);
  };

  const handleOpenArchive = (program, e) => {
    e.stopPropagation();
    setProgramToArchive(program);
    setIsArchiveModalOpen(true);
  };

  const handleArchiveConfirm = () => {
    if (!programToArchive) return;
    archiveProgram(
      { id: programToArchive.id },
      {
        onSuccess: () => {
          setIsArchiveModalOpen(false);
          setProgramToArchive(null);
        },
      }
    );
  };

  const handleOpenEdit = (program, e) => {
    e.stopPropagation();
    setEditProgram(program);
    setEditTitle(program.title || "");
    
    const standardCategories = ["Communication", "Social Skills", "Daily Living Skills", "Behavior Reduction", "Cognitive Skills"];
    if (standardCategories.includes(program.category)) {
      setEditCategory(program.category);
      setEditCustomCategory("");
    } else {
      setEditCategory("Other");
      setEditCustomCategory(program.category || "");
    }

    const standardTypes = ["Skill Acquisition", "Task Analysis", "DTT (Discrete Trial Training)", "NET (Natural Environment Teaching)"];
    if (standardTypes.includes(program.type)) {
      setEditType(program.type);
      setEditCustomType("");
    } else {
      setEditType("Other");
      setEditCustomType(program.type || "");
    }

    setEditLevel(program.level || "Beginner");
    setEditDescription(program.description || "");
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editProgram || !editTitle || !editDescription) return;

    const finalCategory = editCategory === "Other" ? editCustomCategory : editCategory;
    const finalType = editType === "Other" ? editCustomType : editType;

    updateProgram(
      {
        id: editProgram.id,
        data: {
          title: editTitle,
          category: finalCategory || "General",
          type: finalType || "Standard",
          level: editLevel,
          description: editDescription,
        },
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditProgram(null);
        },
      }
    );
  };

  const getCategoryStyles = (cat) => {
    switch (cat?.toLowerCase()) {
      case "communication":
        return "bg-teal-50 text-teal-700 border-teal-100";
      case "behavior reduction":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "social skills":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "daily living skills":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getLevelStyles = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case "beginner":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "intermediate":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "advanced":
        return "bg-violet-50 text-violet-600 border-violet-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="flex flex-col gap-6 font-poppins text-Third h-full">
      {/* Header Block */}
      <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-extrabold text-Third">Program Library</h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1 font-medium">
            Configure standard clinical templates for supervisors to assign on patient caseloads.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0 self-stretch sm:self-auto"
        >
          <Plus size={16} /> Create New Template
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search programs by title or target description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-medium shadow-sm"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between gap-2 w-full sm:w-auto bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span className="flex items-center gap-1.5">
              <span className="opacity-70 font-medium">Category:</span> {categoryFilter}
            </span>
            <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
              <div className="absolute right-0 top-[110%] w-full sm:w-[185px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-20 flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
                {categories.map((cat) => {
                  const isSelected = categoryFilter === cat;
                  return (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setPage(1);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all text-xs font-semibold ${
                        isSelected
                          ? "bg-Secondary text-white font-bold"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                      {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Grid View */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm animate-pulse flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-24 bg-gray-100 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-100 rounded-md"></div>
              </div>
              <div className="h-5 w-40 bg-gray-100 rounded-md"></div>
              <div className="h-12 w-full bg-gray-50 rounded-md"></div>
              <div className="h-4 w-28 bg-gray-100 rounded-md mt-auto"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500 font-semibold bg-red-50/50 rounded-3xl border border-dashed border-red-200">
          Failed to fetch library templates. Please reload.
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-50 shadow-sm flex flex-col items-center justify-center gap-3">
          <BookOpen className="text-gray-300" size={32} />
          <p className="text-gray-400 font-medium text-xs">No clinical templates found matching selection.</p>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                onClick={() => handleOpenDetails(prog)}
                className={`p-6 rounded-3xl border shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-5 group ${
                  prog.is_archived
                    ? "bg-gray-50/60 border-gray-100 opacity-70"
                    : "bg-white border-gray-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-50">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getCategoryStyles(prog.category)}`}>
                        {prog.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getLevelStyles(prog.level)}`}>
                        {prog.level}
                      </span>
                      {!!prog.is_archived && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-gray-200 text-gray-600 border-gray-300 uppercase tracking-wider">
                          Archived
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {!prog.is_archived && (
                        <>
                          <button
                            onClick={(e) => handleOpenEdit(prog, e)}
                            className="p-1.5 text-gray-400 hover:text-Secondary hover:bg-Primary/20 rounded-lg transition-all shrink-0"
                            title="Edit Template"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={(e) => handleOpenArchive(prog, e)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                            title="Archive Template"
                          >
                            <Archive size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="text-[15px] font-extrabold text-Third mt-4 leading-snug group-hover:text-Secondary transition-colors">
                    {prog.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs mt-2.5 leading-relaxed font-medium line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-gray-50 text-[10px] mt-auto">
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-1">
                      <Layers size={12} />
                      <span>{prog.type || "Skill Target"}</span>
                    </div>
                    {prog.creator && (
                      <div className="flex items-center gap-1 font-semibold">
                        <User size={12} />
                        <span>By: {prog.creator.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {programsObject.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6 text-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-gray-400 font-medium">
                Page {page} of {programsObject.last_page}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(programsObject.last_page, p + 1))}
                disabled={page >= programsObject.last_page}
                className="flex items-center gap-1 text-gray-500 hover:text-Secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* DIALOG: Create Program Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[550px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleCreateSubmit} className="p-6 sm:p-8 flex flex-col gap-6 bg-white">
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-black text-Third leading-tight">
                Create Clinical Template
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Define targets for skill acquisition, manding, or daily living routines to store in the program library.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toothbrushing Routine, Expressive Language"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-Third font-bold text-[13px]">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="Communication">Communication</option>
                    <option value="Social Skills">Social Skills</option>
                    <option value="Daily Living Skills">Daily Living Skills</option>
                    <option value="Behavior Reduction">Behavior Reduction</option>
                    <option value="Cognitive Skills">Cognitive Skills</option>
                    <option value="Other">Other (Custom)</option>
                  </select>
                </div>

                {/* Level Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-Third font-bold text-[13px]">Mastery Level *</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {category === "Other" && (
                <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-Third font-bold text-[13px]">Custom Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom category name"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                  />
                </div>
              )}

              {/* Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Program Type *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                >
                  <option value="Skill Acquisition">Skill Acquisition</option>
                  <option value="Task Analysis">Task Analysis</option>
                  <option value="DTT (Discrete Trial Training)">DTT (Discrete Trial Training)</option>
                  <option value="NET (Natural Environment Teaching)">NET (Natural Environment Teaching)</option>
                  <option value="Other">Other (Custom)</option>
                </select>
              </div>

              {type === "Other" && (
                <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-Third font-bold text-[13px]">Custom Type Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom type name"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Target Instructions / Description *</label>
                <textarea
                  required
                  placeholder="Detail step-by-step target criteria, prompt protocols, and mastery definitions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all min-h-[120px] resize-none font-semibold"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Creating...
                  </>
                ) : (
                  "Create Template"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Program Template Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col gap-5 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getCategoryStyles(selectedProgram?.category)}`}>
                {selectedProgram?.category || "N/A"}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getLevelStyles(selectedProgram?.level)}`}>
                {selectedProgram?.level || "N/A"}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-Third leading-snug">{selectedProgram?.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Layers size={12} /> Type: {selectedProgram?.type || "N/A"}
                </span>
                {selectedProgram?.created_at && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> Stored: {selectedProgram.created_at.slice(0, 10)}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Instructions</span>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {selectedProgram?.description}
              </p>
            </div>

            {selectedProgram?.creator && (
              <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold bg-gray-50/20 p-3 rounded-xl border border-gray-100/50">
                <User size={14} className="text-gray-400" />
                <span>Created by: <strong className="text-Third">{selectedProgram.creator.name}</strong></span>
              </div>
            )}

            <div className="flex items-center justify-end pt-3 border-t border-gray-100 mt-1">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedProgram(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Edit Program Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[550px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleEditSubmit} className="p-6 sm:p-8 flex flex-col gap-6 bg-white">
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-black text-Third leading-tight">
                Edit Clinical Template
              </h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">
                Modify standard clinical program instructions, targets, and categorizations.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toothbrushing Routine, Expressive Language"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-Third font-bold text-[13px]">Category *</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="Communication">Communication</option>
                    <option value="Social Skills">Social Skills</option>
                    <option value="Daily Living Skills">Daily Living Skills</option>
                    <option value="Behavior Reduction">Behavior Reduction</option>
                    <option value="Cognitive Skills">Cognitive Skills</option>
                    <option value="Other">Other (Custom)</option>
                  </select>
                </div>

                {/* Level Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-Third font-bold text-[13px]">Mastery Level *</label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {editCategory === "Other" && (
                <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-Third font-bold text-[13px]">Custom Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom category name"
                    value={editCustomCategory}
                    onChange={(e) => setEditCustomCategory(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                  />
                </div>
              )}

              {/* Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Program Type *</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold appearance-none"
                >
                  <option value="Skill Acquisition">Skill Acquisition</option>
                  <option value="Task Analysis">Task Analysis</option>
                  <option value="DTT (Discrete Trial Training)">DTT (Discrete Trial Training)</option>
                  <option value="NET (Natural Environment Teaching)">NET (Natural Environment Teaching)</option>
                  <option value="Other">Other (Custom)</option>
                </select>
              </div>

              {editType === "Other" && (
                <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-Third font-bold text-[13px]">Custom Type Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom type name"
                    value={editCustomType}
                    onChange={(e) => setEditCustomType(e.target.value)}
                    className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all font-semibold"
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-Third font-bold text-[13px]">Target Instructions / Description *</label>
                <textarea
                  required
                  placeholder="Detail step-by-step target criteria, prompt protocols, and mastery definitions..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3.5 text-[13px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all min-h-[120px] resize-none font-semibold"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditProgram(null);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/95 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Archive Program Confirmation Modal */}
      <Dialog open={isArchiveModalOpen} onOpenChange={setIsArchiveModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[420px] p-6 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <div className="flex flex-col items-center text-center gap-5 bg-white">
            <div className="w-[60px] h-[60px] bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-inner">
              <AlertTriangle size={30} />
            </div>
            
            <div>
              <h3 className="text-lg font-black text-Third leading-tight">Archive Template?</h3>
              <p className="text-gray-400 text-xs mt-2 font-medium leading-relaxed px-2">
                Are you sure you want to archive program template <strong className="text-Third">{programToArchive?.title}</strong>? It will no longer be assignable to new cases.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsArchiveModalOpen(false);
                  setProgramToArchive(null);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveConfirm}
                disabled={isArchiving}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isArchiving ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Archiving...
                  </>
                ) : (
                  "Archive Program"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Programs;
