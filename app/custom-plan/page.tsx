'use client'

import { useState } from 'react'
import { Header } from '../../components/Header'

export default function CustomPlan() {
  const [goals, setGoals] = useState<string[]>([])
  const [duration, setDuration] = useState('')

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setGoals([...goals, value])
    } else {
      setGoals(goals.filter(goal => goal !== value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend or AI service
    console.log({ goals, duration })
    alert('Custom plan request submitted! We\'ll generate your plan shortly.')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">Create Your Custom Plan</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">What are your goals?</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="weight-loss"
                  onChange={handleGoalChange}
                  className="mr-2"
                />
                Weight Loss
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="mental-health"
                  onChange={handleGoalChange}
                  className="mr-2"
                />
                Improve Mental Health
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="sleep"
                  onChange={handleGoalChange}
                  className="mr-2"
                />
                Better Sleep
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="nutrition"
                  onChange={handleGoalChange}
                  className="mr-2"
                />
                Balanced Nutrition
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Plan Duration</h2>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select duration...</option>
              <option value="4-weeks">4 weeks</option>
              <option value="8-weeks">8 weeks</option>
              <option value="12-weeks">12 weeks</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300"
          >
            Generate My Custom Plan
          </button>
        </form>
      </main>
    </div>
  )
}

