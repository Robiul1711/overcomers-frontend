import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  Shield,
  TrendingUp,
  Activity,
  Calendar,
  AlertTriangle,
  FileText,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";
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
        <h1 className="text-2xl font-bold text-red-500 font-poppins">Error</h1>
        <p className="text-gray-500 mt-1 font-poppins">
          Failed to load dashboard statistics. Please try again later.
        </p>
      </div>
    );
  }

  const dataStats = dashboardData.stats || {};
  const alerts = dashboardData.alerts || {};
  const pendingApps = dashboardData.pending_applications || {};

  const expiringInsurances = alerts.expiring_insurances || [];
  const expiringDocuments = alerts.expiring_documents || [];

  const kpis = [
    {
      title: "Total Patients",
      value: dataStats.total_patients ?? 0,
      icon: <Users className="text-emerald-600" size={24} />,
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100/80",
      textColor: "text-emerald-700",
      description: "Active clinical child profiles",
    },
    {
      title: "Total Supervisors",
      value: dataStats.total_supervisors ?? 0,
      icon: <Shield className="text-indigo-600" size={24} />,
      bgColor: "bg-indigo-50/50",
      borderColor: "border-indigo-100/80",
      textColor: "text-indigo-700",
      description: "BCBA clinical supervisors",
    },
    {
      title: "Total RBTs",
      value: dataStats.total_rbts ?? 0,
      icon: <UserCheck className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-100/80",
      textColor: "text-purple-700",
      description: "Behavior Technicians on staff",
    },
    {
      title: "Active Cases",
      value: dataStats.active_cases ?? 0,
      icon: <Activity className="text-Secondary" size={24} />,
      bgColor: "bg-red-50/50",
      borderColor: "border-red-100/80",
      textColor: "text-Secondary",
      description: "Ongoing client caseloads",
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
          <span>
            Today:{" "}
            <strong className="text-Third">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </strong>
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden group hover:-translate-y-1 duration-300"
          >
            {/* Subtle background decoration on hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-20 shrink-0" />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                <span className="text-3xl md:text-4xl font-black text-Third tracking-tight mt-2 leading-none">
                  {stat.value}
                </span>
              </div>
              <div className={`p-3.5 ${stat.bgColor} border ${stat.borderColor} rounded-2xl shadow-sm shrink-0`}>
                {stat.icon}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium relative z-10">
              <span>{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Alerts feed on left, Pending / Actions on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Compliance Alerts Panel */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-50">
            <h2 className="text-lg font-bold text-Third tracking-tight flex items-center gap-2">
              <AlertTriangle className="text-Secondary" size={20} />
              Compliance Alerts
            </h2>
            <span className="px-2.5 py-0.5 bg-red-50 text-Secondary text-[10px] font-bold rounded-full">
              {expiringInsurances.length + expiringDocuments.length} Action Needed
            </span>
          </div>

          <div className="flex flex-col gap-5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
            {/* Expiring Insurances list */}
            {expiringInsurances.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Expiring Insurance Authorizations
                </span>
                <div className="flex flex-col gap-3">
                  {expiringInsurances.map((ins) => {
                    const isExpired = ins.days_remaining < 0;
                    return (
                      <div
                        key={ins.id}
                        className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-red-50 text-Secondary flex items-center justify-center shrink-0">
                            <Shield size={16} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-Third">{ins.patient_name}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                              Provider: {ins.insurance_provider} • End Date: {ins.auth_end_date}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {isExpired ? (
                            <span className="px-2.5 py-1 bg-red-100/80 text-red-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider border border-red-200">
                              Expired {Math.abs(ins.days_remaining)} days ago
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-100/80 text-amber-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider border border-amber-200">
                              Expires in {ins.days_remaining} days
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expiring Documents list */}
            {expiringDocuments.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Expiring Staff Credentials
                </span>
                <div className="flex flex-col gap-3">
                  {expiringDocuments.map((doc) => {
                    const isExpired = doc.days_remaining <= 0;
                    return (
                      <div
                        key={doc.id}
                        className="bg-[#FFFDF6] border border-[#F7EED9] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-Third">{doc.employee_name}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                              Doc: {doc.document_name} • Expires: {doc.expiration_date}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {isExpired ? (
                            <span className="px-2.5 py-1 bg-red-100/80 text-red-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider border border-red-200">
                              Expired
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-100/80 text-amber-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider border border-amber-200">
                              Expires Today
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state fallback */}
            {expiringInsurances.length === 0 && expiringDocuments.length === 0 && (
              <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-150 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-sm text-Third">All Credentials Valid</h4>
                <p className="text-gray-400 text-xs max-w-[280px]">
                  No insurance policies or employee credentials are set to expire in the near future.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pending & Quick Actions column */}
        <div className="flex flex-col gap-6">
          
          {/* Pending Applications Box */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <h2 className="text-lg font-bold text-Third tracking-tight">Pending Registrations</h2>
              <span className="px-2.5 py-1 bg-Secondary/10 text-Secondary text-[11px] font-bold rounded-lg border border-Secondary/10">
                {pendingApps.total ?? 0} Total
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Doctors", val: pendingApps.doctors ?? 0, color: "text-indigo-600", bg: "bg-indigo-50/40" },
                { label: "Parents", val: pendingApps.parents ?? 0, color: "text-emerald-600", bg: "bg-emerald-50/40" },
                { label: "Employees", val: pendingApps.employees ?? 0, color: "text-purple-600", bg: "bg-purple-50/40" },
              ].map((app, idx) => (
                <div
                  key={idx}
                  className={`${app.bg} p-4 rounded-2xl border border-gray-50 text-center flex flex-col justify-center gap-1`}
                >
                  <span className={`text-2xl font-bold leading-none ${app.color}`}>{app.val}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{app.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 flex-1 justify-center">
            <div>
              <h2 className="text-lg font-bold text-Third tracking-tight">Operational Quick Actions</h2>
              <p className="text-gray-400 text-xs mt-1 font-medium">Quick link routes to director management components.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/director-dashboard/cases"
                className="p-4 bg-[#FFFDF6] hover:bg-[#FAF6F7] border border-[#F7EED9] hover:border-Secondary/30 rounded-2xl transition-all flex flex-col gap-2 group shadow-xs"
              >
                <Users size={20} className="text-Secondary group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-[#76121F]">Manage Cases</span>
                <span className="text-[11px] text-gray-400 font-semibold leading-tight">Assign supervisor caseloads</span>
              </Link>
              <Link
                to="/director-dashboard/staff"
                className="p-4 bg-[#FFFDF6] hover:bg-[#FAF6F7] border border-[#F7EED9] hover:border-Secondary/30 rounded-2xl transition-all flex flex-col gap-2 group shadow-xs"
              >
                <UserCheck size={20} className="text-Secondary group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-[#76121F]">Staff Directory</span>
                <span className="text-[11px] text-gray-400 font-semibold leading-tight">View RBTs & BCBAs registry</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default DirectorDashboard;
