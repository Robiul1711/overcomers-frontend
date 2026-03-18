import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { num: '01', title: 'Enrollment Application Submission' },
  { num: '02', title: 'We Review & Get in Touch' },
  { num: '03', title: 'Await Approvals' },
  { num: '04', title: 'Conduct Initial Assessment & Treatment Plan' },
  { 
    num: '05', 
    title: 'Services Begin', 
    desc: 'We match your child with the right therapist and services begin based on the approved treatment plan and schedule.' 
  },
];

const documents = [
  'Front & Back Of Insurance Card',
  'Neurological Report / Proof Of Diagnosis',
  'ABA Referral From Physician'
];

const EnrollmentInfo = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x section-padding-y">
      <div className="border border-[#AD3946]/30 rounded-[12px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-24 relative bg-transparent">
        
        {/* Left Column - How It Works */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[#76121F] text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-8">
            How It Works
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-[34px] h-[34px] rounded-full bg-[#76121F] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {step.num}
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[#3A331E] font-bold text-[15px] md:text-[16px]">
                    {step.title}
                  </span>
                  {step.desc && (
                    <p className="text-gray-500 text-[14px] leading-relaxed mt-1.5 max-w-[400px]">
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical/Horizontal Divider */}
        <div className="w-full h-[1px] md:w-[1px] md:h-auto bg-gray-300 md:self-stretch opacity-50"></div>

        {/* Right Column - Required Documents */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[#76121F] text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-8">
            Required Documents
          </h2>
          <div className="flex flex-col gap-6">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-[5px] bg-[#76121F] text-white flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[#3A331E] font-semibold text-[15px] md:text-[16px]">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnrollmentInfo;
