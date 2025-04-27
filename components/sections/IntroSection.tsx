import React from "react";
import Image from "next/image";
import NestSenseImage from "@/public/images/9.jpg"; // Adjust the path as necessary

const IntroSection = () => {
  return (
    <section id="intro" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#765133] mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#a46c47] mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-[#765133]/10 text-[#765133] border border-[#765133]/20">
            Empowering New Mothers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#765133] mb-6">
            Your Personalized Postpartum Companion
          </h2>
          <p className="text-lg text-[#765133]/90 max-w-2xl mx-auto">
            Navigating motherhood's challenges with expert-designed tools for your mental and physical wellbeing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image with decorative frame */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#765133]/20 to-[#a46c47]/10 rounded-2xl transform rotate-1"></div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={NestSenseImage}
                alt="Mother using NestSense"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                placeholder="blur" // Optional: for blur-up effect
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#765133]/30 to-transparent"></div>
            </div>
          </div>

          {/* Steps with improved design */}
          <div className="space-y-8">
            <div className="relative pl-14 group">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#765133] flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110">
                1
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#765133]/10 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-[#765133]/30">
                <h3 className="text-xl font-semibold text-[#765133] mb-3">
                  Holistic Assessment
                </h3>
                <p className="text-gray-600">
                  Our comprehensive evaluation identifies your unique physical and emotional needs during this transformative period.
                </p>
              </div>
            </div>

            <div className="relative pl-14 group">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#a46c47] flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110">
                2
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#765133]/10 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-[#765133]/30">
                <h3 className="text-xl font-semibold text-[#765133] mb-3">
                  Custom Wellness Plan
                </h3>
                <p className="text-gray-600">
                  Receive a tailored roadmap with self-care practices, nutrition guidance, and mental health resources.
                </p>
              </div>
            </div>

            <div className="relative pl-14 group">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#765133] flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110">
                3
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#765133]/10 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-[#765133]/30">
                <h3 className="text-xl font-semibold text-[#765133] mb-3">
                  Continuous Support System
                </h3>
                <p className="text-gray-600">
                  Access our community of experts and fellow mothers through interactive tools and timely check-ins.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-[#f8f4f0]">
            <div className="text-3xl font-bold text-[#765133] mb-2">95%</div>
            <div className="text-gray-600">Report improved mood stability</div>
          </div>
          <div className="p-6 rounded-xl bg-[#f8f4f0]">
            <div className="text-3xl font-bold text-[#765133] mb-2">4.9/5</div>
            <div className="text-gray-600">Average user satisfaction</div>
          </div>
          <div className="p-6 rounded-xl bg-[#f8f4f0]">
            <div className="text-3xl font-bold text-[#765133] mb-2">24/7</div>
            <div className="text-gray-600">Access to support resources</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;