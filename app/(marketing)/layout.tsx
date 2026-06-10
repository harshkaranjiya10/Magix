import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

import Magix from "@/public/Magix-bg.png"
import { NavMenu } from "@/components/nav-menu"
import { MobileMenu } from "@/components/mobile-menu" // 1. Import Mobile Menu

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          {/* Main Layout Sticky Header */}
          <header className="sticky top-0 right-0 left-0 z-20 flex h-min items-center px-4 md:px-4">
            <motion.div className="relative mx-auto mt-6 flex w-full max-w-6xl items-center justify-between rounded-2xl border-2 bg-background/70 px-6 py-3 backdrop-blur-md">
              
              {/* Logo / Brand Section */}
              <section className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                  <Image
                    src={Magix}
                    alt="MagixThenics Logo"
                    width={50}
                    height={50}
                    className="rounded-xl"
                  />
                  <h1 className="text-large font-extrabold tracking-tight">
                    MagixThenics
                  </h1>
                </Link>
              </section>

              {/* Desktop Nav Links (Hidden on mobile) */}
              <section className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-4 md:flex">
                <nav className="flex items-center gap-8">
                  <NavMenu />
                </nav>
              </section>

              {/* Action Buttons / Mobile Controller */}
              <section className="flex items-center gap-3">
                {/* Desktop Buttons (Hidden on mobile) */}
                <div className="hidden items-center gap-3 md:flex">
                  <Link href="/login">
                    <Button variant="outline" className="rounded-xl px-6">
                      Login
                    </Button>
                  </Link>
                  <Button variant="default" className="rounded-xl px-3">
                    Get Started
                  </Button>
                </div>

                {/* 2. Mobile Menu Toggle (Displays ONLY on mobile screens) */}
                <MobileMenu />
              </section>
              
            </motion.div>
          </header>

          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}