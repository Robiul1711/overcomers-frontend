import React from 'react';
import { 
  Home, 
  GraduationCap, 
  Brain, 
  Users, 
  HeartHandshake, 
  UsersRound, 
  ShieldCheck, 
  LineChart,
  PhoneCall
} from 'lucide-react';
import { motion } from 'motion/react';

const WhatWeOffer = () => {
  const cards = [
    {
      title: "In-Home ABA Therapy",
      description: "Personalized therapy sessions delivered in your home environment for comfort and familiarity.",
      icon: <Home className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "School-Based Support",
      description: "Collaborative services within educational settings to support academic and social success.",
      icon: <GraduationCap className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Behavior Development",
      description: "Skill building in communication, socialization, and independence for lasting growth.",
      icon: <Brain className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Parent Training",
      description: "Empowering caregivers with practical tools and strategies to support progress at home.",
      icon: <Users className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Compassionate Care",
      description: "Every child and family receives individualized attention rooted in empathy and respect.",
      icon: <HeartHandshake className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Experienced Team",
      description: "Our BCBAs and RBTs bring years of experience and ongoing professional development.",
      icon: <UsersRound className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Insurance Assistance",
      description: "We help families navigate insurance to maximize benefits and reduce out-of-pocket costs.",
      icon: <ShieldCheck className="text-Primary" size={32} strokeWidth={1.5} />
    },
    {
      title: "Measurable Progress",
      description: "Data-driven treatment plans ensure every milestone is tracked and celebrated.",
      icon: <LineChart className="text-Primary" size={32} strokeWidth={1.5} />
    }
  ];

  return (
    <div className="w-full bg-[#FAFAFA] section-padding-x section-padding-y">
      <div className=" flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h3 className="text-Third font-bold text-[16px] tracking-wider uppercase mb-3 relative inline-block">
            What We Offer
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-Primary rounded-full"></span>
          </h3>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-Secondary mt-2 leading-[1.2]">
            Comprehensive ABA<br />Therapy Services
          </h2>
        </motion.div>

        {/* CSS for custom card shadow */}
        <style dangerouslySetInnerHTML={{__html: `
          .offer-card {
            box-shadow: 0px 0px 20px 2px rgba(255, 187, 3, 0.4);
            border: 1px solid rgba(255, 187, 3, 0.3);
          }
        `}} />

        {/* Grid Section Staggered Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16"
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="bg-Secondary text-center rounded-[20px] p-8 flex flex-col items-center justify-start offer-card transition-transform hover:-translate-y-1"
            >
              <div className="mb-5 bg-white/5 w-[64px] h-[64px] rounded-full flex items-center justify-center">
                {card.icon}
              </div>
              <h4 className="text-white font-bold text-[18px] mb-3 leading-snug">
                {card.title}
              </h4>
              <p className="text-white/80 text-[14px] leading-[1.6]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Button */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => window.location.href = "tel:9083427584"}
          className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors"
        >
          Free ABA Consultation <PhoneCall size={18} strokeWidth={2.5} className="ml-1" />
        </motion.button>

      </div>
    </div>
  );
};

export default WhatWeOffer;