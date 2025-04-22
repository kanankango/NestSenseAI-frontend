
import React from "react";
import { 
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQProps;
  index: number;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq, index }) => {
  const { question, answer } = faq;
  
  return (
    <AccordionItem
      value={`item-${index}`}
      className="bg-[#EBD6B5] rounded-2xl px-6 shadow-sm border border-[#CFB095]/40"
    >
      <AccordionTrigger className="text-lg font-medium text-[#4A3F32] hover:text-[#6B5D4D]">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-[#6B5D4D]">{answer}</AccordionContent>
    </AccordionItem>
  );
};