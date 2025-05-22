import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import MouseMoveEffect from "@/components/ui/mouse-mouse-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tushar Developer | Portfolio",
  description: "Backend Developer Portfolio showcasing projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <MouseMoveEffect/>
        
        {children}
        </body>
    </html>
  )
}
