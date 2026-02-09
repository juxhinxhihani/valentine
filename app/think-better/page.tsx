"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { HeartRain } from "@/components/heart-rain"
import { Fireworks } from "@/components/fireworks"

export default function ThinkBetterPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(30)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [countdownFinished, setCountdownFinished] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  const name = process.env.NEXT_PUBLIC_VALENTINE_NAME || "Ana"

  const handleYesClick = async () => {
    try {
      const message = countdownFinished
        ? "She said YESSSS after the countdown finished! (Think Better -> Time's up) ⏳💖"
        : "She said YES during the countdown! (Think Better -> Early Yes) ⚡️💖";

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Failed to send think-yes email:', error);
    }
    setShowFireworks(true)
  }

  const handleNavigate = useCallback(() => {
    router.push("/yes")
  }, [router])

  useEffect(() => {
    if (showFireworks) return; // Stop countdown if fireworks are showing

    if (countdown <= 0) {
      setCountdownFinished(true)
      return
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown, showFireworks])

  const moveNoButton = useCallback(() => {
    // Optionally log that she tried to click no - ONLY if not sent before
    if (!hasMoved) {
      if (!localStorage.getItem('noEmailSent')) {
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: "She tried to catch the 'No' button on the last page... but it was too fast! 🏃💨" }),
        }).then(() => {
          localStorage.setItem('noEmailSent', 'true');
        }).catch(console.error);
      }
    }

    const x = Math.random() * 200 - 100
    const y = Math.random() * 200 - 100
    setNoPosition({ x, y })
    setHasMoved(true)
  }, [hasMoved])

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-valentine-bg overflow-hidden">
      <HeartRain variant="hearts-only" />
      {showFireworks && <Fireworks onComplete={handleNavigate} />}

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div className="animate-fade-in-up">
          <span className="text-6xl md:text-8xl block mb-6">{"\uD83E\uDD14"}</span>
          <h1 className="text-3xl md:text-5xl font-bold text-valentine-accent text-balance">
            {countdownFinished ? "Time's up!" : "Think it better"}
          </h1>
          <p className="text-valentine-muted text-lg mt-4 max-w-lg">
            {countdownFinished
              ? "The only option left is... 💕"
              : `${name}, I'll let you some time to think...`}
          </p>
        </div>

        {!countdownFinished && (
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-valentine-card border-4 border-valentine-accent/30 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-valentine-accent/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-valentine-accent"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - countdown / 30)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="text-4xl md:text-5xl font-bold text-valentine-accent">
                {countdown}
              </span>
            </div>
          </div>
        )}

        {countdownFinished ? (
          <div className="animate-fade-in-up">
            <button
              onClick={handleYesClick}
              className="px-16 py-6 text-2xl md:text-3xl font-bold rounded-full bg-valentine-accent text-valentine-accent-foreground shadow-xl shadow-valentine-accent/40 hover:scale-110 hover:shadow-2xl hover:shadow-valentine-accent/50 transition-all duration-300 cursor-pointer"
              style={{ animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            >
              Yessss
            </button>
          </div>
        ) : (
          <div
            className="flex items-center justify-center gap-6 animate-fade-in-up relative"
            style={{ animationDelay: "0.4s", minHeight: "120px", minWidth: "320px" }}
          >
            <button
              onClick={handleYesClick}
              className="px-10 py-4 text-lg font-bold rounded-full bg-valentine-accent text-valentine-accent-foreground shadow-lg shadow-valentine-accent/30 hover:scale-110 hover:shadow-xl hover:shadow-valentine-accent/40 transition-all duration-300 cursor-pointer z-10"
            >
              Yes
            </button>
            <button
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              className="px-10 py-4 text-lg font-bold rounded-full bg-valentine-card text-valentine-muted border border-valentine-border transition-all duration-300 cursor-pointer"
              style={{
                transform: hasMoved
                  ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                  : "translate(0, 0)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: hasMoved ? "absolute" : "relative",
                right: hasMoved ? "0" : "auto",
              }}
            >
              No
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
