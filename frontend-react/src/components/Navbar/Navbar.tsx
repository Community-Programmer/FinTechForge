import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainTicker from "../Ticker/MainTicker";
import { CircleUserRound,LogOut,User,X } from 'lucide-react';
import { useState } from "react";

const Navbar: React.FC = () => {
  const [dropDown,setDropDown] = useState(false);

  const handleDropDown = () =>{
    setDropDown(dropDown ? false :true);
  }

  const handleLogout = ()=>{
    // code for Logout
  }
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn );
  const user = useSelector((state: RootState) => state.auth.user );
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
          <div className="ml-auto flex-1 sm:flex-initial relative">
            <div className="flex gap-3 relative">
              <CircleUserRound  onClick={handleDropDown} className="w-10 h-10 font-normal text-zinc-600 dark:text-zinc-300 cursor-pointer transition-colors duration-200 hover:text-zinc-800 dark:hover:text-white" />
              {dropDown && (
                <div className="w-56 p-4 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-zinc-700 rounded-xl shadow-lg flex flex-col gap-4 absolute right-4 top-14 z-50">
                <X className="absolute right-5 top-3 w-6 h-6 text-zinc-600 hover:text-black dark:text-zinc-300 cursor-pointer" onClick={handleDropDown} />
                  <div className="flex flex-col items-center gap-2">
                    <CircleUserRound className="w-[70px] h-[70px] text-zinc-700 dark:text-zinc-300" />
                    <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{user}</h1>
                  </div>
                 <div className="flex flex-col gap-1 w-full">
                  <Link to="/profile" className="w-full ">
                    <button
                      className="flex items-center gap-3 w-full p-2 cursor-pointer text-left text-zinc-700 dark:text-zinc-200  hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-white  rounded-md transition-all duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                  </Link>

                  <button
                    className="flex items-center gap-3 w-full p-2 text-left text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800 hover:text-red-600  rounded-md transition-all duration-200"
                    onClick={handleLogout} 
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
                </div>
              )}
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
