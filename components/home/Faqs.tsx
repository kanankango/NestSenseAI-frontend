
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FaqItem";

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does NestSense personalize care plans?",
      answer:
        "NestSense uses advanced AI algorithms to analyze your unique needs, preferences, and recovery progress. We consider factors like your delivery type, physical condition, and emotional well-being to create a tailored plan that evolves with you.",
    },
    {
      question: "How does the progress tracking work?",
      answer:
        "Our intuitive tracking system allows you to log your physical and emotional well-being daily. You'll get visual insights into your recovery journey, and our AI adjusts your care plan based on your progress.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We take your privacy seriously and employ industry-leading security measures to protect your personal information. All data is encrypted and stored securely following HIPAA guidelines.",
    },
  ];

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#4A3F32]">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </Accordion>
      </div>
    </section>
  );
};
