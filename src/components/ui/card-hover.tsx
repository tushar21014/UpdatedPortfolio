"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description?: string
    link: string
    tags?: string[]
    image?: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.image && (
              <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-500"
                />
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            {item.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </a>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-card border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn("text-foreground font-bold tracking-wide mt-2", className)}>{children}</h4>
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("mt-4 text-muted-foreground tracking-wide leading-relaxed text-sm", className)}>{children}</p>
}
