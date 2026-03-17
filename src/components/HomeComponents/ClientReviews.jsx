import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const reviews = [
  {
    id: 1,
    name: "Constance Akhimien",
    time: "2 years ago",
    content: "Hands down the best ABA agency I've worked with for my kiddos! Overcomers' dedication and commitment shine through in every aspect. Their BCBAs, like Jessica, are passionate about helping children reach their full potential. The RBTs are knowledgeable, caring, and genuinely invested in the kids' growth. Special shoutout to Stephanie for exceptional support behind the scenes! I'm forever grateful and highly recommend Overcomers to any family seeking top-notch ABA services 💕💙",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    time: "1 year ago",
    content: "We have had a wonderful experience with Overcomers. The therapists are so patient and truly care about my son's progress. Communication with the team is excellent, and we've seen remarkable improvements in his daily living skills and communication. I highly recommend their in-home ABA services!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Thompson",
    time: "8 months ago",
    content: "The support our family has received from Overcomers has been incredible. Not only do they provide excellent therapy for our daughter, but their parent training sessions have empowered us with strategies we can use every day. Very grateful for this amazing team of professionals.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  }
];

const ClientReviews = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  return (
    <div className="w-full bg-[#FFFBF3] section-padding-x section-padding-y flex flex-col items-center">
      <div className="flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h3 className="text-Third font-bold text-[15px] tracking-[2px] uppercase mb-3 relative inline-block">
            Client Reviews
            <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-Primary rounded-full"></span>
          </h3>
          <h2 className="text-[32px] md:text-[42px] font-bold text-Secondary mt-2">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[900px] flex items-center justify-center mb-16 px-12 sm:px-20">
          
          {/* Custom Prev Button */}
          <button 
            className={`absolute left-0 z-10 w-[46px] h-[46px] rounded-full flex items-center justify-center transition-colors shadow-sm ${
              isBeginning 
                ? 'bg-[#F4F4F4] text-gray-400 cursor-not-allowed' 
                : 'bg-Secondary text-Primary hover:bg-Secondary/90'
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="w-full max-w-[650px]"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="py-4">
                <div className="bg-white rounded-[16px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col transition-all">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col">
                      <h4 className="text-Third font-bold text-[16px] md:text-[18px]">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-Primary fill-Primary" />
                          ))}
                        </div>
                        <span className="text-gray-500 text-[13px]">{review.time}</span>
                      </div>
                    </div>
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#F4F4F4] shrink-0 ml-4"
                    />
                  </div>

                  {/* Card Content */}
                  <p className="text-gray-600 text-[14px] leading-[1.8] flex-grow">
                    {review.content}
                  </p>

                  <div className="mt-6">
                    <button className="text-Secondary font-medium text-[13px] hover:underline underline-offset-4 decoration-Secondary/30">
                      Read full review
                    </button>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Next Button */}
          <button 
            className={`absolute right-0 z-10 w-[46px] h-[46px] rounded-full flex items-center justify-center transition-colors shadow-sm ${
              isEnd 
                ? 'bg-[#F4F4F4] text-gray-400 cursor-not-allowed' 
                : 'bg-[#F4F4F4] hover:bg-[#E8E8E8] text-Third'
            }`}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
          
        </div>

        {/* Bottom CTA */}
        <button className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors shadow-sm">
          Enroll A Child <ArrowUpRight size={18} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
};

export default ClientReviews;