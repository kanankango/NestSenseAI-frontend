'use client'

import { AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  isLoading?: boolean;
}

export default function NutritionExercise() {
  const [activeChat, setActiveChat] = useState<'meal' | 'exercise' | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  
  // Initialize with welcome message when chat opens
  const initializeChat = (type: 'meal' | 'exercise') => {
    setActiveChat(type)
    setMessages([{
      id: '1',
      content: type === 'meal' 
        ? "Tell me what kind of meal you're looking for (e.g., 'high protein breakfast', 'quick lunch', 'lactation-friendly snack') and I'll suggest some options!" 
        : "Tell me about your postpartum stage and what type of exercise you're interested in (e.g., 'gentle core exercises 6 weeks postpartum', 'pelvic floor workout')",
      isUser: false
    }])
  }

  const handleSubmit = async () => {
    if (!inputValue.trim() || !activeChat) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true
    }
    setMessages(prev => [...prev, userMessage])
    
    // Add loading indicator
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: '',
      isUser: false,
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMessage])
    
    setInputValue('')

    try {
      // Send query to backend
      const encodedQuery = encodeURIComponent(inputValue);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getRecommendations?query=${encodedQuery}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }

      const data = await response.json()
      console.log("data"+data);
      
      setMessages(prev => [
        ...prev.filter(msg => !msg.isLoading),
        ...data.results.map((item: {
          [x: string]: string | number | React.ReactNode | null | undefined;
          Purpose: string;
        }) => ({
          id: Date.now().toString() + Math.random(),
          isUser: false,
          content: (
            <div className="bg-white border border-gray-200 rounded-xl p-4 my-2 shadow">
              <div className="text-base font-semibold text-gray-800">
                {item["Food Items"]}
              </div>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li><strong>🥗 Nutritional Value:</strong> {item["Nutritional Value"]}</li>
                <li><strong>🎯 Purpose:</strong> {item.Purpose}</li>
                <li><strong>🍴 Customization:</strong> {item["Customization Options"]}</li>
                <li><strong>🌿 Dietary Restrictions:</strong> {item["Dietary Restrictions"]}</li>
                <li><strong>🌍 Cultural Preference:</strong> {item["Cultural Preferences"]}</li>
                <li><strong>💪 Nutritional Goal:</strong> {item["Nutritional Goals"]}</li>
              </ul>
            </div>
          )
        }))
      ]);
      
      
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev.filter(msg => !msg.isLoading),
        {
          id: Date.now().toString(),
          content: 'Sorry, I encountered an error. Please try again later.',
          isUser: false
        }
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#f9f5f2] to-[#f0e9e4] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#75B5AE]/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F1C0C9]/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#2C3E50] via-[#75B5AE] to-[#F1C0C9] text-transparent bg-clip-text">
                  Postpartum Wellness
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized meal and exercise recommendations for your postpartum recovery.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {/* Meal Recommender Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-0">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#75B5AE]/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#75B5AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
                        <path d="M12 19H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7"/>
                        <path d="M12 7V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2"/>
                        <path d="M6 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                        <path d="M18 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </div>
                    <CardTitle className="text-[#2C3E50]">Meal Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Get personalized meal suggestions based on your dietary preferences and postpartum needs.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#75B5AE]"></span>
                      Quick and nutritious meal ideas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#75B5AE]"></span>
                      Lactation-supporting foods
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#75B5AE]"></span>
                      Energy-boosting combinations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => initializeChat('meal')}
                    className="w-full bg-[#2C3E50] hover:bg-[#3d5165] text-white"
                  >
                    Get Meal Ideas
                  </Button>
                </CardFooter>
              </Card>

              {/* Exercise Recommender Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-0">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#F1C0C9]/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1C0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 19a6 6 0 0 0-12 0"/>
                        <circle cx="8" cy="9" r="4"/>
                        <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/>
                      </svg>
                    </div>
                    <CardTitle className="text-[#2C3E50]">Exercise Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Get safe exercise suggestions tailored to your postpartum recovery stage.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F1C0C9]"></span>
                      Postpartum-safe workouts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F1C0C9]"></span>
                      Core restoration exercises
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F1C0C9]"></span>
                      Pelvic floor rehabilitation
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => initializeChat('exercise')}
                    className="w-full bg-[#F1C0C9] hover:bg-[#e8b0bc] text-[#2C3E50]"
                  >
                    Get Exercise Ideas
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        {activeChat && (
          <div className={`fixed ${isMinimized ? 'bottom-4 right-4 w-16 h-16' : 'bottom-4 right-4 w-full max-w-md'} transition-all duration-300 z-50`}>
            {isMinimized ? (
              <button 
                onClick={() => setIsMinimized(false)}
                className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center ${activeChat === 'meal' ? 'bg-[#75B5AE]' : 'bg-[#F1C0C9]'}`}
              >
                {activeChat === 'meal' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
                    <path d="M12 19H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7"/>
                    <path d="M12 7V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2"/>
                    <path d="M6 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                    <path d="M18 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 19a6 6 0 0 0-12 0"/>
                    <circle cx="8" cy="9" r="4"/>
                    <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/>
                  </svg>
                )}
              </button>
            ) : (
              <Card className="shadow-xl border-0 h-[500px] flex flex-col">
                <div className={`p-4 rounded-t-lg flex justify-between items-center ${activeChat === 'meal' ? 'bg-[#75B5AE]' : 'bg-[#F1C0C9]'}`}>
                  <h3 className="text-white font-bold">
                    {activeChat === 'meal' ? 'Meal Recommendation Assistant' : 'Exercise Recommendation Assistant'}
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="text-white hover:text-gray-200"
                    >
                      _
                    </button>
                    <button 
                      onClick={() => setActiveChat(null)}
                      className="text-white hover:text-gray-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md p-4 rounded-lg shadow-sm ${
                            message.isUser 
                              ? 'bg-[#2C3E50] text-white' 
                              : 'bg-white text-gray-700'
                          }`}
                        >
                          {message.isLoading ? (
                            <div className="flex gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder={
                        activeChat === 'meal' 
                          ? "e.g. high protein breakfast" 
                          : "e.g. gentle core exercises 6 weeks postpartum"
                      }
                      className="flex-1"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button 
                      onClick={handleSubmit}
                      className={activeChat === 'meal' ? 'bg-[#75B5AE]' : 'bg-[#F1C0C9]'}
                      disabled={!inputValue.trim()}
                    >
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {activeChat === 'meal' 
                      ? 'Tip: Be specific about your needs (e.g., "dairy-free", "quick to prepare", "high iron")'
                      : 'Tip: Mention any specific concerns (e.g., "diastasis recti", "c-section recovery")'}
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}