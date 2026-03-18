import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ContactInfo from '@/components/ContactComponents/ContactInfo'
import ContactForm from '@/components/ContactComponents/ContactForm'
import React from 'react'

const Contact = () => {
  return (
<div>
  <CommonBanner
    link="Contact"
    title="Have Questions? We're Here to Help."
    subtitle="If you have questions about our ABA programs or insurance coverage, send us a message and we'll respond as soon as possible."
  />
  <ContactInfo />
  <ContactForm />
  <JoinOurMailingList/>
</div>
  )
}

export default Contact
