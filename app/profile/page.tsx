'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { GradientText } from '@/components/GradientText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit2, Upload, Save } from 'lucide-react'

// Define a type for locationData
type LocationData = {
  [country: string]: {
    states: string[];
    cities: {
      [state: string]: string[];
    };
  };
};

const locationData: LocationData = {
  'United States': {
    states: ['California', 'New York', 'Texas', 'Florida'],
    cities: {
      'California': ['Los Angeles', 'San Francisco', 'San Diego'],
      'New York': ['New York City', 'Buffalo', 'Albany'],
      'Texas': ['Houston', 'Austin', 'Dallas'],
      'Florida': ['Miami', 'Orlando', 'Tampa']
    }
  },
  'United Kingdom': {
    states: ['England', 'Scotland', 'Wales'],
    cities: {
      'England': ['London', 'Manchester', 'Birmingham'],
      'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen'],
      'Wales': ['Cardiff', 'Swansea', 'Newport']
    }
  },
  'Canada': {
    states: ['Ontario', 'British Columbia', 'Quebec'],
    cities: {
      'Ontario': ['Toronto', 'Ottawa', 'Hamilton'],
      'British Columbia': ['Vancouver', 'Victoria', 'Kelowna'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval']
    }
  }
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    birthDate: '',
    goals: '',
    country: '',
    state: '',
    city: '',
    weeksSinceChildbirth: '',
    birthType: 'Natural',
    birthTiming: 'As Planned'
  })

  useEffect(() => {
    if (formData.country) {
      setAvailableStates(locationData[formData.country].states)
      setFormData(prev => ({ ...prev, state: '', city: '' }))
    }
  }, [formData.country])

  useEffect(() => {
    if (formData.state && formData.country) {
      setAvailableCities(locationData[formData.country].cities[formData.state])
      setFormData(prev => ({ ...prev, city: '' }))
    }
  }, [formData.state])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
    router.push('/dashboard')
  }

  const content = (
    <div className="p-6 relative h-full bg-gradient-to-b from-[#FFF8F0] to-white overflow-hidden">
      <div className="absolute inset-0">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      <Card className="max-w-4xl mx-auto bg-white shadow-sm bg-gradient-to-b from-[#FFF8F0] to-white relative mt-[100px]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-opacity"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </Button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white">
                    {formData.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer">
                  <Upload className="w-5 h-5 text-gray-600" />
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" title="Upload Profile Image" />
                </label>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Age</label>
                    <Input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Baby's Birth Date</label>
                    <Input
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Country</label>
                    <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
                      <SelectTrigger className="w-full">
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
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                        <SelectTrigger className="w-full">
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
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <Select value={formData.city} onValueChange={(value) => handleChange('city', value)}>
                        <SelectTrigger className="w-full">
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Weeks Since Childbirth</label>
                    <Input
                      name="weeksSinceChildbirth"
                      type="number"
                      value={formData.weeksSinceChildbirth}
                      onChange={(e) => handleChange('weeksSinceChildbirth', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Type of Birth</label>
                    <Select value={formData.birthType} onValueChange={(value) => handleChange('birthType', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Natural">Natural</SelectItem>
                        <SelectItem value="C-Section">C-Section</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Birth Timing</label>
                    <Select value={formData.birthTiming} onValueChange={(value) => handleChange('birthTiming', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Premature">Premature</SelectItem>
                        <SelectItem value="As Planned">As Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Recovery Goals</label>
                  <Textarea
                    name="goals"
                    value={formData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    className="w-full min-h-[100px]"
                    placeholder="Write your recovery goals here..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium">Name:</span> {formData.name || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">Email:</span> {formData.email || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">Age:</span> {formData.age || 'Not set'}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Location</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium">Country:</span> {formData.country || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">State:</span> {formData.state || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">City:</span> {formData.city || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Birth Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium">Birth Date:</span> {formData.birthDate || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">Weeks Since Childbirth:</span> {formData.weeksSinceChildbirth || 'Not set'}</p>
                      <p className="text-gray-700"><span className="font-medium">Birth Type:</span> {formData.birthType}</p>
                      <p className="text-gray-700"><span className="font-medium">Birth Timing:</span> {formData.birthTiming}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recovery Goals</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{formData.goals || 'No goals set yet'}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  )

  return <SidebarLayout>{content}</SidebarLayout>
}