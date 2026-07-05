
import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import OpenPositions from '@/components/CareerComponents/OpenPositions'
import ApplicationForm from '@/components/CareerComponents/ApplicationForm'
import React from 'react'
import useClient from "@/hooks/useClient";

const Careers = () => {
  const { data, isLoading } = useClient({
    queryKey: ["careersdata"],
    url: "/cms/careers",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF3]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Careers...</p>
      </div>
    );
  }

  const content = data?.data?.content;

  return (
    <div>
      <CommonBanner
        link="Careers"
        title={content?.hero?.title || "Join Our Growing Team"}
        subtitle={content?.hero?.subtitle || "Looking for a rewarding career where you can make a meaningful difference? Overcomers ABA is hiring passionate professionals."}
      />
      <OpenPositions />
      <ApplicationForm />
      <JoinOurMailingList/>
    </div>
  )
}

export default Careers
