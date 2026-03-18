import React from 'react';
import { Home, GraduationCap, BrainCircuit, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

const servicesData = [
  {
    num: '01',
    title: 'In-Home ABA Therapy',
    icon: Home,
    desc: [
      "Our in-home ABA therapy brings evidence-based treatment directly to your child's natural environment. Learning in familiar surroundings promotes faster generalization of skills and reduces anxiety often associated with clinical settings. Our BCBAs design individualized programs targeting communication, self-care, adaptive behavior, and social skills - all within the comfort of your home."
    ]
  },
  {
    num: '02',
    title: 'School-Based Support',
    icon: GraduationCap,
    desc: [
      "We collaborate directly with schools and educators to support your child's academic and social development. Our clinicians work alongside teachers and staff to implement behavior support plans, develop appropriate IEP goals, and foster an inclusive learning environment where every child can thrive."
    ]
  },
  {
    num: '03',
    title: 'Behavioral Assessments',
    icon: BrainCircuit,
    desc: [
      "Comprehensive assessments form the foundation of every treatment plan at Overcomers ABA. Our BCBAs conduct Functional Behavior Assessments (FBAs), VB-MAPP, and other validated tools to identify your child's strengths, needs, and the environmental factors influencing their behavior - ensuring treatment is targeted and effective.",
      "Treatment plans may include ADL Skills training (toileting, feeding, dressing), behavior deceleration programs to reduce behaviors that may currently hinder the child's learning, and verbal and non-verbal behavior acquisition programs."
    ]
  },
  {
    num: '04',
    title: 'Parent & Caregiver Training',
    icon: HeartHandshake,
    desc: [
      "Families are the most important members of the treatment team. We provide hands-on caregiver training to ensure strategies are consistently applied throughout the day. Our parent coaching sessions equip you with the skills, confidence, and understanding to support your child's growth beyond scheduled therapy hours."
    ]
  }
];

const ServicesList = () => {
  return (
    <div className="bg-[#FAF7F2] w-full section-padding-x section-padding-y overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="flex flex-col gap-8"
      >
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]  border-[#AD3946] flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 lg:p-12 gap-8 lg:gap-14 transition-transform hover:-translate-y-1 duration-300"
              style={{ borderLeftWidth: '8px' }}
            >
              
              {/* Left Section: Number and Title/Icon */}
              <div className="flex items-center gap-6 lg:gap-10 w-full md:w-[45%] lg:w-[40%] shrink-0">
                {/* Number */}
                <div className="text-[56px] lg:text-[72px] font-bold text-Primary leading-none">
                  {service.num}
                </div>
                
                {/* Icon & Title */}
                <div className="flex flex-col gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#fdf5f5] flex items-center justify-center">
                    <Icon className="text-[#AD3946] w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[20px] lg:text-[24px] font-bold text-[#AD3946] leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Right Section: Descriptions */}
              <div className="flex-1 flex flex-col gap-4">
                {service.desc.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 text-[15px] lg:text-[16px] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ServicesList;
