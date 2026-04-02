import React from "react";
import { Outlet } from "react-router-dom";
import CommonButton from "@/components/common/CommonButton";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 bg-white">
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 hidden md:block">
        <CommonButton text="Back to Home" isLink={true} to="/"/>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
