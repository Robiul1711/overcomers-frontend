import React from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  Download,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProgressReports = () => {
  const navigate = useNavigate();

  const reports = [
    { title: "Weekly Progress Report", date: "Feb 15, 2026", type: "PDF" },
    { title: "ABA Referral", date: "Feb 15, 2026", type: "PDF" },
    { title: "ABA Referral", date: "Feb 15, 2026", type: "PDF" },
    { title: "Behavior Assessment Report", date: "Feb 20, 2026", type: "PDF" },
    { title: "Behavior Assessment Report", date: "Feb 20, 2026", type: "PDF" },
    { title: "Behavior Assessment Report", date: "Feb 20, 2026", type: "PDF" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Reports Section */}
      <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">All Reports</h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {reports.map((report, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#76121F]/20 hover:border-[#76121F] hover:shadow-md transition-all group bg-white cursor-pointer"
            >
              <div className="flex items-center gap-6 w-full">
                <div className="w-14 h-14 bg-[#FEF2F2] rounded-2xl flex items-center justify-center text-[#76121F] transform group-hover:rotate-6 transition-transform border border-[#FEE2E2]">
                  <FileText size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#76121F] group-hover:text-[#800000] transition-colors">
                    {report.title}
                  </h4>
                  <p className="text-[#6B7280] font-medium text-sm">
                    {report.type} · Uploaded {report.date}
                  </p>
                </div>
              </div>

              <button className="w-full md:w-fit flex items-center justify-center gap-2 border-2 border-[#76121F] text-[#76121F] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#76121F] hover:text-white transition-all active:scale-95">
                <Download size={18} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
