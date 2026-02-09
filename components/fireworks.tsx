"use client"

import { useEffect, useState } from "react"

interface Particle {
    id: number
    x: number
    y: number
    color: string
    size: number
    angle: number
    speed: number
    decay: number
}

interface Firework {
    id: number
    x: number
    y: number
    particles: Particle[]
}

const colors = ["#E11D48", "#EC4899", "#F43F5E", "#FB7185", "#FDA4AF", "#FFD700", "#FF69B4", "#FF1493"]

export function Fireworks({ onComplete }: { onComplete: () => void }) {
    const [fireworks, setFireworks] = useState<Firework[]>([])

    useEffect(() => {
        // Generate all fireworks data at once to avoid key issues and racing conditions
        const newFireworks = Array.from({ length: 6 }, (_, i) => {
            const id = Math.random() * 1000000 + i // Guaranteed unique-ish ID for this batch
            const x = 20 + Math.random() * 60
            const y = 20 + Math.random() * 40

            const particles: Particle[] = Array.from({ length: 30 }, (_, j) => ({
                id: j,
                x: 0,
                y: 0,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 3,
                angle: (Math.PI * 2 * j) / 30 + Math.random() * 0.5,
                speed: Math.random() * 100 + 50,
                decay: Math.random() * 0.5 + 0.5,
            }))

            return { id, x, y, particles, delay: i * 200 }
        })

        // Add fireworks with delay
        const timeouts: NodeJS.Timeout[] = []

        newFireworks.forEach((firework) => {
            const timeout = setTimeout(() => {
                setFireworks((prev) => {
                    // Check if firework already exists to prevent duplicates in strict mode
                    if (prev.some(p => p.id === firework.id)) return prev
                    return [...prev, firework]
                })
            }, firework.delay)
            timeouts.push(timeout)
        })

        // Navigate after fireworks
        const navTimer = setTimeout(() => {
            onComplete()
        }, 1800)
        timeouts.push(navTimer)

        return () => {
            timeouts.forEach(clearTimeout)
            setFireworks([]) // Clear on unmount
        }
    }, [onComplete])

    return (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {fireworks.map((firework) => (
                <div
                    key={firework.id}
                    className="absolute"
                    style={{
                        left: `${firework.x}%`,
                        top: `${firework.y}%`,
                    }}
                >
                    {firework.particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute rounded-full animate-firework-particle"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                                "--angle": `${particle.angle}rad`,
                                "--speed": `${particle.speed}px`,
                                "--decay": particle.decay,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
