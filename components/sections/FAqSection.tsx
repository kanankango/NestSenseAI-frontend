"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

// Self-contained Accordion components
const AccordionContext = React.createContext<{
  value: string | null
  onValueChange: (value: string) => void
} | null>(null)

const Accordion = ({
  type = "single",
  collapsible = false,
  value,
  onValueChange,
  className = "",
  children,
}: {
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string | null
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}) => {
  const [state, setState] = React.useState<string | null>(value || null)

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      if (type === "single") {
        if (collapsible && state === itemValue) {
          setState(null)
          onValueChange?.(null as any)
        } else {
          setState(itemValue)
          onValueChange?.(itemValue)
        }
      }
    },
    [type, collapsible, state, onValueChange],
  )

  return (
    <AccordionContext.Provider value={{ value: state, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = ({
  value,
  className = "",
  children,
}: {
  value: string
  className?: string
  children: React.ReactNode
}) => {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.value === value

  return (
    <div className={className} data-state={isOpen ? "open" : "closed"}>
      {children}
    </div>
  )
}

const AccordionTrigger = ({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  [key: string]: any
}) => {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem")
  }

  const { value } = itemContext
  const isOpen = context?.value === value

  const handleClick = () => {
    context?.onValueChange(value)
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </button>
  )
}

const AccordionItemContext = React.createContext<{ value: string } | null>(null)

AccordionItem.displayName = "AccordionItem"

const AccordionContent = ({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  [key: string]: any
}) => {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem")
  }

  const { value } = itemContext
  const isOpen = context?.value === value

  return (
    <div className={`${className} ${isOpen ? "block" : "hidden"}`} data-state={isOpen ? "open" : "closed"} {...props}>
      {children}
    </div>
  )
}

// Wrap AccordionItem to provide context
const WrappedAccordionItem = (props: any) => {
  return (
    <AccordionItemContext.Provider value={{ value: props.value }}>
      <AccordionItem {...props} />
    </AccordionItemContext.Provider>
  )
}

// FAQ data
const faqs = [
  {
    question: "How does NestSense personalize care plans?",
    answer:
      "NestSense uses advanced algorithms to analyze your unique needs, preferences, and recovery progress. We consider factors like your delivery type, physical condition, and emotional well-being to create a tailored plan that evolves with you.",
  },
  {
    question: "Is NestSense suitable for all new mothers?",
    answer:
      "Yes! NestSense is designed to support mothers at all stages of the postpartum journey, whether you're a first-time mom or experienced parent. Our personalized approach ensures that you receive support that's relevant to your specific situation.",
  },
  {
    question: "How does the progress tracking work?",
    answer:
      "Our intuitive tracking system allows you to log your physical and emotional well-being daily. You'll get visual insights into your recovery journey, and our system adjusts your care plan based on your progress.",
  },
  {
    question: "Can I connect with healthcare providers through the website?",
    answer:
      "Yes, NestSense offers the option to connect with licensed healthcare providers for virtual consultations. You can also share your progress data with your existing healthcare team to ensure coordinated care.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We take your privacy seriously and employ industry-leading security measures to protect your personal information. All data is encrypted and stored securely following HIPAA guidelines.",
  },
]

const FaqSection = () => {
  const context = React.useContext(AccordionContext)

  return (
    <>
      {/* Inline styles */}
      <style jsx global>{`
        /* Base styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: Arial, Helvetica, sans-serif;
          background-color: white;
          color: #333;
        }
        
        /* Custom styles for the FAQ section */
        .accordion-content-animation {
          transition: all 0.3s ease;
        }
        
        /* Utility classes */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .relative { position: relative; }
        .absolute { position: absolute; }
        .overflow-hidden { overflow: hidden; }
        
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
        .pb-5 { padding-bottom: 1.25rem; }
        .pt-2 { padding-top: 0.5rem; }
        
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mb-16 { margin-bottom: 4rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-16 { margin-top: 4rem; }
        
        .max-w-4xl { max-width: 56rem; }
        .max-w-xl { max-width: 36rem; }
        
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        
        .w-full { width: 100%; }
        .h-5 { height: 1.25rem; }
        .w-5 { width: 1.25rem; }
        .w-64 { width: 16rem; }
        .h-64 { height: 16rem; }
        .w-80 { width: 20rem; }
        .h-80 { height: 20rem; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .w-16 { width: 4rem; }
        .h-16 { height: 4rem; }
        .w-24 { width: 6rem; }
        .h-1 { height: 0.25rem; }
        
        .rounded-full { border-radius: 9999px; }
        .rounded-2xl { border-radius: 1rem; }
        
        .space-y-6 > * + * { margin-top: 1.5rem; }
        
        .text-3xl { font-size: 1.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        
        .border-none { border: none; }
        .border-l-4 { border-left-width: 4px; }
        
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        
        .transition-all { transition-property: all; }
        .transition-transform { transition-property: transform; }
        .transition-colors { transition-property: background-color, border-color, color, fill, stroke; }
        .duration-300 { transition-duration: 300ms; }
        
        .transform { transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1); }
        .-translate-x-1\/2 { transform: translateX(-50%); }
        .-translate-y-1\/2 { transform: translateY(-50%); }
        .translate-x-1\/3 { transform: translateX(33.333333%); }
        .translate-y-1\/3 { transform: translateY(33.333333%); }
        .-translate-x-1\/2 { transform: translateX(-50%); }
        
        .inline-block { display: inline-block; }
        .shrink-0 { flex-shrink: 0; }
        
        .group-data-\[state\=open\]\:rotate-180[data-state="open"] { transform: rotate(180deg); }
        
        .hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .hover\:bg-\[\#765133\]\/5:hover { background-color: rgba(118, 81, 51, 0.05); }
        .hover\:bg-\[\#765133\]\/90:hover { background-color: rgba(118, 81, 51, 0.9); }
        .hover\:text-\[\#765133\]:hover { color: #765133; }
        
        /* Colors */
        .bg-\[\#765133\]\/5 { background-color: rgba(118, 81, 51, 0.05); }
        .bg-\[\#765133\]\/10 { background-color: rgba(118, 81, 51, 0.1); }
        .bg-\[\#765133\]\/30 { background-color: rgba(118, 81, 51, 0.3); }
        .bg-\[\#765133\] { background-color: #765133; }
        .bg-white { background-color: white; }
        
        .text-\[\#765133\] { color: #765133; }
        .text-\[\#765133\]\/70 { color: rgba(118, 81, 51, 0.7); }
        .text-\[\#765133\]\/80 { color: rgba(118, 81, 51, 0.8); }
        .text-white { color: white; }
        
        .border-\[\#765133\] { border-color: #765133; }
        .border-\[\#765133\]\/20 { border-color: rgba(118, 81, 51, 0.2); }
        
        /* Media queries */
        @media (min-width: 768px) {
          .md\:text-4xl { font-size: 2.25rem; }
          .md\:block { display: block; }
          .md\:items-center { align-items: center; }
        }
        
        @media (max-width: 767px) {
          .hidden { display: none; }
        }
      `}</style>

      <section className="py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#765133]/5 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#765133]/5 translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#765133] mb-4 relative inline-block">
              Frequently Asked Questions
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#765133]/30 rounded-full"></span>
            </h2>
            <p className="text-[#765133]/70 max-w-xl mx-auto mt-4">
              Find answers to common questions about how NestSense supports your postpartum journey
            </p>
          </div>

          <div className="relative">
            {/* Custom styled accordion */}
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <WrappedAccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-none bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="border-l-4 border-[#765133]">
                    <AccordionTrigger className="px-6 py-5 flex items-center justify-between w-full text-left text-lg font-medium text-[#765133] hover:text-[#765133] hover:bg-[#765133]/5 transition-all duration-300 group">
                      <span>{faq.question}</span>
                      <ChevronDown
                        className="h-5 w-5 text-[#765133] transition-transform duration-300 shrink-0"
                        style={{
                          transform: context?.value === `faq-${index}` ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-[#765133]/80 bg-white">
                      <div className="pl-0 border-l-0 border-[#765133]/20">{faq.answer}</div>
                    </AccordionContent>
                  </div>
                </WrappedAccordionItem>
              ))}
            </Accordion>

            {/* Decorative elements */}
            <div className="absolute -left-16 top-1/3 w-12 h-12 rounded-full bg-[#765133]/10 hidden md:block"></div>
            <div className="absolute -right-20 bottom-1/4 w-16 h-16 rounded-full bg-[#765133]/10 hidden md:block"></div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#765133]/70 mb-4">Still have questions?</p>
            <button className="px-8 py-3 bg-[#765133] text-white rounded-full font-medium hover:bg-[#765133]/90 transition-colors duration-300 shadow-md hover:shadow-lg">
              Contact Our Support Team
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default FaqSection
