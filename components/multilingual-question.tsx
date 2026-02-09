"use client"

import { useEffect, useState } from "react"

const name = process.env.NEXT_PUBLIC_VALENTINE_NAME || "Ana"

const questions = [
  { text: `Will you be my Valentine, ${name}?`, lang: "English", color: "#E11D48" },
  { text: `Vuoi essere il mio Valentino, ${name}?`, lang: "Italiano", color: "#D946EF" },
  { text: `A do të jesh Shën Valentini im, ${name}?`, lang: "Shqip", color: "#F59E0B" },
  { text: `Willst du mein Valentinsschatz sein, ${name}?`, lang: "Deutsch", color: "#EC4899" },
  { text: `¿Serás mi Valentín, ${name}?`, lang: "Español", color: "#F43F5E" },
  { text: `Veux-tu être ma/mon Valentin, ${name} ?`, lang: "Français", color: "#8B5CF6" },
  { text: `${name}, 你愿意做我的情人吗？`, lang: "中文", color: "#FB923C" },
]

export function MultilingualQuestion() {
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % questions.length)
        setIsTransitioning(false)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const current = questions[index]

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-28 md:h-32 flex items-center justify-center overflow-hidden">
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-balance leading-tight"
          style={{
            color: current.color,
            transform: isTransitioning
              ? "rotateX(180deg) scale(0.5) translateY(-30px)"
              : "rotateX(0deg) scale(1) translateY(0px)",
            opacity: isTransitioning ? 0 : 1,
            filter: isTransitioning ? "blur(16px)" : "blur(0px)",
            textShadow: isTransitioning ? "none" : `0 0 40px ${current.color}50, 0 0 80px ${current.color}30`,
            transition:
              "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease, filter 0.8s ease, color 0.8s ease, text-shadow 0.8s ease",
          }}
        >
          {current.text}
        </h1>
      </div>

    </div>
  )
}
