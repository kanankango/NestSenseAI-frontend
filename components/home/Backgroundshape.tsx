import React from "react";

export const BackgroundShapes: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div 
      className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30 animate-blob"
      style={{
        background: "radial-gradient(circle, rgba(207,176,149,0.2) 0%, rgba(217,183,152,0.1) 70%)",
        filter: "blur(30px)"
      }}
    ></div>
    <div 
      className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-30 animate-blob"
      style={{
        background: "radial-gradient(circle, rgba(207,176,149,0.2) 0%, rgba(217,183,152,0.1) 70%)",
        animationDelay: "2s",
        filter: "blur(30px)"
      }}
    ></div>
    <div 
      className="absolute top-1/2 left-1/2 w-full h-full rounded-full opacity-30 animate-blob"
      style={{
        background: "radial-gradient(circle, rgba(207,176,149,0.2) 0%, rgba(217,183,152,0.1) 70%)",
        animationDelay: "4s",
        filter: "blur(30px)"
      }}
    ></div>
  </div>
);
