import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import useMutationClient from '@/hooks/useMutationClient';

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutationClient({
    url: "/auth/forgot-password",
  });

  const onSubmit = (data) => {
    mutate(
      { data },
      {
        onSuccess: (res) => {
          navigate('/auth/verify-otp', { state: { email: data.email } });
        },
      }
    );
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
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-[15px] mt-2 text-center">
          Enter your email to get a verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-4 lg:space-y-6">
        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Work Email
          </label>
          <input 
            type="email" 
            placeholder="Enter Work Email"
            {...register("email", { 
                required: "Work Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.email ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div className=" flex justify-center">
          <button 
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                Submitting... <Loader2 className="animate-spin text-Secondary" size={20} />
              </>
            ) : (
              <>
                Submit <ArrowUpRight size={20} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-[15px] text-gray-500">
        Remember the password, back to <Link to="/auth/sign-in" className="text-Secondary font-bold underline hover:text-Secondary/80">Log In</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;