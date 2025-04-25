import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Apply blur after scrolling down 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-md shadow-md " : "bg-transparent"
      }`}
    >
      <div className="container flex font-karla items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center  gap-2">
          <Sparkles className="h-8 w-8 text-[#f3f3f4]" />
          <span className="font-bold  text-[#ebe9e8] text-xl">NestSense</span>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-8">
            <li>
              <a
                href="#home"
                className="text-white hover:text-[#eea468] transition-colors font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-white hover:text-[#eea468] transition-colors font-medium"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#mission"
                className="text-white hover:text-[#eea468] transition-colors font-medium"
              >
                Our Mission
              </a>
            </li>
            <li>
              <a
                href="#benefits"
                className="text-white hover:text-[#eea468] transition-colors font-medium"
              >
                Benefits
              </a>
            </li>
          </ul>
        </nav>
        <Button className="bg-[#fbfafa] hover:bg-[#f9f1de] text-[#765133]">
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Header;
