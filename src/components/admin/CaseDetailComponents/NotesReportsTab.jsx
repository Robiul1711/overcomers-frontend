import React from "react";
import { toast } from "sonner";
import { PlusCircle, FileText, Download, ChevronDown, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatTime = (timeStr, customTz) => {
  if (!timeStr) return "—";
  try {
    const dateStr = timeStr.includes("T") ? timeStr : timeStr.replace(" ", "T");
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return timeStr;

    const options = {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    };

    if (customTz) {
      try {
        options.timeZone = customTz;
      } catch {}
    }

    return date.toLocaleString("en-US", options);
  } catch (e) {
    return timeStr;
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const label = payload[0].payload?.name || payload[0].payload?.task_title || "Success";
    return (
      <div className="bg-[#76121F] text-white p-2 px-4 rounded-xl text-center shadow-lg transform -translate-y-2 relative">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#76121F] rotate-45"></div>
        <p className="text-[12px] font-medium relative z-10 leading-tight">
          {label}
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
  sessionNotesData,
  sessionNotesLoading,
  sessionNotesIsError,
  taskPerformanceData,
  taskPerformanceLoading,
  taskPerformanceIsError,
  taskPerformanceParams,
  setTaskPerformanceParams,
  clientName,
}) => {
  const overallPerformance = taskPerformanceData?.overall_task_performance;
  const chartData = overallPerformance?.chart_data || [];
  const availablePrograms = overallPerformance?.available_programs || [];
  const taskResponds = taskPerformanceData?.task_responds || [];

  const selectedProgramId = taskPerformanceParams?.program_id;
  const activePeriod = taskPerformanceParams?.period || "all_time";
  const [isDownloadingGraph, setIsDownloadingGraph] = React.useState(false);

  // Build chart data from API response
  const dynamicChartData = React.useMemo(() => {
    const hasHistory = chartData.some(
      (item) => Array.isArray(item.history) && item.history.length > 0
    );

    if (hasHistory) {
      const dateMap = {};
      chartData.forEach((item) => {
        if (Array.isArray(item.history)) {
          item.history.forEach((hist) => {
            const d = hist.date;
            if (!dateMap[d]) {
              dateMap[d] = {
                date: d,
                date_formatted: hist.date_formatted || d,
                trials: 0,
                correct: 0,
                incorrect: 0,
              };
            }
            dateMap[d].trials += hist.trials || 0;
            dateMap[d].correct += hist.correct || 0;
            dateMap[d].incorrect += hist.incorrect || 0;
          });
        }
      });

      const sortedDates = Object.keys(dateMap).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      return sortedDates.map((d) => {
        const dayData = dateMap[d];
        const successRate =
          dayData.trials > 0 ? (dayData.correct / dayData.trials) * 100 : 0;
        return {
          name: dayData.date_formatted,
          date: dayData.date,
          value: Math.round(successRate),
          trials: dayData.trials,
          correct: dayData.correct,
          incorrect: dayData.incorrect,
        };
      });
    }

    return chartData.map((item) => ({
      name: item.task_label,
      task_title: item.task_title,
      value: Math.round(item.success_rate),
      trials: item.trials,
      correct: item.correct,
      incorrect: item.incorrect,
    }));
  }, [chartData]);

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

  const handleDownloadGraph = async () => {
    const chartElement = document.getElementById("overall-performance-chart-container-admin");
    if (!chartElement) {
      toast.error("Performance chart element not found.");
      return;
    }

    setIsDownloadingGraph(true);
    try {
      const canvas = await html2canvas(chartElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: chartElement.offsetWidth,
        height: chartElement.offsetHeight,
        onclone: (clonedDoc) => {
          // Remove stylesheet links to prevent html2canvas parsing oklch from Tailwind v4
          const stylesheets = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          stylesheets.forEach(el => el.remove());

          // Replace oklch in inline style tags
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach(style => {
            try {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, "rgb(118, 18, 31)");
            } catch (e) {}
          });

          const clonedElement = clonedDoc.getElementById("overall-performance-chart-container-admin");
          if (clonedElement) {
            clonedElement.style.width = `${chartElement.offsetWidth}px`;
            clonedElement.style.height = `${chartElement.offsetHeight}px`;
            clonedElement.style.backgroundColor = "#ffffff";
            
            // Clean inline oklch styles on all children
            const allElements = clonedElement.getElementsByTagName("*");
            for (let el of allElements) {
              const styleAttr = el.getAttribute("style");
              if (styleAttr && styleAttr.includes("oklch")) {
                el.setAttribute("style", styleAttr.replace(/oklch\([^)]+\)/g, "rgb(118, 18, 31)"));
              }
            }

            const svgs = clonedElement.getElementsByTagName("svg");
            for (let svg of svgs) {
              svg.setAttribute("width", chartElement.offsetWidth.toString());
              svg.setAttribute("height", chartElement.offsetHeight.toString());
              svg.style.width = `${chartElement.offsetWidth}px`;
              svg.style.height = `${chartElement.offsetHeight}px`;
            }
          }
        }
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("l", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(118, 18, 31);
      pdf.rect(0, 0, pageWidth, 20, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("OVERALL TASK PERFORMANCE REPORT", 15, 13);

      pdf.setTextColor(60, 60, 60);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      
      pdf.text(`Client Name: ${clientName || "N/A"}`, 15, 32);
      
      const selectedProg = availablePrograms.find(p => p.id === selectedProgramId);
      pdf.text(`Program/Task: ${selectedProg ? selectedProg.name : "All Programs"}`, 15, 40);
      
      const periodLabel = activePeriod === "month" ? "Month" : activePeriod === "year" ? "Year" : "All Time";
      pdf.text(`Period: ${periodLabel}`, 15, 48);
      
      const todayStr = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      pdf.text(`Report Date: ${todayStr}`, 15, 56);

      pdf.setDrawColor(220, 220, 220);
      pdf.line(15, 62, pageWidth - 15, 62);

      const imgWidth = pageWidth - 30;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 15, 68, imgWidth, Math.min(imgHeight, pageHeight - 80));

      pdf.save(`Performance_Report_${(clientName || "Client").replace(/\s+/g, "_")}.pdf`);
      toast.success("Performance report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading graph:", error);
      toast.error(`Failed to download report: ${error.message || error}`);
    } finally {
      setIsDownloadingGraph(false);
    }
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
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    try {
      const dateObj = new Date(timeStr.replace(" ", "T"));
      if (isNaN(dateObj.getTime())) {
        const parts = timeStr.split(" ");
        if (parts.length > 1) {
          const timeParts = parts[1].split(":");
          if (timeParts.length > 1) {
            return `${timeParts[0]}:${timeParts[1]}`;
          }
        }
        return timeStr;
      }
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    } catch (e) {
      return timeStr;
    }
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
            <div className="flex items-center gap-2">
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
              <button
                onClick={handleDownloadGraph}
                disabled={isDownloadingGraph || dynamicChartData.length === 0}
                className="flex items-center gap-2 bg-[#76121F] hover:bg-[#600000] text-white px-5 py-3 rounded-xl font-bold text-[13px] md:text-[14px] shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download report PDF"
              >
                {isDownloadingGraph ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Download size={18} />
                )}
                <span>{isDownloadingGraph ? "Downloading..." : "Download Report"}</span>
              </button>
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
            <div id="overall-performance-chart-container-admin" className="w-full h-[300px] bg-white">
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Case Notes Column */}
        <div className="bg-white rounded-[24px]  p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
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
            {notesLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-sm font-medium">Loading notes...</span>
                </div>
              </div>
            ) : notesIsError ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-[#EF4444] text-sm font-semibold">Failed to load notes</p>
              </div>
            ) : notesData && notesData.length > 0 ? (
              notesData.map((note, i) => (
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
                  </div>
                  <p className="text-[#3A331E]/80 text-[14px] leading-relaxed font-medium">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm font-medium">
                No notes available.
              </div>
            )}
          </div>
        </div>

        {/* Case Reports Column */}
        <div className="bg-white rounded-[24px]  p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
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
            {reportLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-sm font-medium">Loading reports...</span>
                </div>
              </div>
            ) : reportIsError ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-[#EF4444] text-sm font-semibold">Failed to load reports</p>
              </div>
            ) : reportData && reportData.length > 0 ? (
              reportData.map((report, i) => (
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
              ))
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm font-medium">
                No reports available.
              </div>
            )}
          </div>
        </div>

        {/* Session Notes Column */}
        <div className="bg-white rounded-[24px] p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E]">
              Session Notes
            </h2>
          </div>
          <p className="text-[#6B7280] text-[14px] font-medium mb-4">
            Recent session details and supervisor/RBT session notes.
          </p>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full mb-8"></div>

          <div className="flex-1 min-h-0 overflow-y-auto max-h-[500px] pr-1 space-y-5 custom-scrollbar">
            {sessionNotesLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#76121F]/20 border-t-[#76121F] rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-sm font-medium">Loading session notes...</span>
                </div>
              </div>
            ) : sessionNotesIsError ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <p className="text-[#EF4444] text-sm font-semibold">Failed to load session notes</p>
                  <p className="text-gray-400 text-xs mt-1">Please try again later.</p>
                </div>
              </div>
            ) : sessionNotesData && sessionNotesData.length > 0 ? (
              sessionNotesData.map((sessionNote, i) => (
                <div
                  key={i}
                  className="bg-[#FFFDF6] border border-[#F7EED9] border-l-4 border-l-[#76121F] rounded-2xl p-6 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <span className="text-[#76121F] font-bold text-[15px] uppercase">
                      {sessionNote.session_name || "SESSION"}
                    </span>
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${
                      sessionNote.status === "approved" || sessionNote.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : sessionNote.status === "pending" || sessionNote.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {sessionNote.status || "Completed"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500 font-medium">
                    <span>By: <strong className="text-gray-700">{sessionNote.employee_name || "Therapist"}</strong></span>
                    <span className="text-gray-300">•</span>
                    <span>{sessionNote.date_formatted}</span>
                  </div>
                  {(sessionNote.start_time || sessionNote.end_time) && (
                    <div className="text-[12px] text-gray-500 font-medium bg-gray-50/50 p-2 rounded-lg flex justify-between gap-2">
                      <span>Start: {formatTime(sessionNote.start_time, sessionNote.time_zone || sessionNote.timezone)}</span>
                      <span>End: {formatTime(sessionNote.end_time, sessionNote.time_zone || sessionNote.timezone)}</span>
                    </div>
                  )}
                  <p className="text-[#3A331E]/80 text-[14px] leading-relaxed font-medium mt-1">
                    {sessionNote.content || sessionNote.notes || "No content provided."}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm font-medium">
                No session notes available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesReportsTab;
