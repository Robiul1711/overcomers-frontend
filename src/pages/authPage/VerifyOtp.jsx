import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight } from 'lucide-react';
import OTPInput from 'otp-input-react';

const VerifyOtp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Verify OTP Data:', data);
    // Handle OTP verification logic here
    // e.g., navigate('/dashboard') or navigate('/auth/reset-password')
  };

  return (
    <div className="w-full max-w-md ">
      <div className="flex flex-col items-center mb-8">
        <Link to="/">
          <img 
              src={ImageProvider.Logo} 
              alt="Overcomers Logo" 
              className="w-28 sm:w-32 md:w-48 h-auto object-contain" 
          />
        </Link>
        <h2 className="text-3xl font-bold text-Third mt-6 tracking-tight">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-[15px] mt-2 text-center">
          Enter the 4-digit code sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center">
          <Controller
            control={control}
            name="otp"
            rules={{ 
                required: "OTP is required",
                minLength: {
                    value: 4,
                    message: "Please enter all 4 digits"
                }
            }}
            render={({ field: { onChange, value } }) => (
              <OTPInput
                value={value || ""}
                onChange={onChange}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputClassName="hover:ring-2 focus:ring-2 ring-Primary focus:outline-none transition-all duration-300"
                inputStyles={{
                  width: "3.5rem",
                  height: "3.5rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderRadius: "0.75rem",
                  border: "none",
                  backgroundColor: "#e6e4e4",
                  color: "#3A331E",
                  outline: "none"
                }}
                className={`flex justify-center ${errors.otp ? 'ring-2 ring-red-500 rounded-xl p-1' : ''}`}
              />
            )}
          />
          {errors.otp && <p className="text-red-500 text-xs mt-3 font-medium">{errors.otp.message}</p>}
        </div>

        <div className="pt-2 flex justify-center">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg"
          >
            Verify <ArrowUpRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-[15px] text-gray-500">
        Didn't receive code? <button type="button" className="text-Secondary font-bold underline hover:text-Secondary/80 ml-1">Resend</button>
      </div>
      <div className="mt-4 text-center text-[15px] text-gray-500">
        Remember the password, back to <Link to="/auth/sign-in" className="text-Secondary font-bold underline hover:text-Secondary/80">Log In</Link>
      </div>
    </div>
  );
};

export default VerifyOtp;