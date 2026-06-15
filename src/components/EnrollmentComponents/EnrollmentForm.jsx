import React from "react";
import { useForm } from "react-hook-form";
import { Upload, ChevronDown, ArrowUpRight, Loader2, X } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";

const formatDateTime = (val) => {
  if (!val) return "";
  const date = new Date(val);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strHours = String(hours).padStart(2, '0');
  
  return `${year}-${month}-${day} ${strHours}:${minutes} ${ampm}`;
};

const EnrollmentForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [insuranceFiles, setInsuranceFiles] = React.useState([]);
  const [previews, setPreviews] = React.useState([]);

  const { mutate, isPending } = useMutationClient({
    url: "/parent-applications",
    successMessage: "Application submitted successfully!",
  });

  React.useEffect(() => {
    register("insuranceCards", { required: true });
  }, [register]);

  React.useEffect(() => {
    const objectUrls = [];
    const newPreviews = [];
    
    insuranceFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        objectUrls.push(url);
        newPreviews.push({
          name: file.name,
          type: "image",
          url: url
        });
      } else {
        newPreviews.push({
          name: file.name,
          type: "file"
        });
      }
    });

    setPreviews(newPreviews);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [insuranceFiles]);

  const handleInsuranceFilesChange = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setInsuranceFiles((prev) => {
        const updated = [...prev, ...selected].slice(0, 2);
        setValue("insuranceCards", updated, { shouldValidate: true });
        return updated;
      });
    }
  };

  const handleRemoveInsuranceFile = (indexToRemove) => {
    setInsuranceFiles((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      setValue("insuranceCards", updated.length > 0 ? updated : null, { shouldValidate: true });
      return updated;
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("parent_name", data.parentName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("child_name", data.childName);
    formData.append("child_dob", data.dob);
    formData.append("diagnosis", data.diagnosis);
    formData.append("insurance_provider", data.insuranceProvider);
    formData.append("member_id", data.memberId);
    formData.append("service_location", data.location);
    
    // Format Preferred start-time to "YYYY-MM-DD hh:mm pm/am"
    const formattedStartTime = formatDateTime(data.preferredStartTime);
    formData.append("preferred_start_time", formattedStartTime);
    
    formData.append("specific_location", data.specificLocation || "");
    formData.append("source", data.source || "");
    formData.append("about_us", data.aboutUs);

    // Files
    if (insuranceFiles[0]) {
      formData.append("insurance_card_front", insuranceFiles[0]);
    }
    if (insuranceFiles[1]) {
      formData.append("insurance_card_back", insuranceFiles[1]);
    }
    if (data.neurologicalReport?.[0]) {
      formData.append("neurological_report", data.neurologicalReport[0]);
    }
    if (data.abaReferral?.[0]) {
      formData.append("aba_referral", data.abaReferral[0]);
    }

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          reset();
          setInsuranceFiles([]);
        },
      }
    );
  };

  const aboutUsValue = watch("aboutUs", "");
  const neurologicalReportFile = watch("neurologicalReport");
  const abaReferralFile = watch("abaReferral");

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
                  type="date"
                  {...register("dob", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
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

              {/* Specific Location */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Specific Location (Dirección o Nombre Específico de la Escuela/Daycare)
                </label>
                <input
                  type="text"
                  placeholder="e.g. School Name or Daycare Address"
                  {...register("specificLocation")}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              {/* Preferred start-time Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Preferred start-time for services (Hora de inicio preferida para los servicios){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("preferredStartTime", { required: true })}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
              </div>

              {/* Referral Source */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Referral Source (Google, Referral, etc.) / Fuente de Referencia
                </label>
                <input
                  type="text"
                  placeholder="e.g. Referral, Google, Social Media"
                  {...register("source")}
                  className="w-full bg-[#f4f4f4] text-[#3A331E] p-3.5 rounded-md outline-none focus:ring-1 focus:ring-Primary transition-all text-[14px]"
                />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Single Front & Back Insurance Card Upload */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                  Insurance Card - Front & Back Side (Tarjeta de Seguro - Frente y Reverso){" "}
                  <span className="text-[#3A331E]">*</span>
                </label>
                <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-10 px-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleInsuranceFilesChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    className="text-[#AD3946] w-6 h-6 mb-1"
                    strokeWidth={2}
                  />
                  <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                    {insuranceFiles.length > 0 ? (
                      <span className="text-green-600 font-bold">{insuranceFiles.length} file(s) selected</span>
                    ) : (
                      "Upload Front & Back Sides"
                    )}
                  </div>
                  <div className="text-gray-500 text-[12px] md:text-[13px] text-center">
                    Select up to 2 files (front first, then back). Supported: JPG, PNG, PDF. Max: 10MB
                  </div>
                </div>

                {previews.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {previews.map((preview, index) => (
                      <div key={index} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl bg-white shadow-sm relative overflow-hidden">
                        {/* Label badge */}
                        <span className="absolute top-3 left-3 bg-[#AD3946] text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow">
                          {index === 0 ? "Front Side (Frente)" : "Back Side (Reverso)"}
                        </span>
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveInsuranceFile(index)}
                          className="absolute top-3 right-3 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50 hover:border-red-300 transition-colors z-10 group"
                          title="Remove file"
                        >
                          <X size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                        {/* Preview area */}
                        <div className="w-full h-44 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 mt-6">
                          {preview.type === "image" ? (
                            <img
                              src={preview.url}
                              alt={index === 0 ? "Front preview" : "Back preview"}
                              className="object-contain w-full h-full transition-transform hover:scale-105 duration-300"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400 gap-2 p-4">
                              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                <span className="text-[#AD3946] font-bold text-[13px]">PDF</span>
                              </div>
                              <span className="font-semibold text-[13px] text-gray-600">PDF Document</span>
                            </div>
                          )}
                        </div>
                        {/* File name */}
                        <div className="text-[12px] text-gray-500 truncate text-center font-medium px-2">
                          {preview.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                          <div className="flex flex-col gap-2">
                  <label className="text-[13px] md:text-[14px] font-bold text-[#3A331E]">
                    Neurological Report / Proof of Diagnosis{" "}
                    <span className="text-[#3A331E]">*</span>
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("neurologicalReport", { required: true })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                      {neurologicalReportFile?.[0]?.name ? (
                        <span className="text-green-600 font-bold">{neurologicalReportFile[0].name}</span>
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
                    ABA Referral <span className="text-[#3A331E]">*</span>
                  </label>
                  <div className="w-full border border-dashed border-Primary bg-[#FFFAF0] rounded-lg py-12 px-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#fff7e5] transition-colors relative">
                    <input
                      type="file"
                      {...register("abaReferral", { required: true })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload
                      className="text-[#AD3946] w-6 h-6 mb-1"
                      strokeWidth={2}
                    />
                    <div className="text-[#AD3946] font-semibold text-[14px] md:text-[15px] text-center">
                      {abaReferralFile?.[0]?.name ? (
                        <span className="text-green-600 font-bold">{abaReferralFile[0].name}</span>
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
      

          <div className="flex flex-col items-center justify-center mt-6 gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="bg-Primary hover:bg-Primary/90 text-[#3A331E] font-bold text-[14px] md:text-[15px] px-8 py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors w-full md:w-auto min-w-[200px] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  Submitting Enrollment... <Loader2 className="animate-spin text-[#3A331E]" size={18} />
                </>
              ) : (
                <>
                  Submit Enrollment <ArrowUpRight size={18} strokeWidth={2.5} />
                </>
              )}
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
