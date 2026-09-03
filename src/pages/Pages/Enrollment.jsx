import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import EnrollmentInfo from '@/components/EnrollmentComponents/EnrollmentInfo'
import EnrollmentForm from '@/components/EnrollmentComponents/EnrollmentForm'
import React from 'react'
import useClient from "@/hooks/useClient";

const Enrollment = () => {
  const { data, isLoading } = useClient({
    queryKey: ["enrollmentdata"],
    url: "/cms/enrollment",
  });

  const content = data?.data?.content;

  return (
    <div>
      <CommonBanner 
        link="Enrollment"
        title={content?.hero?.title || "Start the Enrollment Process"}
        subtitle={content?.hero?.subtitle || "Complete the form below to begin services. Once submitted, your form will be forwarded securely to our administrative team."}
      />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[450px] py-20 bg-[#FFFBF3]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Enrollment...</p>
        </div>
      ) : (
        <>
          <EnrollmentInfo data={content} />
          <EnrollmentForm />
          <JoinOurMailingList/>
        </>
      )}
    </div>
  );
};

export default Enrollment;
