"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Menu, Home, Activity, Apple, BookOpen, Users, User, ChevronLeft, ChevronRight } from "lucide-react"

type Message = {
  id: string
  content: string | React.ReactNode
  isUser: boolean
  isLoading?: boolean
}

export default function NutritionExercise() {
  const [activeChat, setActiveChat] = useState<"meal" | "exercise" | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Initialize with welcome message when chat opens
  const initializeChat = (type: "meal" | "exercise") => {
    setActiveChat(type)
    setMessages([
      {
        id: "1",
        content:
          type === "meal"
            ? "Tell me what kind of meal you're looking for (e.g., 'high protein breakfast', 'quick lunch', 'lactation-friendly snack') and I'll suggest some options!"
            : "Tell me about your postpartum stage and what type of exercise you're interested in (e.g., 'gentle core exercises 6 weeks postpartum', 'pelvic floor workout')",
        isUser: false,
      },
    ])
  }

  const handleSubmit = async () => {
    if (!inputValue.trim() || !activeChat) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
    }
    setMessages((prev) => [...prev, userMessage])

    // Add loading indicator
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: "",
      isUser: false,
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage])
    setInputValue("")

    try {
      // Send query to backend
      const encodedQuery = encodeURIComponent(inputValue)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getRecommendations?query=${encodedQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to get recommendations")
      }

      const data = await response.json()
      console.log("data", data)

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        ...data.results.map(
          (item: {
            [x: string]: string | number | React.ReactNode | null | undefined
            Purpose: string
          }) => ({
            id: Date.now().toString() + Math.random(),
            isUser: false,
            content: (
              <div className="bg-white border border-[#765133]/20 rounded-xl p-4 my-2 shadow-lg">
                <div className="text-base font-semibold text-[#765133]">{item["Food Items"]}</div>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>
                    <strong className="text-[#765133]">🥗 Nutritional Value:</strong> {item["Nutritional Value"]}
                  </li>
                  <li>
                    <strong className="text-[#765133]">🎯 Purpose:</strong> {item.Purpose}
                  </li>
                  <li>
                    <strong className="text-[#765133]">🍴 Customization:</strong> {item["Customization Options"]}
                  </li>
                  <li>
                    <strong className="text-[#765133]">🌿 Dietary Restrictions:</strong> {item["Dietary Restrictions"]}
                  </li>
                  <li>
                    <strong className="text-[#765133]">🌍 Cultural Preference:</strong> {item["Cultural Preferences"]}
                  </li>
                  <li>
                    <strong className="text-[#765133]">💪 Nutritional Goal:</strong> {item["Nutritional Goals"]}
                  </li>
                </ul>
              </div>
            ),
          }),
        ),
      ])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        {
          id: Date.now().toString(),
          content: "Sorry, I encountered an error. Please try again later.",
          isUser: false,
        },
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/wellness-tracker", label: "Wellness Tracker", icon: Activity },
    { href: "/nutrition-exercise", label: "Nutrition & Exercise", icon: Apple, active: true },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/community", label: "Community", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-20" : "w-72"} transition-all duration-300 bg-white shadow-xl border-r border-[#765133]/10 flex flex-col relative hidden lg:flex`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                  Postpartum
                </h1>
                <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  {item.active && !isSidebarCollapsed && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>
                  )}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-[#765133]/10">
            <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#765133] text-sm mb-1">Need Help?</h3>
              <p className="text-xs text-gray-600 mb-3">Get support from our wellness experts</p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white"
              >
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-[#765133]/10 transform transition-transform duration-300 z-50 lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                Postpartum
              </h1>
              <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>}
                </a>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b border-[#765133]/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
              title="Open sidebar"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
              Nutrition & Exercise
            </h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Desktop Header */}
            <header className="mb-12 text-center hidden lg:block">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                  Nutrition & Exercise
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized meal and exercise recommendations for your postpartum recovery.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {/* Meal Recommender Card */}
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#765133]/10 hover:border-[#765133]/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#765133] to-[#8b6f47] shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
                        <path d="M12 19H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7" />
                        <path d="M12 7V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2" />
                        <path d="M6 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                        <path d="M18 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                      </svg>
                    </div>
                    <CardTitle className="text-[#765133] text-xl">Meal Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get personalized meal suggestions based on your dietary preferences and postpartum needs.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Quick and nutritious meal ideas</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Lactation-supporting foods</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Energy-boosting combinations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => initializeChat("meal")}
                    className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Meal Ideas
                  </Button>
                </CardFooter>
              </Card>

              {/* Exercise Recommender Card */}
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#765133]/10 hover:border-[#765133]/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#765133] to-[#8b6f47] shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 19a6 6 0 0 0-12 0" />
                        <circle cx="8" cy="9" r="4" />
                        <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
                      </svg>
                    </div>
                    <CardTitle className="text-[#765133] text-xl">Exercise Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get safe exercise suggestions tailored to your postpartum recovery stage.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Postpartum-safe workouts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Core restoration exercises</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#765133] to-[#8b6f47]"></div>
                      <span>Pelvic floor rehabilitation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => initializeChat("exercise")}
                    className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Exercise Ideas
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Window */}
      {activeChat && (
        <div
          className={`fixed ${isMinimized ? "bottom-4 right-4 w-16 h-16" : "bottom-4 right-4 w-full max-w-md"} transition-all duration-300 z-50`}
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300"
              aria-label={`Open ${activeChat} chat`}
              title={`Open ${activeChat} chat`}
            >
              {activeChat === "meal" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
                  <path d="M12 19H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7" />
                  <path d="M12 7V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2" />
                  <path d="M6 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                  <path d="M18 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 19a6 6 0 0 0-12 0" />
                  <circle cx="8" cy="9" r="4" />
                  <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
                </svg>
              )}
            </button>
          ) : (
            <Card className="shadow-2xl border border-[#765133]/20 h-[500px] flex flex-col">
              <div className="p-4 rounded-t-lg flex justify-between items-center bg-gradient-to-r from-[#765133] to-[#8b6f47]">
                <h3 className="text-white font-bold">
                  {activeChat === "meal" ? "Meal Recommendation Assistant" : "Exercise Recommendation Assistant"}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                    aria-label="Minimize chat"
                    title="Minimize chat"
                  >
                    <span className="text-lg font-bold">−</span>
                  </button>
                  <button
                    onClick={() => setActiveChat(null)}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                    aria-label="Close chat"
                    title="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs md:max-w-md p-4 rounded-lg shadow-sm ${
                          message.isUser
                            ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white"
                            : "bg-white text-gray-700 border border-[#765133]/10"
                        }`}
                      >
                        {message.isLoading ? (
                          <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#765133] animate-bounce"></div>
                            <div
                              className="w-2 h-2 rounded-full bg-[#765133] animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-[#765133] animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        ) : (
                          <div>{message.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-[#765133]/20 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder={
                      activeChat === "meal"
                        ? "e.g. high protein breakfast"
                        : "e.g. gentle core exercises 6 weeks postpartum"
                    }
                    className="flex-1 border-[#765133]/30 focus:border-[#765133] focus:ring-[#765133]/20"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white transition-all duration-300"
                    disabled={!inputValue.trim()}
                  >
                    Send
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {activeChat === "meal"
                    ? 'Tip: Be specific about your needs (e.g., "dairy-free", "quick to prepare", "high iron")'
                    : 'Tip: Mention any specific concerns (e.g., "diastasis recti", "c-section recovery")'}
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
