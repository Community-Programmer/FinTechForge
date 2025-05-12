import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout"; // Changed from "@"
import RootWrapper from "./Layout/RootWrapper"; // Changed from "@"
import DashBoardLayout from "./Layout/DashBoardLayout"; // Changed from "@"

import HomePage from "./pages/Home/Home"; // Changed from "@"
import About from "./pages/About/About"; // Changed from "@"
import Features from "./pages/Features/Features"; // Changed from "@"
import Premium from "./pages/Premium/Premium"; // Changed from "@"

import LoginForm from "./pages/Login/Login"; // Changed from "@"
import SignUpForm from "./pages/SignUp/SignUp"; // Changed from "@"
import VerificationEmailSent from "./pages/EmailVerification/VerificationEmailSent"; // Changed from "@"
import VerificationStatus from "./pages/EmailVerification/VerificationStatus"; // Changed from "@"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"; // Changed from "@"
import PasswordResetForm from "./pages/ForgotPassword/PasswordResetForm"; // Changed from "@"

import Home from "./pages/Dashboard/Home"; // Changed from "@"
import { MarketNews } from "./pages/Dashboard/News"; // Changed from "@"
import { CurrencyConverter } from "./pages/Dashboard/CurrencyConvertor"; // Changed from "@"
import StockHeatMap from "./pages/Dashboard/MarketTrends/StockHeatMap"; // Changed from "@"
import CryptoHeatmap from "./pages/Dashboard/MarketTrends/CryptoHeatmap"; // Changed from "@"
import { AiChatbot } from "./pages/Dashboard/Chatbot"; // Changed from "@"
import EtfHeatmap from "./pages/Dashboard/MarketTrends/EtfHeatmap"; // Changed from "@"
import ForexHeatMap from "./pages/Dashboard/MarketTrends/ForexHeatmap"; // Changed from "@"
import StockPage from "./pages/Dashboard/StockPage"; // Changed from "@"
import NearServices from "./pages/NearbyATM/NearServices";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Changed from "@"
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"; // Changed from "@"

// Define route arrays
const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/map",
    index: true,
    element: <NearServices />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Features",
    element: <Features />,
  },
  {
    path: "/Premium",
    element: <Premium />,
  },
];

const dashboardLayoutRoutes = [
  {
    path: "",
    index: true,
    element: <Home />,
  },
  {
    path: "news",
    index: true,
    element: <MarketNews />,
  },
  {
    path: "analysis",
    index: true,
    element: <StockPage />,
  },
  {
    path: "finance-chatbot",
    index: true,
    element: <AiChatbot />,
  },
  {
    path: "currencyconvertor",
    index: true,
    element: <CurrencyConverter />,
  },
  {
    path: "stock-heatmap",
    index: true,
    element: <StockHeatMap />,
  },
  {
    path: "crypto-heatmap",
    index: true,
    element: <CryptoHeatmap />,
  },
  {
    path: "etf-heatmap",
    index: true,
    element: <EtfHeatmap />,
  },
  {
    path: "forex-heatmap",
    index: true,
    element: <ForexHeatMap />,
  },
];

// Create the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
      },

      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "Features",
            element: <Features />,
          },
          {
            path: "/dashboard",
            element: <DashBoardLayout />,
            children: dashboardLayoutRoutes,
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
