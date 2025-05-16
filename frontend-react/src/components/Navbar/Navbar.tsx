import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainTicker from "../Ticker/MainTicker";


const Navbar: React.FC = () => {

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">FinTechForge</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </Link>
            <Link to="/About" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link
              to="/Premium"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Premium
              <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link
              to="/Pricing"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Pricing
            </Link>
          </div>

          {
            !isLoggedIn &&
          <div className="hidden md:flex items-center space-x-2">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
          }


          {isLoggedIn && (<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm mt-2 sm:mt-0">
          <div className="ml-auto flex-1 sm:flex-initial">
          <div className="flex gap-3 relative">
          <span className="font-bold">Logined as: {user}</span>
          </div>
          </div>
          </div>)}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
                <Link
                  to="/Features"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Features
                </Link>
                <Link to="/About" className="text-gray-600 hover:text-gray-800">
                  About
                </Link>
                <Link
                  to="/Premium"
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Premium
                  <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                </Link>
                <Link
                  to="/Pricing"
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Pricng
                </Link>
                <Link to="/Login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/SignUp">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      <MainTicker/>
      </nav>
    </>
  );
};

export default Navbar;
