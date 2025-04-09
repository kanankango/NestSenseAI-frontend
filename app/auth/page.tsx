'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChromeIcon as Google, Mail, ArrowRight } from 'lucide-react'
import Image from 'next/image'

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
       router.push("/dashboard");
      /*try {
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
      }*/
      
    }else{
      try {
       /* const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
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
      }*/
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">

          <Card className="bg-white/80 backdrop-blur-sm border border-[#75B5AE]/10 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-[#2C3E50]">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? 'Continue your journey with NestSense'
                  : 'Start your postpartum journey with us'}
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
                  className="bg-white/50"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 group"
                >
                  <span className="flex items-center gap-2">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </form>
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">or continue with</span>
              </div>
              <div className="mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-[#75B5AE]/20 hover:border-[#75B5AE]/40 hover:bg-[#75B5AE]/5" 
                  onClick={handleGoogleSignIn}
                >
                  <Google className="mr-2 h-4 w-4" /> Sign in with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#75B5AE]/20 hover:border-[#75B5AE]/40 hover:bg-[#75B5AE]/5" 
                  onClick={() => console.log('Sign in with Yahoo')}
                >
                  <Mail className="mr-2 h-4 w-4" /> Sign in with Yahoo
                </Button>
              </div>
              <div className="mt-6 text-center">
                <button
                  className="text-sm text-[#75B5AE] hover:text-[#75B5AE]/80 hover:underline transition-colors"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
