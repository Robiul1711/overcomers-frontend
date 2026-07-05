import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ServicesList from '@/components/ServiceComponents/ServicesList'
import React from 'react'
import useClient from "@/hooks/useClient";

const Services = () => {
  const { data, isLoading } = useClient({
    queryKey: ["servicesdata"],
    url: "/cms/services",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF3]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Services...</p>
      </div>
    );
  }

  const content = data?.data?.content;

  return (
    <div className="">
      <CommonBanner 
        link="Services"
        title={content?.hero?.title || "Our ABA Therapy Service"}
        subtitle={content?.hero?.subtitle || "Applied Behavior Analysis (ABA) is a scientific approach that uses behavioral principles to produce meaningful, measurable change in the lives of children and their families."}
      />
      <ServicesList data={content?.services} />
      <JoinOurMailingList />
    </div>
  )
}

export default Services
