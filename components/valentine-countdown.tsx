"use client"

import { useEffect, useState } from "react"

function getTimeUntilValentine() {
  const now = new Date()
  const year = now.getFullYear()
  let valentine = new Date(year, 1, 14, 20, 0, 0)
  if (now > valentine) {
    valentine = new Date(year + 1, 1, 14, 20, 0, 0)
  }
  const diff = valentine.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

export function ValentineCountdown() {
  const [time, setTime] = useState(getTimeUntilValentine())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilValentine())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {[
        { value: time.days, label: "Days" },
        { value: time.hours, label: "Hours" },
        { value: time.minutes, label: "Minutes" },
        { value: time.seconds, label: "Seconds" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-valentine-card/80 backdrop-blur-sm flex items-center justify-center border border-valentine-accent/20">
            <span className="text-2xl md:text-3xl font-bold text-valentine-accent">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm mt-2 text-valentine-muted font-medium uppercase tracking-wider">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
