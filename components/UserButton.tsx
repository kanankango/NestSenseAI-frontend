'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'

export function UserButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
      >
        <User className="h-6 w-6" />
        <span>Account</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">
            Profile
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">
            Settings
          </Link>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">
            <LogOut className="inline-block h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

