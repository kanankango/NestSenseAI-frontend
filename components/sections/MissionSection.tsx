import React from "react";
import { Button } from "@/components/ui/button";

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe that every new mother deserves comprehensive support
              during the postpartum period. Our mission is to provide
              accessible, personalized care that addresses both physical and
              mental wellbeing.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              By combining expert knowledge, innovative technology, and
              compassionate care, we aim to transform the postpartum experience
              for mothers everywhere.
            </p>
            <div className="flex gap-4 mt-8">
              <Button className="bg-[#a87240] hover:bg-[#6a5acd] text-white">
                Join Our Community
              </Button>
              <Button
                variant="outline"
                className="border-[#a87240] text-[#a87240] hover:bg-[#a87240]/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Team of experts"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MissionSection;
