"use client"

import { useEffect, useRef, useState } from "react"

export default function ScrollHint() {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // only show 5 sec of no scrolling
  useEffect(() => {
    const handleUserActivity = () => {
      setVisible(false)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        setVisible(true)
      }, 5000)
    }

    handleUserActivity()

    window.addEventListener("scroll", handleUserActivity)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener("scroll", handleUserActivity)
    }
  }, [])

  return (
    <div
      className={`fixed right-0 bottom-0 mr-12 mb-8 flex items-center gap-3 transition-opacity duration-700 ${
        visible ? "animate-pulse opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="border-secondary/15 flex h-12 w-8 items-start justify-center rounded-full border pt-2">
        <div className="bg-secondary/30 h-2.5 w-0.5 animate-bounce rounded-full" />
      </div>
      <span className="text-secondary/30 font-sans text-[0.6rem] tracking-[0.25em] uppercase">Scroll Down</span>
    </div>
  )
}
