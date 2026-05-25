"use client"

import { usePathname } from "next/navigation"

const PUBLIC_PATHS = ["/", "/about"]

export default function LandingHeader() {
  const pathname = usePathname()

  if (!PUBLIC_PATHS.includes(pathname)) return null

  return (
    <header className="sticky top-0 right-0 left-0 z-20 flex h-min items-center md:px-4">
      {/* your full header code */}
    </header>
  )
}
