import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Calendar } from "lucide-react";
import FloatingIcon from "@/components/shared/FloatingIcon";
import StatCard from "@/components/shared/StatCard";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative z-10 py-12 md:py-16 bg-gradient-to-br from-[#bf9d75] via-[#895834] to-[#d8d6d5] pb-20 animate-gradient-x overflow-hidden"
    >
      <div className="container mx-auto font-karla px-4">
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          {/* LEFT: Text Content */}
          <div className="w-full lg:w-1/2 relative z-10 pt-2">
            <div className="space-y-6 max-w-xl animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-karla tracking-tight text-white leading-snug">
              Empowering <br />
                <span className="text-white">Motherhood with</span><br />
                <span className="bg-gradient-to-r from-[#ffffff] via-[#c57280] to-[#fdfdfd] text-transparent bg-clip-text animate-gradient-x">
                  Confidence & Care
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white">
              Personalized postpartum support for your wellness, mental health, and motherhood journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-[#a26931] bg-[#efeeed] hover:bg-[#f9f1de] rounded-xl px-6 py-3 font-medium group"
                >
                  <span className="flex items-center gap-2">
                    Begin Your Journey
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#eeb468] bg-transparent text-[#efeeed] hover:bg-[#7b68ee]/10 rounded-xl px-6 py-3 font-medium"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Image & Floating Icons */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl animate-fade-in-up h-[600px]">
              <img
                src="/jonathan-borba-RWgE9_lKj_Y-unsplash.jpg"
                alt="Happy mother with baby"
                className="w-full h-full object-cover"
              />
            </div>
            <FloatingIcon icon={Heart} top="16px" right="-24px" />
            <FloatingIcon icon={Brain} top="50%" left="-16px" delay={1} />
            <FloatingIcon icon={Calendar} top="calc(100% - 24px)" right="48px" delay={2} />
          </div>
        </div>

        {/* Stats Section */}
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
