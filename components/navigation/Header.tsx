
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-[#7b68ee]" />
          <span className="font-bold text-[#7b68ee] text-xl">NestSense</span>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="#home" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Features
              </a>
            </li>
            <li>
              <a href="#mission" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#benefits" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Benefits
              </a>
            </li>
          </ul>
        </nav>
        <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">Get Started</Button>
      </div>
    </header>
  );
};

export default Header;