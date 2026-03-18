import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const contactDetails = [
  {
    icon: Phone,
    title: 'Phone',
    desc: '908-342-7584',
  },
  {
    icon: Mail,
    title: 'Email',
    desc: 'info@overcomersaba.com.',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    desc: 'Monday – Friday\n8:00 AM – 5:00 PM',
  },
  {
    icon: MapPin,
    title: 'Service Area',
    desc: 'New Jersey, United States',
  }
];

const ContactInfo = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x pt-16 md:pt-24 pb-8 flex justify-center">
      <div className="w-full border border-[#AD3946]/30 bg-transparent rounded-[12px] p-8 md:p-12 flex flex-col items-start text-left">
        <h4 className="text-[#3A331E] font-semibold text-[14px] uppercase tracking-[0.1em] border-b-[3px] border-Primary pb-1 mb-4 inline-block">
          Get in Touch
        </h4>
        <h2 className="text-[#76121F] text-[32px] md:text-[40px] font-bold mb-10">
          We're here to support
        </h2>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8 md:gap-4">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={idx}>
                <div className="flex items-start gap-4">
                  <div className="w-[36px] h-[36px] rounded-[8px] bg-[#76121F] text-white flex items-center justify-center shrink-0 mt-1">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#3A331E] font-bold text-[15px]">{item.title}</span>
                    <span className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-line mt-1">
                      {item.desc}
                    </span>
                  </div>
                </div>
                {/* Divider for desktop */}
                {idx < contactDetails.length - 1 && (
                  <div className="hidden md:block w-[1px] h-12 bg-[#AD3946]/30"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
