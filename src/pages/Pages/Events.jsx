import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import EventsList from '@/components/EventComponents/EventsList'
import React from 'react'

const Events = () => {
  return (
 <div>
  <CommonBanner
    link="Events"
    title="Community Events"
    subtitle="Stay connected with workshops, family events, and professional development opportunities hosted by Overcomers ABA Services."
  />
  <EventsList />
  <JoinOurMailingList/>
 </div>
  )
}

export default Events
