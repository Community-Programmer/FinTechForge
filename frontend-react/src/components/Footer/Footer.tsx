import { PieChart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
 import { ArrowUp } from "lucide-react"; 


const Footer: React.FC = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-xl">
              <PieChart className="h-6 w-6 text-blue-500" />
              <span>FinTechForge</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">© 2025 FinTechForge. All rights reserved.</div>
          </div>
        </div>
         <button
       onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full 
        bg-gradient-to-br from-blue-500 to-indigo-600 text-white 
        shadow-xl hover:shadow-2xl hover:scale-110 
        hover:from-blue-600 hover:to-indigo-700
        transition-all duration-300 ease-in-out border border-white/20 
        backdrop-blur-sm hover:ring-2 hover:ring-blue-300 
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
      </footer>
    </>
  )
}

export default Footer