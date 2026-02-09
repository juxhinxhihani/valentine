"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeartRain } from "@/components/heart-rain"
import { Fireworks } from "@/components/fireworks"

export default function AreYouSurePage() {
  const router = useRouter()
  const [showFireworks, setShowFireworks] = useState(false)
  const name = process.env.NEXT_PUBLIC_VALENTINE_NAME || "Ana"

  const handleYesClick = async () => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Wait, on 'Are you sure?', she said YES! (She was sure!) 😮💖` }),
      });
    } catch (error) {
      console.error('Failed to send sure-yes email:', error);
    }
    setShowFireworks(true)
  }

  const handleNoClick = async () => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `She pressed NO again on 'Are you sure?'... (second attempt) 💔` }),
      });
    } catch (error) {
      console.error('Failed to send sure-no email:', error);
    }
    router.push("/think-better")
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-valentine-bg overflow-hidden">
      <HeartRain variant="secondary" />
      {showFireworks && <Fireworks onComplete={() => router.push("/yes")} />}

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        <div className="animate-fade-in-up">
          <span className="text-6xl md:text-8xl block mb-6">{"\uD83D\uDE22"}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-valentine-accent text-balance">
            Are you sure, {name}?
          </h1>
          <p className="text-valentine-muted text-lg mt-4 max-w-md">
            Please reconsider... this could be the most magical Valentine{"'"}s Day ever.
          </p>
          <p className="text-valentine-accent text-xl font-semibold mt-6">
            Do you agree?
          </p>
        </div>

        <div className="flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
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
