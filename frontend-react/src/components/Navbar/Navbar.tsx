import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, User, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import MainTicker from "../Ticker/MainTicker";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import fintechforgeLogo from "../../assets/fintechforge-logo.png";

import { ModeToggle } from "@/components/mode-toggle";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const getUserName = () => {
    if (!user) return "Unknown User";
    if (user.name) return user.name;
    if (typeof user === "string") return user;
    if (typeof user === "object") return Object.values(user).join("");
    return "Unknown User";
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <img src={fintechforgeLogo} alt="fintechForgeLogo" className="h-10 w-auto" />
          </div>

          {/* Middle: Navigation (desktop only) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-200 hover:font-bold hover:shadow-lg hover:scale-105 transition">Home</Link>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-200 hover:font-bold hover:shadow-lg hover:scale-105 transition">Dashboard</Link>
            <Link to="/About" className="text-gray-600 dark:text-gray-200 hover:font-bold hover:shadow-lg hover:scale-105 transition">About</Link>
            <Link to="/Premium" className="text-gray-600 dark:text-gray-200 flex items-center hover:font-bold hover:shadow-lg hover:scale-105 transition">
              Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link to="/Pricing" className="text-gray-600 dark:text-gray-200">Pricing</Link>
          </div>

          {/* Right Side (desktop): Auth buttons + ModeToggle */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <div className="text-sm font-bold text-gray-700 dark:text-gray-200">
                Logged in as: {getUserName()}
              </div>
            )}

            {/* Toggle RIGHT of Sign Up */}
            <ModeToggle />
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Toggle LEFT of Hamburger */}
            <ModeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-6">
                  <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-gray-800">Home</Link>
                  <Link to="/Features" className="text-gray-600 dark:text-gray-200 hover:text-gray-800">Features</Link>
                  <Link to="/About" className="text-gray-600 dark:text-gray-200 hover:text-gray-800">About</Link>
                  <Link to="/Premium" className="text-gray-600 dark:text-gray-200 flex items-center hover:text-gray-800">
                    Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                  </Link>
                  <Link to="/Pricing" className="text-gray-600 dark:text-gray-200 flex items-center">Pricing</Link>

                  {!isLoggedIn ? (
                    <>
                      <Link to="/login"><Button variant="outline">Log In</Button></Link>
                      <Link to="/signup"><Button>Sign Up</Button></Link>
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div role="button" className="focus:outline-none cursor-pointer">
                            <UserAvatar />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-4 mt-2">
                          <div className="pb-3 mb-2 border-b border-gray-100 dark:border-gray-700">
                            <div className="font-semibold text-gray-800 dark:text-gray-100">{getUserName()}</div>
                            <div className="text-sm text-gray-400">Active now</div>
                          </div>

                          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer py-2 my-1 flex items-center">
                            <User className="mr-2 h-4 w-4 text-blue-500" /> Profile
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer py-2 my-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="7" height="7"></rect>
                              <rect x="14" y="3" width="7" height="7"></rect>
                              <rect x="14" y="14" width="7" height="7"></rect>
                              <rect x="3" y="14" width="7" height="7"></rect>
                            </svg> Dashboard
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => {
                            dispatch(logout());
                            navigate("/login");
                          }} className="cursor-pointer py-2 my-1 text-red-600 flex items-center">
                            <LogOut className="mr-2 h-4 w-4" /> Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <MainTicker />
      </nav>
    </>
  );
};

export default Navbar;
