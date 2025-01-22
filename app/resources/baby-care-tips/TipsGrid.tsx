import { TipCard } from "./TipCard";
import { cardsData } from "./cardsData";

export const TipsGrid = () => {
  return (
    <section className="py-20 px-4 bg-[#FDF7F7]/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {cardsData.map((tip, index) => (
            <div 
              key={tip.id} 
              className="animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${index % 3 * 20}px)`
              }}
            >
              <a href={tip.link} target="_blank" rel="noopener noreferrer">
                <TipCard {...tip} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};