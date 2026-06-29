import Dashboard from "@/components/admin/Dashboard";
import Cases from "@/components/admin/Cases";
import CaseDetails from "@/components/admin/CaseDetails";
import Documents from "@/components/admin/Documents";
import ProfileSettings from "@/components/admin/ProfileSettings";
import Payroll from "@/components/admin/Payroll";
import MySchedule from "@/components/admin/MySchedule";
import Notifications from "@/components/admin/Notifications";

import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import ForgetPassword from "@/pages/authPage/ForgetPassword";
import ResetPassword from "@/pages/authPage/ResetPassword";
import ResetVerifyOtp from "@/pages/authPage/ResetVerifyOtp";
import SignIn from "@/pages/authPage/SignIn";
import SignUp from "@/pages/authPage/SignUp";
import VerifyOtp from "@/pages/authPage/VerifyOtp";
import ParentLayout from "@/layout/ParentLayout";
import ParentDashboard from "@/pages/parent/ParentDashboard";
import MyChild from "@/pages/parent/MyChild";
import Programs from "@/pages/parent/Programs";
import ProgressReports from "@/pages/parent/ProgressReports";
import CareTeam from "@/pages/parent/CareTeam";
import Authorizations from "@/pages/parent/Authorizations";
import ParentNotifications from "@/pages/parent/Notifications";
import ParentProfileSettings from "@/pages/parent/ProfileSettings";

import DirectorLayout from "@/layout/DirectorLayout";
import DirectorDashboard from "@/pages/director/DirectorDashboard";
import DirectorCases from "@/pages/director/Cases";
import DirectorPrograms from "@/pages/director/Programs";
import DirectorStaff from "@/pages/director/Staff";
import DirectorAudit from "@/pages/director/Audit";
import DirectorProfile from "@/pages/director/Profile";
import DirectorNotifications from "@/pages/director/Notifications";

import SupervisorLayout from "@/layout/SupervisorLayout";
import SupervisorDashboard from "@/pages/supervisor/SupervisorDashboard";
import SupervisorCases from "@/pages/supervisor/Cases";
import SupervisorCaseDetails from "@/pages/supervisor/CaseDetails";
import SupervisorPrograms from "@/pages/supervisor/Programs";
import SupervisorProfile from "@/pages/supervisor/Profile";
import SupervisorSessions from "@/pages/supervisor/Sessions";
import SupervisorNotifications from "@/pages/supervisor/Notifications";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "@/components/common/PrivateRoute";
import Home from "@/pages/Pages/Home";
import Services from "@/pages/Pages/Services";
import Enrollment from "@/pages/Pages/Enrollment";
import Events from "@/pages/Pages/Events";
import Careers from "@/pages/Pages/Careers";
import Scholarship from "@/pages/Pages/Scholarship";
import Contact from "@/pages/Pages/Contact";
import ClinicFiles from "@/components/admin/ClinicFiles";
import EmployeePrograms from "@/components/admin/EmployeePrograms";

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
    element: <PrivateRoute><AdminLayout /></PrivateRoute>,
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
        path: "/dashboard/programs",
        element: <EmployeePrograms />,
      },
      {
        path: "/dashboard/documents",
        element: <Documents />,
      },
      {
        path: "/dashboard/settings",
        element: <ProfileSettings />,
      },
      {
        path: "/dashboard/payroll",
        element: <Payroll />,
      },
      {
        path: "/dashboard/clinic-files",
        element: <ClinicFiles />,
      },
      {
        path: "/dashboard/schedule",
        element: <MySchedule />,
      },
      {
        path: "/dashboard/notifications",
        element: <Notifications />,
      },
    ],
  },
  // Parent routes
  {
    path: "/parent-dashboard",
    element: <PrivateRoute><ParentLayout /></PrivateRoute>,
    children: [
      {
        path: "/parent-dashboard",
        element: <ParentDashboard />,
      },
      {
        path: "/parent-dashboard/my-child",
        element: <MyChild />,
      },
      {
        path: "/parent-dashboard/programs",
        element: <Programs />,
      },
      {
        path: "/parent-dashboard/reports",
        element: <ProgressReports />,
      },
      {
        path: "/parent-dashboard/care-team",
        element: <CareTeam />,
      },
      // {
      //   path: "/parent-dashboard/authorizations",
      //   element: <Authorizations />,
      // },
      {
        path: "/parent-dashboard/notifications",
        element: <ParentNotifications />,
      },
      {
        path: "/parent-dashboard/settings",
        element: <ParentProfileSettings />,
      },
    ],
  },
  // Director routes
  {
    path: "/director-dashboard",
    element: <PrivateRoute><DirectorLayout /></PrivateRoute>,
    children: [
      {
        path: "/director-dashboard",
        element: <DirectorDashboard />,
      },
      {
        path: "/director-dashboard/cases",
        element: <DirectorCases />,
      },
      {
        path: "/director-dashboard/programs",
        element: <DirectorPrograms />,
      },
      {
        path: "/director-dashboard/staff",
        element: <DirectorStaff />,
      },
      {
        path: "/director-dashboard/audit",
        element: <DirectorAudit />,
      },
      {
        path: "/director-dashboard/profile",
        element: <DirectorProfile />,
      },
      {
        path: "/director-dashboard/notifications",
        element: <DirectorNotifications />,
      },
    ],
  },
  // Supervisor routes
  {
    path: "/supervisor-dashboard",
    element: <PrivateRoute><SupervisorLayout /></PrivateRoute>,
    children: [
      {
        path: "/supervisor-dashboard",
        element: <SupervisorDashboard />,
      },
      {
        path: "/supervisor-dashboard/cases",
        element: <SupervisorCases />,
      },
      {
        path: "/supervisor-dashboard/cases/:id",
        element: <SupervisorCaseDetails />,
      },
      {
        path: "/supervisor-dashboard/programs",
        element: <SupervisorPrograms />,
      },
      {
        path: "/supervisor-dashboard/sessions",
        element: <SupervisorSessions />,
      },
      {
        path: "/supervisor-dashboard/profile",
        element: <SupervisorProfile />,
      },
      {
        path: "/supervisor-dashboard/notifications",
        element: <SupervisorNotifications />,
      },
    ],
  },
]);

export default router;
