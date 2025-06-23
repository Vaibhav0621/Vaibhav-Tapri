"use client"

import { useState, useEffect } from "react"

export default function SuccessCounter() {
  const [counts, setCounts] = useState({
    helpedPeople: 0,
    activeTeams: 0,
    successfulStartups: 0,
    mentorsConnected: 0,
  })

  const finalCounts = {
    helpedPeople: 128,
    activeTeams: 13,
    successfulStartups: 4,
    mentorsConnected: 37,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounts({
        helpedPeople: Math.floor(finalCounts.helpedPeople * progress),
        activeTeams: Math.floor(finalCounts.activeTeams * progress),
        successfulStartups: Math.floor(finalCounts.successfulStartups * progress),
        mentorsConnected: Math.floor(finalCounts.mentorsConnected * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounts(finalCounts)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-pastel-green-200 dark:border-pastel-green-800">
        <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 animate-counter">
          {counts.helpedPeople.toLocaleString()}+
        </div>
        <div className="text-sm text-muted-foreground mt-2">People Helped</div>
      </div>
      <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-pastel-green-200 dark:border-pastel-green-800">
        <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 animate-counter">
          {counts.activeTeams}+
        </div>
        <div className="text-sm text-muted-foreground mt-2">Active Teams</div>
      </div>
      <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-pastel-green-200 dark:border-pastel-green-800">
        <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 animate-counter">
          {counts.successfulStartups}+
        </div>
        <div className="text-sm text-muted-foreground mt-2">Successful Startups</div>
      </div>
      <div className="text-center p-6 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-pastel-green-200 dark:border-pastel-green-800">
        <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 animate-counter">
          {counts.mentorsConnected}+
        </div>
        <div className="text-sm text-muted-foreground mt-2">Mentors Connected</div>
      </div>
    </div>
  )
}
