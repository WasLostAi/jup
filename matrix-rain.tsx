"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  className?: string
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Jupiter brand colors with reduced opacity (50% less bright)
    const jupiterColors = [
      "rgba(0, 182, 231, 0.4)", // Nebula Blue
      "rgba(34, 204, 238, 0.4)", // Helix Cyan
      "rgba(46, 211, 183, 0.4)", // Trifid Teal
      "rgba(118, 212, 132, 0.4)", // Aurora Green
      "rgba(148, 229, 160, 0.4)", // Comet Green
      "rgba(164, 215, 86, 0.4)", // Cosmic Lime
      "rgba(199, 242, 132, 0.4)", // Venus Lime
    ]

    // Matrix characters (using numbers and symbols for trading theme)
    const chars = "01010101010101010101"

    // Create drops
    const fontSize = 14
    const columns = Math.ceil(canvas.width / fontSize)
    const drops: number[] = []
    const colors: string[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
      colors[i] = jupiterColors[Math.floor(Math.random() * jupiterColors.length)]
    }

    // Drawing the characters
    function draw() {
      // Black background with increased opacity to create faster trail effect
      ctx.fillStyle = "rgba(12, 12, 12, 0.1)" // Increased from 0.05 to 0.1 for faster fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Draw the character
        ctx.fillStyle = colors[i]
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move drops down
        drops[i]++

        // Send the drop back to the top randomly after it has crossed the screen
        // Increased probability for faster fade-out effect
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          // Changed from 0.975 to 0.95
          drops[i] = 0
          // Occasionally change color
          if (Math.random() > 0.8) {
            colors[i] = jupiterColors[Math.floor(Math.random() * jupiterColors.length)]
          }
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 z-0 ${className}`} />
}
