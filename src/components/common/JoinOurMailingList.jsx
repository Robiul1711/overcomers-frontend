import React, { useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';
import { motion } from 'motion/react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const JoinOurMailingList = ({ data }) => {
  const [email, setEmail] = useState("");
  const axiosPublic = useAxiosPublic();

  const { mutate, isPending } = useMutation({
    mutationFn: async (emailValue) => {
      const res = await axiosPublic.post("/cms/newsletter/subscribe", { email: emailValue });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Subscribed successfully!");
      setEmail("");
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error.message || "Subscription failed";
      toast.error(msg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    mutate(email);
  };

  return (
    <div className="relative w-full section-padding-y overflow-hidden flex items-center justify-center">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={data?.image_url || ImageProvider.newsletter} 
          alt="Children running" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for readability matching the screenshot */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-[800px] bg-Secondary/30 backdrop-blur-md rounded-[24px] py-14 px-8 md:px-16 flex flex-col items-center justify-center text-center shadow-lg border border-white/10"
      >
        
        {/* Header Content */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center mb-8 w-full"
        >
          <h3 className="text-white font-bold text-[14px] md:text-[16px] tracking-[2px] uppercase mb-3 relative inline-block">
            Join Our Mailing List
            <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-Primary rounded-full"></span>
          </h3>
          <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-bold text-white mt-1">
            Stay Updated
          </h2>
        </motion.div>

        {/* Input Form */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-[600px] flex flex-col gap-2" 
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start w-full">
            <label className="text-white font-bold text-[13px] mb-2 px-1">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <input 
                type="email" 
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                className="flex-grow bg-[#F5F5F5] rounded-[10px] px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-Primary transition-all w-full sm:w-auto"
              />
              <button 
                type="submit"
                disabled={isPending}
                className="bg-Primary hover:bg-Primary/90 disabled:bg-Primary/70 text-Third font-bold text-[14px] px-8 py-4 rounded-[10px] flex items-center justify-center gap-2 transition-colors shrink-0 w-full sm:w-auto cursor-pointer"
              >
                {isPending ? (
                  <>Subscribing <Loader2 className="animate-spin" size={18} /></>
                ) : (
                  <>Subscribe <ArrowUpRight size={18} strokeWidth={2.5} /></>
                )}
              </button>
            </div>
          </div>
        </motion.form>

      </motion.div>

    </div>
  );
};

export default JoinOurMailingList;