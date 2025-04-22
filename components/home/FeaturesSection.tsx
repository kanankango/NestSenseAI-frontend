
import React from "react";
import { Heart, Brain, Baby, Calendar } from "lucide-react";
import { FeatureCard } from "./FeaturesCard";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: "Personalized Care Plans",
      description:
        "Get customized wellness routines tailored to your unique postpartum journey. Our AI-powered system adapts to your needs, providing daily recommendations and adjusting based on your progress.",
      image: "/placeholder.svg",
      reverse: false,
    },
    {
      icon: Brain,
      title: "Mental Health Support",
      description:
        "Access comprehensive mental health resources and support for emotional well-being during your recovery. Connect with licensed professionals and get personalized coping strategies.",
      image: "/placeholder.svg",
      reverse: true,
    },
    {
      icon: Baby,
      title: "Expert Guidance",
      description:
        "Learn from certified professionals about postpartum and baby care. Access a library of expert-curated content and get real-time answers to your questions.",
      image: "/placeholder.svg",
      reverse: false,
    },
    {
      icon: Calendar,
      title: "Progress Tracking",
      description:
        "Monitor your recovery journey with intuitive tracking tools. Visualize your progress and celebrate milestones along the way.",
      image: "/placeholder.svg",
      reverse: true,
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-[#F5F5DC]/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
