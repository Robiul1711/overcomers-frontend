import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';
import { motion } from 'motion/react';

const AboutUs = () => {
  return (
    <div className="w-full bg-[#FFFBF3] section-padding-x section-padding-y">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full min-h-[400px] lg:min-h-[600px] rounded-[24px] overflow-hidden shadow-sm relative"
        >
          {/* Using a placeholder URL for the children running image */}
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={ImageProvider.AboutUs} 
            alt="Children running in school" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Right Side: Content */}
        <div className="flex flex-col">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex flex-col items-start"
          >
            <h3 className="text-Third font-bold text-[18px] mb-2 relative inline-block">
              About Us
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-Primary rounded-full"></span>
            </h3>
            <h2 className="text-[36px] md:text-[46px] font-bold text-Secondary leading-[1.2] mt-4">
              Our Mission &<br />Commitment
            </h2>
          </motion.div>

          {/* List Items staggered container */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="flex flex-col gap-8 mt-4"
          >
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex items-start gap-4"
            >
              <ArrowRight className="text-Secondary shrink-0 mt-1" size={20} />
              <div className="flex flex-col">
                <h4 className="text-Secondary font-bold text-[16px] md:text-[18px] mb-2">
                  Dedicated Behavioral Analysts & Technicians
                </h4>
                <p className="text-gray-600 text-[14px] md:text-[15px] leading-[1.7]">
                  Does your child need help learning daily living skills, (toileting, feeding, community 
                  outings, etc.), reducing problem behaviors, or even regaining appropriate 
                  behaviors? Overcomers can help! At Overcomers, we believe every child deserves 
                  a chance to reach their fullest potential and overcome any limitations that may be 
                  hindering them.
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex items-start gap-4"
            >
              <ArrowRight className="text-Secondary shrink-0 mt-1" size={20} />
              <div className="flex flex-col">
                <h4 className="text-Secondary font-bold text-[16px] md:text-[18px] mb-2">
                  Our Mission
                </h4>
                <p className="text-gray-600 text-[14px] md:text-[15px] leading-[1.7]">
                  At Overcomers ABA Services, we provide quality ABA therapy for children with 
                  autism and other developmental disabilities. Our team consists of highly trained 
                  professionals who use the science of Applied Behavior Analysis (ABA) to create 
                  individualized programs to meet your child's social and behavioral needs.
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex items-start gap-4"
            >
              <ArrowRight className="text-Secondary shrink-0 mt-1" size={20} />
              <div className="flex flex-col">
                <h4 className="text-Secondary font-bold text-[16px] md:text-[18px] mb-2">
                  More About ABA Therapy
                </h4>
                <p className="text-gray-600 text-[14px] md:text-[15px] leading-[1.7]">
                  Applied Behavior Analysis (ABA) is the science of collecting individualized 
                  behavioral data and applying it to socially relevant events to produce a desired 
                  outcome. ABA is scientifically proven to be effective in causing behavior-change 
                  amongst individuals with developmental disabilities. Although widely practiced 
                  within the scope of children with autism, the science of ABA can be used for 
                  several other populations and age groups as well.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;