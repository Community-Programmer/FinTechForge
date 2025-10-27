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
import { useTheme } from "@/components/theme-provider";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Function to close the mobile sheet when navigating
  const handleMobileNavigation = () => {
    setIsSheetOpen(false);
  };

  // Function to handle logo click - navigate to homepage
  const handleLogoClick = () => {
    navigate('/');
  };

  const getUserName = () => {
    if (!user) return "Unknown User";
    if (user.name) return user.name;
    if (typeof user === "string") return user;
    if (typeof user === "object") return Object.values(user).join("");
    return "Unknown User";
  };

  // Shared hover style for desktop nav links:
  // - inline-flex limits underline to text width
  // - after pseudo adds animated underline without layout shift
  // - uniform timing/colors for both themes
  const navLink =
    "relative inline-flex items-center font-medium " +
    "text-gray-700 dark:text-gray-300 " +
    "transition-colors duration-200 ease-out " +
    "hover:text-gray-900 dark:hover:text-white " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
    "after:bg-current after:transition-all after:duration-200 hover:after:w-full";

  return (
    <div className="flex flex-col justify-center items-center">
      <nav className="bg-white dark:bg-black shadow-md w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo - Clickable and navigates to homepage */}
          <div 
            className="flex items-center space-x-4 cursor-pointer transition-opacity hover:opacity-80"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoClick();
              }
            }}
            aria-label="Go to homepage"
          >
            <img src={fintechforgeLogo} alt="FinTechForge Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop navigation with standardized hover */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Removed hover:font-bold to avoid size shift; underline and color now consistent */}
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/dashboard" className={navLink}>Dashboard</Link>
            <Link to="/News" className={navLink}>News</Link>
            <Link to="/About" className={navLink}>About</Link>
            <Link to="/Premium" className={navLink}>
              Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link to="/Pricing" className={navLink}>Pricing</Link>
            <Link to="/Community" className={navLink}>Community</Link>
            <Link to="/faq" className={navLink}>FAQ</Link>
            <Link to="/feedback" className={navLink}>Feedback</Link>
          </div>

          {/* Auth actions (desktop) */}
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

          {/* Logged-in summary (desktop) */}
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

          {/* Mobile: Sheet-trigger and user menu */}
          <div className="md:hidden flex items-center">
            {!isLoggedIn && (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>

                {/* Keep right-side menu; add onClick handlers to close sheet */}
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link 
                      to="/" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      onClick={handleMobileNavigation}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/Features" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      onClick={handleMobileNavigation}
                    >
                      Features
                    </Link>
                    <Link 
                      to="/About" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      onClick={handleMobileNavigation}
                    >
                      About
                    </Link>
                    <Link 
                      to="/Premium" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                      onClick={handleMobileNavigation}
                    >
                      Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                    </Link>
                    <Link 
                      to="/Pricing" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                      onClick={handleMobileNavigation}
                    >
                      Pricing
                    </Link>
                    <Link 
                      to="/faq" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                      onClick={handleMobileNavigation}
                    >
                      FAQ
                    </Link>
                    <Link 
                      to="/feedback" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                      onClick={handleMobileNavigation}
                    >
                      Feedback
                    </Link>
                    <Link to="/Login" onClick={handleMobileNavigation}>
                      <Button variant="outline">Log In</Button>
                    </Link>
                    <Link to="/SignUp" onClick={handleMobileNavigation}>
                      <Button>Sign Up</Button>
                    </Link>
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
        </div>
      </nav>

      <MainTicker theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
};

export default Navbar;
