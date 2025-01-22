import React from "react";

interface CardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const StyledCard: React.FC<CardProps> = ({ category, title, description, imageUrl, link }) => {
  return (
    <div className="bg-[#FAF8F8] border border-[#EAEAEA] rounded-xl shadow-md max-w-md overflow-hidden">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      {/* Content Section */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm font-semibold text-[#F48FB1] uppercase mb-2">{category}</div>
        {/* Title */}
        <h3 className="text-xl font-bold text-[#1D4B4B] mb-4">{title}</h3>
        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        {/* Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center bg-[#F48FB1] text-white font-semibold text-sm py-2 px-4 rounded-full hover:bg-[#E37696] transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default StyledCard;
