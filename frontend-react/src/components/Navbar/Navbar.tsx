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
    if (typeof user === "object" && "name" in user) return user.name;
    return String(user);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={fintechforgeLogo}
              alt="FinTechForge Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Dashboard
            </Link>
            <Link
              to="/About"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              About
            </Link>
            <Link
              to="/Premium"
              className="text-gray-600 hover:text-gray-800 flex items-center hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link
              to="/Pricing"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
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

          {/* Desktop Logged In Info */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-3 text-sm">
              <span className="font-bold">Logged in as: {getUserName()}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer focus:outline-none">
                    <UserAvatar />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4 mt-2">
                  <div className="pb-3 mb-2 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">
                      {getUserName()}
                    </div>
                    <div className="text-sm text-gray-400">Active now</div>
                  </div>
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
                    </svg>{" "}
                    Dashboard
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
            </div>
          )}

          {/* Mobile Menu */}
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
                <Link to="/Features" className="text-gray-600 hover:text-gray-800">
                  Features
                </Link>
                <Link to="/About" className="text-gray-600 hover:text-gray-800">
                  About
                </Link>
                <Link
                  to="/Premium"
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                </Link>
                <Link
                  to="/Pricing"
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Pricing
                </Link>

                {/* Auth options on mobile */}
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" onClick={() => navigate("/login")}>
                      Log In
                    </Button>
                    <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="cursor-pointer mt-4">
                        <UserAvatar />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-4 mt-2">
                      <div className="pb-3 mb-2 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">
                          {getUserName()}
                        </div>
                        <div className="text-sm text-gray-400">Active now</div>
                      </div>
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
                        </svg>{" "}
                        Dashboard
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
            </SheetContent>
          </Sheet>
        </div>
        <MainTicker />
      </nav>
    </>
  );
};

export default Navbar;
