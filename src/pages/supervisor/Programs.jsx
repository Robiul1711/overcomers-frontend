import React, { useState } from "react";
import { Search, ChevronDown, Check, BookOpen, Layers, Calendar, Loader2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import useClient from "@/hooks/useClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Programs = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Fetch Library Programs list
  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["supervisorLibraryPrograms", page],
    url: "/supervisor/library-programs",
    params: { page },
  });

  const programsObject = resData?.data || {};
  const programsList = programsObject.data || [];

  const categories = [
    "All Categories",
    "Communication",
    "Social Skills",
    "Daily Living Skills",
    "Behavior Reduction",
    "Cognitive Skills",
  ];

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

  const handleOpenDetails = (program) => {
    setSelectedProgram(program);
    setIsDetailsModalOpen(true);
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
            Browse and view standard clinical program templates available for case assignments.
          </p>
        </div>
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
                className={`p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-Secondary/30 cursor-pointer transition-all flex flex-col justify-between gap-5 group bg-white`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-50">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getCategoryStyles(prog.category)}`}>
                        {prog.category || "General"}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getLevelStyles(prog.level)}`}>
                        {prog.level || "Beginner"}
                      </span>
                    </div>
                    <div className="text-gray-300 group-hover:text-Secondary transition-colors">
                      <Eye size={16} />
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
                    <div className="flex items-center gap-1 font-semibold">
                      <Layers size={12} />
                      <span>{prog.type || "Skill Target"}</span>
                    </div>
                    {prog.created_at && (
                      <div className="flex items-center gap-1 font-semibold">
                        <Calendar size={12} />
                        <span>{prog.created_at.slice(0, 10)}</span>
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

      {/* DIALOG: Program Template Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 rounded-[28px] overflow-hidden border-none shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col gap-5 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getCategoryStyles(selectedProgram?.category)}`}>
                {selectedProgram?.category || "General"}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${getLevelStyles(selectedProgram?.level)}`}>
                {selectedProgram?.level || "Beginner"}
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
              <p className="text-xs text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                {selectedProgram?.description}
              </p>
            </div>

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
    </div>
  );
};

export default Programs;
