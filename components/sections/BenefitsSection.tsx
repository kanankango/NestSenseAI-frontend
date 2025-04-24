
import React from 'react';

const BenefitsSection = () => {
  const benefitSections = [
    {
      title: "For New Mothers",
      benefits: [
        "Reduced feelings of isolation and anxiety",
        "Improved confidence in parenting abilities",
        "Better physical recovery through guided self-care",
        "Enhanced bonding with baby through mindfulness practices"
      ]
    },
    {
      title: "For Healthcare Providers",
      benefits: [
        "Extended care beyond hospital or clinic visits",
        "Better patient outcomes through continuous support",
        "Early identification of postpartum complications",
        "Comprehensive data to inform personalized care plans"
      ]
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Benefits of NestSense</h2>
          <p className="text-lg text-gray-600">
            See how our platform has helped thousands of mothers navigate their postpartum journey with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {benefitSections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;