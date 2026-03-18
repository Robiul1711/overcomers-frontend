import React from 'react'
import { ImageProvider } from '@/utils/ImageProvider'
import { Link } from 'react-router-dom'

const CommonBanner = ({ title, subtitle, link }) => {
  return (
    <div className="bg-[#AD3946] w-full section-padding-x py-16 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
      <div className=" flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 w-full relative z-10">
          <p className="text-white font-medium text-sm md:text-base mb-4 tracking-wide">
          <Link to="/" className='hover:text-Primary transition-colors'>Home</Link>  / <span className='text-Primary'>{link}</span>
          </p>
          <h1 className="text-3xl md:text-[44px] lg:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 text-[15px] md:text-lg leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Right Logo (Hidden on smaller screens, visible on md and up) */}
        <div className="hidden md:flex justify-end relative z-10">
          <img 
            src={ImageProvider.Logo} 
            alt="Overcomers Logo" 
            className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain animate-spin"
            style={{ animationDuration: '8s' }}
          />
        </div>
      </div>
    </div>
  )
}

export default CommonBanner