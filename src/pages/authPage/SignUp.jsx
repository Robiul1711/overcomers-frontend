import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight } from 'lucide-react';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log('SignUp Form Data:', data);
    // Handle signup logic here
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
          Add Team Member
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            First Name
          </label>
          <input 
            type="text" 
            {...register("firstName", { required: "First Name is required" })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.firstName ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Last Name
          </label>
          <input 
            type="text" 
            {...register("lastName", { required: "Last Name is required" })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.lastName ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Role (BCBA, RBT, Admin, etc.)*
          </label>
          <input 
            type="text" 
            {...register("role", { required: "Role is required" })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.role ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.role && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Work Email*
          </label>
          <input 
            type="email" 
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

        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Password
          </label>
          <input 
            type="password" 
            placeholder="Enter Password"
            {...register("password", { 
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                },
                pattern: {
                    value: /(?=.*[A-Z])/,
                    message: "Password must include at least one capital letter"
                }
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.password ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
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
                validate: value => value === password || "Passwords do not match"
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${errors.confirmPassword ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
        </div>

        <div className="pt-4 flex justify-center">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg"
          >
            Create Profile <ArrowUpRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;