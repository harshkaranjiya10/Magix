"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavMenu } from "@/components/nav-menu"
import Link from "next/link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      {/* Hamburger Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full right-4 left-4 z-50 mt-2 flex animate-in flex-col gap-6 rounded-2xl border bg-background/95 p-6 shadow-xl backdrop-blur-md duration-200 slide-in-from-top-5 fade-in">
          <nav className="flex flex-col gap-4">
            {/* Reusing your existing NavMenu component */}
            <NavMenu />
          </nav>

          <hr className="border-muted" />

          {/* Action buttons inside the mobile view */}
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full rounded-xl">
                Login
              </Button>
            </Link>
            {/* <Button variant="default" className="w-full rounded-xl" onClick={() => setIsOpen(false)}>
              Get Started
            </Button> */}
          </div>
        </div>
      )}
    </div>
  )
}
