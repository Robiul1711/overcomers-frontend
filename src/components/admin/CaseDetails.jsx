import React, { useState } from "react";
import { User, Calendar, Layers, FileText, ShieldCheck } from "lucide-react";

// Sub-components
import HeroSection from "./CaseDetailComponents/HeroSection";
import ProfileTab from "./CaseDetailComponents/ProfileTab";
import ProgramsTab from "./CaseDetailComponents/ProgramsTab";
import ScheduleTab from "./CaseDetailComponents/ScheduleTab";
import InsuranceTab from "./CaseDetailComponents/InsuranceTab";
import NotesReportsTab from "./CaseDetailComponents/NotesReportsTab";

// Modals
import NoteModal from "./CaseDetailComponents/Modals/NoteModal";
import TeamMemberModal from "./CaseDetailComponents/Modals/TeamMemberModal";
import ClientDetailModal from "./CaseDetailComponents/Modals/ClientDetailModal";
import AddReportModal from "./CaseDetailComponents/Modals/AddReportModal";
import useClient from "@/hooks/useClient";
import { useParams } from "react-router-dom";

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [clinicalProgramId, setClinicalProgramId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const sectionRef = React.useRef(null);
  const id = useParams().id;

  const { data, isLoading, isError } = useClient({
    queryKey: ["employeeCaseDetails", id],
    url: `/employee/cases/${id}`,
  });
  const { data: notesData, isLoading: notesLoading, isError: notesIsError } = useClient({
    queryKey: ["employeeCaseNotes", id],
    url: `/employee/cases/${id}/notes`,
  });
  // console.log(notesData?.data)

  const dataCasted = data?.data;


  const { data: programsData, isLoading: programsLoading, isError: programsIsError } = useClient({
    queryKey: ["employeeCasePrograms"],
    url: `/employee/cases/${id}/programs`,
  })
  // console.log(programsData)


  const { data: reportData, isLoading: reportLoading, isError: reportIsError } = useClient({
    queryKey: ["employeeCaseReports"],
    url: `/employee/cases/${id}/reports`,
  })
  const { data: taskPerformanceData, isLoading: taskPerformanceLoading, isError: taskPerformanceIsError } = useClient({
    queryKey: ["employeeCaseTaskPerformance"],
    url: `/employee/cases/${id}/task-performance`,
  })
// console.log(reportData)




  const insuranceDetails = [
    { label: "Authorization Number", value: "C8812945" },
    { label: "Insurance Provider", value: "Aetna" },
    { label: "Member ID", value: "M-2024-4421" },
    { label: "Plan / Policy Number", value: "AET-78902-NJ" },
    { label: "Authorization Start Date", value: "March 1, 2026" },
    { label: "Authorization End Date", value: "August 31, 2026" },
  ];

  const cptCodes = [
    {
      code: "97153",
      title: "ABA Therapy - Technician",
      desc: "Adaptive behavior treatment by protocol - direct contact, each 15 min",
      units: "160 units auth",
      status: "Active",
    },
    {
      code: "97155",
      title: "ABA Therapy - Supervision",
      desc: "Adaptive behavior treatment with protocol modification - each 15 min",
      units: "80 units auth",
      status: "Active",
    },
  ];

  const authHistory = [
    {
      number: "C8812945",
      start: "March 1, 2026",
      end: "Aug 31, 2026",
      codes: "97153, 97155",
      units: "240 units",
      status: "Active",
    },
    {
      number: "C7701234",
      start: "Sep 1, 2025",
      end: "Feb 28, 2026",
      codes: "97153, 97155",
      units: "200 units",
      status: "Expired",
    },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8  font-poppins ">
      <HeroSection dataCasted={dataCasted} isLoading={isLoading} />

      <div className="mt-4" ref={sectionRef}>
        <div className="flex items-center border-b border-gray-100 mb-4  overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
          <div className="flex items-center min-w-max gap-2">
            {[
              { id: "Profile", label: "Profile", icon: <User size={18} /> },
              {
                id: "Client Schedule",
                label: "Client Schedule",
                icon: <Calendar size={18} />,
              },
              { id: "Programs", label: "Programs", icon: <Layers size={18} /> },
              {
                id: "Notes & Reports",
                label: "Notes & Reports",
                icon: <FileText size={18} />,
              },
              {
                id: "Insurance",
                label: "Insurance",
                icon: <ShieldCheck size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-8 py-4 md:py-5 font-bold text-[14px] md:text-[15px] transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#76121F] border-b-4 border-[#76121F] translate-y-[1px]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="">
          {activeTab === "Profile" && (
            <ProfileTab
              onViewClientDetail={() => setIsClientModalOpen(true)}
             
              dataCasted={dataCasted}
              isLoading={isLoading}
            />
          )}

          {activeTab === "Programs" && (
            <ProgramsTab
              programsDataset={programsData?.data}
              isLoading={programsLoading}
              onAddNote={(programId) => {
                setClinicalProgramId(programId || null);
                setIsNoteModalOpen(true);
              }}
            />
          )}

          {activeTab === "Notes & Reports" && (
            <NotesReportsTab
              onAddNote={() => {
                setClinicalProgramId(null);
                setIsNoteModalOpen(true);
              }}
              notesData={notesData?.data}
              reportData={reportData?.data}
              taskPerformanceData={taskPerformanceData?.data}
              taskPerformanceLoading={taskPerformanceLoading}
              taskPerformanceIsError={taskPerformanceIsError}
              reportLoading={reportLoading}
              reportIsError={reportIsError}
              notesLoading={notesLoading}
              notesIsError={notesIsError}
              onAddReport={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === "Client Schedule" && (
            <ScheduleTab />
          )}

          {activeTab === "Insurance" && (
            <InsuranceTab
              insuranceDetails={insuranceDetails}
              cptCodes={cptCodes}
              authHistory={authHistory}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <NoteModal
        isOpen={isNoteModalOpen}
        clinicalProgramId={clinicalProgramId}
        caseId={id}
        onClose={() => {
          setIsNoteModalOpen(false);
          setClinicalProgramId(null);
        }}
      />

      <AddReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        caseId={id}
      />

      <TeamMemberModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        selectedMember={selectedMember}
      />

      <ClientDetailModal
        dataCasted={dataCasted}
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
    </div>
  );
};

export default CaseDetails;
