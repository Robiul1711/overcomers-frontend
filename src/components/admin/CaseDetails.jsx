import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Plus, 
  FileText, 
  Download, 
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  LayoutGrid,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState('Client Schedule');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = {
    "Eleanor Pena": { name: "Eleanor Pena", role: "Therapist / BCBA", phone: "(000) 000-0000", email: "example@company.com", dateRange: "Feb 15 – Feb 28, 2026" },
    "Dr. Devon Lane": { name: "Dr. Devon Lane", role: "Supervising BCBA", phone: "(111) 222-3333", email: "devon@company.com", dateRange: "Feb 1 – Feb 28, 2026" },
  };

  const sectionRef = React.useRef(null);

  const scrollToContent = (tabName) => {
    setActiveTab(tabName);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewMember = (name) => {
    setSelectedMember(teamMembers[name] || teamMembers["Eleanor Pena"]);
    setIsTeamModalOpen(true);
  };

  const clientInfo = [
    { label: "Client Name", value: "John Smith" },
    { label: "Date of Birth", value: "June 14, 2018" },
    { label: "Service Location", value: "Home" },
    { label: "Assigned Date", value: "March 1, 2026" },
  ];

  const serviceDetails = [
    { label: "Assigned Therapist", value: "Eleanor Pena", hasLink: true },
    { label: "Supervising BCBA", value: "Dr. Devon Lane", hasLink: true },
    { label: "Service Type", value: "ABA Therapy" },
    { label: "Session Frequency", value: "3x per week" },
    { label: "Service Start Date", value: "March 1, 2026" },
    { label: "Session Time", value: "2:00 PM – 5:00 PM" },
  ];

  const caseNotes = [
    { author: "Eleanor Pena (RBT)", date: "March 5, 2026", note: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week." },
    { author: "Dr. Devon Lane (BCBA)", date: "February 28, 2026", note: "Client showing improvement in communication and social interaction during recent sessions. Successfully completed 3 of 4 targeted goals this week." },
    { author: "Eleanor Pena (RBT)", date: "Sarah Martinez (RBT)", note: "Initial session completed. Client was responsive and comfortable in home setting. Baseline data collected for all target behaviors." }
  ];

  const clinicFiles = [
    { name: "ABA Referral", date: "Feb 15, 2026" },
    { name: "Behavior Assessment Report", date: "Feb 20, 2026" },
    { name: "Behavior Assessment Report", date: "Feb 20, 2026" },
    { name: "Behavior Assessment Report", date: "Feb 20, 2026" },
  ];

  const weeklySchedule = [
    { day: "Sun", date: "22", session: { client: "John Smith", time: "09:00 - 10:00", type: "One-to-One", room: "Room 101", status: "Upcoming", isActiveDay: true } },
    { day: "Mon", date: "23", session: null },
    { day: "Tue", date: "24", session: null },
    { day: "Wed", date: "25", session: null },
    { day: "Thu", date: "26", session: null },
    { day: "Fri", date: "27", session: { client: "John Smith", time: "09:00 - 10:00", type: "Group", room: "Room 101", status: "Upcoming" } },
    { day: "Sat", date: "28", session: { client: "John Smith", time: "10:30 - 11:30", type: "One-to-One", room: "Room 101", status: "Upcoming" } },
  ];

  const insuranceDetails = [
    { label: "Authorization Number", value: "C8812945" },
    { label: "Insurance Provider", value: "Aetna" },
    { label: "Member ID", value: "M-2024-4421" },
    { label: "Plan / Policy Number", value: "AET-78902-NJ" },
    { label: "Authorization Start Date", value: "March 1, 2026" },
    { label: "Authorization End Date", value: "August 31, 2026" },
  ];

  const cptCodes = [
    { code: "97153", title: "ABA Therapy - Technician", desc: "Adaptive behavior treatment by protocol - direct contact, each 15 min", units: "160 units auth", status: "Active" },
    { code: "97155", title: "ABA Therapy - Supervision", desc: "Adaptive behavior treatment with protocol modification - each 15 min", units: "80 units auth", status: "Active" },
  ];

  const authHistory = [
    { number: "C8812945", start: "March 1, 2026", end: "Aug 31, 2026", codes: "97153, 97155", units: "240 units", status: "Active" },
    { number: "C7701234", start: "Sep 1, 2025", end: "Feb 28, 2026", codes: "97153, 97155", units: "200 units", status: "Expired" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10 font-poppins">
      {/* Hero Section */}
      <div className="bg-Secondary rounded-[40px] p-8 md:p-10 shadow-lg relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-[14px] font-medium">Case ID: ABA-2024-009</span>
              <span className="bg-[#E5F9ED] text-[#1EB15D] px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1EB15D]"></span> Active
              </span>
            </div>
            <h1 className="text-5xl font-extrabold text-white">John Smith</h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[12px] font-bold text-Primary">
                <MapPin size={14} /> Home
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[12px] font-bold text-Primary">
                <Calendar size={14} /> Assigned March 1, 2026
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[12px] font-bold text-Primary">
                <User size={14} /> Eleanor Pena (RBT)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToContent('Programs')}
              className="px-8 py-3.5 bg-Primary text-Secondary rounded-[18px] font-bold text-[15px] hover:bg-Primary/90 transition-all shadow-lg"
            >
              Programs
            </button>
            <button 
              onClick={() => scrollToContent('Client Schedule')}
              className="px-8 py-3.5 bg-white/5 border border-white/20 text-white rounded-[18px] font-bold text-[15px] hover:bg-white/10 transition-all"
            >
              Client Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Info Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Client Information */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col">
          <h3 className="text-2xl font-extrabold text-Third mb-4">Client Information</h3>
          <div className="w-full h-0.5 bg-Primary mb-8"></div>
          <div className="grid grid-cols-2 gap-4 flex-grow mb-6">
            {clientInfo.map((info, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-5 rounded-[24px] border border-gray-50 flex flex-col gap-1">
                <span className="text-gray-400 text-[13px] font-bold">{info.label}</span>
                <span className="text-Secondary font-extrabold text-[16px]">{info.value}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-Secondary font-bold text-[14px] hover:underline">
            View More <ChevronRight size={16} />
          </button>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <h3 className="text-2xl font-extrabold text-Third mb-4">Service Details</h3>
          <div className="w-full h-0.5 bg-Primary mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {serviceDetails.map((detail, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-5 rounded-[24px] border border-gray-50 flex flex-col gap-1 min-h-[110px]">
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wide">{detail.label}</span>
                <span className="text-Secondary font-extrabold text-[15px] leading-tight">{detail.value}</span>
                {detail.hasLink && (
                  <button 
                    onClick={() => handleViewMember(detail.value)}
                    className="flex items-center gap-1.5 text-Secondary/60 font-bold text-[11px] mt-1 hover:text-Secondary transition-colors"
                  >
                    View More <ExternalLink size={10} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes & Files Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Case Notes */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-extrabold text-Third">Case Notes</h3>
              <p className="text-gray-400 text-sm font-medium mt-0.5">Review important notes and updates related to this case.</p>
            </div>
            <button 
              onClick={() => setIsNoteModalOpen(true)}
              className="px-6 py-2.5 bg-Secondary text-white rounded-xl font-bold text-[14px] flex items-center gap-2 hover:bg-Secondary/90 transition-all shadow-md"
            >
              <Plus size={18} /> Add Note
            </button>
          </div>
          <div className="w-full h-0.5 bg-Primary mb-8"></div>
          <div className="flex flex-col gap-5">
            {caseNotes.map((note, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-6 rounded-r-[32px] rounded-l-md border-l-4 border-l-Secondary relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-Secondary font-extrabold text-[15px]">{note.author}</span>
                  <span className="text-gray-400 text-[12px] font-bold">{note.date}</span>
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed font-medium">"{note.note}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinic Files */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <div className="mb-4">
            <h3 className="text-2xl font-extrabold text-Third">Clinic Files</h3>
            <p className="text-gray-400 text-sm font-medium mt-0.5">Access files related to this case.</p>
          </div>
          <div className="w-full h-0.5 bg-Primary mb-8"></div>
          <div className="flex flex-col gap-4">
            {clinicFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 rounded-[24px] border border-gray-50 bg-white group hover:bg-[#FAF9F6] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF9F6] group-hover:bg-white rounded-2xl flex items-center justify-center text-Secondary shadow-sm transition-colors">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-Secondary font-extrabold text-[16px]">{file.name}</span>
                    <span className="text-gray-400 text-[12px] font-bold">PDF · Uploaded {file.date}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-Secondary text-Secondary font-bold text-[13px] rounded-xl hover:bg-Secondary hover:text-white transition-all">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs & Bottom Section */}
      <div className="mt-4" ref={sectionRef}>
        {/* Tabs Selection Bar */}
        <div className="flex items-center border-b border-gray-100 mb-8 px-8">
          {['Programs', 'Client Schedule', 'Insurance'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 font-extrabold text-[16px] transition-all relative ${
                activeTab === tab 
                ? 'text-Secondary border-b-4 border-Secondary translate-y-[2px]' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                {tab === 'Programs' && <LayoutGrid size={18} />}
                {tab === 'Client Schedule' && <Clock size={18} />}
                {tab === 'Insurance' && <ShieldCheck size={18} />}
                {tab}
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'Client Schedule' && (
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 animate-in fade-in duration-500">
             <div className="flex items-center justify-between mb-8">
                 <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                     <button className="p-2.5 hover:bg-gray-50 text-Secondary"><ChevronLeft size={18} /></button>
                     <div className="px-5 py-2.5 font-bold text-Secondary text-[14px] border-x border-gray-100">March 2026</div>
                     <button className="p-2.5 hover:bg-gray-50 text-Secondary"><ChevronRight size={18} /></button>
                 </div>
                 <button className="px-6 py-2.5 bg-[#FAF9F6] text-Secondary font-bold text-[14px] rounded-xl">Weekly View</button>
             </div>
             <div className="grid grid-cols-7 gap-3">
                {weeklySchedule.map((day, idx) => (
                  <div key={idx} className="flex flex-col gap-3 min-w-[130px]">
                     <div className={`p-4 text-center rounded-t-2xl border-b-2 flex flex-col gap-1 ${day.session?.isActiveDay ? 'bg-Primary border-Secondary/30' : 'bg-[#F2F2F2] border-transparent'}`}>
                        <span className={`text-[12px] font-bold ${day.session?.isActiveDay ? 'text-Secondary' : 'text-gray-500'}`}>{day.day}</span>
                        <span className={`text-2xl font-extrabold ${day.session?.isActiveDay ? 'text-Secondary' : 'text-Secondary/70'}`}>{day.date}</span>
                     </div>
                     {day.session ? (
                        <div className="bg-[#FAF9F6] border border-gray-100 rounded-[28px] p-4 flex flex-col gap-3">
                           <h4 className="font-bold text-Third text-[14px] truncate">{day.session.client}</h4>
                           <span className="text-blue-400 font-bold text-[10px]">{day.session.status}</span>
                           <div className="flex flex-col gap-2 text-[11px] font-bold text-gray-500">
                              <span className="flex items-center gap-1.5"><Clock size={12}/> {day.session.time}</span>
                              <span className="px-3 py-1 bg-white border border-Secondary/10 text-Secondary rounded-full w-fit">{day.session.type}</span>
                              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-Primary"/> {day.session.room}</span>
                           </div>
                           <button className={`w-full py-2.5 rounded-xl text-[13px] font-bold ${day.session.isActiveDay ? 'bg-Primary text-Secondary' : 'bg-white border border-gray-100 text-gray-300'}`}>Clock In</button>
                        </div>
                     ) : (
                        <div className="h-[200px] border border-dashed border-gray-100 rounded-[28px] bg-gray-50/20"></div>
                     )}
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'Insurance' && (
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 animate-in fade-in zoom-in duration-500 text-left">
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-Third flex items-center gap-2">
                Insurance <span className="text-gray-400 text-sm font-normal">(only visible to admin)</span>
              </h3>
              <div className="w-full h-0.5 bg-Primary mt-4"></div>
            </div>

            {/* Insurance Summary Card */}
            <div className="bg-Secondary rounded-[28px] p-8 text-white flex justify-between items-center mb-10">
              <div>
                 <p className="text-Primary font-bold text-[13px] uppercase tracking-wider mb-1">Insurance Provider</p>
                 <h2 className="text-3xl font-extrabold mb-1">Aetna</h2>
                 <p className="text-white/70 text-[13px] font-bold">Member ID: M-2024-4421 · Auth: #C8812945</p>
              </div>
              <div className="text-right">
                 <p className="text-Primary font-bold text-[13px] uppercase tracking-wider mb-1">Expires</p>
                 <h2 className="text-3xl font-extrabold mb-1">August 31</h2>
                 <p className="text-white/70 text-[13px] font-bold">177 days remaining</p>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {insuranceDetails.map((item, idx) => (
                <div key={idx} className="bg-[#FCFAF4] p-5 rounded-[24px] border border-[#F5F1E8] flex flex-col gap-1 text-left">
                   <span className="text-gray-400 text-[11px] font-bold uppercase leading-tight">{item.label}</span>
                   <span className="text-Secondary font-extrabold text-[15px]">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Authorized Units */}
            <div className="mb-10 text-left">
               <h4 className="text-xl font-extrabold text-Third mb-6 border-b-2 border-Primary w-fit pb-1">Authorized Units</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Total Approved", val: "240", color: "text-Secondary" },
                    { label: "Units Used", val: "68", color: "text-Secondary" },
                    { label: "Remaining", val: "172", color: "text-Secondary" }
                  ].map((u, i) => (
                     <div key={i} className="bg-white border border-gray-100 rounded-[28px] p-8 text-center flex flex-col justify-center gap-2 hover:shadow-md transition-shadow">
                        <span className={`text-4xl font-extrabold ${u.color}`}>{u.val}</span>
                        <span className="text-gray-400 font-bold text-[13px]">{u.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* CPT Codes */}
            <div className="mb-10 text-left">
               <h4 className="text-xl font-extrabold text-Third mb-6 border-b-2 border-Primary w-fit pb-1">Authorized CPT Codes</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {cptCodes.map((code, i) => (
                     <div key={i} className="bg-white border border-gray-100 rounded-[28px] p-8 flex gap-5 hover:shadow-md transition-shadow text-left">
                        <div className="w-14 h-14 bg-[#FCFAF4] rounded-2xl flex items-center justify-center text-Secondary flex-shrink-0 shadow-sm border border-[#F5F1E8]">
                           <Calendar size={24} strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-2">
                           <h2 className="text-4xl font-extrabold text-Secondary tracking-tighter">{code.code}</h2>
                           <h5 className="font-extrabold text-Secondary text-[16px]">{code.title}</h5>
                           <p className="text-gray-400 text-[13px] font-medium leading-relaxed">{code.desc}</p>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="px-4 py-1.5 bg-[#FAF6F7] border border-Secondary/10 text-Secondary rounded-full text-[11px] font-bold italic">{code.units}</span>
                              <span className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E5F9ED] text-[#1EB15D] rounded-full text-[11px] font-bold">
                                 <span className="w-1.5 h-1.5 bg-[#1EB15D] rounded-full"></span> {code.status}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               {/* Info Alert */}
               <div className="bg-[#FFFBF3] border border-Primary/30 rounded-2xl p-6 flex items-start gap-4">
                  <Info size={20} className="text-Secondary/60 mt-0.5" />
                  <p className="text-Secondary/60 text-[13px] font-bold leading-relaxed italic text-left">
                    Authorization details are managed by administration. Contact your supervisor or billing team if you notice any discrepancies or if the authorization is approaching its expiration date.
                  </p>
               </div>
            </div>

            {/* History Table */}
            <div className="text-left">
               <h4 className="text-xl font-extrabold text-Third mb-6 border-b-2 border-Primary w-fit pb-1">Authorization History</h4>
               <div className="overflow-hidden rounded-[24px] border border-gray-100">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-[#F2F2F2]">
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">Auth Number</th>
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">Start Date</th>
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">End Date</th>
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">CPT Codes</th>
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">Total Units</th>
                           <th className="py-4 px-6 text-[13px] font-extrabold text-Third">Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {authHistory.map((h, i) => (
                           <tr key={i} className="border-t border-gray-50 hover:bg-[#FCFAF4] transition-colors">
                              <td className="py-5 px-6 font-extrabold text-Secondary text-[14px]">{h.number}</td>
                              <td className="py-5 px-6 font-bold text-gray-500 text-[14px]">{h.start}</td>
                              <td className="py-5 px-6 font-bold text-gray-500 text-[14px]">{h.end}</td>
                              <td className="py-5 px-6 font-bold text-gray-500 text-[14px]">{h.codes}</td>
                              <td className="py-5 px-6 font-bold text-gray-500 text-[14px]">{h.units}</td>
                              <td className="py-5 px-6">
                                 <span className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold ${
                                    h.status === 'Active' ? 'bg-[#E5F9ED] text-[#1EB15D]' : 'bg-[#FFE9E9] text-Secondary'
                                 }`}>
                                    {h.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Note Modal */}
      <Dialog open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
        <DialogContent className="max-w-[700px] p-8 rounded-[32px]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-extrabold text-Third">Add Case Note</h2>
              <button onClick={() => setIsNoteModalOpen(false)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-red-500">
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-0.5 bg-Primary"></div>
            <textarea placeholder="Write a session note..." className="w-full h-[180px] bg-[#F4F4F4] rounded-[16px] p-4 text-[14px] outline-none border border-transparent focus:border-Primary"></textarea>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsNoteModalOpen(false)} className="px-8 py-3.5 bg-Primary text-Secondary font-bold rounded-2xl">Cancel</button>
              <button onClick={() => setIsNoteModalOpen(false)} className="px-8 py-3.5 bg-Secondary text-white font-bold rounded-2xl">Save & Submit</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Member Modal */}
      <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
        <DialogContent className="max-w-[650px] p-10 rounded-[40px]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-3xl font-extrabold text-Third">Team Member Details</h2>
                <p className="text-gray-400 font-bold text-[14px] mt-1">{selectedMember?.dateRange}</p>
              </div>
              <button 
                onClick={() => setIsTeamModalOpen(false)} 
                className="w-12 h-12 rounded-full border-2 border-[#D94F4F] flex items-center justify-center text-[#D94F4F] hover:bg-[#D94F4F] hover:text-white transition-all shadow-sm group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="w-full h-0.5 bg-Primary"></div>

            <div className="bg-[#FCFAF4] border border-[#F5F1E8] rounded-[32px] p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col gap-1.5 min-h-[100px] justify-center">
                   <span className="text-Third/40 font-bold text-[11px] uppercase tracking-wide">Full Name</span>
                   <span className="text-Secondary font-extrabold text-[16px]">{selectedMember?.name}</span>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col gap-1.5 min-h-[100px] justify-center">
                   <span className="text-Third/40 font-bold text-[11px] uppercase tracking-wide">Role</span>
                   <span className="text-Secondary font-extrabold text-[16px]">{selectedMember?.role}</span>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col gap-1.5 min-h-[100px] justify-center">
                   <span className="text-Third/40 font-bold text-[11px] uppercase tracking-wide">Phone Number</span>
                   <span className="text-Secondary font-extrabold text-[16px]">{selectedMember?.phone}</span>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col gap-1.5 min-h-[100px] justify-center">
                   <span className="text-Third/40 font-bold text-[11px] uppercase tracking-wide">Email Address</span>
                   <span className="text-Secondary font-extrabold text-[16px] truncate">{selectedMember?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetails;
