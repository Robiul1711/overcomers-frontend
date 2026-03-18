import React from "react";
import { Check } from "lucide-react";

const whoCanApply = [
  "Demonstrate strong personal character and perseverance",
  "Be committed to personal growth and leadership",
  "Be enrolled in or planning to enroll in an educational or training program",
];

const howToApply = [
  "Complete The Application",
  "Submit Documents",
  "Committee Review",
  "Selected Recipients Are Notified By Email",
];

const ScholarshipInfo = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x py-16 md:py-24 flex flex-col gap-8 items-center">
      {/* Top Box: What the Scholarship Includes */}
      <div className="w-full border border-[#AD3946]/30 bg-transparent rounded-[12px] p-8 md:p-12 lg:p-16 flex flex-col items-start text-left">
        <h4 className="text-[#3A331E] font-semibold text-[14px] md:text-[15px] uppercase tracking-[0.1em] border-b-[3px] border-Primary pb-1 mb-4 inline-block">
          About the Scholarship
        </h4>
        <h2 className="text-[#76121F] text-[28px] md:text-[36px] lg:text-[40px] font-bold mb-8">
          What the Scholarship Includes
        </h2>
        <div className="flex flex-wrap items-center gap-4 w-full">
          <div className="bg-white text-[#76121F] font-bold text-[14px] md:text-[15px] px-8 md:px-10 py-3.5 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
            Financial Assistance
          </div>
          <div className="bg-white text-[#76121F] font-bold text-[14px] md:text-[15px] px-8 md:px-10 py-3.5 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
            Scholar Recognition
          </div>
        </div>
      </div>

      {/* Bottom Box: Who/How to Apply */}
      <div className="w-full border border-[#AD3946]/30 bg-transparent rounded-[12px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-24 relative">
        {/* Left Column - Who Can Apply */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[#76121F] text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-8">
            Who Can Apply
          </h2>
          <div className="flex flex-col gap-6">
            {whoCanApply.map((text, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-[32px] h-[32px] rounded-full bg-[#76121F] text-white flex items-center justify-center font-semibold text-[13px] shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <span className="text-[#3A331E] font-bold text-[14px] md:text-[15px] leading-snug">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical/Horizontal Divider */}
        <div className="w-full h-[1px] md:w-[1px] md:h-auto bg-[#AD3946]/30 md:self-stretch"></div>

        {/* Right Column - How to Apply */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[#76121F] text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-8">
            How to Apply
          </h2>
          <div className="flex flex-col gap-6">
            {howToApply.map((text, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-[5px] bg-[#76121F] text-white flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[#3A331E] font-bold text-[14px] md:text-[15px] leading-snug">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipInfo;
