
import React from "react";
import { LucideIcon } from "lucide-react";

interface FloatingIconProps {
  icon: LucideIcon;
  top: string;
  left?: string;
  right?: string;
  delay?: number;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({ 
  icon: Icon, 
  top, 
  left = "auto", 
  right = "auto", 
  delay = 0 
}) => (
  <div 
    className="absolute p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg z-20 border border-[#CFB095]/30"
    style={{
      top,
      left,
      right,
      animation: `float 6s ease-in-out infinite ${delay}s`,
      boxShadow: "0 10px 25px rgba(111, 77, 56, 0.1)",
      transform: "translateY(0px)"
    }}
  >
    <Icon className="w-8 h-8 text-[#D9B798]" />
  </div>
);