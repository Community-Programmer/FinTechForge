import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout"; // Changed from "@"
import RootWrapper from "./Layout/RootWrapper"; // Changed from "@"
import DashBoardLayout from "./Layout/DashBoardLayout"; // Changed from "@"

import HomePage from "./pages/Home/Home"; // Changed from "@"
import About from "./pages/About/About"; // Changed from "@"
import Features from "./pages/Features/Features"; // Changed from "@"
import Premium from "./pages/Premium/Premium"; // Changed from "@"


import Pricing from "./pages/Pricing/Pricing"; 
import Community from "./pages/Community/Community";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import VerificationEmailSent from "./pages/EmailVerification/VerificationEmailSent";
import VerificationStatus from "./pages/EmailVerification/VerificationStatus";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Dashboard/Home";
import { MarketNews } from "./pages/Dashboard/News";
import { CurrencyConverter } from "./pages/Dashboard/CurrencyConvertor";
import StockHeatMap from "./pages/Dashboard/MarketTrends/StockHeatMap";
import CryptoHeatmap from "./pages/Dashboard/MarketTrends/CryptoHeatmap";
import { AiChatbot } from "./pages/Dashboard/Chatbot";
import EtfHeatmap from "./pages/Dashboard/MarketTrends/EtfHeatmap";
import ForexHeatMap from "./pages/Dashboard/MarketTrends/ForexHeatmap";
import StockPage from "./pages/Dashboard/StockPage";
import Portfolio from "./pages/Dashboard/Portfolio";
import News from "./pages/News/News";

import Profile from "./pages/Profile/Profile";
import EducationHub from "./pages/Education/EducationHub";
import LoginForm from "./pages/Login/Login";
import SignUpForm from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import PasswordResetForm from "./pages/ForgotPassword/PasswordResetForm";
import NearServices from "./pages/NearbyATM/NearServices";


const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },

    {
    path:"/News",
    index : true,
    element : <News/>
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
  {
    path:"/Pricing",
    element:<Pricing/>
  },
  {

    path:"/Community",
    element:<Community/>

  },
  {
    path: "/profile",
    element: <Profile />,
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
  {
    path: "portfolio",
    index: true,
    element: <Portfolio />,
  },
];

// Create the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
      },
      { path: "/education", element: <EducationHub /> },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/Features",
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
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
