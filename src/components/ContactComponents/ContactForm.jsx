import React from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosPublic.post("/contact", payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Thank you! Your message has been sent successfully.");
      reset();
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error.message || "Failed to send message";
      toast.error(msg);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      message: data.message,
    };
    mutate(payload);
  };

  return (
    <div className="w-full section-padding-x pb-16 md:pb-24 pt-8 bg-[#FAF7F2] flex justify-center">
      <div className="w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-12 pt-10">
        <h3 className="text-[24px] md:text-[28px] font-bold text-[#3A331E] border-b-[3px] border-Primary pb-4 mb-8">
          Send Us a Message
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Full Name <span className="text-[#3A331E]">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Email Address <span className="text-[#3A331E]">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register("email", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
              Phone Number <span className="text-[#3A331E]">*</span>
            </label>
            <input
              type="text"
              placeholder="(908) 000 - 0000"
              {...register("phone", { required: true })}
              className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
              Message <span className="text-[#3A331E]">*</span>
            </label>
            <textarea
              placeholder="How can we help you?"
              {...register("message", { required: true })}
              className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[160px] resize-none text-[14px]"
            ></textarea>
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="bg-Primary hover:bg-Primary/90 text-[#3A331E] font-bold text-[14px] md:text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Sending...
                </>
              ) : (
                <>
                  Send Message <ArrowUpRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
