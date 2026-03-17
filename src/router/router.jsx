import Dashboard from "@/components/admin/Dashboard";
import Cases from "@/components/admin/Cases";
import CaseDetails from "@/components/admin/CaseDetails";
import Documents from "@/components/admin/Documents";
import ProfileSettings from "@/components/admin/ProfileSettings";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import ForgetPassword from "@/pages/authPage/ForgetPassword";
import ResetPassword from "@/pages/authPage/ResetPassword";
import ResetVerifyOtp from "@/pages/authPage/ResetVerifyOtp";
import SignIn from "@/pages/authPage/SignIn";
import SignUp from "@/pages/authPage/SignUp";
import VerifyOtp from "@/pages/authPage/VerifyOtp";

import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Pages/Home";
import Services from "@/pages/Pages/Services";
import Enrollment from "@/pages/Pages/Enrollment";
import Events from "@/pages/Pages/Events";
import Careers from "@/pages/Pages/Careers";
import Scholarship from "@/pages/Pages/Scholarship";
import Contact from "@/pages/Pages/Contact";

const router = createBrowserRouter([
  // auth routes 
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUp />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/auth/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/auth/reset-verify-otp",
        element: <ResetVerifyOtp />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/enrollment",
        element: <Enrollment />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/scholarship",
        element: <Scholarship />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />, 
      },
      {
        path: "/dashboard/cases",
        element: <Cases />, 
      },
      {
        path: "/dashboard/cases/:id",
        element: <CaseDetails />, 
      },
      {
        path: "/dashboard/documents",
        element: <Documents />, 
      },
      {
        path: "/dashboard/settings",
        element: <ProfileSettings />, 
      },
    ],
  },
]);

export default router;
