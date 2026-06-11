import React from "react";
import {
  Download,
  FileText,
  User,
  Calendar,
  HardDrive,
} from "lucide-react";
import useClient from "@/hooks/useClient";

const SkeletonCard = () => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-gray-100 bg-white animate-pulse">
    <div className="flex items-center gap-6 w-full">
      <div className="w-14 h-14 bg-gray-200 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2.5 w-full">
        <div className="h-5 bg-gray-200 rounded-full w-3/5" />
        <div className="h-3.5 bg-gray-100 rounded-full w-2/5" />
      </div>
    </div>
    <div className="w-full md:w-28 h-11 bg-gray-200 rounded-xl" />
  </div>
);

const ProgressReports = () => {
  const { data, isLoading } = useClient({
    queryKey: ["parentProgressReports"],
    url: "/parent/progress-reports",
  });

  const reports = data?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Reports Section */}
      <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">All Reports</h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-bold text-gray-400">No reports yet</p>
            <p className="text-sm text-gray-300 mt-1">
              Progress reports will appear here once available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#76121F]/20 hover:border-[#76121F] hover:shadow-md transition-all group bg-white cursor-pointer"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-14 h-14 bg-[#FEF2F2] rounded-2xl flex items-center justify-center text-[#76121F] transform group-hover:rotate-6 transition-transform border border-[#FEE2E2]">
                    <FileText size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-[#76121F] group-hover:text-[#800000] transition-colors truncate">
                      {report.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-[#6B7280] font-medium text-sm flex items-center gap-1.5">
                        <User size={13} className="shrink-0" />
                        {report.employee_name}
                      </span>
                      <span className="text-[#6B7280] font-medium text-sm flex items-center gap-1.5">
                        <Calendar size={13} className="shrink-0" />
                        {report.date_formatted}
                      </span>
                      <span className="text-[#6B7280] font-medium text-sm flex items-center gap-1.5">
                        <HardDrive size={13} className="shrink-0" />
                        {report.file_size}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-fit flex items-center justify-center gap-2 border-2 border-[#76121F] text-[#76121F] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#76121F] hover:text-white transition-all active:scale-95 shrink-0"
                >
                  <Download size={18} /> Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressReports;
