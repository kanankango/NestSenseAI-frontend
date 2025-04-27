import { Button } from "@/components/ui/button"
import { Sparkles, Leaf, Heart } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Unique gradient background with texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d8c3b0] via-[#b89276] to-[#8d5b3e] opacity-90">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#f8e9dd]/30 blur-xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -right-16 w-40 h-40 rounded-full bg-[#e6c9b3]/20 blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-10 left-1/4 w-36 h-36 rounded-full bg-[#d4b296]/25 blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Main content card with unique design */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(141,91,62,0.3)]">
          {/* Decorative top curve */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-[#d8c3b0] via-[#b89276] to-[#8d5b3e] rounded-t-3xl"></div>

          {/* Decorative icons */}
          <div className="absolute top-6 left-8 transform -translate-y-1/2">
            <Leaf className="w-6 h-6 text-white/80" />
          </div>
          <div className="absolute top-6 right-8 transform -translate-y-1/2">
            <Heart className="w-6 h-6 text-white/80" />
          </div>

          <div className="pt-16 pb-12 px-8 md:px-16 text-center">
            {/* Unique heading with decorative elements */}
            <div className="inline-block relative mb-8">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Sparkles className="w-8 h-8 text-[#b89276]" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 relative">
                Begin Your
                <span className="relative mx-2 text-[#8d5b3e]">
                  Postpartum
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 3C50 -1 150 -1 200 3C150 7 50 7 0 3Z" fill="#d8c3b0" />
                  </svg>
                </span>
                Journey Today
              </h2>
            </div>

            {/* Content with unique styling */}
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Join thousands of mothers who have found support, guidance, and community during their postpartum journey.
              Get started today and experience the difference.
            </p>

            {/* Unique button layout with decorative elements */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#b89276] to-[#8d5b3e] hover:from-[#8d5b3e] hover:to-[#6a5acd] text-white rounded-full px-8 py-6 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#b89276] text-[#8d5b3e] hover:bg-[#f8e9dd] hover:border-[#8d5b3e] rounded-full px-8 py-6 font-medium text-base transition-all duration-300"
                >
                  <span className="flex items-center gap-2">Learn More</span>
                </Button>
              </div>

              {/* Decorative dots under buttons */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-6 flex gap-2 opacity-70">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 3 ? "bg-[#8d5b3e]" : "bg-[#b89276]"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative bottom pattern */}
          <div className="h-3 bg-gradient-to-r from-[#d8c3b0] via-[#b89276] to-[#8d5b3e] opacity-50"></div>
        </div>

        {/* Testimonial badge */}
        <div className="absolute -bottom-6 right-10 transform rotate-3 bg-white rounded-xl p-3 shadow-lg border border-[#d8c3b0]/50 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b89276] to-[#8d5b3e] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Trusted by</p>
              <p className="text-sm font-semibold text-[#8d5b3e]">10,000+ mothers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
