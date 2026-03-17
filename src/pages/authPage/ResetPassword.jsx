import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight } from 'lucide-react';

const ResetPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const newPassword = watch("newPassword", "");

  const onSubmit = (data) => {
    console.log('Reset Password Data:', data);
    // Handle reset password logic here
    // e.g., navigate('/auth/sign-in')
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
          Reset Password
        </h2>
        <p className="text-gray-500 text-[15px] mt-2 text-center">
          Enter your new password to reset it.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            New Password
          </label>
          <input 
            type="password" 
            placeholder="Enter New Password"
            {...register("newPassword", { 
                required: "New Password is required",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                },
                pattern: {
                    value: /(?=.*[A-Z])/,
                    message: "Password must include at least one capital letter"
                }
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.newPassword ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.newPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.newPassword.message}</p>}
          <p className="text-gray-500 text-[13px] mt-2">
            Your password must be at least 8 characters long and must include at least one capital letter.
          </p>
        </div>

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Confirm Password
          </label>
          <input 
            type="password" 
            placeholder="Confirm Password"
            {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => value === newPassword || "Passwords do not match"
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.confirmPassword ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
        </div>

        <div className="pt-2 flex justify-center">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg"
          >
            Submit <ArrowUpRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;