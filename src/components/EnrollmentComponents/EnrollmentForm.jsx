import React from "react";
import { useForm } from "react-hook-form";
import { Upload, ChevronDown, ArrowUpRight } from "lucide-react";

const EnrollmentForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const aboutUsValue = watch("aboutUs", "");

  return (
    <div className="w-full section-padding-x py-16 bg-[#FAF7F2] flex justify-center">
      <div className="w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          {/* Section 1 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Parent / Guardian Information (Información del Padre / Tutor)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Parent/Guardian Name (Nombre del Padre/Tutor){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("parentName", { required: true })}
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

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Home Address (Dirección){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street Address"
                  {...register("address", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Child Information (Información del Niño/a)
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
                  {...register("childName", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Date of Birth (Fecha de Nacimiento){" "}
                  <span className="text-[#3A331E]">*</span>
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
                  Diagnosis (Diagnóstico){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autism Spectrum Disorder"
                  {...register("diagnosis", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Insurance Provider (Proveedor de Seguro){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Insurance company name"
                  {...register("insuranceProvider", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Member ID (Número de Miembro){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Insurance member ID number"
                  {...register("memberId", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Service Details (Detalles del Servicio)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Select */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  What location will services be in? (¿En qué lugar se prestarán
                  los servicios?) <span className="text-[#3A331E]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("location", { required: true })}
                    className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-500">
                      Select a location / Seleccione un lugar
                    </option>
                    <option value="School">School / Escuela</option>
                    <option value="Home">Home / Hogar</option>
                    <option value="Daycare">Daycare / Guardería</option>
                    <option value="Other">Other / Otro</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              {/* Start Time Select */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Preferred start-time for services (Hora de inicio preferida
                  para los servicios) <span className="text-[#3A331E]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("startTime", { required: true })}
                    className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all appearance-none pr-10 text-[14px]"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-500">
                      Select a time / Seleccione una hora
                    </option>
                    <option value="Morning">
                      Morning (8:00 AM - 10:00 AM) / Mañana
                    </option>
                    <option value="Mid-Morning">
                      Mid-Morning (10:00 AM - 12:00 PM) / Media Mañana
                    </option>
                    <option value="Afternoon">
                      Afternoon (12:00 PM - 3:00 PM) / Tarde
                    </option>
                    <option value="Late Afternoon">
                      Late Afternoon (3:00 PM - 5:00 PM) / Tarde Noche
                    </option>
                    <option value="Flexible">Flexible / Flexible</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  How'd you hear about us?{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Write here.."
                    {...register("aboutUs", { required: true, maxLength: 250 })}
                    className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all min-h-[120px] resize-none text-[14px]"
                  ></textarea>
                </div>
                <div className="text-[12px] text-gray-500 mt-1">
                  {aboutUsValue.length}/250 characters
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#3A331E] border-b-2 border-Primary pb-3">
              Required Attachments
            </h3>

            <div className="flex flex-col gap-6">
              {/* Full width attachment */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Front & Back of Insurance Card{" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                  <input
                    type="file"
                    {...register("insuranceFile", { required: true })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    className="text-[#AD3946] w-6 h-6 mb-1"
                    strokeWidth={2}
                  />
                  <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px]">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-gray-500 text-[12px] md:text-[13px]">
                    Supported: JPG, PDF. Max size: 10MB
                  </div>
                </div>
              </div>

              {/* Grid attachments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                    Neurological Report / Proof of Diagnosis{" "}
                    <span className="text-[#3A331E]">*</span>
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("diagnosisFile", { required: true })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px]">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-gray-500 text-[12px] md:text-[13px]">
                      Supported: JPG, PDF. Max size: 10MB
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                    ABA Referral <span className="text-[#3A331E]">*</span>
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("referralFile", { required: true })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px]">
                      Click to upload or drag and drop
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
              className="bg-Primary hover:bg-Primary/90 text-[#3A331E] font-bold text-[14px] md:text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto min-w-[200px]"
            >
              Submit Enrollment <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
            <p className="text-gray-500 text-[12px] md:text-[13px]">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="underline font-medium">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline font-medium">
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

export default EnrollmentForm;
