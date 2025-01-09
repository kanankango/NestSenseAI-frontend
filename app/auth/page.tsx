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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    console.log({ email, password })
    router.push('/create-account')
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
              <Button variant="outline" className="w-full" onClick={() => console.log('Sign in with Google')}>
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

