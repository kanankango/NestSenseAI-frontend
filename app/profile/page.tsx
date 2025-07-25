"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarLayout } from "@/components/SidebarLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Upload, Save } from "lucide-react"

// Define a type for locationData
type LocationData = {
  [country: string]: {
    states: string[]
    cities: {
      [state: string]: string[]
    }
  }
}

const locationData: LocationData = {
  "United States": {
    states: ["California", "New York", "Texas", "Florida"],
    cities: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      "New York": ["New York City", "Buffalo", "Albany"],
      Texas: ["Houston", "Austin", "Dallas"],
      Florida: ["Miami", "Orlando", "Tampa"],
    },
  },
  "United Kingdom": {
    states: ["England", "Scotland", "Wales"],
    cities: {
      England: ["London", "Manchester", "Birmingham"],
      Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
      Wales: ["Cardiff", "Swansea", "Newport"],
    },
  },
  Canada: {
    states: ["Ontario", "British Columbia", "Quebec"],
    cities: {
      Ontario: ["Toronto", "Ottawa", "Hamilton"],
      "British Columbia": ["Vancouver", "Victoria", "Kelowna"],
      Quebec: ["Montreal", "Quebec City", "Laval"],
    },
  },
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    birthDate: "",
    goals: "",
    country: "",
    state: "",
    city: "",
    weeksSinceChildbirth: "",
    birthType: "Natural",
    birthTiming: "As Planned",
  })

  useEffect(() => {
    if (formData.country) {
      setAvailableStates(locationData[formData.country].states)
      setFormData((prev) => ({ ...prev, state: "", city: "" }))
    }
  }, [formData.country])

  useEffect(() => {
    if (formData.state && formData.country) {
      setAvailableCities(locationData[formData.country].cities[formData.state])
      setFormData((prev) => ({ ...prev, city: "" }))
    }
  }, [formData.state])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setProfileImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    setIsEditing(false)
    router.push("/dashboard")
  }

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#765133] text-transparent bg-clip-text mb-4">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and track your postpartum journey
          </p>
        </div>

        {/* Profile Image and Quick Stats */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Image Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#765133] to-[#8b6f47] p-1 shadow-2xl">
                <Avatar className="w-full h-full border-4 border-white">
                  {profileImage ? (
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white text-3xl font-bold">
                      {formData.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              {isEditing && (
                <label className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-[#765133]/20">
                  <Upload className="w-5 h-5 text-[#765133]" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                    title="Upload Profile Image"
                  />
                </label>
              )}
            </div>

            {/* Quick Info Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-gradient-to-br from-[#765133]/5 to-[#8b6f47]/10 rounded-2xl p-6 text-center border border-[#765133]/10">
                <div className="text-2xl font-bold text-[#765133] mb-1">{formData.weeksSinceChildbirth || "0"}</div>
                <div className="text-sm text-gray-600">Weeks Postpartum</div>
              </div>
              <div className="bg-gradient-to-br from-[#765133]/5 to-[#8b6f47]/10 rounded-2xl p-6 text-center border border-[#765133]/10">
                <div className="text-2xl font-bold text-[#765133] mb-1">{formData.birthType || "Not Set"}</div>
                <div className="text-sm text-gray-600">Birth Type</div>
              </div>
              <div className="bg-gradient-to-br from-[#765133]/5 to-[#8b6f47]/10 rounded-2xl p-6 text-center border border-[#765133]/10">
                <div className="text-2xl font-bold text-[#765133] mb-1">{formData.age || "0"}</div>
                <div className="text-sm text-gray-600">Years Old</div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="lg:ml-8">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300 px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Edit2 className="w-5 h-5 mr-2" />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit}>
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-8">
              {/* Personal Information Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    Personal Information
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">Age</label>
                      <Input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Birth Information Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    Birth Information
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                        Baby's Birth Date
                      </label>
                      <Input
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleChange("birthDate", e.target.value)}
                        className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                        Weeks Since Birth
                      </label>
                      <Input
                        name="weeksSinceChildbirth"
                        type="number"
                        value={formData.weeksSinceChildbirth}
                        onChange={(e) => handleChange("weeksSinceChildbirth", e.target.value)}
                        className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                        placeholder="8"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                        Type of Birth
                      </label>
                      <Select value={formData.birthType} onValueChange={(value) => handleChange("birthType", value)}>
                        <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Natural">Natural Birth</SelectItem>
                          <SelectItem value="C-Section">C-Section</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                        Birth Timing
                      </label>
                      <Select
                        value={formData.birthTiming}
                        onValueChange={(value) => handleChange("birthTiming", value)}
                      >
                        <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premature">Premature</SelectItem>
                          <SelectItem value="As Planned">As Planned</SelectItem>
                          <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    Location Information
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">Country</label>
                      <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                        <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(locationData).map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.country && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                          State/Province
                        </label>
                        <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                          <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {formData.state && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">City</label>
                        <Select value={formData.city} onValueChange={(value) => handleChange("city", value)}>
                          <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recovery Goals Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">4</span>
                    </div>
                    Recovery Goals
                  </h2>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                      Your Recovery Goals & Notes
                    </label>
                    <Textarea
                      name="goals"
                      value={formData.goals}
                      onChange={(e) => handleChange("goals", e.target.value)}
                      className="w-full min-h-[150px] border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-4 px-4 text-lg resize-none"
                      placeholder="Share your recovery goals, what you hope to achieve, any specific areas you'd like to focus on, or notes about your journey..."
                    />
                    <p className="text-sm text-gray-500">
                      This helps us provide more personalized recommendations for your recovery journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center pb-8">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300 px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg font-bold"
                >
                  <Save className="w-6 h-6 mr-3" />
                  Save All Changes
                </Button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information Display */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                  <h3 className="text-2xl font-bold text-[#765133]">Personal Information</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Name:</span>
                    <span className="text-gray-700 font-medium">{formData.name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Email:</span>
                    <span className="text-gray-700 font-medium">{formData.email || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Age:</span>
                    <span className="text-gray-700 font-medium">{formData.age || "Not set"}</span>
                  </div>
                </div>
              </div>

              {/* Birth Information Display */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                  <h3 className="text-2xl font-bold text-[#765133]">Birth Information</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Birth Date:</span>
                    <span className="text-gray-700 font-medium">{formData.birthDate || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Weeks Since Birth:</span>
                    <span className="text-gray-700 font-medium">{formData.weeksSinceChildbirth || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Birth Type:</span>
                    <span className="text-gray-700 font-medium">{formData.birthType}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Birth Timing:</span>
                    <span className="text-gray-700 font-medium">{formData.birthTiming}</span>
                  </div>
                </div>
              </div>

              {/* Location Information Display */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                  <h3 className="text-2xl font-bold text-[#765133]">Location</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">Country:</span>
                    <span className="text-gray-700 font-medium">{formData.country || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">State:</span>
                    <span className="text-gray-700 font-medium">{formData.state || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-[#765133]">City:</span>
                    <span className="text-gray-700 font-medium">{formData.city || "Not set"}</span>
                  </div>
                </div>
              </div>

              {/* Recovery Goals Display */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                  <h3 className="text-2xl font-bold text-[#765133]">Recovery Goals</h3>
                </div>
                <div className="p-8">
                  <div className="bg-gray-50 rounded-2xl p-6 min-h-[120px]">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formData.goals ||
                        "No recovery goals set yet. Click 'Edit Profile' to add your goals and help us provide personalized recommendations."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )

  return <SidebarLayout>{content}</SidebarLayout>
}
