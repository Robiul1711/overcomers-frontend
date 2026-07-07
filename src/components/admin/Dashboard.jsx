import React from "react";
import { Briefcase, FileText, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import ClientSchedule from "./CaseDetailComponents/Modals/ClientSchedule";
import useClient from "@/hooks/useClient";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const { data, isLoading, isError } = useClient({
    queryKey: ["employeeDashboard"],
    url: "/employee/dashboard",
  });

  const stats = data?.data?.stats || {};
  const casesData = data?.data?.recent_cases || [];

  const statsConfig = [
    {
      key: "active_cases",
      label: "Active Cases",
      icon: Briefcase,
    },
    {
      key: "pending_documents",
      label: "Pending Documents",
      icon: FileText,
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100/70 text-green-600";
      case "Pending":
        return "bg-orange-100 text-orange-500";
      case "Completed":
        return "bg-blue-100/70 text-blue-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const SkeletonBox = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Welcome Section Skeleton */}
        <div className="px-1 flex flex-col gap-2">
          <SkeletonBox className="h-7 w-72" />
          <SkeletonBox className="h-4 w-96" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6"
            >
              <SkeletonBox className="w-[48px] md:w-[52px] h-[48px] md:h-[52px] rounded-xl shrink-0" />
              <div className="flex flex-col gap-2">
                <SkeletonBox className="h-8 w-16" />
                <SkeletonBox className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Cases Skeleton */}
        <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 md:p-7 border-b border-gray-100">
            <div className="flex flex-col gap-2">
              <SkeletonBox className="h-6 w-52" />
              <SkeletonBox className="h-4 w-72" />
            </div>
            <div className="flex gap-3">
              <SkeletonBox className="h-11 w-40 rounded-xl" />
              <SkeletonBox className="h-11 w-40 rounded-xl" />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/80">
                  {[
                    "Client Name",
                    "Case ID",
                    "Date",
                    "Time",
                    "Location",
                    "Status",
                    "Action",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-4 w-32" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-4 w-20" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-4 w-28" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-4 w-24" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-4 w-24" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-7 w-20 rounded-full" />
                    </td>
                    <td className="py-4 md:py-5 px-6">
                      <SkeletonBox className="h-8 w-28 rounded-lg" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden py-3 px-6 bg-gray-50/30 text-center border-t border-gray-100">
            <SkeletonBox className="h-3 w-64 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[300px] text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Welcome Section */}
      <div className="px-1">
        <h2 className="text-[22px] sm:text-[26px] font-bold text-Third leading-tight">
          {data?.data?.welcome_message}
        </h2>

        <p className="text-gray-500 text-[14px] sm:text-[15px] mt-1.5">
          Here is an overview of your assignments, documents, and recent
          activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {statsConfig.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6 hover:shadow-md transition-shadow"
            >
              <div className="w-[48px] md:w-[52px] h-[48px] md:h-[52px] rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Icon className="text-Secondary w-5 h-5 md:w-6 md:h-6" />
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-2xl md:text-3xl font-extrabold text-Secondary leading-none">
                  {stats[item.key] ?? 0}
                </h3>

                <p className="text-Secondary text-[14px] md:text-[15px] font-medium mt-1">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-50 overflow-hidden p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 ">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-Third">
              Recent Case Assignments
            </h3>

            <p className="text-gray-500 text-[13px] md:text-sm mt-0.5">
              View the most recent cases assigned to you
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[13px] py-2.5 px-6 rounded-xl transition duration-300 shadow-sm active:scale-95"
            >
              <Clock
                size={18}
                className="group-hover/btn:-rotate-12 transition-transform hidden sm:block"
              />
              Create Program
            </button> */}

            <Link
              to="/dashboard/cases"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] py-2.5 px-6 rounded-xl transition duration-300 shadow-sm active:scale-95"
            >
              View All Cases
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <ClientSchedule
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Client Name
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Case ID
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Time
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Location
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {casesData.length > 0 ? (
                casesData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors p-4 border border-gray-200 rounded-xl "
                  >
                    <td className="py-4 md:py-5 px-6">
                      <span className="font-bold text-Third text-[14px]">
                        {item.client_name}
                      </span>
                    </td>

                    <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">
                      {item.case_id}
                    </td>

                    <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium whitespace-nowrap">
                      {item.date}
                    </td>

                    <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">
                      {item.time}
                    </td>

                    <td className="py-4 md:py-5 px-6 text-gray-500 text-[14px] font-medium">
                      {item.location}
                    </td>

                    <td className="py-4 md:py-5 px-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-block leading-none border border-transparent ${getStatusStyles(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 md:py-5 px-6">
                      <Link
                        to={`/dashboard/cases/${item.id}`}
                        className="inline-flex items-center justify-center border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[12px] py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-gray-500 font-medium"
                  >
                    No recent cases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden py-3 px-6 bg-gray-50/30 text-center border-t border-gray-100">
          <p className="text-[11px] text-gray-400 italic">
            Scroll horizontally to view more details
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
