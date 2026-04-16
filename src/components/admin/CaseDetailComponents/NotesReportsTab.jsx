import React from 'react';
import { PlusCircle, FileText, Download } from 'lucide-react';

const NotesReportsTab = ({ onAddNote, onAddReport }) => {
  const notes = [
    {
      author: "Eleanor Pena",
      role: "RBT",
      date: "March 5, 2026",
      content: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week."
    },
    {
      author: "Dr. Devon Lane",
      role: "BCBA",
      date: "February 28, 2026",
      content: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week."
    },
    {
      author: "Eleanor Pena",
      role: "RBT",
      date: "March 1, 2026",
      subAuthor: "Sarah Martinez (RBT)",
      content: "Initial session completed. Client was responsive and comfortable in home setting. Baseline data collected for all target behaviors."
    }
  ];

  const reports = [
    { title: "ABA Referral", type: "PDF", date: "Feb 15, 2026" },
    { title: "Behavior Assessment Report", type: "PDF", date: "Feb 20, 2026" },
    { title: "Behavior Assessment Report", type: "PDF", date: "Feb 20, 2026" },
    { title: "Behavior Assessment Report", type: "PDF", date: "Feb 20, 2026" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Case Notes Column */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E]">Case Notes</h2>
          <button 
            onClick={onAddNote}
            className="flex items-center gap-2 bg-[#76121F] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md"
          >
            <PlusCircle size={18} /> Add Note
          </button>
        </div>
        <p className="text-[#6B7280] text-[14px] font-medium mb-4">Review important notes and updates related to this case.</p>
        <div className="w-full h-[2px] bg-[#FFBB03] rounded-full mb-8"></div>

        <div className="flex flex-col gap-5">
          {notes.map((note, i) => (
            <div key={i} className="bg-[#FFFBEE] border-l-4 border-[#76121F] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#76121F] font-bold text-[16px]">{note.author} ({note.role})</span>
                <span className="text-gray-400 font-bold text-[13px]">{note.date}</span>
                {note.subAuthor && <span className="text-gray-400 font-bold text-[12px] ml-auto">{note.subAuthor}</span>}
              </div>
              <p className="text-[#3A331E]/80 text-[14px] leading-relaxed font-medium">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Reports Column */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E]">Case Reports</h2>
          <button 
            onClick={onAddReport}
            className="flex items-center gap-2 bg-[#76121F] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md"
          >
            <PlusCircle size={18} /> Add Reports
          </button>
        </div>
        <p className="text-[#6B7280] text-[14px] font-medium mb-4">Access files related to this case.</p>
        <div className="w-full h-[2px] bg-[#FFBB03] rounded-full mb-8"></div>

        <div className="flex flex-col gap-4">
          {reports.map((report, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between group hover:border-[#76121F]/30 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F7] flex items-center justify-center text-[#76121F] border border-gray-50">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[17px] font-bold text-[#76121F]">{report.title}</h4>
                  <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">{report.type} • Uploaded {report.date}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 border-2 border-[#76121F] text-[#76121F] px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-[#76121F] hover:text-white transition-all active:scale-95">
                <Download size={16} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesReportsTab;
