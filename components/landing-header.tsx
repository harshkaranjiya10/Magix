"use client"

import { usePathname } from "next/navigation"

const PUBLIC_PATHS = ["/", "/about", "/explore"]

export default function LandingHeader() {
  const pathname = usePathname()

  const showHeader = PUBLIC_PATHS.includes(pathname)

  if (!showHeader) return null

  return (
    <header className="sticky top-0 right-0 left-0 z-20 flex h-min items-center md:px-4">
      {/* your full header code */}
    </header>
  )
}