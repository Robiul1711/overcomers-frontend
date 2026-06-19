import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ProfileTab = ({
  onViewClientDetail,
  onViewMember,
  dataCasted,
  isLoading,
}) => {
  // console.log(dataCasted)
  const serviceDetailData = dataCasted?.service_details;
  const assignedProfessionals =
    dataCasted?.service_details?.assigned_professionals;
  const [selectedMember, setSelectedMember] = useState(null);

  const clientInfo = [
    { label: "Client Name", value: dataCasted?.client_name || "N/A" },
    {
      label: "Date of Birth",
      value: dataCasted?.client_information?.date_of_birth || "N/A",
    },
    {
      label: "Service Location",
      value: dataCasted?.client_information?.service_location || "N/A",
    },
    {
      label: "Assigned Date",
      value: dataCasted?.client_information?.assigned_date || "N/A",
    },
  ];

  // Skeleton component for loading state
  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Client Information Skeleton */}
        <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
          <div className="mb-8">
            <div className="h-[36px] w-[200px] bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="w-full h-[2px] bg-gray-100 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3"
              >
                <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                <div className="h-5 w-32 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-[18px] w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Service Details Skeleton */}
        <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
          <div className="mb-8">
            <div className="h-[36px] w-[180px] bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="w-full h-[2px] bg-gray-100 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3"
              >
                <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                <div className="h-5 w-28 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
                <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse mt-1" style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3"
              >
                <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Client Information Card */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">
            Client Information
          </h2>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {clientInfo.map((info, i) => (
            <div
              key={i}
              className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5"
            >
              <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">
                {info.label}
              </p>
              <p className="text-[#800000] font-bold text-[18px] leading-tight">
                {info.value}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onViewClientDetail}
          className="mt-4 flex items-center gap-1.5 text-[#76121F] font-bold text-[15px] hover:underline transition-all w-fit"
        >
          View More <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Service Details Card */}
      <div className="flex-1 bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 flex flex-col">
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#3A331E] leading-tight mb-2">
            Service Details
          </h2>
          <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {assignedProfessionals?.map((info, i) => (
            <div
              key={i}
              className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5"
            >
              <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">
                {info.role}
              </p>
              <p className="text-[#800000] font-bold text-[18px] leading-tight">
                {info.assigned_therapist}
              </p>

              <button
                onClick={() => setSelectedMember(info)}
                className="mt-1 flex items-center gap-1.5 text-[#76121F] font-bold text-[12px] hover:underline transition-all"
              >
                View More <ArrowUpRight size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <div className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5">
            <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">
              Session Frequency
            </p>
            <p className="text-[#800000] font-bold text-[18px] leading-tight">
              {serviceDetailData?.session_frequency}
            </p>
          </div>
          <div className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5">
            <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">
              Service Start Date
            </p>
            <p className="text-[#800000] font-bold text-[18px] leading-tight">
              {serviceDetailData?.service_start_date}
            </p>
          </div>
          <div className="bg-[#FFFBEE] rounded-2xl p-5 border border-[#FFF3D6] flex flex-col gap-1.5">
            <p className="text-[#800000]/50 text-[11px] font-bold uppercase tracking-wider leading-none">
              Session Time
            </p>
            <p className="text-[#800000] font-bold text-[18px] leading-tight">
              {serviceDetailData?.session_time}
            </p>
          </div>
        </div>
      </div>
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#76121F] px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-bold">
                  {selectedMember.role}
                </h3>
                <p className="text-[#FFBB03] text-sm">Professional Details</p>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-white text-2xl font-bold hover:opacity-70"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="bg-[#FFFBEE] rounded-2xl p-4 border border-[#FFF3D6]">
                <p className="text-xs font-bold uppercase text-[#800000]/50">
                  Full Name
                </p>
                <p className="text-lg font-bold text-[#800000]">
                  {selectedMember.assigned_therapist}
                </p>
              </div>

              <div className="bg-[#FFFBEE] rounded-2xl p-4 border border-[#FFF3D6]">
                <p className="text-xs font-bold uppercase text-[#800000]/50">
                  Role
                </p>
                <p className="text-lg font-bold text-[#800000]">
                  {selectedMember.role}
                </p>
              </div>

              <div className="bg-[#FFFBEE] rounded-2xl p-4 border border-[#FFF3D6]">
                <p className="text-xs font-bold uppercase text-[#800000]/50">
                  Phone Number
                </p>
                <p className="text-lg font-bold text-[#800000]">
                  {selectedMember.phone}
                </p>
              </div>

              <div className="bg-[#FFFBEE] rounded-2xl p-4 border border-[#FFF3D6]">
                <p className="text-xs font-bold uppercase text-[#800000]/50">
                  Email Address
                </p>
                <p className="text-lg font-bold text-[#800000] break-all">
                  {selectedMember.email}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-[#76121F] text-white py-3 rounded-xl font-semibold hover:bg-[#600000] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
