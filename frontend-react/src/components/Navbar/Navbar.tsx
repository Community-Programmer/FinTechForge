import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainTicker from "../Ticker/MainTicker";
import fintechforgeLogo from "../../assets/fintechforge-logo.png";

<img src={fintechforgeLogo} alt="FinTechForge Logo" />


const Navbar: React.FC = () => {

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={fintechforgeLogo} alt="fintechForgeLogo" className = "h-10 w-auto" />  
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
