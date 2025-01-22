import { Navbar } from "./assets/components/navbar";
import { HeroSection } from "./assets/components/HeroSection";
import { TipsGrid } from "./assets/components/TipsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FDF7F7]">
      <Navbar />
      <HeroSection />
      <TipsGrid />
    </div>
  );
};

export default Index;