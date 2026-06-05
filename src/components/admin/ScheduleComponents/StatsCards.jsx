import React from "react";

const StatsCards = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 animate-pulse"
          >
            {/* Icon Skeleton */}
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0" />

            {/* Content Skeleton */}
            <div className="flex-1">
              <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
              <div className="flex items-center gap-2">
                <div className="h-7 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {stats?.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 border border-gray-50 hover:shadow-md transition-shadow"
        >
          <div
            className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5`}
          >
            {stat.icon}
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-400 mb-0.5 truncate">
              {stat.label}
            </p>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-Secondary leading-tight">
                {stat.value}
              </span>

              <span className="text-sm font-bold text-Secondary opacity-60">
                {stat.unit}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;