
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Calendar, ArrowRight, Brain } from "lucide-react";
import { FloatingIcon } from "./FloatinfIcons";
import { StatCard } from "./StatCard";

export const HeroSection: React.FC = () => (
  <section className="relative z-10 pt-8 pb-16 md:py-24">
    <div className="container mx-auto px-4">
      {/* Cloud shapes decorative elements */}
      <div className="absolute top-12 left-0 rounded-full blur-xl cloud-shape-1"></div>
      <div 
        className="absolute top-48 right-10 rounded-full blur-xl"
        style={{
          width: "192px",
          height: "80px",
          background: "rgba(255, 255, 255, 0.3)"
        }}
      ></div>
      
      {/* Main hero content */}
      <div className="relative flex flex-col lg:flex-row items-center gap-8 overflow-visible">
        {/* Content left side */}
        <div className="w-full lg:w-1/2 relative z-10">
          <div 
            className="space-y-6 max-w-xl animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(111, 77, 56, 0.1)"
            }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#6F4D38]" 
              style={{animationDelay: "100ms"}}
            >
              Navigating Motherhood with{" "}
              <span 
                className="bg-gradient-to-r from-[#D9B798] via-[#EBD6B5] to-[#D9B798] text-transparent bg-clip-text animate-gradient-x"
                style={{
                  backgroundSize: "200% auto"
                }}
              >
                Confidence & Care
              </span>
            </h1>
            <p 
              className="text-lg md:text-xl text-[#6B5D4D] animate-fade-in-up" 
              style={{animationDelay: "300ms"}}
            >
              Your personalized postpartum companion offering tailored wellness plans, mental health support, and
              expert guidance for new mothers.
            </p>
            <div 
              className="animate-fade-in-up" 
              style={{animationDelay: "500ms"}}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#6F4D38] hover:bg-[#5D3F2D] text-[#F5F5DC] group"
                onClick={() => window.location.href = "/auth"}
                style={{
                  boxShadow: "0 10px 25px rgba(111, 77, 56, 0.2)"
                }}
              >
                <span className="flex items-center gap-2">
                  Begin Your Postpartum Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Image right side with overlapping design */}
        <div className="w-full lg:w-1/2 relative">
          {/* Background decorative shapes */}
          <div 
            className="absolute -top-10 -left-10 rounded-full blur-md"
            style={{
              width: "256px",
              height: "256px",
              background: "rgba(235,214,181,0.3)"
            }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 rounded-full blur-md"
            style={{
              width: "288px",
              height: "288px",
              background: "rgba(217,183,152,0.2)"
            }}
          ></div>
          
          {/* Main image */}
          <div 
            className="relative z-10 rounded-3xl overflow-hidden border-4 border-white animate-fade-in-up"
            style={{
              animationDelay: "400ms",
              boxShadow: "0 25px 50px -12px rgba(111, 77, 56, 0.25)",
              transform: "perspective(1000px) rotateY(-5deg)",
            }}
          >
            <img 
              src="../../public/1.png"

              alt="Happy mother with baby" 
              className="w-full h-auto object-cover"
              style={{
                transformOrigin: "center",
                transition: "all 0.5s ease"
              }}
            />
          </div>
          
          {/* Floating elements */}
          <FloatingIcon 
            icon={Heart} 
            top="-24px"
            right="-24px"
          />
          <FloatingIcon 
            icon={Baby} 
            top="50%"
            left="-16px"
            delay={1}
          />
          <FloatingIcon 
            icon={Calendar} 
            top="calc(100% + 24px)"
            right="48px"
            delay={2}
          />
        </div>
      </div>
      
      {/* Stats or social proof */}
      <div 
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center text-center animate-fade-in-up"
        style={{animationDelay: "600ms"}}
      >
        <StatCard number="10,000+" text="New Mothers Supported" />
        <StatCard number="97%" text="Satisfaction Rate" />
        <StatCard number="24/7" text="Expert Support Available" />
      </div>
    </div>
  </section>
);
