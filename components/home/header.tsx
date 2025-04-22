
import React from "react";
import { Logo } from "@/components/Logo";

export const Header: React.FC = () => {
  return (
    <header className="bg-[#F5F5DC]/80 backdrop-blur-sm py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center" title="Home">
          <Logo />
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-[#6B5D4D] hover:text-[#4A3F32] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-[#6B5D4D] hover:text-[#4A3F32] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-[#6B5D4D] hover:text-[#4A3F32] transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
