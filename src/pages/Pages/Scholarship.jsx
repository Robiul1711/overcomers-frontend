import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ScholarshipInfo from '@/components/ScholarshipComponents/ScholarshipInfo'
import ScholarshipForm from '@/components/ScholarshipComponents/ScholarshipForm'
import React from 'react'

const Scholarship = () => {
  return (
<div>
  <CommonBanner
    link="Scholarship"
    title="Overcomer Scholarship Program"
    subtitle="Our scholarship program supports individuals who demonstrate resilience, leadership, and commitment to personal and professional growth."
  />
  <ScholarshipInfo />
  <ScholarshipForm />
  <JoinOurMailingList />
</div>
  )
}

export default Scholarship
