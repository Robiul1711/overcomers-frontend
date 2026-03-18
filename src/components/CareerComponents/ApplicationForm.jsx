import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload, ChevronDown, ArrowUpRight } from 'lucide-react';

const ApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Application Submitted:", data);
  };

  return (
    <div className="w-full section-padding-x pb-16 md:pb-24 pt-8 bg-[#FAF7F2] flex justify-center">
      <div className="w-full  bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-12">
      
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 md:gap-10">
          
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-4 -mb-2">
            Application Form
          </h3>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
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
                Date of Birth <span className="text-[#3A331E]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="dd/mm/yyyy"
                {...register("dob", { required: true })}
                className="w-full bg-[#f4f4f4] text-gray-500 p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
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
                Address <span className="text-[#3A331E]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Street Address"
                {...register("address", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                What position are you applying for? <span className="text-[#3A331E]">*</span>
              </label>
              <div className="relative">
                <select 
                  {...register("position", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-500">Admin/HR</option>
                  <option value="Admin/HR">Admin/HR</option>
                  <option value="BCBA">BCBA</option>
                  <option value="BCaBA">BCaBA</option>
                  <option value="RBT">RBT</option>
                  <option value="ABA Therapist">ABA Therapist</option>
                  <option value="Lead Behavior Specialist">Lead Behavior Specialist</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Reliable Transportation? <span className="text-[#3A331E]">*</span>
              </label>
              <div className="relative">
                <select 
                  {...register("transportation", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-500">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Desired Hourly Rate <span className="text-[#3A331E]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. $25/hr"
                {...register("hourlyRate", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Please select your availability <span className="text-[#3A331E]">*</span>
              </label>
              <div className="relative">
                <select 
                  {...register("availability", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-500">Full Time - Day Time</option>
                  <option value="Full Time - Day Time">Full Time - Day Time</option>
                  <option value="Part Time - Day Time">Part Time - Day Time</option>
                  <option value="Part Time - Afterschool/Evening">Part Time - Afterschool/Evening</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                How did you hear about the Overcomer Scholarship Program?
              </label>
              <input 
                type="text" 
                placeholder="e.g. Social media, referral, Overcomers ABA website..."
                {...register("howDidYouHear")}
                className="w-full bg-[#f4f4f4] text-gray-500 p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>

            {/* Upload Resume */}
            <div className="flex flex-col gap-2 md:col-span-2 mt-4">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Upload Resume <span className="text-[#3A331E]">*</span>
              </label>
              <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative mt-1">
                <input type="file" {...register("resumeFile", { required: true })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="text-[#AD3946] w-6 h-6 mb-1" strokeWidth={2} />
                <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px]">Click to upload or drag and drop</div>
                <div className="text-gray-500 text-[12px] md:text-[13px]">Supported: JPG, PDF. Max size: 10MB</div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center mt-6 gap-4">
            <button 
              type="submit" 
              className="bg-Primary hover:bg-Primary/90 text-[#3A331E] font-bold text-[14px] md:text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto min-w-[200px]"
            >
              Submit Application <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
            <p className="text-gray-500 text-[12px] md:text-[13px] text-center max-w-[500px]">
              This site is protected by reCAPTCHA and the Google <a href="#" className="underline font-medium">Privacy Policy</a> and <a href="#" className="underline font-medium">Terms of Service</a> apply.
            </p>
          </div>

        </form>
        
      </div>
    </div>
  );
};

export default ApplicationForm;
