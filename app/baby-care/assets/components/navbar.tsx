import { Button } from "@/components/ui/button";
import { Search, UserRound } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#FDF7F7]/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-serif text-[#1D4B4B] hover:opacity-80 transition-opacity animate-fade-in">
            NestSenseAI
          </a>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#4A7A7A] hover:scale-105 transition-transform">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#4A7A7A] hover:scale-105 transition-transform">
              <UserRound className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};