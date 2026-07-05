import CommonBanner from '@/components/common/CommonBanner'
import JoinOurMailingList from '@/components/common/JoinOurMailingList'
import ContactInfo from '@/components/ContactComponents/ContactInfo'
import ContactForm from '@/components/ContactComponents/ContactForm'
import React from 'react'
import useClient from "@/hooks/useClient";

const Contact = () => {
  const { data, isLoading } = useClient({
    queryKey: ["contactdata"],
    url: "/cms/contact",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF3]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Contact...</p>
      </div>
    );
  }

  const content = data?.data?.content;

  return (
    <div>
      <CommonBanner
        link="Contact"
        title={content?.hero?.title || "Have Questions? We're Here to Help."}
        subtitle={content?.hero?.subtitle || "If you have questions about our ABA programs or insurance coverage, send us a message and we'll respond as soon as possible."}
      />
      <ContactInfo data={content?.contact_info} />
      <ContactForm />
      <JoinOurMailingList/>
    </div>
  )
}

export default Contact
