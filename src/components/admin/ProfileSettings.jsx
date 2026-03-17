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
    <div className='flex flex-col gap-8 pb-10'>
      {/* Top Profile Card */}
      <div className="bg-Secondary rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-6 w-full md:w-auto z-10">
          <div className="w-[90px] h-[90px] rounded-full bg-[#5d0e19] flex items-center justify-center text-Primary font-bold text-[36px] shadow-sm flex-shrink-0">
            EP
          </div>
          <div className="flex flex-col text-white">
            <h2 className="text-[32px] font-bold leading-tight">Eleanor Pena</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-[14px] font-medium text-white/90">Registered Behavior Technician (RBT) · Behavior Services</span>
              <span className="bg-white px-3 py-1 rounded-full text-[#1eb15d] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1eb15d] inline-block"></span> Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto z-10">
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-6 py-3 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
          >
            Change Password <ArrowUpRight size={18} strokeWidth={2.5}/>
          </button>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="border border-white hover:bg-white/10 text-white font-bold text-[14px] px-6 py-3 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
          >
            Edit Profile <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Info Cards Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col">
          <h3 className="text-[24px] font-bold text-Third mb-4">Personal Information</h3>
          <div className="w-full h-[2px] bg-Primary mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
            {/* Box 1 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Full Name</span>
              <span className="text-Secondary font-bold text-[15px]">Eleanor Pena</span>
            </div>
            {/* Box 2 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Work Email</span>
              <span className="text-Secondary font-bold text-[15px]">your@mail.com</span>
            </div>
            {/* Box 3 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Phone Number</span>
              <span className="text-Secondary font-bold text-[15px]">(908) 555-0142</span>
            </div>
            {/* Box 4 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Address</span>
              <span className="text-Secondary font-bold text-[15px]">Union County, NJ</span>
            </div>
            {/* Box 5 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Hire Date</span>
              <span className="text-Secondary font-bold text-[15px]">Feb 1, 2026</span>
            </div>
            {/* Box 6 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-Secondary/70 text-[13px] font-medium">Employment Status</span>
              <span className="text-Secondary font-bold text-[15px]">Active</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col">
          <h3 className="text-[24px] font-bold text-Third mb-4">Professional Information</h3>
          <div className="w-full h-[2px] bg-Primary mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {/* Box 1 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5 h-fit">
              <span className="text-Secondary/70 text-[13px] font-medium">Role / Position</span>
              <span className="text-Secondary font-bold text-[15px]">Reg. Behavior Technician</span>
            </div>
            {/* Box 2 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5 h-fit">
              <span className="text-Secondary/70 text-[13px] font-medium">Supervisor</span>
              <span className="text-Secondary font-bold text-[15px]">Dr. Devon Lane</span>
            </div>
            {/* Box 3 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5 h-fit">
              <span className="text-Secondary/70 text-[13px] font-medium">Department</span>
              <span className="text-Secondary font-bold text-[15px]">Behavior Services</span>
            </div>
            {/* Box 4 */}
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5 h-fit">
              <span className="text-Secondary/70 text-[13px] font-medium">Certification</span>
              <span className="text-Secondary font-bold text-[15px]">RBT - Renewal Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Reset Password */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-[600px] p-8 rounded-[24px]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[28px] font-bold text-Third mb-4">Reset Password</h2>
              <div className="w-full h-[2px] bg-Primary"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Current Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter New Password" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
                <p className="text-gray-500 text-[13px]">Your password must be at least 8 characters long and must include at least one capital letter.</p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-Third font-bold text-[14px]">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Re-enter New Password" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#FFF8F8] border border-Primary/30 rounded-[12px] p-4 flex items-center gap-3">
              <Info size={20} className="text-Secondary" />
              <p className="text-Secondary font-medium text-[14px]">You will be logged out of all active sessions after changing your password.</p>
            </div>

            <div className="flex items-center justify-end gap-4 mt-2">
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handlePasswordUpdate}
                className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Password Updated Success */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="max-w-[420px] p-10 rounded-[32px] flex flex-col items-center text-center">
          <div className="w-[85px] h-[85px] bg-Primary rounded-full flex items-center justify-center mb-6">
            <Check size={40} className="text-Third" strokeWidth={3} />
          </div>
          <h2 className="text-[32px] font-bold text-Secondary mb-3">Password Updated!</h2>
          <p className="text-gray-600 text-[15px] mb-10 leading-relaxed px-4">
            Your account password has been changed successfully. You are still logged in.
          </p>
          <div className="flex items-center gap-4 w-full">
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="flex-1 bg-Primary hover:bg-Primary/90 text-Third font-bold text-[15px] py-3.5 rounded-[12px] transition-colors"
            >
              Back to Home
            </button>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="flex-1 bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[15px] py-3.5 rounded-[12px] transition-colors"
            >
              Log In
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Edit Profile */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[550px] p-8 rounded-[24px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[28px] font-bold text-Third">Edit Profile</h2>
              <p className="text-gray-500 text-[14px] mt-1 mb-4">Update your personal information</p>
              <div className="w-full h-[2px] bg-Primary"></div>
            </div>

            {/* Profile Picture Upload */}
            <div className="relative w-[100px] h-[100px] rounded-full bg-Secondary flex items-center justify-center text-Primary font-bold text-[36px] shadow-sm mb-2">
              EP
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-Secondary hover:bg-gray-50 transition-colors">
                <Camera size={14} strokeWidth={2.5}/>
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Eleanor Pena" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Work Email (Read-only)</label>
                <input 
                  type="email" 
                  readOnly
                  defaultValue="your@email.com" 
                  className="w-full bg-[#FCFAF4] rounded-[10px] p-4 text-[14px] text-Secondary outline-none border border-Primary/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="(908) 000 - 0000" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Home Address (Dirección) *</label>
                <input 
                  type="text" 
                  defaultValue="Union County, NJ" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>
            </div>

            {/* Professional Read-only block */}
            <div className="bg-[#FFFBF3] border border-Primary/30 rounded-[16px] p-6 mt-2 flex flex-col gap-5">
              <h4 className="text-Third font-bold tracking-wide text-[16px]">Professional (Read-only)</h4>
              
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Role</label>
                <input 
                  type="text" 
                  readOnly
                  defaultValue="Registered Behavior Technician" 
                  className="w-full bg-[#FCFAF4] border border-Primary/30 rounded-[10px] p-3 text-[14px] text-Secondary outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Department</label>
                <input 
                  type="text" 
                  readOnly
                  defaultValue="Behavior Services" 
                  className="w-full bg-[#FCFAF4] border border-Primary/30 rounded-[10px] p-3 text-[14px] text-Secondary outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;
