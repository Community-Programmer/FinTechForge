import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, User, LogOut, Menu, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import MainTicker from "../Ticker/MainTicker";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import fintechforgeLogo from "../../assets/fintechforge-logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { theme } = useTheme();
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
    <div className="flex flex-col justify-center items-center">
      <nav className="bg-white dark:bg-black shadow-md w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={fintechforgeLogo} alt="fintechForgeLogo" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">Home</Link>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">Dashboard</Link>
            <Link to="/News" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">News</Link>
            <Link to="/About" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">About</Link>
            <Link to="/Premium" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link to="/Pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center">Pricing</Link>
            <Link to="/Community">
              <Users className="w-7 h-7 border-2 border-gray-500 rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700" />
            </Link>
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
              <ModeToggle />
            </div>
          )}

          {isLoggedIn && (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm mt-2 sm:mt-0">
              <div className="ml-auto flex-1 sm:flex-initial">
                <div className="flex gap-3 relative">
                  <span className="font-bold">Logged in as: {getUserName()}</span>
                </div>
              </div>
              <ModeToggle />
            </div>
          )}

          <div className="md:hidden flex items-center">
            {!isLoggedIn && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Home</Link>
                    <Link to="/Features" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Features</Link>
                    <Link to="/About" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">About</Link>
                    <Link to="/Premium" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center">
                      Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                    </Link>
                    <Link to="/Pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center">Pricing</Link>
                    <Link to="/Login"><Button variant="outline">Log In</Button></Link>
                    <Link to="/SignUp"><Button>Sign Up</Button></Link>
                    <ModeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {isLoggedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div role="button" className="focus:outline-none cursor-pointer">
                    <UserAvatar />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4 mt-2">
                  <div className="pb-3 mb-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="font-semibold text-gray-800 dark:text-white">{getUserName()}</div>
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
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    className="cursor-pointer py-2 my-1 text-red-600 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      <MainTicker theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
};

export default Navbar;
