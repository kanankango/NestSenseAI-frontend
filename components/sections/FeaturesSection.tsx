import React from 'react';
import { Brain, Heart, Calendar, Users, Leaf, BookOpen } from "lucide-react";
import FeatureCard from "@/components/shared/FeatureCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Features and Benefits</h2>
          <p className="text-lg text-gray-600">
            Discover the tools and resources designed to support your mental and physical wellbeing during the
            postpartum period.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title="Mental Health Support"
            description="Access resources for managing postpartum depression, anxiety, and other emotional challenges."
          />
          <FeatureCard
            icon={Heart}
            title="Self-Care Routines"
            description="Discover personalized self-care practices that fit into your busy schedule as a new mother."
          />
          <FeatureCard
            icon={Calendar}
            title="Daily Tracking"
            description="Mood, health, and wellness tracking tools to monitor your progress and identify patterns."
          />
          <FeatureCard
            icon={Users}
            title="Community Connection"
            description="Connect with other mothers who understand what you're going through."
          />
          <FeatureCard
            icon={Leaf}
            title="Personalized Diet & Workouts"
            description="Customized nutrition plans and gentle exercises designed for postpartum recovery."
          />
          <FeatureCard
            icon={BookOpen}
            title="Expert Resources"
            description="Access a library of articles, videos, and guides from healthcare professionals."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
