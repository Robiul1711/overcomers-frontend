import React, { useState, useRef } from 'react';
import { Video, FileText, ArrowUpRight, Download, UploadCloud, FileX } from 'lucide-react';
import useClient from '@/hooks/useClient';
import useMutationClient from '@/hooks/useMutationClient';

const ClinicFiles = () => {
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState(null); // "Document" or "Video"
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch clinic files
  const { data, isLoading } = useClient({
    queryKey: ["clinicFiles"],
    url: "/employee/clinic-files",
  });

  // Upload mutation
  const { mutate, isPending } = useMutationClient({
    url: "/employee/clinic-files",
    invalidateKeys: [["clinicFiles"]],
    successMessage: "Record published successfully!",
  });

  const clinicFiles = data?.data || [];

  const handleFileSelect = (type) => {
    setFileType(type);
    setSelectedFile(null); // clear so UI doesn't show old file name
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

    mutate({ data: formData }, {
      onSuccess: () => {
        setTitle("");
        setFileType(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return { month: "", day: "" };
    const d = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
      month: months[d.getMonth()],
      day: String(d.getDate()),
    };
  };

  const isFormValid = title.trim() && fileType && selectedFile;

  // ---- Skeleton - Loading State ----
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins px-1 md:px-0">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Contribution Center Skeleton */}
          <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col gap-8 min-h-[550px]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-[36px] w-[220px] bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-24 h-[4px] bg-gray-100 rounded-full mt-2" />
              </div>
            </div>
            <div className="flex flex-col gap-6 flex-grow">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-[56px] w-full bg-gray-100 rounded-2xl animate-pulse" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-[180px] bg-gray-100 rounded-[32px] animate-pulse" />
                  <div className="h-[180px] bg-gray-100 rounded-[32px] animate-pulse" />
                </div>
              </div>
            </div>
            <div className="h-[56px] w-[190px] bg-gray-100 rounded-2xl animate-pulse" />
          </div>

          {/* Asset Repository Skeleton */}
          <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col gap-8 min-h-[550px]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-[36px] w-[200px] bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-24 h-[4px] bg-gray-100 rounded-full mt-2" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-100/80 rounded-[32px] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5 md:gap-6 w-full sm:w-auto">
                    <div className="h-[60px] w-[70px] bg-gray-100 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-44 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
                      <div className="h-[28px] w-28 bg-gray-100 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
                    </div>
                  </div>
                  <div className="h-12 w-[140px] bg-gray-100 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.15}s` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins px-1 md:px-0">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={fileType === "Video" ? "video/mp4,video/quicktime,video/x-msvideo,video/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Add Clinic Files Card */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col gap-8 min-h-fit md:min-h-[550px]">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 bg-Secondary rounded-full"></div>
             <div>
                <h2 className="text-[22px] md:text-3xl font-extrabold text-Third leading-tight">Contribution Center</h2>
                <div className="w-24 h-[4px] bg-Primary rounded-full mt-2"></div>
             </div>
          </div>

          <div className="flex flex-col gap-6 flex-grow">
            {/* File Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Assigned Title</label>
              <input 
                type="text" 
                placeholder="e.g. Behavioral Analysis 101" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:border-Primary/30 rounded-2xl py-4 px-6 outline-none text-[15px] font-bold text-Third transition-all"
              />
            </div>

            {/* Upload Section */}
            <div className="flex flex-col gap-3">
               <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Asset Selection</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Video Upload */}
                  <div
                    onClick={() => handleFileSelect("Video")}
                    className={`rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-Secondary/[0.05] transition-all group ${
                      fileType === "Video"
                        ? "bg-Secondary/[0.06] border-2 border-Secondary/30"
                        : "bg-Secondary/[0.02] border-2 border-dashed border-Secondary/10"
                    }`}
                  >
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-Secondary shadow-lg shadow-Secondary/5 group-hover:scale-110 transition-transform">
                        <Video size={28} />
                     </div>
                     <span className="text-Secondary font-extrabold text-[18px] md:text-[20px]">Video</span>
                     {fileType === "Video" && selectedFile ? (
                       <span className="text-green-600 font-bold text-[11px] text-center leading-tight max-w-full truncate px-2">{selectedFile.name}</span>
                     ) : (
                       <span className="text-Secondary/40 font-bold text-[11px] uppercase tracking-widest">MP4, MOV Formats</span>
                     )}
                  </div>

                  {/* Documents Upload */}
                  <div
                    onClick={() => handleFileSelect("Document")}
                    className={`rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-Primary/[0.05] transition-all group ${
                      fileType === "Document"
                        ? "bg-Primary/[0.06] border-2 border-Primary/40"
                        : "bg-Primary/[0.02] border-2 border-dashed border-Primary/30"
                    }`}
                  >
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#B59654] shadow-lg shadow-Primary/5 group-hover:scale-110 transition-transform">
                        <FileText size={28} />
                     </div>
                     <span className="text-[#B59654] font-extrabold text-[18px] md:text-[20px]">Document</span>
                     {fileType === "Document" && selectedFile ? (
                       <span className="text-green-600 font-bold text-[11px] text-center leading-tight max-w-full truncate px-2">{selectedFile.name}</span>
                     ) : (
                       <span className="text-[#B59654]/40 font-bold text-[11px] uppercase tracking-widest">PDF, DOC Formats</span>
                     )}
                  </div>
               </div>
               {selectedFile && (
                 <button
                   onClick={() => { setSelectedFile(null); setFileType(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                   className="text-xs text-red-400 font-bold hover:text-red-500 transition-colors self-start ml-1 flex items-center gap-1"
                 >
                   <FileX size={14} /> Remove file
                 </button>
               )}
            </div>
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={!isFormValid || isPending}
            className={`flex items-center justify-center gap-2 px-10 py-4 md:py-5 font-bold rounded-2xl w-full sm:w-fit transition-all ${
              isFormValid && !isPending
                ? "bg-Secondary text-white hover:bg-Secondary/90 shadow-md active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
            }`}
          >
            {isPending ? "Publishing..." : "Publish Record"} <ArrowUpRight size={20} />
          </button>
        </div>

        {/* Asset Repository Card */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col max-h-[600px] overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
             <div className="w-1.5 h-8 bg-Primary rounded-full"></div>
             <div>
                <h2 className="text-[22px] md:text-3xl font-extrabold text-Third leading-tight">Asset Repository</h2>
                <div className="w-24 h-[4px] bg-Secondary/10 rounded-full mt-2"></div>
             </div>
          </div>

          <div className="flex flex-col gap-5 md:gap-6 overflow-y-auto flex-1 custom-scrollbar pt-8">
            {clinicFiles.length > 0 ? (
              clinicFiles.map((file) => {
                const { month, day } = formatDate(file.created_at);
                const isVideo = file.file_type === "Video";
                return (
                  <div key={file.id} className="bg-white border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-5 md:gap-6 w-full sm:w-auto">
                      {/* Date Box */}
                      <div className="bg-Secondary/[0.03] rounded-2xl px-4 py-3 flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] border border-Secondary/5">
                        <span className="text-Secondary/40 font-bold text-[10px] md:text-[11px] uppercase tracking-tighter leading-none mb-1">{month}</span>
                        <span className="text-Secondary font-extrabold text-[20px] md:text-[24px] leading-none shrink-0">{day}</span>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-1 w-full overflow-hidden">
                        <h3 className="text-[17px] md:text-[19px] font-extrabold text-Third group-hover:text-Secondary transition-colors truncate leading-tight">{file.title}</h3>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl w-fit border border-gray-100">
                          {isVideo ? (
                            <Video size={12} className="text-Secondary shrink-0" />
                          ) : (
                            <FileText size={12} className="text-[#B59654] shrink-0" />
                          )}
                          <span className="text-gray-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wide">
                            {file.file_type} {file.extension ? `• ${file.extension}` : ""}
                          </span>
                        </div>
                        {file.file_size && (
                          <span className="text-[10px] text-gray-300 font-bold mt-0.5">{file.file_size}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(file.file_url)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-Secondary/20 text-Secondary font-bold text-[13px] rounded-xl overflow-hidden relative shadow-sm active:scale-95 group/btn"
                    >
                      <div className="absolute inset-0 bg-Secondary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      <Download size={16} className="relative z-10 transition-colors group-hover/btn:text-white" /> 
                      <span className="relative z-10 transition-colors group-hover/btn:text-white">Download</span>
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <UploadCloud size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-300 font-bold text-[15px]">No assets uploaded yet</p>
                <p className="text-gray-200 text-[12px] font-bold mt-1">Publish your first record above</p>
              </div>
            )}
          </div>
          
          {clinicFiles.length > 0 && (
            <div className="mt-auto pt-6 text-center">
               <p className="text-[12px] font-bold text-gray-300 uppercase tracking-widest flex items-center justify-center gap-2">
                  {clinicFiles.length} asset{clinicFiles.length !== 1 ? "s" : ""} in repository
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicFiles;