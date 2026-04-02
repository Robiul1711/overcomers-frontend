import React, { useState } from 'react';
import { LayoutGrid, Clock, ShieldCheck } from 'lucide-react';

// Sub-components
import HeroSection from './CaseDetailComponents/HeroSection';
import ClientInfoSection from './CaseDetailComponents/ClientInfoSection';
import ServiceDetailsSection from './CaseDetailComponents/ServiceDetailsSection';
import ProgramsTab from './CaseDetailComponents/ProgramsTab';
import ScheduleTab from './CaseDetailComponents/ScheduleTab';
import InsuranceTab from './CaseDetailComponents/InsuranceTab';
import CaseNotesSection from './CaseDetailComponents/CaseNotesSection';
import ClinicFilesSection from './CaseDetailComponents/ClinicFilesSection';

// Modals
import NoteModal from './CaseDetailComponents/Modals/NoteModal';
import ProgramDetailModal from './CaseDetailComponents/Modals/ProgramDetailModal';
import TeamMemberModal from './CaseDetailComponents/Modals/TeamMemberModal';

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState('Programs');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programsDataset = [
    {
      id: 1,
      title: "Communication Skills Development",
      category: "Communication",
      description: "Helps improve verbal and non-verbal communication skills through structured activities. This comprehensive program includes evidence-based strategies and structured interventions designed to support skill development and track progress over time. The program follows ABA principles and is suitable for individualized treatment plans.",
      level: "Beginner",
      type: "Skill Acquisition",
      tasks: [
        "Responds to name when called",
        "Uses simple phrases to communicate needs",
        "Follows one-step instructions consistently",
        "Makes eye contact during interactions",
        "Initiates conversations with peers",
        "Uses appropriate greetings"
      ],
      createdBy: "Dr. Eleanor Pena, BCBA",
      lastUpdated: "March 30, 2026"
    },
    {
      id: 2,
      title: "Social Interaction Fundamentals",
      category: "Social Skills",
      description: "Helps improve verbal and non-verbal communication skills through structured activities. Focuses on developing fundamental social interaction skills, including turn-taking, sharing, and group participation.",
      level: "Beginner",
      type: "Skill Acquisition",
      tasks: ["Turn-taking during play", "Sharing toys with peers", "Joining group activities", "Maintaining personal space"],
      createdBy: "Dr. Eleanor Pena, BCBA",
      lastUpdated: "March 25, 2026"
    },
    {
      id: 3,
      title: "Emotion Recognition & Regulation",
      category: "Social Skills",
      description: "Helps improve verbal and non-verbal communication skills through structured activities. Aims to help clients identify different emotions in themselves and others, and learn appropriate regulation strategies.",
      level: "Beginner",
      type: "Skill Acquisition",
      tasks: ["Identifying happy/sad faces", "Using cool-down strategies", "Labeling own emotions", "Recognizing facial expressions"],
      createdBy: "Dr. Eleanor Pena, BCBA",
      lastUpdated: "March 28, 2026"
    }
  ];

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

  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    setIsProgramModalOpen(true);
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
    <div className="flex flex-col gap-6 md:gap-8 pb-10 font-poppins ">
      <HeroSection onScrollToContent={scrollToContent} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 ">
        <ClientInfoSection clientInfo={clientInfo} />
        <ServiceDetailsSection serviceDetails={serviceDetails} onViewMember={handleViewMember} />
      </div>

      <div className="mt-4" ref={sectionRef}>
        <div className="flex items-center border-b border-gray-100 mb-8 px-4 md:px-8 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
          <div className="flex items-center min-w-max">
            {['Programs', 'Client Schedule', 'Insurance'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-8 py-4 md:py-5 font-extrabold text-[14px] md:text-[16px] transition-all relative whitespace-nowrap ${
                  activeTab === tab 
                  ? 'text-Secondary border-b-4 border-Secondary translate-y-[1px]' 
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
        </div>

        <div className="">
          {activeTab === 'Programs' && (
            <ProgramsTab programsDataset={programsDataset} onViewDetails={handleViewProgram} />
          )}
          {activeTab === 'Client Schedule' && (
            <ScheduleTab weeklySchedule={weeklySchedule} />
          )}

          {activeTab === 'Insurance' && (
            <InsuranceTab 
              insuranceDetails={insuranceDetails} 
              cptCodes={cptCodes} 
              authHistory={authHistory} 
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <CaseNotesSection caseNotes={caseNotes} onAddNote={() => setIsNoteModalOpen(true)} />
        <ClinicFilesSection clinicFiles={clinicFiles} />
      </div>

      {/* Modals */}
      <NoteModal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)} 
      />
      
      <ProgramDetailModal 
        isOpen={isProgramModalOpen} 
        onClose={() => setIsProgramModalOpen(false)} 
        selectedProgram={selectedProgram} 
      />
      
      <TeamMemberModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
        selectedMember={selectedMember} 
      />
    </div>
  );
};

export default CaseDetails;

