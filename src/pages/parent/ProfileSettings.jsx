import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  ExternalLink,
  ChevronRight,
  X,
  AlertCircle,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20  backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] md:rounded-[48px] w-full max-w-[560px] relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20">
        <div className="p-6 sm:p-10">
          <div className="relative mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-Third tracking-tight leading-tight">
              Security Update
            </h3>
            <p className="text-[12px] sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
              Credential Synchronization
            </p>
            <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              { label: "Current Security Key", placeholder: "••••••••" },
              { label: "Vault New Key", placeholder: "Enter New Password" },
              { label: "Verify New Key", placeholder: "Re-enter New Password" },
            ].map((field, i) => (
              <div key={i} className="group/field">
                <label className="block text-[11px] font-black text-Third/60 mb-2.5 uppercase tracking-[0.1em] ml-1">
                  {field.label} <span className="text-Secondary">*</span>
                </label>
                <input
                  type="password"
                  placeholder={field.placeholder}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:ring-0 focus:border-Primary transition-all text-[15px] font-bold text-Third placeholder:text-gray-300"
                />
                {i === 1 && (
                  <p className="text-[10px] text-gray-400 mt-2.5 font-bold uppercase tracking-wider leading-relaxed ml-1 italic">
                    Min. 8 characters • 1 capital letter • 1 special character
                  </p>
                )}
              </div>
            ))}

            <div className="bg-Secondary/5 p-5 rounded-[24px] border border-Secondary/10 flex items-start gap-4">
              <AlertCircle className="text-Secondary shrink-0 mt-0.5" size={20} />
              <p className="text-Secondary text-[12px] font-bold leading-relaxed uppercase tracking-tight">
                Global synchronization will logout all active sessions post-update.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-[20px] font-black text-[14px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button className="flex-[2] bg-Secondary text-white py-4 rounded-[20px] font-black text-[14px] uppercase tracking-widest hover:bg-Secondary/90 transition-all active:scale-95 shadow-[0_20px_40px_rgba(118,18,31,0.2)]">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] md:rounded-[48px] w-full max-w-[560px] relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh] flex flex-col border border-white/20">
        {/* Header section with accent */}
        <div className="p-6 sm:p-10 pb-4 relative">
          <div className="flex justify-between items-start">
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-black text-Third tracking-tight leading-tight">
                Refine Identity
              </h3>
              <p className="text-[12px] sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
                Authorized Caregiver Configuration
              </p>
              <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
            </div>
            <button 
              onClick={onClose}
              className="p-2.5 bg-gray-100 text-gray-400 rounded-xl hover:bg-Secondary hover:text-white transition-all active:scale-90"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="px-6 sm:px-10 py-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="mb-8 flex justify-center sm:justify-start">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-Secondary rounded-[28px] sm:rounded-[32px] flex items-center justify-center text-white text-3xl font-black border-4 border-Primary/10 shadow-[0_20px_40px_rgba(118,18,31,0.2)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">JS</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 p-2.5 bg-Primary text-Secondary rounded-2xl border-4 border-white shadow-lg group-hover:rotate-12 transition-transform">
                <Camera size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {[
              { label: "Full Name", placeholder: "John Smith" },
              { label: "Relationship to Child", placeholder: "Father" },
              { label: "Email Address", placeholder: "your@email.com" },
              { label: "Phone Connection", placeholder: "(908) 000 - 0000" },
              { label: "Home Address", placeholder: "Union County, NJ" },
              { label: "Jurisdiction Details", placeholder: "Austin, TX 78704" },
            ].map((field, i) => (
              <div key={i} className="group/field">
                <label className="block text-[11px] font-black text-Third/60 mb-2.5 uppercase tracking-[0.1em] ml-1">
                  {field.label} <span className="text-Secondary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:ring-0 focus:border-Primary transition-all text-[15px] font-bold text-Third placeholder:text-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-10 bg-white border-t border-gray-100 mt-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-[20px] font-black text-[14px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button className="flex-[2] bg-Secondary text-white py-4 rounded-[20px] font-black text-[14px] uppercase tracking-widest hover:bg-Secondary/90 transition-all active:scale-95 shadow-[0_20px_40px_rgba(118,18,31,0.2)]">
             Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    reminders: true,
    alerts: false,
    email: true,
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const personalInfo = [
    { label: "Caregiver Name", value: "John Smith" },
    { label: "Care Relationship", value: "Father" },
    { label: "Emergency Line", value: "(555) 482-7391" },
    { label: "Digital Mail", value: "example@company.com" },
    { label: "Authorized Site", value: "245 Maplewood Drive" },
    { label: "City / State / ZIP", value: "Austin, TX 78704" },
  ];

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Modals */}
      <ResetPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Profile Hero Banner */}
      <div className="bg-Secondary rounded-[32px] md:rounded-[48px] p-6 sm:p-10 md:p-12 text-white relative overflow-hidden group shadow-2xl shadow-Secondary/20 border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-white/15 transition-all duration-700"></div>
        
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 sm:gap-10 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-Third rounded-[32px] flex items-center justify-center text-white text-3xl sm:text-4xl font-black border-4 border-white/20 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <span className="relative z-10">JS</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-Primary text-Secondary rounded-2xl flex items-center justify-center border-4 border-Secondary shadow-lg">
                <Camera size={16} strokeWidth={3} />
              </div>
            </div>
            <div className="pt-2">
              <h2 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">John Smith</h2>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-white/15 rounded-full text-[12px] font-black uppercase tracking-widest border border-white/20">Lead Caregiver</span>
                <span className="w-1.5 h-1.5 rounded-full bg-Primary animate-pulse"></span>
                <p className="text-white/60 font-bold text-sm uppercase tracking-wider">Active Portfolio</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full xl:w-auto">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="group/btn flex items-center justify-center gap-3 bg-Primary text-Secondary px-8 py-4 rounded-[20px] font-black text-[13px] sm:text-[14px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-Primary/10"
            >
            Change Password <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="group/btn flex items-center justify-center gap-3 bg-white/5 border-2 border-white/10 text-white px-8 py-4 rounded-[20px] font-black text-[13px] sm:text-[14px] uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all"
            >
              Edit Profile <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {/* Personal Information */}
        <div className="bg-white p-6 sm:p-10 rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6]">
          <div className="mb-10 relative">
            <h3 className="text-2xl sm:text-3xl font-black text-Third tracking-tight leading-tight">
              Caregiver Dossier
            </h3>
            <p className="text-[12px] sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
              Validated Clinical Metadata
            </p>
            <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalInfo.map((info, i) => (
              <div
                key={i}
                className="bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 hover:border-Primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-Secondary opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] opacity-80 leading-none">
                    {info.label}
                  </p>
                </div>
                <p className="text-[17px] font-black text-Third tracking-tight">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 sm:p-10 rounded-[32px] md:rounded-[48px] shadow-sm border border-[#F3F4F6]">
          <div className="mb-10 relative">
            <h3 className="text-2xl sm:text-3xl font-black text-Third tracking-tight leading-tight">
              Protocol Alerts
            </h3>
            <p className="text-[12px] sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
              Communication Preferences
            </p>
            <div className="absolute -bottom-3 left-0 w-24 h-1 bg-Primary rounded-full"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "reminders",
                title: "Pulse Reminders",
                desc: "Real-time session alerts",
              },
              {
                key: "alerts",
                title: "Snapshot Reports",
                desc: "Clinical documentation updates",
              },
              {
                key: "email",
                title: "Secure Digital Mail",
                desc: "Encrypted correspondence",
              },
            ].map((pref) => (
              <div
                key={pref.key}
                onClick={() => togglePreference(pref.key)}
                className="flex items-center justify-between p-6 rounded-[24px] border-2 border-gray-50 hover:border-Secondary/10 hover:bg-gray-50/30 transition-all group cursor-pointer"
              >
                <div className="flex-1">
                  <h4 className="text-[16px] sm:text-[18px] font-black text-Third mb-1 group-hover:text-Secondary transition-colors tracking-tight">
                    {pref.title}
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-gray-400 font-bold uppercase tracking-wider opacity-80">
                    {pref.desc}
                  </p>
                </div>

                <div
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner ${
                    preferences[pref.key] ? "bg-Secondary shadow-Secondary/20" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                      preferences[pref.key] ? "translate-x-7" : "translate-x-0"
                    }`}
                  >
                    {preferences[pref.key] && <div className="w-1.5 h-1.5 rounded-full bg-Secondary"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
