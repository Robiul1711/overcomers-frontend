import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ScholarshipInfo from '@/components/ScholarshipComponents/ScholarshipInfo'
import ScholarshipForm from '@/components/ScholarshipComponents/ScholarshipForm'
import React from 'react'
import useClient from "@/hooks/useClient";

const Scholarship = () => {
  const { data, isLoading } = useClient({
    queryKey: ["scholarshipdata"],
    url: "/cms/scholarship",
  });

  const content = data?.data?.content;

  return (
    <div>
      <CommonBanner
        link="Scholarship"
        title={content?.hero?.title || "Overcomer Scholarship Program"}
        subtitle={content?.hero?.subtitle || "Our scholarship program supports individuals who demonstrate resilience, leadership, and commitment to personal and professional growth."}
      />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[450px] py-20 bg-[#FFFBF3]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Scholarship...</p>
        </div>
      ) : (
        <>
          <ScholarshipInfo data={content} />
          <ScholarshipForm />
          <JoinOurMailingList />
        </>
      )}
    </div>
  );
};

export default Scholarship;
