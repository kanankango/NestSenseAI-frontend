import type React from "react";

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#a87240]/50 transition-all">
    <div className="w-12 h-12 bg-[#f5f3ff] rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#a87240]" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
