import { ImageProvider } from '@/utils/ImageProvider'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const Banner = () => {
  return (
    <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img 
        src={ImageProvider.Banner} 
        alt="Banner" 
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      
      {/* Dark Overlay gradient for readability */}
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[850px] mt-16">
        <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-bold text-white leading-[1.15] mb-6">
          Overcomers ABA Services - <br className="hidden md:block"/>
          <span className="text-Primary">Helping children</span> overcome limitations.
        </h1>
        <p className="text-[16px] md:text-[18px] text-white/95 leading-relaxed mb-10 max-w-[700px]">
          At Overcomers ABA Services, we provide compassionate, evidence-based 
          Applied Behavior Analysis (ABA) therapy designed to support children with 
          autism and developmental disabilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
            Enroll A Child <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
          <button className="bg-Secondary hover:bg-Secondary/90 text-white font-bold text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full sm:w-auto border border-Secondary">
            Free ABA Consultation <ArrowUpRight size={18} strokeWidth={2.5}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner