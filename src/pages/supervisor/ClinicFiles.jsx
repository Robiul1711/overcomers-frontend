import React, { useState, useRef } from "react";
import { Video, FileText, ArrowUpRight, Download, UploadCloud, FileX } from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

const SupervisorClinicFiles = () => {
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState(null); // "Document" or "Video"
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch supervisor clinic files
  const { data, isLoading } = useClient({
    queryKey: ["supervisorClinicFiles"],
    url: "/supervisor/clinic-files",
  });

  // Upload mutation for supervisor
  const { mutate, isPending } = useMutationClient({
    url: "/supervisor/clinic-files",
    invalidateKeys: [["supervisorClinicFiles"]],
    successMessage: "Record published successfully!",
  });

  const clinicFiles = data?.data || [];

  const handleFileSelect = (type) => {
    setFileType(type);
    setSelectedFile(null); // clear so UI doesn't show old file name
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.accept =
        type === "Video"
          ? "video/mp4,video/quicktime,video/x-msvideo,video/*"
          : ".pdf,.doc,.docx,.jpg,.jpeg,.png";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handlePublish = () => {
    if (!title.trim() || !fileType || !selectedFile) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file_type", fileType);
    formData.append("file", selectedFile);

    mutate(
      {
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      },
      {
        onSuccess: () => {
          setTitle("");
          setFileType(null);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      }
    );
  };

  const handleDownload = (url) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return { month: "", day: "" };
    const d = new Date(dateStr);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return {
      month: months[d.getMonth()],
      day: String(d.getDate()),
    };
  };

  const isFormValid = title.trim() && fileType && selectedFile;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 pb-10 font-poppins">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50 min-h-[400px]">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-1 h-6 bg-gray-200 rounded-full" />
              <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-5">
              <div>
                <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse mb-2" />
                <div className="h-11 w-full bg-gray-100 rounded-xl animate-pulse" />
              </div>
              <div>
                <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
                  <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
                </div>
              </div>
            </div>
            <div className="h-11 w-36 bg-gray-100 rounded-xl animate-pulse mt-6" />
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50 min-h-[400px]">
            <div className="h-5 w-36 bg-gray-200 rounded-lg animate-pulse mb-6" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div
                    className="h-12 w-14 bg-gray-100 rounded-xl animate-pulse shrink-0"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  <div className="flex-1 space-y-2">
                    <div
                      className="h-4 w-36 bg-gray-200 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                    />
                    <div
                      className="h-5 w-20 bg-gray-100 rounded-lg animate-pulse"
                      style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
                    />
                  </div>
                  <div
                    className="h-9 w-24 bg-gray-100 rounded-xl animate-pulse shrink-0"
                    style={{ animationDelay: `${i * 0.1 + 0.15}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={
          fileType === "Video"
            ? "video/mp4,video/quicktime,video/x-msvideo,video/*"
            : ".pdf,.doc,.docx,.jpg,.jpeg,.png"
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Contribution Center */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-6 bg-Secondary rounded-full shrink-0" />
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-Third">
                Contribution Center
              </h2>
              <div className="w-16 h-[3px] bg-Primary rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Assigned Title
            </label>
            <input
              type="text"
              placeholder="e.g. Behavioral Analysis 101"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:border-Primary/30 rounded-xl py-3 px-5 outline-none text-[14px] font-bold text-Third transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Asset Selection
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => handleFileSelect("Video")}
                className={`rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-Secondary/[0.05] transition-all group ${
                  fileType === "Video"
                    ? "bg-Secondary/[0.06] border-2 border-Secondary/30"
                    : "bg-Secondary/[0.02] border-2 border-dashed border-Secondary/10"
                }`}
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-Secondary shadow-sm group-hover:scale-110 transition-transform">
                  <Video size={20} />
                </div>
                <span className="text-Secondary font-extrabold text-[15px]">
                  Video
                </span>
                {fileType === "Video" && selectedFile ? (
                  <span className="text-green-600 font-bold text-[10px] text-center leading-tight max-w-full truncate px-1">
                    {selectedFile.name}
                  </span>
                ) : (
                  <span className="text-Secondary/40 font-bold text-[9px] uppercase tracking-widest">
                    MP4, MOV
                  </span>
                )}
              </div>

              <div
                onClick={() => handleFileSelect("Document")}
                className={`rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-Primary/[0.05] transition-all group ${
                  fileType === "Document"
                    ? "bg-Primary/[0.06] border-2 border-Primary/40"
                    : "bg-Primary/[0.02] border-2 border-dashed border-Primary/30"
                }`}
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#B59654] shadow-sm group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <span className="text-[#B59654] font-extrabold text-[15px]">
                  Document
                </span>
                {fileType === "Document" && selectedFile ? (
                  <span className="text-green-600 font-bold text-[10px] text-center leading-tight max-w-full truncate px-1">
                    {selectedFile.name}
                  </span>
                ) : (
                  <span className="text-[#B59654]/40 font-bold text-[9px] uppercase tracking-widest">
                    PDF, DOC
                  </span>
                )}
              </div>
            </div>
            {selectedFile && (
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setFileType(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-[11px] text-red-400 font-bold hover:text-red-500 transition-colors self-start flex items-center gap-1"
              >
                <FileX size={13} /> Remove file
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handlePublish}
              disabled={!isFormValid || isPending}
              className={`flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl transition-all text-[13px] ${
                isFormValid && !isPending
                  ? "bg-Secondary text-white hover:bg-Secondary/90 shadow-sm active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
              }`}
            >
              {isPending ? "Publishing..." : "Publish Record"}{" "}
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        {/* Asset Repository */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50 flex flex-col max-h-[600px] overflow-hidden">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-1 h-6 bg-Primary rounded-full shrink-0" />
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-Third">
                Asset Repository
              </h2>
              <div className="w-16 h-[3px] bg-Secondary/10 rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto flex-1 custom-scrollbar mt-5">
            {clinicFiles.length > 0 ? (
              clinicFiles.map((file) => {
                const { month, day } = formatDate(file.created_at);
                const isVideo = file.file_type === "Video";
                return (
                  <div
                    key={file.id}
                    className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
                      <div className="bg-Secondary/[0.03] rounded-xl px-3 py-2 flex flex-col items-center justify-center min-w-[56px] border border-Secondary/5 shrink-0">
                        <span className="text-Secondary/40 font-bold text-[9px] uppercase tracking-tighter leading-none mb-0.5">
                          {month}
                        </span>
                        <span className="text-Secondary font-extrabold text-[18px] leading-none">
                          {day}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 min-w-0 overflow-hidden">
                        <h3 className="text-[15px] font-extrabold text-Third truncate">
                          {file.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                            {isVideo ? (
                              <Video size={10} className="text-Secondary shrink-0" />
                            ) : (
                              <FileText size={10} className="text-[#B59654] shrink-0" />
                            )}
                            <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wide">
                              {file.file_type}
                              {file.extension ? ` • ${file.extension}` : ""}
                            </span>
                          </div>
                          {file.file_size && (
                            <span className="text-[9px] text-gray-300 font-bold">
                              {file.file_size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(file.file_url)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 border border-Secondary/20 text-Secondary font-bold text-[12px] rounded-xl hover:bg-Secondary hover:text-white transition-all shrink-0 active:scale-95"
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UploadCloud size={36} className="text-gray-200 mb-3" />
                <p className="text-gray-300 font-bold text-[14px]">
                  No assets uploaded yet
                </p>
                <p className="text-gray-200 text-[11px] font-bold mt-0.5">
                  Publish your first record above
                </p>
              </div>
            )}
          </div>

          {clinicFiles.length > 0 && (
            <div className="shrink-0 pt-4 mt-auto text-center">
              <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                {clinicFiles.length} asset{clinicFiles.length !== 1 ? "s" : ""} in
                repository
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupervisorClinicFiles;
