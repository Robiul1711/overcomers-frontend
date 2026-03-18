import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import EnrollmentInfo from '@/components/EnrollmentComponents/EnrollmentInfo'
import EnrollmentForm from '@/components/EnrollmentComponents/EnrollmentForm'
import React from 'react'

const Enrollment = () => {
  return (
    <div >
      <CommonBanner 
        link="Enrollment"
        title="Start the Enrollment Process"
        subtitle="Complete the form below to begin services. Once submitted, your form will be forwarded securely to our administrative team."
      />
      <EnrollmentInfo />
      <EnrollmentForm />
      <JoinOurMailingList/>
    </div>
  )
}

export default Enrollment
