"use client"

import { useEffect, useState } from "react"

const name = process.env.NEXT_PUBLIC_VALENTINE_NAME || "Ana"

// Short texts for home page rain
const homeTextItems = [
  { text: `${name}, say yes?`, color: "#E11D48" },
  { text: `${name}, di sì?`, color: "#D946EF" },
  { text: `${name}, thuaj po?`, color: "#F59E0B" },
  { text: `${name}, sag ja?`, color: "#EC4899" },
  { text: `${name}, di que sí?`, color: "#F43F5E" },
  { text: `${name}, dis oui?`, color: "#8B5CF6" },
  { text: `${name}, 说是?`, color: "#FB923C" },
]

// Full question for secondary pages
const secondaryTextItems = [
  { text: `Will you be my Valentine, ${name}?`, color: "#E11D48" },
  { text: `Vuoi essere il mio Valentino, ${name}?`, color: "#D946EF" },
  { text: `A do të jesh Shën Valentini im, ${name}?`, color: "#F59E0B" },
  { text: `Willst du mein Valentinsschatz sein, ${name}?`, color: "#EC4899" },
  { text: `¿Serás mi Valentín, ${name}?`, color: "#F43F5E" },
  { text: `Veux-tu être ma/mon Valentin, ${name} ?`, color: "#8B5CF6" },
  { text: `${name}, 你愿意做我的情人吗？`, color: "#FB923C" },
]

interface RainItem {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
  content: string
  color?: string
  rotation: number
}

interface HeartRainProps {
  variant?: "home" | "secondary" | "hearts-only"
}

export function HeartRain({ variant = "home" }: HeartRainProps) {
  const [items, setItems] = useState<RainItem[]>([])

  useEffect(() => {
    let rainPool: { content: string; color?: string }[] = []

    if (variant === "hearts-only") {
      // 80% red hearts, 20% mixed colors (rose, blue, yellow, purple)
      const otherColors = ["#FB7185", "#3B82F6", "#EAB308", "#A855F7"]
      rainPool = [
        ...Array(80).fill({ content: "❤️" }), // 80 red hearts
        ...Array(5).fill({ content: "💗", color: "#FB7185" }), // Rose
        ...Array(5).fill({ content: "💙", color: "#3B82F6" }), // Blue
        ...Array(5).fill({ content: "💛", color: "#EAB308" }), // Yellow
        ...Array(5).fill({ content: "💜", color: "#A855F7" }), // Purple
      ]
    } else {
      const textItems = variant === "home" ? homeTextItems : secondaryTextItems
      rainPool = [
        // Red hearts (majority)
        ...Array(20).fill({ content: "❤️" }),
        // Colored text messages
        ...textItems.map(item => ({ content: item.text, color: item.color })),
      ]
    }

    const itemCount = variant === "hearts-only" ? 80 : 40
    const generated: RainItem[] = Array.from({ length: itemCount }, (_, i) => {
      const poolItem = rainPool[Math.floor(Math.random() * rainPool.length)]
      return {
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 10 + 14,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 6,
        opacity: Math.random() * 0.5 + 0.3,
        content: poolItem.content,
        color: poolItem.color, // Only applies if content is text, otherwise emoji handles color
        rotation: Math.random() * 30 - 15,
      }
    })
    setItems(generated)
  }, [variant])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute animate-heart-fall whitespace-nowrap font-medium"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: item.opacity,
            transform: `rotate(${item.rotation}deg)`,
            color: item.color,
          }}
        >
          {item.content}
        </span>
      ))}
    </div>
  )
}
