import React from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, Shield, TrendingUp, Activity, Calendar } from "lucide-react";
import useClient from "@/hooks/useClient";

const DirectorDashboard = () => {
  const { data: resData, isLoading, isError } = useClient({
    queryKey: ["directorDashboard"],
    url: "/director/dashboard",
  });

  const dashboardData = resData?.data;
  const message = resData?.message || "Welcome to Director Dashboard";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-Primary"></div>
      </div>
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 font-poppins">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-500 mt-1">Failed to load dashboard statistics. Please try again later.</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Patients",
      value: dashboardData.total_patients ?? 0,
      icon: <Users className="text-emerald-600" size={24} />,
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100/80",
      textColor: "text-emerald-700",
      description: "Active clinical cases & child profiles",
    },
    {
      title: "Total Supervisors",
      value: dashboardData.total_supervisors ?? 0,
      icon: <Shield className="text-indigo-600" size={24} />,
      bgColor: "bg-indigo-50/50",
      borderColor: "border-indigo-100/80",
      textColor: "text-indigo-700",
      description: "Board Certified Behavior Analysts (BCBAs)",
    },
    {
      title: "Total RBTs",
      value: dashboardData.total_rbts ?? 0,
      icon: <UserCheck className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-100/80",
      textColor: "text-purple-700",
      description: "Registered Behavior Technicians on staff",
    },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-poppins text-Third w-full">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Director Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">{message}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 bg-[#FAF6F7] px-4 py-2.5 rounded-2xl border border-gray-50">
          <Calendar size={18} className="text-Secondary" />
          <span>Today: <strong className="text-Third">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-6 relative overflow-hidden group hover:-translate-y-1 duration-300"
          >
            {/* Subtle background decoration on hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-20 shrink-0" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                <span className="text-4xl md:text-5xl font-black text-Third tracking-tight mt-2">
                  {stat.value}
                </span>
              </div>
              <div className={`p-4 ${stat.bgColor} border ${stat.borderColor} rounded-2xl shadow-sm shrink-0`}>
                {stat.icon}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
              <span>{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Overview/Additional Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-50 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Quick Actions</h2>
            <Activity size={18} className="text-Secondary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/director-dashboard/cases"
              className="p-4 bg-gray-50 hover:bg-Primary/10 border border-gray-100 hover:border-Primary rounded-2xl transition-all flex flex-col gap-2 group"
            >
              <Users size={20} className="text-Secondary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Manage Cases</span>
              <span className="text-xs text-gray-400 font-medium">View and assign cases</span>
            </Link>
            <Link
              to="/director-dashboard/staff"
              className="p-4 bg-gray-50 hover:bg-Primary/10 border border-gray-100 hover:border-Primary rounded-2xl transition-all flex flex-col gap-2 group"
            >
              <UserCheck size={20} className="text-Secondary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Staff Directory</span>
              <span className="text-xs text-gray-400 font-medium">Directory of RBTs and BCBAs</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-50 shadow-sm flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Operational Insights</h2>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Welcome to the Clinical Director oversight panel. Here you can monitor caseloads, supervise staffing ratios between Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs), and ensure compliance standards are met across all active therapy sessions.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl w-fit">
            <TrendingUp size={14} /> All clinical systems operational.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;
