import React from "react";
import useClient from "@/hooks/useClient";

const SupervisorDashboard = () => {
  const { data, isLoading, isError } = useClient({
    queryKey: ["supervisorDashboard"],
    url: "/supervisor/dashboard",
  });

  const message = data?.message || "Welcome to Supervisor Dashboard";

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-Primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-red-500 font-poppins">Error</h1>
        <p className="text-gray-500 mt-1">Failed to load supervisor dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 font-poppins">Supervisor Dashboard</h1>
      <p className="text-gray-500 mt-1">{message}</p>
    </div>
  );
};

export default SupervisorDashboard;
