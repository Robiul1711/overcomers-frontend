import React, { useState } from 'react';
import { Upload, Download, UploadCloud } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Documents = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const documentsData = [
    { name: "W9", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "I9", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "Signed Contract", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "Photo ID", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "RBT Certification", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Expired" },
    { name: "Background Check", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "HIPAA Training Certificate", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
  ];

  return (
    <div className='flex flex-col gap-6 h-full pb-10'>
      {/* Table Container */}
      <div className="bg-white rounded-[24px] md:rounded-3xl shadow-sm p-4 md:p-8 flex flex-col min-h-full border border-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h3 className="text-[20px] md:text-[22px] font-bold text-Third">Managed Documents</h3>
            <p className="text-gray-500 text-[13px] md:text-[14px] mt-1">{documentsData.length} records currently on file</p>
          </div>
          
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[13px] px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Upload size={18} strokeWidth={2.5}/> <span className="whitespace-nowrap">Upload <span className="hidden xs:inline">Documents</span></span>
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider rounded-tl-xl w-[25%]">Document Name</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider w-[15%]">File Type</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider w-[15%]">Upload Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider w-[15%]">Expiration Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider w-[15%] text-center">Status</th>
                <th className="py-4 px-6 font-bold text-Third text-[13px] uppercase tracking-wider rounded-tr-xl w-[15%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documentsData.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-Third text-[14px]">{doc.name}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium">{doc.type}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">{doc.uploadDate}</td>
                  <td className="py-5 px-6 text-gray-500 text-[13px] md:text-[14px] font-medium whitespace-nowrap">{doc.expirationDate}</td>
                  <td className="py-5 px-6 text-center">
                    {doc.status === "Valid" ? (
                      <span className="bg-[#E5F9ED] text-[#1EB15D] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide inline-block leading-none border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        Valid
                      </span>
                    ) : (
                      <span className="bg-[#FFE9E9] text-[#FF5A5A] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide inline-block leading-none border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6 text-center">
                    {doc.status === "Expired" ? (
                      <button className="inline-flex items-center justify-center gap-2 border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[12px] py-2 px-4 rounded-xl transition-all duration-200 shadow-sm w-full max-w-[140px]">
                        <Upload size={14} strokeWidth={2.5}/> Re-upload
                      </button>
                    ) : (
                      <button className="inline-flex items-center justify-center gap-2 border border-Secondary/20 text-Secondary hover:bg-Secondary hover:text-white font-bold text-[12px] py-2 px-4 rounded-xl transition-all duration-200 shadow-sm w-full max-w-[140px]">
                        <Download size={14} strokeWidth={2.5}/> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile hint */}
        <div className="md:hidden mt-4 py-3 px-4 bg-gray-50/50 rounded-xl text-center">
           <p className="text-[11px] text-gray-400 italic">Scroll horizontally to view complete records</p>
        </div>
      </div>

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[650px] p-5 sm:p-8 rounded-[24px] overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] sm:text-[28px] font-bold text-Third">Upload Credentials</h2>
              <p className="text-gray-500 text-[13px] md:text-[14px] mt-1 mb-4">Add your certifications and compliant documents</p>
              <div className="w-full h-[3px] bg-Primary rounded-full"></div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Document Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. RBT Certification" 
                  className="w-full bg-[#F4F4F4] rounded-xl p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Upload Files *</label>
                <div className="w-full border-dashed border-2 border-Primary bg-[#FFFBF3] rounded-[20px] p-6 sm:p-10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#FFFBF3]/80 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <UploadCloud size={24} className="text-Secondary" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-Secondary font-bold text-[15px] sm:text-[16px]">Tap to upload or drag & drop</p>
                    <p className="text-gray-500 text-[12px] mt-1">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-[14px] px-8 py-3.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="w-full sm:w-auto bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Upload & Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;

