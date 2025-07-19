"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'mission', 'benefits'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth"
      });
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    router.push('/auth');
  };

  // Check if link is active
  const isActive = (section: string) => activeSection === section;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex font-karla items-center justify-between h-16 px-4 mx-auto">
        <Link href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-[#f3f3f4]" />
          <span className="font-bold font-karla text-[#ebe9e8] text-xl">NestSense</span>
        </Link>
        
        <nav>
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link
                href="#home"
                onClick={(e) => scrollToSection(e, 'home')}
                className={`transition-colors font-medium ${
                  isActive('home') 
                    ? "text-[#eea468]" 
                    : "text-white hover:text-[#eea468]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                onClick={(e) => scrollToSection(e, 'features')}
                className={`transition-colors font-medium ${
                  isActive('features') 
                    ? "text-[#eea468]" 
                    : "text-white hover:text-[#eea468]"
                }`}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#mission"
                onClick={(e) => scrollToSection(e, 'mission')}
                className={`transition-colors font-medium ${
                  isActive('mission') 
                    ? "text-[#eea468]" 
                    : "text-white hover:text-[#eea468]"
                }`}
              >
                Our Mission
              </Link>
            </li>
            <li>
              <Link
                href="#benefits"
                onClick={(e) => scrollToSection(e, 'benefits')}
                className={`transition-colors font-medium ${
                  isActive('benefits') 
                    ? "text-[#eea468]" 
                    : "text-white hover:text-[#eea468]"
                }`}
              >
                Benefits
              </Link>
            </li>
          </ul>
        </nav>
        
        {loading ? (
          <Button className="bg-[#fbfafa] hover:bg-[#f9f1de] text-[#765133] opacity-50" disabled>
            Loading...
          </Button>
        ) : user ? (
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-[#fbfafa] hover:bg-[#f9f1de] text-[#765133]">
                Dashboard
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              className="bg-[#fbfafa] hover:bg-[#f9f1de] text-[#765133]"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth">
            <Button className="bg-[#fbfafa] hover:bg-[#f9f1de] text-[#765133]">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;