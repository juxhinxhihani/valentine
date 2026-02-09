"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ValentineCountdown } from "@/components/valentine-countdown"

interface Sparkle {
  id: number
  left: number
  top: number
  size: number
  delay: number
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Sparkle[]>([])

  useEffect(() => {
    const generated: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 16 + 10,
      delay: Math.random() * 6,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: `${h.left}%`,
            bottom: `-${h.size}px`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        >
          {"\u2764"}
        </span>
      ))}
    </div>
  )
}

export default function YesPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200)

    // Send email when user lands on yes page
    const sendYesEmail = async () => {
      // Check if we already sent the email to avoid duplicates
      if (localStorage.getItem('yesEmailSent')) return;

      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: "She said YES!" }),
        });
        localStorage.setItem('yesEmailSent', 'true');
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    };

    sendYesEmail();

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-valentine-bg overflow-hidden">
      <FloatingHearts />

      <div
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center transition-all duration-1000"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-valentine-accent/20 border-2 border-valentine-accent/10">
          <Image
            src="/romantic-dinner.png"
            alt="Romantic dinner table with roses and wine glasses"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-valentine-bg/80 via-transparent to-transparent" />
        </div>

        <div className="perspective-[800px]">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-valentine-accent leading-tight"
            style={{
              textShadow:
                "0 1px 0 hsl(350, 80%, 45%), 0 2px 0 hsl(350, 80%, 40%), 0 3px 0 hsl(350, 80%, 35%), 0 4px 0 hsl(350, 80%, 30%), 0 5px 0 hsl(350, 80%, 25%), 0 6px 10px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15)",
              transform: "rotateX(5deg)",
              letterSpacing: "-0.02em",
            }}
          >
            I knew you{"'"}d
            <br />
            say yes at end!
          </h1>
        </div>

        <p className="text-valentine-muted text-lg md:text-xl font-medium max-w-md">
          Our Valentine{"'"}s dinner is coming...
        </p>

        <ValentineCountdown />
      </div>
    </main>
  )
}
