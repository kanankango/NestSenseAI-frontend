
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does NestSense personalize care plans?",
    answer: "NestSense uses advanced algorithms to analyze your unique needs, preferences, and recovery progress. We consider factors like your delivery type, physical condition, and emotional well-being to create a tailored plan that evolves with you.",
  },
  {
    question: "Is NestSense suitable for all new mothers?",
    answer: "Yes! NestSense is designed to support mothers at all stages of the postpartum journey, whether you're a first-time mom or experienced parent. Our personalized approach ensures that you receive support that's relevant to your specific situation.",
  },
  {
    question: "How does the progress tracking work?",
    answer: "Our intuitive tracking system allows you to log your physical and emotional well-being daily. You'll get visual insights into your recovery journey, and our system adjusts your care plan based on your progress.",
  },
  {
    question: "Can I connect with healthcare providers through the website?",
    answer: "Yes, NestSense offers the option to connect with licensed healthcare providers for virtual consultations. You can also share your progress data with your existing healthcare team to ensure coordinated care.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We take your privacy seriously and employ industry-leading security measures to protect your personal information. All data is encrypted and stored securely following HIPAA guidelines.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="bg-gray-50 rounded-xl px-6 shadow-sm border border-gray-200">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-[#7b68ee]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;