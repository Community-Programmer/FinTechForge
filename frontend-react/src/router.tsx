// router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/Layout/MainLayout";
import RootWrapper from "@/Layout/RootWrapper";
import DashBoardLayout from "@/Layout/DashBoardLayout";

import HomePage from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Features from "@/pages/Features/Features";
import Premium from "@/pages/Premium/Premium";

import LoginForm from "@/pages/Login/Login";
import SignUpForm from "@/pages/SignUp/SignUp";
import VerificationEmailSent from "@/pages/EmailVerification/VerificationEmailSent";
import VerificationStatus from "@/pages/EmailVerification/VerificationStatus";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import PasswordResetForm from "@/pages/ForgotPassword/PasswordResetForm";

import Home from "@/pages/Dashboard/Home";
import { MarketNews } from "@/pages/Dashboard/News";
import { CurrencyConverter } from "@/pages/Dashboard/CurrencyConvertor";
import StockHeatMap from "@/pages/Dashboard/MarketTrends/StockHeatMap";
import CryptoHeatmap from "@/pages/Dashboard/MarketTrends/CryptoHeatmap";
import { AiChatbot } from "@/pages/Dashboard/Chatbot";
import EtfHeatmap from "@/pages/Dashboard/MarketTrends/EtfHeatmap";
import ForexHeatMap from "@/pages/Dashboard/MarketTrends/ForexHeatmap";
import StockPage from "@/pages/Dashboard/StockPage";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    errorElement: <ErrorBoundary />, // Added error boundary at rootlevel
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "About",
            element: <About />,
          },
        ],
      },

      // Add protectedRoute for default path "/"
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "Features",
            element: <Features />,
          },
          {
            path: "Premium",
            element: <Premium />,
          },
        ],
      },

      // Added prtectedRoute for dashboard
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <DashBoardLayout />,
            errorElement: <ErrorBoundary />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "news",
                element: <MarketNews />,
              },
              {
                path: "analysis",
                element: <StockPage />,
              },
              {
                path: "finance-chatbot",
                element: <AiChatbot />,
              },
              {
                path: "currencyconvertor",
                element: <CurrencyConverter />,
              },
              {
                path: "stock-heatmap",
                element: <StockHeatMap />,
              },
              {
                path: "crypto-heatmap",
                element: <CryptoHeatmap />,
              },
              {
                path: "etf-heatmap",
                element: <EtfHeatmap />,
              },
              {
                path: "forex-heatmap",
                element: <ForexHeatMap />,
              },
            ],
          },
        ],
      },
      {
        path: "/Login",
        element: <LoginForm />,
      },
      {
        path: "/SignUp",
        element: <SignUpForm />,
      },
      {
        path: "/verifymail",
        element: <VerificationEmailSent />,
      },
      {
        path: "/verifymail/:verificationToken",
        element: <VerificationStatus />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <PasswordResetForm />,
      },
    ],
  },
]);

export default router;
