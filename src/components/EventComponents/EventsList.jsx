import React from 'react';
import { MapPin } from 'lucide-react';

const eventsData = [
  {
    dateStr: '15',
    monthStr: 'Mar',
    category: 'Free Workshop',
    title: "Understanding ABA: A Parent's Guide",
    description: 'Join our BCBAs for a free informational workshop on what ABA therapy is, how it works, and what to expect during the treatment process.',
    location: 'Virtual - Zoom',
    time: '10:00 AM EST'
  },
  {
    dateStr: '22',
    monthStr: 'Mar',
    category: 'Family Event',
    title: 'Spring Family Resource Fair',
    description: 'Connect with local resources, meet our clinical team, and explore services available to families in Union and Essex County.',
    location: 'Union County, NJ',
    time: '11:00 AM - 2:00 PM EST'
  }
];

const EventsList = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x section-padding-y">
      <div className=" flex flex-col gap-8">
        
        {eventsData.map((evt, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[6px] border-[#AD3946] p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Date Box */}
            <div className="w-[85px] h-[85px] rounded-[16px] bg-[#76121F] flex flex-col items-center justify-center shrink-0">
              <span className="text-Primary font-bold text-[30px] leading-tight">{evt.dateStr}</span>
              <span className="text-Primary text-[15px] font-medium leading-tight">{evt.monthStr}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 items-start">
              <div className="inline-block mb-3 border-b-[3px] border-Primary pb-1">
                <span className="text-[#3A331E] font-bold text-[14px] md:text-[15px] uppercase tracking-wide">
                  {evt.category}
                </span>
              </div>
              
              <h3 className="text-[#76121F] text-[22px] md:text-[26px] font-bold mb-3 leading-snug">
                {evt.title}
              </h3>
              
              <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed mb-5">
                {evt.description}
              </p>

              <div className="flex items-center text-gray-500 text-[14px]">
                <MapPin size={16} className="text-[#AD3946] mr-2" strokeWidth={2.5} />
                <span>{evt.location} &nbsp;&middot;&nbsp; {evt.time}</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default EventsList;
