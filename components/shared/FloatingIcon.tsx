
import type React from "react";

interface FloatingIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
}

const FloatingIcon = ({ icon: Icon, top, left, right, delay = 0 }: FloatingIconProps) => (
  <div
    className="absolute p-3 bg-white rounded-xl shadow-md z-20 border border-gray-100"
    style={{
      top,
      left,
      right,
      animation: `float 6s ease-in-out infinite ${delay}s`,
      boxShadow: "0 4px 12px rgba(123, 104, 238, 0.2)",
    }}
  >
    <Icon className="w-6 h-6 text-[#7b68ee]" />
  </div>
);

export default FloatingIcon;