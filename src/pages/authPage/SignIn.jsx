import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slices/authSlice';
import useMutationClient from '@/hooks/useMutationClient';


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const { mutate, isPending } = useMutationClient({
    url: "/auth/login",
  });

  const onSubmit = (data) => {
    mutate(
      { data },
      {
        onSuccess: (res) => {
          const resData = res?.data || res;
          const token = resData?.access_token;
          const userType = resData?.data?.user_type;
          if (token) {
            dispatch(setToken({ token, userType: userType }));
          }
          
          // Redirect based on the authenticated user's type
          if (userType === 'parent') {
            navigate('/parent-dashboard');
          } else if (userType === 'employee') {
            navigate('/dashboard');
          } else if (userType === 'director') {
            navigate('/director-dashboard');
          } else if (userType === 'supervisor') {
            navigate('/supervisor-dashboard');
          } else {
            // default redirect fallback
            navigate('/dashboard');
          }
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-6">
        <Link to="/">
          <img 
            src={ImageProvider.Logo} 
            alt="Overcomers Logo" 
            className="w-28 sm:w-32 md:w-48 h-auto object-contain" 
          />
        </Link>
        
        <h2 className="text-3xl font-bold text-Third mt-6 tracking-tight">
          Portal Login
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[15px] font-bold text-Third mb-2">
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="Enter Email"
            {...register("email", { 
              required: "Email is required" 
            })}
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${
              errors.email ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'
            }`}
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
            className={`w-full bg-[#e6e4e4] text-gray-800 rounded-xl px-4 py-3.5 outline-none focus:ring-2 transition ${
              errors.password ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-Primary'
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
          
          <div className="mt-3 text-gray-500 text-[15px]">
            Forgot your password? <Link to="/auth/forget-password" className="text-Secondary font-bold underline hover:text-Secondary/80">Reset</Link>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-4">
          <button 
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 bg-Primary hover:bg-Primary/90 text-Secondary font-bold text-[16px] py-3.5 px-8 rounded-xl w-3/4 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                Logging In... <Loader2 className="animate-spin text-Secondary" size={20} />
              </>
            ) : (
              <>
                Log In <ArrowUpRight size={20} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Contextual Disclaimer Text */}
      <div className="mt-6 text-center text-[14px] text-Third font-medium">
        Access is restricted to authorized users of Overcomers ABA.
      </div>
    </div>
  );
};

export default SignIn;