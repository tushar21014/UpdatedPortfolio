"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [shouldShow, setShouldShow] = useState(true)

  useEffect(() => {
    // When page fully loaded
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setShouldShow(false)
      }, 700) // fade out duration
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="text-center">
            <motion.h1
              className="text-white text-4xl font-bold mb-8 h-12"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
            >
              Tushar Gupta
            </motion.h1>

            <motion.div
              className="w-64 h-1 bg-gray-800 rounded-full mb-4 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {progress}%
            </motion.p>

            <motion.p
              className="text-gray-400 text-sm mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {progress === 100 ? "Welcome!" : "Loading my portfolio..."}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
