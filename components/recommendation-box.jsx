"use client"

import { useState, useEffect, useRef } from "react"
import { AlertCircle } from "lucide-react"

export default function RecommendationBox() {
  const recommendations = [
    "Master React Server Components for better performance and SEO.",
    "Use TypeScript to catch errors early and improve code quality.",
    "Implement proper error handling in your API routes.",
    "Optimize images with Next.js Image component for faster loading.",
    "Use environment variables to secure sensitive data.",
    "Write unit tests to ensure code reliability.",
    "Keep your dependencies updated for security patches.",
    "Use CSS-in-JS or Tailwind for scalable styling.",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const boxRef = useRef(null)

  useEffect(() => {
    setPosition({ x: window.innerWidth - 340, y: 80 })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [recommendations.length])

  const handleMouseDown = (e) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={boxRef}
      className="fixed w-80 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-lg p-4 shadow-lg backdrop-blur-sm z-50 transition-shadow duration-200"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="flex items-start gap-3" onMouseDown={handleMouseDown} style={{ cursor: "grab" }}>
        <AlertCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-purple-500 mb-1">Tech Tip</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{recommendations[currentIndex]}</p>
          <div className="flex gap-1 mt-3">
            {recommendations.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-purple-500" : "w-1 bg-purple-500/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
