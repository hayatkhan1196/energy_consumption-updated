import React from "react";
import Reports from "../pages/reports/index.js";
import SignUp from "../components/auth/SignUp/signUp.js";
import Login from "../components/auth/authLogin/authLogin.js";
import ResetPasswordForm from "../components/auth/forgotPassword/forgotPassword.js";
import FormPolicy from "../pages/Policy-form/index.js";
import RuleManagement from "../pages/Rule Management/ruleManagement.js";
import LiveTracking from "./../pages/live-tracking/index";
import StatisticalAnalysis from "../pages/StatisticalAnalysis/statisticalAnalysis.js";
import StatisticalAnalysisFullWidth from "../pages/StatisticalAnalysisFullWidth/StatisticalAnalysisFullWidth.js";

const routes = [
  {
    path: "/signUp",
    exact: true,
    component: () => <SignUp />,
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/resetpasswordform",
    exact: true,
    component: () => <ResetPasswordForm />,
  },

  {
    path: "/live-tracking",
    exact: true,
    title: "Dashboard",
    component: () => <LiveTracking />,
  },

  {
    path: "/ruleManagement",
    exact: true,
    title: "Rule Management",
    component: () => <RuleManagement />,
  },
  {
    path: "/StatisticalAnalysis",
    exact: true,
    title: "Statistical Analysis",
    component: () => <StatisticalAnalysis />,
  },
  {
    path: "/formPolicy",
    exact: true,
    title: "FormPolicy",
    component: () => <FormPolicy />,
  },
  {
    path: "/StatisticalAnalysisFullWidth",
    exact: true,
    title: "StatisticalAnalysisFullWidth",
    component: () => <StatisticalAnalysisFullWidth />,
  },

  {
    path: "/reports",
    exact: true,
    title: "Reports",
    component: () => <Reports />,
  },

];

export default routes;
