import React from "react";
import { PlusCircle, FileText, Download, ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#76121F] text-white p-2 px-4 rounded-xl text-center shadow-lg transform -translate-y-2 relative">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#76121F] rotate-45"></div>
        <p className="text-[12px] font-medium relative z-10 leading-tight">
          {payload[0].payload?.task_title || "Success"}
        </p>
        <p className="text-[18px] font-bold relative z-10 leading-tight">
          {Math.round(payload[0].value)}%
        </p>
      </div>
    );
  }
  return null;
};

const NotesReportsTab = ({
  onAddNote,
  onAddReport,
  notesData,
  notesLoading,
  notesIsError,
  reportData,
  reportLoading,
  reportIsError,
  taskPerformanceData,
  taskPerformanceLoading,
  taskPerformanceIsError,
  taskPerformanceParams,
  setTaskPerformanceParams,
}) => {
  const overallPerformance = taskPerformanceData?.overall_task_performance;
  const chartData = overallPerformance?.chart_data || [];
  const availablePrograms = overallPerformance?.available_programs || [];
  const taskResponds = taskPerformanceData?.task_responds || [];

  const selectedProgramId = taskPerformanceParams?.program_id;
  const activePeriod = taskPerformanceParams?.period || "all_time";

  // Build chart data from API response
  const dynamicChartData = chartData.map((item) => ({
    name: item.task_label,
    task_title: item.task_title,
    value: Math.round(item.success_rate),
    trials: item.trials,
    correct: item.correct,
    incorrect: item.incorrect,
  }));

  const handlePeriodChange = (period) => {
    setTaskPerformanceParams((prev) => ({
      ...prev,
      period,
    }));
  };

  const handleProgramChange = (programId) => {
    setTaskPerformanceParams((prev) => ({
      ...prev,
      program_id: programId || undefined,
    }));
  };

  const periodValueMap = {
    "All time": "all_time",
    Month: "month",
    Year: "year",
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section>
      {/* overall task performance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Chart Section */}
        <div className="col-span-1 xl:col-span-2 bg-white rounded-[24px] p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#3A331E]">
                Overall Task Performance
              </h2>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-[#6B7280] text-[13px] md:text-[14px] font-medium">
                  Success rate (%) across sessions
                </p>
                <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                  {["Month", "Year", "All time"].map((label) => {
                    const val = periodValueMap[label];
                    return (
                      <button
                        key={label}
                        onClick={() => handlePeriodChange(val)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                          activePeriod === val
                            ? "bg-Secondary text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedProgramId || "all"}
                onChange={(e) =>
                  handleProgramChange(
                    e.target.value === "all" ? undefined : Number(e.target.value),
                  )
                }
                className="appearance-none bg-[#76121F] text-white px-5 py-3 pr-10 rounded-xl font-bold text-[13px] md:text-[14px] shadow-md cursor-pointer outline-none focus:ring-2 focus:ring-[#76121F]/50"
              >
                <option value="all">All Programs</option>
                {availablePrograms.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                size={18}
              />
            </div>
          </div>

          {taskPerformanceLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                <span className="text-gray-400 text-sm font-medium">Loading chart data...</span>
              </div>
            </div>
          ) : taskPerformanceIsError ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <p className="text-[#EF4444] text-sm font-semibold">Failed to load chart data</p>
                <p className="text-gray-400 text-xs mt-1">Please try again later.</p>
              </div>
            </div>
          ) : dynamicChartData.length > 0 ? (
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dynamicChartData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#76121F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#76121F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(val) => `${val}%`}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#76121F",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#76121F"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{
                      r: 6,
                      fill: "#76121F",
                      stroke: "#FFF",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm font-medium">
              No task performance data available for the selected filters.
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="col-span-1 bg-white rounded-[24px] p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-6">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#3A331E]">
              Task Responds
            </h2>
            <p className="text-[#6B7280] text-[13px] md:text-[14px] font-medium">
              Trial data chart
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] rounded-t-xl">
                  <th className="py-4 px-4 font-bold text-[#3A331E] text-[14px] rounded-tl-xl whitespace-nowrap">
                    Program
                  </th>
                  <th className="py-4 px-2 font-bold text-[#3A331E] text-[14px] whitespace-nowrap">
                    Trials
                  </th>
                  <th className="py-4 px-2 font-bold text-[#10B981] text-[14px] whitespace-nowrap">
                    Yes
                  </th>
                  <th className="py-4 px-4 font-bold text-[#EF4444] text-[14px] rounded-tr-xl whitespace-nowrap">
                    No
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {taskResponds.length > 0 ? (
                  taskResponds.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-[#3A331E] text-[13px] font-semibold whitespace-nowrap">
                        {row.program_name}
                      </td>
                      <td className="py-4 px-2 text-[#6B7280] text-[13px] font-medium whitespace-nowrap">
                        {row.trials}
                      </td>
                      <td className="py-4 px-2 text-[#10B981] text-[13px] font-bold whitespace-nowrap">
                        {row.correct}
                      </td>
                      <td className="py-4 px-4 text-[#EF4444] text-[13px] font-bold whitespace-nowrap">
                        {row.incorrect}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-gray-400 text-sm font-medium"
                    >
                      No task response data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Case Notes Column */}
        <div className="flex-1 bg-white rounded-[24px]  p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E]">
              Case Notes
            </h2>
            <button
              onClick={onAddNote}
              className="flex items-center gap-2 bg-[#76121F] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md"
            >
              <PlusCircle size={18} /> Add Note
            </button>
          </div>
          <p className="text-[#6B7280] text-[14px] font-medium mb-4">
            Review important notes and updates related to this case.
          </p>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full mb-8"></div>

          <div className="flex-1 min-h-0 overflow-y-auto max-h-[500px] pr-1 space-y-5 custom-scrollbar">
            {notesData?.map((note, i) => (
              <div
                key={i}
                className="bg-[#FFFBEE] border-l-4 border-[#76121F] rounded-2xl p-6 shadow-sm flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#76121F] font-bold text-[16px]">
                    {note.employee_name} {note.role}
                  </span>
                  <span className="text-gray-400 font-bold text-[13px]">
                    {note.date_formatted}
                  </span>
                  {/* {note.subAuthor && <span className="text-gray-400 font-bold text-[12px] ml-auto">{note.subAuthor}</span>} */}
                </div>
                <p className="text-[#3A331E]/80 text-[14px] leading-relaxed font-medium">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Reports Column */}
        <div className="flex-1 bg-white rounded-[24px]  p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E]">
              Case Reports
            </h2>
            <button
              onClick={onAddReport}
              className="flex items-center gap-2 bg-[#76121F] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md"
            >
              <PlusCircle size={18} /> Add Reports
            </button>
          </div>
          <p className="text-[#6B7280] text-[14px] font-medium mb-4">
            Access files related to this case.
          </p>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full mb-8"></div>

          <div className="flex-1 min-h-0 overflow-y-auto max-h-[500px] pr-1 space-y-4 custom-scrollbar">
            {reportData?.map((report, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between group hover:border-[#76121F]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6F7] flex items-center justify-center text-[#76121F] border border-gray-50">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[17px] font-bold text-[#76121F]">
                      {report?.title}
                    </h4>
                    <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">
                      {report?.type} • Uploaded {report?.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleDownload(report?.file_url, report?.file_name)
                  }
                  className="flex items-center gap-2 border-2 border-[#76121F] text-[#76121F] px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-[#76121F] hover:text-white transition-all active:scale-95"
                >
                  <Download size={16} />
                  Download
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
