'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChromeIcon as Google, Mail } from 'lucide-react'

export default function Auth() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle git 
    //if the user is logging in
    if (isLogin){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        if (response.ok) {
          localStorage.setItem('token', data.token); // Store token in localStorage
          localStorage.setItem('user_id', data.id);
          console.log('Login successful')
          router.push("/dashboard")
        }
      } catch (error) {
        console.log('Error logging in:', error)
      }
      
    }else{
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (response.ok) {
          console.log('User signed up:', data)
          localStorage.setItem("email" , email);
          router.push('/create-account') // Navigate to the next page to collect more details
        } else {
          console.log('Error signing up:', data.message)
        }
      } catch (error) {
        console.log('Error signing up:', error)
      }
      router.push('/create-account')
    }
    
  }

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backendUrl) {
      console.error('Backend URL is not configured')
      return
    }
    window.location.href = `${backendUrl}/auth/google`
  }
  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? 'Log In' : 'Sign Up'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Welcome back!' : 'Create your account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                {isLogin ? 'Log In' : 'Sign Up'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">or</span>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <Google className="mr-2 h-4 w-4" /> Sign in with Google
              </Button>
              <Button variant="outline" className="w-full" onClick={() => console.log('Sign in with Yahoo')}>
                <Mail className="mr-2 h-4 w-4" /> Sign in with Yahoo
              </Button>
            </div>
            <div className="mt-6 text-center">
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
