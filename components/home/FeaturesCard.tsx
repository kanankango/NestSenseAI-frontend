
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  reverse: boolean;
}

interface FeatureCardProps {
  feature: FeatureProps;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const { icon: Icon, title, description, image, reverse } = feature;
  
  return (
    <div
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 animate-fade-in-up`}
      style={{animationDelay: `${index * 100 + 200}ms`}}
    >
      <div className="flex-1 text-center md:text-left">
        <div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl p-4 mb-6"
          style={{
            background: "linear-gradient(135deg, #CFB095 0%, #D9B798 100%)",
            boxShadow: "0 10px 15px -3px rgba(111, 77, 56, 0.1), 0 4px 6px -2px rgba(111, 77, 56, 0.05)"
          }}
        >
          <Icon className="w-full h-full text-[#4A3F32]" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-[#4A3F32]">{title}</h3>
        <p className="text-xl text-[#6B5D4D]">{description}</p>
      </div>
      <div className="flex-1 relative">
        <div 
          className="aspect-video rounded-xl overflow-hidden shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(207, 176, 149, 0.2) 0%, rgba(217, 183, 152, 0.2) 100%)",
            boxShadow: "0 20px 25px -5px rgba(111, 77, 56, 0.1), 0 10px 10px -5px rgba(111, 77, 56, 0.04)"
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
