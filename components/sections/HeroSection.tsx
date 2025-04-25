import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative z-10 pb-20 md:py-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/jonathan-borba-RWgE9_lKj_Y-unsplash.jpg')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/30 z-0" />

      <div className="container mx-auto px-4 pt-24 relative z-10">
        {/* sticky header */}
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 max-w-xl animate-fade-in-up">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold space-y-2 font-karla tracking-tight text-white leading-tight">
                <span className="block">Empowering </span>
                <span className="block">Motherhood with</span>
                <span className="block bg-gradient-to-r from-[#f4f7f6] via-[#efe2d8] to-[#ed5c18] text-transparent bg-clip-text animate-gradient-x">
                  Confidence & Care
                </span>
              </h1>
              <p className="text-lg md:text-l font-karla text-white/90">
                Personalized postpartum support for your wellness, mental
                health, and motherhood journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-white text-base bg-[#a87240] hover:bg-[#cd926d] rounded-lg px-6 py-3 font-medium group"
                >
                  <span className="flex items-center  font-karla gap-2">
                    Begin Your Journey
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#a46c47] bg-transparent  text-base font-karla text-[#ffffff] hover:bg-[#765133]/10 rounded-lg px-6 py-3 font-medium"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up">
          <StatCard number="10,000+" text="New Mothers Supported" />
          <StatCard number="97%" text="Satisfaction Rate" />
          <StatCard number="24/7" text="Expert Support Available" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
