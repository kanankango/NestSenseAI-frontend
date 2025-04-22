
import React from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ show, onClick }) => (
  <button
    onClick={onClick}
    className={`fixed right-8 bottom-8 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
    }`}
    style={{
      background: "linear-gradient(135deg, #CFB095 0%, #D9B798 100%)",
      color: "#4A3F32",
      boxShadow: "0 10px 15px -3px rgba(111, 77, 56, 0.2), 0 4px 6px -2px rgba(111, 77, 56, 0.1)"
    }}
    aria-label="Scroll to top"
  >
    <ArrowUp className="w-6 h-6" />
  </button>
);
