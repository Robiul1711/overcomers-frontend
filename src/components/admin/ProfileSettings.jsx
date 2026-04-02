import React, { useState } from 'react';
import { ArrowUpRight, Camera, Info, Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ProfileSettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form states
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handlePasswordUpdate = () => {
    setIsPasswordModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8 pb-10 font-poppins'>
      {/* Top Profile Card */}
      <div className="bg-Secondary rounded-[24px] p-6 md:p-10 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto z-10 text-center md:text-left">
          <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-[#5d0e19] flex items-center justify-center text-Primary font-bold text-[28px] md:text-[36px] shadow-sm flex-shrink-0">
            EP
          </div>
          <div className="flex flex-col text-white">
            <h2 className="text-[26px] md:text-[36px] font-bold leading-tight">Eleanor Pena</h2>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mt-2">
              <span className="text-[13px] md:text-[14px] font-medium text-white/90">Registered Behavior Technician</span>
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 self-center md:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1eb15d] inline-block animate-pulse"></span> Active Status
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[13px] px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all w-full md:w-auto active:scale-95 shadow-sm"
          >
            Security Settings <ArrowUpRight size={18} strokeWidth={2.5}/>
          </button>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="border border-white/30 hover:bg-white hover:text-Secondary text-white font-bold text-[13px] px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all w-full md:w-auto active:scale-95"
          >
            Edit Profile Info <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      </div>

      {/* Info Cards Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col border border-gray-50">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-8 bg-Primary rounded-full"></div>
             <h3 className="text-[20px] md:text-[24px] font-bold text-Third">Personal Data</h3>
          </div>
          <div className="w-full h-px bg-gray-100 mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xxl:grid-cols-3 gap-4 flex-grow">
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Full Name</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px]">Eleanor Pena</span>
            </div>
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Email Address</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px] truncate">eleanor.pena@mail.com</span>
            </div>
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Mobile Number</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px]">(908) 555-0142</span>
            </div>
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Residence</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px]">Union County, NJ</span>
            </div>
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Join Date</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px]">Feb 1, 2026</span>
            </div>
            <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Status</span>
              <span className="text-[#1eb15d] font-bold text-[14px] md:text-[15px]">Full-time Employee</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col border border-gray-50">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-8 bg-Secondary rounded-full"></div>
             <h3 className="text-[20px] md:text-[24px] font-bold text-Third">Employment Info</h3>
          </div>
          <div className="w-full h-px bg-gray-100 mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <div className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-Secondary/5">
              <span className="text-Secondary/40 text-[12px] font-bold uppercase tracking-wider">Assigned Role</span>
              <span className="text-Secondary font-bold text-[14px] md:text-[15px]">Reg. Behavior Technician</span>
            </div>
            <div className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-Secondary/5">
              <span className="text-Secondary/40 text-[12px] font-bold uppercase tracking-wider">Assigned BCBA</span>
              <span className="text-Secondary font-bold text-[14px] md:text-[15px]">Dr. Devon Lane</span>
            </div>
            <div className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-Secondary/5">
              <span className="text-Secondary/40 text-[12px] font-bold uppercase tracking-wider">Team Group</span>
              <span className="text-Secondary font-bold text-[14px] md:text-[15px]">Behavior Services Team</span>
            </div>
            <div className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-Secondary/5">
              <span className="text-Secondary/40 text-[12px] font-bold uppercase tracking-wider">Latest Credentials</span>
              <span className="text-Secondary font-bold text-[14px] md:text-[15px]">RBT License - Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Reset Password */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-5 sm:p-8 rounded-[24px] overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-Third mb-4 leading-tight">Update Authentication</h2>
              <div className="w-full h-[3px] bg-Primary rounded-full"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Current Password</label>
                <input 
                  type="password" 
                  placeholder="********" 
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">New Secure Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
                <p className="text-gray-500 text-[12px] mt-1 leading-relaxed">Required: Minimum 8 characters, at least one uppercase letter, and one special character.</p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-Third font-bold text-[14px]">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Verify new password" 
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
              </div>
            </div>

            <div className="bg-[#FFF8F8] border border-Secondary/10 rounded-2xl p-4 flex items-start gap-3">
              <Info size={20} className="text-Secondary mt-0.5 shrink-0" />
              <p className="text-Secondary/80 font-medium text-[13px] md:text-[14px]">Security Note: Once changed, you will be required to log back in on all other connected devices.</p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-2">
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-[14px] px-8 py-3.5 rounded-xl transition-colors"
              >
                Keep Current
              </button>
              <button 
                onClick={handlePasswordUpdate}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Save New Password
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Password Updated Success */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[420px] p-8 sm:p-10 rounded-[32px] flex flex-col items-center text-center">
          <div className="w-[80px] h-[80px] bg-Primary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-Primary/20">
            <Check size={40} className="text-Third" strokeWidth={3} />
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-Secondary mb-3">All Set!</h2>
          <p className="text-gray-500 text-[14px] md:text-[15px] mb-10 leading-relaxed px-2">
            Your password has been securely updated. You can continue using the portal as normal.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full bg-Primary hover:bg-Primary/90 text-Third font-bold text-[15px] py-3.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Edit Profile */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-5 sm:p-8 rounded-[24px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-Third leading-tight">Edit Profile</h2>
              <p className="text-gray-500 text-[13px] md:text-[14px] mt-1 mb-4">Update your public identity and contact details</p>
              <div className="w-full h-[3px] bg-Primary rounded-full"></div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center justify-center gap-4 mb-2">
              <div className="relative w-[100px] h-[100px] rounded-full bg-Secondary flex items-center justify-center text-Primary font-bold text-[36px] shadow-sm">
                EP
                <button className="absolute -bottom-1 -right-1 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg text-Secondary hover:bg-gray-50 transition-colors">
                  <Camera size={18} strokeWidth={2.5}/>
                </button>
              </div>
              <p className="text-Secondary text-[13px] font-bold uppercase tracking-wider">Update Avatar</p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Preferred Name</label>
                <input 
                  type="text" 
                  defaultValue="Eleanor Pena" 
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Work Email (Verified)</label>
                <input 
                  type="email" 
                  readOnly
                  defaultValue="eleanor.pena@mail.com" 
                  className="w-full bg-[#FAF9F6] rounded-xl p-4 text-[14px] text-Secondary font-semibold border border-Primary/20 cursor-not-allowed opacity-80"
                />
                <p className="text-[11px] text-gray-400 italic px-1">Email changes require admin approval.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                  <label className="text-Third font-bold text-[14px]">Primary Phone</label>
                  <input 
                    type="tel" 
                    defaultValue="(908) 555-0142" 
                    className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                  />
                </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-Third font-bold text-[14px]">Current Address</label>
                    <input 
                      type="text" 
                      defaultValue="Union County, NJ" 
                      className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                    />
                  </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 font-bold text-[14px] px-10 py-3.5 rounded-xl text-gray-500 transition-colors"
              >
                Discard Changes
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="w-full sm:w-auto bg-Secondary text-white font-bold text-[14px] px-10 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Update Profile
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;

