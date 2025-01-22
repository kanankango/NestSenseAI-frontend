import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-4 relative animate-fade-up">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-serif text-[#1D4B4B] mb-8 leading-tight animate-fade-in">
            Baby Care Tips
          </h1>
          <p className="text-[#4A7A7A] text-xl mb-10 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
            Your trusted companion for baby care guidance and parenting tips.
          </p>
          <Button 
            className="bg-[#F8D7D9] hover:bg-[#F8D7D9]/90 text-[#1D4B4B] rounded-full px-10 py-7 text-lg transform transition-all duration-300 hover:scale-105 animate-fade-in"
            variant="secondary"
            style={{ animationDelay: "0.4s" }}
          >
            Explore Tips
          </Button>
        </div>
      </div>
    </section>
  );
};