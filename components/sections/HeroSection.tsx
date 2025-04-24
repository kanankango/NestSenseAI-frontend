import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Calendar } from "lucide-react";
import FloatingIcon from "@/components/shared/FloatingIcon";
import StatCard from "@/components/shared/StatCard";

const HeroSection = () => {
  return (
    <section id="home" className="relative z-10 pt-16 pb-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="space-y-6 max-w-xl animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Navigating Motherhood with{" "}
                <span className="bg-gradient-to-r from-[#7b68ee] to-[#a78bfa] text-transparent bg-clip-text animate-gradient-x">
                  Confidence & Care
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Your personalized postpartum companion offering tailored wellness plans, mental health support, and expert guidance for new mothers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-white bg-[#7b68ee] hover:bg-[#6a5acd] rounded-lg px-6 py-3 font-medium group">
                  <span className="flex items-center gap-2">
                    Begin Your Journey
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button variant="outline" size="lg" className="border-[#7b68ee] text-[#7b68ee] hover:bg-[#7b68ee]/10 rounded-lg px-6 py-3 font-medium">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl animate-fade-in-up">
              <img src="/1.png" width="600" height="600" alt="Happy mother with baby" className="w-full h-auto object-cover" />
            </div>
            <FloatingIcon icon={Heart} top="-24px" right="-24px" />
            <FloatingIcon icon={Brain} top="50%" left="-16px" delay={1} />
            <FloatingIcon icon={Calendar} top="calc(100% - 24px)" right="48px" delay={2} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up">
          <StatCard number="10,000+" text="New Mothers Supported" />
          <StatCard number="97%" text="Satisfaction Rate" />
          <StatCard number="24/7" text="Expert Support Available" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;