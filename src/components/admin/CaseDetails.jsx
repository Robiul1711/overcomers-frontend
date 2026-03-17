import React, { useState } from 'react';
import { MapPin, Calendar, User, FileEdit, Plus, FileText, Download, ChevronDown, Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CaseDetails = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedCaseStatus, setSelectedCaseStatus] = useState("Active");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const statuses = ["Active", "Pending", "Completed"];

  return (
    <div className='flex flex-col gap-8 pb-10'>
      {/* Top Hero Card */}
      <div className="bg-[#76121F] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col text-white gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-white/90">Case ID: ABA-2024-009</span>
            <span className="bg-white px-3 py-1 rounded-full text-[#1eb15d] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1eb15d] inline-block"></span> Active
            </span>
          </div>
          <h2 className="text-[32px] font-bold leading-tight">John Smith</h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[12px] font-medium text-Primary">
              <MapPin size={14} /> Home
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[12px] font-medium text-Primary">
              <Calendar size={14} /> Assigned March 1, 2026
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[12px] font-medium text-Primary">
              <User size={14} /> Eleanor Pena (RBT)
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsStatusModalOpen(true)}
          className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-6 py-3 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto shrink-0"
        >
          <FileEdit size={16} strokeWidth={2.5}/> Update Status
        </button>
      </div>

      {/* Grid 1: Information */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Client Information */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col">
          <h3 className="text-[24px] font-bold text-Third mb-4">Client Information</h3>
          <div className="w-full h-[2px] bg-Primary mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Client Name</span>
              <span className="text-[#76121F] font-bold text-[15px]">John Smith</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Case ID</span>
              <span className="text-[#76121F] font-bold text-[15px]">ABA-2024-009</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Date of Birth</span>
              <span className="text-[#76121F] font-bold text-[15px]">June 14, 2018</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Service Location</span>
              <span className="text-[#76121F] font-bold text-[15px]">Home</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Assigned Date</span>
              <span className="text-[#76121F] font-bold text-[15px]">March 1, 2026</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Case Status</span>
              <span className="text-[#76121F] font-bold text-[15px]">Active</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm h-full flex flex-col">
          <h3 className="text-[24px] font-bold text-Third mb-4">Service Details</h3>
          <div className="w-full h-[2px] bg-Primary mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Assigned Therapist</span>
              <span className="text-[#76121F] font-bold text-[15px]">Eleanor Pena</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Supervising BCBA</span>
              <span className="text-[#76121F] font-bold text-[15px]">Dr. Devon Lane</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Service Type</span>
              <span className="text-[#76121F] font-bold text-[15px]">ABA Therapy</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Session Frequency</span>
              <span className="text-[#76121F] font-bold text-[15px]">3x per week</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Service Start Date</span>
              <span className="text-[#76121F] font-bold text-[15px]">March 1, 2026</span>
            </div>
            <div className="bg-[#FCFAF4] p-5 rounded-[16px] flex flex-col gap-1.5">
              <span className="text-[#76121F]/70 text-[13px] font-medium">Next Session</span>
              <span className="text-[#76121F] font-bold text-[15px]">March 10, 2026</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid 2: Notes & Docs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Case Notes */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[24px] font-bold text-Third">Case Notes</h3>
              <p className="text-gray-500 text-[14px]">Review important notes and updates related to this case.</p>
            </div>
            <button 
              onClick={() => setIsNoteModalOpen(true)}
              className="bg-[#76121F] hover:bg-[#76121F]/90 text-white font-bold text-[13px] px-5 py-2.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <Plus size={16} strokeWidth={2.5}/> Add Note
            </button>
          </div>
          <div className="w-full h-[2px] bg-Primary mt-4 mb-6"></div>
          
          <div className="flex flex-col gap-4 flex-grow">
            <div className="bg-[#FCFAF4] p-6 rounded-r-[16px] rounded-l-[4px] border-l-4 border-l-[#76121F] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[#76121F] font-bold text-[16px]">Eleanor Pena (RBT)</span>
                <span className="text-gray-400 text-[13px]">March 5, 2026</span>
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed">Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.</p>
            </div>

            <div className="bg-[#FCFAF4] p-6 rounded-r-[16px] rounded-l-[4px] border-l-4 border-l-[#76121F] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[#76121F] font-bold text-[16px]">Dr. Devon Lane (BCBA)</span>
                <span className="text-gray-400 text-[13px]">February 28, 2026</span>
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed">Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week.</p>
            </div>

            <div className="bg-[#FCFAF4] p-6 rounded-r-[16px] rounded-l-[4px] border-l-4 border-l-[#76121F] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[#76121F] font-bold text-[16px]">Eleanor Pena (RBT)</span>
                <span className="text-gray-400 text-[13px]">Sarah Martinez (RBT)</span>
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed">Initial session completed. Client was responsive and comfortable in home setting. Baseline data collected for all target behaviors.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Docs & Actions */}
        <div className="flex flex-col gap-8 h-full">

          {/* Case Documents */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col">
            <div className="mb-2">
              <h3 className="text-[24px] font-bold text-Third">Case Documents</h3>
              <p className="text-gray-500 text-[14px]">Access files related to this case.</p>
            </div>
            <div className="w-full h-[2px] bg-Primary mt-4 mb-6"></div>
            
            <div className="flex flex-col gap-4">
              <div className="border border-gray-200 p-5 rounded-[16px] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FCFAF4] flex items-center justify-center shrink-0">
                    <FileText className="text-[#76121F]" size={20} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#76121F] font-bold text-[16px]">ABA Referral</span>
                    <span className="text-gray-500 text-[13px]">PDF · Uploaded Feb 15, 2026</span>
                  </div>
                </div>
                <button className="border border-[#76121F] hover:bg-[#76121F] text-[#76121F] hover:text-white font-bold text-[13px] px-5 py-2.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors shrink-0">
                  <Download size={14} strokeWidth={2.5}/> Download
                </button>
              </div>

              <div className="border border-gray-200 p-5 rounded-[16px] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FCFAF4] flex items-center justify-center shrink-0">
                    <FileText className="text-[#76121F]" size={20} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#76121F] font-bold text-[16px]">Behavior Assessment Report</span>
                    <span className="text-gray-500 text-[13px]">PDF · Uploaded Feb 20, 2026</span>
                  </div>
                </div>
                <button className="border border-[#76121F] hover:bg-[#76121F] text-[#76121F] hover:text-white font-bold text-[13px] px-5 py-2.5 rounded-[10px] flex items-center justify-center gap-2 transition-colors shrink-0">
                  <Download size={14} strokeWidth={2.5}/> Download
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col flex-grow">
            <h3 className="text-[24px] font-bold text-Third mb-4">Quick Actions</h3>
            <div className="w-full h-[2px] bg-Primary mb-8"></div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setIsStatusModalOpen(true)}
                className="w-full bg-Primary hover:bg-Primary/90 text-[15px] font-bold text-Third p-4 rounded-[12px] flex items-center gap-3 transition-colors"
              >
                <FileEdit size={18} strokeWidth={2.5}/> Update Case Status
              </button>
              <button 
                onClick={() => setIsNoteModalOpen(true)}
                className="w-full bg-[#76121F] hover:bg-[#76121F]/90 text-[15px] font-bold text-white p-4 rounded-[12px] flex items-center gap-3 transition-colors"
              >
                <Plus size={18} strokeWidth={2.5}/> Add Session Note
              </button>
            </div>
          </div>

        </div>

      </div>

      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="max-w-[500px] p-8 rounded-[24px]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[28px] font-bold text-Third">Update Case Status</h2>
              <p className="text-gray-500 text-[14px] mt-1 mb-4">Select the new status for Case ABA-2024-009.</p>
              <div className="w-full h-[2px] bg-Primary"></div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-Third font-bold text-[14px]">Case Status</label>
              <div 
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent cursor-pointer flex justify-between items-center"
              >
                <span>{selectedCaseStatus}</span>
                <ChevronDown size={18} className="text-gray-500 pointer-events-none" />
              </div>

              {isStatusDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsStatusDropdownOpen(false)}></div>
                  <div className="absolute left-0 top-[105%] mt-1 w-full bg-[#FFFBF3] rounded-[16px] shadow-lg border border-gray-100 p-3 z-20 flex flex-col gap-2.5">
                    {statuses.map(status => {
                      const isSelected = selectedCaseStatus === status;
                      return (
                        <div 
                          key={status}
                          onClick={() => {
                            setSelectedCaseStatus(status);
                            setIsStatusDropdownOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-[12px] cursor-pointer transition-colors text-[14px] shadow-sm ${
                            isSelected 
                              ? 'bg-Primary border border-Primary font-bold text-Third' 
                              : 'bg-[#FCFAF4] border border-gray-200 text-gray-600 hover:bg-white'
                          }`}
                        >
                          {isSelected && <Check size={18} className="text-Third" strokeWidth={2.5}/>}
                          {!isSelected && <span className="w-[18px]"></span>} {/* Spacer to keep alignment */}
                          {status}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsStatusModalOpen(false)}
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsStatusModalOpen(false)}
                className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
        <DialogContent className="max-w-[700px] p-8 rounded-[24px]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[28px] font-bold text-Third">Add Case Notes</h2>
              <p className="text-gray-500 text-[14px] mt-1 mb-4">Add important notes and updates</p>
              <div className="w-full h-[2px] bg-Primary"></div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-Third font-bold text-[14px]">Add Notes</label>
              <textarea 
                placeholder="Write a new case notes..." 
                className="w-full h-[180px] bg-[#F4F4F4] rounded-[10px] p-4 text-[14px] text-gray-700 outline-none border border-transparent focus:border-Primary transition-colors resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsNoteModalOpen(false)}
                className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsNoteModalOpen(false)}
                className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[14px] px-8 py-3.5 rounded-[10px] transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetails;
