import React from "react";

const IntroSection = () => {
  return (
    <section id="intro" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Take Control of Your Postpartum Journey
          </h2>
          <p className="text-lg text-gray-600">
            New mothers often experience physical and mental health challenges,
            including mood swings, depression, insecurity, and difficulty in
            establishing routines. Our platform provides the tools and support
            you need during this transformative time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Mother using NestSense"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#a87240]">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Personalized Assessment
                </h3>
                <p className="text-gray-600">
                  Complete a comprehensive assessment to help us understand your
                  unique needs and challenges.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#a87240]">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Tailored Care Plan
                </h3>
                <p className="text-gray-600">
                  Receive a customized wellness plan designed specifically for
                  your postpartum journey.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-[#a87240]">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Ongoing Support
                </h3>
                <p className="text-gray-600">
                  Access expert guidance, community support, and resources
                  whenever you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
