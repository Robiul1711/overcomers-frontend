import React from "react";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm flex items-center gap-4 md:gap-6 border border-gray-50 hover:shadow-md transition-shadow"
        >
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5`}
          >
            {stat.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] md:text-[15px] font-bold text-gray-400 mb-0.5 truncate">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-Secondary leading-tight">
                {stat.value}
              </span>
              <span className="text-sm md:text-md font-bold text-Secondary opacity-60">
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
