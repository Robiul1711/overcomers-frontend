import React, { useState } from "react";
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

const EditChildProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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

          <div className="mt-10 mb-8 flex justify-start">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 bg-[#76121F] rounded-full flex items-center justify-center text-[#FFBB03] text-3xl font-bold border-4 border-[#FFFBEE] shadow-md group-hover:opacity-90 transition-opacity">
                CF
              </div>
              <div className="absolute bottom-0 right-0 p-1.5 bg-[#FAF6F7] rounded-full border-2 border-white text-[#76121F] shadow-sm">
                <Camera size={14} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: "Full Name", placeholder: "Cody Fisher" },
              { label: "Date of Birth", placeholder: "June 14, 2018" },
              { label: "Age", placeholder: "7 years old" },
              { label: "School Name", placeholder: "Greenwood School" },
              { label: "School Location", placeholder: "Austin, TX 78704" },
              { label: "Service Location", placeholder: "Home" },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-xs font-bold text-[#3A331E] mb-2 uppercase tracking-wide">
                  {field.label} *
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  defaultValue={field.placeholder}
                  className="w-full bg-[#FAF6F7] border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBB03] transition-all text-sm font-medium"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white flex gap-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 bg-[#FFBB03] text-black py-3 rounded-xl font-bold hover:bg-[#e6a802] transition-colors active:scale-95"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#76121F] text-white py-3 rounded-xl font-bold hover:bg-[#600000] transition-colors active:scale-95 shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamMemberModal = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden text-left">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <h3 className="text-3xl font-bold text-[#3A331E]">
                {member.name}
              </h3>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
            </div>
            <button
              onClick={onClose}
              className="bg-white border-2 border-[#76121F] text-[#76121F] p-1.5 rounded-full hover:bg-[#76121F] hover:text-white transition-all transform hover:rotate-90 active:scale-95"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-3xl p-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Full Name
                </p>
                <p className="text-lg font-bold text-[#76121F]">
                  {member.name}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Role
                </p>
                <p className="text-lg font-bold text-[#76121F]">
                  {member.detailsRole || "Therapist / BCBA"}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Phone Number
                </p>
                <p className="text-lg font-bold text-[#76121F]">
                  {member.phone || "(000) 000-0000"}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Email Address
                </p>
                <p className="text-lg font-bold text-[#76121F] break-all">
                  {member.email || "example@company.com"}
                </p>
              </div>
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

  const childInfo = [
    { label: "Full Name", value: "Cody Fisher" },
    { label: "Date of Birth", value: "June 14, 2018" },
    { label: "Age", value: "7 years old" },
    { label: "Primary Diagnosis", value: "Autism Spectrum Disorder" },
    { label: "Insurance Provider", value: "Aetna" },
    { label: "Service Type", value: "ABA Therapy" },
    { label: "Service Location", value: "Home" },
  ];

  const carePlanDetails = [
    { label: "Care Plan Start", value: "March 1, 2026" },
    { label: "Session Frequency", value: "3× per week" },
    { label: "Session Duration", value: "2 hours" },
    { label: "Next Review Date", value: "June 1, 2026" },
  ];

  const careTeam = [
    {
      initials: "DL",
      name: "Dr. Devon Lane",
      role: "Supervising BCBA",
      description:
        "Board Certified Behavior Analyst (BCBA) · Behavior Services",
      badge: "Supervising BCBA",
      phone: "(555) 123-4567",
      email: "devon.lane@overcomers.com",
      detailsRole: "Supervising BCBA",
    },
    {
      initials: "EP",
      name: "Eleanor Pena",
      role: "ABA Therapy - Technician",
      description: "Registered Behavior Technician (RBT) · Behavior Services",
      badge: "Primary Therapist",
      phone: "(555) 987-6543",
      email: "eleanor.pena@overcomers.com",
      detailsRole: "Therapist / BCBA",
    },
  ];

  const handleOpenTeamModal = (member) => {
    setSelectedMember(member);
    setIsTeamModalOpen(true);
  };

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
      />

      {/* Profile Hero Section */}
      <div className="bg-[#76121F] rounded-3xl p-8 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-[#3A331E] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20">
              CF
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-1 font-poppins">
                Cody Fisher
              </h2>
              <p className="text-white/80 font-medium mb-4">
                Active Care Plan · ABA Therapy Services
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <Calendar size={12} className="text-[#FFBB03]" /> Age 7
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <Activity size={12} className="text-[#FFBB03]" /> Autism
                  Spectrum Disorder
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <ShieldCheck size={12} className="text-[#FFBB03]" /> Aetna
                  Insurance
                </span>
                <span className="bg-[#8B232F] px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <MapPin size={12} className="text-[#FFBB03]" /> Home Services
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child Information */}
        <div className="sm:bg-white sm:p-8 sm:rounded-3xl sm:shadow-sm sm:border bsm:order-[#F3F4F6]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {careTeam.map((member, i) => (
            <div
              key={i}
              onClick={() => handleOpenTeamModal(member)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-[#F3F4F6] hover:shadow-md transition-all group cursor-pointer text-left"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#800000] rounded-2xl flex items-center justify-center text-white text-xl font-bold transform group-hover:rotate-6 transition-transform">
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#2D2D2D] group-hover:text-[#800000] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[#800000] font-bold text-sm tracking-wide uppercase">
                      {member.role}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-[#6B7280] flex items-center gap-1 hover:text-[#800000]">
                  View More <ChevronRight size={14} />
                </button>
              </div>

              <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
                {member.description}
              </p>

              <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold border border-[#FEE2E2]">
                {member.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChild;
