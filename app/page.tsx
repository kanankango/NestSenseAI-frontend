"use client"

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Header from "../components/navigation/Header";
import HeroSection from "../components/sections/HeroSection";
import IntroSection from "../components/sections/IntroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import MissionSection from "../components/sections/MissionSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import FaqSection from "../components/sections/FAqSection";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/layout/footer";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-gradient-x {
      animation: gradient-x 10s ease infinite;
      background-size: 200% 200%;
    }
  `;

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <style>{animationStyles}</style>
      <Header />
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <IntroSection />
        <FeaturesSection />
        <MissionSection />
        <BenefitsSection />
        <FaqSection />
        <CTASection />

        <button
          onClick={scrollToTop}
          className={`fixed right-8 bottom-8 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(135deg, #7b68ee 0%, #6a5acd 100%)",
            color: "white",
            boxShadow: "0 10px 15px -3px rgba(123, 104, 238, 0.2), 0 4px 6px -2px rgba(123, 104, 238, 0.1)",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Index;