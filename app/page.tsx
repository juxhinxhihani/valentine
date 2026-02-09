"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeartRain } from "@/components/heart-rain"
import { MultilingualQuestion } from "@/components/multilingual-question"
import { Fireworks } from "@/components/fireworks"

export default function HomePage() {
  const router = useRouter()
  const [showFireworks, setShowFireworks] = useState(false)

  const handleYesClick = async () => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "She said YES instantly on the Home Page! 🏠💖" }),
      });
    } catch (error) {
      console.error('Failed to send home-yes email:', error);
    }
    setShowFireworks(true)
  }

  const handleNoClick = async () => {
    // Only send the "No" email if valid - but user wants only FIRST no.
    // Check if we already sent a NO email
    if (!localStorage.getItem('noEmailSent')) {
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: "She pressed No... but maybe she just needs a little more convincing? 😉" }),
        });
        localStorage.setItem('noEmailSent', 'true');
      } catch (error) {
        console.error('Failed to send no email:', error);
      }
    }
    router.push("/are-you-sure")
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-valentine-bg overflow-hidden">
      <HeartRain />
      {showFireworks && <Fireworks onComplete={() => router.push("/yes")} />}

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        <div className="animate-fade-in-up">
          <MultilingualQuestion />
        </div>

        <div className="flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={handleYesClick}
            className="px-10 py-4 text-lg font-bold rounded-full bg-valentine-accent text-valentine-accent-foreground shadow-lg shadow-valentine-accent/30 hover:scale-110 hover:shadow-xl hover:shadow-valentine-accent/40 transition-all duration-300 cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={handleNoClick}
            className="px-10 py-4 text-lg font-bold rounded-full bg-valentine-card text-valentine-muted border border-valentine-border hover:bg-valentine-card/80 transition-all duration-300 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </main>
  )
}
