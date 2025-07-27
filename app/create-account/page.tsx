'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateAccount() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    state: '',
    email: '', // Initialize email as empty
  })

  // ✅ Fetch localStorage value inside useEffect (Runs only in the browser)
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert("hello")

    if (!formData.name || !formData.age || !formData.country || !formData.state || !formData.email) {
      console.error('Please fill all the fields');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getDetails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        console.error('Failed request:', response.status, response.statusText)
        throw new Error('Request failed')
      }

      const data = await response.json()
      console.log('Response from server:', data)

      router.push('/auth') // Redirect after successful registration
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Tell us a bit more about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">Age</label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Complete Profile</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}