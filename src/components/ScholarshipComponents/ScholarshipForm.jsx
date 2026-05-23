import React from "react";
import { useForm } from "react-hook-form";
import { Upload, ChevronDown, ArrowUpRight, Loader2 } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";
import { toast } from "react-toastify";

const ScholarshipForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutationClient({
    url: "/employee-applications",
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("full_name", data.fullName);
    formData.append("dob", data.dob);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("education_program", data.school);
    formData.append("field_of_study", data.fieldOfStudy);
    formData.append("enrollment_status", data.enrollmentStatus);
    formData.append("expected_graduation", data.graduationDate);
    formData.append("align_goals", data.goals);
    formData.append("challenge_overcome", data.challenge);
    formData.append("give_back_plan", data.giveBack);
    formData.append("source", data.howDidYouHear || "");

    if (data.resumeFile?.[0]) {
      formData.append("resume", data.resumeFile[0]);
    }
    if (data.proofFile?.[0]) {
      formData.append("enrollment_proof", data.proofFile[0]);
    }
    if (data.recommendationFile?.[0]) {
      formData.append("recommendation_letter", data.recommendationFile[0]);
    }

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const resumeFile = watch("resumeFile");
  const proofFile = watch("proofFile");
  const recommendationFile = watch("recommendationFile");

  return (
    <div className="w-full section-padding-x py-16 bg-[#FAF7F2] flex justify-center">
      <div className="w-full  bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          {/* Section 1: Personal Information */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Child's Full Name (Nombre Completo del Niño/a){" "}
                  <span className="text-[#3A331E]">*</span>
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
                type="date"
                {...register("dob", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Phone Number (Número de Teléfono){" "}
                  <span className="text-[#3A331E]">*</span>
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
                  Email Address (Correo Electrónico){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Home Address (Dirección){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street address, City, State, ZIP"
                  {...register("address", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education & Program */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Education & Program
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Current or Intended School / Program{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("school", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Field of Study / Area of Training{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Applied Behavior"
                  {...register("fieldOfStudy", { required: true })}
                  className="w-full bg-[#f4f4f4] text-gray-500 p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Enrollment Status <span className="text-[#3A331E]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("enrollmentStatus", { required: true })}
                    className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-500">
                      Select / Seleccione
                    </option>
                    <option value="Full-Time">
                      Full-Time / Tiempo completo
                    </option>
                    <option value="Part-Time">Part-Time / Medio tiempo</option>
                    <option value="Not Enrolled Yet">
                      Not Enrolled Yet / Aún no inscrito
                    </option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                Expected Graduation / Completion Date{" "}
                <span className="text-[#3A331E]">*</span>
              </label>
              <input
                type="date"
                {...register("graduationDate", { required: true })}
                className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
              />
            </div>
            </div>
          </div>

          {/* Section 3: About You */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              About You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  How does this scholarship align with your personal and
                  professional goals? <span className="text-[#3A331E]">*</span>
                </label>
                <textarea
                  placeholder="Tell us about your goals and how this scholarship will help you achieve them..."
                  {...register("goals", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[140px] resize-none text-[14px]"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Describe a challenge you have overcome and what it taught you.{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <textarea
                  placeholder="Share a personal story of resilience and growth..."
                  {...register("challenge", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[140px] resize-none text-[14px]"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  How do you plan to give back to your community?{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <textarea
                  placeholder="Describe your commitment to making a positive impact..."
                  {...register("giveBack", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[140px] resize-none text-[14px]"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  How did you hear about the Overcomer Scholarship Program?
                </label>
                <textarea
                  placeholder="e.g. Social media, referral, Overcomers ABA website..."
                  {...register("howDidYouHear")}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[140px] resize-none text-[14px]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 4: Required Documents */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Required Documents
            </h3>

            <div className="flex flex-col gap-6">
              {/* Full width attachment */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Resume <span className="text-[#3A331E]">*</span>
                </label>
                <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                  <input
                    type="file"
                    {...register("resumeFile", { required: true })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    className="text-[#AD3946] w-6 h-6 mb-1"
                    strokeWidth={2}
                  />
                  <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                    {resumeFile?.[0]?.name ? (
                      <span className="text-green-600 font-bold">{resumeFile[0].name}</span>
                    ) : (
                      "Click to upload or drag and drop"
                    )}
                  </div>
                  <div className="text-gray-500 text-[12px] md:text-[13px]">
                    Supported: PDF, DOC, DOCX. Max size: 10MB
                  </div>
                </div>
              </div>

              {/* Grid attachments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                    Proof of Enrollment / Acceptance Letter{" "}
                    <span className="text-[#3A331E]">*</span>
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("proofFile", { required: true })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                      {proofFile?.[0]?.name ? (
                        <span className="text-green-600 font-bold">{proofFile[0].name}</span>
                      ) : (
                        "Click to upload or drag and drop"
                      )}
                    </div>
                    <div className="text-gray-500 text-[12px] md:text-[13px]">
                      Supported: JPG, PDF. Max size: 10MB
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                    Letter of Recommendation (Optional)
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("recommendationFile")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                      {recommendationFile?.[0]?.name ? (
                        <span className="text-green-600 font-bold">{recommendationFile[0].name}</span>
                      ) : (
                        "Click to upload or drag and drop"
                      )}
                    </div>
                    <div className="text-gray-500 text-[12px] md:text-[13px]">
                      Supported: JPG, PDF. Max size: 10MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-6 gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="bg-Primary hover:bg-Primary/90 text-[#3A331E] font-bold text-[14px] md:text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto min-w-[200px] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  Submitting Application... <Loader2 className="animate-spin text-[#3A331E]" size={18} />
                </>
              ) : (
                <>
                  Submit Application <ArrowUpRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
            <p className="text-gray-500 text-[12px] md:text-[13px]">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="#"
                className="underline font-medium hover:text-[#AD3946]"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline font-medium hover:text-[#AD3946]"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipForm;
