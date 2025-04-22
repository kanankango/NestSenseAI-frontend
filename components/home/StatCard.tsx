
import React from "react";

interface StatCardProps {
  number: string;
  text: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, text }) => (
  <div 
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-[#CFB095]/20 transform transition-all hover:scale-105 hover:shadow-lg"
    style={{
      boxShadow: "0 8px 32px rgba(171, 146, 123, 0.1)",
      transition: "all 0.3s ease"
    }}
  >
    <div className="text-3xl font-bold text-[#6F4D38]">{number}</div>
    <div className="text-[#6B5D4D]">{text}</div>
  </div>
);
