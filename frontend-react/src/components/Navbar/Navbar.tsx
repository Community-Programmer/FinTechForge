import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainTicker from "../Ticker/MainTicker";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import fintechforgeLogo from "../../assets/fintechforge-logo.png";

<img src={fintechforgeLogo} alt="FinTechForge Logo" />


const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  
  // Extract user name for the dropdown
  const getUserName = () => {
    if (!user) return "Unknown User";
    
    if (user.name) return user.name;
    
    if (typeof user === "string") return user;
    
    if (typeof user === "object") return Object.values(user).join("");
    
    return "Unknown User";
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={fintechforgeLogo} alt="fintechForgeLogo" className = "h-10 w-auto" />  
          </div>

          {/* Navigation links - hidden on mobile, visible on md+ screens */}
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

          {/* Auth buttons (when not logged in) - hidden on mobile, visible on md+ screens */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile navigation with user avatar dropdown for both logged-in and not logged in states */}
          <div className="flex items-center">
            {/* When logged in - show user avatar with dropdown on all screen sizes */}
            {isLoggedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div role="button" className="focus:outline-none cursor-pointer">
                    <UserAvatar />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 p-4 mt-2">
                  {/* User info section */}
                  <div className="pb-3 mb-2 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">{getUserName()}</div>
                    <div className="text-sm text-gray-400">Active now</div>
                  </div>
                  
                  {/* Menu items - shown on all screen sizes */}
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer py-2 my-1 flex items-center"
                  >
                    <User className="mr-2 h-4 w-4 text-blue-500" /> Profile
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer py-2 my-1 flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="mr-2 h-4 w-4 text-blue-500"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
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
            
            {/* When not logged in - show dropdown menu on mobile instead of hamburger */}
            {!isLoggedIn && (
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <span className="font-semibold text-lg">?</span>
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="w-60 p-4 mt-2">
                    <DropdownMenuItem
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer py-2 my-1"
                    >
                      <User className="mr-2 h-4 w-4 text-blue-500" /> Profile
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                      className="cursor-pointer py-2 my-1"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mr-2 h-4 w-4 text-blue-500"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg> Dashboard
                    </DropdownMenuItem>
                    
                    <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                      <Button variant="outline" onClick={() => navigate("/login")} className="w-full justify-center">
                        Log In
                      </Button>
                      <Button onClick={() => navigate("/signup")} className="w-full justify-center">
                        Sign Up
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
        <MainTicker/>
      </nav>
    </>
  );
};

export default Navbar;