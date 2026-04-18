import React, { useState } from "react";
import { ArrowLeft, Bell, ExternalLink, ChevronRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const TeamMemberModal = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in h-screen fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] w-full max-w-xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="sm:p-6 p-4">
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

          <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-3xl p-4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Full Name
                </p>
                <p className=" text-base font-semibold text-[#76121F]">
                  {member.name}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Role
                </p>
                <p className=" text-base font-semibold text-[#76121F]">
                  {member.detailsRole || "Professional"}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Phone Number
                </p>
                <p className=" text-base font-semibold text-[#76121F]">
                  {member.phone || "(555) 000-0000"}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6]">
                <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Email Address
                </p>
                <p className=" text-base font-semibold text-[#76121F] break-all">
                  {member.email || "example@overcomers.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CareTeam = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {
      initials: "JK",
      name: "James Kim",
      role: "Program Coordinator - Administration",
      description: "",
      badge: "Coordinator",
      phone: "(555) 555-1212",
      email: "james.kim@overcomers.com",
      detailsRole: "Administrator",
    },
  ];

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />

      {/* Care Team Section */}
      <div className="sm:bg-white sm:p-8  sm:rounded-3xl sm:shadow-sm sm:border sm:border-[#F3F4F6]">
        <div className="mb-8 relative w-fit">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">
            Cody's Care Team
          </h3>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFBB03] rounded-full"></div>
        </div>

        <div className="space-y-4">
          {careTeam.map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#76121F]/30 hover:shadow-md transition-all group flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer"
              onClick={() => handleOpenModal(member)}
            >
              <div className="flex sm:flex-row flex-col items-center gap-6 w-full">
                <div className="w-16 h-16 bg-[#800000] rounded-2xl flex items-center justify-center text-white text-2xl font-bold transform group-hover:rotate-6 transition-transform">
                  {member.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-[#76121F] group-hover:text-[#800000] transition-colors leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-[#800000] font-bold text-[15px] tracking-wide uppercase mt-0.5 mb-1">
                    {member.role}
                  </p>
                  <p className="text-[#6B7280] text-sm font-medium">
                    {member.description}
                  </p>
                  <div className="mt-4">
                    <span className="bg-[#FAF6F7] text-[#800000] px-4 py-1 rounded-full text-xs font-bold border border-[#FEE2E2]">
                      {member.badge}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full md:w-fit flex items-center justify-center gap-2 border-2 border-[#76121F] text-[#76121F] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#76121F] hover:text-white transition-all active:scale-95 whitespace-nowrap">
                View More <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareTeam;
