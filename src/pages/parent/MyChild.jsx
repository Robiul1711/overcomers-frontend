import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  ArrowLeft,
  Bell,
  Calendar,
  Activity,
  ShieldCheck,
  MapPin,
  Clock,
  FileText,
  User,
  ExternalLink,
  X,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

const EditChildProfileModal = ({ isOpen, onClose, childData }) => {
  const [formData, setFormData] = useState({
    name: childData?.full_name || "",
    child_dob: childData?.date_of_birth || "",
    school_name: childData?.school_name || "",
    school_location: childData?.school_location || "",
    service_location: childData?.service_location || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useMutationClient({
    url: "/parent/my-child/update",
    method: "post",
    isPrivate: true,
    invalidateKeys: [["parentMyChild"], ["parentDashboard"]],
    successMessage: "Profile updated successfully!",
  });

  useEffect(() => {
    if (childData) {
      setFormData({
        name: childData?.full_name || "",
        child_dob: childData?.date_of_birth || "",
        school_name: childData?.school_name || "",
        school_location: childData?.school_location || "",
        service_location: childData?.service_location || "",
      });
    }
  }, [childData]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("full_name", formData.name);
    fd.append("date_of_birth", formData.child_dob);
    fd.append("school_name", formData.school_name);
    fd.append("school_location", formData.school_location);
    fd.append("service_location", formData.service_location);
    if (selectedFile) {
      fd.append("profile_picture", selectedFile);
    }

    mutate(
      { data: fd },
      {
        onSuccess: () => {
          setSelectedFile(null);
          setPreviewUrl(null);
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  const initials = formData.name
    ? formData.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "CF";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 h-screen">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden max-h-[95vh] flex flex-col">
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 text-left">
          <div className="relative mb-2">
            <h3 className="text-3xl font-bold text-[#3A331E]">Edit Profile</h3>
            <p className="text-sm font-medium text-[#9CA3AF] mt-1">
              Update your personal information
            </p>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
          </div>

          {/* Profile Picture Upload */}
          <div className="mt-10 mb-8 flex justify-start">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FFFBEE] shadow-md">
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-[#76121F] rounded-full flex items-center justify-center text-[#FFBB03] text-3xl font-bold border-4 border-[#FFFBEE] shadow-md group-hover:opacity-90 transition-opacity">
                  {initials}
                </div>
              )}
              <div className="absolute bottom-0 right-0 p-1.5 bg-[#FAF6F7] rounded-full border-2 border-white text-[#76121F] shadow-sm group-hover:bg-[#76121F] group-hover:text-white transition-colors">
                <Camera size={14} strokeWidth={2.5} />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Enter full name"
                className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                Date of Birth *
              </label>
              <input
                type="text"
                value={formData.child_dob}
                onChange={handleChange("child_dob")}
                placeholder="e.g. June 14, 2018"
                className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                School Name *
              </label>
              <input
                type="text"
                value={formData.school_name}
                onChange={handleChange("school_name")}
                placeholder="Enter school name"
                className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                School Location *
              </label>
              <input
                type="text"
                value={formData.school_location}
                onChange={handleChange("school_location")}
                placeholder="Enter school location"
                className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                Service Location *
              </label>
              <input
                type="text"
                value={formData.service_location}
                onChange={handleChange("service_location")}
                placeholder="Enter service location"
                className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        <div className="p-8 bg-white flex gap-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 bg-[#FFBB03] text-black py-3 rounded-xl font-bold hover:bg-[#e6a802] transition-colors active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-[#76121F] text-white py-3 rounded-xl font-bold hover:bg-[#600000] transition-colors active:scale-95 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const TeamMemberModal = ({ isOpen, onClose, member, isLoading = false }) => {
  if (!isOpen) return null;
  if (!isLoading && !member) return null;

  return (
    <div className="fixed h-screen inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-xl w-full  max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden text-left">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              {isLoading ? (
                <>
                  <SkeletonBox className="h-7 md:h-8 w-48 mb-2" />
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3A331E]">
                    {member.name}
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="bg-white border-2 border-[#76121F] text-[#76121F] p-1.5 rounded-full hover:bg-[#76121F] hover:text-white transition-all transform hover:rotate-90 active:scale-95"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-xl p-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#F3F4F6] flex flex-col gap-2">
                      <SkeletonBox className="h-3 w-16" />
                      <SkeletonBox className="h-5 w-32" />
                    </div>
                  ))
                : (
                  <>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#F3F4F6]">
                      <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                        Full Name
                      </p>
                      <p className=" font-bold text-[#76121F]">
                        {member.name}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#F3F4F6]">
                      <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                        Role
                      </p>
                      <p className=" font-bold text-[#76121F]">
                        {member.role || "Therapist / BCBA"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#F3F4F6]">
                      <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                        Phone Number
                      </p>
                      <p className=" font-bold text-[#76121F]">
                        {member.phone || "(000) 000-0000"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#F3F4F6]">
                      <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                        Email Address
                      </p>
                      <p className=" font-bold text-[#76121F] break-all">
                        {member.email || "example@company.com"}
                      </p>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyChild = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data:MyChildData, isLoading, isError } = useClient({
    queryKey: ["parentMyChild" ],
    url: "/parent/my-child",
  });
  const header=MyChildData?.data?.header
  const Summary = MyChildData?.data?.summary
  const carePlan = MyChildData?.data?.care_plan
  const ChildInformation = MyChildData?.data?.child_information
  const careTeamData = MyChildData?.data?.care_team
  console.log(careTeamData);
  const childInfo = [
    { label: "Full Name", value: ChildInformation?.full_name },
    { label: "Date of Birth", value: ChildInformation?.date_of_birth },
    { label: "Age", value: ChildInformation?.age },
    { label: "Primary Diagnosis", value: ChildInformation?.primary_diagnosis },
    { label: "Insurance Provider", value: ChildInformation?.insurance_provider },
    { label: "Service Type", value: ChildInformation?.school_name },
    { label: "Service Location", value: ChildInformation?.school_location },
  ];

  const carePlanDetails = [
    { label: "Care Plan Start", value: carePlan?.care_plan_start },
    { label: "Session Frequency", value: carePlan?.session_frequency },
    { label: "Session Duration", value: carePlan?.session_duration },
    { label: "Case Number", value: carePlan?.case_number },
  ];

  const handleOpenTeamModal = (member) => {
    setSelectedMember(member);
    setIsTeamModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Hero Skeleton */}
        <div className="bg-[#76121F] rounded-xl p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <SkeletonBox className="w-24 h-24 rounded-full bg-white/20" />
              <div className="text-center md:text-left space-y-3">
                <SkeletonBox className="h-9 w-48 bg-white/20" />
                <SkeletonBox className="h-4 w-36 bg-white/20" />
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <SkeletonBox className="h-7 w-28 bg-white/20 rounded-xl" />
                  <SkeletonBox className="h-7 w-36 bg-white/20 rounded-xl" />
                  <SkeletonBox className="h-7 w-40 bg-white/20 rounded-xl" />
                  <SkeletonBox className="h-7 w-32 bg-white/20 rounded-xl" />
                </div>
              </div>
            </div>
            <SkeletonBox className="h-10 w-36 bg-white/20 rounded-xl" />
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-[#F3F4F6]">
            <SkeletonBox className="h-8 w-44 mb-2" />
            <SkeletonBox className="h-1 w-full bg-[#FFBB03]/30 rounded-full mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#FFFBEE] p-5 rounded-2xl border border-[#FFF3D6]">
                  <SkeletonBox className="h-3 w-20 mb-2" />
                  <SkeletonBox className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#F3F4F6] flex flex-col">
            <SkeletonBox className="h-8 w-44 mb-2" />
            <SkeletonBox className="h-1 w-full bg-[#FFBB03]/30 rounded-full mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-[#FFFBEE] p-5 rounded-2xl border border-[#FFF3D6]">
                  <SkeletonBox className="h-3 w-24 mb-2" />
                  <SkeletonBox className="h-5 w-28" />
                </div>
              ))}
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl mt-auto">
              <SkeletonBox className="h-5 w-28 mb-2" />
              <SkeletonBox className="h-4 w-full mb-2" />
              <SkeletonBox className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Care Team Skeleton */}
        <div>
          <SkeletonBox className="h-8 w-56 mb-2" />
          <SkeletonBox className="h-1 w-full bg-[#FFBB03]/30 rounded-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-[#F3F4F6]">
                <div className="flex items-center gap-4 mb-6">
                  <SkeletonBox className="w-14 h-14 rounded-2xl" />
                  <div className="space-y-2">
                    <SkeletonBox className="h-5 w-28" />
                    <SkeletonBox className="h-3 w-20" />
                  </div>
                </div>
                <SkeletonBox className="h-4 w-full mb-4" />
                <SkeletonBox className="h-4 w-3/4 mb-6" />
                <SkeletonBox className="h-6 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Modals */}
      <TeamMemberModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        member={selectedMember}
      />
      <EditChildProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        childData={{ ...ChildInformation, ...Summary }}
      />

      {/* Profile Hero Section */}
      <div className="bg-[#76121F] rounded-xl p-4 md:p-6 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-[#3A331E] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20">
             {header?.profile_picture ? (
              <img
                src={header.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              header?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-1 font-poppins">
              {header?.name}
              </h2>
              <p className="text-white/80 font-medium mb-4">
                {header?.active_care_plan && `Active Care Plan`} · {header?.service_name}
              </p>
          
              <div  className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <Calendar size={12} className="text-[#FFBB03]" /> Age {Summary?.age}
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <Activity size={12} className="text-[#FFBB03]" /> {Summary?.diagnosis}
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <ShieldCheck size={12} className="text-[#FFBB03]" /> {Summary?.insurance_provider}
                  Insurance
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <MapPin size={12} className="text-[#FFBB03]" /> {Summary?.service_location}
                  
                </span>
              </div>
   
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-transparent border border-white/30 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#800000] hover:border-white/50 transition-all flex items-center gap-2 backdrop-blur-sm active:scale-95 text-white"
          >
            Update Info <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Child Information */}
        <div className="sm:bg-white sm:p-4 md:p-8 sm:rounded-xl sm:shadow-sm sm:border bsm:order-[#F3F4F6]">
          <div className="mb-6 relative">
            <h3 className="text-2xl font-bold text-[#2D2D2D]">
              Child Information
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {childInfo.map((info, i) => (
              <div
                key={i}
                className={`bg-[#FFFBEE] p-5 rounded-2xl border border-[#FFF3D6] ${i === childInfo.length - 1 ? "md:col-span-1" : ""}`}
              >
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  {info.label}
                </p>
                <p className="text-lg font-bold text-[#3A331E]">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Care Plan Details */}
        <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border bsm:order-[#F3F4F6] flex flex-col">
          <div className="mb-6 relative">
            <h3 className="text-2xl font-bold text-[#2D2D2D]">
              Care Plan Details
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-6">
            {carePlanDetails.map((detail, i) => (
              <div
                key={i}
                className="bg-[#FFFBEE] p-5 rounded-2xl border border-[#FFF3D6]"
              >
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  {detail.label}
                </p>
                <p className="text-lg font-bold text-[#3A331E]">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#ECFDF5] p-6 rounded-2xl border border-[#D1FAE5] mt-auto">
            <h4 className="text-[#065F46] font-bold mb-2 flex items-center gap-2">
              <FileText size={18} /> Goals Summary
            </h4>
            <p className="text-[#065F46] text-sm leading-relaxed text-left">
              Focus on communication skills, social interaction, and daily
              living independence. Family participation is a core component of
              Jordan's behavior intervention plan.
            </p>
          </div>
        </div>
      </div>

      {/* Care Team Section */}
      <div>
        <div className="mb-6 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Assigned Care Team
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {careTeamData?.map((member, i) => (
            <div
              key={i}
              onClick={() => handleOpenTeamModal(member)}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-[#F3F4F6] hover:shadow-md transition-all group cursor-pointer text-left"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#800000] rounded-2xl flex items-center justify-center text-white text-xl font-bold transform group-hover:rotate-6 transition-transform">
                    {member.name?.split(" ")[0].charAt(0) + member.name?.split(" ")[1].charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#2D2D2D] group-hover:text-[#800000] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[#800000] font-bold text-sm tracking-wide uppercase">
                      {member.type}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-[#6B7280] flex items-center gap-1 hover:text-[#800000]">
                  View More <ChevronRight size={14} />
                </button>
              </div>

              <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
                {member.role}
              </p>

              <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold border border-[#FEE2E2]">
                {member.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChild;
