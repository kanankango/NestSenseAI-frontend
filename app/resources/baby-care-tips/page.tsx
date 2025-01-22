import { Navbar } from "./navbar";
import { HeroSection } from "./HeroSection";
import { TipsGrid } from "./TipsGrid";

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
