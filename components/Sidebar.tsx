'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Menu, X, Moon, Sun, Home, Activity, Utensils, Brain, Baby, Users, User } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Wellness Tracker', href: '/wellness-tracker', icon: Activity },
  { label: 'Nutrition & Workout', href: '/nutrition-exercise', icon: Utensils },
  { label: 'Mental Health', href: '/mental-health', icon: Brain },
  { label: 'Baby Care', href: '/baby-care', icon: Baby },
  { label: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-gradient-to-r hover:from-[#75B5AE]/10 hover:to-[#F1C0C9]/10"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block w-72 h-screen">
        <SidebarContent pathname={pathname} setOpen={setOpen} />
      </div>
    </>
  )
}

function SidebarContent({ pathname, setOpen }: { pathname: string, setOpen: (open: boolean) => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden border-r border-[#75B5AE]/10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/10 to-[#F1C0C9]/10 rounded-full opacity-40 animate-blob"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/10 to-[#F1C0C9]/10 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="p-6 border-b border-[#75B5AE]/10">
          <GradientText className="text-2xl font-bold">NestSenseAI</GradientText>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          <nav className="flex flex-col gap-2 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white shadow-md'
                      : 'hover:bg-gradient-to-r hover:from-[#75B5AE]/10 hover:to-[#F1C0C9]/10'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-[#2C3E50] group-hover:text-[#75B5AE]'
                  }`} />
                  <span className={`font-medium ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-[#2C3E50] group-hover:text-[#75B5AE]'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* <div className="relative p-4 border-t border-[#75B5AE]/10 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-[#75B5AE]/5 to-[#F1C0C9]/5">
            <span className="text-sm font-medium text-[#2C3E50]">Dark Mode</span>
            {mounted && (
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                className="data-[state=checked]:bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9]"
              />
            )}
          </div>
        </div> */}
       <div className="relative p-4 -mt-2 border-t border-[#75B5AE]/10 bg-white/50 backdrop-blur-sm">
  <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-[#75B5AE]/5 to-[#F1C0C9]/5">
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 group"
    >
      Logout
    </Button>
  </div>
</div>

      </div>
    </div>
  )
}

export default Sidebar;