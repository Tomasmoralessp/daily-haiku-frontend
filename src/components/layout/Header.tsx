
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 flex justify-between items-center backdrop-blur-lg bg-black/70 border-b border-white/5">
      <Link to="/" className="font-playfair text-xl tracking-wider text-white">
        DailyHaiku 🌸
      </Link>
      <Link
        to="/history"
        className="text-sm text-gray-300 hover:text-pink-300 transition font-medium"
      >
        History
      </Link>
      <Link
        to="/about"
        className="text-sm text-gray-300 hover:text-pink-300 transition font-medium"
      >
        About the project
      </Link>
      
    </header>
  );
};


export default Header;
