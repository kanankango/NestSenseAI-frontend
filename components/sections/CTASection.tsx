import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#7b68ee] to-[#a78bfa]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Begin Your Postpartum Journey Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Join thousands of mothers who have found support, guidance, and community during their postpartum
            journey. Get started today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="text-white bg-[#7b68ee] hover:bg-[#6a5acd] rounded-lg px-8 py-3 font-medium"
            >
              <span className="flex items-center gap-2">Get Started</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#7b68ee] text-[#7b68ee] hover:bg-[#7b68ee]/10 rounded-lg px-8 py-3 font-medium"
            >
              <span className="flex items-center gap-2">Learn More</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;