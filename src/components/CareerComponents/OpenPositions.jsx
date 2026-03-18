import React from 'react';

const positions = [
  'BCBA', 'BCaBA', 'RBT', 'ABA Therapist', 'Lead Behavior Specialist'
];

const OpenPositions = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x pt-16 md:pt-24 pb-8 flex justify-center">
      <div className="w-full border border-[#AD3946]/30 bg-transparent rounded-[12px] p-8 md:p-12 lg:p-16 flex flex-col items-start text-left">
        <h4 className="text-[#3A331E] font-semibold text-[14px] uppercase tracking-[0.15em] border-b-[3px] border-Primary pb-1 mb-4 inline-block">
          Open Positions
        </h4>
        <h2 className="text-[#76121F] text-[32px] md:text-[40px] font-bold mb-8">
          We Are Hiring
        </h2>
        <div className="flex flex-wrap items-center gap-4 w-full">
          {positions.map((pos, idx) => (
            <div 
              key={idx} 
              className="bg-white text-[#76121F] font-bold text-[14px] md:text-[15px] px-8 md:px-10 py-3.5 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-md transition-shadow"
            >
              {pos}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenPositions;
