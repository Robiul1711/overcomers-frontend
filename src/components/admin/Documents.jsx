import React, { useState } from 'react';
import { Upload, Download, UploadCloud } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Documents = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const documentsData = [
    { name: "RBT Certification", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Expired" },
    { name: "Background Check", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
    { name: "HIPAA Training Certificate", type: "PDF", uploadDate: "March 1, 2026", expirationDate: "March 9, 2027", status: "Valid" },
  ];

  return (
    <div className='flex flex-col gap-6 h-full pb-10'>
      {/* Table Container */}
      <div className="bg-white rounded-[24px] shadow-sm p-6 flex flex-col min-h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[22px] font-bold text-Third">All Documents</h3>
            <p className="text-gray-500 text-[14px] mt-1">3 documents on file</p>
          </div>
          
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#76121F] hover:bg-[#76121F]/90 text-white font-bold text-[14px] px-6 py-3 rounded-[12px] flex items-center justify-center gap-2 transition-colors"
          >
            <Upload size={18} strokeWidth={2.5}/> Upload Documents & Certifications
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#EFEFEF]">
                <th className="py-4 px-6 font-bold text-Third text-[14px] rounded-tl-[12px] w-[25%]">Document Name</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">File Type</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">Upload Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">Expiration Date</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] w-[15%]">Status</th>
                <th className="py-4 px-6 font-bold text-Third text-[14px] rounded-tr-[12px] w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {documentsData.map((doc, index) => (
                <tr key={index} className="border-b border-[#F0F0F0] hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-Third text-[14px]">{doc.name}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{doc.type}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{doc.uploadDate}</td>
                  <td className="py-5 px-6 text-gray-500 text-[14px] font-medium">{doc.expirationDate}</td>
                  <td className="py-5 px-6">
                    {doc.status === "Valid" ? (
                      <span className="bg-[#E5F9ED] text-[#1EB15D] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
                        Valid
                      </span>
                    ) : (
                      <span className="bg-[#FFE9E9] text-[#FF5A5A] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6">
                    {doc.status === "Expired" ? (
                      <button className="border border-Secondary text-Secondary hover:bg-Secondary hover:text-white font-bold text-[13px] py-2 px-5 rounded-[12px] flex items-center justify-center gap-2 transition-colors ">
                        <Upload size={14} strokeWidth={2.5}/> Re-upload
                      </button>
                    ) : (
                      <button className="border border-Secondary text-Secondary hover:bg-Secondary hover:text-white font-bold text-[13px] py-2 px-5 rounded-[12px] flex items-center justify-center gap-2 transition-colors ">
                        <Download size={14} strokeWidth={2.5}/> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-[650px] p-8 rounded-[24px]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[28px] font-bold text-Third">Add Documents & Certifications</h2>
              <p className="text-gray-500 text-[14px] mt-1 mb-4">Add documents & certifications</p>
              <div className="w-full h-[2px] bg-Primary"></div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Title</label>
                <input 
                  type="text" 
                  placeholder="Write the certificate name" 
                  className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-Third font-bold text-[14px]">Upload Documents *</label>
                <div className="w-full border-dashed border-[1.5px] border-Primary bg-[#FFFBF3] rounded-[16px] p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#FFFBF3]/80 transition-colors">
                  <Upload size={28} className="text-Secondary mb-1" strokeWidth={2.5} />
                  <p className="text-Secondary font-bold text-[16px]">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-[13px]">Supported: JPG, PDF. Max size: 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
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
