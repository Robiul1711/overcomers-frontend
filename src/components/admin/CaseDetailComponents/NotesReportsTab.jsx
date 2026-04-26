import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusCircle, FileText, Download, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const chartData = [
  { name: 'Task 1', value: 38 },
  { name: 'Task 2', value: 45 },
  { name: 'Task 3', value: 42 },
  { name: 'Task 4', value: 70 },
  { name: 'Task 5', value: 86 },
  { name: 'Task 6', value: 65 },
  { name: 'Task 7', value: 50 },
  { name: 'Task 8', value: 72 },
  { name: 'Task 9', value: 45 },
  { name: 'Task 10', value: 80 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#76121F] text-white p-2 px-4 rounded-xl text-center shadow-lg transform -translate-y-2 relative">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#76121F] rotate-45"></div>
        <p className="text-[12px] font-medium relative z-10 leading-tight">Yes</p>
        <p className="text-[18px] font-bold relative z-10 leading-tight">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const tableData = [
  { program: "Com. Skills Dev.", trials: "10 times", yes: "7 times", no: "3 times" },
  { program: "Social Int. Fund.", trials: "10 times", yes: "7 times", no: "3 times" },
  { program: "Emot. Rec. & Reg.", trials: "10 times", yes: "7 times", no: "3 times" },
  { program: "Com. Skills Dev.", trials: "10 times", yes: "7 times", no: "3 times" },
];

const NotesReportsTab = ({ onAddNote, onAddReport }) => {
  const taskResults = useSelector(state => state.programs?.taskResults || []);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState("Communication Skills Development");
  const [timeframe, setTimeframe] = useState("All time");

  const selectedProgramResult = taskResults.find(p => p.programTitle === selectedProgramTitle);
  
  // Filtering logic based on timeframe (mocking since we don't have real timestamps for tasks yet)
  const getFilteredTasks = (tasks) => {
    if (!tasks) return [];
    if (timeframe === "Month") return tasks.slice(0, 4); // Just show first 4 for month
    if (timeframe === "Year") return tasks.slice(0, 7);  // Show 7 for year
    return tasks; // All time
  };

  const filteredTasks = getFilteredTasks(selectedProgramResult?.tasks);

  const dynamicChartData = filteredTasks.length > 0 
    ? filteredTasks.map((t, index) => ({
        name: `Task ${index + 1}`,
        value: t.trials > 0 ? Math.round((t.correct / t.trials) * 100) : 0
      }))
    : timeframe === "Month" ? chartData.slice(0, 4) : timeframe === "Year" ? chartData.slice(0, 7) : chartData;

  const dynamicTableData = taskResults.map(p => {
    const totalTrials = p.tasks.reduce((sum, t) => sum + (t.trials || 0), 0);
    const totalYes = p.tasks.reduce((sum, t) => sum + (t.correct || 0), 0);
    const totalNo = p.tasks.reduce((sum, t) => sum + (t.incorrect || 0), 0);
    
    // Create short name for table
    let shortName = p.programTitle;
    if (shortName.includes("Communication")) shortName = "Com. Skills Dev.";
    else if (shortName.includes("Social Interaction")) shortName = "Social Int. Fund.";
    else if (shortName.includes("Emotion Recognition")) shortName = "Emot. Rec. & Reg.";

    return {
      program: shortName,
      trials: `${totalTrials} times`,
      yes: `${totalYes} times`,
      no: `${totalNo} times`
    };
  });

  const finalTableData = dynamicTableData.length > 0 ? dynamicTableData : tableData;

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
    <section>
{/* overall task performance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Chart Section */}
        <div className="col-span-1 xl:col-span-2 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#3A331E]">Overall Task Performance</h2>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-[#6B7280] text-[13px] md:text-[14px] font-medium">Success rate (%) across sessions</p>
                <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                  {["Month", "Year", "All time"].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                        timeframe === tf
                          ? "bg-Secondary text-white shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <select 
                value={selectedProgramTitle}
                onChange={(e) => setSelectedProgramTitle(e.target.value)}
                className="appearance-none bg-[#76121F] text-white px-5 py-3 pr-10 rounded-xl font-bold text-[13px] md:text-[14px] shadow-md cursor-pointer outline-none focus:ring-2 focus:ring-[#76121F]/50">
                <option value="Communication Skills Development">Communication Skills Development</option>
                <option value="Social Interaction Fundamentals">Social Interaction Fundamentals</option>
                <option value="Emotion Recognition & Regulation">Emotion Recognition & Regulation</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={18} />
            </div>
          </div>
          
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicChartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#76121F" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#76121F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                  tickFormatter={(val) => `${val}%`}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#76121F', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#76121F" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  activeDot={{ r: 6, fill: "#76121F", stroke: "#FFF", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <div className="col-span-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-6">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#3A331E]">Task Responds</h2>
            <p className="text-[#6B7280] text-[13px] md:text-[14px] font-medium">Trial data chart</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] rounded-t-xl">
                  <th className="py-4 px-4 font-bold text-[#3A331E] text-[14px] rounded-tl-xl whitespace-nowrap">Program</th>
                  <th className="py-4 px-2 font-bold text-[#3A331E] text-[14px] whitespace-nowrap">Trials</th>
                  <th className="py-4 px-2 font-bold text-[#10B981] text-[14px] whitespace-nowrap">Yes</th>
                  <th className="py-4 px-4 font-bold text-[#EF4444] text-[14px] rounded-tr-xl whitespace-nowrap">No</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {finalTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-[#3A331E] text-[13px] font-semibold whitespace-nowrap">{row.program}</td>
                    <td className="py-4 px-2 text-[#6B7280] text-[13px] font-medium whitespace-nowrap">{row.trials}</td>
                    <td className="py-4 px-2 text-[#10B981] text-[13px] font-bold whitespace-nowrap">{row.yes}</td>
                    <td className="py-4 px-4 text-[#EF4444] text-[13px] font-bold whitespace-nowrap">{row.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default NotesReportsTab;
