import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import EventsList from '@/components/EventComponents/EventsList'
import React from 'react'
import useClient from "@/hooks/useClient";

const Events = () => {
  const { data, isLoading } = useClient({
    queryKey: ["eventsdata"],
    url: "/cms/events",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF3]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Events...</p>
      </div>
    );
  }

  const content = data?.data?.content;

  return (
    <div>
      <CommonBanner
        link="Events"
        title="Community Events"
        subtitle="Stay connected with workshops, family events, and professional development opportunities hosted by Overcomers ABA Services."
      />
      <EventsList data={content?.events_list} />
      <JoinOurMailingList/>
    </div>
  )
}

export default Events
