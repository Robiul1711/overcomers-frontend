import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import OpenPositions from '@/components/CareerComponents/OpenPositions'
import ApplicationForm from '@/components/CareerComponents/ApplicationForm'
import React from 'react'

const Careers = () => {
  return (
    <div>
      <CommonBanner
        link="Careers"
        title="Join Our Growing Team"
        subtitle="Looking for a rewarding career where you can make a meaningful difference? Overcomers ABA is hiring passionate professionals."
      />
      <OpenPositions />
      <ApplicationForm />
      <JoinOurMailingList/>
    </div>
  )
}

export default Careers
