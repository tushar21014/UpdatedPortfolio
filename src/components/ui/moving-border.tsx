"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring } from "framer-motion"

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderRadius = "1.75rem",
  offset = 16,
  borderWidth = 1,
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderRadius?: string
  offset?: number
  borderWidth?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springOptions = { damping: 20, stiffness: 400, mass: 0.5 }
  const springX = useSpring(mouseX, springOptions)
  const springY = useSpring(mouseY, springOptions)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
  }

  useEffect(() => {
    if (isHovered) {
      setIsAnimating(true)
    } else {
      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [isHovered, duration])

  return (
    <div
      className={cn("relative", containerClassName)}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn("relative z-10", className)}
        style={{
          borderRadius,
        }}
      >
        {children}
      </div>
      {isAnimating && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            x: springX,
            y: springY,
            border: `${borderWidth}px solid var(--border-color, hsl(var(--primary)))`,
            borderRadius,
            translateX: `-${offset}px`,
            translateY: `-${offset}px`,
            width: `calc(100% + ${offset * 2}px)`,
            height: `calc(100% + ${offset * 2}px)`,
          }}
        />
      )}
    </div>
  )
}
