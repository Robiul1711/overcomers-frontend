import React, { useState, useRef } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import useMutationClient from '@/hooks/useMutationClient';

const AddReportModal = ({ isOpen, onClose, caseId }) => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useMutationClient({
    url: `/employee/cases/${caseId}/reports`,
    method: 'post',
    invalidateKeys: [['employeeCaseReports']],
    successMessage: 'Report uploaded successfully',
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!title.trim() || !selectedFile) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', selectedFile);

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="bg-white rounded-[32px] w-full max-w-[600px] relative z-10 shadow-2xl flex flex-col p-8 sm:p-10 font-poppins animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <h2 className="text-[32px] font-bold text-[#3A331E] leading-tight mb-2">Add Reports</h2>
            <p className="text-[#6B7280] text-[15px] font-medium mb-3">Add therapy reports progress over time</p>
            <div className="w-full h-[2px] bg-[#FFBB03] rounded-full"></div>
          </div>
          <button 
            onClick={handleClose}
            className="ml-4 w-10 h-10 rounded-full border-2 border-[#800000] flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-all active:scale-90"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
           {/* Title Input */}
           <div className="flex flex-col gap-3">
              <label className="text-[14px] font-bold text-[#3A331E]">Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 text-[#3A331E] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76121F]/20 transition-all font-medium"
                placeholder="Write the certificate name"
              />
           </div>

           {/* Upload Component */}
           <div className="flex flex-col gap-3">
              <label className="text-[14px] font-bold text-[#3A331E]">Upload Reports *</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#FFBB03]/30 bg-[#FFFBEE]/30 rounded-3xl p-10 flex flex-col items-center justify-center text-center group hover:border-[#FFBB03] transition-all cursor-pointer"
              >
                 <div className="w-12 h-12 rounded-xl bg-white border border-[#FFBB03]/20 flex items-center justify-center text-[#76121F] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                 </div>
                 {selectedFile ? (
                   <p className="text-[#76121F] font-bold text-[15px]">{selectedFile.name}</p>
                 ) : (
                   <>
                     <h4 className="text-[18px] font-bold text-[#76121F] mb-1">Click to upload or drag and drop</h4>
                     <p className="text-gray-400 text-[13px] font-medium">Supported: JPG, PDF. Max size: 10MB</p>
                   </>
                 )}
              </div>
           </div>

           <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={handleClose}
                disabled={isPending}
                className="px-8 py-3.5 bg-[#FFBB03] text-white rounded-xl font-bold text-[14px] hover:bg-[#E5A802] transition-all active:scale-95 shadow-md disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !selectedFile || isPending}
                className="px-8 py-3.5 bg-[#76121F] text-white rounded-xl font-bold text-[14px] hover:bg-[#600000] transition-all active:scale-95 shadow-md shadow-[#76121F]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload & Save'
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddReportModal;
