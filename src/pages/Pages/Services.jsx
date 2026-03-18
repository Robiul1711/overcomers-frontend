import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ServicesList from '@/components/ServiceComponents/ServicesList'
import React from 'react'

const Services = () => {
  return (
    <div className="">
      <CommonBanner 
        link="Services"
        title="Our ABA Therapy Service"
        subtitle="Applied Behavior Analysis (ABA) is a scientific approach that uses behavioral principles to produce meaningful, measurable change in the lives of children and their families."
      />
      <ServicesList />
      <JoinOurMailingList />
    </div>
  )
}

export default Services
