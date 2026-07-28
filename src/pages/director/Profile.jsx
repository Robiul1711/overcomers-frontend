import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Camera, Info, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit profile form
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editBankName, setEditBankName] = useState("");
  const [editBankAccountNo, setEditBankAccountNo] = useState("");
  const [editBankRoutingNo, setEditBankRoutingNo] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editAddressCity, setEditAddressCity] = useState("");
  const [editAddressState, setEditAddressState] = useState("");
  const [editAddressZip, setEditAddressZip] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const fileInputRef = useRef(null);

  // Password form
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { data, isLoading, isError } = useClient({
    queryKey: ["directorProfile"],
    url: "/director/profile",
  });

  const profile = data?.data;
  const personal = profile?.personal_information || {};
  const professional = profile?.professional_information || {};
  const financial = profile?.financial_information || {};

  const { mutate: updateProfile, isPending: isUpdating } = useMutationClient({
    url: "/director/profile",
    method: "post",
    invalidateKeys: [["directorProfile"]],
    successMessage: "Profile updated successfully",
  });

  const { mutate: updatePassword, isPending: isPasswordUpdating } = useMutationClient({
    url: "/director/profile/password",
    method: "post",
    successMessage: "Password updated successfully",
  });

  // Sync edit form when modal opens or profile loads
  useEffect(() => {
    if (isEditModalOpen && personal.full_name) {
      setEditName(personal.full_name || "");
      setEditPhone(personal.phone_number || "");
      setEditAddress(personal.address || "");
      setEditBankName(financial.bank_name || "");
      setEditBankAccountNo(financial.bank_account_no || "");
      setEditBankRoutingNo(financial.bank_routing_no || "");
      setEditDob(financial.dob ? financial.dob.split("T")[0] : "");
      setEditAddressCity(financial.address_city || "");
      setEditAddressState(financial.address_state || "");
      setEditAddressZip(financial.address_zip || "");
      setEditFile(null);
      setEditPreview("");
    }
  }, [isEditModalOpen, personal, financial]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (editPreview && editPreview.startsWith("blob:")) {
        URL.revokeObjectURL(editPreview);
      }
    };
  }, [editPreview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditFile(file);
      if (editPreview && editPreview.startsWith("blob:")) {
        URL.revokeObjectURL(editPreview);
      }
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = () => {
    if (!editName.trim()) return;

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("phone_number", editPhone);
    formData.append("address", editAddress);
    formData.append("bank_name", editBankName);
    formData.append("bank_account_no", editBankAccountNo);
    formData.append("bank_routing_no", editBankRoutingNo);
    formData.append("dob", editDob);
    formData.append("address_city", editAddressCity);
    formData.append("address_state", editAddressState);
    formData.append("address_zip", editAddressZip);
    if (editFile) {
      formData.append("profile_picture", editFile);
    }

    updateProfile(
      { data: formData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditFile(null);
          setEditPreview("");
        },
      }
    );
  };

  const resetEditModal = () => {
    setIsEditModalOpen(false);
    setEditBankName("");
    setEditBankAccountNo("");
    setEditBankRoutingNo("");
    setEditDob("");
    setEditAddressCity("");
    setEditAddressState("");
    setEditAddressZip("");
    setEditFile(null);
    setEditPreview("");
  };

  const handlePasswordUpdate = () => {
    if (!passwordCurrent || !passwordNew || !passwordConfirm) return;
    if (passwordNew !== passwordConfirm) return;

    updatePassword(
      {
        data: {
          current_password: passwordCurrent,
          new_password: passwordNew,
          new_password_confirmation: passwordConfirm,
        },
      },
      {
        onSuccess: () => {
          setIsPasswordModalOpen(false);
          setIsSuccessModalOpen(true);
          setPasswordCurrent("");
          setPasswordNew("");
          setPasswordConfirm("");
        },
      }
    );
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const SkeletonBox = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins">
        {/* Hero Skeleton */}
        <div className="bg-gray-300 rounded-[24px] p-6 md:p-10 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto z-10">
            <SkeletonBox className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full" />
            <div className="flex flex-col items-center md:items-start gap-2">
              <SkeletonBox className="h-8 w-48" />
              <SkeletonBox className="h-4 w-36" />
              <SkeletonBox className="h-5 w-28 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <SkeletonBox className="h-11 w-44 rounded-xl" />
            <SkeletonBox className="h-11 w-44 rounded-xl" />
          </div>
        </div>

        {/* Info Cards Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-50">
            <SkeletonBox className="h-8 w-44 mb-4" />
            <SkeletonBox className="h-px w-full bg-gray-100 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-2 border border-gray-100/50"
                >
                  <SkeletonBox className="h-3 w-24" />
                  <SkeletonBox className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-50">
            <SkeletonBox className="h-8 w-44 mb-4" />
            <SkeletonBox className="h-px w-full bg-gray-100 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-2 border border-Secondary/5"
                >
                  <SkeletonBox className="h-3 w-20" />
                  <SkeletonBox className="h-4 w-36" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[300px] text-red-500 font-bold font-poppins">
        Failed to load profile data.
      </div>
    );
  }

  const personalInfo = [
    { label: "Full Name", value: personal.full_name },
    { label: "Email Address", value: personal.email },
    { label: "Mobile Number", value: personal.phone_number },
    { label: "Residence", value: personal.address },
    { label: "Join Date", value: personal.hire_date },
    { label: "Status", value: personal.employment_status },
  ];

  const professionalInfo = [
    { label: "Assigned Role", value: professional.role_position },
    { label: "Assigned BCBA", value: professional.supervisor },
    { label: "Team Group", value: professional.department },
    { label: "Latest Credentials", value: professional.certification },
  ];

  const formattedDob = financial.dob ? (() => {
    try {
      const d = new Date(financial.dob);
      return isNaN(d.getTime()) ? financial.dob : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return financial.dob;
    }
  })() : "";

  const financialInfo = [
    { label: "Bank Name", value: financial.bank_name },
    { label: "Bank Account No", value: financial.bank_account_no },
    { label: "Bank Routing No", value: financial.bank_routing_no },
    { label: "Date of Birth", value: formattedDob },
    { label: "City", value: financial.address_city },
    { label: "State", value: financial.address_state },
    { label: "Zip Code", value: financial.address_zip },
  ];

  const profilePictureUrl = personal.profile_picture;

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins text-Third">
      {/* Top Profile Card */}
      <div className="bg-Secondary rounded-[24px] p-6 md:p-10 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto z-10 text-center md:text-left">
          <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-[#5d0e19] flex items-center justify-center text-Primary font-bold text-[28px] md:text-[36px] shadow-sm flex-shrink-0 overflow-hidden animate-in fade-in zoom-in duration-300">
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt={personal.full_name} className="w-full h-full object-cover" />
            ) : (
              getInitials(personal.full_name)
            )}
          </div>
          <div className="flex flex-col text-white">
            <h2 className="text-[26px] md:text-[36px] font-bold leading-tight">{personal.full_name || "—"}</h2>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mt-2">
              <span className="text-[13px] md:text-[14px] font-medium text-white/90">
                {professional.role_position || "—"}
              </span>
              {personal.employment_status && (
                <span
                  className={`px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 self-center md:self-auto ${
                    personal.employment_status === "Active"
                      ? "bg-green-500/20 border border-green-400/30"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                      personal.employment_status === "Active" ? "bg-green-400" : "bg-white/50"
                    }`}
                  ></span>
                  {personal.employment_status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-Primary hover:bg-Primary/90 text-[#76121F] font-bold text-[13px] px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all w-full md:w-auto active:scale-95 shadow-sm"
          >
            Security Settings <ArrowUpRight size={18} strokeWidth={2.5} />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {personalInfo.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50"
              >
                <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">{item.label}</span>
                <span
                  className={`text-Third font-bold text-[14px] md:text-[15px] truncate ${
                    item.label === "Status" ? (item.value === "Active" ? "text-[#1eb15d]" : "text-gray-500") : ""
                  }`}
                >
                  {item.value || "—"}
                </span>
              </div>
            ))}
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
            {professionalInfo.map((item, idx) => (
              <div
                key={idx}
                className="bg-Secondary/[0.03] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-Secondary/5"
              >
                <span className="text-Secondary/40 text-[12px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-Secondary font-bold text-[14px] md:text-[15px]">{item.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-50 mt-6 md:mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-8 bg-Primary rounded-full"></div>
          <h3 className="text-[20px] md:text-[24px] font-bold text-Third">Financial Information</h3>
        </div>
        <div className="w-full h-px bg-gray-100 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {financialInfo.map((item, idx) => (
            <div key={idx} className="bg-[#FAF9F6] p-4 md:p-5 rounded-2xl flex flex-col gap-1 border border-gray-100/50">
              <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">{item.label}</span>
              <span className="text-Third font-bold text-[14px] md:text-[15px] truncate">{item.value || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Reset Password */}
      <Dialog
        open={isPasswordModalOpen}
        onOpenChange={(open) => {
          setIsPasswordModalOpen(open);
          if (!open) {
            setPasswordCurrent("");
            setPasswordNew("");
            setPasswordConfirm("");
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-5 sm:p-8 rounded-[24px] overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold text-Third mb-4 leading-tight">
                Update Authentication
              </h2>
              <div className="w-full h-[3px] bg-Primary rounded-full"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Current Security Key *</label>
                <input
                  type="password"
                  placeholder="********"
                  value={passwordCurrent}
                  onChange={(e) => setPasswordCurrent(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Vault New Key *</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordNew}
                  onChange={(e) => setPasswordNew(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
                <p className="text-gray-500 text-[12px] mt-1 leading-relaxed">
                  Required: Minimum 8 characters, at least one uppercase letter, and one special character.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-Third font-bold text-[14px]">Verify New Key *</label>
                <input
                  type="password"
                  placeholder="Verify new password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
                {passwordConfirm && passwordNew !== passwordConfirm && (
                  <p className="text-red-500 text-xs font-bold mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="bg-[#FFF8F8] border border-Secondary/10 rounded-2xl p-4 flex items-start gap-3">
              <Info size={20} className="text-Secondary mt-0.5 shrink-0" />
              <p className="text-Secondary/80 font-medium text-[13px] md:text-[14px]">
                Security Note: Once changed, you will be required to log back in on all other connected devices.
              </p>
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
                disabled={
                  isPasswordUpdating ||
                  !passwordCurrent ||
                  !passwordNew ||
                  !passwordConfirm ||
                  passwordNew !== passwordConfirm
                }
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPasswordUpdating ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Updating...
                  </>
                ) : (
                  "Save New Password"
                )}
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
              className="w-full bg-Primary hover:bg-Primary/90 text-[#76121F] font-bold text-[15px] py-3.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Edit Profile */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) resetEditModal();
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[550px] p-0 rounded-[24px] overflow-hidden border-none shadow-2xl">
          <div className="p-4 sm:p-6 flex flex-col gap-6 md:gap-8 bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A331E] leading-tight">
                Edit Profile
              </h2>
              <p className="text-[#6B7280] text-sm sm:text-base mt-1 mb-4">Update your personal information</p>
              <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex justify-center sm:justify-start">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-full bg-[#76121F] flex items-center justify-center text-[#FFBB03] font-bold text-3xl sm:text-[44px] shadow-lg cursor-pointer overflow-hidden"
              >
                {editPreview ? (
                  <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : profilePictureUrl ? (
                  <img src={profilePictureUrl} alt={personal.full_name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(personal.full_name)
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button className="absolute bottom-1 right-1 w-8 h-8 sm:w-9 sm:h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md text-[#76121F] hover:bg-gray-50 transition-colors cursor-pointer">
                  <Camera size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#3A331E] font-bold text-sm">Full Name *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3 sm:p-4 text-sm sm:text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#3A331E] font-bold text-sm">Work Email (Read-only)</label>
                <input
                  type="email"
                  readOnly
                  value={personal.email || ""}
                  className="w-full bg-[#FAF9F6] rounded-xl p-3 sm:p-4 text-sm sm:text-[15px] text-[#800000] font-medium border border-[#FFBB03]/20 cursor-not-allowed opacity-80"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#3A331E] font-bold text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3 sm:p-4 text-sm sm:text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#3A331E] font-bold text-sm">Home Address *</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full bg-[#F4F4F4] rounded-xl p-3 sm:p-4 text-sm sm:text-[15px] text-[#3A331E] outline-none border border-transparent focus:border-[#FFBB03] transition-all"
                />
              </div>

              {/* Financial Section */}
              <div className="bg-[#FAF9F6] border border-[#FFBB03]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 mt-2">
                <h4 className="text-[#3A331E] font-extrabold text-base sm:text-lg tracking-wide">
                  Financial Information
                </h4>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={editBankName}
                    onChange={(e) => setEditBankName(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={editBankAccountNo}
                    onChange={(e) => setEditBankAccountNo(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    Bank Routing Number
                  </label>
                  <input
                    type="text"
                    value={editBankRoutingNo}
                    onChange={(e) => setEditBankRoutingNo(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editDob}
                    onChange={(e) => setEditDob(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    City
                  </label>
                  <input
                    type="text"
                    value={editAddressCity}
                    onChange={(e) => setEditAddressCity(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    State
                  </label>
                  <input
                    type="text"
                    value={editAddressState}
                    onChange={(e) => setEditAddressState(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={editAddressZip}
                    onChange={(e) => setEditAddressZip(e.target.value)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#3A331E] font-semibold border border-[#FFBB03]/20 focus:border-[#FFBB03] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Professional Section */}
              <div className="bg-[#FFFBEE] border border-[#FFF3D6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 mt-2">
                <h4 className="text-[#3A331E] font-extrabold text-base sm:text-lg tracking-wide">
                  Professional (Read-only)
                </h4>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">Role</label>
                  <input
                    type="text"
                    readOnly
                    value={professional.role_position || "—"}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#800000] font-semibold border border-[#FFBB03]/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3A331E] font-bold text-[13px]">Department</label>
                  <input
                    type="text"
                    readOnly
                    value={professional.department || "—"}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 text-sm text-[#800000] font-semibold border border-[#FFBB03]/30"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-2">
              <button
                onClick={resetEditModal}
                className="w-full sm:w-auto bg-[#FFBB03] hover:bg-[#eab002] text-white font-bold text-sm sm:text-[15px] px-6 sm:px-8 py-3.5 rounded-xl transition-all active:scale-95 shadow-md shadow-[#FFBB03]/10"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={isUpdating || !editName.trim()}
                className="w-full sm:w-auto bg-[#76121F] hover:bg-[#600000] text-white font-bold text-sm sm:text-[15px] px-6 sm:px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
