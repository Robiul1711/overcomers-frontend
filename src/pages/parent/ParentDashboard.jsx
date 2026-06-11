import React, { useState } from "react";
import {
  ClipboardList,
  Bell,
  Calendar,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useClient from "@/hooks/useClient";


const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const ParentDashboard = () => {
  const { data, isLoading, isError } = useClient({
    queryKey: ["parentDashboard" ],
    url: "/parent/dashboard",
  });
const StatsData=data?.data?.stats

const ChildData=data?.data?.child
const CareTeam=data?.data?.care_team
const NewNotes=data?.data?.new_notes
const NextSessonData=data?.data?.next_session
// console.log("New",NewNotes)
  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[#F3F4F6] flex items-center gap-4">
              <SkeletonBox className="w-12 h-12 rounded-xl" />
              <div className="space-y-2">
                <SkeletonBox className="h-7 w-14" />
                <SkeletonBox className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* My Child Card Skeleton */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[#F3F4F6] flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <div className="space-y-2">
                <SkeletonBox className="h-7 w-28" />
                <SkeletonBox className="h-4 w-44" />
              </div>
              <SkeletonBox className="h-10 w-28 rounded-xl" />
            </div>
            <div className="bg-gray-50/50 p-5 rounded-xl mb-4 border border-gray-100/50">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-4">
                <SkeletonBox className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                  <SkeletonBox className="h-6 w-36 mx-auto sm:mx-0" />
                  <SkeletonBox className="h-4 w-48 mx-auto sm:mx-0" />
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <SkeletonBox className="h-6 w-32 rounded-full" />
                    <SkeletonBox className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-200/50 pt-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col items-center sm:items-start gap-1">
                    <SkeletonBox className="h-3 w-16" />
                    <SkeletonBox className="h-4 w-28" />
                    <SkeletonBox className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Clinical Notes Skeleton */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-[#F3F4F6] flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <div className="space-y-2">
                <SkeletonBox className="h-7 w-36" />
                <SkeletonBox className="h-4 w-48" />
              </div>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-50/50 p-5 md:p-6 rounded-[24px] border-l-[4px] border-gray-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                    <SkeletonBox className="h-5 w-44" />
                    <SkeletonBox className="h-4 w-24" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBox className="h-4 w-full" />
                    <SkeletonBox className="h-4 w-3/4" />
                    <SkeletonBox className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Session Banner Skeleton */}
        <div className="bg-gray-300 rounded-xl p-3 md:p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div className="w-full xl:w-auto space-y-3">
            <SkeletonBox className="h-4 w-24 bg-white/30" />
            <SkeletonBox className="h-6 w-64 bg-white/30" />
            <div className="flex flex-wrap gap-2">
              <SkeletonBox className="h-8 w-32 rounded-xl bg-white/30" />
              <SkeletonBox className="h-8 w-40 rounded-xl bg-white/30" />
              <SkeletonBox className="h-8 w-36 rounded-xl bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Programs",
            count: StatsData?.active_programs || 0,
            icon: <Calendar className="text-Secondary" />,
            bgColor: "bg-white",
          },
          {
            label: "New Notes",
            count: StatsData?.new_notes || 0,
            icon: <ClipboardList className="text-Secondary" />,
            bgColor: "bg-white",
          },
          {
            label: "Progress Updates",
            count: StatsData?.progress_updates || 0,
            icon: <FileText className="text-Secondary" />,
            bgColor: "bg-white",
          },
          {
            label: "New Notification",
            count: StatsData?.new_notifications || 0,
            icon: <Bell className="text-Secondary" />,
            bgColor: "bg-white",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-3 md:p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border border-[#F3F4F6]"
          >
            <div className="p-2.5 md:p-3 bg-Secondary/5 rounded-xl">
              {React.cloneElement(stat.icon, { size: 20 })}
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-Third leading-none">
                {stat.count}
              </div>
              <div className="text-[12px] md:text-sm font-bold text-gray-400 mt-0.5">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* My Child Card */}
        <div className="bg-white p-3 md:p-4  rounded-xl shadow-sm border border-[#F3F4F6] flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-Third">
                My Child
              </h2>
              <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-wider">
                Cody's clinical summary
              </p>
            </div>
            <Link to="/parent-dashboard/my-child"
              className="w-full sm:w-auto bg-Secondary text-white hover:bg-Secondary/90 px-6 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-Secondary/10"
            >
              View Profile
            </Link>
          </div>

          <div className="bg-gray-50/50 p-5 rounded-xl mb-4 border border-gray-100/50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-4 text-center sm:text-left">
              <div className="w-16 h-16 bg-Secondary rounded-xl flex items-center justify-center text-Primary text-2xl md:text-3xl font-black shadow-xl shadow-Secondary/20 shrink-0">
                {ChildData?.name?.charAt(0)}
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-xl md:text-2xl font-black text-Third">
                 {ChildData?.name}
                </h3>
                <p className="text-gray-400 font-bold text-[13px] ">
                 {ChildData?.age} · {ChildData?.diagnosis}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  {ChildData?.active_care_plan && (
                    <span className="bg-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-[#10B981] border border-[#10B981]/20 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>{" "}
                      Active Care Plan
                    </span>
                  )}
                  <span className="bg-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-gray-500 border border-gray-100 flex items-center gap-1.5 shadow-sm">
                    <Calendar size={12} className="text-Secondary" /> {ChildData?.therapy_type}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-200/50 pt-3">
            {
              CareTeam?.map((member,i)=>(
                <div key={i} className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <p className="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">
                    {member?.role}
                  </p>
                  <p className="text-[14px] md:text-[15px] font-black text-Secondary">
                    {member?.name}
                  </p>
                  <button className="text-[11px] font-bold text-gray-400 flex items-center gap-1 mt-1 hover:text-Secondary transition-colors uppercase tracking-wider">
                    Connect ↗
                  </button>
                </div>
             

              ))
            }
            </div>
          </div>
        </div>

        {/* New Notes Card */}
        <div className="bg-white p-3 md:p-4  rounded-xl  shadow-sm border border-[#F3F4F6] flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-Third">
                New Clinical Notes
              </h2>
              <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-wider">
                Latest updates from the team
              </p>
            </div>
            {/* <button className="w-full sm:w-auto bg-Secondary text-white hover:bg-Secondary/90 px-6 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-Secondary/10">
              View All
            </button> */}
          </div>

          <div className="space-y-4">
            {NewNotes?.map((note, i) => (
              <div
                key={i}
                className="bg-gray-50/50 p-5 md:p-6 rounded-[24px] border-l-[4px] border-Secondary shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                  <h4 className="font-black text-Secondary text-[15px]">
                    {note?.employee_name} - {note?.service_name}
                  </h4>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {note?.date}
                  </span>
                </div>
                <p className="text-[13px] md:text-[14px] text-Third font-medium leading-relaxed line-clamp-3">
                  {note?.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Session Banner */}
      <div className="bg-Secondary rounded-xl p-3 md:p-4 text-white flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 relative overflow-hidden group shadow-xl shadow-Secondary/10">
        {/* Decorative blur element - scaled down */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

        <div className="relative z-10 w-full xl:w-auto">
          {/* Top Tag - Smaller text and gap */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-Primary animate-pulse"></div>
            <p className="text-[10px] md:text-xs text-Primary font-black uppercase tracking-wider">
              Next Session
            </p>
          </div>

          {/* Heading - Reduced size and margin */}
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 tracking-tight leading-snug">
           {NextSessonData?.employee} - {NextSessonData?.service}
          </h3>

          {/* Info Tags - More compact padding and smaller text */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] md:text-[13px] font-semibold border border-white/10">
              <Calendar size={14} className="text-Primary" /> {NextSessonData?.day}
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] md:text-[13px] font-semibold border border-white/10">
              <Clock size={14} className="text-Primary" />{NextSessonData?.start_time} - {NextSessonData?.end_time}
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] md:text-[13px] font-semibold border border-white/10">
              <MapPin size={14} className="text-Primary" /> {NextSessonData?.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
