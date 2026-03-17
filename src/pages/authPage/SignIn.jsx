import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight } from 'lucide-react';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Login Form Data:', data);
    // Handle authentication logic here
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
          Employee Portal
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Work Email
          </label>
          <input 
            type="email" 
            placeholder="Enter Work Email"
            {...register("email", { required: "Work Email is required" })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.email ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Password
          </label>
          <input 
            type="password" 
            placeholder="**************"
            {...register("password", { required: "Password is required" })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.password ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
          
          <div className="mt-3 text-gray-500 text-[15px]">
            Reset your password for first login. <Link to="/auth/forget-password" className="text-Secondary font-bold underline hover:text-Secondary/80">Reset</Link>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg"
          >
            Log In <ArrowUpRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      <div className="mt-12 text-center text-[14px] text-Third font-medium">
        Access is restricted to authorized Overcomers ABA team members.
      </div>
    </div>
  );
};

export default SignIn;